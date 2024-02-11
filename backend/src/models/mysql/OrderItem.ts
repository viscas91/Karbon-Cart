import { DataTypes, Model, Optional } from "sequelize";
import { OrderItemType } from "../../utils/types/order.types";
import { sequelize } from "../../config/db.config";
import { v4 as uuidV4 } from "uuid";
import { Order } from "./Order";
import { Product } from "./Product";

interface OrderItemCreationAttributes extends Optional<OrderItemType, 'pkid'> { }

interface OrderItemInstance extends Model<OrderItemType, OrderItemCreationAttributes>, OrderItemType { }

const OrderItem = sequelize.define<OrderItemInstance>(
    'OrderItem',
    {
        pkid: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true
        },
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: () => uuidV4(),
            unique: true
        },
        orderId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: Order,
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
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        price: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2)
        },
        subTotal: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2)
        }
    },
    {
        timestamps: true,
        tableName: 'order_items',
    }
)

export { OrderItem };