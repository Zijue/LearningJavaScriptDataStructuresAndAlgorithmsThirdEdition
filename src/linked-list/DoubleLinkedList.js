import { defaultEquals } from "../utils/index";
import { DoubleNode } from "../node/index";
import LinkedList from "./LinkedList";

class DoubleLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        this.tail = undefined;
    }
    insert(element, index) {
        if (index >= 0 && index <= this.size()) {
            const node = new DoubleNode(element);
            let current = this.head;
            if (index === 0) { // 在头部增加
                if (this.head == null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    current.prev = node;
                    this.head = node;
                }
            } else if (index === this.size()) { // 在尾部增加
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) { // 与单向链表的区别在于需要设置prev指针
        if (index >= 0 && index < this.size()) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
                if (this.size() === 1) { // 当只有一个节点时，this.head就已经是undefined，只需要将this.tail尾指针置空
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined;
                }
            } else if (index === this.size() - 1) { // 最后一项
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = undefined;
            } else {
                current = this.getElementAt(index);
                const previous = current.prev;
                // 构建上一项与下一项的链接，跳过当前项
                previous.next = current.next;
                current.next.prev = previous;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
    push(element) {
        const node = new DoubleNode(element);
        if (this.isEmpty()) {
            this.head = node;
            this.tail = node;
        } else {
            let lastNode = this.tail;
            this.tail = node;
            lastNode.next = node;
            node.prev = lastNode;
        }
        this.count++;
    }
}
export default DoubleLinkedList;