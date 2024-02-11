import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { OrderType } from '../../utils/types/order.types';
import { v4 as uuidV4 } from 'uuid';
import { OrderItem } from './OrderItem';
import { User } from './User';

interface OrderCreationAttributes extends Optional<OrderType, 'pkid'> { }

interface OrderInstance extends Model<OrderType, OrderCreationAttributes>, OrderType { }

const Order = sequelize.define<OrderInstance>(
    'Order',
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
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'pkid'
            }
        },
        totalAmount: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2),
        },
        status: {
            allowNull: false,
            type: DataTypes.STRING
        },
    },
    {
        timestamps: true,
        tableName: 'orders',
    }
);


Order.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user', // Alias for the association
});

Order.hasMany(OrderItem, {
    foreignKey: 'orderId',
    as: 'orderItems', // Optional alias for the association
});

export { Order };