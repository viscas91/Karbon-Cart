import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { ProductType } from '../../utils/types/product.types';
import { User } from './User';
import { v4 as uuidV4 } from 'uuid';

type ProductImageType = {
    id?: number;
    image: string;
    product: string;
}

interface ProductCreationAttributes extends Optional<ProductType, 'pkid'> { }
interface ProductInstance extends Model<ProductType, ProductCreationAttributes>, ProductType { }

interface ProductImageCreationAttributes extends Optional<ProductImageType, 'id'> { }
interface ProductImageInstance extends Model<ProductImageType, ProductImageCreationAttributes>, ProductImageType { }

export const Product = sequelize.define<ProductInstance>(
    'Product',
    {
        pkid: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true,
        },
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: () => uuidV4(),
            unique: true
        },
        title: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        slug: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
        },
        sku: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        thumb: {
            allowNull: false,
            type: DataTypes.STRING
        },
        vendorId: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        categoryId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        subCategoryId: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        childCategoryId: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        brandId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        quantityPerUnit: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        unitWeight: {
          allowNull: true,
          type: DataTypes.DOUBLE  
        },
        isApproved: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        isAvailable: {
            allowNull: false,
            type: DataTypes.BOOLEAN
        },
        unitInStock: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        unitOnOrder: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        reorderLevel: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        shortDescription: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        discountAvailable: {
            allowNull: false,
            type: DataTypes.BOOLEAN
        },
        longDescription: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        videoLink: {
            allowNull: true,
            type: DataTypes.STRING
        },
        price: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2)
        },
        offerPrice: {
            allowNull: true,
            type: DataTypes.DECIMAL(10, 2)
        },
        offerStartDate: {
            allowNull: true,
            type: DataTypes.DATE
        },
        offerEndDate: {
            allowNull: true,
            type: DataTypes.DATE
        },
        productType: {
            allowNull: false,
            type: DataTypes.STRING
        },
        status: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
        },
        seoTitle: {
            allowNull: false,
            type: DataTypes.STRING
        },
        seoDescription: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        createdBy: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id'
            }
        },
    },
    {
        timestamps: true,
        tableName: 'products',
        freezeTableName: true,
    }
);

export const ProductImage = sequelize.define<ProductImageInstance>(
    'ProductImage',
    {
        image: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        product: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: Product,
                key: 'id'
            }
        },
    },
    {
        timestamps: true,
        tableName: 'product_images',
        freezeTableName: true,
    }
);