package com.swyp.rotationdatingapp.location;

/**
 * 위치 데이터 콜백 인터페이스
 */
public interface ICallback {
    void onSuccess(String result);

    /** 현재 등록된 콜백 (static holder) */
    class Holder {
        private static ICallback sCallback;

        public static void setCallback(ICallback callback) {
            sCallback = callback;
        }

        public static ICallback getCallback() {
            return sCallback;
        }
    }
}
