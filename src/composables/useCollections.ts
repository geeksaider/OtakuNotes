import { ref } from "vue";

export function useCollections(safetySearch: any) {
    interface Anime {
        score: number;
        type: string;
        year: number;
        titles: { type: string; title: string }[];
        images: {
            webp?: { image_url: string };
        };
    }
    interface Arguments {
        year?: number,
        season?: string,
        currentQuery?: string,
        param?: string,
        page?: number
    }

    const animeList = ref<Anime[]>([]);
    const loading = ref<boolean>(false);
    const query = ref<string>("");
    const lastPage = ref<number>(1);

    const fetchCollections = async (
        type: "recommendations" | "top" | "season" | "search",
        obj: Arguments = {
            page: 1,
        },
        
    ) => {
        console.log(obj.page);
        if (!type) return;

        let url = "";
        switch (type) {
            case "recommendations":
                url = `https://api.jikan.moe/v4/recommendations/anime`;
                break;
            case "top":
                url = `https://api.jikan.moe/v4/top/anime?page=${obj.page}`;
                break;
            case "season":
                if (!obj.year || !obj.season) {
                    url = `https://api.jikan.moe/v4/seasons/now?page=${obj.page}`;
                } else {
                    url = `https://api.jikan.moe/v4/seasons/${obj.year}/${obj.season}?page=${obj.page}`;
                }
                break;
            case "search": 
                if (!obj.currentQuery) return;
                url =  `https://api.jikan.moe/v4/anime?order_by=popularity&sort=desc&q=${obj.currentQuery}&page=${obj.page}${ obj.param ? obj.param : ""}&sfw=${safetySearch.value}`
                break;
        }

        try {
            loading.value = true;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Ошибка сети");
            const json = await response.json();
            animeList.value = json.data;
            lastPage.value = json.pagination?.last_visible_page;
            console.log(url)
        } catch (error) {
            console.warn("Ошибка при поиске:", error);
        } finally {
            loading.value = false;
        }
    };

    return { animeList, loading, lastPage, fetchCollections, query };
}
