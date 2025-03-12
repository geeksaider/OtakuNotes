import { ref } from "vue";

export function useCollections() {
    interface Anime {
        score: number;
        type: string;
        year: number;
        titles: { type: string; title: string }[];
        images: {
            webp?: { image_url: string };
        };
    }

    const animeList = ref<Anime[]>([]);
    const loading = ref<boolean>(false);
    const lastPage = ref<number>(1);

    const fetchCollections = async (
        type: "recommendations" | "top" | "season",
        year?: number,
        season?: string,
        page: number = 1
    ) => {
        if (!type) return;

        let url = "";
        switch (type) {
            case "recommendations":
                url = `https://api.jikan.moe/v4/recommendations/anime`;
                break;
            case "top":
                url = `https://api.jikan.moe/v4/top/anime?page=${page}`;
                break;
            case "season":
                if (!year || !season) {
                    url = `https://api.jikan.moe/v4/seasons/now?page=${page}`;
                } else {
                    url = `https://api.jikan.moe/v4/seasons/${year}/${season}?page=${page}`;
                }
                break;
        }

        try {
            loading.value = true;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Ошибка сети");
            const json = await response.json();
            animeList.value = json.data;
            lastPage.value = json.pagination?.last_visible_page || 1;
        } catch (error) {
            console.warn("Ошибка при поиске:", error);
        } finally {
            loading.value = false;
        }
    };

    return { animeList, loading, lastPage, fetchCollections };
}
