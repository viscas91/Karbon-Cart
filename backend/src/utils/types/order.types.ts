export type OrderType = {
    pkid?: number,
    id?: string,
    userId: number,
    totalAmount: number,
    status: string,
    createdAt?: Date,
}

export type OrderItemType = {
    pkid?: number,
    id: string,
    orderId: number,
    productId: number,
    quantity: number,
    price: number,
    subTotal: number,
    createdAt?: Date,
    updatedAt?: Date
}