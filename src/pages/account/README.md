# Account System

This directory contains the authentication and user management components for the Vue 3 CMS.

## Components

### Auth.vue
- **Purpose**: Login page for user authentication
- **Features**:
  - Username and password input fields
  - Form validation
  - API integration with the account service
  - Automatic redirect to dashboard after successful login
  - Error handling and user feedback

### Profile.vue
- **Purpose**: Display user profile information
- **Features**:
  - Shows user details from the API response
  - Displays name, last name, username, mobile number, status
  - Shows creation and modification dates
  - Responsive design with avatar placeholder

### Logout.vue
- **Purpose**: Handle user logout
- **Features**:
  - Confirmation dialog
  - API call to revoke token
  - Clear local storage and cookies
  - Redirect to login page

## API Integration

The components integrate with the following API endpoints:

1. **Login**: `POST /api/v1/users/login`
   - Payload: `{ username: "admin", password: "123456789" }`
   - Response: Token and expiration date

2. **Profile**: `GET /api/v1/users/profile`
   - Response: User information including name, last name, mobile, etc.

3. **Logout**: `DELETE /api/v1/users/revoke`
   - Clears authentication token

## Store Integration

All components use the Pinia store (`useAccountStore`) for:
- Authentication state management
- User data storage
- Token management
- API calls

## Authentication Flow

1. User visits `/account/auth`
2. Enters username and password
3. Form submits to login API
4. On success, token is stored in cookies
5. User profile is fetched
6. User is redirected to dashboard
7. Protected routes check for valid token
8. Logout clears all authentication data

## Styling

- Custom CSS with responsive design
- Persian/Farsi text support
- Modern UI with gradients and shadows
- Mobile-friendly layout

## Usage

To use the login system:

1. Navigate to `/account/auth`
2. Enter valid credentials
3. Upon successful login, you'll be redirected to the dashboard
4. Access profile at `/account/profile`
5. Logout at `/account/logout`

## Security Features

- Token-based authentication
- Secure cookie storage
- Route guards for protected pages
- Automatic token validation
- Secure logout with token revocation
