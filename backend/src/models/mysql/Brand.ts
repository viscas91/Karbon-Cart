import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db.config';;
import { BrandType } from '../../utils/types/brand.types';

interface BrandCreationAttributes
    extends Optional<BrandType, 'id'> { }

interface BrandInstance
    extends Model<BrandType, BrandCreationAttributes>,
    BrandType { }

export const Brand = sequelize.define<BrandInstance>(
    'Brand',
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
        timestamps: true,
        tableName: 'brands',
        freezeTableName: true
    }
);