import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        try {
            // Realizamos la petición POST al endpoint /token del backend
            const response = await fetch("http://localhost:3001/token", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ email: email, password: password })
            });

            const data = await response.json();

            if (response.ok) {
                // El backend nos devuelve un objeto token -> data.token
                // Lo guardamos de manera segura en el sessionStorage del navegador
                sessionStorage.setItem("token", data.token);
                
                alert("¡Inicio de sesión exitoso!");
                
                // Redireccionamos de inmediato a la ruta privada
                navigate("/private"); 
            } else {
                // Si las credenciales son incorrectas, mostramos el error del backend
                alert(data.msg || "Correo o contraseña incorrectos");
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
            alert("No se pudo conectar con el servidor.");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px", textAlign: "left" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Correo Electrónico:</label>
                    <input 
                        type="email" 
                        placeholder="ejemplo@correo.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px", textAlign: "left" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Contraseña:</label>
                    <input 
                        type="password" 
                        placeholder="Ingresa tu contraseña" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <button type="submit" style={{ width: "100%", padding: "10px", background: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    Ingresar
                </button>
            </form>
        </div>
    );
};
