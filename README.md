# **SurveyClass - Backend API**

### **Overview**
This is the backend API for **SurveyClass**, a platform designed to compare and classify Python programming problems through interactive surveys. The backend is built using **NestJS** with **Prisma ORM** for database interactions and **MongoDB** for data storage.

---

### **Tech Stack**
- **NestJS**: A progressive Node.js framework for building scalable APIs.
- **Prisma ORM**: Type-safe and modern ORM for database management.
- **MongoDB**: NoSQL database for storing user, problem, survey, and participant data.

---

### **API Endpoints**

Below is the list of available endpoints categorized by resource:

---

### **1. User Management**

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| `POST` | `/users`            | Create a new user               |
| `GET`  | `/users`            | Retrieve all users              |
| `PATCH`| `/users`            | Update user details             |
| `POST` | `/users/login`      | Log in a user                   |
| `GET`  | `/users/{id}`       | Retrieve a single user by ID    |
| `DELETE`| `/users/{id}`      | Delete a user by ID             |
| `PUT`  | `/users/logout`     | Log out the current user        |

---

### **2. Problems Management**

| Method | Endpoint                  | Description                                |
|--------|---------------------------|--------------------------------------------|
| `POST` | `/problems`               | Create a new problem                       |
| `GET`  | `/problems`               | Retrieve all problems                      |
| `POST` | `/problems/set`           | Create a new problem set                   |
| `POST` | `/problems/set/{id}/upload`| Upload problems to a specific problem set  |
| `GET`  | `/problems/sets`          | Retrieve all problem sets                  |
| `GET`  | `/problems/{id}`          | Retrieve a specific problem by ID          |
| `DELETE`| `/problems/{id}`         | Delete a problem by ID                     |

---

### **3. Participants Management**

| Method | Endpoint                    | Description                                |
|--------|-----------------------------|--------------------------------------------|
| `POST` | `/participants`             | Add a new participant                      |
| `GET`  | `/participants`             | Retrieve all participants                  |
| `POST` | `/participants/bulk-create` | Bulk create participants                   |
| `GET`  | `/participants/{id}`        | Retrieve a participant by ID               |
| `DELETE`| `/participants/{id}`       | Delete a participant by ID                 |

---

### **4. Surveys Management**

| Method | Endpoint                      | Description                                |
|--------|-------------------------------|--------------------------------------------|
| `POST` | `/surveys`                    | Create a new survey                        |
| `GET`  | `/surveys`                    | Retrieve all surveys                       |
| `POST` | `/surveys/validate`           | Validate a survey                          |
| `POST` | `/surveys/update-difficulty`  | Update the difficulty of problems          |
| `GET`  | `/surveys/{id}`               | Retrieve a survey by ID                    |
| `DELETE`| `/surveys/{id}`              | Delete a survey by ID                      |

---

### **Getting Started**

#### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (v16+)
- **npm**
- **MongoDB** (local or cloud instance)
