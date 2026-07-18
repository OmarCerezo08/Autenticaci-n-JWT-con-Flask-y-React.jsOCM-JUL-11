import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const checkAccess = async () => {
            const token = sessionStorage.getItem("token");

            if (!token) {
                alert("No tienes acceso. Por favor inicia sesión.");
                navigate("/login");
                return;
            }

            try {
                // CORREGIDO: Usando la URL larga completa y apuntando al endpoint privado correcto
                const response = await fetch("https://effective-space-halibut-5g9x7v9564xx366q-3001.app.github.dev/api/private", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setIsAuthenticated(true);
                    setUserEmail(data.user); 
                } else {
                    sessionStorage.removeItem("token");
                    alert("Tu sesión ha expirado o es inválida. Inicia sesión de nuevo.");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error validando el token:", error);
                alert("Error de conexión con el servidor.");
                navigate("/login");
            }
        };

        checkAccess();
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
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
                Felicidades, has logrado pasar la validación del token exitosamente.
            </p>
            {userEmail && <p>Conectado como: <strong>{userEmail}</strong></p>}
            
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
