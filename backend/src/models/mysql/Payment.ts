import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { v4 as uuidV4 } from 'uuid';
import { PaymentType } from '../../utils/types/payment.types';
import { Order } from './Order';

interface PaymentCreationAttributes extends Optional<PaymentType, 'pkid'> { }

interface PaymentInstance extends Model<PaymentType, PaymentCreationAttributes>, PaymentType { }

const Payment = sequelize.define<PaymentInstance>(
    'Payment',
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
        orderId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: Order,
                key: 'pkid'
            }
        },
        paymentDate: {
            allowNull: false,
            type: DataTypes.DATE
        },
        amount: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2),
        },
        paymentMethod: {
            allowNull: false,
            type: DataTypes.STRING
        },
        transactionId: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: () => uuidV4(),
            unique: true
        }
    },
    {
        timestamps: true,
        tableName: 'payments',
    }
);


Payment.belongsTo(Order, {
    foreignKey: 'orderId',
    as: 'order',
});

export { Payment };