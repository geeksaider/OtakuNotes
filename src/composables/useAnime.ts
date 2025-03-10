import { ref, watch, onMounted } from "vue";

export function useAnime() {
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
    const query = ref<string>("");
    const currentPage = ref<number>(1);
    const lastPage = ref<number>(1);
    const showFilters = ref<boolean>(false);
    const param = ref<string | undefined>(undefined);
    const safetySearch = ref<boolean>(true);
    const gridColsNum = ref<number>(0);
    let waitResponse: number | undefined = undefined;

    function calcGridCols() {
        if (window.innerWidth > 1024) gridColsNum.value = 4;
        else if (window.innerWidth > 768) gridColsNum.value = 3;
        else gridColsNum.value = 2;
    }

    onMounted(() => {
        window.addEventListener("resize", calcGridCols);
        calcGridCols();
    });

    const fetchData = async (
        currentQuery: string,
        page: number = 1,
        param?: string
    ) => {
        if (!currentQuery) return;
        try {
            const response = await fetch(
                `https://api.jikan.moe/v4/anime?order_by=popularity&sort=desc&q=${currentQuery}&page=${page}${param ? param : ""}&sfw=${safetySearch.value}`
            );
            if (!response.ok) throw new Error("Ошибка сети");
            const json = await response.json();
            animeList.value = json.data;
            lastPage.value = json.pagination.last_visible_page;
        } catch (error) {
            console.warn("Ошибка при поиске:", error);
        } finally {
            loading.value = false;
        }
    };

    watch([query, param], ([value, param]) => {
        loading.value = true;
        currentPage.value = 1;

        clearTimeout(waitResponse);
        waitResponse = setTimeout(async () => {
            await fetchData(value!, 1, param);
            waitResponse = undefined;
        }, 500);
    });

    const changePage = (page: number) => {
        loading.value = true;
        window.scrollTo({ top: 100, behavior: "smooth" });
        currentPage.value = page;

        clearTimeout(waitResponse);
        waitResponse = setTimeout(async () => {
            await fetchData(query.value, page, param.value);
            waitResponse = undefined;
        }, 500);
    };

    function apply(
        type?: string,
        age?: string,
        year?: number,
        minRating?: number
    ) {
        safetySearch.value = age !== "rx";
        const filter = [
            type ? `&type=${type}` : "",
            age ? `&rating=${age}` : "",
            year ? `&start_date=${year}-01-01&end_date=${year}-12-31` : "",
            minRating ? `&min_score=${minRating}` : "",
        ];
        showFilters.value = false;
        param.value = filter.join("");
    }

    return {
        animeList,
        loading,
        query,
        currentPage,
        lastPage,
        showFilters,
        safetySearch,
        gridColsNum,
        fetchData,
        changePage,
        apply,
    };
}
