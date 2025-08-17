// CMS Panel Constants
export const CMS_CONSTANTS = {
  // Application Info
  APP_NAME: 'پنل مدیریت',
  APP_DESCRIPTION: 'سیستم مدیریت محتوا',
  APP_VERSION: '1.0.0',
  
  // User Roles
  ROLES: {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    EDITOR: 'editor',
    AUTHOR: 'author',
    VIEWER: 'viewer'
  },
  
  // Role Names (Persian)
  ROLE_NAMES: {
    super_admin: 'مدیر ارشد',
    admin: 'مدیر',
    editor: 'ویرایشگر',
    author: 'نویسنده',
    viewer: 'مشاهده‌کننده'
  },
  
  // Content Status
  CONTENT_STATUS: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
    PENDING: 'pending',
    REJECTED: 'rejected'
  },
  
  // Status Names (Persian)
  STATUS_NAMES: {
    draft: 'پیش‌نویس',
    published: 'منتشر شده',
    archived: 'آرشیو شده',
    pending: 'در انتظار بررسی',
    rejected: 'رد شده'
  },
  
  // Content Types
  CONTENT_TYPES: {
    NEWS: 'news',
    ANNOUNCEMENT: 'announcement',
    CIRCULAR: 'circular',
    INSTRUCTION: 'instruction',
    FAQ: 'faq',
    JOB: 'job',
    MULTIMEDIA: 'multimedia',
    GUIDE: 'guide'
  },
  
  // Content Type Names (Persian)
  CONTENT_TYPE_NAMES: {
    news: 'خبر',
    announcement: 'اطلاعیه',
    circular: 'بخشنامه',
    instruction: 'دستورالعمل',
    faq: 'سوال متداول',
    job: 'شغل',
    multimedia: 'چندرسانه‌ای',
    guide: 'راهنما'
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
    MAX_PAGE_SIZE: 100
  },
  
  // File Upload
  FILE_UPLOAD: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  },
  
  // Validation Rules
  VALIDATION: {
    MIN_TITLE_LENGTH: 3,
    MAX_TITLE_LENGTH: 200,
    MIN_CONTENT_LENGTH: 10,
    MAX_CONTENT_LENGTH: 10000,
    MIN_DESCRIPTION_LENGTH: 10,
    MAX_DESCRIPTION_LENGTH: 500
  },
  
  // Date Formats
  DATE_FORMATS: {
    DISPLAY: 'DD/MM/YYYY',
    DISPLAY_TIME: 'DD/MM/YYYY HH:mm',
    API: 'YYYY-MM-DD',
    API_TIME: 'YYYY-MM-DD HH:mm:ss'
  },
  
  // Colors
  COLORS: {
    PRIMARY: '#667eea',
    SECONDARY: '#764ba2',
    SUCCESS: '#28a745',
    WARNING: '#ffc107',
    DANGER: '#dc3545',
    INFO: '#17a2b8',
    LIGHT: '#f8f9fa',
    DARK: '#343a40'
  },
  
  // Breakpoints
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200
  }
};

