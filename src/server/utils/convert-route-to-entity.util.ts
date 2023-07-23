const mapping: Record<string, string> = {
  clients: 'client',
  'export-orders': 'export_order',
  organizations: 'organization',
  'quality-checks': 'quality_check',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
