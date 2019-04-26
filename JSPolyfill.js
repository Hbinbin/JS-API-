/**
 *
 */
Object.prototype.bind=function(context, ...args1){
    // 非function对象调用，扔出一个错误
    if (typeof this !== 'function') throw new Error('Not a function!')
    const FnBound = (...args2) => {
        const allArgs = [...args1, ...args2]
        // 判断fBound是否被当做构造函数调用，如果是会忽略传入的context
        return this.apply(this instanceof FnBound ? this : context, allArgs)
    }
    // 通过设置一个中转构造函数FnNOP，使绑定后的函数与调用bind()的函数处于同一原型链上
    const FnNOP = function() {}
    this.prototype && (FnNOP.prototype = this.prototype)
    FnBound.prototype = new FnNOP()
    return FnBound
}