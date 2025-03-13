// import { ref, watch } from "vue";

// export function useAnimeList(safetySearch: any, param: any) {
//   interface Anime {
//     score: number;
//     type: string;
//     year: number;
//     titles: { type: string; title: string }[];
//     images: {
//       webp?: { image_url: string };
//     };
//   }

//   const animeList = ref<Anime[]>([]);
//   const loading = ref<boolean>(false);
//   const query = ref<string>("");
//   const lastPage = ref<number>(1);

//   const fetchData = async (
//     currentQuery: string,
//     page: number = 1,
//     param?: string
//   ) => {
//     if (!currentQuery) return;
//     try {
//       loading.value = true;
//       const response = await fetch(
//         `https://api.jikan.moe/v4/anime?order_by=popularity&sort=desc&q=${currentQuery}&page=${page}${
//           param ? param : ""
//         }&sfw=${safetySearch.value}`
//       );
//       if (!response.ok) throw new Error("Ошибка сети");
//       const json = await response.json();
//       animeList.value = json.data;
//       lastPage.value = json.pagination.last_visible_page;
//     } catch (error) {
//       console.warn("Ошибка при поиске:", error);
//     } finally {
//       loading.value = false;
//     }
//   };

//   watch([query, param], ([value, param]) => {
//     fetchData(value!, 1, param);
//   });

//   return { animeList, loading, query, lastPage, fetchData };
// }
