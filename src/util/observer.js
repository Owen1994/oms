
const observer = (function () {
    let __store = "__store";
    if(Symbol){
        __store = Symbol(__store);
    }
    function Observer() {}
    // 存储仓库
    Observer.prototype[__store] = {}
    Observer.prototype.emit = function (type, playload, context) {
        let result = [],temp;
        if (!this[__store][type]) return result;
        if (context) {
            this[__store][type].forEach((v, k) => {
                result.push(v.call(context, playload))
            })
        } else {
            this[__store][type].forEach((v, k) => {
                result.push(v(playload))
            })
        }
        temp = result ;
        result = []
        return temp;
    }
    // 重复触发事件注册
    Observer.prototype.on = function (type, callback) {
        if (!this[__store][type]) {
            this[__store][type] = [callback];
        } else {
            this[__store][type].push(callback)
        }
    }
    // 移除事件
    Observer.prototype.remove = function (type, fn) {
        if (!type || !this[__store][type]) return;
        if (fn && typeof fn === "function") {
            this[__store][type] = this[__store][type].filter(v => v !== fn)
        } else {
            this[__store][type] = []
        }
    }
    // 单次触发事件注册
    Observer.prototype.once = function (type, callback) {
        if (!type) return;
        var _this = this;
        var anonym = function () {
            var fn = function (playload, context) {
                if (context) {
                    callback.call(context, playload)
                } else {
                    callback(playload)
                }
                _this.remove(type, fn)
            }
            return fn
        }();
        if (!this[__store][type]) {
            this[__store][type] = [anonym]
        } else {
            this[__store][type].push(anonym)
        }
    }
    return new Observer()
}());

export default observer