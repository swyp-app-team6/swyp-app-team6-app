package com.swyp.rotationdatingapp.location;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/**
 * MyService로부터 위치 broadcast를 수신하여 ICallback으로 전달
 * - 데이터 포맷: "latitude/longitude" (슬래시 구분)
 */
public class MyReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (!MyService.ACTION_LOCATION_UPDATE.equals(intent.getAction())) return;

        double lat = intent.getDoubleExtra(MyService.EXTRA_LAT, 0);
        double lng = intent.getDoubleExtra(MyService.EXTRA_LNG, 0);

        // ponytail: 슬래시 구분 레거시 포맷, 웹팀 준비되면 JSON으로 전환
        String data = lat + "/" + lng;

        ICallback callback = ICallback.Holder.getCallback();
        if (callback != null) {
            callback.onSuccess(data);
        }
    }
}
