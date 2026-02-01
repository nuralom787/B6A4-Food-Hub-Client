export interface Meal {
    id?: string
    title: string
    description: string
    price: number
    imageUrl?: string
    isAvailable?: boolean
    categoryId: string
    providerId: string
}