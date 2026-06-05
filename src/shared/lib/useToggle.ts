import { useCallback, useState } from 'react';

/**
 * boolean 상태 토글 훅
 *
 * @example
 * ```ts
 * const [visible, toggle, setVisible] = useToggle();
 *
 * <Button title="열기" onPress={toggle} />
 * <Modal visible={visible} onClose={() => setVisible(false)} />
 * ```
 */
export function useToggle(initialValue = false): [boolean, () => void, (value: boolean) => void] {
  const [state, setState] = useState(initialValue);
  const toggle = useCallback(() => setState(prev => !prev), []);
  return [state, toggle, setState];
}
