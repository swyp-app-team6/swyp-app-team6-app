package com.swyp.rotationdatingapp.location;

import android.content.Intent;
import android.location.LocationManager;
import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;

/**
 * RN Native Module — 위치 서비스 제어
 * JS에서 NativeModules.ForegroundLocationService로 접근
 *
 * MyService.sLat/sLng (static volatile)에서 직접 읽음 — broadcast 불필요
 */
public class ForegroundLocationService extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "ForegroundLocationService";

    private final ReactApplicationContext reactContext;
    private boolean isRunning = false;

    public ForegroundLocationService(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    /**
     * Foreground Service 시작
     */
    @ReactMethod
    public void start() {
        if (isRunning) return;

        Intent serviceIntent = new Intent(reactContext, MyService.class);
        ContextCompat.startForegroundService(reactContext, serviceIntent);
        isRunning = true;
    }

    /**
     * Foreground Service 중지
     */
    @ReactMethod
    public void stop() {
        if (!isRunning) return;

        Intent serviceIntent = new Intent(reactContext, MyService.class);
        reactContext.stopService(serviceIntent);
        isRunning = false;
    }

    /**
     * 최근 위치 정보 반환 — FusedLocationProviderClient에서 직접 조회
     * @return "lat/lng/isEnabled" 형태의 문자열
     */
    @ReactMethod
    public void getLocationInfo(Promise promise) {
        try {
            boolean enabled = isDeviceLocationEnabled();
            FusedLocationProviderClient client =
                    LocationServices.getFusedLocationProviderClient(reactContext);
            client.getLastLocation()
                    .addOnSuccessListener(location -> {
                        if (location != null) {
                            double lat = location.getLatitude();
                            double lng = location.getLongitude();
                            Log.d(MODULE_NAME, "getLastLocation: " + lat + ", " + lng);
                            promise.resolve(lat + "/" + lng + "/" + enabled);
                        } else {
                            Log.w(MODULE_NAME, "getLastLocation null, fallback to static");
                            promise.resolve(MyService.sLat + "/" + MyService.sLng + "/" + enabled);
                        }
                    })
                    .addOnFailureListener(e -> {
                        Log.e(MODULE_NAME, "getLastLocation 실패: " + e.getMessage());
                        promise.resolve(MyService.sLat + "/" + MyService.sLng + "/" + enabled);
                    });
        } catch (SecurityException e) {
            Log.e(MODULE_NAME, "권한 없음: " + e.getMessage());
            promise.resolve("0/0/false");
        } catch (Exception e) {
            promise.reject("LOCATION_ERROR", e.getMessage());
        }
    }

    /**
     * 서버 전송용 인증 정보 설정
     */
    @ReactMethod
    public void setConfig(String token, String baseURL) {
        MyService.sAccessToken = token;
        MyService.sBaseURL = baseURL;
    }

    /**
     * 디바이스 위치 서비스 활성화 여부
     */
    @ReactMethod
    public void isLocationEnabled(Promise promise) {
        try {
            promise.resolve(isDeviceLocationEnabled());
        } catch (Exception e) {
            promise.reject("LOCATION_ERROR", e.getMessage());
        }
    }

    private boolean isDeviceLocationEnabled() {
        LocationManager lm = (LocationManager) reactContext.getSystemService(Context.LOCATION_SERVICE);
        if (lm == null) return false;
        return lm.isProviderEnabled(LocationManager.GPS_PROVIDER)
                || lm.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
    }
}
