export interface Review {
    id: string;
    rating: number;
    comment: string;
    customerId: string;
    mealId: string;
    createdAt: Date;
}