function hashCodes(pathname) {
    var h = 0;
    var len = pathname.length;
    var t = 2147483648;
    for (var i = 0; i < len; i++) {
        h = 31 * h + pathname.charCodeAt(i);
        if (h > 2147483647) h %= t; //java int溢出则取模
    }
    return h;
}

export const setPageCache = (data, key) => {
    const pathname = key || location.pathname;
    return new Promise((resolve, reject) => {
        if (!data) {
            return resolve(false);
        }
        const hashCode = hashCodes(pathname);
        const pageStr = sessionStorage.getItem("globalErpPageCache");
        let obj = {}
        if (pageStr) {
            obj = JSON.parse(pageStr);
        }
        obj[hashCode] = data;
        sessionStorage.setItem("globalErpPageCache", JSON.stringify(obj));
        return resolve(true);
    });
}

export const getPageCache = (key) => {
    const pathname = key || location.pathname;
    return new Promise((resolve, reject) => {
        const hashCode = hashCodes(pathname);
        const pageStr = sessionStorage.getItem("globalErpPageCache");
        if (pageStr) {
            let obj = JSON.parse(pageStr);
            return resolve(obj[hashCode]);
        }
        return resolve(undefined);
    });
}

export const delPageCache = (pathname) => {
    pathname = pathname || location.pathname;
    return new Promise((resolve, reject) => {
        const hashCode = hashCodes(pathname);
        const pageStr = sessionStorage.getItem("globalErpPageCache");
        if (pageStr) {
            let obj = JSON.parse(pageStr);
            if (obj[hashCode]) {
                delete obj[hashCode]
                sessionStorage.setItem("globalErpPageCache", JSON.stringify(obj));

            }
            resolve(true);
        }
        return resolve(undefined);
    });
}
