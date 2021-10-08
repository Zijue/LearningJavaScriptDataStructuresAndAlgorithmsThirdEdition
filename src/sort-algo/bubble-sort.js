import { swap } from "../heap/Heap";
import { Compare, defaultCompare } from "../utils";

//冒泡排序：比较所有相邻的两个项，如果第一个比第二个大，则交换他们
export function bubbleSort(array, compareFn = defaultCompare) {
    const length = array.length;
    for (let i = 0; i < length; i++) {
        //内循环减去外循环中已跑过的轮数，避免内循环中所有不必要的比较
        for (let j = 0; j < length - 1 - i; j++) {
            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j, j + 1);
            }
        }
    }
    return array;
}