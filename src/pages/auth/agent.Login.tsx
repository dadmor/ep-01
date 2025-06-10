// src/pages/auth/agent.Login.tsx
import { DataDisplay } from "@/components/ui/agent";
import { useLogin } from "./hooks/useLogin";

export const routeConfig = {
  path: "/auth/login",
  title: "Login"
};

const mockLogin = {
  email: "dadmor+admin1@gmail.com",
  password: "dadmor+admin1@gmail.com"
};

export default function LoginAgent() {
  const { 
    loginWithTestData, 
    isLoading, 
    error, 
    data, 
    isSuccess,
    formData,
    reset 
  } = useLogin();
  
  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title">🔐 Login Agent</h2>
        <p className="text-base-content/70">Testowanie logowania z rzeczywistymi danymi Supabase</p>
        
        <DataDisplay 
          data={mockLogin} 
          title="📋 Dane testowe"
          defaultExpanded={true}
        />
        
        {formData.email && (
          <DataDisplay 
            data={formData} 
            title="📝 Aktualne dane formularza"
            defaultExpanded={false}
          />
        )}
        
        <div className="card-actions justify-between">
          <button 
            className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            onClick={loginWithTestData}
            disabled={isLoading}
          >
            {isLoading ? 'Logowanie...' : '🚀 Testuj logowanie'}
          </button>
          
          {(error || isSuccess) && (
            <button 
              className="btn btn-ghost btn-sm"
              onClick={reset}
            >
              🔄 Reset
            </button>
          )}
        </div>
        
        {/* Status logowania */}
        <div className="space-y-2">
          {isLoading && (
            <div className="alert alert-info">
              <span className="loading loading-spinner loading-sm"></span>
              <span>⏳ Wysyłanie żądania logowania...</span>
            </div>
          )}
          
          {error && (
            <div className="alert alert-error">
              <div>
                <div className="font-bold">❌ Błąd logowania:</div>
                <div className="text-sm opacity-80">{error.message}</div>
              </div>
            </div>
          )}
          
          {isSuccess && (
            <div className="alert alert-success">
              <span>✅ Logowanie udane! Przekierowywanie...</span>
            </div>
          )}
        </div>
        
        {/* Odpowiedź serwera */}
        {data && (
          <DataDisplay 
            data={data} 
            title="📨 Odpowiedź serwera"
            isCollapsible={false}
          />
        )}
        
        {/* Debug info */}
        <div className="divider text-xs opacity-50">DEBUG INFO</div>
        <DataDisplay 
          data={{
            isLoading,
            isSuccess,
            hasError: !!error,
            errorType: error?.constructor.name || null,
            dataReceived: !!data
          }} 
          title="🐛 Stan komponentu"
          defaultExpanded={false}
        />
      </div>
    </div>
  );
}