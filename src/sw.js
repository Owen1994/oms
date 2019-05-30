/* eslint-disable */
; (() => {
    //版本号
    const version = 'erp_yks_cache_v0.1.2';
    const __DEBUG__ = false;
    let port;
    //离线缓存内容
    const offlineFiles = [
        '/offline/offline.html',
        '/offline/images/default.png'
    ];

    //忽略缓存内容
    const ignoreCache = [
        /https?:\/\/hm.baidu.com\//,
        /api\/oms\/order\/export/,
        /\/$/,
        /\/(\?).*$/,
        /sockjs-node\//,
        /manifest\.json/,
    ];

    const log = __DEBUG__ ? console.log : () => {
    };

    const cacheKey = (...rest) => {
        return [version, ...rest].join(':');
    }


    // 不需要缓存的请求
    const shouldAlwaysFetch = (request) => {
        return request.method !== 'GET' ||
            ignoreCache.some(regex => request.url.match(regex));
    }

    // 缓存 html 页面
    const shouldFetchAndCache = (request) => {
        console.log(request)
        return (/text\/html/i).test(request.headers.get('accept'));
    }

    // 发送 Notification 通知
    const sendNotify = (title, options, event) => {
        log(title, options, event)
        if (Notification.permission !== 'granted') {
            // 无授权时，向来源页面申请授权
            if (port && port.postMessage) {
                port.postMessage({
                    type: 'applyNotify',
                    info: { title, options }
                });
            }

            return;
        }

        const notificationPromise = self.registration.showNotification(title || 'Hi：', Object.assign({
            body: '通知',
            icon: '/offline/images/default.png',
            tag: 'push'
        }, options));

        return event && event.waitUntil(notificationPromise);
    }

    const onClickNotify = (event) => {
        event.notification.close();
        const url = "//erp.youkeshu.com";

        event.waitUntil(
            self.clients.matchAll({
                type: "window"
            })
                .then(() => {
                    if (self.clients.openWindow) {
                        return self.clients.openWindow(url);
                    }
                })
        );
    }


    const onInstall = (event) => {
        event.waitUntil(
            caches.open(cacheKey('offline'))
                .then(cache => cache.addAll(offlineFiles))
                .then(() => log('installation complete! version: ' + version))
                .then(() => self.skipWaiting())
        );
    }


    // 当网络离线或请求发生了错误，使用离线资源替代 request 请求
    const offlineResponse = (request) => {
        log('(offline)', request.method, request.url);
        if (request.url.match(/\.(jpg|png|gif|svg|jpeg)(\?.*)?$/)) {
            return caches.match('/sw/images/default.png');
        } else {
            return caches.match('offline/offline.html');
        }
    }

    // 从缓存读取或使用离线资源替代
    const cachedOrOffline = (request) => {
        return caches
            .match(request)
            .then((response) => response || offlineResponse(request));
    }

    // 从网络请求，并将请求成功的资源缓存
    const networkedAndCache = (request) => {
        return fetch(request)
            .then(response => {
                const copy = response.clone();

                caches.open(cacheKey('online'))
                    .then(cache => {
                        cache.put(request, copy);
                    });

                log("(network: cache write)", request.method, request.url);
                return response;
            });
    }

    // 优先从 cache 读取，读取失败则从网络请求并缓存。网络请求也失败，则使用离线资源替代
    const cachedOrNetworked = (request) => {
        return caches.match(request)
            .then((response) => {
                log(response ? '(cached)' : '(network: cache miss)', request.method, request.url);
                return response ||
                    networkedAndCache(request)
                        .catch(() => offlineResponse(request));
            });
    }

    // 优先从网络请求，失败则使用离线资源替代
    const networkedOrOffline = (request) => {
        return fetch(request)
            .then(response => {
                log('(network)', request.method, request.url);
                return response;
            })
            .catch(() => offlineResponse(request));
    }

    const onFetch = (event) => {
        const request = event.request;
        // 应当永远从网络请求的资源
        // 如果请求失败，则使用离线资源替代
        if (shouldAlwaysFetch(request)) {
            log('AlwaysFetch request: ', event.request.url);
            event.respondWith(networkedOrOffline(request));
            return;
        }

        // 应当从网络请求并缓存的资源
        // 如果请求失败，则尝试从缓存读取，读取失败则使用离线资源替代
        /*if (shouldFetchAndCache(request)) {
            console.log(request)
            event.respondWith(
                networkedAndCache(request).catch(() => cachedOrOffline(request))
            );
            return;
        }*/

        event.respondWith(cachedOrNetworked(request));
    }


    const removeOldCache = () => {
        return caches
            .keys()
            .then(keys =>
                Promise.all( // 等待所有旧的资源都清理完成
                    keys
                        .filter(key => !key.startsWith(version)) // 过滤不需要删除的资源
                        .map(key => caches.delete(key)) // 删除旧版本资源，返回为 Promise 对象
                )
            )
            .then(() => {
                log('removeOldCache completed.');
            });
    }

    const onActivate = (event) => {
        log('activate event in progress.');
        event.waitUntil(Promise.all([
            // 更新客户端
            self.clients.claim(),
            removeOldCache()
        ]))
    }

    const onPush = (event) => {
        log('onPush ', event);
        sendNotify('Hi:', {
            body: `【${new Date()}】发生了一次 Push 同步事件 ~`
        }, event);
    }


    const onSync = (event) => {
        log('onSync', event);
        sendNotify('Hi:', {
            body: `【${new Date()}】发生了一次 Sync 同步事件 ~`
        }, event);
    }

    const onMessage = (event) => {
        log('onMessage', event);

        if (event.ports) {
            port = event.ports[0];
        }

        if (!event.data) {
            return;
        }

        // 如果是要求一条通知，则发送
        if (event.data.type === 'notify') {
            const { title, options } = event.data.info || {};
            sendNotify(title, options, event);
        }
    }

    log("Hello from ServiceWorker land!", version);

    self.addEventListener('install', onInstall);
    self.addEventListener('fetch', onFetch);
    self.addEventListener("activate", onActivate);
    self.addEventListener("push", onPush);
    self.addEventListener("sync", onSync);
    self.addEventListener('message', onMessage);
    self.addEventListener("notificationclick", onClickNotify);

})();
