import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        try {
            const response = await fetch("https://effective-space-halibut-5g9x7v9564xx366q-3001.app.github.dev/api/signup", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ email: email, password: password })
            });

            const data = await response.json();

            if (response.status === 201 || response.ok) {
                alert("¡Registro exitoso! Redirigiendo al inicio de sesión...");
                navigate("/login"); 
            } else {
                alert(data.msg || "Ocurrió un error al registrarse");
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
            alert("Error de conexión. Asegúrate de que el puerto 3001 esté en modo Public en la pestaña PORTS.");
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


