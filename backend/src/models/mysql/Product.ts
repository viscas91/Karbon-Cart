import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { ProductType } from '../../utils/types/product.types';
import { User } from './User';
import { v4 as uuidV4 } from 'uuid';

interface ProductCreationAttributes extends Optional<ProductType, 'pkid'> { }

interface ProductInstance extends Model<ProductType, ProductCreationAttributes>, ProductType { }

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
            type: DataTypes.UUIDV4,
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
        vendor_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        category_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        sub_category_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        child_category_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        brand_id: {
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
          type: DataTypes.NUMBER  
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
        short_description: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        discountAvailable: {
            allowNull: false,
            type: DataTypes.BOOLEAN
        },
        long_description: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        videoLink: {
            allowNull: true,
            type: DataTypes.STRING
        },
        price: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        offerPrice: {
            allowNull: true,
            type: DataTypes.DOUBLE
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
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
    },
    {
        tableName: 'products'
    }
);