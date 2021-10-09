import { Compare, defaultCompare } from "../utils";

/**
 * 插入排序：每次排一个数组项，以此方式构建最后的排序数组。
 * 假定第一项已经排序了，接着它和第二项进行比较，决定第二项是应该待在原位还是插在第一项之前；
 * 这样，头两项就已正确排序，接着和第三项比较（它是该插入到第一、第二还是第三的位置呢），以此类推
 */
export function insertionSort(array, compareFn = defaultCompare) {
    const length = array.length;
    let temp;
    for (let i = 1; i < length; i++) {
        let j = i;
        temp = array[i];
        while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
            array[j] = array[j - 1];
            j--;
        }
        array[j] = temp;
    }
    return array;
}