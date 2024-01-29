import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { ProductType } from '../../utils/types/product.types';
import { CategoryType, ChildCategoryType, SubCategoryType } from '../../utils/types/category.types';

interface CategoryCreationAttributes
    extends Optional<CategoryType, 'id'> { }

interface CategoryInstance
    extends Model<CategoryType, CategoryCreationAttributes>,
    CategoryType { }

interface SubCategoryCreationAttributes
    extends Optional<SubCategoryType, 'id'> { }

interface SubCategoryInstance
    extends Model<SubCategoryType, SubCategoryCreationAttributes>,
    SubCategoryType { }

interface ChildCategoryCreationAttributes
    extends Optional<ChildCategoryType, 'id'> { }

interface ChildCategoryInstance
    extends Model<ChildCategoryType, ChildCategoryCreationAttributes>,
    ChildCategoryType { }

export const Category = sequelize.define<CategoryInstance>(
    'Category',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true,
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
        icon: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'categories',
        freezeTableName: true
    }
);

export const SubCategory = sequelize.define<SubCategoryInstance>(
    'SubCategory',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true,
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
        icon: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        categoryId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: Category,
                key: 'id'
            }
        }
    },
    {
        tableName: 'sub_categories',
        freezeTableName: true
    }
);

export const ChildCategory = sequelize.define<ChildCategoryInstance>(
    'ChildCategory',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true,
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
        icon: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        categoryId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: Category,
                key: 'id'
            }
        },
        subCategoryId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: SubCategory,
                key: 'id'
            }
        }
    },
    {
        tableName: 'child_categories',
        freezeTableName: true
    }
);