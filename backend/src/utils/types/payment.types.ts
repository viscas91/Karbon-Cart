export type PaymentType = {
    pkid?: number
    id: string
    orderId: number,
    paymentDate: Date,
    amount: DoubleRange,
    paymentMethod: string,
    transactionId: string, // uuid
    createdAt?: Date,
    updatedAt?: Date
}