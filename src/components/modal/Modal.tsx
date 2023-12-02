import { useEffect, useMemo } from 'react'
import styles from './style.module.css'
import { createPortal } from 'react-dom'
import { ModalProps } from '../../shared/api/types'
import background from '../../assets/header/form_background.png'

const modalRootElement = document.querySelector('#modal')
export const Modal = ({ open, onClose, children }: ModalProps) => {
  const element = useMemo(() => document.createElement('div'), [])
  useEffect(() => {
    if (open && modalRootElement) {
      modalRootElement?.appendChild(element)
      return () => {
        modalRootElement?.removeChild(element)
      }
    }
  })
  return open
    ? createPortal(
        //TODO: change click
        <div className={styles.wrapper}>
          <img className={styles.background} src={background} alt="zebra background" />
          <div className={styles.content}>
            <button className={styles.closing} onClick={onClose}>
              X
            </button>
            {children}
          </div>
        </div>,
        element,
      )
    : null
}
