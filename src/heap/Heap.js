import { Compare, defaultCompare, reverseCompare } from '../utils'

export const swap = (arr, a, b) => [arr[a], arr[b]] = [arr[b], arr[a]]; //交换数组中的值
export class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.heap = []; //堆用数组表示？
    }
    /**
        item:   1  2  3  4  5  6  7
        index:  0  1  2  3  4  5  6
     */
    //给定位置index的节点，计算左侧子节点的位置
    getLeftIndex(index) {
        return 2 * index + 1;
    }
    //给定位置index的节点，计算右侧子节点的位置
    getRightIndex(index) {
        return 2 * index + 2;
    }
    //给定位置index的节点，计算父节点的位置
    getParentIndex(index) {
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2);
    }
    insert(value) {
        if (value != null) {
            this.heap.push(value);
            this.siftUp(this.heap.length - 1);
            return true;
        }
        return false;
    }
    //上移操作
    siftUp(index) {
        let parentIndex = this.getParentIndex(index);
        while ( //父节点比插入节点大，就需要交换
            index > 0 &&
            this.compareFn(this.heap[parentIndex], this.heap[index]) === Compare.BIGGER_THAN
        ) {
            swap(this.heap, parentIndex, index);
            //指针上移
            index = parentIndex;
            parentIndex = this.getParentIndex(index);
        }
    }
    extract() { //移除最小值（最小堆）或最大值（最大堆），并返回这个值
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.shift();
        }
        const removedValue = this.heap.shift();
        //将堆中最后一个元素移动到根部，再执行siftDown操作
        this.heap.unshift(this.heap.pop())
        this.siftDown(0);
        return removedValue;
    }
    siftDown(index) { //下移操作
        let element = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();
        if (
            left < size &&
            this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN
        ) {
            element = left;
        }
        if (
            right < size &&
            this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN
        ) {
            element = right;
        }
        if (index !== element) {
            swap(this.heap, index, element);
            this.siftDown(element);
        }
    }
    findMinimum() { //返回最小值（最小堆）或最大值（最大堆）且不会移除这个值。这个是最小堆，所以返回最小值
        return this.isEmpty() ? undefined : this.heap[0];
    }
    size() {
        return this.heap.length;
    }
    isEmpty() {
        return this.size() === 0;
    }
}
export class MaxHeap extends MinHeap {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = reverseCompare(compareFn); //只需要将对比规则进行替换
    }
}
