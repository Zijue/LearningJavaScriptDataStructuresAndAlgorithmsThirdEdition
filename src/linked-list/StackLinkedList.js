import { DoubleLinkedList } from "./DoubleLinkedList";

class StackLinkedList {
    constructor() {
        this.items = new DoubleLinkedList();
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.removeAt(this.size() - 1);
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.tail.element;
    }
    isEmpty() {
        return this.items.isEmpty();
    }
    toString() {
        return this.items.toString();
    }
}
export default StackLinkedList;