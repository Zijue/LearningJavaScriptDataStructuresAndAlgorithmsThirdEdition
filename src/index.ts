import { LinkedList, DoubleLinkedList, DoubleCircularLinkedList } from './linked-list';

// 单向链表测试
// const linkedList = new LinkedList();
// linkedList.push('xiaochi');
// linkedList.push('zijue');
// linkedList.insert('xiaodai', 1);
// console.log(linkedList.toString());
// console.log(linkedList.indexOf('zijue'));
// console.log(linkedList.getElementAt(linkedList.size()))

// 双向链表测试
// const doubleLinkedList = new DoubleLinkedList();
// doubleLinkedList.insert('xiaochi', 0);
// doubleLinkedList.insert('zijue1', 1);
// doubleLinkedList.insert('zijue2', 2);
// doubleLinkedList.insert('zijue3', 3);
// doubleLinkedList.push('zijue4');
// console.log(doubleLinkedList.toString());
// console.log(doubleLinkedList.tail);
// console.log(doubleLinkedList.tail.prev);

// 双向循环链表测试
const dcll = new DoubleCircularLinkedList();
dcll.insert('xiaochi', 0);
dcll.insert('zijue-1', 1);
dcll.insert('zijue-2', 2);
dcll.insert('zijue-3', 3);
console.log(dcll.toString());
// console.log(dcll.removeAt(2));
console.log(dcll.removeAt(0));
console.log(dcll.toString());