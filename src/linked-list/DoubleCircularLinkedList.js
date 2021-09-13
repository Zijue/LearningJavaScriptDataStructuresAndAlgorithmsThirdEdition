import { defaultEquals } from "../utils/index";
import { DoubleNode } from "../node/index";
import DoubleLinkedList from "./DoubleLinkedList";

class DoubleCircularLinkedList extends DoubleLinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
    }
    insert(element, index) {
        const node = new DoubleNode(element);
        if (index >= 0 && index <= this.size()) {
            let current = this.head;
            if (index === 0) { // 头部添加
                if (this.size() === 0) { // 表示此链表为空
                    this.head = node;
                    this.tail = node;
                    this.tail.next = this.head;
                    this.head.prev = this.tail;
                } else {
                    this.head = node;
                    node.next = current;
                    node.prev = current.prev;
                    current.prev = node;
                }
            } else if (index === this.size()) { // 在尾部添加
                current = this.tail;
                node.prev = current;
                node.next = current.next;
                current.next = node;
                this.tail = node;
                this.head.prev = node;
            } else {
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                node.prev = previous;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index < this.size()) {
            let removed;
            if (index === 0) {
                removed = this.head;
                if (this.size() === 1) { // 此链表节点数为 1
                    this.head = undefined;
                    this.tail = undefined;
                } else {
                    this.tail.next = removed.next;
                    removed.next.prev = this.tail;
                    this.head = removed.next;
                }
            } else if (index === this.size() - 1) {
                removed = this.tail;
                this.tail = removed.prev;
                this.tail.next = removed.next;
                removed.next.prev = this.tail;
            } else {
                removed = this.getElementAt(index);
                removed.prev.next = removed.next;
                removed.next.prev = removed.prev;
            }
            this.count--;
            return removed.element;
        }
        return undefined;
    }
    toString() {
        const arr = [];
        if (this.head == null) return '';
        let node = this.head;
        for (let i = 0; i < this.size(); i++) {
            let tempObj = {
                element: node.element,
                prev: node.prev.element,
                next: node.next.element
            }
            arr.push(JSON.stringify(tempObj));
            node = node.next;
        }
        return arr.join(' => ');
    }
}
export default DoubleCircularLinkedList;