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

    }
    max() { //返回树中最大的值

    }
    remove() { //从树中移除某个键

    }
}