// src/pages/auth/Register.agent.tsx
import { DataDisplay } from "@/components/ui/agent";
import { useInsert } from "../api/hooks";


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
  const mutation = useInsert("register", "users");
  
  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title">Rejestracja</h2>
       
        <DataDisplay 
          data={mockRegister} 
          title="📋 Dane testowe"
          defaultExpanded={true}
        />
        
        <div className="card-actions">
          <button
            className={`btn btn-primary ${mutation.isPending ? "loading" : ""}`}
            onClick={() => mutation.mutate(mockRegister)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Wysyłanie..." : "🚀 Wyślij dane testowe"}
          </button>
        </div>
        
        {mutation.error && (
          <div className="alert alert-error">
            <span>❌ Błąd: {mutation.error.message}</span>
          </div>
        )}
        
        {mutation.data && (
          <DataDisplay 
            data={mutation.data} 
            title="📨 Odpowiedź serwera"
            isCollapsible={false}
          />
        )}
      </div>
    </div>
  );
}