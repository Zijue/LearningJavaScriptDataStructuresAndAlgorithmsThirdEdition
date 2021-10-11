import { swap } from "../heap/Heap";
import { Compare, defaultCompare } from "../utils";

export function quickSort(array, compareFn = defaultCompare) {
    return quick(array, 0, array.length - 1, compareFn);
}
function quick(array, left, right, compareFn) {
    debugger
    let index;
    if (array.length > 1) {
        index = partition(array, left, right, compareFn);
        if (left < index - 1) {
            quick(array, left, index - 1, compareFn);
        }
        if (index < right) {
            quick(array, index, right, compareFn);
        }
    }
    return array;
}
function partition(array, left, right, compareFn) {
    //1.选择主元，一般选择中间的值
    const pivot = array[Math.floor((left + right) / 2)];
    let i = left;
    let j = right;
    while (i <= j) {
        while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
            i++;
        }
        while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
            j--;
        }
        if (i <= j) {
            swap(array, i, j);
            i++;
            j--;
        }
    }
    return i;
}
/**
 * 快排利用归并的思想，将数组按照主元对比，进行分隔，使左边的数组都比主元小，右边的数组都比主元大；
 * 然后对左右两边的数组递归上诉的步骤
 */