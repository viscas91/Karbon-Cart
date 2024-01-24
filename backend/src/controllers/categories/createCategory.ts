import { Request, Response } from "express";
import { Category, ChildCategory, SubCategory } from "../../models/mysql/Category";
import { BadRequestError } from "../../utils/errors/badRequest";
import slugify from 'slugify';

// $-title   Create Vendor
// $-path    POST /api/v1/vendor/create
// $-auth    Private

export const createCategory = async (req: Request, res: Response) => {
	const { title, icon } = req.body;

	if(!title || !icon){
		throw new BadRequestError('Fill the required fields');
	}

	const lowercase: string = title.lowerCase();
    const slug = slugify(lowercase);

	const categoryExists = await Category.findOne({ where: { slug } } );

	if (categoryExists) {
		throw new BadRequestError("Category already exists.");
	}

	const createdCategory = await Category.create({
		title,
		slug,
        icon
	});

	if (!createdCategory) {
		throw new BadRequestError("Category could not be created.");
	}

	return res.status(201).json({
		success: true,
		message: `Category ${createdCategory.title}, was created successfully`,
		createdCategory,
	});
};

export const createSubCategory = async (req: Request, res: Response) => {
	const { title, icon, categoryId } = req.body;

	if(!title || !icon || !categoryId){
		throw new BadRequestError('Fill the required fields');
	}

	const lowercase: string = title.lowerCase();
    const slug = slugify(lowercase);

	const subCategoryExists = await SubCategory.findOne({ where: { slug } } );

	if (subCategoryExists) {
		throw new BadRequestError("Sub Category already exists.");
	}

	const createdSubCategory = await SubCategory.create({
		title,
		slug,
        icon,
		categoryId
	});

	if (!createdSubCategory) {
		throw new BadRequestError("Sub Category could not be created.");
	}

	return res.status(201).json({
		success: true,
		message: `Category ${createdSubCategory.title}, was created successfully`,
		createdSubCategory,
	});	
}

export const createChildCategory = async (req: Request, res: Response) => {
	const { title, icon, categoryId, subCategoryId } = req.body;

	if(!title || !icon || !categoryId || !subCategoryId){
		throw new BadRequestError('Fill the required fields');
	}

	const lowercase: string = title.lowerCase();
    const slug = slugify(lowercase);

	const childCategoryExists = await ChildCategory.findOne({ where: { slug } } );

	if (childCategoryExists) {
		throw new BadRequestError("Child Category already exists.");
	}

	const createdChildCategory = await ChildCategory.create({
		title,
		slug,
        icon,
		categoryId,
		subCategoryId
	});

	if (!createdChildCategory) {
		throw new BadRequestError("Child Category could not be created.");
	}

	return res.status(201).json({
		success: true,
		message: `Category ${createdChildCategory.title}, was created successfully`,
		createdChildCategory,
	});	
}