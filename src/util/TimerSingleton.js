/**
 * @description 全局定时器管理
 * @author 黄建峰
 */
let instance = null;
export default class TimerSingleton {

    constructor() {
        if(!instance){
            instance = this;
            this.init();
        }
        return instance;
     }

    init() {
        this.timerMap = new Map();
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('hashchange', this.refresh, false);
    }

    startTimer(func, time = 10*1000, timeout = 5*60*1000) {
        const ctime   = Date.now();
        const href   = location.href;
        const timer  = setInterval(() => this._executeTask(func, { timer, time: ctime, href, timeout }), time);
        const timers = this.timerMap.get(location.href);
        if(timers) {
            timers.push({timer, time: Date.now()});
        } else {
            this.timerMap.set(location.href, [timer]);
        }
    }

    refresh() {
        if (!this.timerMap) {
            return false;
        }
        const href = location.href;
        for(let it of this.timerMap) {
            const key = it[0];
            const timers = it[1];
            if (key !== href) {
                if( timers && timers.length > 0 ) {
                    timers.forEach(timerObj => {
                        clearInterval(timerObj.timer);
                    });
                }
                this.timerMap.delete(key);
            }
        }
    }

    _delTimer(timer) {
        clearInterval(timer);
        for(let it of this.timerMap) {
            const key = it[0];
            const timers = it[1];
            const index = timers.indexOf(timer);
            if(index >= 0 ) {
                timers.splice(index, 1);
                if(timers.length === 0) {
                    this.timerMap.delete(key);
                }
                break;
            }
        }
    }

    clearTimer() {
        if (this.timerMap && this.timerMap.size > 0) {
            for (let timers of this.timerMap) {
                timers.forEach(timerObj => {
                    clearInterval(timerObj.timer);
                });
            }
            this.timerMap.clear();
        }
        window.removeEventListener('load', this.refresh, false);
        window.removeEventListener('hashchange', this.refresh, false);
    }

    _executeTask(func, { timer, time, href, timeout }) {
        if(location.href !== href) {
            this._delTimer(timer);
            return false;
        }
        if((Date.now() - time) >= timeout) {
            this._delTimer(timer);
            return false;
        }
        func().then(isFinish => {
            if(isFinish === true) {
                this._delTimer(timer);
                return false;
            }
        });
    }
}
