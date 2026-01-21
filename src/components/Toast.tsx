import { useEffect } from "react"

export default function Toast({ message, onClose }: any) {

   useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [message, onClose])

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-2xl">
      {message}
      <button onClick={onClose} className="ml-3 underline">
        close
      </button>
    </div>
  )
}
