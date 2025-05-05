# 🚗 LinkRide Web-Application

**LinkRide** is a full-stack ride-sharing web application for campus students, built using **Django (Backend)** and **React + Vite + TailwindCSS (Frontend)**.  
Students can offer or join rides, register/login securely using JWT authentication, and access a modern UI.

---

## 📁 Folder Structure

```
linkride/
├── backend/
│   ├── linkride/           # Django project root
│   ├── rides/              # Rides app: APIs for rides
│   ├── users/              # Custom user registration logic
│   ├── db.sqlite3          # SQLite database
│   └── manage.py
└── frontend/
    ├── src/
    │   ├── api/            # Axios config for API calls
    │   ├── pages/          # React pages (Login, Register, Rides etc.)
    │   └── App.jsx
    ├── index.html
    └── vite.config.js
```

---

## 1️⃣ Backend (Django)

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv env
env\Scripts\activate  # (Windows)
# or
source env/bin/activate  # (Mac/Linux)

# Install dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py makemigrations
python manage.py migrate

# Create a superuser for the Django admin panel
python manage.py createsuperuser

# Run the development server
python manage.py runserver
```

> 🔗 Backend runs at: http://127.0.0.1:8000/  
> 🔐 Admin Panel: http://127.0.0.1:8000/admin/  
> 🔁 JWT Auth:
> - Login: `POST /api/token/`
> - Register: `POST /api/auth/register/`  
> 📦 Ride API: `GET /api/rides/`

---

## 2️⃣ Frontend (React)

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

> 🔗 Frontend runs at: http://localhost:5173/

### Axios Configuration

Edit the base URL in `frontend/src/api/axios.js`:

```js
import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});
```

---

## 🚀 Features

- 🧍‍♂️ Register/Login using JWT tokens
- 🚗 Drivers can post available rides
- 🙋 Students can join available rides
- 🧭 Fully responsive UI with TailwindCSS
- 🔐 Secure API interaction using Axios
- 🎯 Admin panel for user/ride management

---

## 🛠️ Built With

- **Frontend**: React, Vite, TailwindCSS, Axios
- **Backend**: Django, Django REST Framework, Simple JWT
- **Database**: SQLite (default), can switch to PostgreSQL
- **Auth**: JWT (djangorestframework-simplejwt)

---

## 📌 API Endpoints Overview

| Endpoint               | Method | Description           |
|------------------------|--------|-----------------------|
| `/api/rides/`          | GET    | List all rides        |
| `/api/auth/register/`  | POST   | Register new user     |
| `/api/token/`          | POST   | Obtain access token   |
| `/api/token/refresh/`  | POST   | Refresh token         |

---

## 🧪 Test Accounts (Optional)

You can create test users via the Django Admin Panel:

- http://127.0.0.1:8000/admin/

---

## 👨‍💻 Developed By  
  -Naveed Aslam Khan  
  -Sumaiya Fayaz  
  -H. Abdul Wahab  
  -Eisha Raazia  
