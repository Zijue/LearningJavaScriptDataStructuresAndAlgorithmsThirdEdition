import { defaultCompare, reverseCompare, Compare } from '../utils';

export const swap = (arr, a, b) => [arr[a], arr[b]] = [arr[b], arr[a]]; //交换数组中的值
export function heapSort(array, compareFn = defaultCompare /**reverseCompare(defaultCompare) */) {
    debugger
    let heapSize = array.length;
    buildMaxHeap(array, compareFn);
    console.log(array);
    while (heapSize > 1) {
        swap(array, 0, --heapSize); //交换头和尾
        heapify(array, 0, heapSize, compareFn);
    }
    return array;
}
function buildMaxHeap(array, compareFn) {
    let lastIndex = array.length - 1;
    // 从数组最后一个元素的父元素，调用heapify，使堆变成最大堆或最小堆
    let i = Math.floor((lastIndex - 1) / 2);
    for (i; i >= 0; i = Math.floor((lastIndex - 1) / 2)) {
        heapify(array, i, array.length, compareFn);
        lastIndex -= 2;
    }
    return array;
}
function heapify(heap, index, size, compareFn) { //同堆下移siftDown一样
    let element = index;
    const left = getLeftIndex(index);
    const right = getRightIndex(index);
    if (
        left < size &&
        compareFn(heap[element], heap[left]) === Compare.BIGGER_THAN
    ) {
        element = left;
    }
    if (
        right < size &&
        compareFn(heap[element], heap[right]) === Compare.BIGGER_THAN
    ) {
        element = right;
    }
    if (index !== element) {
        swap(heap, index, element);
        heapify(heap, element, size, compareFn);
    }
}
function getLeftIndex(index) {
    return 2 * index + 1;
}
function getRightIndex(index) {
    return 2 * index + 2;
}
function getParentIndex(index) {
    if (index === 0) {
        return undefined;
    }
    return Math.floor((index - 1) / 2);
}