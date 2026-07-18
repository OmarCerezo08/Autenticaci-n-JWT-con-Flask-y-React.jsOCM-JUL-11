import os
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS # Crucial para conectar con React sin errores de origen

# 1. Inicializar la app de Flask y habilitar CORS global absoluto para Codespaces
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configurar la extensión JWT (Usa una clave secreta para firmar los tokens)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET") or "mi-clave-secreta-super-segura"
jwt = JWTManager(app)

# Base de datos temporal en memoria
USERS_DB = {}

# Endpoint de Registro (Tu código base mejorado)
@app.route("/api/signup", methods=["POST"])
def register_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "El email y la contraseña son requeridos"}), 400

    if email in USERS_DB:
        return jsonify({"msg": "Este correo electrónico ya está registrado"}), 400

    hashed_password = generate_password_hash(password)
    
    USERS_DB[email] = {
        "email": email,
        "password": hashed_password
    }
    
    return jsonify({"msg": "Usuario creado exitosamente"}), 201

# 2. Endpoint de Login (Generar el Token JWT)
@app.route("/api/login", methods=["POST"])
def login_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "El email y la contraseña son requeridos"}), 400

    # Buscar usuario en la base de datos en memoria
    user = USERS_DB.get(email)
    
    # Validar existencia y verificar la contraseña encriptada
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"msg": "Correo electrónico o contraseña incorrectos"}), 401

    # Generar el token JWT usando el email como identidad
    access_token = create_access_token(identity=email)
    
    return jsonify({
        "msg": "Inicio de sesión exitoso",
        "token": access_token,
        "email": email
    }), 200

# 3. Endpoint Privado (Verificar el Token JWT)
@app.route("/api/private", methods=["GET"])
@jwt_required() # Bloquea el acceso si no se envía un token válido en la cabecera
def get_private_data():
    # Obtener el email del usuario desde el token validado
    current_user_email = get_jwt_identity()
    
    return jsonify({
        "msg": "Acceso concedido a la zona privada",
        "user": current_user_email
    }), 200

# Arrancar el servidor de desarrollo
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001, debug=True)

