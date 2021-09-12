import { defaultEquals } from "../utils/index";
import { Node } from "../node/index";
import LinkedList from "./LinkedList";

class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    node.next = this.head;
                } else {
                    node.next = current;
                    let lastNode = this.getElementAt(this.size() - 1); // 获取最后一个节点
                    // 更新最后一个元素
                    this.head = node;
                    lastNode.next = this.head;
                }
            } else { // 不在头部添加就跟单链表插入没有区别
                let previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                if (this.size() === 1) {
                    this.head = undefined;
                } else {
                    const removed = this.head;
                    let lastNode = this.getElementAt(this.size() - 1);
                    this.head = this.head.next;
                    lastNode.next = this.head;
                    current = removed; // 返回删除的节点
                }
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}
export default CircularLinkedList;