import BinarySearchTree from "./bst";
import { Compare, defaultCompare } from "../utils";

const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};
//自平衡树 -- 左右子树的高度相差不超过 1 的树为平衡二叉搜索树（自平衡树）
class AVLTree extends BinarySearchTree {
    getNodeHeight(node) { //节点高度是从节点到其任意子节点的边的最大值
        /*
            3 h=3
           / \
      h=0 2   6 h=2
             / \
        h=1 5   7 h=0
           /
          4 h=0 
         */
        if (node == null) {
            return -1;
        }
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
    }
    getBalanceFactor(node) {
        //对每个节点计算左子树高度(hl)和右子树高度(hr)之间的差值，该值(hl - hr)应为0、1或-1。
        //如果结果不是这三个值之一，则需要平衡该树，这就是平衡因子的概念。
        const heightDiff = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDiff) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }
    rotationLL(node) { //左子树的左子树插入节点（LL）
        //向右单旋转 -- 右旋
        const tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }
    rotationRR(node) { //右子树的右子树插入节点（RR）
        //向左单旋转 -- 左旋
        const tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }
    rotationLR(node) { //左子树的右子树插入节点（LR）
        //1.对失衡节点的左子树进行左旋操作
        //2.对失衡节点进行右旋操作
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }
    rotationRL(node) { //右子树的左子树插入节点（RL）
        //1.对失衡节点的右子树进行右旋操作
        //2.对失衡节点进行左旋操作
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }
    insert(key) { //因为插入节点有可能会改变树的结构，所以平衡树的插入写法类似与搜索树的删除
        this.root = this.insertNode(this.root, key);
    }
    insertNode(node, key) {
        if (node == null) {
            return new BSTNode(key);
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) { //比父节点小，放到左侧子节点
            node.left = this.insertNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key);
        } else { //重复key
            return node;
        }
        //与二叉树不同的是插入后，还需要判断是否需要进行平衡调整
        const balanceFactor = this.getBalanceFactor(node);
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) { //LL
                return this.rotationLL(node);
            } else {
                return this.rotationLR(node);
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) { //RR
                return this.rotationRR(node);
            } else {
                return this.rotationRL(node);
            }
        }
    }
    removeNode(node, key) {
        node = super.removeNode(node, key); //复用BST的删除节点逻辑，然后扩展
        //检查树的平衡性
        const balanceFactor = this.getBalanceFactor(node);
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            const balanceFactorLeft = this.getBalanceFactor(node.left);
            if (balanceFactorLeft === BalanceFactor.BALANCED ||
                balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            ) { //等同于往左子树的左子树中添加节点
                return this.rotationLL(node);
            }
            if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                //等同于往左子树的右子树中添加节点
                return this.rotationLR(node);
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            const balanceFactorRight = this.getBalanceFactor(node.right);
            if (balanceFactorRight === BalanceFactor.BALANCED ||
                balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            ) {
                return this.rotationRR(node);
            }
            if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationRL(node);
            }
        }
        return node;
    }
}
export default AVLTree;
/*  左旋
        66
       /  \
      60  77
         /  \
        75  88
             \
             99

加入新节点99后，节点66的左子树高度为0，右子树高度为2，此时平衡因子为-2.
为保证树的平衡，此时需要对节点66做出旋转，因为右子树高度高于左子树，对节点进行左旋操作：
1）节点66的右子树77代替此节点位置
2）右子树77的左子树75变为节点66的右子树
3）节点66变成右子树77的左子树

          77
         /  \
        66  88
       / \   \
      60 75  99
 */

/*  右旋
        66
       /  \
      60  77
     /  \
    55  65
   /
  44

加入新节点44后，节点66的左子树高度为2，右子树高度为0，此时平衡因子为2.
为保证树的平衡，此时需要对节点66做出旋转，因为右子树高度小于左子树，对节点进行右旋操作：
1）节点66的左子树60代替此节点位置
2）左子树60的右子树65变为节点66的左子树
3）节点66变成左子树60的右子树

      60
     /  \
    55  66
   /   / \
  44  65 77
 */