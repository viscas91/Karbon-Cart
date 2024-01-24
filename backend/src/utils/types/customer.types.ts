export type CustomerType = {
    pkid?: number,
    id?: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    active: boolean,
    createdAt: Date,
    updatedAt: Date
}