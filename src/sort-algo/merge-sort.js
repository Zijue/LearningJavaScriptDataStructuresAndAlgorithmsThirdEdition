import { Compare, defaultCompare } from "../utils";

//归并排序是一种分而治之算法。其思想是将原始数组切分成较小的数组，直到每个小数组
//只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组
export function mergeSort(array, compareFn = defaultCompare) {
    debugger
    if (array.length > 1) {
        const middle = Math.floor(array.length / 2); //找数组中位点
        const left = mergeSort(array.slice(0, middle), compareFn);
        const right = mergeSort(array.slice(middle, array.length), compareFn);
        array = merge(left, right, compareFn);
    }
    return array;
}
function merge(left, right, compareFn) {
    let i = 0;
    let j = 0;
    const result = [];
    //递归的思想：传递的left和right都是排好序的，通过循环，将左右两边的数组合并
    while (i < left.length && j < right.length) {
        result.push(
            compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]
        );
    }
    //合并完数组后，左右两边剩下（只可能有一边剩下）的一定比已经排好序的大，直接合并到数组末尾即可
    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}