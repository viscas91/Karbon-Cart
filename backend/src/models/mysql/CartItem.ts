import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { CartItemType } from '../../utils/types/cart.types';
import { Cart } from './Cart';
import { v4 as uuidV4 } from 'uuid';
import { Product } from './Product';

interface CartItemCreationAttributes extends Optional<CartItemType, 'pkid'> { }

interface CartItemInstance extends Model<CartItemType, CartItemCreationAttributes>, CartItemType { }

const CartItem = sequelize.define<CartItemInstance>(
    'CartItem',
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
        cartId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: Cart,
                key: 'pkid'
            }
        },
        productId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: 'pkid'
            }
        },
        price: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2)
        },
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        subTotal: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2)
        }
    },
    {
        timestamps: true,
        tableName: 'cartitems'
    }
);

export { CartItem };