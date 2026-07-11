import { RefObject } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

/**
 * # saveCardImage
 * ---
 * - 간단설명: ViewShot ref로부터 카드 이미지를 캡처하여 갤러리에 저장
 * - 제약사항 및 특이사항:
 *   - iOS: NSPhotoLibraryAddUsageDescription 권한 필요
 *   - Android API 28 이하: WRITE_EXTERNAL_STORAGE 런타임 권한 필요
 *   - Android API 33+: READ_MEDIA_IMAGES 런타임 권한 필요
 * ---
 * @param viewShotRef ViewShot 컴포넌트의 ref
 * ---
 * @example
 * await saveCardImage(viewShotRef);
 */
export async function saveCardImage(viewShotRef: RefObject<any>): Promise<void> {
  if (!viewShotRef.current) {
    return;
  }

  if (Platform.OS === 'android') {
    const granted = await requestAndroidPermission();
    if (!granted) {
      Alert.alert('권한 필요', '이미지를 저장하려면 사진 접근 권한이 필요합니다.');
      return;
    }
  }

  try {
    const uri = await captureRef(viewShotRef, {
      format: 'png',
      quality: 1,
    });

    await CameraRoll.save(uri, { type: 'photo' });
    Alert.alert('저장 완료', '이미지가 사진 앨범에 저장되었습니다.');
  } catch {
    Alert.alert('저장 실패', '이미지 저장 중 오류가 발생했습니다.');
  }
}

/**
 * # requestAndroidPermission
 * ---
 * - 간단설명: Android 사진 저장 런타임 권한 요청
 * ---
 */
async function requestAndroidPermission(): Promise<boolean> {
  const apiLevel = Platform.Version;

  if (typeof apiLevel === 'number' && apiLevel >= 33) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      {
        title: '사진 접근 권한',
        message: '이미지를 저장하려면 사진 접근 권한이 필요합니다.',
        buttonPositive: '허용',
      },
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  if (typeof apiLevel === 'number' && apiLevel <= 28) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: '저장소 접근 권한',
        message: '이미지를 저장하려면 저장소 접근 권한이 필요합니다.',
        buttonPositive: '허용',
      },
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  // API 29-32: scoped storage, 별도 권한 불필요
  return true;
}
