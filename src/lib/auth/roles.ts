export enum AppRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

export const ADMIN_ROLES: readonly AppRole[] = [
  AppRole.ADMIN,
  AppRole.SUPERADMIN,
];
