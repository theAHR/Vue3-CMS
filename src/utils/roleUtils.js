export const ROLE_PERMISSIONS = {
  1: ['dashboard', 'jobs'], // منابع انسانی - dashboard and jobs
  2: ['dashboard', 'contact'], // کارشناس پشتیبانی - dashboard and contact request
  3: ['dashboard', 'contact', 'reviews'], // سرپرست پشتیبانی - dashboard, contact request, rate and review
  4: ['all'], // مدیر سیستم - everything
  5: ['dashboard', 'magazines', 'faq', 'multimedia', 'guide'] // روابط عمومی - dashboard, magazines, faq, multimedia, guide
}

export const ROLE_DISPLAY_NAMES = {
  1: 'منابع انسانی',
  2: 'کارشناس پشتیبانی',
  3: 'سرپرست پشتیبانی',
  4: 'مدیر سیستم',
  5: 'روابط عمومی'
}

export const getRoleDisplayName = (role) => {
  return ROLE_DISPLAY_NAMES[role] || 'نامشخص'
}

export const hasPermission = (userRole, permission) => {
  const permissions = ROLE_PERMISSIONS[userRole] || []
  return permissions.includes('all') || permissions.includes(permission)
}

export const getMenuItemsForRole = (userRole, allMenuItems) => {
  const permissions = ROLE_PERMISSIONS[userRole] || []
  
  if (permissions.includes('all')) {
    return allMenuItems
  }
  
  return allMenuItems.filter(item => {
    if (item.to === '/dashboard') return true
    
    if (permissions.includes('jobs') && item.key === 'jobs') return true
    if (permissions.includes('contact') && item.to === '/contact-requests') return true
    if (permissions.includes('reviews') && item.to === '/rate-and-review') return true
    if (permissions.includes('multimedia') && item.to === '/multimedia') return true
    if (permissions.includes('guide') && item.to === '/guide') return true
    
    if (permissions.includes('magazines')) {
      return ['news', 'announcements', 'circulars', 'instructions', 'faq'].includes(item.key)
    }
    
    return false
  })
}

export const getRoutesForRole = (userRole) => {
  const permissions = ROLE_PERMISSIONS[userRole] || []
  
  if (permissions.includes('all')) {
    return ['all']
  }
  
  const routes = ['/dashboard']
  
  if (permissions.includes('jobs')) {
    routes.push('/job', '/job-sections', '/job-requests')
  }
  if (permissions.includes('contact')) {
    routes.push('/contact-requests')
  }
  if (permissions.includes('reviews')) {
    routes.push('/rate-and-review')
  }
  if (permissions.includes('multimedia')) {
    routes.push('/multimedia')
  }
  if (permissions.includes('guide')) {
    routes.push('/guide')
  }
  if (permissions.includes('magazines')) {
    routes.push('/news', '/announcements', '/circulars', '/instructions', '/faq', '/faq-group')
  }
  
  return routes
}

