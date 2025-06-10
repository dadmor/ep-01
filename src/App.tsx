// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "@/refinery/router";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "./daisyModule/ThemeProvider";
import { ThemeSwitcher } from "./daisyModule/ThemeSwitcher";


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
      <ThemeProvider> {/* ✅ ThemeProvider owijający całą aplikację */}
        <AuthProvider> {/* ✅ AuthProvider musi owijać całą aplikację */}
          <div className="App">
            <Router />
          </div>
        </AuthProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;