export type CategoryType = {
    id?: number,
    title: string,
    slug?: string,
    icon: string,
    createdAt?: Date,
    updatedAt?: Date
}

export type SubCategoryType = {
    id?: number,
    title: string,
    slug?: string,
    icon: string,
    categoryId: number,
    createdAt?: Date,
    updatedAt?: Date
}

export type ChildCategoryType = {
    id?: number,
    title: string,
    slug?: string,
    icon: string,
    categoryId: string,
    subCategoryId: string,
    createdAt?: Date,
    updatedAt?: Date
}