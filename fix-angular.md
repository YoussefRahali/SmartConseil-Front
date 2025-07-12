# 🔧 Fix Angular Project Issues

## 🚨 **Step 1: Clean and Reinstall Dependencies**

```bash
# Delete node_modules and package-lock.json
rm -rf node_modules
rm package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

## 🔍 **Step 2: Check for Specific Errors**

Try to run the project and see what specific error you get:

```bash
# Try to build first
ng build

# If build works, try to serve
ng serve
```

## 🛠️ **Step 3: Common Angular 19 Issues and Fixes**

### Issue 1: Guard Interface Changes
✅ **Fixed** - Updated guards to use new Angular 19 interface

### Issue 2: Keycloak Dependencies
✅ **Fixed** - Removed Keycloak from package.json

### Issue 3: Missing Spec Files
✅ **Fixed** - Added missing test files

### Issue 4: Angular CLI in Wrong Dependencies
✅ **Fixed** - Moved Angular CLI to devDependencies

## 🔧 **Step 4: Alternative Installation Method**

If npm install fails, try:

```bash
# Use yarn instead
npm install -g yarn
yarn install

# Or use npm with legacy peer deps
npm install --legacy-peer-deps

# Or force the installation
npm install --force
```

## 🐛 **Step 5: Debug Specific Errors**

### If you get TypeScript errors:
```bash
# Check TypeScript version compatibility
npm list typescript

# Update TypeScript if needed
npm install typescript@~5.8.3 --save-dev
```

### If you get Angular version conflicts:
```bash
# Update all Angular packages
ng update @angular/core @angular/cli
```

### If you get ngx-webcam errors:
```bash
# Check if ngx-webcam is compatible with Angular 19
npm install ngx-webcam@latest
```

## 📋 **Step 6: Verify Installation**

After fixing, verify everything works:

```bash
# Check Angular CLI version
ng version

# Try to build
ng build --configuration development

# Try to serve
ng serve --port 4200
```

## 🆘 **If Still Having Issues**

Please share the **exact error message** you're getting. Common error types:

1. **Compilation errors** - TypeScript/Angular compilation issues
2. **Dependency errors** - Missing or incompatible packages
3. **Runtime errors** - Issues when running ng serve
4. **Build errors** - Issues when running ng build

## 🎯 **Quick Test Commands**

```bash
# Test 1: Check if Angular CLI works
ng version

# Test 2: Check if project structure is valid
ng lint

# Test 3: Try minimal build
ng build --configuration development --verbose

# Test 4: Check for circular dependencies
npm run build 2>&1 | grep -i circular
```

## 📞 **Next Steps**

1. Run the commands above
2. Share the specific error message you get
3. I'll provide targeted fixes based on the exact error

The most common issue is usually dependency conflicts after removing Keycloak packages, which should be fixed by reinstalling node_modules.
