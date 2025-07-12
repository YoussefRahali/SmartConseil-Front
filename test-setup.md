# 🚀 SmartConseil Setup and Testing Guide

## 🔧 **Step 1: Start the Backend Services**

### Start User Microservice
```bash
cd microservices/microserviceUser
mvn spring-boot:run
```
The service will start on port **8088**

### Start Rectification Microservice
```bash
cd microservices/microserviceRectification
mvn spring-boot:run
```
The service will start on port **8089**

## 🌐 **Step 2: Start the Angular Frontend**
```bash
ng serve
```
The application will be available at **http://localhost:4200**

## 👥 **Step 3: Create Initial Users**

### Option A: Using the Web Interface
1. Go to **http://localhost:4200/admin-setup**
2. Click "Créer Admin" to create the admin user
3. Click "Créer Utilisateurs Test" to create test users

### Option B: Using API Endpoints Directly
```bash
# Create admin user
curl -X POST http://localhost:8088/auth/create-admin

# Create test users
curl -X POST http://localhost:8088/auth/create-test-users
```

## 🔐 **Step 4: Test Login with Different Roles**

### Test Accounts Created:
1. **Admin/Chef Département:**
   - Email: `admin@smartconseil.com`
   - Password: `admin123`
   - Role: `chef departement`

2. **Chef Département (Test):**
   - Email: `chef@test.com`
   - Password: `password123`
   - Role: `chef departement`

3. **Enseignant (Test):**
   - Email: `enseignant@test.com`
   - Password: `password123`
   - Role: `enseignant`

## 🧪 **Step 5: Test Role-Based Access**

### Login as Enseignant (`enseignant@test.com`)
- Should redirect to: `/dashboard-enseignant`
- Can access: Rectification component
- Cannot access: User management

### Login as Chef Département (`chef@test.com` or `admin@smartconseil.com`)
- Should redirect to: `/dashboard-chef`
- Can access: User management, planning, reports
- Can create/delete users

## 🔍 **Step 6: Debug and Troubleshooting**

### Check if user exists in database:
```bash
curl http://localhost:8088/auth/check-user/enseignant@test.com
```

### Manual database verification:
```sql
SELECT id, username, email, role, password FROM users;
```

### Check JWT token generation:
- Login and check browser developer tools → Network tab
- Look for the `/auth/login` response
- Verify the token contains role information

## 🎯 **Expected Behavior**

1. **Authentication Flow:**
   - User enters credentials
   - Backend validates and generates JWT with role
   - Frontend stores token and redirects based on role

2. **Authorization Flow:**
   - Guards check authentication status
   - Role guards verify user permissions
   - JWT interceptor adds token to requests

3. **Role-Based Redirection:**
   - `enseignant` → `/dashboard-enseignant`
   - `chef departement` → `/dashboard-chef`

## 🚨 **Common Issues and Solutions**

### Issue: "User not found" during login
**Solution:** Use the admin setup page to create users with proper password encoding

### Issue: "Access denied" errors
**Solution:** Check that JWT token contains the correct role information

### Issue: Users can't access protected routes
**Solution:** Verify that guards are properly configured and JWT is valid

### Issue: Database connection errors
**Solution:** Ensure MySQL is running and database `ProjetPI` exists

## 📝 **Manual Database User Creation (if needed)**
```sql
INSERT INTO users (username, email, password, role, poste, Secteur) VALUES 
('Test Enseignant', 'enseignant@test.com', '$2a$10$encrypted_password_here', 'enseignant', 'Professeur', 'Informatique');
```
**Note:** Always use the API endpoints instead of manual insertion to ensure proper password encoding.
