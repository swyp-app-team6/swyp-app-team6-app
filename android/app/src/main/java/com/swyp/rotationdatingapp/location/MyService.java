package com.swyp.rotationdatingapp.location;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.os.Looper;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.Priority;

/**
 * 백그라운드 위치 수집 Foreground Service
 * - FusedLocationProviderClient로 1초 간격 GPS 수집
 * - static 필드에 최신 좌표 저장 (ForegroundLocationService에서 직접 읽음)
 * - 5회 수집마다 서버 전송
 */
public class MyService extends Service {
    private static final String TAG = "MyService";
    private static final String CHANNEL_ID = "location_channel";
    private static final int NOTIFICATION_ID = 1001;
    private static final long UPDATE_LOCATION_INTERVAL = 1000L;
    private static final int SERVER_SEND_INTERVAL = 5;

    /** 인증 정보 (ForegroundLocationService에서 설정) */
    public static String sAccessToken = "";
    public static String sBaseURL = "";

    /** 최신 위치 — JS에서 getLocationInfo()로 직접 읽음 */
    public static volatile double sLat = 0;
    public static volatile double sLng = 0;

    private FusedLocationProviderClient fusedLocationClient;
    private LocationCallback locationCallback;
    private int locationCount = 0;

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel();
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(TAG, "onStartCommand 호출됨");
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("위치 추적 중")
                .setContentText("백그라운드에서 위치를 수집하고 있습니다")
                .setSmallIcon(android.R.drawable.ic_menu_mylocation)
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .build();

        startForeground(NOTIFICATION_ID, notification);
        Log.d(TAG, "startForeground 완료");
        startLocationUpdates();
        return START_STICKY;
    }

    private void startLocationUpdates() {
        LocationRequest locationRequest = new LocationRequest.Builder(
                Priority.PRIORITY_HIGH_ACCURACY, UPDATE_LOCATION_INTERVAL)
                .setMinUpdateIntervalMillis(UPDATE_LOCATION_INTERVAL)
                .build();

        locationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                if (locationResult == null || locationResult.getLastLocation() == null) {
                    Log.w(TAG, "locationResult 또는 lastLocation이 null");
                    return;
                }
                double lat = locationResult.getLastLocation().getLatitude();
                double lng = locationResult.getLastLocation().getLongitude();
                Log.d(TAG, "위치 수신: " + lat + ", " + lng);

                // static 필드에 직접 저장
                sLat = lat;
                sLng = lng;

                // 5회마다 서버 전송
                locationCount++;
                if (locationCount % SERVER_SEND_INTERVAL == 0) {
                    if (!sBaseURL.isEmpty() && !sAccessToken.isEmpty()) {
                        HttpRequest.sendUserLocation(sBaseURL, sAccessToken, lat, lng);
                    }
                }
            }
        };

        try {
            fusedLocationClient.requestLocationUpdates(
                    locationRequest, locationCallback, Looper.getMainLooper());
            Log.d(TAG, "requestLocationUpdates 성공");
        } catch (SecurityException e) {
            Log.e(TAG, "위치 권한 없음: " + e.getMessage());
        } catch (Exception e) {
            Log.e(TAG, "requestLocationUpdates 실패: " + e.getMessage());
        }
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "위치 추적",
                    NotificationManager.IMPORTANCE_LOW);
            channel.setDescription("백그라운드 위치 수집 알림");
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (fusedLocationClient != null && locationCallback != null) {
            fusedLocationClient.removeLocationUpdates(locationCallback);
        }
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
