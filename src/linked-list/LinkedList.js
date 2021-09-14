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
        const arr = [];
        if (this.head == null) return '';
        let node = this.head;
        for (let i = 0; i < this.size(); i++) {
            let tempObj = {
                element: node.element,
                next: node.next ? node.next.element : null
            }
            arr.push(JSON.stringify(tempObj));
            node = node.next;
        }
        return arr.join(' => ');
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
    reverse(head = this.head) {
        /** 就地逆置法反转链表
         * 需要额外借助两个指针beg end
         * 核心思想就是将后续节点插到head节点的前面（头插法需要一个新的链表，此方法不需要）
         */
        // let beg = this.head;
        // let end = this.head.next;
        // while (end != null) {
        //     // 移除end节点
        //     beg.next = end.next;
        //     // 将end节点移动到链表头部
        //     end.next = this.head;
        //     this.head = end;
        //     // 最后调整end的指向
        //     end = beg.next;
        // }
        // return this.head;

        /** 递归的方式反转链表
         */
        // 递归的出口
        if (head == null || head.next == null) { // 空链或者只有一个节点，直接返回头指针
            this.head = head;
            return head;
        } else {
            // 一直递归，找到链表的最后一个节点
            let newHead = this.reverse(head.next);
            // 当逐层退出时，newHead的指向不变，一直指向原链表中最后一个节点
            // 递归每退出一层，函数中head指针的指向都会发生改变，都指向上一个节点
            // 每退出一层，都需要改变head.next节点指针域的指向，同时令head所指节点的指针域为null
            head.next.next = head;
            head.next = null;
            // 每一层递归结束，都要将新的头指针返回给上一层。由此，即可保证整个递归过程中，能够一直找到新链表的表头
            return newHead;
        }
    }
}
export default LinkedList;