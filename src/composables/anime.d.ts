export interface Anime {
    score?: number;
    scored_by?: number;
    rank?: number;
    popularity?: number;
    episodes?: number;
    status: string;
    mal_id: number;
    aired: {
        string: string;
    };
    producers: {
        name: string;
    }[];
    studios: {
        name: string;
    }[];
    genres: {
        name: string;
        mal_id: number;
    }[];
    themes: {
        name: string;
    }[];
    source: string;
    duration: string;
    rating: string;
    type: string;
    synopsis: string;
    year: number;
    relations: {
        relation: string;
        entry: {
            mal_id: number;
            type: string;
            name: string;
        };
    }[];
    titles: { type: string; title: string }[];
    images: {
        webp: { image_url: string; large_image_url: string };
    };
    trailer: {
        embed_url: string;
    };
}
