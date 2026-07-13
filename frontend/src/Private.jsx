import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Verificamos si existe el token en el sessionStorage
        const token = sessionStorage.getItem("token");

        if (!token) {
            // Si no hay token, se le deniega el acceso y va a /login
            alert("No tienes acceso. Por favor inicia sesión.");
            navigate("/login");
        } else {
            // Si hay token, se aprueba la visualización
            setIsAuthenticated(true);
        }
    }, [navigate]);

    // 🚪 Función para Cerrar Sesión
    const handleLogout = () => {
        // 1. Elimina el token del sessionStorage por completo
        sessionStorage.removeItem("token");
        
        // 2. Redirige a la página de inicio pública (/signup o /login)
        alert("Sesión cerrada correctamente.");
        navigate("/login");
    };

    if (!isAuthenticated) {
        return <p style={{ textAlign: "center", marginTop: "50px" }}>Cargando área privada...</p>;
    }

    return (
        <div style={{ maxWidth: "600px", margin: "50px auto", padding: "30px", border: "2px solid #28a745", borderRadius: "8px", textAlign: "center" }}>
            <h1 style={{ color: "#28a745" }}>🔒 ¡Bienvenido a la Vista Privada!</h1>
            <p style={{ fontSize: "18px", marginTop: "15px" }}>
                Felicidades, has logrado pasar la validación del token exitosamente. Este contenido solo es visible para usuarios autenticados.
            </p>
            
            {/* Botón de cierre de sesión con el evento onClick configurado */}
            <button 
                onClick={handleLogout} 
                style={{ 
                    marginTop: "30px", 
                    padding: "10px 20px", 
                    background: "#dc3545", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "4px", 
                    cursor: "pointer",
                    fontSize: "16px" 
                }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
};
