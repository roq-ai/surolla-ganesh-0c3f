interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Export Manager', 'Quality Control Officer', 'Sales Representative'],
  tenantName: 'Organization',
  applicationName: 'Surolla  Ganesh',
  addOns: ['chat', 'notifications', 'file'],
};
