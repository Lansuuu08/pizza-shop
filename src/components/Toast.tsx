interface Props {
  message: string
}

const Toast: React.FC<Props> = ({ message }) => {
  if (!message) return null

  return (
    <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
      {message}
    </div>
  )
}

export default Toast