// Menu Configuration
export const MENU_CONFIG = {
  DASHBOARD: {
    title: 'داشبورد',
    path: '/dashboard',
    icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    badge: 'جدید'
  },
  
  NEWS: {
    title: 'خبر',
    path: '/news',
    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z',
    children: [
      { title: 'لیست اخبار', path: '/news/list' },
      { title: 'دسته‌بندی اخبار', path: '/news/categories' }
    ]
  },
  
  ANNOUNCEMENTS: {
    title: 'اطلاعیه‌ها',
    path: '/announcements',
    icon: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z',
    children: [
      { title: 'لیست اطلاعیه‌ها', path: '/announcements/list' },
      { title: 'دسته‌بندی اطلاعیه‌ها', path: '/announcements/categories' }
    ]
  },
  
  CIRCULARS: {
    title: 'بخشنامه‌ها',
    path: '/circulars',
    icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8V4h6v4h4v10z',
    children: [
      { title: 'لیست بخشنامه‌ها', path: '/circulars/list' },
      { title: 'دسته‌بندی بخشنامه‌ها', path: '/circulars/categories' }
    ]
  },
  
  INSTRUCTIONS: {
    title: 'دستورالعمل‌ها',
    path: '/instructions',
    icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    children: [
      { title: 'لیست دستورالعمل‌ها', path: '/instructions/list' },
      { title: 'دسته‌بندی دستورالعمل‌ها', path: '/instructions/categories' }
    ]
  },
  
  FAQ: {
    title: 'سوالات متداول',
    path: '/faq',
    icon: 'M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16h2v-2h-2v2zm0-4h2V6h-2v8z',
    children: [
      { title: 'لیست سوالات', path: '/faq' },
      { title: 'دسته‌بندی سوالات', path: '/faq-group' }
    ]
  },
  
  JOBS: {
    title: 'مدیریت شغل',
    path: '/job',
    icon: 'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z',
    children: [
      { title: 'بخش سازمانی', path: '/job' },
      { title: 'مشاغل', path: '/job-sections' },
      { title: 'درخواست‌ها', path: '/job-requests' }
    ]
  },
  
  MULTIMEDIA: {
    title: 'ویدئوهای آموزشی',
    path: '/multimedia',
    icon: 'M18 4l2 4h-3l-2-4h-2l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z'
  },
  
  GUIDE: {
    title: 'راهنما',
    path: '/guide',
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
  },
  
  CONTACT_REQUESTS: {
    title: 'درخواست‌های تماس',
    path: '/contact-requests',
    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
  },
  
  RATE_REVIEW: {
    title: 'نظرات کاربران',
    path: '/rate-and-review',
    icon: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm7 8H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z'
  },
  
  SOCIAL_NETWORKS: {
    title: 'شبکه‌های اجتماعی',
    path: '/social-networks',
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'
  },
  
  USERS: {
    title: 'مدیریت کاربران',
    path: '/users',
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    children: [
      { title: 'کاربران', path: '/users' },
      { title: 'نقش‌ها', path: '/roles' }
    ]
  },
  
  ACCOUNT: {
    title: 'حساب کاربری',
    path: '/account',
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    children: [
      { title: 'پروفایل', path: '/account/profile' },
      { title: 'احراز هویت', path: '/account/auth' }
    ]
  }
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REFRESH: '/api/auth/refresh',
  PROFILE: '/api/auth/profile',
  
  // Users
  USERS: '/api/users',
  ROLES: '/api/roles',
  
  // Content
  NEWS: '/api/news',
  ANNOUNCEMENTS: '/api/announcements',
  CIRCULARS: '/api/circulars',
  INSTRUCTIONS: '/api/instructions',
  FAQ: '/api/faq',
  JOBS: '/api/jobs',
  MULTIMEDIA: '/api/multimedia',
  
  // Categories
  NEWS_CATEGORIES: '/api/news/categories',
  ANNOUNCEMENT_CATEGORIES: '/api/announcements/categories',
  CIRCULAR_CATEGORIES: '/api/circulars/categories',
  INSTRUCTION_CATEGORIES: '/api/instructions/categories',
  FAQ_CATEGORIES: '/api/faq/categories',
  
  // Other
  CONTACT_REQUESTS: '/api/contact-requests',
  RATE_REVIEWS: '/api/rate-reviews',
  SOCIAL_NETWORKS: '/api/social-networks',
  UPLOAD: '/api/upload',
  SEARCH: '/api/search'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'cms_token',
  REFRESH_TOKEN: 'cms_refresh_token',
  USER: 'cms_user',
  THEME: 'cms_theme',
  LANGUAGE: 'cms_language',
  SIDEBAR_STATE: 'cms_sidebar_state'
};

// Error Messages (Persian)
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'خطا در ارتباط با سرور',
  UNAUTHORIZED: 'دسترسی غیرمجاز',
  FORBIDDEN: 'دسترسی ممنوع',
  NOT_FOUND: 'موردی یافت نشد',
  VALIDATION_ERROR: 'خطا در اعتبارسنجی داده‌ها',
  SERVER_ERROR: 'خطای سرور',
  UNKNOWN_ERROR: 'خطای نامشخص'
};

// Success Messages (Persian)
export const SUCCESS_MESSAGES = {
  CREATED: 'با موفقیت ایجاد شد',
  UPDATED: 'با موفقیت بروزرسانی شد',
  DELETED: 'با موفقیت حذف شد',
  SAVED: 'با موفقیت ذخیره شد',
  PUBLISHED: 'با موفقیت منتشر شد',
  UPLOADED: 'فایل با موفقیت آپلود شد'
};
