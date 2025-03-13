import { ref } from "vue";

export function usePagination(lastPage: any) {
  const currentPage = ref<number>(1);

  const changePage = (page: number) => {
    if (page < 1 || page > lastPage.value) return;
    window.scrollTo({ top: 100, behavior: "smooth" });
    currentPage.value = page;
  };

  return { currentPage, lastPage, changePage };
}
