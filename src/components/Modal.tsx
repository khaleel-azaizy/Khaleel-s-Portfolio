import { useEffect, useRef, type ReactNode } from 'react'
import { FiX } from 'react-icons/fi'

type Props = {
  open: boolean
  onClose: () => void
  titleId: string
  children: ReactNode
  className?: string
}

export function Modal({
  open,
  onClose,
  titleId,
  children,
  className = '',
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return
    const opener = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className={`modal ${className}`}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect()
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose()
        }
      }}
    >
      {open && (
        <>
          <button
            autoFocus
            className="icon-button modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <FiX />
          </button>
          {children}
        </>
      )}
    </dialog>
  )
}
