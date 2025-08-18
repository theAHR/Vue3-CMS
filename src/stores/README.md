# Pinia Stores Documentation

This directory contains all the Pinia stores for the Vue 3 CMS application, converted from Vuex with modern Composition API patterns.

## Structure

```
src/stores/
├── index.js              # Main export file
├── account.js            # Authentication & user profile
├── app.js                # Application state
├── contactRequest.js     # Contact request operations
├── faq.js               # FAQ management
├── faqCategory.js        # FAQ category operations
├── guide.js              # Guide management
├── job.js                # Job operations
├── jobRequest.js         # Job request management
├── jobSection.js         # Job section operations
├── magazine.js           # Magazine management
├── magazineCategory.js   # Magazine category operations
├── multimedia.js         # Multimedia content
├── panel.js              # Panel & navigation
├── rateAndReview.js      # Reviews & ratings
├── role.js               # Role management
├── socialNetwork.js      # Social network operations
└── user.js               # User management
```

## Usage

### Import Individual Stores

```javascript
import { useAccountStore, useUserStore } from '@/stores'

// Use in setup function
export default {
  setup() {
    const accountStore = useAccountStore()
    const userStore = useUserStore()

    // Access state
    const isAuthenticated = accountStore.getIsAuthenticate
    const user = accountStore.getUser

    // Call actions
    const login = async (credentials) => {
      try {
        await accountStore.login(credentials)
        // Handle success
      } catch (error) {
        console.error('Login failed:', error)
      }
    }

    return {
      isAuthenticated,
      user,
      login
    }
  }
}
```

### Use in Composition API

```vue
<script setup>
import { useFaqStore } from '@/stores'

const faqStore = useFaqStore()

// Access reactive state
const { data: faqs, loading, error } = storeToRefs(faqStore)

// Call actions
const fetchFaqs = async () => {
  try {
    await faqStore.read({ category: 'general' })
  } catch (error) {
    console.error('Failed to fetch FAQs:', error)
  }
}

// Call on mount
onMounted(() => {
  fetchFaqs()
})
</script>
```

### Using REST API Methods

All stores that handle CRUD operations provide these standard methods:

- `read(params)` - Get all items with optional filters
- `readItem(id)` - Get a single item by ID
- `create(payload)` - Create a new item
- `update(payload)` - Update an existing item
- `delete(id)` - Delete an item by ID

### Custom Methods

Stores may include additional custom methods beyond the standard CRUD operations:

- `accountStore.login(payload)` - User authentication
- `accountStore.logout()` - User logout
- `contactRequestStore.checked(id)` - Mark contact request as checked
- `jobRequestStore.updateState(params)` - Update job request state
- `rateAndReviewStore.answer(id, payload)` - Answer a review
- `rateAndReviewStore.confirm(id)` - Confirm a review
- `userStore.updatePassword(payload)` - Update user password

## State Management

Each store provides reactive state:

- `data` - Array of items (for list stores)
- `loading` - Boolean loading state
- `error` - Error state (null when no error)

## Error Handling

All store actions include proper error handling:

```javascript
try {
  await store.read()
  // Handle success
} catch (error) {
  // Handle error
  console.error('Store Error:', error)
}
```

## Loading States

Use loading states in your components:

```vue
<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <!-- Your content -->
  </div>
</template>
```

## Best Practices

1. **Always use try-catch** when calling store actions
2. **Handle loading states** in your components
3. **Use storeToRefs** when you need reactive state in templates
4. **Import only what you need** from stores
5. **Keep stores focused** on specific domains

## Migration from Vuex

Key differences from Vuex:

- **No mutations** - State is directly modified in actions
- **Composition API** - Uses `ref` and `computed` instead of state/mutations/getters
- **Better TypeScript support** - Native TypeScript integration
- **Simpler syntax** - Less boilerplate code
- **DevTools support** - Better debugging experience

## Example: Complete Component

```vue
<template>
  <div>
    <div v-if="loading">Loading users...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const { data: users, loading, error } = storeToRefs(userStore)

onMounted(async () => {
  try {
    await userStore.read()
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
})
</script>
```
