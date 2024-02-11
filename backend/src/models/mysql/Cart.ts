import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { CartType } from '../../utils/types/cart.types';
import { User } from './User';
import { v4 as uuidV4 } from "uuid";

interface CartCreationAttributes extends Optional<CartType, 'pkid'> { }

interface CartInstance extends Model<CartType, CartCreationAttributes>, CartType { }

const Cart = sequelize.define<CartInstance>(
    'Cart',
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
        customerId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'pkid'
            }
        }
    },
    {
        timestamps: true,
        tableName: 'cart'
    }
);

Cart.belongsTo(User, {
    foreignKey: 'customerId',
    as: 'customer'
});

export { Cart };