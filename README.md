# 🐳 Microservicios con Docker Compose y AWS EC2

## 📘 Información del Proyecto
- **Alumno:** Jared Torres Morga  
- **Matrícula:** 233310  
- **Grupo:** 7C  
- **Profesor:** José Alonso Macías Motoya  
- **Universidad:** Politécnica de Chiapas  
- **Fecha:** 23/10/25  

---

## 🎯 Objetivo
Diseñar e implementar una **arquitectura de microservicios** utilizando **Docker Compose**, integrando un **frontend web**, un **backend API** y una **base de datos PostgreSQL** con persistencia.  

El proyecto se despliega en una instancia **EC2 de AWS**, permitiendo comprender el funcionamiento de los contenedores, redes internas, volúmenes persistentes y la comunicación entre servicios.

---

## 🧰 Tecnologías Utilizadas
- **Backend:** Python (Flask)  
- **Frontend:** HTML, CSS y JavaScript  
- **Base de datos:** PostgreSQL  
- **Contenedores:** Docker y Docker Compose  
- **Infraestructura:** AWS EC2 (Ubuntu Server 22.04)  
- **Herramientas:** Visual Studio Code, SSH, PuTTY  

---

## ⚙️ Estructura del Proyecto
```
Microservicios/
│
├── backend/
│   ├── Dockerfile
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── Dockerfile
│   ├── App.js
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 Desarrollo del Proyecto

### 1️⃣ Creación del Backend (Flask)
**Archivo:** `backend/app.py`
```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/torres', methods=['GET'])
def torres():
    return jsonify({"nombre": "Jared", "apellido": "Torres"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

**Dockerfile (Backend):**
```dockerfile
FROM python:3.10
WORKDIR /app
COPY . .
RUN pip install flask
EXPOSE 5000
CMD ["python", "app.py"]
```

---

### 2️⃣ Creación del Frontend
**Archivo:** `frontend/App.js`
```javascript
fetch('http://localhost:5000/torres')
  .then(response => response.json())
  .then(data => {
    document.body.innerHTML = `<h1>${data.nombre} ${data.apellido}</h1>`;
  })
  .catch(error => console.error('Error:', error));
```

**Dockerfile (Frontend):**
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["npx", "http-server", "-p", "3000"]
```

---

### 3️⃣ Creación del archivo `docker-compose.yml`
```yaml
version: "3.9"
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 1234
      POSTGRES_DB: jared_db
    ports:
      - "5432:5432"
    volumes:
      - jared_db_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  jared_db_data:
```

---

## 🧩 Comandos utilizados en AWS EC2

### Instalación de Docker y Docker Compose
```bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl enable docker
sudo systemctl start docker
```

### Verificar versiones
```bash
docker --version
docker-compose --version
```

### Construir y levantar los contenedores
```bash
docker-compose build
docker-compose up -d
```

---

## 🗄️ Configuración de la Base de Datos
Acceder al contenedor PostgreSQL:
```bash
docker exec -it microservicios-db-1 psql -U postgres -d jared_db
```

Crear tabla e insertar datos:
```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50)
);

INSERT INTO usuarios (nombre, apellido) VALUES ('Jared', 'Torres');
```

---

## 🧠 Pruebas de Funcionamiento

### Backend
Verificar desde EC2:
```bash
curl http://localhost:5000/torres
```
**Salida esperada:**
```json
{"nombre": "Jared", "apellido": "Torres"}
```

### Frontend
Abrir en el navegador:
```
http://<IP_PUBLICA_EC2>:3000
```
Debe mostrarse:
```
Jared Torres
```

---

## ✅ Resultados
- Arquitectura de microservicios completamente funcional.  
- Comunicación exitosa entre frontend, backend y base de datos.  
- Contenedores desplegados correctamente en AWS EC2.  
- Persistencia de datos mediante volúmenes de Docker.  

---

## 💡 Conclusiones
- Docker Compose simplifica la gestión y despliegue de aplicaciones con múltiples contenedores.  
- AWS EC2 permite emular entornos reales de producción.  
- La práctica permitió comprender el flujo completo entre frontend, backend y base de datos bajo una arquitectura modular y escalable.  

---

## 📸 Anexos
Agrega aquí tus capturas de pantalla del despliegue:

| Descripción | Imagen |
|--------------|--------|
| Contenedores ejecutándose | ![docker ps](./imagenes/contenedores.png) |
| Frontend mostrando datos | ![frontend](./imagenes/frontend.png) |
| Prueba del backend | ![backend](./imagenes/backend.png) |

---

## 📚 Referencias
- Docker Inc. (2024). [Docker Documentation](https://docs.docker.com/)  
- Amazon Web Services (2024). [Amazon EC2 Documentation](https://aws.amazon.com/ec2/)  
- Newman, S. (2021). *Building Microservices: Designing Fine-Grained Systems*. O’Reilly Media.  
