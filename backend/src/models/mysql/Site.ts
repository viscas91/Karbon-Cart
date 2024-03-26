import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { SiteType } from '../../utils/types/site.types';

interface SiteAttributes extends Optional<SiteType, 'id'> { }

interface SiteInstance extends Model<SiteType, SiteAttributes>, SiteType { }

const Site = sequelize.define<SiteInstance>(
    'Site',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true,
        },
        isMaintainence: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isUserRegistrationAllowed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isVendorRegistrationAllowed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: 'site'
    }
);

export { Site };