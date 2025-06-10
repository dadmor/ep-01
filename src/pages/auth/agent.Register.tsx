// src/pages/auth/agent.Register.tsx
import { DataDisplay } from "@/components/ui/agent";
import { useAuth } from '@/hooks/useAuth'; // ✅ Użyj gotowego AuthContext
import { useState } from 'react';

export const routeConfig = {
  path: "/auth/register",
  title: "Register",
};

const mockRegister = {
  email: "new@example.com",
  username: "newuser",
  password: "password123",
};

export default function RegisterAgent() {
  const { register, loading } = useAuth(); // ✅ Użyj gotowego register
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const handleTestRegistration = async () => {
    setError(null);
    setData(null);
    
    try {
      await register(mockRegister.email, mockRegister.password, mockRegister.username);
      setData({ 
        success: true, 
        message: 'Rejestracja udana! Sprawdź email w celu potwierdzenia konta.' 
      });
    } catch (err) {
      setError(err as Error);
    }
  };
  
  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title">Rejestracja</h2>
        <p className="text-base-content/70">Testowanie rejestracji z danymi przykładowymi</p>
       
        <DataDisplay 
          data={mockRegister} 
          title="📋 Dane testowe"
          defaultExpanded={true}
        />
        
        <div className="card-actions">
          <button
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            onClick={handleTestRegistration}
            disabled={loading}
          >
            {loading ? "Wysyłanie..." : "🚀 Wyślij dane testowe"}
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