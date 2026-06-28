import { useEffect } from "react"

function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="card relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="heading-md">{title}</h2>
          <button type="button" onClick={onClose} className="btn btn-ghost px-2 py-1">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
