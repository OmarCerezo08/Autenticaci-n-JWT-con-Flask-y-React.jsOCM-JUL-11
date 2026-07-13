import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    // Estados para controlar lo que el usuario escribe en los inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Función que se activa en el onSubmit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue por defecto
        
        try {
            // Realizamos la petición POST al endpoint del backend
            const response = await fetch("http://localhost:3001/user", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ email: email, password: password })
            });

            const data = await response.json();

            if (response.ok) {
                // Si el estado es 200, notificamos y redirigimos a /login
                alert("¡Registro exitoso! Redirigiendo al inicio de sesión...");
                navigate("/login"); 
            } else {
                // Si el backend responde con un error (400), mostramos el mensaje
                alert(data.msg || "Ocurrió un error al registrarse");
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
            alert("No se pudo conectar con el servidor backend.");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "5px auto", padding: "20px" }}>
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Correo Electrónico:</label>
                    <input 
                        type="email" 
                        placeholder="ejemplo@correo.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        placeholder="Mínimo 6 caracteres" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>
                <button type="submit" style={{ padding: "10px 15px", cursor: "pointer" }}>
                    Registrarse
                </button>
            </form>
        </div>
    );
};
