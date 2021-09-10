import { defaultEquals } from "../utils/index";
import { DoubleNode } from "../node/index";
import LinkedList from "./LinkedList";

class DoubleLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        this.tail = undefined;
    }
    insert(element, index) {
        
    }
}
export default DoubleLinkedList;