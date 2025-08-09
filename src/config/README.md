# API Configuration

This directory contains the API configuration for the application.

## Environment-based Configuration

The application supports two environments:

### Development Environment
- **Base URL**: `https://apilanding.trustedtsp.ir`
- **Image Base URL**: `https://apilanding.trustedtsp.ir/images/`
- **Video Base URL**: `https://apilanding.trustedtsp.ir/videos/`
- **File Base URL**: `https://apilanding.trustedtsp.ir/files/`

### Production Environment
- **Base URL**: `https://apilanding.sadadtsp.ir`
- **Image Base URL**: `https://apilanding.sadadtsp.ir/images/`
- **Video Base URL**: `https://apilanding.sadadtsp.ir/videos/`
- **File Base URL**: `https://apilanding.sadadtsp.ir/files/`

## Usage

The environment is automatically determined based on the `import.meta.env.DEV` or `import.meta.env.MODE` values:

- If `DEV` is `true` or `MODE` is `'development'`, the development environment is used
- Otherwise, the production environment is used

## Importing Configuration

```javascript
import { baseURL, imageBaseURL, videoBaseURL, fileBaseURL } from '@/config/api';
```

## Components Updated

The following components and services have been updated to use the new configuration system:

### Services
- `src/services/guide.js` - Updated to use `fileBaseURL`
- `src/services/magazine.js` - Uses axios client with configured `baseURL`

### Stores
- `src/stores/multimedia.js` - Updated to use `imageBaseURL` and `videoBaseURL`
- `src/stores/reviews.js` - Updated to use `baseURL`

### Components
- `src/components/home/news.vue` - Updated to use `imageBaseURL`
- `src/components/common/VMagazine/MagazinePage.vue` - Updated to use `imageBaseURL`
- `src/components/common/VNewsPopup/VNewsPopup.vue` - Updated to use `imageBaseURL`

### Pages
- `src/pages/contactUsPage.vue` - Updated to use `baseURL`
- `src/pages/cooperationRequestPage.vue` - Updated to use `baseURL`
- `src/pages/tutorialsPage.vue` - Updated to use `baseURL`, `videoBaseURL`, and `imageBaseURL`

### Plugins
- `src/plugins/axios.js` - Updated to use configured `baseURL`

## Benefits

1. **Environment Switching**: Easy switching between test and production environments
2. **Centralized Configuration**: All API URLs are managed in one place
3. **Type Safety**: Consistent URL structure across the application
4. **Maintainability**: Easy to update URLs when needed 