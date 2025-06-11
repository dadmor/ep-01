// src/pages/auth/ui.Register.tsx - Z REACT HOOK FORM
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth, UserRole } from "@/hooks/useAuth";


export const routeConfig = {
  path: "/auth/register",
  title: "Register",
};

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export default function RegisterUI() {
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);
  const { register: registerUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "student",
    }
  });

  // Obserwuj hasło do walidacji confirmPassword
  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    setSuccess(false);

    try {
      await registerUser(data.email, data.password, data.username, data.role);
      setSuccess(true);
      reset(); // Reset formularza
    } catch (err) {
      setError(err as Error);
    }
  };

  // Funkcja do wypełnienia danymi testowymi
  const handleTestData = (role: UserRole) => {
    setValue("email", role === "student" ? "student@example.com" : "teacher@example.com");
    setValue("username", role === "student" ? "teststudent" : "testteacher");
    setValue("password", "password123");
    setValue("confirmPassword", "password123");
    setValue("role", role);
  };

  const roleOptions = [
    { value: "student", label: "🎓 Student" },
    { value: "teacher", label: "👨‍🏫 Nauczyciel" }
  ];

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Rejestracja</h1>
            <p className="text-base-content/70 mt-2">Utwórz nowe konto</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email *</span>
              </label>
              <input
                {...register("email", {
                  required: "Email jest wymagany",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Nieprawidłowy format email"
                  }
                })}
                type="email"
                placeholder="Wprowadź swój email"
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Nazwa użytkownika *</span>
              </label>
              <input
                {...register("username", {
                  required: "Nazwa użytkownika jest wymagana",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 znaki"
                  }
                })}
                type="text"
                placeholder="Wprowadź nazwę użytkownika"
                className={`input input-bordered w-full ${errors.username ? 'input-error' : ''}`}
              />
              {errors.username && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.username.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Rola *</span>
              </label>
              <select
                {...register("role", { required: "Rola jest wymagana" })}
                className={`select select-bordered w-full ${errors.role ? 'select-error' : ''}`}
              >
                {roleOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.role.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Hasło *</span>
              </label>
              <input
                {...register("password", {
                  required: "Hasło jest wymagane",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 znaków"
                  }
                })}
                type="password"
                placeholder="Wprowadź hasło"
                className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Potwierdź hasło *</span>
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Potwierdzenie hasła jest wymagane",
                  validate: value => value === password || "Hasła nie pasują"
                })}
                type="password"
                placeholder="Potwierdź hasło"
                className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
              />
              {errors.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.confirmPassword.message}</span>
                </label>
              )}
            </div>

            {error && (
              <div className="alert alert-error">
                <span>{error.message}</span>
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                <span>
                  Rejestracja udana! Sprawdź email w celu potwierdzenia konta.
                </span>
              </div>
            )}

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Rejestrowanie..." : "Zarejestruj się"}
              </button>
            </div>
          </form>

          <div className="divider text-xs">Test Data</div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleTestData("student")}
              className="btn btn-outline btn-sm flex-1"
            >
              Test Student
            </button>
            <button
              type="button"
              onClick={() => handleTestData("teacher")}
              className="btn btn-outline btn-sm flex-1"
            >
              Test Teacher
            </button>
          </div>

          <div className="divider">LUB</div>

          <div className="text-center mt-4">
            <p className="text-base-content/70">
              Masz już konto?{" "}
              <Link to="/auth/login" className="link link-primary font-medium">
                Zaloguj się
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}