export interface Filters {
  [key: string]: string | number | undefined | boolean;
  type?: string;
  age?: string;
  year?: number;
  minRating?: number;
  filter?: string;
  safety?: boolean;
  season?: string;
  seasonYear?: number;
}
