import { ref } from "vue";

export function useFilters() {
    const showFilters = ref<boolean>(false);
    const param = ref<string | undefined>(undefined);
    const safetySearch = ref<boolean>(true);

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

    return { showFilters, param, safetySearch, apply };
}
