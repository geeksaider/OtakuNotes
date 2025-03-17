export interface Filters {
    [key: string]: string | number | undefined;
    type?: string;
    age?: string;
    year?: number;
    minRating?: number;
    filter?: string;
}
