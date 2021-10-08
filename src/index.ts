import { heapSort, MinHeap } from './heap/index';
import { defaultCompare, reverseCompare } from './utils';
// import { LinkedList, DoubleLinkedList, DoubleCircularLinkedList, LRUCache } from './linked-list';
// import Set from './set/index';
// import { Dictionary, HashTable, HashTableSeparateChaining } from './map/index';
// import { BinarySearchTree } from './tree';

// 单向链表测试
// const linkedList = new LinkedList();
// linkedList.push('xiaochi');
// linkedList.push('zijue');
// linkedList.insert('xiaodai', 1);
// console.log(linkedList.toString());
// console.log(linkedList.indexOf('zijue'));
// console.log(linkedList.getElementAt(linkedList.size()))
// console.log(linkedList.reverse()); // 链表反转
// console.log(linkedList.toString());

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
// const dcll = new DoubleCircularLinkedList();
// dcll.insert('xiaochi', 0);
// dcll.insert('zijue-1', 1);
// dcll.insert('zijue-2', 2);
// dcll.insert('zijue-3', 3);
// console.log(dcll.toString());
// // console.log(dcll.removeAt(2));
// console.log(dcll.removeAt(0));
// console.log(dcll.toString());

// LRU算法测试 -- 哈希链表
// const lru = new LRUCache(4);
// lru.put(1, 1);
// lru.put(2, 2);
// lru.put(3, 3);
// lru.get(1);
// console.log(lru.toString());
// lru.put(4, 4);
// lru.put(5, 5);
// console.log(lru.toString());
// lru.put(4, 'zijue');
// console.log(lru.toString());

// 集合Set的测试
// const set = new Set();
// set.add(1);
// console.log(set.values());
// console.log(set.has(1));
// console.log(set.size());
// set.add(2);
// console.log(set.values());
// console.log(set.has('2'));
// console.log(set.size());
// set.delete(1);
// console.log(set.values());
// set.delete(2);
// console.log(set.values());

// ES2015原生Set学习
// const set = new Set();
// set.add(1);
// console.log(set.values()); // 不是一个数组，而是@Iterator
// console.log(set.has(1));
// console.log(set.size); // size是一个属性
// 原生集合求交集、并集、差集的实现方式
// const setA = new Set([1, 2, 3]);
// const setB = new Set([3, 4, 5]);
// console.log(new Set([...setA, ...setB])); // 并集
// console.log(new Set([...setA].filter(x => setB.has(x)))); // 交集
// console.log(new Set([...setA].filter(x => !setB.has(x)))); // 差集

// 字典类测试
// const dic = new Dictionary();
// dic.set('Gandalf', 'gandalf@email.com');
// dic.set('John', 'johnsnow@email.com');
// dic.set('Tyrion', 'tyrion@email.com');
// console.log(dic.keys());
// console.log(dic.values());
// console.log(dic.keyValues());
// console.log(dic.get('Tyrion'));
// dic.forEach((k, v) => {
//     console.log('forEach: ', `key: ${k}, value: ${v}`);
// });

// 散列表测试
// const hash = new HashTable();
// hash.put('Gandalf', 'gandalf@email.com');
// hash.put('John', 'johnsnow@email.com');
// hash.put('Tyrion', 'tyrion@email.com');
// console.log(hash.hashCode('Gandalf') + '- Gandalf');
// console.log(hash.hashCode('John') + ' - John');
// console.log(hash.hashCode('Tyrion') + ' - Tyrion');
// console.log(hash.get('Gandalf')); 
// console.log(hash.get('Loiane'));

// 散列表冲突测试
// const hash = new HashTable();
// const hash = new HashTableSeparateChaining();
// hash.put('Ygritte', 'ygritte@email.com');
// hash.put('Jonathan', 'jonathan@email.com');
// hash.put('Jamie', 'jamie@email.com');
// hash.put('Jack', 'jack@email.com');
// hash.put('Jasmine', 'jasmine@email.com');
// hash.put('Jake', 'jake@email.com');
// hash.put('Nathan', 'nathan@email.com');
// hash.put('Athelstan', 'athelstan@email.com');
// hash.put('Sue', 'sue@email.com');
// hash.put('Aethelwulf', 'aethelwulf@email.com');
// hash.put('Sargeras', 'sargeras@email.com');
// console.log(hash.toString()); //上述的哈希表存在散列冲突，会使：分离链接 或 线性探查

// 二叉搜索树测试
// const tree = new BinarySearchTree();
// tree.insert(11);
// tree.insert(7);
// tree.insert(15);
// tree.insert(5);
// tree.insert(3);
// tree.insert(9);
// tree.insert(8);
// tree.insert(10);
// tree.insert(13);
// tree.insert(12);
// tree.insert(14);
// tree.insert(20);
// tree.insert(18);
// tree.insert(25);
// tree.insert(6);
// const printNode = (value) => console.log(value);
// tree.inOrderTraverse(printNode);
// tree.preOrderTraverse(printNode);
// tree.postOrderTraverse(printNode);
// console.log(tree.min());
// console.log(tree.max());
// console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.');
// console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.');
// tree.remove(15);
// tree.inOrderTraverse(printNode);

//二叉堆（最小堆）
// const heap = new MinHeap();
// heap.insert(2);
// heap.insert(3);
// heap.insert(4);
// heap.insert(5);
// heap.insert(1);
// console.log(heap.heap)
// console.log('Heap size: ', heap.size());
// console.log('Heap is empty: ', heap.isEmpty());
// console.log('Heap min value: ', heap.findMinimum());
// console.log('Extract minimum: ', heap.extract());
// console.log(heap.heap)

//堆排序
// const array = [7, 6, 3, 5, 4, 1, 2];
const array = [7, 4, 2, 5, 6, 1, 3];
debugger
console.log('Before sorting: ', array);
console.log('After sorting: ', heapSort(array));
console.log('After sorting: ', heapSort(array, reverseCompare(defaultCompare)));
