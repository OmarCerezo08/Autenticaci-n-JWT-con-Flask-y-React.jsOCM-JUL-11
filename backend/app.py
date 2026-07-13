# Asegúrate de importar estos módulos al inicio de tu archivo
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash

# Base de datos temporal en memoria para pruebas rápidas
# (Si usas SQLAlchemy, luego lo mapearemos a tu modelo de Usuario)
USERS_DB = {}

@app.route("/user", methods=["POST"])
def register_user():
    # 1. Obtener los datos enviados desde el frontend (React)
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # 2. Validar que no falte ningún campo
    if not email or not password:
        return jsonify({"msg": "El email y la contraseña son requeridos"}), 400

    # 3. Verificar si el usuario ya existe en nuestra base de datos
    if email in USERS_DB:
        return jsonify({"msg": "Este correo electrónico ya está registrado"}), 400

    # 4. Encriptar la contraseña por seguridad antes de guardarla
    hashed_password = generate_password_hash(password)
    
    # 5. Guardar el usuario
    USERS_DB[email] = {
        "email": email,
        "password": hashed_password
    }
    
    # 6. Responder al frontend que todo salió bien
    return jsonify({"msg": "Usuario creado exitosamente"}), 200
