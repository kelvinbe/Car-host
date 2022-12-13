
// dashboard routes
export const dashboardRoutes: {
    name: string;
    onClick: "toHome" | "toResports" | "toVehicleManagement" | "toReservations" | "toUsers" | "toAnalytics" | "toAvailability" | "toLocations" | "toPayouts" | "toIntegrations" | "toAuthCodeManagement" | "toAllMapView",
    admin: boolean
}[] = [
    {
      name: "dashboard",
      onClick: "toHome",
      admin: false
    },
    {
      name: "reports",
      onClick: "toResports",
      admin: false
    },
    {
      name: "vehicle management",
      onClick: "toVehicleManagement",
      admin: false
    },
    {
      name: "reservations",
      onClick: "toReservations",
      admin: false
    },
    {
      name: "users",
      onClick: "toUsers",
      admin: true
    },
    {
      name: "analytics",
      onClick: "toAnalytics",
      admin: false
    },
    {
      name: "availability",
      onClick: "toAvailability",
      admin: false
    },
    {
      name: "locations",
      onClick: "toLocations",
      admin: false
    },
    {
      name: "payouts",
      onClick: "toPayouts",
      admin: false
    },
    {
      name: "integrations",
      onClick: "toIntegrations",
      admin: false
    },
    {
      name: "auth code management",
      onClick: "toAuthCodeManagement",
      admin: false
    },
    {
      name: "all map view",
      onClick: "toAllMapView",
      admin: true
    }
  ]