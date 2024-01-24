import { UserRole } from "../enums/user.utils"
import { UserStatus } from "../enums/user.utils"

export type Token = {
    token: string
}

export type EmailPayload = {
    name: any;
    link?: string;
};

export type UserType = {
    pkid?: number,
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    avatar: string,
    role?: UserRole,
    status: UserStatus,
    password: string,
    provider: string,
    isEmailVerified: boolean,
    passwordChangedAt: Date,
    refreshToken?: string[] | string | undefined,
    createdAt?: string,
    updatedAt?: string
}

export enum UserPermission {
    ManageUsers = 'manage_users',
    ManageProducts = 'manage_products',
    ViewDashboard = 'view_dashboard',
    Finance = 'finance',
}

export type PermissionObject = {
    [UserRole.Admin]: string[]; // Admin has all permissions
    [UserRole.Staff]: string[]; // Staff has specific permissions
    [UserRole.Customer]: string[]; // User has specific permissions
    [UserRole.Vendor]: string[]; // Vendor has specific permissions
    [UserRole.Banned]?: string[];
}

export const permissions: PermissionObject = {
    [UserRole.Admin]: [
        UserPermission.ManageUsers,
        UserPermission.ManageProducts,
        UserPermission.ViewDashboard,
        UserPermission.Finance,
    ],
    [UserRole.Staff]: [
        UserPermission.ManageUsers,
        UserPermission.ManageProducts,
        UserPermission.ViewDashboard,
    ],
    [UserRole.Customer]: [
        UserPermission.ViewDashboard,
    ],
    [UserRole.Vendor]: [
        UserPermission.ManageProducts,
        UserPermission.Finance,
    ],
};