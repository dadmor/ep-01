// src/pages/auth/ui.Login.tsx - POPRAWIONA WERSJA Z PRZEKIEROWANIEM
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export const routeConfig = {
  path: "/auth/login",
  title: "Login",
};

export default function LoginUI() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Dodaj useAuth hook
  const { formData, handleInputChange, handleSubmit, isLoading, error, data } =
    useLogin();

  // Obsługa przekierowania po udanym logowaniu
  useEffect(() => {
    if (user) {
      console.log("✅ UŻYTKOWNIK ZALOGOWANY, PRZEKIEROWANIE:", user);

      // Przekieruj do odpowiedniego panelu na podstawie roli
      if (user.role === "teacher") {
        navigate("/auth/teacher-welcome");
      } else {
        navigate("/auth/student-welcome");
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <img src="/assets/smart-edi-play-logo.svg" alt="Smart EDI Play Logo" className="w-36 mx-auto mt-4 mb-2" />
          <div className="divider"></div>  
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Logowanie</h1>
            <p className="text-base-content/70 mt-2">
              Witaj ponownie! Zaloguj się do swojego konta
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Wprowadź swój email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Hasło</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Wprowadź swoje hasło"
                className="input input-bordered w-full"
                required
              />
            </div>

            {error && (
              <div className="alert alert-error">
                <span>{error.message}</span>
              </div>
            )}

            {data && (
              <div className="alert alert-success">
                <span>Logowanie udane! Przekierowanie...</span>
              </div>
            )}

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full ${
                  isLoading ? "loading" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Logowanie..." : "Zaloguj się"}
              </button>
            </div>
          </form>

          <div className="divider">LUB</div>

          <div className="text-center mt-4">
            <p className="text-base-content/70">
              Nie masz konta?{" "}
              <Link
                to="/auth/register"
                className="link link-primary font-medium"
              >
                Zarejestruj się
              </Link>
            </p>
            <p className="text-base-content/70 mt-2">
              <Link
                to="/auth/login?agentMode=true"
                className="link link-secondary text-sm"
              >
                Tryb agenta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
