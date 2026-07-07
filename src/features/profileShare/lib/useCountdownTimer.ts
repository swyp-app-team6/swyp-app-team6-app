import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * # useCountdownTimer
 * ---
 * - 간단설명: 지정 시간(초)부터 카운트다운하는 타이머 훅
 * - 제약사항 및 특이사항:
 *   - active가 true일 때 타이머 시작, false일 때 초기화
 *   - 0에 도달하면 onExpire 콜백 호출
 * ---
 * @param seconds 카운트다운 시작 시간 (초)
 * @param active 타이머 활성화 여부
 * @param onExpire 만료 시 콜백
 * ---
 * @example
 * const remainSeconds = useCountdownTimer(60, visible, onClose);
 */
export default function useCountdownTimer(
  seconds: number,
  active: boolean,
  onExpire: () => void,
): number {
  const [remainSeconds, setRemainSeconds] = useState(seconds);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (active) {
      setRemainSeconds(seconds);
      timerRef.current = setInterval(() => {
        setRemainSeconds((prev) => {
          if (prev <= 1) {
            onExpire();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [active, seconds, onExpire, clearTimer]);

  return remainSeconds;
}
