# Grade Rectification Assignment Fix

## Problem Identified

When creating a grade rectification, it was not being properly assigned to the correct chef department based on the sector/option. The rectification was always assigned to the default `chef@test.com` regardless of the sector.

## Root Cause Analysis

1. **Missing Endpoint**: The UserService in microserviceRectification was trying to call `/api/users/chef-by-sector/{option}` but this endpoint didn't exist in the UserController.

2. **Mock Implementation**: The UserService was falling back to a mock implementation that always returned `chef@test.com` for all sectors.

3. **Missing Repository Method**: The UserRepository didn't have a method to find users by both role and sector.

## Solution Implemented

### 1. Added Repository Method
**File**: `microservices/microserviceUser/src/main/java/com/example/microserviceuser/Repository/UserRepository.java`
```java
User findByRoleAndSecteur(String role, String secteur);
```

### 2. Added Missing Endpoint
**File**: `microservices/microserviceUser/src/main/java/com/example/microserviceuser/Controller/UserController.java`
```java
@GetMapping("/chef-by-sector/{sector}")
public ResponseEntity<String> getChefBySector(@PathVariable String sector) {
    User chef = userRepository.findByRoleAndSecteur("chef departement", sector);
    if (chef != null) {
        return ResponseEntity.ok(chef.getEmail());
    }
    // Return default chef if no specific chef found for the sector
    return ResponseEntity.ok("chef@test.com");
}
```

### 3. Updated UserService to Use Real Endpoint
**File**: `microservices/microserviceRectification/src/main/java/tn/esprit/microservicerectification/service/UserService.java`
- Removed mock implementation
- Updated `findChefDepartementByOption()` to actually call the real endpoint
- Added proper logging for debugging

### 4. Added Enhanced Test User Creation
**File**: `microservices/microserviceUser/src/main/java/com/example/microserviceuser/Controller/AuthController.java`
- Added `/create-sector-test-users` endpoint to create chef departement users for all sectors

## How to Test the Fix

### 1. Create Test Users for All Sectors
```bash
curl -X POST http://localhost:8088/auth/create-sector-test-users
```

This will create:
- `chef.informatique@test.com` (Informatique sector)
- `chef.mathématique@test.com` (Mathématique sector)
- `chef.telecommunication@test.com` (Telecommunication sector)
- `chef.ml@test.com` (ML sector)
- `chef.gc@test.com` (GC sector)

### 2. Test the Chef Assignment Endpoint
```bash
# Test finding chef for Informatique sector
curl http://localhost:8088/api/users/chef-by-sector/Informatique

# Test finding chef for Mathématique sector
curl http://localhost:8088/api/users/chef-by-sector/Mathématique
```

### 3. Test Grade Rectification Assignment
1. Login as an enseignant
2. Create a grade rectification with different sectors/options
3. Verify that the rectification is assigned to the correct chef departement based on the sector

## Expected Behavior After Fix

- When an enseignant creates a grade rectification for "Informatique" option → assigned to `chef.informatique@test.com`
- When an enseignant creates a grade rectification for "Mathématique" option → assigned to `chef.mathématique@test.com`
- When an enseignant creates a grade rectification for "ML" option → assigned to `chef.ml@test.com`
- And so on for other sectors...

## Files Modified

1. `microservices/microserviceUser/src/main/java/com/example/microserviceuser/Repository/UserRepository.java`
2. `microservices/microserviceUser/src/main/java/com/example/microserviceuser/Controller/UserController.java`
3. `microservices/microserviceRectification/src/main/java/tn/esprit/microservicerectification/service/UserService.java`
4. `microservices/microserviceUser/src/main/java/com/example/microserviceuser/Controller/AuthController.java`

The fix ensures that grade rectifications are properly routed to the appropriate chef department based on the academic sector/option, enabling proper workflow and approval processes.
