import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./pages/Home"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <Home />
      </div>
    </QueryClientProvider>
  )
}

export default App
