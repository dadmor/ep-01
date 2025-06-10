// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "@/refinery/router";
import { AuthProvider } from "@/hooks/useAuth"; // ✅ Import AuthProvider

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/* ✅ AuthProvider musi owijać całą aplikację */}
        <div className="App">
          <Router />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;