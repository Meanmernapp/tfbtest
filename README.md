# TFB-TEST
Authentication with Passport JWT strategy, built using MongoDB, Express, React (with Vite), Node.js, and TailwindCSS. The backend handles authentication and email sending via SendGrid, while the frontend is deployed on AWS S3 with CloudFront. The backend is hosted on AWS ECS Fargate with support for file uploads to AWS S3.

---

## Features
- **Authentication**: Secure user authentication using Passport JWT strategy.
- **Frontend**: Built with React.js and Vite, styled with TailwindCSS.
- **Backend**: Node.js and Express.js with MongoDB as the database.
- **Email Service**: SendGrid integration for transactional emails.
- **File Uploads**: Upload and manage files on AWS S3.
- **Deployment**:
  - **Frontend**: Deployed on AWS S3 with CloudFront for content delivery.
  - **Backend**: Hosted on AWS ECS Fargate for scalable and containerized deployment.

---

## Installation and Setup

### **1. Clone the Repository**
---
### **2. Backend Setup**

#### Navigate to the server folder:
```bash
cd tfbtest/server
```

#### Install dependencies:
```bash
npm install
```

#### Set environment variables:
Create a `.env` file in the server directory with the following keys:
```env
MONGO_URL=<your-mongodb-connection-string>
SECRET=<your-jwt-secret-key>
PORT=<backend-server-port>
SENDGRID_API_KEY=<your-sendgrid-api-key>
AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
AWS_S3_BUCKET=<your-s3-bucket-name>
AWS_REGION=<your-aws-region>
```

#### Build and Start the server:
```bash
npm run build
npm run start
```

---

### **3. Frontend Setup**

#### Navigate to the client folder:
```bash
cd tfbtest/client
```

#### Install dependencies:
```bash
npm install
```

#### Set environment variables:
Create a `.env` file in the client directory with the following key:
```env
VITE_API_URL=<your-backend-api-url>
```

#### Start the development server:
```bash
npm run dev
```

---

## Deployment

### **Frontend Deployment (AWS S3 + CloudFront)**
1. Build the React app:
   ```bash
   npm run build
   ```
2. Upload the `dist/` folder to your S3 bucket.
3. Configure CloudFront to serve the S3 bucket contents.
4. Update your DNS records to point to the CloudFront distribution URL.

### **Backend Deployment (AWS ECS Fargate)**
1. Create a Docker container for the backend.
2. Push the container to an AWS Elastic Container Registry (ECR).
3. Create an ECS Fargate task to run the container.
4. Configure a Load Balancer or API Gateway to expose the backend API.

---

## Usage

- **Signup and Login**:
  Users can sign up and log in securely with JWT authentication.

- **Email Notifications**:
  Automated transactional emails are sent using SendGrid.

- **File Uploads**:
  Users can upload files directly to AWS S3 via the backend.

---

## Tech Stack

- **Frontend**: React.js (Vite), TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: AWS (S3, CloudFront, ECS Fargate)
- **Email Service**: SendGrid

---

## License
This project is licensed under the [MIT License](LICENSE).
