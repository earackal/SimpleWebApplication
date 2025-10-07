export interface Product{
    id: number;
    name: string;
    description: string;
    brand: string;
    price: number;
    category: string;
    releaseDate: Date;
    productAvailable: boolean;
    stockQuantity: number;
    imageUrl: string;
}