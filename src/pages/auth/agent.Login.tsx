// src/pages/auth/Login.agent.tsx
import { DataDisplay } from "@/components/ui/agent";
import { useLogin } from "./hooks/useLogin";


export const routeConfig = {
  path: "/auth/login",
  title: "Login"
};

const mockLogin = {
  email: "test@example.com",
  password: "password123"
};

export default function LoginAgent() {
  const { loginWithTestData, isLoading, error, data } = useLogin();
  
  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title">Login</h2>
        <p className="text-base-content/70">Testowanie logowania z danymi przykładowymi</p>
        
        <DataDisplay 
          data={mockLogin} 
          title="📋 Dane testowe"
          defaultExpanded={true}
        />
        
        <div className="card-actions">
          <button 
            className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            onClick={loginWithTestData}
            disabled={isLoading}
          >
            {isLoading ? 'Wysyłanie...' : '🚀 Wyślij dane testowe'}
          </button>
        </div>
        
        {error && (
          <div className="alert alert-error">
            <span>❌ Błąd: {error.message}</span>
          </div>
        )}
        
        {data && (
          <DataDisplay 
            data={data} 
            title="📨 Odpowiedź serwera"
            isCollapsible={false}
          />
        )}
      </div>
    </div>
  );
}