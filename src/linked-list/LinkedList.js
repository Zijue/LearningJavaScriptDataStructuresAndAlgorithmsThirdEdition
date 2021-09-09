import { defaultEquals } from "../utils/index";
import { Node } from "../node/index";

class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0; // 用于存储链表中元素的数量
        this.head = undefined; // 链表结构需要一个头部指针，该指针用于定位链表的起点
        this.equalsFn = equalsFn; // 用于判断两个节点是否相同
    }
    push(element) { // 向链表尾部添加元素
        const node = new Node(element); // 需要将传入的元素都包装成node节点
        let current; // 用于表示当前指针指向的节点
        if (this.head == null) { // 头节点为空，将传入的节点赋给头节点
            this.head = node;
        } else {
            current = this.head;
            /**链表最后一个节点的下一个元素始终是undefined或null */
            while (current.next != null) { // 找到链表的最后一个节点
                current = current.next;
            }
            current.next = node; // 将最后一个节点的next指针指向新添加的元素
        }
        this.count++; // 链表的节点数+1
    }
    getElementAt(index) {
        if (index >= 0 && index < this.count) {
            let node = this.head;
            for (let i = 0; i < index; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }
    removeAt(index) { // 移除指定位置的节点
        // 检查index越界值
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) { // 移除头节点
                this.head = current.next; // 将头指针指向头节点的下一个节点
            } else {
                // 需要同时找到删除节点的上一个与下一个
                let previous = this.getElementAt(index - 1);
                current = previous.next;
                // 将previous与current的下一项连接起来，跳过current，从而移除它
                previous.next = current.next;
            }
            this.count--; // 记得链表长度-1
            return current.element;
        } else {
            return undefined;
        }
    }
    insert(element, index) { // 向链表的特定位置插入一个新元素
        if (index >= 0 && index <= this.count) {
            let newNode = new Node(element);
            if (index === 0) { // 在头部位置添加
                let current = this.head;
                newNode.next = current;
                this.head = newNode;
            } else {
                let previous = this.getElementAt(index - 1);
                let current = previous.next;
                newNode.next = current;
                previous.next = newNode;
            }
            this.count++; // 更新链表的长度
            return true;
        }
        return false;
    }
    toString() {
        let arr = [];
        let node = this.head;
        if (node == null) {
            return '';
        }
        for (let i = 0; i < this.count; i++) {
            arr.push(node.element);
            node = node.next;
        }
        return arr.join(' => ')
    }
    indexOf(element) { // 返回一个元素的位置
        let current = this.head;
        for (let i = 0; i < this.count; i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
    remove(element) { // 移除方法通过indexOf
        let index = this.indexOf(element);
        return this.removeAt(index);
    }
    size() {
        return this.count;
    }
    isEmpty() {
        return this.size() === 0;
    }
    getHead() {
        return this.head;
    }
}
export default LinkedList;