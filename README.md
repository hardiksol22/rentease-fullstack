# RentEase 📦 – Full-Stack Furniture & Appliances Rental Platform

RentEase is a production-grade, mobile-first MERN stack e-commerce platform designed for renting premium furniture and appliances. Built with an emphasis on high performance, clean architecture, and optimized data layers, the system cleanly segregates regular consumer checkout lifecycles from an executive-level Admin Command Center.

## 🚀 Live Deployments
* **Frontend Web App:** [Live on Vercel](https://rentease-fullstack.vercel.app/) 

* **Backend API Gateway:** [Live on Render](https://rentease-backend-4uec.onrender.com) 

> ⚡ **Hosting Note:** Hosted on a cloud free-tier environment. If the application has been idle, the backend instance may require approximately 40-50 seconds to complete cold-start boot sequences upon initial load.

---

## 🛠️ Key Architectural Features

* **Dynamic Rental & Tenure Ledger Engine:** An interactive pricing engine on the client side that dynamically re-calculates monthly rent tiers and escrow security deposits based on user-selected lease commitments (3, 6, or 12 months).
* **Role-Based Access Control (RBAC):** Secure token-based boundary authentication separating the standard client catalog view from the executive workspace.
* **Executive Central Command (Admin Dashboard):** A high-visibility interface providing macro overview calculations for Month-over-Month Revenue (MRR), escrow safety deposit cash holdings, active lease registries, and complete client demographics.
* **Algorithmic Search Registry:** Highly scannable product index queries running regex pattern matching for instant, smooth asset search updates.
* **Admin Sandbox Testing Bypass:** Integrated testing environment enabling rapid pipeline checks for mock transaction logs using restricted Virtual Payment Addresses (VPAs).

---

## 💻 Tech Stack Portfolio

| Layer | Technologies |
| :--- | :--- |
| **Frontend UI** | React.js (Hooks, Context API), Tailwind CSS, Axios Architecture |
| **Backend API** | Node.js, Express.js, JSON Web Tokens (JWT), REST Routing |
| **Database Cloud** | MongoDB Atlas, Mongoose ODM, Document Validation Schemas |
| **DevOps / Deployment** | Git, Vercel Core, Render Engine Pipeline |

---

## ⚙️ Environment Variables Template

Create a `.env` file inside your `/backend` directory and provision the following keys:

```env
PORT=5000
MONGO_URI=mongodb+srv://rentease_db_user:RentEase2026@cluster0.wwxqnja.mongodb.net/rentease?appName=Cluster0
JWT_SECRET=RentEaseSuperSecretEncryptionKey2026
NODE_ENV=development
VITE_API_URL=http://localhost:5000/api