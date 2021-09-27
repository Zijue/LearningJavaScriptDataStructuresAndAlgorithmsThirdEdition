import BinarySearchTree from "./bst";
import { Compare } from "../utils";
import { Colors, RedBlackNode } from "../node";

class RedBlackTree extends BinarySearchTree {
    /** 红黑树也是一个自平衡二叉搜索树
            1.每个节点不是红的就是黑的
            2.树的根节点是黑的
            3.所有叶节点都是黑的空节点（用null引用表示的节点，即叶子节点不存储数据）
            4.如果一个节点是红的，那么它的两个子节点都是黑的
            5.不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点
            6.从给定的节点到它的后代节点（null叶节点）的所有路径包含相同数量的黑色节点
     */
    insert(key) {
        if (this.root == null) {
            this.root = new RedBlackNode(key);
            this.root.color = Colors.BLACK;
        } else {
            const newNode = this.insertNode(this.root, key);
            this.fixTreeProps(newNode);
        }
    }
    insertNode(node, key) { //与二叉搜索树插入节点逻辑基本相同，只是多了对父节点引用指向
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new RedBlackNode(key);
                node.left.parent = node;
                return node.left;
            } else {
                return this.insertNode(node.left, key);
            }
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            if (node.right == null) {
                node.right = new RedBlackNode(key);
                node.right.parent = node;
                return node.right;
            } else {
                return this.insertNode(node.right, key);
            }
        }
    }
    fixTreeProps(node) { //插入节点后，需要调整红黑树的属性（颜色、结构）
        //新插入的节点默认都是红的
        while (node && node.parent && node.parent.color.isRed()
            && node.color !== Colors.BLACK
        ) { // 插入节点与父节点都是红色节点，就需要调整
            let parent = node.parent;
            const grandParent = parent.parent;
            //1.父节点是祖父节点的左侧子节点
            if (grandParent && grandParent.left === parent) {
                const uncle = grandParent.right; //获取叔叔节点，根据叔叔节点调整红黑树的属性
                //1.1当前节点的叔叔节点是红色节点，只需要重新填色
                if (uncle && uncle.color === Colors.RED) {
                    //把父节点和叔叔节点改为黑色
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    //把祖父节点改为红色
                    grandParent.color = Colors.RED;
                    //把祖父节点作为当前节点，继续向上走调整逻辑
                    node = grandParent;
                } else { //1.2.当前节点的叔叔节点不是红色节点
                    //1.2.1.当前节点是父节点的右侧子节点：祖父节点->父节点->当前节点，是先向左再向右
                    if (node === parent.right) {
                        //父节点进行左旋操作，相当于将“祖父节点->父节点->当前节点”变成一直向左的（1.2.2）
                        this.rotationRR(parent);
                        node = parent;
                        parent = node.parent;
                    } //最后都会走右旋操作1.2.2的情形
                    //1.2.2.当前节点是父节点的左侧子节点：祖父节点->父节点->当前节点，是一直向左的
                    //祖父节点做右旋操作
                    this.rotationLL(grandParent);
                    //再把父节点改为黑色，之前的祖父节点改为红色
                    parent.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    //将右旋后的新节点返回，继续向上检查
                    node = parent
                }
            } else if (grandParent && grandParent.right === parent) {
                //2.父节点是祖父节点的右侧子节点
                const uncle = grandParent.left;
                if (uncle && uncle.color === Colors.RED) {
                    //2.1.当前节点的叔叔节点是红色节点，只需要重新填色。与1.1操作相同
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    node = grandParent;
                } else { //2.2.当前节点的叔叔节点不是红色节点
                    //2.2.1.当前节点是父节点的左侧子节点：祖父节点->父节点->当前节点，是先向右再向左
                    if (node === parent.left) {
                        //父节点进行右旋操作，将“祖父节点->父节点->当前节点”变成一直向右
                        this.rotationLL(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    //2.2.2.当前节点是父节点的右侧子节点：祖父节点->父节点->当前节点，是一直向右的
                    //祖父节点做左旋操作
                    this.rotationRR(grandParent);
                    //再把父节点改为黑色，之前的祖父节点改为红色
                    parent.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    node = parent;
                }
            }
        }
        this.root.color = Colors.BLACK; //不管怎么调整，红黑树的根节点最后一定是黑的
    }
    rotationLL(node) { //红黑树右旋
        const tmp = node.left;
        node.left = tmp.right;
        if (tmp.right && tmp.right.key) { //对于更改的父子关系的子节点需要更改正确的父级指向
            tmp.right.parent = node;
        }
        tmp.parent = node.parent; // 调整父级节点的父节点指向
        if (!node.parent) { //祖父节点有可能就是根节点
            this.root = tmp;
        } else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            } else {
                node.parent.right = tmp;
            }
        }
        tmp.right = node;
        node.parent = tmp;
        return tmp;
    }
    rotationRR(node) { //红黑树左旋
        const tmp = node.right;
        node.right = tmp.left;
        if (tmp.left && tmp.left.key) {
            tmp.left.parent = node;
        }
        tmp.parent = node.parent;
        if (!node.parent) {
            this.root = tmp;
        } else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            } else {
                node.parent.right = tmp;
            }
        }
        tmp.left = node;
        node.parent = tmp;
        return tmp;
    }
}
export default RedBlackTree;