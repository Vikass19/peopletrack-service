# PeopleTrack Service

## 📌 About the Project
PeopleTrack Service is a web application built with **Django (Backend)** and **React.js (Frontend)**. This project enables users to manage geographical profiles efficiently, visualize data on maps, and provide CRUD functionalities.

## 🛠 Tech Stack
### **Backend (Django)**
- Django REST Framework
- SQLite
- Django serializers
- Authentication & Permissions

### **Frontend (React.js)**
- React.js with Vite
- Tailwind CSS
- React Router
- React Leaflet (for Maps)
- Google Maps API Integration

## 🚀 Features
- User authentication & profile management
- CRUD operations for geographical profiles
- Map-based visualization using **Leaflet.js** and **Google Maps API**
- Responsive and interactive UI

---
## 📂 Project Structure
```
peopletrack-service/
│── backend/                 # Django Backend
│   ├── geo_profiles/        # App for managing geographical profiles
│   ├── media/profile_pics/  # Uploaded profile pictures
│   ├── db.sqlite3           # Database
│   ├── requirements.txt     # Backend dependencies
│   └── manage.py            # Django management script
│
│── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── css/             # Stylesheets
│   │   ├── api/             # API requests
│   │   ├── App.jsx          # Main component
│   │   ├── main.jsx         # Entry file
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   ├── requirements-react.txt # Frontend dependencies
│   └── vite.config.js       # Vite configuration
```

---
## 🔧 Installation & Setup

### **Backend (Django) Setup**
1. **Clone the repository:**
    ```bash
    git clone https://github.com/Vikass19/peopletrack-service.git
    cd peopletrack-service/backend
    ```
2. **Create a virtual environment and activate it:**
    ```bash
    python -m venv myenv
    source myenv/bin/activate  # For macOS/Linux
    myenv\Scripts\activate  # For Windows
    ```
3. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4. **Run migrations:**
    ```bash
    python manage.py migrate
    ```
5. **Create a superuser (optional):**
    ```bash
    python manage.py createsuperuser
    ```
6. **Run the Django server:**
    ```bash
    python manage.py runserver
    ```
7. Open `http://127.0.0.1:8000/` in your browser.

---

### **Frontend (React) Setup**
1. **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Start the React development server:**
    ```bash
    npm run dev
    ```
4. Open `http://localhost:5173/` in your browser.

---
## 📸 Screenshots
### **1️⃣ Login Page**
![Login Page](screenshots/login.png)

### **2️⃣ Dashboard**
![Dashboard](screenshots/dashboard.png)

### **3️⃣ Profile Management**
![Profile Management](screenshots/profile_management.png)

*(Make sure to add actual screenshots in the `screenshots/` folder and update the paths here!)*

---
## 📜 API Endpoints (Django)
| Method  | Endpoint                 | Description                 |
|---------|--------------------------|-----------------------------|
| GET     | `/api/profiles/`          | Fetch all user profiles    |
| POST    | `/api/profiles/`          | Create a new profile       |
| GET     | `/api/profiles/:id/`      | Retrieve a specific profile |
| PUT     | `/api/profiles/:id/`      | Update a profile           |
| DELETE  | `/api/profiles/:id/`      | Delete a profile           |

---
## 👨‍💻 Contributing
- Fork the repository
- Create a new branch (`git checkout -b feature-branch`)
- Make your changes and commit (`git commit -m "Added new feature"`)
- Push to your branch (`git push origin feature-branch`)
- Open a Pull Request!

---


---
## 💡 Contact
For queries or collaborations, reach out to me at **vikasbansode804@gmail.com** 📩

