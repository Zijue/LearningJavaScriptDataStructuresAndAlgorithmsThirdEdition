class Set {
    constructor() {
        this.items = {}; // 使用对象左右自定义Set的底层数据结构
    }
    add(element) { // 向集合添加一个新元素
        if (!this.has(element)) {
            this.items[element] = element;
            return true;
        }
        return false;
    }
    delete(element) { // 从集合移除一个元素
        if (this.has(element)) {
            delete this.items[element];
            return true;
        }
        return false;
    }
    has(element) { // 如果元素在集合中，返回true，否则返回false
        // 使用下面的方式判断一个对象是否具有特定属性的布尔值是一种优雅的做法，
        // in 运算符则返回表示对象在原型链上是否有特定属性的布尔值
        return Object.prototype.hasOwnProperty.call(this.items, element);
    }
    clear() { // 移除集合中的所有元素
        this.items = {};
    }
    size() { // 返回集合所包含元素的数量
        return Object.keys(this.items).length;
    }
    values() { // 返回一个包含集合中所有元素的数组
        return Object.values(this.items);
    }
    union(otherSet) { // 并集 A | B
        const unionSet = new Set(); // 所求的并集应该是一个新的set
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }
    intersection(otherSet) { // 交集 A & B
        const intersectionSet = new Set();
        const values = this.values();
        const otherValues = otherSet.values();
        let biggerSet = values;
        let smallerSet = otherValues;
        if (otherValues.length > values.length) {
            biggerSet = otherValues;
            smallerSet = values;
        }
        smallerSet.forEach(value => {
            if (biggerSet.includes(value)) {
                intersectionSet.add(value)
            }
        });
        return intersectionSet;
    }
    difference(otherSet) { // 差集 A - B
        const differenceSet = new Set();
        this.values().forEach(value => {
            if (!otherSet.has(value)) {
                differenceSet.add(value);
            }
        });
        return differenceSet;
    }
    isSubsetOf(otherSet) { // 是否为otherSet的子集
        if (this.size() > otherSet.size()) {
            return false;
        }
        let isSubset = true;
        this.values().every(value => {
            if (!otherSet.has(value)) {
                isSubset = false;
                return false;
            }
            return true;
        });
        return isSubset;
    }
}
export default Set;