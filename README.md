# Landing Front - Vue 3 Tsp Sadad Landing Page

A modern, responsive corporate landing page built with Vue 3, Vite, and Vuetify.

## 🚀 Features

- **Modern Vue 3 Architecture** - Built with Vue 3 Composition API and `<script setup>`
- **Responsive Design** - Mobile-first approach with Vuetify components
- **Multi-page Application** - Comprehensive routing with Vue Router
- **State Management** - Pinia for efficient state management
- **Persian/Farsi Support** - Includes Jalali calendar support with `date-fns-jalali`
- **Interactive Components** - Swiper for carousels, video players, and multimedia content
- **API Integration** - Axios for backend communication
- **Modern Build Tool** - Vite for fast development and optimized builds

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3.5.13
- **Build Tool**: Vite 6.3.5
- **UI Framework**: Vuetify 3.8.0-beta.0
- **Routing**: Vue Router 4.5.1
- **State Management**: Pinia 3.0.3
- **HTTP Client**: Axios 1.10.0
- **Date Handling**: date-fns 4.1.0 + date-fns-jalali 4.1.0-0
- **Carousel/Slider**: Swiper 11.2.10
- **Styling**: SASS with sass-embedded 1.89.1

## 📁 Project Structure

```
src/
├── assets/           # Static assets (images, fonts, icons)
├── components/       # Reusable Vue components
│   ├── common/      # Shared components (Header, Footer, etc.)
│   └── home/        # Home page specific components
├── config/          # Configuration files
├── layouts/         # Layout components
├── pages/           # Page components
├── plugins/         # Vue plugins
├── router/          # Vue Router configuration
├── services/        # API services
├── stores/          # Pinia stores
└── main.js         # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd landing-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Environment Variables
Create a `.env` file in the root directory for environment-specific configuration:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_APP_TITLE=Your App Title
```