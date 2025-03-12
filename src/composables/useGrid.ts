import { ref, onMounted } from "vue";

export function useGrid() {
    const gridColsNum = ref<number>(0);

    function calcGridCols() {
        if (window.innerWidth > 1024) gridColsNum.value = 4;
        else if (window.innerWidth > 768) gridColsNum.value = 3;
        else gridColsNum.value = 2;
    }

    onMounted(() => {
        window.addEventListener("resize", calcGridCols);
        calcGridCols();
    });

    return { gridColsNum };
}
