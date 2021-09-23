export class Node {
    constructor(element) {
        this.element = element; // 节点存放的内容
        this.next = undefined; // 指向下一个节点
    }
}
export class DoubleNode extends Node { // 双向节点
    constructor(element, next, prev) {
        super(element, next);
        this.prev = prev;
    }
}
export class BSTNode {
    constructor(key) {
        this.key = key; //节点值
        this.left = null; //左侧子节点引用
        this.right = null; //右侧子节点引用
    }
}