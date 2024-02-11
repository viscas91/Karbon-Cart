import { Request, Response } from "express";
import { BadRequestError } from "../../utils/errors/badRequest";
import slugify from 'slugify';
import { Brand } from "../../models/mysql/Brand";

// $-title   Create Brand
// $-path    POST /api/v1/brands/create
// $-auth    Private

export const createBrand = async (req: Request, res: Response) => {
	const { title, icon } = req.body;

	if(!title || !icon){
		throw new BadRequestError('Fill the required fields');
	}

	const slug = slugify(title, {
		lower: true
	});

	const brandExists = await Brand.findOne({ where: { slug } } );

	if (brandExists) {
		throw new BadRequestError("Brand already exists.");
	}

	const createdBrand = await Brand.create({
		title,
		slug,
        icon
	});

	if (!createdBrand) {
		throw new BadRequestError("Brand could not be created.");
	}

	return res.status(201).json({
		success: true,
		message: `Category ${createdBrand.title}, was created successfully`,
		createdBrand,
	});
};
