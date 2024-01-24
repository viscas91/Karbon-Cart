import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { VendorType } from '../../utils/types/vendor.types';
import { User } from './User';
import { v4 as uuidV4 } from 'uuid';

interface VendorCreationAttributes extends Optional<VendorType, 'pkid'> { }

interface VendorInstance extends Model<VendorType, VendorCreationAttributes>, VendorType { }

export const Vendor = sequelize.define<VendorInstance>(
    'Vendor',
    {
        pkid: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true,
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidV4(),
            unique: true,
            allowNull: false
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        contactFName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        contactLName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        banner: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        fax: {
            allowNull: true,
            type: DataTypes.STRING
        },
        address: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        description: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        fbLink: {
            allowNull: true,
            type: DataTypes.STRING
        },
        twLink: {
            allowNull: true,
            type: DataTypes.STRING
        },
        instaLink: {
            allowNull: true,
            type: DataTypes.STRING
        },
        status: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        note: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        ranking: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        discountType: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        typeGoods: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        discountAvailable: {
            allowNull: false,
            type: DataTypes.BOOLEAN
        },
        website: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        userId: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id'
            }
        },
    }
);