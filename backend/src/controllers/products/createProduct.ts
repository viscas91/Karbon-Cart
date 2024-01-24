import { Request, Response } from "express";
import { Product } from "../../models/mysql/Product";
import { BadRequestError } from "../../utils/errors/badRequest";
import { UserType } from "../../utils/types/common.types";
import slugify from 'slugify';

export const createProduct = async (req: Request, res: Response) => {
    const { 
        title, 
        sku, 
        thumb, 
        vendor_id, 
        category_id, 
        sub_category_id, 
        child_category_id, 
        brand_id, 
        quantity,
        quantityPerUnit, 
        short_description, 
        long_description, 
        videoLink, 
        price, 
        offerPrice, 
        offerStartDate, 
        offerEndDate, 
        productType, 
        status, 
        seoTitle,
        isAvailable,
        unitWeight,
        unitInStock,
        unitOnOrder,
        reorderLevel,
        productAvailable,
        discountAvailable, 
        seoDescription 
    } = req.body;

    const slug = slugify(title);

    const product = await Product.findOne({ where: { slug }});
    console.log(req.user)
    const user = (req.user as UserType).id!;

    if(product){
        throw new BadRequestError('Product already exists');
    }

    const createdProduct = await Product.create({
        slug,
        title,
        sku,
        thumb,
        vendor_id,
        category_id,
        sub_category_id,
        child_category_id,
        brand_id,
        quantity,
        quantityPerUnit: 10,
        short_description,
        long_description,
        videoLink,
        price,
        offerPrice,
        offerStartDate,
        offerEndDate,
        productType,
        status,
        isAvailable: true,
        isApproved: false,
        unitWeight: 10.30,
        unitInStock: 10,
        unitOnOrder: 10,
        reorderLevel: 50,
        discountAvailable: false,
        seoTitle,
        seoDescription,
        createdBy: user
    });

    if (!createdProduct) {
		res.status(400);
		throw new Error("Vendor could not be created");
	}

    return res.status(200).json({
		success: true,
		message: `Product was created successfully`,
		createProduct,
	});
}