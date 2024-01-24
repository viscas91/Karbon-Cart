export type CartType = {
    pkid: number,
    id?: string,
    customerId: string,
    createdAt?: Date,
    updatedAt?: Date
}

export type CartItemType = {
    pkid?: number,
    id?: string,
    cartId: number,
    productId: number,
    price: number,
    quantity: number,
    subTotal: number,
    createdAt?: Date,
    updatedAt?: Date
}