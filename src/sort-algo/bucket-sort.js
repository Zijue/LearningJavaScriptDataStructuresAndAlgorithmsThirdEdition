import { insertionSort } from "./insertion-sort";

export function bucketSort(array, bucketSize = 5) {
    if (array.length < 2) { //空数组或仅一个元素数组不需要排序
        return array;
    }
    //1.将需要排序的数组元素分布到不同的桶中
    const buckets = createBuckets(array, bucketSize);
    //2.1.对每个桶执行插入排序算法（用来排序小数组的不错算法）
    //2.2.将所有桶合并为排序后的结果数组
    return sortBuckets(buckets);
}
function createBuckets(array, bucketSize) {
    let minValue = array[0];
    let maxValue = array[0];
    for (let i = 0; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i];
        } else if (array[i] > maxValue) {
            maxValue = array[i];
        }
    }
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    const buckets = [];
    for (let i = 0; i < bucketCount; i++) {
        buckets[i] = []
    }
    for (let i = 0; i < array.length; i++) {
        const bucketIndex = Math.floor((array[i] - minValue) / bucketSize);
        buckets[bucketIndex].push(array[i]);
    }
    return buckets;
}
function sortBuckets(buckets) {
    const sortedArray = [];
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] != null) {
            insertionSort(buckets[i]);
            sortedArray.push(...buckets[i]);
        }
    }
    return sortedArray;
}