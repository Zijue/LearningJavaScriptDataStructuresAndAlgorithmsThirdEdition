import { BSTNode } from "../node";
import { Compare, defaultCompare } from "../utils";

export default class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.root = null; //根节点
    }
    insert(key) { //向树中插入一个新的键
        if (this.root == null) {
            this.root = new BSTNode(key);
        } else {
            this.insertNode(this.root, key);
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) { //比父节点小，放到左侧子节点
            if (node.left == null) {
                node.left = new BSTNode(key);
            } else {
                this.insertNode(node.left, key); //递归对比子节点
            }
        } else {
            if (node.right == null) {
                node.right = new BSTNode(key);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }
    search(key) { //在树中查找key
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
        if (node == null) {
            return false;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key);
        } else {
            return true;
        }
    }
    inOrderTraverse(callback) { //中序遍历方式遍历所有节点 -- 从最小到最大的顺序访问所有节点
        //接收一个回调函数作为参数；回调函数用来定义我们对遍历到的每个节点进行的操作（也叫访问者模式）
        debugger;
        this.inOrderTraverseNode(this.root, callback);
    }
    inOrderTraverseNode(node, callback) { //从最小到最大的顺序访问所有节点
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }
    preOrderTraverse(callback) { //先序遍历方式遍历所有节点 -- 以优先于后代节点的顺序访问每个节点
        // 先序遍历的一种应用是打印一个结构化的文档（序言-第一章-1.1-1.2-第二章-2.1 ... 结尾）
        this.preOrderTraverseNode(this.root, callback);
    }
    preOrderTraverseNode(node, callback) {
        if (node != null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }
    postOrderTraverse(callback) { //后序遍历方式遍历所有节点 -- 先访问节点的后代节点
        //后序遍历的一种应用是计算一个目录及其子目录中所有文件所占空间的大小
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
    min() { //返回树中最小的值
        return this.minNode(this.root);
    }
    minNode(node) {
        let current = node;
        while (current != null && current.left != null) {
            current = current.left;
        }
        return current;
    }
    max() { //返回树中最大的值
        return this.maxNode(this.root);
    }
    maxNode(node) {
        let current = node;
        while (current != null && current.right != null) {
            current = current.right;
        }
        return current;
    }
    remove(key) { //从树中移除某个键
        //将removeNode方法的返回值赋给root?
        //为了父节点指向正确；当子节点删除时，父节点能够有正确的指向
        this.root = this.removeNode(this.root, key);
    }
    removeNode(node, key) {
        if (node == null) {
            return null;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            //键等于node.key
            //第一种情况
            if (node.left == null && node.right == null) {
                node = null;
                return node; //将父节点的指针置为null
            }
            //第二种情况
            if (node.left == null) {
                node = node.right;
                return node;
            } else if (node.right == null) {
                node = node.left;
                return node;
            }
            //第三种情况??? -- 子节点都不为null
            const aux = this.minNode(node.right); //找到右节点中最小的，替换当前要删除的节点的key
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key); //替换之后，删除之前右边节点中最小的那个
            return node;
        }
    }
}