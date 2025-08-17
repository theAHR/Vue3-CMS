# Vue3 CMS Panel - پنل مدیریت Vue3

A modern, responsive Content Management System (CMS) built with Vue 3, featuring a beautiful Persian UI design and comprehensive functionality.

## ✨ Features

### 🎨 Modern UI/UX
- **Persian RTL Design**: Beautiful Persian interface with right-to-left layout
- **Responsive Design**: Fully responsive design that works on all devices
- **Modern Components**: Reusable Vue 3 components with modern styling
- **Gradient Themes**: Beautiful gradient color schemes throughout the interface
- **Smooth Animations**: Smooth transitions and hover effects

### 🧭 Navigation & Layout
- **Smart Sidebar**: Collapsible sidebar with organized menu sections
- **Breadcrumb Navigation**: Clear navigation path indicators
- **Header Actions**: Search, notifications, messages, and quick actions
- **Mobile Optimized**: Hamburger menu and mobile-first design

### 📊 Dashboard & Analytics
- **Statistics Cards**: Key metrics with change indicators
- **Activity Timeline**: Recent system activities and user actions
- **Quick Actions**: Fast access to common operations
- **Chart Placeholders**: Ready for integration with charting libraries

### 🔧 Component System
- **Reusable Components**: Button, Card, Modal, Table, Form components
- **Icon System**: SVG-based icon system for crisp graphics
- **Theme Support**: Multiple color variants and themes
- **Loading States**: Built-in loading and empty states

### 🚀 Technical Features
- **Vue 3 Composition API**: Modern Vue 3 development patterns
- **Vue Router**: Client-side routing with navigation guards
- **Responsive Grid**: CSS Grid and Flexbox for modern layouts
- **Utility Functions**: Comprehensive helper functions and constants
- **Type Safety**: JSDoc documentation for better development experience

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (Button, Card, etc.)
│   ├── Header/          # Header component with search and actions
│   └── NavigationMenu/  # Main navigation sidebar
├── layouts/             # Layout components
│   └── DefaultLayout.vue # Main application layout
├── pages/               # Page components
│   └── dashboard/       # Dashboard page
├── utils/               # Utility functions and constants
│   ├── constants.js     # Application constants and configuration
│   └── helpers.js       # Helper functions
├── stores/              # Pinia stores (if using state management)
├── router/              # Vue Router configuration
├── plugins/             # Vue plugins
└── assets/              # Static assets (images, fonts, etc.)
```

## 🎯 Key Components

### NavigationMenu.vue
- **Smart Menu System**: Organized menu sections with accordion support
- **Active State Management**: Automatic highlighting of current routes
- **Mobile Responsive**: Collapsible mobile sidebar with overlay
- **User Profile Section**: User information and quick actions

### Header.vue
- **Search Functionality**: Global search with Persian placeholder
- **Notification Center**: Real-time notifications and messages
- **Quick Actions**: Fast access to common operations
- **User Menu**: Profile management and logout

### Button.vue
- **Multiple Variants**: Primary, secondary, success, warning, danger, etc.
- **Icon Support**: Left/right icon positioning
- **Loading States**: Built-in loading spinners
- **Responsive Sizes**: Small, medium, and large button sizes

### Card.vue
- **Flexible Layout**: Header, body, and footer sections
- **Multiple Variants**: Different color themes and styles
- **Loading Overlays**: Built-in loading states
- **Hover Effects**: Smooth hover animations

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd Vue3-CMS

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development
```bash
# Start development server with hot reload
npm run dev

# Run linting
npm run lint

# Run tests (if configured)
npm run test
```

## 🎨 Customization

### Colors & Themes
The application uses CSS custom properties for easy theming. Main colors are defined in `src/utils/constants.js`:

```javascript
COLORS: {
  PRIMARY: '#667eea',
  SECONDARY: '#764ba2',
  SUCCESS: '#28a745',
  WARNING: '#ffc107',
  DANGER: '#dc3545',
  INFO: '#17a2b8'
}
```

### Persian Text
All Persian text is centralized in the constants file for easy localization and maintenance.

### Component Styling
Components use scoped CSS with modern CSS features like:
- CSS Grid and Flexbox
- CSS Custom Properties
- Modern transitions and animations
- Responsive design patterns

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: < 768px - Single column layout, collapsible sidebar
- **Tablet**: 768px - 1024px - Optimized for medium screens
- **Desktop**: > 1024px - Full desktop experience

## 🔧 Configuration

### Menu Configuration
Menu items are configured in `src/utils/constants.js` under `MENU_CONFIG`:

```javascript
MENU_CONFIG: {
  DASHBOARD: {
    title: 'داشبورد',
    path: '/dashboard',
    icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    badge: 'جدید'
  }
  // ... more menu items
}
```

### API Endpoints
API endpoints are centralized in `src/utils/constants.js`:

```javascript
API_ENDPOINTS: {
  LOGIN: '/api/auth/login',
  USERS: '/api/users',
  // ... more endpoints
}
```

## 🚀 Future Enhancements

- [ ] **Chart Integration**: Real-time charts and analytics
- [ ] **Form Builder**: Dynamic form creation system
- [ ] **File Manager**: Advanced file management system
- [ ] **User Management**: Advanced user roles and permissions
- [ ] **API Integration**: Backend API integration examples
- [ ] **Testing**: Unit and integration tests
- [ ] **Documentation**: Comprehensive API documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vue.js Team**: For the amazing Vue 3 framework
- **Vite**: For the fast build tool
- **Persian Design Community**: For inspiration in Persian UI design
- **Open Source Community**: For various libraries and tools

---

**Built with ❤️ for the Persian-speaking community**