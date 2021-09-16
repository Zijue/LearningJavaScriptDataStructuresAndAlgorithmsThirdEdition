import { DoubleNode } from "../node/index";
import DoubleLinkedList from "./DoubleLinkedList";

/**最近最少使用缓存算法，多用与页面置换
 * 使用哈希表 + 双向链表的形式实现；又称哈希链表
 */
class LRUCache {
    constructor(capacity) {
        this._capacity = capacity; // 容量
        this._map = new Map(); // key与节点的映射 {key: Node}
        this._dll = new DoubleLinkedList(); // 用于存储key，value键值对
    }
    get(key) {
        if (!this._map.has(key)) {
            return -1; // 返回-1，表示不存在
        }
        // 如果key存在，则需要将其提前
        const node = this._map.get(key);
        this.remove(node);
        this.insertHead(node);
    }
    put(key, value) {
        // 通过key，value创建新的节点
        const node = new DoubleNode({ key, value });
        // 检查此key是否存在
        if (this._map.has(key)) { // key存在，就删除老的节点
            this.remove(this._map.get(key)); // 删除老节点
        }
        // 将新节点添加到链表头部，同时更新_map中key的值
        this.insertHead(node);
        this._map.set(key, node);
        // 还需要判断_capacity与_dll.size()的大小，决定是否删除尾结点
        if (this._dll.size() > this._capacity) {
            const removed = this.removeTail(); // 删除尾结点
            this._map.delete(removed.key); // 移除映射表中的key
        }
    }
    insertHead(node) { // 往链表头部添加节点
        node.next = this._dll.head;
        if (this._dll.head) {
            this._dll.head.prev = node;
        } else {
            this._dll.tail = node;
        }
        this._dll.head = node;
        this._dll.count++;
    }
    remove(node) { // 移除指定的节点 -- 进入此步表示节点必存在
        if (this._dll.size() === 1) { // 需要移除的节点就是唯一一个节点
            this._dll.head = null;
            this._dll.tail = null;
        } else if (node === this._dll.head) { // 移除的是头部节点
            this._dll.head = node.next; // 改变头指针的指向
            node.next.prev = null; // 将删除节点的下一个节点prev指针置空
        } else if (node === this._dll.tail) { // 移除的是尾部节点
            this._dll.tail = node.prev; // 改变尾指针的指向
            node.prev.next = null; // 将删除节点的前一个节点next指针置空
        } else { // 移除的是链表中间的节点
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        this._dll.count--;
    }
    removeTail() {
        const removed = this._dll.tail;
        this.remove(removed); // 移除尾部节点
        return removed.element;
    }
    toString() {
        return this._dll.toString();
    }
}
export default LRUCache;