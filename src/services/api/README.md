# API Services Documentation

This directory contains all the API services for the Vue 3 CMS application, following modern JavaScript best practices.

## Structure

```
src/services/api/
├── index.js              # Main export file
├── rest.js               # Base REST API utility
├── account.js            # Authentication & user profile
├── attachment.js         # File uploads & management
├── contactRequest.js     # Contact request operations
├── faq.js               # FAQ management
├── faqCategory.js       # FAQ category operations
├── guide.js             # Guide management
├── job.js               # Job operations
├── jobRequest.js        # Job request management
├── jobSection.js        # Job section operations
├── magazine.js          # Magazine management
├── magazineCategory.js  # Magazine category operations
├── multimedia.js        # Multimedia content
├── rateAndReview.js     # Reviews & ratings
├── role.js              # Role management
├── socialNetwork.js     # Social network operations
└── user.js              # User management
```

## Usage

### Import Individual Services

```javascript
import { accountService, userService } from '@/services/api'

// Use authentication
const login = async (credentials) => {
  try {
    const response = await accountService.login(credentials)
    return response.data
  } catch (error) {
    console.error('Login failed:', error)
  }
}

// Use user management
const updatePassword = async (passwordData) => {
  try {
    const response = await userService.updatePassword(passwordData)
    return response.data
  } catch (error) {
    console.error('Password update failed:', error)
  }
}
```

### Import All Services

```javascript
import apiServices from '@/services/api'

// Access any service
const faqData = await apiServices.faq.read()
const jobSearch = await apiServices.job.search({ category: 'tech' })
```

### Using REST API Methods

All services that extend the REST API provide these standard methods:

- `read(params)` - Get all items with optional filters
- `readItem(id)` - Get a single item by ID
- `create(payload)` - Create a new item
- `update(payload)` - Update an existing item (requires payload.id)
- `delete(id)` - Delete an item by ID

### Custom Methods

Services may include additional custom methods beyond the standard REST operations:

- `accountService.logout()` - User logout
- `contactRequestService.checked(id)` - Mark contact request as checked
- `jobRequestService.updateState(params)` - Update job request state
- `rateAndReviewService.answer(id, payload)` - Answer a review
- `rateAndReviewService.confirm(id)` - Confirm a review

## Error Handling

All API calls return promises that should be handled with try-catch blocks:

```javascript
try {
  const response = await userService.read()
  // Handle success
} catch (error) {
  // Handle error
  console.error('API Error:', error.response?.data || error.message)
}
```

## Configuration

The API services use the axios instance configured in `@/config/axios.js` with the base URL from `@/config/api.js`.

## Best Practices

1. **Always use try-catch** when calling API methods
2. **Handle loading states** in your components
3. **Validate responses** before using data
4. **Use TypeScript interfaces** for better type safety (recommended)
5. **Implement proper error boundaries** in your Vue components

## Adding New Services

To add a new API service:

1. Create a new file in this directory
2. Import the `createRestService` utility if you need standard CRUD operations
3. Add custom methods as needed
4. Export the service
5. Add it to the `index.js` file

Example:

```javascript
import apiClient from '@/config/axios'
import { createRestService } from './rest'

export const newService = {
  ...createRestService(apiClient, 'new-resource'),
  
  customMethod() {
    return apiClient.get('/api/v1/new-resource/custom')
  }
}

export default newService
```
