import { Request, Response } from "express";
import { BadRequestError } from "../../utils/errors/badRequest";
import { UserType } from "../../utils/types/common.types";
import { UserRole } from "../../utils/enums/user.utils";
import { NotAuthorized } from "../../utils/errors/notAuthorized";
import { Site } from "../../models/mysql/Site";

export const getSiteSettings = async (req: Request, res: Response) => {
    try {
        // Retrieve site settings from the database
        const siteSettings = await Site.findOne({ where: { id: 1 } });

        if (!siteSettings) {
            return res.status(404).json({ error: "Site settings not found" });
        }

        // Send the site settings as a response
        return res.json({
            success: true,
            settings: {
                isMaintainence: siteSettings.isMaintainence,
                isUserRegistrationAllowed: siteSettings.isUserRegistrationAllowed,
                isVendorRegistrationAllowed: siteSettings.isVendorRegistrationAllowed
            }
        });
    } catch (error) {
        console.error(error);
        return new BadRequestError("Internal Server Error");
    }
};


export const updateSiteSettings = async (req: Request, res: Response) => {
    try {
        // Get the user ID from the logged-in user information
        const { isMaintainence, isUserRegistrationAllowed, isVendorRegistrationAllowed } = req.body;
        const user = req.user as UserType;

        if (user.role !== UserRole.Admin) {
            return res.status(403).json({ message: 'You are not authorized' });
        }

        let siteSettings = await Site.findByPk(1);

        console.log("Existing Site Settings:", siteSettings);

        if (!siteSettings) {
            return res.status(404).json({ message: 'Site settings not found' });
        }

        const updatedData = await siteSettings.update({
            isMaintainence,
            isUserRegistrationAllowed,
            isVendorRegistrationAllowed
        });

        console.log("Updated Site Settings:", updatedData);

        if (!updatedData) {
            return res.status(500).json({ message: 'Could not update data' });
        }

        return res.json({
            success: true,
            settings: {
                isMaintainence: updatedData.isMaintainence,
                isUserRegistrationAllowed: updatedData.isUserRegistrationAllowed,
                isVendorRegistrationAllowed: updatedData.isVendorRegistrationAllowed
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
