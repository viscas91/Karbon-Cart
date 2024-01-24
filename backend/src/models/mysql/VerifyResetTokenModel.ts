import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db.config";

interface ResetTokenType {
    userId: string,
    token: string,
    createdAt: Date
}

interface ResetTokenInstance extends Model<ResetTokenType>, ResetTokenType {}

export const VerifyResetToken = sequelize.define<ResetTokenInstance>('ResetToken', {
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});