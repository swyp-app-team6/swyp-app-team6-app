import React, { useCallback, useState } from 'react'
import { ModalProps } from '@/shared/ui';
import _Modal from '@/shared/ui/Modal';

/** modal open close 상태 */
export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const Modal = useCallback((props: ModalProps) => {
    return <_Modal {...props} visible={isOpen} onClose={closeModal} />
  }, [isOpen])

  return {
    isOpen,
    Modal,
    openModal,
    closeModal,
    toggleModal,
  }
}
