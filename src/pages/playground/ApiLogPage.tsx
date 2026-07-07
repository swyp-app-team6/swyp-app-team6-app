import React, { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, Header, Layout } from '@/shared/ui';
import useApiLogStore, { type ApiLogEntry } from '@/shared/model/apiLogStore';

/**
 * # StatusBadge
 * ---
 * - 간단설명: HTTP 상태 코드에 따라 색상이 다른 뱃지
 * ---
 * @param status HTTP 상태 코드 (null이면 에러)
 */
function StatusBadge({ status }: { status: number | null }) {
  let bgColor = 'bg-gray-300';
  let textColor = 'text-gray-700';

  if (status === null) {
    bgColor = 'bg-red-100';
    textColor = 'text-red-700';
  } else if (status >= 200 && status < 300) {
    bgColor = 'bg-green-100';
    textColor = 'text-green-700';
  } else if (status >= 400 && status < 500) {
    bgColor = 'bg-orange-100';
    textColor = 'text-orange-700';
  } else if (status >= 500) {
    bgColor = 'bg-red-100';
    textColor = 'text-red-700';
  }

  return (
    <View className={`${bgColor} rounded px-1.5 py-0.5`}>
      <Text className={`${textColor} text-xs font-bold`}>
        {status ?? 'ERR'}
      </Text>
    </View>
  );
}

/**
 * # MethodBadge
 * ---
 * - 간단설명: HTTP 메서드에 따라 색상이 다른 뱃지
 * ---
 * @param method HTTP 메서드 (GET, POST 등)
 */
function MethodBadge({ method }: { method: string }) {
  const colorMap: Record<string, string> = {
    GET: 'bg-blue-100 text-blue-700',
    POST: 'bg-green-100 text-green-700',
    PUT: 'bg-yellow-100 text-yellow-700',
    PATCH: 'bg-purple-100 text-purple-700',
    DELETE: 'bg-red-100 text-red-700',
  };
  const cls = colorMap[method] ?? 'bg-gray-100 text-gray-700';
  const [bg, text] = cls.split(' ');

  return (
    <View className={`${bg} rounded px-1.5 py-0.5 min-w-[42px] items-center`}>
      <Text className={`${text} text-xs font-bold`}>{method}</Text>
    </View>
  );
}

/**
 * # JsonViewer
 * ---
 * - 간단설명: JSON 데이터를 정리해서 보여주는 텍스트 뷰
 * ---
 * @param label 섹션 라벨
 * @param data 표시할 데이터
 */
function JsonViewer({ label, data }: { label: string; data: unknown }) {
  if (data === undefined || data === null) {
    return null;
  }

  let displayText: string;
  try {
    displayText = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  } catch {
    displayText = String(data);
  }

  return (
    <View className="mt-2">
      <Text className="text-xs font-bold text-text-gray4 mb-1">{label}</Text>
      <View className="bg-text-gray7 rounded-lg p-3">
        <Text className="text-xs text-text-gray3 font-mono" selectable>
          {displayText}
        </Text>
      </View>
    </View>
  );
}

/**
 * # LogItem
 * ---
 * - 간단설명: 개별 API 로그 항목 (탭하여 상세 펼치기/접기)
 * ---
 * @param log API 로그 항목
 */
function LogItem({ log }: { log: ApiLogEntry }) {
  const [expanded, setExpanded] = useState(false);

  const time = new Date(log.timestamp);
  const timeStr = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}`;
  const pathOnly = log.url.replace(/^https?:\/\/[^/]+/, '');

  return (
    <TouchableOpacity
      className="bg-white rounded-xl px-4 py-3 mb-2 border border-text-gray6"
      onPress={() => setExpanded((v) => !v)}
      activeOpacity={0.7}
    >
      {/* 요약 행 */}
      <View className="flex-row items-center gap-2">
        <MethodBadge method={log.method} />
        <StatusBadge status={log.status} />
        <Text className="flex-1 text-xs text-text-gray3 ml-1" numberOfLines={1}>
          {pathOnly || log.url}
        </Text>
        <Text className="text-[10px] text-text-gray5">{log.duration}ms</Text>
      </View>

      {/* 시간 + 펼치기 힌트 */}
      <View className="flex-row justify-between mt-1">
        <Text className="text-[10px] text-text-gray5">{timeStr}</Text>
        <Text className="text-[10px] text-text-gray5">
          {expanded ? '접기' : '상세 보기'}
        </Text>
      </View>

      {/* 상세 정보 */}
      {expanded && (
        <View className="mt-3 pt-3 border-t border-text-gray6">
          <Text className="text-[10px] text-text-gray5 mb-1">
            {log.url}
          </Text>

          {log.error && (
            <View className="bg-red-50 rounded-lg p-2 mt-1 mb-1">
              <Text className="text-xs text-red-600 font-bold">Error: {log.error}</Text>
            </View>
          )}

          <JsonViewer label="Request Headers" data={log.request.headers} />
          <JsonViewer label="Request Params" data={log.request.params} />
          <JsonViewer label="Request Body" data={log.request.data} />
          <JsonViewer label="Response Headers" data={log.response?.headers} />
          <JsonViewer label="Response Body" data={log.response?.data} />
        </View>
      )}
    </TouchableOpacity>
  );
}

/**
 * # ApiLogPage
 * ---
 * - 간단설명: API 호출 request/response 로그를 시간순으로 확인할 수 있는 디버그 페이지
 * - 제약사항 및 특이사항:
 *   - 개발 환경(local)에서만 접근 가능
 *   - 인터셉터에서 수집된 로그를 실시간 표시
 *   - 최대 100개 로그 보관
 * ---
 * @example
 * <ApiLogPage />
 */
export default function ApiLogPage() {
  const logs = useApiLogStore((s) => s.logs);
  const clearLogs = useApiLogStore((s) => s.clearLogs);

  const [filter, setFilter] = useState<'all' | 'success' | 'error'>('all');

  const filteredLogs = useCallback(() => {
    if (filter === 'success') {
      return logs.filter((l) => l.status !== null && l.status >= 200 && l.status < 300);
    }
    if (filter === 'error') {
      return logs.filter((l) => l.status === null || l.status >= 400);
    }
    return logs;
  }, [logs, filter])();

  return (
    <Layout>
      <Header title="API Logs" showBack />
      <Layout.Body styleClass={{ root: 'px-4 pt-4' }}>
        {/* 필터 + 삭제 */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row gap-1">
            {(['all', 'success', 'error'] as const).map((f) => (
              <TouchableOpacity
                key={f}
                className={`px-3 py-1.5 rounded-full ${
                  filter === f ? 'bg-primary' : 'bg-text-gray7'
                }`}
                onPress={() => setFilter(f)}
              >
                <Text
                  className={`text-xs font-semibold ${
                    filter === f ? 'text-white' : 'text-text-gray4'
                  }`}
                >
                  {f === 'all' ? `All (${logs.length})` : f === 'success' ? 'Success' : 'Error'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button
            title="Clear"
            variant="ghost"
            onPress={clearLogs}
            className="px-2"
          />
        </View>

        {/* 로그 목록 */}
        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-20"
          showsVerticalScrollIndicator={false}
        >
          {filteredLogs.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Text className="text-text-gray5 text-sm">로그가 없습니다</Text>
            </View>
          ) : (
            filteredLogs.map((log) => <LogItem key={log.id} log={log} />)
          )}
        </ScrollView>
      </Layout.Body>
    </Layout>
  );
}
