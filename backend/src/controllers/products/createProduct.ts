import { Request, Response } from "express";
import { Product } from "../../models/mysql/Product";
import { BadRequestError } from "../../utils/errors/badRequest";
import { UserType } from "../../utils/types/common.types";
import slugify from 'slugify';
import { DataTypes } from "sequelize";

export const createProduct = async (req: Request, res: Response) => {
    const { ...fields } = req.body;

    const filteredFields = Object.fromEntries(
        Object.entries(req.body).filter(([key, value]) => console.log(key, value))
    );
    console.log(filteredFields)

    const slug = slugify(fields.title, {
        lower: true
    });

    const offerStartDate = fields.offerStartDate ? fields.offerStartDate : null;
    const offerEndDate = fields.offerStartDate ? fields.offerStartDate : null;

    const product = await Product.findOne({ where: { slug: slug }});
    const user = (req.user as UserType).id!;

    if(product){
        throw new BadRequestError('Product already exists');
    }

    const createdProduct = await Product.create({ 
        ...fields, 
        slug, 
        status: true,
        offerStartDate,
        offerEndDate,
        isApproved: false, 
        isAvailable: false, 
        unitInStock: 10, 
        unitOnOrder: 1, 
        reorderLevel: 10, 
        discountAvailable: false, 
        createdBy: user,
    });

    if (!createdProduct) {
		res.status(400);
		throw new Error("Product could not be created");
	}

    return res.status(200).json({
		success: true,
		message: `Product was created successfully`,
		createProduct,
	});
}