// src/pages/auth/agent.Register.tsx - ZAKTUALIZOWANA WERSJA Z ROLAMI
import { DataDisplay } from "@/components/ui/agent";
import { useAuth, UserRole } from '@/hooks/useAuth';
import { useState } from 'react';

export const routeConfig = {
  path: "/auth/register",
  title: "Register",
};

const mockStudentRegister = {
  email: "student@example.com",
  username: "teststudent",
  password: "password123",
  role: "student" as UserRole
};

const mockTeacherRegister = {
  email: "teacher@example.com", 
  username: "testteacher",
  password: "password123",
  role: "teacher" as UserRole
};

export default function RegisterAgent() {
  const { register, loading } = useAuth();
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);
  const [selectedMock, setSelectedMock] = useState<'student' | 'teacher'>('student');

  const handleTestRegistration = async (mockData: typeof mockStudentRegister) => {
    setError(null);
    setData(null);
    
    try {
      await register(mockData.email, mockData.password, mockData.username, mockData.role);
      setData({ 
        success: true, 
        message: `Rejestracja ${mockData.role} udana! Sprawdź email w celu potwierdzenia konta.`,
        role: mockData.role,
        userData: mockData
      });
    } catch (err) {
      setError(err as Error);
    }
  };
  
  const currentMock = selectedMock === 'student' ? mockStudentRegister : mockTeacherRegister;
  
  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title">📝 Register Agent</h2>
        <p className="text-base-content/70">Testowanie rejestracji z wyborem ról (student/teacher)</p>
       
        {/* Wybór typu testowego użytkownika */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">🎭 Wybierz typ użytkownika do testu:</span>
          </label>
          <div className="flex gap-2">
            <button
              className={`btn btn-sm flex-1 ${selectedMock === 'student' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setSelectedMock('student')}
            >
              🎓 Student
            </button>
            <button
              className={`btn btn-sm flex-1 ${selectedMock === 'teacher' ? 'btn-secondary' : 'btn-outline'}`}
              onClick={() => setSelectedMock('teacher')}
            >
              👨‍🏫 Teacher
            </button>
          </div>
        </div>

        <DataDisplay 
          data={currentMock} 
          title={`📋 Dane testowe - ${selectedMock === 'student' ? '🎓 Student' : '👨‍🏫 Teacher'}`}
          defaultExpanded={true}
        />
        
        <div className="card-actions justify-between">
          <button
            className={`btn ${selectedMock === 'teacher' ? 'btn-secondary' : 'btn-primary'} ${loading ? "loading" : ""}`}
            onClick={() => handleTestRegistration(currentMock)}
            disabled={loading}
          >
            {loading ? "Rejestrowanie..." : `🚀 Rejestruj jako ${selectedMock}`}
          </button>

          {/* Reset button */}
          {(error || data) && (
            <button 
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setError(null);
                setData(null);
              }}
            >
              🔄 Reset
            </button>
          )}
        </div>
        
        {/* Status rejestracji */}
        <div className="space-y-2">
          {loading && (
            <div className="alert alert-info">
              <span className="loading loading-spinner loading-sm"></span>
              <span>⏳ Wysyłanie żądania rejestracji...</span>
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              <div>
                <div className="font-bold">❌ Błąd rejestracji:</div>
                <div className="text-sm opacity-80">{error.message}</div>
              </div>
            </div>
          )}

          {data && (
            <div className={`alert ${selectedMock === 'teacher' ? 'alert-warning' : 'alert-success'}`}>
              <span>✅ {data.message}</span>
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

        {/* Debug info dla różnych ról */}
        <div className="divider text-xs opacity-50">DEBUG INFO</div>
        <DataDisplay 
          data={{
            selectedRole: selectedMock,
            isLoading: loading,
            hasError: !!error,
            errorType: error?.constructor.name || null,
            hasData: !!data,
            registrationSuccessful: data?.success || false,
            currentMockData: currentMock
          }} 
          title="🐛 Stan komponentu"
          defaultExpanded={false}
        />
      </div>
    </div>
  );
}