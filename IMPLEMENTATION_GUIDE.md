# 🚀 SmartConseil Implementation Guide

## 📋 Overview

This implementation includes two main modules:

### Module 1: Enhanced Grade Corrections
- **Teachers (enseignant)**: Submit grade correction requests with SMS verification
- **Department Heads (chef departement)**: Process and approve/reject requests
- Features: Student first/last name, automatic department head selection, SMS verification, status tracking, history

### Module 2: Report Management
- **Rapporteurs**: Create, edit, validate, and manage reports
- Features: Draft/validated status, report editing, content management, class-based reports

## 🏗️ Architecture

### Backend Services
1. **microserviceUser** (Port 8088) - User authentication and management
2. **microserviceRectification** (Port 8089) - Grade correction requests
3. **microserviceRapport** (Port 8087) - Report management

### Frontend Components
1. **Grade Correction Components**:
   - `GradeCorrectionComponent` - For teachers to submit requests
   - `RectificationManagementComponent` - For department heads to process requests

2. **Report Management Components**:
   - `ReportManagementComponent` - For rapporteurs to manage reports

3. **Dashboard Components**:
   - `DashboardEnseignantComponent` - Teacher dashboard
   - `DashboardChefComponent` - Department head dashboard
   - `DashboardRapporteurComponent` - Rapporteur dashboard

## 🔧 Setup Instructions

### 1. Backend Setup

#### Start User Microservice
```bash
cd microservices/microserviceUser
mvn spring-boot:run
```

#### Start Rectification Microservice
```bash
cd microservices/microserviceRectification
mvn spring-boot:run
```

#### Start Report Microservice
```bash
cd microservices/microserviceRapport
mvn spring-boot:run
```

### 2. Frontend Setup
```bash
ng serve
```

### 3. Database Setup
Ensure MySQL is running with database `ProjetPI`

## 👥 User Roles and Access

### Enseignant (Teacher)
- **Dashboard**: `/dashboard-enseignant`
- **Grade Corrections**: `/grade-correction`
- **Features**:
  - Submit grade correction requests
  - SMS verification for requests
  - View request status and history
  - Track pending/accepted/rejected requests

### Chef Departement (Department Head)
- **Dashboard**: `/dashboard-chef`
- **Rectification Management**: `/rectification-management`
- **Features**:
  - View pending correction requests
  - Accept or reject requests with reasons
  - View processing history
  - User management

### Rapporteur
- **Dashboard**: `/dashboard-rapporteur`
- **Report Management**: `/report-management`
- **Features**:
  - Create new reports
  - Edit draft reports
  - Validate reports (draft → validated)
  - View all reports with filtering
  - Delete draft reports

## 🔐 Authentication & Authorization

### JWT-based Authentication
- All microservices use JWT tokens for authentication
- Role-based access control implemented
- Guards protect routes based on user roles

### Role Mapping
- `ENSEIGNANT` → Teacher access
- `CHEF DEPARTEMENT` → Department head access
- `RAPPORTEUR` → Rapporteur access

## 📊 API Endpoints

### Grade Corrections (Port 8089)
- `POST /api/rectification` - Create correction request
- `POST /api/rectification/verify-sms` - Verify SMS code
- `GET /api/rectification/my-requests` - Get teacher's requests
- `GET /api/rectification/history` - Get teacher's history
- `GET /api/rectification/pending` - Get pending requests (chef)
- `PUT /api/rectification/{id}/status` - Update request status (chef)

### Reports (Port 8087)
- `POST /api/rapport` - Create report
- `PUT /api/rapport/{id}` - Update report
- `PUT /api/rapport/{id}/validate` - Validate report
- `GET /api/rapport/my-reports` - Get rapporteur's reports
- `GET /api/rapport/my-drafts` - Get draft reports
- `GET /api/rapport/my-validated` - Get validated reports
- `DELETE /api/rapport/{id}` - Delete draft report

## 🧪 Testing Guide

### 1. Create Test Users
Visit: `http://localhost:4200/admin-setup`
- Click "Créer Admin" 
- Click "Créer Utilisateurs Test"

### 2. Test Grade Corrections
1. Login as teacher: `enseignant@test.com` / `password123`
2. Navigate to Grade Corrections
3. Submit a correction request
4. Verify SMS code (any 6-digit code works in demo)
5. Login as chef: `chef@test.com` / `password123`
6. Process the request in Rectification Management

### 3. Test Report Management
1. Create a rapporteur user in admin panel
2. Login as rapporteur
3. Navigate to Report Management
4. Create, edit, and validate reports

## 🔍 Key Features Implemented

### Grade Corrections
✅ Separate first/last name fields for students
✅ Automatic department head selection by option
✅ SMS verification with mock implementation
✅ Status tracking (EN_ATTENTE_SMS, EN_ATTENTE, ACCEPTEE, REFUSEE)
✅ Request history for teachers
✅ Processing interface for department heads
✅ Rejection reasons

### Report Management
✅ Create and edit reports
✅ Draft/Validated status system
✅ Report validation workflow
✅ Content management with rich text
✅ Class and sector organization
✅ Academic year and semester tracking
✅ Report deletion (drafts only)

## 🚨 Important Notes

1. **SMS Service**: Currently uses mock implementation. In production, integrate with SMS provider like Twilio
2. **Database**: All microservices share the same MySQL database `ProjetPI`
3. **CORS**: Configured for `http://localhost:4200`
4. **Security**: JWT tokens with role-based access control
5. **Error Handling**: Comprehensive error handling in both frontend and backend

## 🔄 Workflow Examples

### Grade Correction Workflow
1. Teacher submits correction request
2. System generates SMS code and sends to teacher
3. Teacher verifies SMS code
4. Request status changes to "EN_ATTENTE"
5. Department head reviews and processes request
6. Status updates to "ACCEPTEE" or "REFUSEE"
7. Teacher can view final status and history

### Report Management Workflow
1. Rapporteur creates new report (status: BROUILLON)
2. Rapporteur can edit and modify draft
3. When ready, rapporteur validates report
4. Status changes to VALIDE
5. Validated reports cannot be edited or deleted
6. All reports are tracked with timestamps

## 🎯 Next Steps for Production

1. Integrate real SMS service
2. Add email notifications
3. Implement file attachments for reports
4. Add report templates
5. Implement advanced search and filtering
6. Add audit logging
7. Implement backup and recovery
8. Add performance monitoring
