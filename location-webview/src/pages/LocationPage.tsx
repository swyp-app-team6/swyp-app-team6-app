/**
 * # LocationPage
 * ---
 * - 간단설명: 좌표 출력 UI 페이지. 추적 시작/중지 버튼 + 위도/경도/방향각 표시
 * ---
 * @example
 * <Route path="/location" element={<LocationPage />} />
 */

import { useMyCurPosition } from '../hooks/useMyCurPosition';
import { useLocationStore } from '../stores/locationStore';

export default function LocationPage() {
  const { lat, lng, degree, enabled } = useLocationStore();
  const { startMyLocation, stopMyLocation } = useMyCurPosition();

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>위치 정보</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button onClick={startMyLocation} disabled={enabled}>
          추적 시작
        </button>
        <button onClick={stopMyLocation} disabled={!enabled}>
          추적 중지
        </button>
      </div>

      <div style={{ display: 'grid', gap: 12, maxWidth: 400 }}>
        <Card label="상태" value={enabled ? '추적 중' : '중지됨'} />
        <Card label="위도" value={lat.toFixed(6)} />
        <Card label="경도" value={lng.toFixed(6)} />
        <Card label="방향각" value={`${degree.toFixed(1)}°`} />
      </div>

      <details style={{ marginTop: 20 }}>
        <summary>Raw JSON</summary>
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
          {JSON.stringify({ lat, lng, degree, enabled }, null, 2)}
        </pre>
      </details>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
      <div style={{ fontSize: 12, color: '#888' }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 'bold' }}>{value}</div>
    </div>
  );
}
