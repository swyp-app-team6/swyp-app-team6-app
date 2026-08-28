package com.swyp.rotationdatingapp.location;

import android.util.Log;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.LinkedList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 위치 데이터 서버 전송
 * - POST {baseURL}/api/carriers/location
 * - 실패 시 인메모리 큐(max 50)에 보관, 다음 성공 시 drain
 */
public class HttpRequest {
    private static final String TAG = "HttpRequest";
    private static final int MAX_QUEUE_SIZE = 50;

    private static final ExecutorService executor = Executors.newSingleThreadExecutor();
    private static final LinkedList<String> failedQueue = new LinkedList<>();

    /**
     * 서버에 위치 전송
     * @param baseURL API 기본 URL
     * @param accessToken Bearer 토큰
     * @param lat 위도
     * @param lng 경도
     */
    public static void sendUserLocation(String baseURL, String accessToken, double lat, double lng) {
        executor.execute(() -> {
            // 실패 큐 먼저 drain 시도
            drainQueue(baseURL, accessToken);

            String payload = "{\"lat\":" + lat + ",\"lng\":" + lng + "}";
            boolean success = doPost(baseURL, accessToken, payload);
            if (!success) {
                enqueue(payload);
            }
        });
    }

    private static boolean doPost(String baseURL, String accessToken, String payload) {
        HttpURLConnection conn = null;
        try {
            URL url = new URL(baseURL + "/api/carriers/location");
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);
            conn.setDoOutput(true);
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);

            try (OutputStream os = conn.getOutputStream()) {
                os.write(payload.getBytes(StandardCharsets.UTF_8));
            }

            int code = conn.getResponseCode();
            return code >= 200 && code < 300;
        } catch (Exception e) {
            Log.w(TAG, "위치 전송 실패: " + e.getMessage());
            return false;
        } finally {
            if (conn != null) conn.disconnect();
        }
    }

    private static void enqueue(String payload) {
        synchronized (failedQueue) {
            if (failedQueue.size() >= MAX_QUEUE_SIZE) {
                failedQueue.removeFirst();
            }
            failedQueue.addLast(payload);
        }
    }

    private static void drainQueue(String baseURL, String accessToken) {
        synchronized (failedQueue) {
            while (!failedQueue.isEmpty()) {
                String queued = failedQueue.peekFirst();
                if (doPost(baseURL, accessToken, queued)) {
                    failedQueue.removeFirst();
                } else {
                    break; // 여전히 실패 → 나머지 유지
                }
            }
        }
    }
}
