import { NextFunction, Request, Response } from "express";
import { UserRole } from "../utils/enums/user.utils";
import { PermissionObject, UserPermission, UserType, permissions } from "../types/common.types";
import { NotAuthorized } from "../utils/errors/notAuthorized";

export const verifyAccess = (allowedRoles: UserRole[], requiredPermissions: UserPermission[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as UserType;

        // Check if the user has one of the allowed roles
        const hasAllowedRole = allowedRoles.includes(user.role!);

        // Check if the user has the required permissions
        const userPermissions = (permissions as PermissionObject)[user.role!];
        const hasRequiredPermissions = requiredPermissions.every(permission =>
            userPermissions && userPermissions.includes(permission)
        );

        if (!hasAllowedRole || !hasRequiredPermissions) {
            throw new NotAuthorized('You are not authorized to perform this action');
        }

        next();
    };
};