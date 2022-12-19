//protected routes regex that matches the base url and the sub url
export const protectedRegex = /^(dashboard|reports|user-management|all-map-view|analytics|auth-code-management|availability|integrations|locations|payouts|reservations|vehicle-management)\/(.*)$/g
export const adminRoutesRegex = /^(user-management|all-map-view)\/(.*)$/g // 👈 will update this when I have all the admin routes
export const dashboardRoutesRegex = /^(dashboard|reports|user-management|all-map-view|analytics|auth-code-management|availability|integrations|locations|payouts|reservations|vehicle-management)\/(.*)$/g // 👈 will update this when I have all the dashboard routes
