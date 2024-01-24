export type OrderType = {
    pkid?: number,
    id: string,
    userId: number,
    totalAmount: DoubleRange,
    status: string,
    createdAt?: Date,
}

export type OrderItemType = {
    pkid?: number,
    id: string,
    orderId: number,
    productId: number,
    quantity: number,
    price: DoubleRange,
    subTotal: DoubleRange,
    createdAt?: Date,
    updatedAt?: Date
}