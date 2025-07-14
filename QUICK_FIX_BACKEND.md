# 🚀 Quick Fix for Backend Services

## 🎯 Most Common Issues and Immediate Solutions

### 1. CORS Configuration Fix

Add this to ALL your Spring Boot controllers:

```java
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:52036"})
```

**For microserviceRectification - RectificationController.java:**
```java
@RestController
@RequestMapping("/api/rectification")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:52036"})
public class RectificationController {
    // ... existing code
}
```

**For microserviceRapport - RapportController.java:**
```java
@RestController
@RequestMapping("/api/rapport")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:52036"})
public class RapportController {
    // ... existing code
}
```

### 2. Add Global CORS Configuration

Create this file in each microservice:

**src/main/java/tn/esprit/microservice*/config/CorsConfig.java:**
```java
package tn.esprit.microservice*.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200", "http://localhost:52036")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:4200");
        configuration.addAllowedOrigin("http://localhost:52036");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### 3. Update Security Configuration

**For microserviceRectification - SecurityConfig.java:**
```java
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/rectification/**").authenticated()
                .anyRequest().permitAll()
            )
            .addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### 4. Test Endpoints

Add these test endpoints to verify services are running:

**RectificationController.java:**
```java
@GetMapping("/test")
public ResponseEntity<String> test() {
    return ResponseEntity.ok("Rectification service is running!");
}
```

**RapportController.java:**
```java
@GetMapping("/test")
public ResponseEntity<String> test() {
    return ResponseEntity.ok("Report service is running!");
}
```

### 5. Database Connection Check

Verify your application.properties in each microservice:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/ProjetPI
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server Configuration
server.port=8089  # for rectification
# server.port=8087  # for rapport

# CORS
spring.web.cors.allowed-origins=http://localhost:4200,http://localhost:52036
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

## 🔧 Quick Start Commands

### Start All Services:

```bash
# Terminal 1 - User Service
cd microservices/microserviceUser
mvn clean spring-boot:run

# Terminal 2 - Rectification Service
cd microservices/microserviceRectification  
mvn clean spring-boot:run

# Terminal 3 - Report Service
cd microservices/microserviceRapport
mvn clean spring-boot:run

# Terminal 4 - Frontend
cd SmartConseil-Front
ng serve
```

### Verify Services:

```bash
# Check if services are running
curl http://localhost:8088/actuator/health
curl http://localhost:8089/api/rectification/test
curl http://localhost:8087/api/rapport/test
```

## 🎯 Testing Steps

1. **Start all backend services**
2. **Visit**: http://localhost:52036/test-backend
3. **Test each service connection**
4. **Go to**: http://localhost:52036/admin-setup
5. **Create admin and test users**
6. **Login and test functionality**

## 🚨 Emergency Commands

If services won't start:

```bash
# Kill any processes on the ports
netstat -ano | findstr :8088
netstat -ano | findstr :8089
netstat -ano | findstr :8087

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Clean and restart
mvn clean compile
mvn spring-boot:run
```

## ✅ Success Indicators

- ✅ All 3 backend services start without errors
- ✅ Test backend page shows all services as "Success"
- ✅ Can create admin user via /admin-setup
- ✅ Can login with test users
- ✅ Can access role-specific dashboards
- ✅ Can create rectifications and reports without CORS errors
