import { DataTypes, Model, Optional } from 'sequelize';
import { UserType } from '../../utils/types/common.types';
import { sequelize } from '../../config/db.config';
import { v4 as uuidV4 } from 'uuid';

interface UserCreationAttributes extends Optional<UserType, 'pkid'> { }

interface UserInstance extends Model<UserType, UserCreationAttributes>, UserType { }

export const User = sequelize.define<UserInstance>(
    'User',
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
        firstName: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
        },
        username: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        avatar: {
            allowNull: true,
            type: DataTypes.STRING
        },
        role: {
            allowNull: false,
            type: DataTypes.ENUM('JQ4A5U25SJ', 'VSP7SRR29E', 'DFX37DAT2S', '7N7VW9T9NH', 'UZRWV4CVKJ'),
            defaultValue: 'VSP7SRR29E',
        },
        status: {
            allowNull: false,
            type: DataTypes.ENUM('T7MRTFP57N', 'H5WNS43QXF'),
            defaultValue: 'H5WNS43QXF'
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        provider: {
            allowNull: false,
            type: DataTypes.STRING
        },
        isEmailVerified: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        passwordChangedAt: {
            allowNull: true,
            type: DataTypes.DATE
        },
        refreshToken: {
            allowNull: true,
            type: DataTypes.STRING,
            get() {
                // Parse the stored value when retrieving it
                const value = this.getDataValue('refreshToken')!;
                try {
                  return JSON.parse(value as string);
                } catch (error) {
                  // Handle the case where parsing fails
                  return value;
                }
              },
              set(value) {
                // Store the value as a JSON string
                this.setDataValue('refreshToken', JSON.stringify(value));
              },
        }
    },
    {
        tableName: 'users'
    }
);