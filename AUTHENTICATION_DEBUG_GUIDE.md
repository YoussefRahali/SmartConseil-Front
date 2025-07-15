# Authentication Debug Guide

## Problem
Getting "Accès refusé. Vérifiez vos permissions." (403 Forbidden) when trying to create grade rectifications.

## Root Cause Analysis
The issue was in JWT token generation and role mapping:

1. **JWT Token Missing Subject**: The JWT token wasn't including the user's email as the subject
2. **Role Mapping Inconsistency**: Different microservices were handling role conversion differently

## Fixes Applied

### 1. Fixed JWT Token Generation
**File**: `microservices/microserviceUser/src/main/java/com/example/microserviceuser/Service/auth/JwtUtils.java`

```java
public static String generateToken(String email, String role) {
    return Jwts.builder()
            .setSubject(email)  // ✅ Fixed: Now includes email as subject
            .claim("role", role)
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(KEY)
            .compact();
}
```

### 2. Fixed Role Mapping in Rectification Service
**File**: `microservices/microserviceRectification/src/main/java/tn/esprit/microservicerectification/security/JwtAuthenticationFilter.java`

```java
// Convert role to match @PreAuthorize expectations: "enseignant" -> "ROLE_ENSEIGNANT"
String normalizedRole = role.toUpperCase().replace(" ", "_");
SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + normalizedRole);
```

### 3. Added Debug Endpoints
Added test endpoints to debug authentication:
- `/api/rectification/test-auth` - Shows authentication status
- `/api/rectification/test-enseignant` - Tests enseignant role specifically

## Testing Steps

### Step 1: Restart Services
Make sure to restart both microservices after the changes:
```bash
# Stop and restart microserviceUser (port 8088)
# Stop and restart microserviceRectification (port 8089)
```

### Step 2: Create Test Users
```bash
curl -X POST http://localhost:8088/auth/create-test-users
```

### Step 3: Login and Get Token
1. Login as enseignant in the frontend: `enseignant@test.com` / `password123`
2. Check browser's sessionStorage for the token
3. Or use the browser's Network tab to see the Authorization header

### Step 4: Test Authentication
```bash
# Replace YOUR_JWT_TOKEN with the actual token from sessionStorage
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:8089/api/rectification/test-auth
```

Expected response:
```json
{
  "authenticated": true,
  "username": "enseignant@test.com",
  "hasAuthentication": true,
  "authName": "enseignant@test.com",
  "authorities": "[ROLE_ENSEIGNANT]"
}
```

### Step 5: Test Enseignant Role
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:8089/api/rectification/test-enseignant
```

Expected response:
```
Success! Enseignant role verified for: enseignant@test.com
```

### Step 6: Test Grade Rectification Creation
Now try creating a grade rectification through the frontend. It should work!

## Debugging Tips

### Check JWT Token Content
You can decode JWT tokens at https://jwt.io to see their content. A valid token should have:
- **Header**: Algorithm info
- **Payload**: 
  - `sub`: User's email (e.g., "enseignant@test.com")
  - `role`: User's role (e.g., "enseignant")
  - `exp`: Expiration timestamp

### Check Browser Console
Look for any JavaScript errors in the browser console when submitting the form.

### Check Backend Logs
Look for the debug messages in the rectification service console:
```
JWT Debug - Username: enseignant@test.com, Role: enseignant
JWT Debug - Creating authority: ROLE_ENSEIGNANT
JWT Debug - Authentication set successfully for user: enseignant@test.com
```

### Common Issues
1. **Token expired**: Login again to get a fresh token
2. **Wrong role**: Make sure you're logged in as an enseignant, not chef departement
3. **Service not running**: Ensure both microserviceUser (8088) and microserviceRectification (8089) are running
4. **CORS issues**: Check that CORS is properly configured for localhost:4200

## Expected Behavior After Fix
- Enseignant users can create grade rectifications
- Rectifications are properly assigned to the correct chef departement based on sector
- No more "Accès refusé" errors for valid enseignant users
