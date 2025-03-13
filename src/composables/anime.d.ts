export interface Anime {
  score: number;
  type: string;
  year: number;
  titles: { type: string; title: string }[];
  images: {
    webp?: { image_url: string };
  };
}
