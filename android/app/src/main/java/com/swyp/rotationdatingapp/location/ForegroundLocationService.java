package com.swyp.rotationdatingapp.location;

import android.content.Intent;
import android.content.IntentFilter;
import android.location.LocationManager;
import android.os.Build;
import android.content.Context;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * RN Native Module — 위치 서비스 제어
 * JS에서 NativeModules.ForegroundLocationService로 접근
 *
 * 메서드:
 * - start(): MyService 시작 + MyReceiver 콜백 등록
 * - stop(): MyService 중지
 * - getLocationInfo(Promise): "lat/lng/isEnabled" 문자열 반환
 * - setConfig(token, baseURL): 인증 정보 설정
 * - isLocationEnabled(Promise): 디바이스 위치 서비스 활성화 여부
 */
public class ForegroundLocationService extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "ForegroundLocationService";

    private final ReactApplicationContext reactContext;
    private MyReceiver receiver;
    private String lastLocationData = "0/0"; // "lat/lng"
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
     * Foreground Service 시작 + BroadcastReceiver 등록
     */
    @ReactMethod
    public void start() {
        if (isRunning) return;

        // 콜백 등록: MyReceiver → 이 모듈로 좌표 전달
        ICallback.Holder.setCallback(result -> {
            lastLocationData = result;
        });

        // BroadcastReceiver 등록
        receiver = new MyReceiver();
        IntentFilter filter = new IntentFilter(MyService.ACTION_LOCATION_UPDATE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            reactContext.registerReceiver(receiver, filter, Context.RECEIVER_NOT_EXPORTED);
        } else {
            reactContext.registerReceiver(receiver, filter);
        }

        // Foreground Service 시작
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

        if (receiver != null) {
            try {
                reactContext.unregisterReceiver(receiver);
            } catch (Exception ignored) {}
            receiver = null;
        }

        ICallback.Holder.setCallback(null);
        isRunning = false;
    }

    /**
     * 최근 위치 정보 반환
     * @return "lat/lng/isEnabled" 형태의 문자열
     */
    @ReactMethod
    public void getLocationInfo(Promise promise) {
        try {
            boolean enabled = isDeviceLocationEnabled();
            promise.resolve(lastLocationData + "/" + enabled);
        } catch (Exception e) {
            promise.reject("LOCATION_ERROR", e.getMessage());
        }
    }

    /**
     * 서버 전송용 인증 정보 설정
     * @param token Bearer 토큰
     * @param baseURL API 기본 URL
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
