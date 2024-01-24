import { Request, Response } from "express";
import { Vendor } from "../../models/mysql/Vendor";
import { UserType } from "../../utils/types/common.types";
import { BadRequestError } from "../../utils/errors/badRequest";

// $-title   Create Vendor
// $-path    POST /api/v1/vendor/create
// $-auth    Private

const createVendor = async (req: Request, res: Response) => {
	
	const userId = (req.user as UserType).id!
	const { 
		banner, 
		name, 
		contactFName, 
		contactLName, 
		email, 
		phone,
		fax, 
		address, 
		description, 
		fbLink, 
		twLink, 
		instaLink, 
		status,
		note,
		ranking,
		discountType,
		discountAvailable,
		discountRate,
		website
	} = req.body;

	const vendorExists = await Vendor.findOne({ where: { userId } } );

	if (vendorExists) {
		res.status(400);
		throw new Error("Vendor already exists");
	}

	const createdVendor = await Vendor.create({
		banner,
		name,
		contactFName,
		contactLName,
		email,
		phone,
		fax,
		address,
		description,
		fbLink,
		twLink,
		instaLink,
		status,
		userId,
		note,
		discountAvailable,
		discountType,
		discountRate,
		ranking,
		website
	});

	if (!createdVendor) {
		throw new BadRequestError("Vendor could not be created");
	}

	return res.status(200).json({
		success: true,
		message: `Your vendor named: ${createVendor.name}, was created successfully`,
		createVendor,
	});
};

export { createVendor };