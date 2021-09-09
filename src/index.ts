import { LinkedList } from './linked-list';

const linkedList = new LinkedList();
linkedList.push('xiaochi');
linkedList.push('zijue');
linkedList.insert('xiaodai', 1);
console.log(linkedList.toString());
console.log(linkedList.indexOf('zijue'));