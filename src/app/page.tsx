"use client";

import { useAuth } from "@/contexts/AuthContext";
import AuthGuard from "@/components/AuthGuard";

export default function Home() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthGuard>
      <div>
        <h1>Bienvenido a la Assessment App</h1>
        <p>Hola, {user?.email}!</p>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </AuthGuard>
  );
}
