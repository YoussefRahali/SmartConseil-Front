# 🔧 Troubleshooting Guide - Rectification & Report Issues

## 🚨 Common Issues and Solutions

### 1. Backend Services Not Running

**Problem**: Cannot create rectifications or reports - connection refused errors.

**Solution**: Ensure all backend services are running:

```bash
# Terminal 1 - User Service
cd microservices/microserviceUser
mvn spring-boot:run

# Terminal 2 - Rectification Service  
cd microservices/microserviceRectification
mvn spring-boot:run

# Terminal 3 - Report Service
cd microservices/microserviceRapport
mvn spring-boot:run
```

**Expected Ports**:
- User Service: http://localhost:8088
- Rectification Service: http://localhost:8089
- Report Service: http://localhost:8087

### 2. CORS Configuration Issues

**Problem**: CORS errors in browser console when making API calls.

**Solution**: Verify CORS configuration in each microservice:

```java
@CrossOrigin(origins = "http://localhost:4200")
// or for development:
@CrossOrigin(origins = "*")
```

### 3. Authentication Issues

**Problem**: 401 Unauthorized errors when creating rectifications/reports.

**Checklist**:
- ✅ User is logged in
- ✅ JWT token is present in sessionStorage
- ✅ Token is being sent in Authorization header
- ✅ User has correct role

**Debug Steps**:
1. Check browser console for authentication errors
2. Verify token in sessionStorage: `sessionStorage.getItem('token')`
3. Check user role: `sessionStorage.getItem('role')`

### 4. Role Name Mismatches

**Problem**: Access denied due to role name inconsistencies.

**Expected Role Names**:
- Teachers: `enseignant`
- Department Heads: `chef departement`
- Rapporteurs: `rapporteur`

**Fix**: Ensure database roles match exactly with frontend expectations.

### 5. Database Connection Issues

**Problem**: Backend services start but database operations fail.

**Solution**: Verify MySQL database:
```sql
-- Check if database exists
SHOW DATABASES;
USE ProjetPI;

-- Check if tables exist
SHOW TABLES;

-- Check user data
SELECT * FROM utilisateur;
```

## 🔍 Debugging Steps

### Step 1: Test Backend Connectivity
Visit: `http://localhost:52036/test-backend`

This page will test:
- User Service connection
- Rectification Service connection  
- Report Service connection
- Authentication headers

### Step 2: Check Browser Console
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for errors when submitting forms
4. Check Network tab for failed requests

### Step 3: Verify Authentication
```javascript
// In browser console:
console.log('Token:', sessionStorage.getItem('token'));
console.log('Role:', sessionStorage.getItem('role'));
console.log('Username:', sessionStorage.getItem('username'));
```

### Step 4: Test API Endpoints Manually

**Test Rectification Creation**:
```bash
curl -X POST http://localhost:8089/api/rectification \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "etudiantPrenom": "John",
    "etudiantNom": "Doe", 
    "classe": "3A",
    "option": "Informatique",
    "ancienneNote": 15,
    "nouvelleNote": 17,
    "justification": "Test"
  }'
```

**Test Report Creation**:
```bash
curl -X POST http://localhost:8087/api/rapport \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "titre": "Test Report",
    "contenu": "Test content",
    "classe": "3A",
    "secteur": "Informatique",
    "anneeAcademique": "2024-2025",
    "semestre": "Semestre 1"
  }'
```

## 🛠️ Quick Fixes

### Fix 1: Update Service URLs
If services are running on different ports, update the service URLs:

```typescript
// In rectification.service.ts
private baseUrl = 'http://localhost:8089/api/rectification';

// In rapport.service.ts  
private baseUrl = 'http://localhost:8087/api/rapport';

// In auth.service.ts
private baseURL = "http://localhost:8088/auth";
```

### Fix 2: Add Error Handling
Enhanced error handling in components:

```typescript
this.rectificationService.create(this.formData).subscribe({
  next: (response) => {
    console.log('Success:', response);
    // Handle success
  },
  error: (error) => {
    console.error('Error details:', error);
    console.error('Error status:', error.status);
    console.error('Error message:', error.error);
    this.errorMessage = `Error: ${error.status} - ${error.error?.message || error.message}`;
  }
});
```

### Fix 3: Verify Role-Based Access
Update routing with correct role names:

```typescript
{
  path: 'grade-correction',
  component: GradeCorrectionComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { expectedRoles: ['enseignant'] }  // Exact match required
}
```

## 📋 Testing Checklist

### Before Testing:
- [ ] All 3 backend services running
- [ ] MySQL database accessible
- [ ] Angular app running (ng serve)
- [ ] Admin user created via /admin-setup
- [ ] Test users created

### Test Rectification Module:
- [ ] Login as teacher (enseignant@test.com)
- [ ] Navigate to Grade Correction
- [ ] Fill form with valid data
- [ ] Submit and verify SMS modal appears
- [ ] Enter any 6-digit code
- [ ] Verify request appears in history

### Test Report Module:
- [ ] Create rapporteur user
- [ ] Login as rapporteur
- [ ] Navigate to Report Management
- [ ] Create new report
- [ ] Edit draft report
- [ ] Validate report
- [ ] Verify status changes

## 🆘 Emergency Reset

If nothing works, try this complete reset:

1. **Stop all services**
2. **Clear browser data**: sessionStorage, localStorage, cookies
3. **Restart MySQL**
4. **Restart all backend services**
5. **Clear Angular cache**: `ng build --delete-output-path`
6. **Restart Angular**: `ng serve`
7. **Recreate admin and test users**

## 📞 Support

If issues persist:
1. Check the browser console for specific error messages
2. Check backend service logs for errors
3. Verify database connectivity and data
4. Test API endpoints directly with curl/Postman
