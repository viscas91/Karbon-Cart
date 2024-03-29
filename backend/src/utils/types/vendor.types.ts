export type VendorType = {
    pkid?: number,
    id?: string,
    name: string,
    contactFName: string,
    contactLName: string,
    email: string,
    banner: string,
    phone: string,
    fax: string,   
    address: Text,
    description: Text,
    fbLink?: string,
    twLink?: string,
    instaLink?: string,
    status: boolean,
    userId: string,
    note?: string,
    ranking: number,
    website: Text,
    discountAvailable: Boolean,
    discountType: Text,
    discountRate?: DoubleRange,
    typeGoods?: Text,
    createdAt?: Date,
    updatedAt?: Date
}