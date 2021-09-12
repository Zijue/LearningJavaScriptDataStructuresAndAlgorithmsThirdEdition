export function defaultEquals(a, b) {
    return a === b;
}
// 声明一个compare方法，用于对比节点元素的大小比较
export const Compare = {
    // 相当于ts中的枚举类
    LESS_THAN: -1,
    BIGGER_THAN: 1
}
export function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}