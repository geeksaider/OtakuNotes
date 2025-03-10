import { ref, watch } from "vue";

export function usePagination(
    query: any,
    param: any,
    fetchData: any,
    lastPage: any
) {
    const currentPage = ref<number>(1);

    const changePage = (page: number) => {
        if (page < 1 || page > lastPage.value) return;
        window.scrollTo({ top: 100, behavior: "smooth" });
        currentPage.value = page;
        fetchData(query.value, page, param.value);
    };

    watch([query, param], () => {
        currentPage.value = 1;
    });

    return { currentPage, lastPage, changePage };
}
