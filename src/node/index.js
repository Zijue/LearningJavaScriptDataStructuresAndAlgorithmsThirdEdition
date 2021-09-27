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
export class RedBlackNode extends BSTNode {
    constructor(key) { //红黑树节点除了记录左右子节点之外，还需要记录颜色以及父节点的引用
        super(key);
        this.color = Colors.RED;
        this.parent = null;
    }
    isRed() {
        return this.color === Colors.RED;
    }
}
export const Colors = {
    RED: 1,
    BLACK: 2
}