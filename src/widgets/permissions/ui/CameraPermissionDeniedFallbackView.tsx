import React from 'react'
import { View } from 'react-native'

/**
 * 카메라 권한 거절시 fallback
 * TODO: 가이드 추가필요
 */
export default function CameraPermissionDeniedFallbackView() {
  return (
    <View>카메라 권한을 거절하셨습니다, 원활한 사용을 위해서는 반드시 필요합니다.</View>
  )
}
