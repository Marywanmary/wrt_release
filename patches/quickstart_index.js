var Ve = Object.defineProperty,
Ge = Object.defineProperties;
var je = Object.getOwnPropertyDescriptors;
var _e = Object.getOwnPropertySymbols;
var Re = Object.prototype.hasOwnProperty,
Ue = Object.prototype.propertyIsEnumerable;
var Qt = (o, a, n) => a in  o ? Ve(o, a, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : o[a] = n,
X = (o, a) => {
    for (var n in  a || (a = {})) Re.call(a, n) && Qt(o, n, a[n]);
    if (_e) for (var n of _e(a)) Ue.call(a, n) && Qt(o, n, a[n]);
    return o
},
nt = (o, a) => Ge(o, je(a));
var He = (o, a) => () => (a || o((a = {
    exports: {}
}).exports, a), a.exports);
var Tt = (o, a, n) => (Qt(o, typeof a != "symbol" ? a + "" : a, n), n);
var M = (o, a, n) => new Promise((l, d) => {
    var r = _ => {
        try {
            x(n.next(_))
        } catch(b) {
            d(b)
        }
    },
    p = _ => {
        try {
            x(n.
            throw (_))
        } catch(b) {
            d(b)
        }
    },
    x = _ => _.done ? l(_.value) : Promise.resolve(_.value).then(r, p);
    x((n = n.apply(o, a)).next())
});
import {
    a as We,
    c as Ze,
    d as Ot,
    b as I,
    e as U,
    u as e,
    o as s,
    f as u,
    g as t,
    t as i,
    n as Yt,
    h as D,
    i as A,
    r as K,
    j as rt,
    k as wt,
    w as L,
    v as Ct,
    l as Je,
    m as V,
    p as G,
    q as E,
    s as Xe,
    x as _t,
    y as tt,
    F as N,
    z as R,
    A as H,
    B as $t,
    C as W,
    D as Z,
    E as Ke,
    G as St,
    H as Qe,
    I as ta,
    J as ea,
    K as aa,
    L as oa,
    M as na,
    N as ia,
    O as st,
    T as ft,
    P as et,
    Q as ra,
    R as dt,
    S as bt,
    U as at,
    V as lt,
    W as Nt,
    X as ae,
    Y as sa,
    Z as da,
    _ as Ut,
    $ as ua,
    a0 as la,
    a1 as ca,
    a2 as pa
}
from "./vendor.js?v=db9353c3";
var Wy = He(At => {
    const ma = function() {
        const a = document.createElement("link").relList;
        if (a && a.supports && a.supports("modulepreload")) return;
        for (const d of document.querySelectorAll('link[rel="modulepreload"]')) l(d);
        new MutationObserver(d => {
            for (const r of d) if (r.type === "childList") for (const p of r.addedNodes) p.tagName === "LINK" && p.rel === "modulepreload" && l(p)
        }).observe(document, {
            childList: !0,
            subtree: !0
        });
        function n(d) {
            const r = {};
            return d.integrity && (r.integrity = d.integrity),
            d.referrerpolicy && (r.referrerPolicy = d.referrerpolicy),
            d.crossorigin === "use-credentials" ? r.credentials = "include" : d.crossorigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin",
            r
        }
        function l(d) {
            if (d.ep) return;
            d.ep = !0;
            const r = n(d);
            fetch(d.href, r)
        }
    };
    ma();
    const vt = {
        language: void 0,
        numberFormat: new Intl.NumberFormat("en", {
            notation: "compact"
        })
    },
    fa = o => M(At, null, function * () {
        const a = window.vue_lang;
        new Date().getTime();
        let n = {};
        try {
            const r = yield We({
                url: window.vue_lang_data,
                method: "GET"
            });
            r.data && (n = r.data)
        } catch(r) {
            console.log(r)
        }
        const l = Ze({
            defaultLanguage: a,
            mutedLanguages: ["zh-cn"],
            translations: n,
            setGlobalProperties: !1,
            provideDirective: !1,
            provideComponent: !1
        });
        o.use(l),
        vt.language = l;
        const {
            $gettext: d
        } = l;
        window.$i18n = d;
        try {
            vt.numberFormat = new Intl.NumberFormat(a, {
                notation: "compact"
            })
        } catch(r) {
            console.error("Intl.NumberFormat unsupported lang", a, r)
        }
    }),
    q = () => {
        if (vt.language) return vt.language;
        throw new Error("I18N Uninitialized!")
    },
    Ht = () => ({
        $gettext: (o, a, n) => {
            if (vt.language) return vt.language.$gettext(o, a, n);
            throw new Error("I18N Uninitialized!")
        },
        $ngettext: (o, a, n, l, d) => {
            if (vt.language) return vt.language.$ngettext(o, a, n, l, d);
            throw new Error("I18N Uninitialized!")
        }
    }),
    Vt = o => typeof o == "number" ? vt.numberFormat.format(o) : "?",
    {
        $gettext: va,
        $ngettext: Xy
    } = Ht(),
    ba = (o, a) => M(At, null, function * () {
        return new Promise((n, l) => M(At, null, function * () {
            try {
                const d = yield fetch(o, a);
                if (Math.floor(d.status / 100) != 2) throw d.status + " " + d.statusText;
                const r = X({},
                d);
                r.data = yield d.json(),
                n(r)
            } catch(d) {
                const r = d;
                l(va("\u7F51\u7EDC\u5F02\u5E38\uFF1A") + ((r == null ? void 0 : r.message) || d))
            }
        }))
    });
    class oe {
        constructor(a) {
            Tt(this, "config", {
                baseURL: "",
                headers: {}
            });
            Tt(this, "useRequest", a => a);
            Tt(this, "useResponse", a => a);
            Tt(this, "useError", a => a);
            a.baseURL && (this.config.baseURL = a.baseURL),
            a.headers && (this.config.headers = a.headers)
        }
        static create(a) {
            return new oe(a)
        }
        Do(a, n) {
            return M(this, null, function * () {
                return new Promise((l, d) => M(this, null, function * () {
                    try {
                        const r = this.useRequest({
                            baseURL: this.config.baseURL,
                            headers: this.config.headers
                        });
                        a = `$ {
                            r.baseURL || ""
                        }
                        $ {
                            a
                        }`,
                        n.headers == null && (n.headers = {}),
                        r.headers && (n.headers = X({},
                        r.headers));
                        const x = yield fetch(a, n),
                        _ = X({},
                        x);
                        _.data = yield x.json(),
                        l(this.useResponse(_))
                    } catch(r) {
                        this.useError(r),
                        d(r)
                    }
                }))
            })
        }
        TEXT(a, n) {
            return M(this, null, function * () {
                return new Promise((l, d) => M(this, null, function * () {
                    try {
                        const r = this.useRequest({
                            baseURL: this.config.baseURL,
                            headers: this.config.headers
                        });
                        a = `$ {
                            r.baseURL || ""
                        }
                        $ {
                            a
                        }`,
                        n.headers == null && (n.headers = {}),
                        r.headers && (n.headers = X({},
                        r.headers));
                        const x = yield fetch(a, n),
                        _ = X({},
                        x);
                        _.data = yield x.text(),
                        l(_)
                    } catch(r) {
                        this.useError(r),
                        d(r)
                    }
                }))
            })
        }
        interceptors() {
            const a = this;
            return {
                requset: {
                    use(n) {
                        a.useRequest = n
                    }
                },
                response: {
                    use(n, l) {
                        a.useResponse = n,
                        l && (a.useError = l)
                    }
                }
            }
        }
    }
    const Ce = oe.create({});
    Ce.interceptors().requset.use(o => o);
    Ce.interceptors().response.use(o => (o.data && o.data.success == null && o.data.success == 0, o));
    const {
        $gettext: ga,
        $ngettext: Ky
    } = Ht(),
    _a = "/cgi-bin/luci/istore";
    let he = !1;
    const O = (o, a) => (o.indexOf("//") == -1 && (o = `$ {
        _a
    }
    $ {
        o
    }`), ba(o, a).then(n => (n != null && n.data && n.data.success == -1001 && n.data.error == "Forbidden" && (he || (he = !0, alert(ga("\u767B\u5F55\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55")), location.reload())), n))),
    ha = {
        Statistics: {
            GET() {
                return O("/u/network/statistics/", {
                    method: "GET"
                })
            }
        },
        Status: {
            GET() {
                return O("/u/network/status/", {
                    method: "GET"
                })
            }
        },
        Device: {
            List: {
                GET() {
                    return O("/network/device/list/", {
                        method: "GET"
                    })
                }
            }
        },
        Homebox: {
            Enable: {
                POST() {
                    return O("/network/homebox/enable/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        }
                    })
                }
            }
        },
        CheckPublickNet: {
            POST(o) {
                return O("/network/checkPublicNet/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        GetInterfaceConfig: {
            GET() {
                return O("/network/interface/config/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                })
            }
        },
        POSTInterfaceConfig: {
            POST(o) {
                return O("/network/interface/config/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        PortList: {
            GET() {
                return O("/network/port/list/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                })
            }
        }
    },
    xa = {
        Version: {
            GET() {
                return O("/u/system/version/", {
                    method: "GET"
                })
            }
        },
        CheckUpdate: {
            GET() {
                return O("/system/check-update/", {
                    method: "GET"
                })
            }
        },
        Reboot: {
            POST(o) {
                return O("/system/reboot/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        Status: {
            GET() {
                return O("/system/status/", {
                    method: "GET"
                })
            }
        }
    },
    ka = {
        Disk: {
            Status: {
                GET() {
                    return O("/nas/disk/status/", {
                        method: "GET"
                    })
                }
            },
            Erase: {
                POST(o) {
                    return O("/nas/disk/erase", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify(o)
                    })
                }
            },
            Init: {
                POST: o => O("/nas/disk/init/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            },
            InitRest: {
                POST: o => O("/nas/disk/initrest/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            },
            Partition: {
                Format: {
                    POST: o => O("/nas/disk/partition/format", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify(o)
                    })
                },
                Mount: {
                    POST: o => O("/nas/disk/partition/mount", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify(o)
                    })
                }
            }
        },
        Service: {
            Status: {
                GET() {
                    return O("/u/nas/service/status/", {
                        method: "GET"
                    })
                }
            }
        },
        Samba: {
            Create: {
                POST(o) {
                    return O("/nas/samba/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify(o)
                    })
                }
            }
        },
        Webdav: {
            Create: {
                POST(o) {
                    return O("/nas/webdav/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify(o)
                    })
                }
            },
            Status: {
                GET() {
                    return O("/nas/webdav/status/", {
                        method: "GET"
                    })
                }
            }
        },
        Linkease: {
            Enable: {
                POST() {
                    return O("/u/nas/linkease/enable", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        }
                    })
                }
            }
        },
        Sandbox: {
            POST(o) {
                return O("/nas/sandbox/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        GetSandbox: {
            GET() {
                return O("/nas/sandbox/", {
                    method: "GET"
                })
            }
        },
        SandboxDisks: {
            GET() {
                return O("/nas/sandbox/disks/", {
                    method: "GET"
                })
            }
        },
        SandboxCommit: {
            POST() {
                return O("/u/nas/sandbox/commit/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify({})
                })
            }
        },
        SandboxReset: {
            POST() {
                return O("/nas/sandbox/reset/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                })
            }
        },
        SandboxExit: {
            POST() {
                return O("/nas/sandbox/exit/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                })
            }
        }
    },
    wa = {
        Check: {
            POST(o) {
                return O("/app/check/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        Install: {
            POST(o) {
                return O("/app/install/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        }
    },
    ya = {
        Pppoe: {
            GET() {
                return O("/guide/pppoe/", {
                    method: "GET"
                })
            },
            POST(o) {
                return O("/guide/pppoe/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        DnsConfig: {
            GET() {
                return O("/guide/dns-config/", {
                    method: "GET"
                })
            },
            POST(o) {
                return O("/guide/dns-config/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        DhcpClient: {
            POST(o) {
                return O("/guide/dhcp-client/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        ClientModel: {
            GET() {
                return O("/guide/client-mode/", {
                    method: "GET"
                })
            },
            POST(o) {
                return O("/guide/client-mode/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        GatewayRouter: {
            POST(o) {
                return O("/guide/gateway-router/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        DockerStatus: {
            GET() {
                return O("/guide/docker/status/", {
                    method: "GET"
                })
            }
        },
        DockerPartitionList: {
            GET() {
                return O("/guide/docker/partition/list/", {
                    method: "GET"
                })
            }
        },
        DockerTransfer: {
            POST(o) {
                return O("/guide/docker/transfer/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        DockerSwitch: {
            POST(o) {
                return O("/guide/docker/switch/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        DownloadService: {
            Status: {
                GET() {
                    return O("/guide/download-service/status/", {
                        method: "GET"
                    })
                }
            }
        },
        DownloadPartition: {
            List: {
                GET() {
                    return O("/guide/download/partition/list/", {
                        method: "GET"
                    })
                }
            }
        },
        Aria2Init: {
            POST(o) {
                return O("/guide/aria2/init/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        qbitorrentInit: {
            POST(o) {
                return O("/guide/qbittorrent/init/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        transmissionInit: {
            POST(o) {
                return O("/guide/transmission/init/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        GetLan: {
            GET() {
                return O("/guide/lan/", {
                    method: "GET"
                })
            }
        },
        LanIp: {
            POST(o) {
                return O("/guide/lan/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        SoftSource: {
            POST(o) {
                return O("/guide/soft-source/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        GetSoftSource: {
            GET() {
                return O("/guide/soft-source/", {
                    method: "GET"
                })
            }
        },
        SoftSourceList: {
            GET() {
                return O("/guide/soft-source/list/", {
                    method: "GET"
                })
            }
        },
        PostDdns: {
            POST(o) {
                return O("/u/guide/ddns/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        GetDdns: {
            GET() {
                return O("/u/guide/ddns/", {
                    method: "GET"
                })
            }
        },
        Ddnsto: {
            POST(o) {
                return O("/guide/ddnsto/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        DdntoConfig: {
            GET() {
                return O("/guide/ddnsto/config/", {
                    method: "GET"
                })
            }
        },
        DdnstoAddress: {
            POST(o) {
                return O("/guide/ddnsto/address/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        }
    },
    Fa = {
        Create: {
            POST(o) {
                return O("/raid/create/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        Delete: {
            POST(o) {
                return O("/raid/delete/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        Add: {
            POST(o) {
                return O("/raid/add/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        Remove: {
            POST(o) {
                return O("/raid/remove/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        Recover: {
            POST(o) {
                return O("/raid/recover/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        Detail: {
            POST(o) {
                return O("/raid/detail/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        List: {
            GET() {
                return O("/raid/list/", {
                    method: "GET"
                })
            }
        },
        CreateList: {
            GET() {
                return O("/raid/create/list/", {
                    method: "GET"
                })
            }
        },
        Autofix: {
            GET() {
                return O("/raid/autofix/", {
                    method: "GET"
                })
            }
        }
    },
    Ea = {
        Log: {
            GET() {
                return O("/smart/log/", {
                    method: "GET"
                })
            }
        },
        List: {
            GET() {
                return O("/u/smart/list/", {
                    method: "GET"
                })
            }
        },
        Config: {
            GET() {
                return O("/smart/config/", {
                    method: "GET"
                })
            },
            POST(o) {
                return O("/smart/config/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            }
        },
        Test: {
            POST(o) {
                return O("/u/smart/test/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(o)
                })
            },
            Result: {
                POST(o) {
                    return O("/smart/test/result/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify(o)
                    })
                }
            }
        },
        Attribute: {
            Result: {
                POST(o) {
                    return O("/smart/attribute/result/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify(o)
                    })
                }
            }
        },
        Extend: {
            Result: {
                POST(o) {
                    return O("/smart/extend/result/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify(o)
                    })
                }
            }
        }
    };
    var Ca = Object.freeze(Object.defineProperty({
        __proto__: null,
        Network: ha,
        System: xa,
        Nas: ka,
        App: wa,
        Guide: ya,
        Raid: Fa,
        Smart: Ea
    },
    Symbol.toStringTag, {
        value: "Module"
    })),
    P = X({},
    Ca);
    const $e = Ot("app", {
        state: () => ({
            portitemStyle: {
                show: !1,
                left: 0,
                top: 0,
                portitem: {
                    name: "",
                    macAddress: "",
                    linkSpeed: "",
                    linkState: "",
                    rx_packets: "",
                    tx_packets: "",
                    interfaceNames: [],
                    master: "",
                    duplex: ""
                }
            }
        })
    });
    Ot("guide", {});
    const De = Ot("nas", {
        state: () => ({
            webdav: {}
        })
    }),
    Wt = Ot("network", {
        state: () => ({
            status: {},
            deviceList: {}
        }),
        getters: {},
        actions: {
            updateNetworkStatus(o) {
                this.status = o
            },
            requestDeviceList() {
                P.Network.Device.List.GET().then(o => {
                    if (o != null && o.data) {
                        const {
                            result: a
                        } = o == null ? void 0 : o.data;
                        a && (this.deviceList = a)
                    }
                })
            },
            incrTime() {
                this.status.uptimeStamp && this.status.uptimeStamp++
            }
        }
    }),
    ne = Ot("system", {
        state: () => ({
            version: {},
            checkUpdate: null,
            systemStatus: {}
        }),
        getters: {},
        actions: {
            incrTime() {
                var o;
                (o = this.systemStatus) != null && o.uptime && this.systemStatus.uptime++
            },
            requestVersion() {
                P.System.Version.GET().then(o => {
                    var a;
                    (a = o == null ? void 0 : o.data) != null && a.result && (this.version = o.data.result)
                })
            },
            requestCheckUpdate() {
                P.System.CheckUpdate.GET().then(o => {
                    var a;
                    (a = o == null ? void 0 : o.data) != null && a.result && (this.checkUpdate = o.data.result)
                })
            },
            updateSystemStatus(o) {
                this.systemStatus = o
            }
        }
    });
    let xe = !1;
    const $a = () => {
        if (xe) return;
        xe = !0;
        let o = !0,
        a = !0;
        const n = Wt(),
        l = ne(),
        d = function() {
            return (!o && document.hidden ? Promise.resolve() : P.System.Status.GET().then(p => {
                p != null && p.data.result && l.updateSystemStatus(p.data.result)
            })).
            finally(() => {
                setTimeout(d, 5e3),
                o && (setInterval(() => {
                    l.incrTime()
                },
                1e3), o = !1)
            })
        },
        r = function() {
            return (!a && document.hidden ? Promise.resolve() : P.Network.Status.GET().then(p => {
                if (p != null && p.data) {
                    const {
                        result: x
                    } = p == null ? void 0 : p.data;
                    x && n.updateNetworkStatus(x)
                }
            })).
            finally(() => {
                setTimeout(r, 5e3),
                a && (setInterval(() => {
                    n.incrTime()
                },
                1e3), a = !1)
            })
        };
        r(),
        n.requestDeviceList(),
        setTimeout(() => {
            l.requestCheckUpdate(),
            l.requestVersion(),
            d()
        },
        1100)
    };
    var S = (o, a) => {
        const n = o.__vccOpts || o;
        for (const[l, d] of a) n[l] = d;
        return n
    };
    const Da = I({
        setup(o) {
            const {
                $gettext: a,
                $ngettext: n
            } = q(),
            l = $e(),
            d = U(() => l.portitemStyle.portitem),
            r = U(() => l.portitemStyle.show),
            p = U(() => ({
                bottom: `calc(100 %  -  $ {
                    l.portitemStyle.top
                }
                px)`,
                left: `$ {
                    l.portitemStyle.left
                }
                px`
            })),
            x = m => {
                switch (m) {
                case "full":
                    return a("\u5168\u53CC\u5DE5");
                case "half":
                    return a("\u534A\u53CC\u5DE5")
                }
            },
            _ = m => {
                l.portitemStyle.show = !0
            },
            b = m => {
                l.portitemStyle.show = !1
            };
            return (m, c) => e(r) ? (s(), u("div", {
                key: 0,
                class: "disk-item-tooltip",
                style: Yt(e(p)),
                onMouseenter: _,
                onMouseleave: b
            },
            [t("div", null, i(x(e(d).duplex)), 1), t("div", null, i(e(a)("\u540D\u79F0\uFF1A")) + i(e(d).name || "--"), 1), t("div", null, i(e(a)("MAC\uFF1A")) + i(e(d).macAddress || "--"), 1), t("div", null, i(e(a)("\u63A5\u6536\uFF1A")) + i(e(d).rx_packets || "--"), 1), t("div", null, i(e(a)("\u53D1\u9001\uFF1A")) + i(e(d).tx_packets || "--"), 1)], 36)) : D("", !0)
        }
    });
    var Ba = S(Da, [["__scopeId", "data-v-0698ba82"]]);
    const Ya = {
        id: "main"
    },
    Aa = I({
        setup(o) {
            return (a, n) => {
                const l = K("router-view");
                return s(),
                u("div", Ya, [A(l), A(Ba)])
            }
        }
    });
    var Sa = S(Aa, [["__scopeId", "data-v-9bc295c2"]]);
    const za = {},
    Pa = {
        t: "1640593669834",
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "54870",
        width: "128",
        height: "128"
    },
    Ta = t("path", {
        d: "M148.7872 57.4464h177.152c64.9216 0 118.0672 53.1456 118.0672 118.0672v295.2192H148.7872C83.8656 470.7328 30.72 417.5872 30.72 352.5632v-177.152C30.72 110.592 83.8656 57.4464 148.7872 57.4464z m0 531.3536h295.2192v295.2192c0 64.9216-53.1456 118.0672-118.0672 118.0672h-177.152C83.8656 1001.984 30.72 948.9408 30.72 883.9168v-177.152C30.72 641.9456 83.8656 588.8 148.7872 588.8z m0 0M768.7168 559.2064L562.0736 346.7264c-23.6544-17.7152-35.4304-53.1456-35.4304-82.6368s11.776-59.0848 35.4304-82.6368L686.08 57.4464C733.2864 10.24 810.0864 10.24 851.3536 57.4464l124.0064 124.0064c23.6544 23.6544 35.4304 53.1456 35.4304 82.6368s-11.776 59.0848-35.4304 82.6368L768.7168 559.2064z m0-478.208c-17.7152 0-29.4912 5.9392-41.3696 17.7152l-123.904 124.0064c-11.776 11.776-17.7152 23.6544-17.7152 41.3696s5.9392 29.4912 17.7152 41.3696l165.2736 165.2736 165.2736-165.2736c11.776-11.776 17.7152-23.6544 17.7152-41.3696s-5.9392-29.4912-17.7152-41.3696L809.984 98.7136c-11.776-11.776-23.552-17.7152-41.2672-17.7152z m0 0",
        "p-id": "54871"
    },
    null, -1),
    La = t("path", {
        d: "M562.0736 588.8h295.2192c64.9216 0 118.0672 53.1456 118.0672 118.0672v177.152c0 64.9216-53.1456 118.0672-118.0672 118.0672h-177.152c-64.9216 0-118.0672-53.1456-118.0672-118.0672V588.8z m0 0",
        "p-id": "54872"
    },
    null, -1),
    Ia = [Ta, La];
    function Ma(o, a) {
        return s(),
        u("svg", Pa, Ia)
    }
    var Oa = S(za, [["render", Ma]]);
    const Na = {},
    qa = {
        t: "1640598743438",
        class: "icon",
        viewBox: "0 0 1036 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "65341",
        width: "128",
        height: "128"
    },
    Va = t("path", {
        d: "M984.177778 432.355556l-45.511111 0c-22.755556 0-45.511111-17.066667-51.2-39.822222l-28.444444-68.266667C847.644444 312.888889 853.333333 284.444444 870.4 267.377778l34.133333-34.133333c17.066667-17.066667 17.066667-39.822222 0-56.888889l-56.888889-56.888889c-17.066667-17.066667-39.822222-17.066667-56.888889 0l-34.133333 34.133333C739.555556 170.666667 711.111111 176.355556 694.044444 164.977778L625.777778 136.533333c-22.755556-5.688889-39.822222-28.444444-39.822222-51.2L585.955556 39.822222c0-22.755556-17.066667-39.822222-39.822222-39.822222L472.177778 0C449.422222 0 432.355556 17.066667 432.355556 39.822222l0 45.511111c0 22.755556-17.066667 45.511111-39.822222 51.2L329.955556 164.977778C312.888889 176.355556 284.444444 170.666667 267.377778 153.6L233.244444 119.466667c-17.066667-17.066667-39.822222-17.066667-56.888889 0l-56.888889 56.888889c-17.066667 17.066667-17.066667 39.822222 0 56.888889l34.133333 34.133333C170.666667 284.444444 176.355556 312.888889 164.977778 329.955556L136.533333 398.222222C130.844444 415.288889 108.088889 432.355556 85.333333 432.355556l-45.511111 0C17.066667 432.355556 0 449.422222 0 472.177778l0 79.644444c0 22.755556 17.066667 39.822222 39.822222 39.822222l45.511111 0c22.755556 0 45.511111 17.066667 51.2 39.822222l28.444444 68.266667C176.355556 711.111111 170.666667 739.555556 153.6 756.622222l-34.133333 34.133333c-17.066667 17.066667-17.066667 39.822222 0 56.888889l56.888889 56.888889c17.066667 17.066667 39.822222 17.066667 56.888889 0l34.133333-34.133333C284.444444 853.333333 312.888889 847.644444 329.955556 859.022222L398.222222 887.466667c22.755556 5.688889 39.822222 28.444444 39.822222 51.2l0 45.511111c0 22.755556 17.066667 39.822222 39.822222 39.822222l79.644444 0c22.755556 0 39.822222-17.066667 39.822222-39.822222l0-45.511111c0-22.755556 17.066667-45.511111 39.822222-51.2l68.266667-28.444444c17.066667-11.377778 45.511111-5.688889 62.577778 11.377778l34.133333 34.133333c17.066667 17.066667 39.822222 17.066667 56.888889 0l56.888889-56.888889c17.066667-17.066667 17.066667-39.822222 0-56.888889l-34.133333-34.133333c-17.066667-17.066667-17.066667-45.511111-11.377778-62.577778l28.444444-68.266667c5.688889-22.755556 28.444444-39.822222 51.2-39.822222l45.511111 0c22.755556 0 39.822222-17.066667 39.822222-39.822222L1035.377778 472.177778C1024 449.422222 1006.933333 432.355556 984.177778 432.355556L984.177778 432.355556zM711.111111 512c0 108.088889-91.022222 199.111111-199.111111 199.111111-108.088889 0-199.111111-85.333333-199.111111-199.111111 0-108.088889 85.333333-199.111111 199.111111-199.111111C620.088889 312.888889 711.111111 403.911111 711.111111 512L711.111111 512zM711.111111 512",
        "p-id": "65342"
    },
    null, -1),
    Ga = [Va];
    function ja(o, a) {
        return s(),
        u("svg", qa, Ga)
    }
    var Ra = S(Na, [["render", ja]]);
    const Ua = {},
    Ha = {
        t: "1640599890701",
        class: "icon",
        viewBox: "0 0 1565 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "76947",
        width: "128",
        height: "128"
    },
    Wa = t("path", {
        d: "M1206.477959 299.331595c-27.357038 0-53.867311 3.354494-79.465683 9.151581C1078.518669 130.792698 916.428217 0 723.365689 0 492.068443 0 304.575027 187.493416 304.575027 418.790662c0 16.055976 1.074741 31.786273 2.865975 47.386299-9.184149-0.911901-18.400865-1.40042-27.812989-1.40042C125.191018 464.743973 0 589.934991 0 744.371987c0 154.469563 125.191018 279.628013 279.595446 279.628013 59.990077 0 221.233764 0 394.527575 0l0-302.295274L496.986197 721.704726l285.457668-339.031868 285.457668 339.031868-177.136823 0 0 302.295274c139.748871 0 262.204185 0 315.71325 0 197.947713 0 358.40977-168.34349 358.40977-366.291203S1404.425673 299.331595 1206.477959 299.331595z",
        "p-id": "76948"
    },
    null, -1),
    Za = [Wa];
    function Ja(o, a) {
        return s(),
        u("svg", Ha, Za)
    }
    var Xa = S(Ua, [["render", Ja]]);
    const Ka = {},
    Qa = {
        t: "1640599792937",
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "68605",
        width: "128",
        height: "128"
    },
    to = t("path", {
        d: "M512 825.6c-211.2 0-377.6-57.6-377.6-128l0 0L134.4 896l0 0c6.4 70.4 172.8 128 377.6 128 204.8 0 371.2-57.6 377.6-128l0 0 0-204.8 0 0C889.6 768 723.2 825.6 512 825.6L512 825.6z",
        "p-id": "68606"
    },
    null, -1),
    eo = t("path", {
        d: "M512 544c-211.2 0-377.6-57.6-377.6-128l0 0 0 204.8 0 0c6.4 70.4 172.8 128 377.6 128 204.8 0 371.2-57.6 377.6-128l0 0L889.6 416l0 0C889.6 486.4 723.2 544 512 544L512 544z",
        "p-id": "68607"
    },
    null, -1),
    ao = t("path", {
        d: "M889.6 128 889.6 128c0-70.4-166.4-128-377.6-128C300.8 0 134.4 57.6 134.4 128l0 0 0 0 0 204.8 0 0c6.4 70.4 172.8 128 377.6 128 204.8 0 371.2-57.6 377.6-128l0 0L889.6 128 889.6 128 889.6 128zM512 217.6c-153.6 0-281.6-44.8-281.6-96 0-51.2 128-96 281.6-96 153.6 0 281.6 44.8 281.6 96C793.6 179.2 665.6 217.6 512 217.6L512 217.6z",
        "p-id": "68608"
    },
    null, -1),
    oo = [to, eo, ao];
    function no(o, a) {
        return s(),
        u("svg", Qa, oo)
    }
    var io = S(Ka, [["render", no]]);
    const ro = {},
    so = {
        t: "1640575557247",
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "4211",
        width: "128",
        height: "128"
    },
    uo = t("path", {
        d: "M560 800l-10.464-416h-75.072L464 800h96z m-14.144-493.984c9.44-9.312 14.144-20.672 14.144-34.016 0-13.6-4.704-24.992-14.144-34.208A46.784 46.784 0 0 0 512 224c-13.12 0-24.448 4.608-33.856 13.792A45.856 45.856 0 0 0 464 272c0 13.344 4.704 24.704 14.144 34.016 9.408 9.312 20.704 13.984 33.856 13.984 13.12 0 24.448-4.672 33.856-13.984zM512 32C246.912 32 32 246.912 32 512c0 265.088 214.912 480 480 480 265.088 0 480-214.912 480-480 0-265.088-214.912-480-480-480z m0 64c229.76 0 416 186.24 416 416s-186.24 416-416 416S96 741.76 96 512 282.24 96 512 96z",
        "p-id": "4212"
    },
    null, -1),
    lo = [uo];
    function co(o, a) {
        return s(),
        u("svg", so, lo)
    }
    var po = S(ro, [["render", co]]);
    const mo = {},
    fo = {
        t: "1640681742480",
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "80687",
        width: "128",
        height: "128"
    },
    vo = t("path", {
        d: "M899.892468 123.889088c0-44.342099-36.286708-80.620486-80.624646-80.620486H204.728017C160.385918 43.268602 124.107532 79.546988 124.107532 123.889088v802.847056c0 44.342099 36.278386 80.620486 80.620485 80.620486h614.539805c44.337938 0 80.624646-36.278386 80.624646-80.620486V123.889088z",
        fill: "#D0D0DB",
        "p-id": "80688"
    },
    null, -1),
    bo = t("path", {
        d: "M169.8768 977.7772V174.930143c0-44.342099 36.278386-80.620486 80.620486-80.620485h614.539804c9.936092 0 19.426974 1.905666 28.239639 5.23434-11.525534-30.507298-40.996782-52.389169-75.398629-52.389169H203.342457c-44.342099 0-80.620486 36.278386-80.620486 80.620486v802.851217c0 34.410168 21.881871 63.873094 52.385008 75.381985A79.730065 79.730065 0 0 1 169.8768 977.7772z",
        fill: "#FFFFFF",
        "p-id": "80689"
    },
    null, -1),
    go = t("path", {
        d: "M820.657543 40.497481H206.117739c-44.342099 0-80.620486 36.278386-80.620486 80.620485v802.847057c0 44.342099 36.278386 80.620486 80.620486 80.620486h614.539804c44.337938 0 80.624646-36.278386 80.624647-80.620486V121.117966c0-44.342099-36.286708-80.620486-80.624647-80.620485z m19.60173 828.785749c0 40.846992-33.43237 74.279362-74.287684 74.279361H199.780776c-40.855313 0-74.279362-33.424048-74.279362-74.279361V129.593603c0-40.855313 33.424048-74.279362 74.279362-74.279362h566.203296c40.842831 0 74.283522 33.424048 74.283522 74.279362l-0.008321 739.689627z",
        fill: "#6E6E96",
        "p-id": "80690"
    },
    null, -1),
    _o = t("path", {
        d: "M815.106979 1024H200.567175C146.933914 1024 103.303319 980.369405 103.303319 926.736144V123.889088C103.303319 70.255827 146.933914 26.625232 200.567175 26.625232h614.539804c53.633261 0 97.268017 43.630595 97.268017 97.263856v802.847056c0 53.633261-43.634756 97.263856-97.268017 97.263856zM200.567175 59.911972C165.287391 59.911972 136.590059 88.609303 136.590059 123.889088v802.847056c0 35.279784 28.697331 63.977115 63.977116 63.977115h614.539804c35.279784 0 63.981276-28.697331 63.981276-63.977115V123.889088c0-35.279784-28.701492-63.977115-63.981276-63.977116H200.567175z",
        fill: "#6E6E96",
        "p-id": "80691"
    },
    null, -1),
    ho = t("path", {
        d: "M301.946104 941.515457h429.985632v65.841173H301.946104z",
        fill: "#8A8AA1",
        "p-id": "80692"
    },
    null, -1),
    xo = t("path", {
        d: "M731.931736 1024H301.946104a16.64337 16.64337 0 0 1-16.64337-16.64337V941.515457a16.64337 16.64337 0 0 1 16.64337-16.64337h429.985632a16.64337 16.64337 0 0 1 16.64337 16.64337v65.841173a16.64337 16.64337 0 0 1-16.64337 16.64337z m-413.342262-33.286741h396.698892v-32.554432H318.589474v32.554432z",
        fill: "#6E6E96",
        "p-id": "80693"
    },
    null, -1),
    ko = t("path", {
        d: "M337.230049 960.318304h20.804213v47.038326h-20.804213zM386.565159 960.318304h20.804213v47.038326h-20.804213zM435.891948 960.318304h20.804213v47.038326h-20.804213zM485.231219 960.318304h20.804213v47.038326h-20.804213zM534.558008 960.318304h20.804213v47.038326h-20.804213zM583.897279 960.318304h20.804213v47.038326h-20.804213zM633.224068 960.318304h20.804213v47.038326h-20.804213zM682.563339 960.318304h20.804213v47.038326h-20.804213z",
        fill: "#FFE599",
        "p-id": "80694"
    },
    null, -1),
    wo = t("path", {
        d: "M219.153659 140.794591m-26.874883 0a26.874882 26.874882 0 1 0 53.749765 0 26.874882 26.874882 0 1 0-53.749765 0Z",
        fill: "#ADADD1",
        "p-id": "80695"
    },
    null, -1),
    yo = t("path", {
        d: "M219.153659 184.312843c-23.995579 0-43.518252-19.522673-43.518253-43.518252s19.522673-43.518252 43.518253-43.518253 43.518252 19.522673 43.518252 43.518253-19.522673 43.518252-43.518252 43.518252z m0-53.749764c-5.642103 0-10.231512 4.589409-10.231512 10.231512s4.589409 10.231512 10.231512 10.231512 10.231512-4.589409 10.231511-10.231512-4.589409-10.231512-10.231511-10.231512z",
        fill: "#6E6E96",
        "p-id": "80696"
    },
    null, -1),
    Fo = t("path", {
        d: "M801.28466 140.794591m-26.870721 0a26.870721 26.870721 0 1 0 53.741442 0 26.870721 26.870721 0 1 0-53.741442 0Z",
        fill: "#ADADD1",
        "p-id": "80697"
    },
    null, -1),
    Eo = t("path", {
        d: "M801.28466 184.308683c-23.995579 0-43.514092-19.518512-43.514091-43.514092s19.518512-43.514092 43.514091-43.514092 43.514092 19.518512 43.514092 43.514092-19.518512 43.514092-43.514092 43.514092z m0-53.741443c-5.637942 0-10.227351 4.589409-10.227351 10.227351s4.589409 10.227351 10.227351 10.227351 10.227351-4.589409 10.227351-10.227351-4.589409-10.227351-10.227351-10.227351z",
        fill: "#6E6E96",
        "p-id": "80698"
    },
    null, -1),
    Co = t("path", {
        d: "M801.280499 905.23291m-26.870721 0a26.870721 26.870721 0 1 0 53.741443 0 26.870721 26.870721 0 1 0-53.741443 0Z",
        fill: "#ADADD1",
        "p-id": "80699"
    },
    null, -1),
    $o = t("path", {
        d: "M801.280499 948.747001c-23.995579 0-43.514092-19.518512-43.514091-43.514091s19.518512-43.514092 43.514091-43.514092 43.514092 19.518512 43.514092 43.514092-19.518512 43.514092-43.514092 43.514091z m0-53.741442c-5.637942 0-10.227351 4.589409-10.227351 10.227351s4.589409 10.227351 10.227351 10.227351 10.227351-4.589409 10.227351-10.227351-4.589409-10.227351-10.227351-10.227351z",
        fill: "#6E6E96",
        "p-id": "80700"
    },
    null, -1),
    Do = t("path", {
        d: "M219.153659 905.23291m-26.870722 0a26.870721 26.870721 0 1 0 53.741443 0 26.870721 26.870721 0 1 0-53.741443 0Z",
        fill: "#ADADD1",
        "p-id": "80701"
    },
    null, -1),
    Bo = t("path", {
        d: "M219.153659 948.747001c-23.995579 0-43.514092-19.518512-43.514092-43.514091s19.518512-43.514092 43.514092-43.514092 43.514092 19.518512 43.514091 43.514092-19.522673 43.514092-43.514091 43.514091z m0-53.741442c-5.637942 0-10.227351 4.589409-10.227351 10.227351s4.589409 10.227351 10.227351 10.227351 10.227351-4.589409 10.227351-10.227351-4.589409-10.227351-10.227351-10.227351z",
        fill: "#6E6E96",
        "p-id": "80702"
    },
    null, -1),
    Yo = t("path", {
        d: "M520.972857 777.43263c-142.542145 0-258.508988-115.971004-258.508988-258.52147a16.64337 16.64337 0 0 1 33.28674 0c0 124.19699 101.033579 225.23473 225.222248 225.23473s225.222248-101.03774 225.222248-225.23473c0-124.188668-101.033579-225.218087-225.222248-225.218087a16.64337 16.64337 0 0 1 0-33.286741c142.542145 0 258.508988 115.966843 258.508988 258.504828 0 142.550466-115.966843 258.521471-258.508988 258.52147z",
        fill: "#6E6E96",
        "p-id": "80703"
    },
    null, -1),
    Ao = t("path", {
        d: "M520.968696 518.919481m-83.312551 0a83.312551 83.312551 0 1 0 166.625102 0 83.312551 83.312551 0 1 0-166.625102 0Z",
        fill: "#A9A9BA",
        "p-id": "80704"
    },
    null, -1),
    So = t("path", {
        d: "M520.968696 618.875402c-55.114521 0-99.955921-44.83724-99.955921-99.95176 0-55.118682 44.8414-99.955921 99.955921-99.955921s99.95176 44.8414 99.95176 99.955921c0 55.11036-44.83724 99.95176-99.95176 99.95176z m0-166.625101c-36.761044 0-66.669181 29.908136-66.66918 66.66918s29.908136 66.66502 66.66918 66.66502 66.66502-29.908136 66.66502-66.66502c0-36.761044-29.903976-66.669181-66.66502-66.66918z",
        fill: "#6E6E96",
        "p-id": "80705"
    },
    null, -1),
    zo = t("path", {
        d: "M301.946104 941.515457h429.985632v36.977408H301.946104z",
        fill: "#6E6E96",
        "p-id": "80706"
    },
    null, -1),
    Po = [vo, bo, go, _o, ho, xo, ko, wo, yo, Fo, Eo, Co, $o, Do, Bo, Yo, Ao, So, zo];
    function To(o, a) {
        return s(),
        u("svg", fo, Po)
    }
    var Lo = S(mo, [["render", To]]);
    const Io = {},
    Mo = {
        t: "1640775712185",
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "2996",
        width: "128",
        height: "128"
    },
    Oo = t("path", {
        d: "M894.185422 128.023792 129.814578 445.743994 445.99982 577.744353 571.860343 893.929596Z",
        "p-id": "2997"
    },
    null, -1),
    No = [Oo];
    function qo(o, a) {
        return s(),
        u("svg", Mo, No)
    }
    var Vo = S(Io, [["render", qo]]);
    const Go = {
        class: "progress"
    },
    jo = I({
        props: {
            value: {
                type: Number,
                required: !0
            },
            text: {
                type: String
            }
        },
        setup(o) {
            const a = o,
            n = U(() => a.value >= 80 ? "#e45e5e" : a.value >= 70 ? "#ff9800" : a.value >= 60 ? "#297ff3" : a.value > 0 ? "#53c31b" : "");
            return (l, d) => (s(), u("div", Go, [t("div", {
                class: rt(["progress-value", `$ {
                    o.value > 50
                }`]),
                style: Yt({
                    width: `$ {
                        o.value
                    } % `,
                    backgroundColor: e(n)
                })
            },
            [t("span", null, i(o.text), 1)], 6), wt(l.$slots, "default", {},
            void 0, !0)]))
        }
    });
    var Be = S(jo, [["__scopeId", "data-v-733828e1"]]);
    const Ro = {},
    Uo = {
        height: "32",
        width: "64",
        t: "1649907260906",
        viewBox: "-8 248 1045 537",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "2793",
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
    },
    Ho = t("path", {
        d: "M764.904497 251.418146 259.086289 251.418146c-143.076626 0-259.065314 115.989711-259.065314 259.065314 0 143.077649 115.988688 259.063267 259.065314 259.063267l505.818207 0c143.074579 0 259.063267-115.985618 259.063267-259.063267C1023.967764 367.407857 907.980099 251.418146 764.904497 251.418146zM764.904497 747.164974c-130.507356 0-236.682537-106.175181-236.682537-236.682537S634.397141 273.798876 764.904497 273.798876s236.683561 106.176205 236.683561 236.683561S895.411853 747.164974 764.904497 747.164974z",
        "p-id": "2794",
        fill: "#52C41A"
    },
    null, -1),
    Wo = [Ho];
    function Zo(o, a) {
        return s(),
        u("svg", Uo, Wo)
    }
    var Jo = S(Ro, [["render", Zo]]);
    const Xo = {},
    Ko = {
        height: "32",
        width: "64",
        t: "1649907515643",
        viewBox: "-8 248 1045 537",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "2971",
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
    },
    Qo = t("path", {
        d: "M764.867148 249.793136 259.0735 249.793136c-143.070486 0-259.052011 115.984594-259.052011 259.052011 0 143.07151 115.982548 259.050987 259.052011 259.050987l505.793648 0c143.067416 0 259.050987-115.979478 259.050987-259.050987C1023.917112 365.778754 907.933541 249.793136 764.867148 249.793136zM259.0735 745.516428c-130.501216 0-236.671281-106.172111-236.671281-236.671281 0-130.501216 106.170065-236.671281 236.671281-236.671281S495.744781 378.344954 495.744781 508.84617C495.744781 639.34534 389.574716 745.516428 259.0735 745.516428z",
        "p-id": "2972",
        fill: "#999"
    },
    null, -1),
    tn = [Qo];
    function en(o, a) {
        return s(),
        u("svg", Ko, tn)
    }
    var an = S(Xo, [["render", en]]);
    const on = {
        class: "checkbox_switch"
    },
    nn = {
        class: "checkbox_switch_on"
    },
    rn = {
        class: "checkbox_switch_off"
    },
    sn = I({
        props: {
            modelValue: {
                type: Boolean,
                required: !0
            }
        },
        emits: ["update:modelValue"],
        setup(o, {
            emit: a
        }) {
            const n = o,
            l = U({
                get: () => n.modelValue.valueOf(),
                set: d => a("update:modelValue", d)
            });
            return (d, r) => (s(), u("label", on, [L(t("input", {
                type: "checkbox",
                "onUpdate:modelValue": r[0] || (r[0] = p => Je(l) ? l.value = p : null)
            },
            null, 512), [[Ct, e(l)]]), t("span", nn, [A(Jo)]), t("span", rn, [A(an)]), wt(d.$slots, "default", {},
            void 0, !0)]))
        }
    });
    var Ye = S(sn, [["__scopeId", "data-v-2c8b6a70"]]);
    const dn = {},
    un = {
        t: "1641369474206",
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "7685",
        width: "128",
        height: "128"
    },
    ln = t("path", {
        d: "M757.76 637.44l-218.88 245.76c-14.72 16.64-40.32 16.64-54.4 0L265.6 637.44C244.48 613.76 261.12 576 293.12 576l437.76 0C762.24 576 779.52 613.76 757.76 637.44z",
        "p-id": "7686"
    },
    null, -1),
    cn = [ln];
    function pn(o, a) {
        return s(),
        u("svg", un, cn)
    }
    var mn = S(dn, [["render", pn]]);
    const fn = {},
    vn = {
        t: "1641369492518",
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "7831",
        width: "128",
        height: "128"
    },
    bn = t("path", {
        d: "M758.4 385.92 539.52 140.16c-14.72-16.64-40.32-16.64-54.4 0L266.24 385.92C244.48 409.6 261.76 448 293.12 448l437.76 0C762.88 448 779.52 409.6 758.4 385.92z",
        "p-id": "7832"
    },
    null, -1),
    gn = [bn];
    function _n(o, a) {
        return s(),
        u("svg", vn, gn)
    }
    var hn = S(fn, [["render", _n]]);
    const xn = {};
    function kn(o, a) {
        return s(),
        u("article", null, [wt(o.$slots, "default", {},
        void 0, !0)])
    }
    var wn = S(xn, [["render", kn], ["__scopeId", "data-v-bd286d4e"]]);
    const yn = {
        class: "cover"
    },
    Fn = {
        class: "thumbnail"
    },
    En = I({
        emits: ["click"],
        setup(o, {
            emit: a
        }) {
            const n = () => {
                a("click")
            };
            return (l, d) => (s(), V(wn, null, {
            default:
                G(() => [t("a", {
                    onClick: n
                },
                [t("div", yn, [t("div", Fn, [wt(l.$slots, "default", {},
                void 0, !0)])])])]),
                _: 3
            }))
        }
    });
    var Cn = S(En, [["__scopeId", "data-v-123deb20"]]);
    const $n = {
        class: "select-editable"
    },
    Dn = {
        selected: "",
        value: ""
    },
    Bn = ["value"],
    Yn = {
        value: "useInput"
    },
    An = ["placeholder"],
    Sn = I({
        props: {
            modelValue: {
                type: String,
                required: !0
            },
            title: {
                type: String,
            default:
                ""
            },
            options: {
                type: Array,
            default:
                []
            }
        },
        emits: ["update:modelValue"],
        setup(o, {
            emit: a
        }) {
            const n = o,
            {
                $gettext: l,
                $ngettext: d
            } = q(),
            r = E(""),
            p = E(""),
            x = U({
                get: () => n.modelValue.valueOf(),
                set: c => a("update:modelValue", c)
            }),
            _ = c => {
                c === r.value || r.value === "useInput" && c === p.value || (c === "" || n.options.some(f => f.key === c) ? r.value = c : (p.value = c, r.value = "useInput"))
            };
            Xe(() => n.modelValue, c => {
                _(c)
            }),
            _t(() => {
                const c = x.value;
                _(c)
            });
            const b = c => {
                r.value === "useInput" ? x.value = p.value : x.value = r.value
            },
            m = c => {
                x.value = p.value
            };
            return (c, f) => (s(), u("label", null, [t("div", $n, [L(t("select", {
                "onUpdate:modelValue": f[0] || (f[0] = v => r.value = v),
                autocomplete: "off",
                onChange: b
            },
            [t("option", Dn, i(e(l)("\u8BF7\u9009\u62E9%{title}", {
                title: o.title
            })), 1), (s(!0), u(N, null, R(o.options, (v, g) => (s(), u("option", {
                value: v.key,
                key: g
            },
            i(v.value || v.key), 9, Bn))), 128)), t("option", Yn, i(e(l)("- -\u81EA\u5B9A\u4E49- -")), 1)], 544), [[tt, r.value, void 0, {
                trim: !0
            }]]), r.value == "useInput" ? L((s(), u("input", {
                key: 0,
                type: "text",
                "onUpdate:modelValue": f[1] || (f[1] = v => p.value = v),
                required: "",
                placeholder: e(l)("\u8BF7\u8F93\u5165%{title}", {
                    title: o.title
                }),
                onChange: m
            },
            null, 40, An)), [[H, p.value, void 0, {
                trim: !0
            }]]) : D("", !0)])]))
        }
    });
    var Et = S(Sn, [["__scopeId", "data-v-0b6f3a7d"]]);
    const zn = {
        t: "1631799919469",
        class: "icon",
        viewBox: "0 0 1047 1047",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "3453",
        width: "128",
        height: "128"
    },
    Pn = I({
        props: {
            size: {
                type: [Number, String],
            default:
                50
            },
            color: {
                type: String,
            default:
                "#fff"
            }
        },
        setup(o) {
            const a = n => {
                if (n == null) return;
                if (typeof n == "number") return n + "px";
                const l = n.toString();
                return parseInt(l) + "" == l ? l + "px" : l
            };
            return (n, l) => (s(), u("div", {
                class: "quick-loading",
                style: Yt({
                    width: a(o.size),
                    height: a(o.size)
                })
            },
            [(s(), u("svg", zn, [t("path", {
                d: "M522.695111 1.991111c-26.339556 0.170667-47.416889 21.475556-47.672889 48.753778-0.284444 26.453333-0.056889 52.963556-0.056889 79.445333 0 27.249778-0.369778 54.528 0.113778 81.777778 0.483556 27.050667 22.016 47.132444 49.351111 46.904889a47.786667 47.786667 0 0 0 47.729778-47.445333c0.284444-53.76 0.284444-107.52-0.028444-161.251556-0.170667-27.676444-21.902222-48.355556-49.436445-48.184889m-195.896889 88.092445c-8.334222-14.222222-21.646222-21.276444-38.314666-21.333334-35.128889 0-56.576 36.949333-38.968889 68.152889a11616.995556 11616.995556 0 0 0 78.961777 137.614222 44.942222 44.942222 0 0 0 61.838223 16.896c21.304889-12.202667 29.667556-38.968889 17.379555-60.871111-26.453333-47.104-53.560889-93.866667-80.896-140.458666m-228.693333 234.524444c44.316444 25.799111 88.746667 51.342222 133.176889 76.970667 6.712889 3.896889 13.681778 6.912 21.703111 6.428444 20.138667 0.142222 35.953778-11.946667 41.301333-31.573333 5.006222-18.261333-2.673778-36.721778-20.224-46.990222-44.629333-26.026667-89.372444-51.882667-134.115555-77.710223-22.528-12.999111-47.815111-7.025778-59.818667 13.909334-12.231111 21.248-4.977778 45.624889 17.948444 58.965333m34.161778 235.975111c26.396444 0 52.821333 0.199111 79.217778-0.085333 23.409778-0.256 39.139556-16.412444 38.798222-39.139556-0.341333-21.617778-16.924444-37.347556-39.594666-37.376-51.655111-0.056889-103.310222-0.056889-154.965334 0.028445-24.177778 0.056889-40.704 15.985778-40.561778 38.684444 0.142222 22.186667 16.583111 37.745778 40.192 37.859556 25.656889 0.142222 51.285333 0.028444 76.913778 0m151.722667 100.238222a34.247111 34.247111 0 0 0-46.876445-12.942222 13764.778667 13764.778667 0 0 0-139.008 80.583111c-11.093333 6.485333-16.327111 16.867556-16.497777 25.372444 0.085333 30.549333 27.249778 47.957333 50.403555 35.072 47.160889-26.197333 93.724444-53.475556 140.145778-80.924444 17.180444-10.154667 21.504-30.378667 11.832889-47.160889m91.875555 101.660444c-14.250667-4.067556-27.619556 1.422222-35.84 15.644445a24375.466667 24375.466667 0 0 0-77.312 134.485333c-10.012444 17.550222-5.859556 35.669333 9.784889 45.027556 16.014222 9.557333 34.247111 4.039111 44.714667-13.994667 25.543111-44.088889 50.915556-88.263111 76.373333-132.352 3.299556-5.745778 5.688889-11.690667 5.745778-14.933333 0-17.834667-9.272889-29.866667-23.466667-33.877334m147.456 44.288c-16.384 0.085333-27.306667 11.918222-27.448888 30.151111-0.142222 25.372444-0.028444 50.716444-0.028445 76.060445h-0.085333c0 26.112-0.113778 52.252444 0.056889 78.364444 0.113778 18.261333 11.064889 30.065778 27.448889 30.208 16.952889 0.142222 28.046222-11.832889 28.103111-30.748444 0.113778-51.086222 0.142222-102.172444 0.056889-153.258667 0-18.773333-11.207111-30.862222-28.103112-30.776889m177.208889-26.112c-7.509333-12.8-21.902222-16.014222-33.792-8.874666a23.722667 23.722667 0 0 0-8.533333 32.995555c26.282667 46.279111 52.906667 92.330667 79.644444 138.353778 4.494222 7.765333 11.633778 11.946667 20.906667 11.804444 18.545778-0.142222 30.520889-19.342222 21.219556-35.868444-26.026667-46.392889-52.650667-92.444444-79.473778-138.410667m239.957333-41.187555c-45.283556-26.254222-90.595556-52.48-135.964444-78.648889-4.693333-2.702222-9.728-4.323556-15.36-2.958222-9.102222 2.247111-14.933333 8.049778-16.497778 17.095111-1.877333 10.894222 3.84 18.204444 12.885333 23.438222 29.809778 17.180444 59.562667 34.417778 89.344 51.598222 15.217778 8.789333 30.236444 17.976889 45.738667 26.225778 14.677333 7.793778 31.061333-2.048 31.061333-18.033778-0.056889-8.448-4.096-14.592-11.207111-18.716444m48.867556-234.638222c-24.888889-0.085333-49.749333 0-74.609778 0v-0.085334c-25.258667 0-50.517333-0.056889-75.776 0.028445-13.425778 0.056889-20.963556 6.343111-21.162667 17.294222-0.199111 11.150222 7.082667 17.521778 20.679111 17.550222 50.488889 0.113778 100.977778 0.142222 151.495112 0.085333 13.368889 0 21.191111-6.485333 21.390222-17.152 0.227556-10.808889-8.106667-17.664-22.016-17.720888m-187.960889-127.146667c45.084444-26.026667 90.140444-52.110222 135.168-78.222222 4.864-2.844444 8.248889-6.855111 8.135111-12.942223-0.142222-11.036444-11.207111-17.436444-21.504-11.548444-45.511111 26.055111-90.851556 52.394667-136.135111 78.819556-7.68 4.494222-10.524444 11.52-5.575111 19.569777 4.835556 7.850667 12.088889 8.817778 19.911111 4.323556m-122.311111-115.114667c5.205333-0.256 8.220444-3.413333 10.609778-7.651555 4.920889-8.647111 10.040889-17.208889 14.990222-25.827556 20.48-35.555556 40.931556-71.025778 61.297778-106.609778 5.091556-8.874667 3.015111-16.668444-4.778667-18.517333-7.68-1.848889-10.894222 3.697778-14.051556 9.159111l-68.778666 119.495111c-2.844444 4.977778-6.030222 9.870222-8.305778 15.104-3.128889 7.196444 1.678222 14.648889 9.045333 14.848",
                "p-id": "3454",
                style: Yt({
                    fill: o.color
                })
            },
            null, 4)]))], 4))
        }
    });
    var Tn = S(Pn, [["__scopeId", "data-v-0ec4e762"]]);
    const Ln = {},
    In = {
        t: "1642063181211",
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "5062",
        width: "128",
        height: "128",
        "data-v-cda444e0": ""
    },
    Mn = t("path", {
        d: "M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m-74.965333 550.4L346.453333 545.152a42.666667 42.666667 0 1 0-60.330666 60.330667l120.704 120.704a42.666667 42.666667 0 0 0 60.330666 0l301.653334-301.696a42.666667 42.666667 0 1 0-60.288-60.330667l-271.530667 271.488z",
        fill: "#52C41A",
        "p-id": "5063",
        "data-v-cda444e0": ""
    },
    null, -1),
    On = [Mn];
    function Nn(o, a) {
        return s(),
        u("svg", In, On)
    }
    var qn = S(Ln, [["render", Nn]]);
    const Vn = {},
    Gn = {
        width: "128",
        height: "128",
        viewBox: "0 0 50 50",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
    },
    jn = $t('<g id="icon_internet-alert" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="wancheng"><path d="M0,25 C0,33.9316396 4.76497292,42.1848151 12.5,46.6506351 C20.2350269,51.116455 29.7649731,51.116455 37.5,46.6506351 C45.2350271,42.1848151 50,33.9316396 50,25 C50,11.1928812 38.8071187,0 25,0 C11.1928813,0 0,11.1928812 0,25 Z" id="Path" fill-opacity="0.08" fill="#FAAD14" fill-rule="nonzero"></path><g id="Group-2" transform="translate(10.000000, 10.000000)"><path d="M0,15 C0,20.3589838 2.85898375,25.3108891 7.5,27.990381 C12.1410161,30.669873 17.8589839,30.669873 22.5,27.990381 C27.1410162,25.3108891 30,20.3589838 30,15 C30,6.7157287 23.2842712,0 15,0 C6.71572875,0 0,6.7157287 0,15 Z" id="Path" fill="#FAAD14" fill-rule="nonzero"></path><path d="M15,6 C15.8284271,6 16.5,6.67157288 16.5,7.5 L16.5,18.5 C16.5,19.3284271 15.8284271,20 15,20 C14.1715729,20 13.5,19.3284271 13.5,18.5 L13.5,7.5 C13.5,6.67157288 14.1715729,6 15,6 Z" id="\u8DEF\u5F84" fill="#FFFFFF"></path><path d="M15,25 C14.171875,25 13.5,24.328125 13.5,23.5 C13.5,22.671875 14.171875,22 15,22 C15.828125,22 16.5,22.671875 16.5,23.5 C16.5,24.328125 15.828125,25 15,25 Z" id="\u8DEF\u5F84" fill="#FFFFFF"></path></g></g></g>', 1),
    Rn = [jn];
    function Un(o, a) {
        return s(),
        u("svg", Gn, Rn)
    }
    var Hn = S(Vn, [["render", Un]]);
    const Wn = o => (W("data-v-b934e2ce"), o = o(), Z(), o),
    Zn = ["href", "title"],
    Jn = Wn(() => t("svg", {
        t: "1684144670421",
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "4343"
    },
    [t("path", {
        d: "M512 74.666667c241.066667 0 437.333333 196.266667 437.333333 437.333333S753.066667 949.333333 512 949.333333 74.666667 753.066667 74.666667 512 270.933333 74.666667 512 74.666667zM512 704c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666666 42.666667-19.2 42.666667-42.666666-19.2-42.666667-42.666667-42.666667z m0-458.666667c-76.8 0-138.666667 61.866667-138.666667 138.666667 0 17.066667 14.933333 32 32 32s32-14.933333 32-32c0-40.533333 34.133333-74.666667 74.666667-74.666667s74.666667 34.133333 74.666667 74.666667c0 2.133333 0 6.4-2.133334 10.666667-6.4 14.933333-19.2 32-40.533333 51.2-10.666667 10.666667-21.333333 19.2-34.133333 27.733333-2.133333 2.133333-6.4 4.266667-8.533334 6.4l-6.4 4.266667c-8.533333 6.4-14.933333 17.066667-14.933333 27.733333v108.8c2.133333 17.066667 14.933333 29.866667 32 29.866667h2.133333c17.066667-2.133333 29.866667-14.933333 29.866667-32v-89.6l12.8-10.666667c10.666667-8.533333 19.2-17.066667 29.866667-25.6 27.733333-25.6 46.933333-49.066667 57.6-74.666667 4.266667-10.666667 6.4-23.466667 6.4-34.133333 0-76.8-61.866667-138.666667-138.666667-138.666667z",
        fill: "#666666",
        "p-id": "4344"
    })], -1)),
    Xn = [Jn],
    Kn = I({
        props: {
            type: null
        },
        setup(o) {
            const a = o,
            {
                $gettext: n,
                $ngettext: l
            } = q(),
            d = U(() => {
                switch (a.type) {
                case "disk":
                    return "https://www.linkease.com/rd/8myYAEVA/";
                case "store":
                    return "https://www.linkease.com/rd/1F58VUTT/";
                case "docker":
                    return "https://www.linkease.com/rd/2Q28MDtf/";
                case "download":
                    return "https://www.linkease.com/rd/1tJo1KX-/";
                case "ddns":
                    return "https://www.linkease.com/rd/3yFiX5-X/";
                case "network-interface":
                    return "https://www.linkease.com/rd/3ca51a3G/"
                }
            });
            return (r, p) => (s(), u("a", {
                href: e(d),
                target: "_blank",
                title: e(n)("\u8DF3\u8F6C\u6559\u7A0B")
            },
            Xn, 8, Zn))
        }
    });
    var Qn = S(Kn, [["__scopeId", "data-v-b934e2ce"]]),
    Ae = {
        install: o => {
            o.component("icon-loading", Tn),
            o.component("icon-success", qn),
            o.component("icon-error", Hn),
            o.component("GlHelp", Qn)
        }
    };
    const {
        $gettext: Lt,
        $ngettext: Gt
    } = Ht(),
    ti = o => {},
    ei = () => new Date().getTime(),
    ai = o => {
        if (o < 1e3) return`$ {
            o
        } B`;
        let n = 1e3,
        l = 0;
        for (let p = o / 1e3; p >= 1e3; p /= 1e3) n *= 1e3,
        l++;
        let d = [" KB", " MB", " GB", " TB", " PB", " EB"];
        return (o / 100 / (n / 100)).toFixed(1) + d[l]
    },
    oi = o => {
        if (o == null) return 0;
        if (o < 1e4) return o;
        let n = parseInt(`$ {
            o / 1e4
        }`),
        l = o % 1e4;
        return`$ {
            n
        }\u4E07$ {
            l
        }`
    },
    ni = o => {
        if (o) try {
            var a = new Date(o),
            n = a.getHours(),
            l = a.getMinutes(),
            d = a.getSeconds();
            return n < 10 && (n = `0$ {
                n
            }`),
            l < 10 && (l = `0$ {
                l
            }`),
            d < 10 && (d = `0$ {
                d
            }`),
            `$ {
                n
            }: $ {
                l
            }: $ {
                d
            }`
        } catch(r) {}
        return ""
    },
    ii = o => {
        if (o) {
            let a = Math.floor(o / 86400),
            n = Math.floor(o / 3600) % 24,
            l = Math.floor(o / 60) % 60,
            d = o % 60;
            return (a > 0 ? Gt("%{ days }\u5929", "%{ days }\u5929", a, {
                days: Vt(a)
            }) : "") + Gt("%{ hours }\u5C0F\u65F6", "%{ hours }\u5C0F\u65F6", n, {
                hours: Vt(n)
            }) + Gt("%{ minutes }\u5206", "%{ minutes }\u5206", l, {
                minutes: Vt(l)
            }) + Gt("%{ seconds }\u79D2", "%{ seconds }\u79D2", d, {
                seconds: Vt(d)
            })
        }
    },
    ri = o => /^\d+\.\d+\.\d+\.\d+$/.test(o),
    si = o => o.length < 3 ? Lt("\u7528\u6237\u540D\u592A\u77ED") : o.toLowerCase() != o ? Lt("\u7528\u6237\u540D\u53EA\u80FD\u4E3A\u5C0F\u5199") : new RegExp("^\\d").exec(o) ? Lt("\u7528\u6237\u540D\u4E0D\u80FD\u4EE5\u6570\u5B57\u5F00\u5934") : new RegExp("^_").exec(o) ? Lt("\u7528\u6237\u540D\u4E0D\u80FD\u4EE5_\u5F00\u5934") : new RegExp("^[a-z0-9_]+$").exec(o) ? !0 : Lt("\u975E\u6CD5\u7684\u7528\u6237\u540D"),
    di = (o, a) => {
        let n = !0,
        l = null;
        const d = () => {
            l = null,
            n && o().
            finally(() => {
                n && (l = setTimeout(d, a))
            })
        };
        return l = setTimeout(d, 0),
        () => {
            n = !1,
            l != null && clearTimeout(l)
        }
    };
    var ui = Object.freeze(Object.defineProperty({
        __proto__: null,
        formatDate: ti,
        UnixDate: ei,
        byteToSize: ai,
        numberToSum: oi,
        dateForm: ni,
        stampForm: ii,
        checkIsIP: ri,
        checkSmabaUserName: si,
        easyInterval: di
    },
    Symbol.toStringTag, {
        value: "Module"
    })),
    gt = X({},
    ui);
    const li = () => {
        var a;
        const o = document.body.getAttribute("theme");
        if (o) switch (o) {
        case "dark":
            case "light":
            return o
        }
        return (a = window.matchMedia("(prefers-color-scheme: dark)")) != null && a.matches ? "dark" : "light"
    },
    ci = () => li() == "dark",
    pi = {
        class: "flow"
    },
    mi = {
        class: "flow-data"
    },
    fi = {
        key: 0
    },
    vi = {
        key: 1
    },
    bi = I({
        setup(o) {
            const {
                $gettext: a,
                $ngettext: n
            } = q();
            Ke([Qe, ta, ea, aa, oa, na]);
            const l = E(),
            d = k => {
                var w;
                const h = (w = l.value) == null ? void 0 : w[k];
                return !h || h.startTime == 0 ? "" : m(h.startTime * 1e3) + "-" + m(h.endTime * 1e3)
            },
            r = U(() => {
                var h;
                let k = [];
                return (h = l.value) == null || h.forEach(w => {
                    k.push({
                        value: w.uploadSpeed
                    })
                }),
                k
            }),
            p = U(() => {
                var h;
                let k = [];
                return (h = l.value) == null || h.forEach(w => {
                    k.push({
                        value: w.downloadSpeed
                    })
                }),
                k
            }),
            x = U(() => {
                var h;
                let k = "";
                if (l.value) {
                    let w = ((h = l.value) == null ? void 0 : h.length) || 0;
                    if (w > 0) {
                        let y = l.value[w - 1];
                        k = c(y.uploadSpeed) + "/s"
                    }
                }
                return k
            }),
            _ = U(() => {
                var h;
                let k = "";
                if (l.value) {
                    let w = ((h = l.value) == null ? void 0 : h.length) || 0;
                    if (w > 0) {
                        let y = l.value[w - 1];
                        k = c(y.downloadSpeed) + "/s"
                    }
                }
                return k
            });
            U(() => {
                var h;
                let k = [];
                return (h = l.value) == null || h.forEach(w => {
                    k.push({
                        value: w.downloadSpeed + w.uploadSpeed
                    })
                }),
                k
            });
            const b = () => M(this, null, function * () {
                var k;
                try {
                    const h = yield P.Network.Statistics.GET();
                    if (h.data && (k = h.data.result) != null && k.items) {
                        const w = h.data.result.slots || 10;
                        if (h.data.result.items.length < w) {
                            let y = h.data.result.items;
                            for (; y.length < w;) y = [{
                                downloadSpeed: 0,
                                endTime: 0,
                                startTime: 0,
                                uploadSpeed: 0
                            }].concat(y);
                            l.value = y
                        } else h.data.result.items.length > w ? l.value = h.data.result.items.slice(w - h.data.result.items.length) : l.value = h.data.result.items
                    }
                } catch(h) {
                    console.log(h)
                }
            }),
            m = gt.dateForm,
            c = gt.byteToSize,
            f = E();
            let v = null;
            const g = k => {
                const h = ci();
                return v = ia(k, h ? "dark" : "light"),
                v.setOption({
                    animation: !1,
                    backgroundColor: h ? "#88888822" : "#fff",
                    color: ["transparent", "transparent"],
                    tooltip: {
                        trigger: "axis",
                        formatter: w => {
                            if (Array.isArray(w)) {
                                let y = "";
                                w.length > 0 && (y = d(w[0].axisValue));
                                for (let F = 0; F < w.length; F++) y = `$ {
                                    y
                                } < br > $ {
                                    w[F].seriesName
                                }:  $ {
                                    c(w[F].value)
                                }
                                /s`;return y.toString()}else{const y=w;return`${d(y.axisValue)}<br>${y.seriesName}: ${c(y.value)}/s`
                            }
                        }
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: !1,
                        splitLine: {
                            lineStyle: {
                                color: ["#999"]
                            },
                            show: !1
                        },
                        name: "",
                        show: !1,
                        nameGap: 0,
                        nameTextStyle: {
                            height: 0,
                            lineHeight: 0,
                            padding: 0
                        }
                    },
                    title: {
                        text: a("\u6D41\u91CF\u7EDF\u8BA1"),
                        textStyle: {
                            fontSize: 12,
                            color: h ? "#cccccc" : "rgba(0, 0, 0, 0.6)"
                        },
                        top: "10px",
                        left: "10px"
                    },
                    yAxis: {
                        type: "value",
                        name: "",
                        minInterval: 1e4,
                        interval: 1e3,
                        axisLabel: {
                            formatter: function(w, y) {
                                return`$ {
                                    c(w)
                                }
                                /s`},color:"#fff",show:!1},nameTextStyle:{color:"#fff"},splitLine:{lineStyle:{color:["#999"]},show:!1}},series:[{name:a("\u4E0B\u8F7D"),data:p.value,type:"line",symbol:"none",showSymbol:!1,symbolSize:0,smooth:!0,areaStyle:{color:{type:"linear",x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:"rgba(32, 199, 247, 1)"},{offset:1,color:"rgba(32, 199, 247, 0.1)"}],global:!1}}},{name:a("\u4E0A\u4F20"),data:r.value,type:"line",symbol:"none",showSymbol:!1,symbolSize:0,smooth:!0,areaStyle:{color:{type:"linear",x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:"rgba(85, 58, 254, 1)"},{offset:1,color:"rgba(85, 58, 254, 0.1)"}],global:!1}}}],legend:{padding:0,align:"right",top:"10px",data:[{name:a("\u4E0A\u4F20"),itemStyle:{color:"rgb(85, 58, 254)"}},{name:a("\u4E0B\u8F7D"),itemStyle:{color:"rgb(32, 199, 247)"}}],textStyle:{color:h?"#cccccc":"rgba(0, 0, 0, 0.6)"},lineStyle:{color:"#333"}},grid:{left:"2%",right:"2%",bottom:"0%",top:"10%",containLabel:!0}}),v};return _t(()=>{setTimeout(()=>M(this,null,function*(){if(f.value){yield b();const k=g(f.value),h=f.value;k.resize({width:h.clientWidth,height:h.clientHeight}),window.addEventListener("resize",()=>{k.resize({width:h.clientWidth,height:h.clientHeight})});const w=()=>M(this,null,function*(){if(v!=null){if(!document.hidden){if(yield b(),v==null)return;k.setOption({series:[{name:a("\u4E0B\u8F7D"),data:p.value,type:"line",areaStyle:{},smooth:!0},{name:a("\u4E0A\u4F20"),data:r.value,type:"line",areaStyle:{},smooth:!0}]})}setTimeout(w,5e3)}});setTimeout(w,5e3)}}),900)}),St(()=>{v!=null&&(v.dispose(),v=null)}),(k,h)=>(s(),u("div",pi,[t("div",{ref_key:"el",ref:f,class:"echart"},null,512),t("div",mi,[e(x)?(s(),u("span",fi,i(e(a)("\u4E0A\u4F20:"))+" "+i(e(x)),1)):D("",!0),e(_)?(s(),u("span",vi,i(e(a)("\u4E0B\u8F7D:"))+" "+i(e(_)),1)):D("",!0)])]))}});var gi=S(bi,[["__scopeId","data-v-641bc7f8"]]);const _i={},hi={t:"1649668202191",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http:/ / www.w3.org / 2000 / svg ","
                                p - id ":"
                                2338 ","
                                xmlns: xlink ":"
                                http: //www.w3.org/1999/xlink",width:"28px",height:"28px"},xi=t("path",{d:"M288 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z","p-id":"2339",fill:"#666"},null,-1),ki=t("path",{d:"M512 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z","p-id":"2340",fill:"#666"},null,-1),wi=t("path",{d:"M736 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z","p-id":"2341",fill:"#666"},null,-1),yi=[xi,ki,wi];function Fi(o,a){return s(),u("svg",hi,yi)}var kt=S(_i,[["render",Fi]]);let jt=0;const Ei={props:{type:String,message:String|Function,Close:Function,countdown:Number},data(){return{show:!1,remain:0}},mounted(){if(window.setTimeout(()=>{this.show=!0},0),this.countdown){this.remain=this.countdown;const o=()=>{this.show&&this.remain>0&&(this.remain=this.remain-1,jt=window.setTimeout(o,1e3))};jt=window.setTimeout(o,1e3)}},computed:{Message(){return this.message+(this.countdown?" "+this.remain+"s":"")}},methods:{Stop(){this.type!="loading"&&(this.show=!1,jt!=0&&clearTimeout(jt),this.Close())}}},Zt=o=>(W("data-v-6935a479"),o=o(),Z(),o),Ci={key:0,class:"loading icon"},$i=Zt(()=>t("svg",{t:"1631799919469",class:"icon",viewBox:"0 0 1047 1047",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"3453",width:"128",height:"128"},[t("path",{d:"M522.695111 1.991111c-26.339556 0.170667-47.416889 21.475556-47.672889 48.753778-0.284444 26.453333-0.056889 52.963556-0.056889 79.445333 0 27.249778-0.369778 54.528 0.113778 81.777778 0.483556 27.050667 22.016 47.132444 49.351111 46.904889a47.786667 47.786667 0 0 0 47.729778-47.445333c0.284444-53.76 0.284444-107.52-0.028444-161.251556-0.170667-27.676444-21.902222-48.355556-49.436445-48.184889m-195.896889 88.092445c-8.334222-14.222222-21.646222-21.276444-38.314666-21.333334-35.128889 0-56.576 36.949333-38.968889 68.152889a11616.995556 11616.995556 0 0 0 78.961777 137.614222 44.942222 44.942222 0 0 0 61.838223 16.896c21.304889-12.202667 29.667556-38.968889 17.379555-60.871111-26.453333-47.104-53.560889-93.866667-80.896-140.458666m-228.693333 234.524444c44.316444 25.799111 88.746667 51.342222 133.176889 76.970667 6.712889 3.896889 13.681778 6.912 21.703111 6.428444 20.138667 0.142222 35.953778-11.946667 41.301333-31.573333 5.006222-18.261333-2.673778-36.721778-20.224-46.990222-44.629333-26.026667-89.372444-51.882667-134.115555-77.710223-22.528-12.999111-47.815111-7.025778-59.818667 13.909334-12.231111 21.248-4.977778 45.624889 17.948444 58.965333m34.161778 235.975111c26.396444 0 52.821333 0.199111 79.217778-0.085333 23.409778-0.256 39.139556-16.412444 38.798222-39.139556-0.341333-21.617778-16.924444-37.347556-39.594666-37.376-51.655111-0.056889-103.310222-0.056889-154.965334 0.028445-24.177778 0.056889-40.704 15.985778-40.561778 38.684444 0.142222 22.186667 16.583111 37.745778 40.192 37.859556 25.656889 0.142222 51.285333 0.028444 76.913778 0m151.722667 100.238222a34.247111 34.247111 0 0 0-46.876445-12.942222 13764.778667 13764.778667 0 0 0-139.008 80.583111c-11.093333 6.485333-16.327111 16.867556-16.497777 25.372444 0.085333 30.549333 27.249778 47.957333 50.403555 35.072 47.160889-26.197333 93.724444-53.475556 140.145778-80.924444 17.180444-10.154667 21.504-30.378667 11.832889-47.160889m91.875555 101.660444c-14.250667-4.067556-27.619556 1.422222-35.84 15.644445a24375.466667 24375.466667 0 0 0-77.312 134.485333c-10.012444 17.550222-5.859556 35.669333 9.784889 45.027556 16.014222 9.557333 34.247111 4.039111 44.714667-13.994667 25.543111-44.088889 50.915556-88.263111 76.373333-132.352 3.299556-5.745778 5.688889-11.690667 5.745778-14.933333 0-17.834667-9.272889-29.866667-23.466667-33.877334m147.456 44.288c-16.384 0.085333-27.306667 11.918222-27.448888 30.151111-0.142222 25.372444-0.028444 50.716444-0.028445 76.060445h-0.085333c0 26.112-0.113778 52.252444 0.056889 78.364444 0.113778 18.261333 11.064889 30.065778 27.448889 30.208 16.952889 0.142222 28.046222-11.832889 28.103111-30.748444 0.113778-51.086222 0.142222-102.172444 0.056889-153.258667 0-18.773333-11.207111-30.862222-28.103112-30.776889m177.208889-26.112c-7.509333-12.8-21.902222-16.014222-33.792-8.874666a23.722667 23.722667 0 0 0-8.533333 32.995555c26.282667 46.279111 52.906667 92.330667 79.644444 138.353778 4.494222 7.765333 11.633778 11.946667 20.906667 11.804444 18.545778-0.142222 30.520889-19.342222 21.219556-35.868444-26.026667-46.392889-52.650667-92.444444-79.473778-138.410667m239.957333-41.187555c-45.283556-26.254222-90.595556-52.48-135.964444-78.648889-4.693333-2.702222-9.728-4.323556-15.36-2.958222-9.102222 2.247111-14.933333 8.049778-16.497778 17.095111-1.877333 10.894222 3.84 18.204444 12.885333 23.438222 29.809778 17.180444 59.562667 34.417778 89.344 51.598222 15.217778 8.789333 30.236444 17.976889 45.738667 26.225778 14.677333 7.793778 31.061333-2.048 31.061333-18.033778-0.056889-8.448-4.096-14.592-11.207111-18.716444m48.867556-234.638222c-24.888889-0.085333-49.749333 0-74.609778 0v-0.085334c-25.258667 0-50.517333-0.056889-75.776 0.028445-13.425778 0.056889-20.963556 6.343111-21.162667 17.294222-0.199111 11.150222 7.082667 17.521778 20.679111 17.550222 50.488889 0.113778 100.977778 0.142222 151.495112 0.085333 13.368889 0 21.191111-6.485333 21.390222-17.152 0.227556-10.808889-8.106667-17.664-22.016-17.720888m-187.960889-127.146667c45.084444-26.026667 90.140444-52.110222 135.168-78.222222 4.864-2.844444 8.248889-6.855111 8.135111-12.942223-0.142222-11.036444-11.207111-17.436444-21.504-11.548444-45.511111 26.055111-90.851556 52.394667-136.135111 78.819556-7.68 4.494222-10.524444 11.52-5.575111 19.569777 4.835556 7.850667 12.088889 8.817778 19.911111 4.323556m-122.311111-115.114667c5.205333-0.256 8.220444-3.413333 10.609778-7.651555 4.920889-8.647111 10.040889-17.208889 14.990222-25.827556 20.48-35.555556 40.931556-71.025778 61.297778-106.609778 5.091556-8.874667 3.015111-16.668444-4.778667-18.517333-7.68-1.848889-10.894222 3.697778-14.051556 9.159111l-68.778666 119.495111c-2.844444 4.977778-6.030222 9.870222-8.305778 15.104-3.128889 7.196444 1.678222 14.648889 9.045333 14.848","p-id":"3454"})],-1)),Di=[$i],Bi={key:1,class:"success icon"},Yi=Zt(()=>t("svg",{t:"1632451272305",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2204",width:"128",height:"128"},[t("path",{d:"M1001.305115 275.874141 431.461709 845.718571c-28.221762 28.221762-73.977875 28.221762-102.20066 0L22.661116 539.116591c-28.222785-28.221762-28.222785-73.979922 0-102.20066 28.221762-28.221762 73.977875-28.221762 102.20066 0l255.500115 255.502162 518.743588-518.743588c28.221762-28.221762 73.977875-28.221762 102.199637 0C1029.5279 201.89422 1029.5279 247.65238 1001.305115 275.874141z","p-id":"2205"})],-1)),Ai=[Yi],Si={key:2,class:"error icon"},zi=Zt(()=>t("svg",{t:"1632451325789",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2204",width:"128",height:"128"},[t("path",{d:"M823.04 840.32 524.16 540.16l296.32-294.4c12.8-12.8 12.8-33.28 0-45.44-12.8-12.8-33.28-12.8-46.08 0L478.08 494.08 184.96 200.32c-12.8-12.8-33.28-12.8-45.44 0s-12.8 33.28 0 45.44l292.48 293.76-302.72 300.8c-12.8 12.8-12.8 33.28 0 45.44 12.8 12.8 33.28 12.8 46.08 0l302.72-300.16 299.52 300.16c12.8 12.8 33.28 12.8 45.44 0C835.2 873.6 835.2 853.12 823.04 840.32z","p-id":"2205"})],-1)),Pi=[zi],Ti={key:3,class:"warning icon"},Li=Zt(()=>t("svg",{t:"1632451401172",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1638",width:"128",height:"128"},[t("path",{d:"M512 1021.45211835a60.32985613 60.32985613 0 1 1 60.32985613-60.32985611 60.32985613 60.32985613 0 0 1-60.32985613 60.32985611z m86.85823451-924.97400238L572.32985613 719.80283775a60.32985613 60.32985613 0 0 1-120.65971226 0l-26.52837838-623.32472178c-0.16758294-2.22885301-0.28489098-4.49122263-0.284891-6.78710881a87.14312551 87.14312551 0 0 1 174.28625102 0c0 2.2958862-0.11730806 4.5582558-0.284891 6.78710881z","p-id":"1639"})],-1)),Ii=[Li];function Mi(o,a,n,l,d,r){return s(),V(ft,{name:"el-fade-in-linear"},{default:G(()=>[d.show?(s(),u("div",{key:0,class:"toast",onClick:a[1]||(a[1]=p=>r.Stop())},[n.type=="loading"?(s(),u("div",Ci,Di)):n.type=="success"?(s(),u("div",Bi,Ai)):n.type=="error"?(s(),u("div",Si,Pi)):n.type=="warning"?(s(),u("div",Ti,Ii)):D("",!0),t("div",{class:"message",onClick:a[0]||(a[0]=st(()=>{},["stop"]))},i(r.Message),1)])):D("",!0)]),_:1})}var Oi=S(Ei,[["render",Mi],["__scopeId","data-v-6935a479"]]);const Mt=new Map,zt=o=>{const a=et(Oi,nt(X({},o),{Close:()=>{l()}})),n=document.createElement("div");document.body.append(n),a.mount(n);const l=()=>{n.remove(),Mt.get(a._uid)&&Mt.delete(a._uid)};return o.type=="loading"&&Mt.set(a._uid,{Close:l}),(o==null?void 0:o.duration)==0||((o==null?void 0:o.duration)>0?setTimeout(()=>{l()},o==null?void 0:o.duration):setTimeout(()=>{l()},3e3)),{Close:l}},C=o=>zt(o);C.Loading=(o,a)=>zt({type:"loading",message:o||"\u52A0\u8F7D\u4E2D...",duration:0,countdown:a||0});C.Success=o=>zt({type:"success",message:o});C.Error=o=>zt({type:"error",message:o,duration:0});C.Warning=o=>zt({type:"warning",message:o});C.Message=o=>zt({message:o});C.Clear=()=>{Mt.forEach((o,a)=>{o.Close(),Mt.delete(a)})};const{$gettext:Dt,$ngettext:Qy}=Ht(),ut={installApp:(o,a)=>new Promise((n,l)=>{let d=0;P.App.Install.POST({name:o}).then(()=>{const r=setTimeout(()=>{d==0&&(d=1,n(!1))},(a||60)*1e3),p=()=>{d==0&&P.App.Check.POST({name:o}).then(x=>{if(d==0&&x!=null&&x.data){const{result:_}=x.data;if((_==null?void 0:_.status)=="installed"){clearTimeout(r),d=1,n(!0);return}}}).catch(x=>{}).finally(()=>{d==0&&setTimeout(p,3e3)})};setTimeout(p,3e3)}).catch(r=>{d==0&&(d=1,l(Dt("\u5B89\u88C5\u5931\u8D25\uFF0C")+r))})}),checkAndInstallApp:(o,a,n)=>M(At,null,function*(){let l=C.Loading(Dt("\u68C0\u67E5\u4E2D..."));try{const d=yield P.App.Check.POST({name:o});if(l.Close(),d!=null&&d.data){const{result:r,error:p}=d.data;if(p)C.Warning(p);else if(r){if(r.status=="installed")return!0;if(confirm(Dt("\u68C0\u6D4B\u5230\u4F60\u5C1A\u672A\u5B89\u88C5 %{name} \u63D2\u4EF6,\u662F\u5426\u5B89\u88C5\uFF1F",{name:a}))){l=C.Loading(Dt("\u6B63\u5728\u5B89\u88C5\u4E2D..."));const x=yield ut.installApp(n||o);if(l.Close(),x)return!0;C.Error(Dt("\u5B89\u88C5\u5931\u8D25\u6216\u8D85\u65F6\uFF0C\u8BF7\u68C0\u67E5\u8F6F\u4EF6\u6E90\u6216\u7A0D\u5019\u91CD\u8BD5"))}}else C.Warning(Dt("\u68C0\u67E5\u63D2\u4EF6\u72B6\u6001\u5931\u8D25"))}return!1}catch(d){return l.Close(),C.Warning(d),!1}}),installAndGo:(o,a,n,l)=>M(At,null,function*(){(yield ut.checkAndInstallApp(o,a,l))&&(location.href=n)})},Ni={},qi={t:"1640746738262",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1216",width:"128",height:"128"},Vi=t("path",{d:"M511.232 438.8352L112.9984 40.6016A51.2 51.2 0 0 0 40.6016 112.9984L438.784 511.232 40.6016 909.4656a51.2 51.2 0 1 0 72.3968 72.448l398.2336-398.2848 398.2336 398.2848a51.2 51.2 0 1 0 72.448-72.448l-398.2848-398.2336 398.2848-398.2336A51.2 51.2 0 0 0 909.4656 40.6016L511.232 438.784z","p-id":"1217"},null,-1),Gi=[Vi];function ji(o,a){return s(),u("svg",qi,Gi)}var Ri=S(Ni,[["render",ji]]);const Ui=o=>(W("data-v-75eeccd3"),o=o(),Z(),o),Hi={id:"actioner"},Wi={key:0,class:"action-container"},Zi={class:"action-container_header"},Ji=Ui(()=>t("div",null,null,-1)),Xi={class:"title"},Ki=["title"],Qi={class:"action-container_body"},tr=I({props:{Close:{type:Function},type:{type:Number},title:String},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(!1);_t(()=>{d.value=!0,document.body.setAttribute("lock-scroll","true")}),St(()=>{document.body.removeAttribute("lock-scroll")});const r=()=>{a.Close&&(d.value=!1,setTimeout(()=>{a.Close&&a.Close()},300))};return(p,x)=>(s(),u("div",Hi,[t("div",{class:"bg",onClick:r}),o.type!=null?wt(p.$slots,"default",{key:0},void 0,!0):(s(),u(N,{key:1},[d.value?(s(),u("div",Wi,[t("div",Zi,[Ji,t("div",Xi,i(o.title),1),t("button",{class:"close",title:e(n)("\u5173\u95ED"),onClick:r},[A(Ri)],8,Ki)]),t("div",Qi,[wt(p.$slots,"default",{},void 0,!0)])])):D("",!0)],64))]))}});var er=S(tr,[["__scopeId","data-v-75eeccd3"]]);const ot=I({props:{Close:{type:Function},type:{type:Number},title:String},setup(o){return(a,n)=>(s(),V(er,{Close:o.Close,type:o.type,title:o.title},{default:G(()=>[wt(a.$slots,"default")]),_:3},8,["Close","type","title"]))}}),ar=["onSubmit"],or={class:"actioner-dns_header"},nr={class:"actioner-dns_body"},ir={class:"label-item"},rr={class:"label-item_key"},sr={class:"label-item_value"},dr=["disabled"],ur={value:"manual"},lr={class:"label-item"},cr={class:"label-item_key"},pr={class:"label-item_value"},mr=["placeholder","onUpdate:modelValue"],fr={class:"label-item_key"},vr={class:"label-item_value"},br=["placeholder","onUpdate:modelValue"],gr={key:1,class:"label-message"},_r={class:"actioner-dns_footer"},hr=["disabled"],xr={key:1,class:"actioner-dns"},kr={class:"actioner-dns_header"},wr={class:"actioner-dns_body"},yr={class:"config-message"},Fr={class:"actioner-dns_footer"},Er=I({props:{Close:{type:Function,required:!0}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(0),r=Wt(),p=r.status,x=U(()=>r.status.proto!="static"),_=()=>{let k=p.dnsList||[];for(k=k.filter(h=>h);k.length<2;)k.push("");return k},b=E({interfaceName:p.defaultInterface||"",dnsProto:p.dnsProto||"manual",manualDnsIp:_()}),m=E(""),c=E(!1),f=()=>M(this,null,function*(){m.value="";let k={};switch(b.value.dnsProto){case"auto":break;case"manual":if(k.manualDnsIp=[],!b.value.manualDnsIp[0]){C.Error(n("\u81F3\u5C11\u9700\u8981\u586B\u5199\u4E00\u4E2ADNS"));return}k.manualDnsIp=b.value.manualDnsIp.filter(w=>w);break}k.dnsProto=b.value.dnsProto,k.interfaceName=b.value.interfaceName;const h=C.Loading(n("\u914D\u7F6E\u4E2D..."));try{const w=yield P.Guide.DnsConfig.POST(k);if(w!=null&&w.data){const{success:y,error:F}=w==null?void 0:w.data;F&&(m.value=F),(y==null||y==0)&&(C.Success(n("\u914D\u7F6E\u6210\u529F")),d.value=1)}}catch(w){m.value=w}h.Close()}),v=k=>{k.preventDefault(),a.Close&&a.Close()},g=k=>{location.reload()};return(k,h)=>(s(),V(ot,{Close:o.Close,type:1},{default:G(()=>[d.value==0?(s(),u("form",{key:0,class:"actioner-dns",onSubmit:st(f,["prevent"])},[t("div",or,[t("span",null,i(e(n)("DNS\u914D\u7F6E")),1)]),t("div",nr,[t("div",ir,[t("div",rr,[t("span",null,i(e(n)("DNS\u9009\u9879")),1)]),t("div",sr,[L(t("select",{"onUpdate:modelValue":h[0]||(h[0]=w=>b.value.dnsProto=w)},[t("option",{value:"auto",disabled:!e(x)},i(e(n)("\u81EA\u52A8\u83B7\u53D6DNS")),9,dr),t("option",ur,i(e(n)("\u81EA\u5B9A\u4E49DNS")),1)],512),[[tt,b.value.dnsProto]])])]),b.value.dnsProto=="manual"?(s(!0),u(N,{key:0},R(b.value.manualDnsIp,(w,y)=>(s(),u("div",lr,[y==0?(s(),u(N,{key:0},[t("div",cr,[t("span",null,i(e(n)("DNS\u670D\u52A1\u5668\u5730\u5740")),1)]),t("div",pr,[L(t("input",{type:"text",placeholder:e(n)("\u8BF7\u8F93\u5165DNS\u5730\u5740"),required:"","onUpdate:modelValue":F=>b.value.manualDnsIp[y]=F},null,8,mr),[[H,b.value.manualDnsIp[y],void 0,{trim:!0}]])])],64)):(s(),u(N,{key:1},[t("div",fr,i(e(n)("\u5907\u7528DNS\u670D\u52A1\u5668\u5730\u5740")),1),t("div",vr,[L(t("input",{type:"text",placeholder:e(n)("\u5907\u7528DNS\u5730\u5740"),"onUpdate:modelValue":F=>b.value.manualDnsIp[y]=F},null,8,br),[[H,b.value.manualDnsIp[y],void 0,{trim:!0}]])])],64))]))),256)):D("",!0),m.value?(s(),u("div",gr,i(m.value),1)):D("",!0)]),t("div",_r,[t("button",{class:"cbi-button cbi-button-apply app-btn",disabled:c.value},i(e(n)("\u786E\u8BA4")),9,hr),t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:v},i(e(n)("\u53D6\u6D88")),1)])],40,ar)):d.value==1?(s(),u("div",xr,[t("div",kr,[t("span",null,i(e(n)("DNS\u914D\u7F6E")),1)]),t("div",wr,[t("div",yr,i(e(n)("DNS\u914D\u7F6E\u5DF2\u4FDD\u5B58")),1)]),t("div",Fr,[t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:g},i(e(n)("\u5B8C\u6210")),1)])])):D("",!0)]),_:1},8,["Close"]))}});var Cr=S(Er,[["__scopeId","data-v-5cff2770"]]);const Se=()=>{const o=document.createElement("div");document.body.appendChild(o);const a=et(Cr,{Close:()=>{n()}});a.mount(o);const n=()=>{a.unmount(),o.remove()};return{Close:n}},$r=o=>(W("data-v-7f0d8217"),o=o(),Z(),o),Dr={class:"action"},Br={class:"action-body"},Yr=$r(()=>t("div",{class:"icon"},[t("svg",{t:"1642063181211",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"5062",width:"128",height:"128","data-v-cda444e0":""},[t("path",{d:"M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m-74.965333 550.4L346.453333 545.152a42.666667 42.666667 0 1 0-60.330666 60.330667l120.704 120.704a42.666667 42.666667 0 0 0 60.330666 0l301.653334-301.696a42.666667 42.666667 0 1 0-60.288-60.330667l-271.530667 271.488z",fill:"#52C41A","p-id":"5063","data-v-cda444e0":""})])],-1)),Ar={class:"title"},Sr={class:"info"},zr=["href"],Pr={class:"btns"},Tr=I({props:{port:Number,Close:Function},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=U(()=>`http://${location.hostname}:${a.port}`),r=()=>{a.Close&&(a.Close(),location.reload())};return(p,x)=>(s(),V(ot,{type:1},{default:G(()=>[A(ft,{name:"rotate",mode:"out-in"},{default:G(()=>[t("div",Dr,[t("div",Br,[Yr,t("h2",Ar,i(e(n)("\u670D\u52A1\u5DF2\u542F\u52A8")),1),t("div",Sr,[t("span",null,i(e(n)("\u524D\u5F80")),1),t("a",{href:e(d),target:"_blank",rel:"noopener noreferrer"},i(e(d)),9,zr),t("span",null,i(e(n)("\u8FDB\u884C\u6D4B\u901F")),1)]),t("div",Pr,[t("button",{class:"cbi-button cbi-button-remove app-btn app-back",type:"button",onClick:r},i(e(n)("\u5173\u95ED")),1)])])])]),_:1})]),_:1}))}});var Lr=S(Tr,[["__scopeId","data-v-7f0d8217"]]),Ir=o=>{const a=document.createElement("div");document.body.appendChild(a);const n=et(Lr,nt(X({},o),{Close:()=>{l()}}));n.mount(a);const l=()=>{n.unmount(),a.remove()};return{Close:l}};const ze=o=>(W("data-v-02f10ac5"),o=o(),Z(),o),Mr=ze(()=>t("div",{class:"app-container_status-label_iconer"},[t("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xmlns:v":"https://vecta.io/nano",width:"48",height:"38",viewBox:"0 0 12.7 10.05"},[t("defs",null,[t("filter",{id:"A","color-interpolation-filters":"sRGB"},[t("feColorMatrix",{result:"A",values:"2 -0.5 -0.5 0 0 -0.5 2 -0.5 0 0 -0.5 -0.5 2 0 0 0 0 0 1 0 "}),t("feColorMatrix",{values:"0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"}),t("feColorMatrix",{in:"A",values:"2 -0.5 -0.5 0 0 -0.5 2 -0.5 0 0 -0.5 -0.5 2 0 0 0 0 0 1 0 "})]),t("path",{id:"B",d:"M80.56 75.75h3.91v22.79h-3.91z"})]),t("g",{transform:"translate(0 -286.95)"},[t("rect",{x:".21",y:"287.25",width:"12.33",height:"9.5",ry:".57",fill:"#e6e6e6",stroke:"#e6e6e6","stroke-linejoin":"round","stroke-width":".37","paint-order":"normal"}),t("path",{transform:"matrix(.105 0 0 .0989 -6.0834 280.6)",d:"M73.96 75.66h89.41c2.31 0 4.17 1.86 4.17 4.17v52.65h-21.74v9.41h-8.69v12.59h-36.87v-12.59h-8.69v-9.41H69.79V79.83c0-2.31 1.86-4.17 4.17-4.17z",fill:"#999",filter:"url(#A)",stroke:"#999","stroke-width":"2.5"}),t("g",{transform:"matrix(.1048 0 0 .1048 -6.0999 280.7)",fill:"#fff",filter:"url(#A)",stroke:"#fff"},[t("use",{"xlink:href":"#B"}),t("use",{"xlink:href":"#B",x:"73.04"}),t("use",{"xlink:href":"#B",x:"52.17"}),t("use",{"xlink:href":"#B",x:"41.74"}),t("use",{"xlink:href":"#B",x:"31.3"}),t("use",{"xlink:href":"#B",x:"20.87"}),t("use",{"xlink:href":"#B",x:"10.43"}),t("use",{"xlink:href":"#B",x:"62.61"})]),t("rect",{x:"1.24",y:"294.55",width:"1.6",height:"1.38",ry:".11",fill:"#ccc",stroke:"#ccc","stroke-width":".22","paint-order":"normal"})])])],-1)),Or={class:"app-container_status-label_text"},Nr={class:"text_status"},qr={class:"text_info"},Vr=ze(()=>t("div",{class:"app-container_status-label_iconer"},[t("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"48",height:"38",viewBox:"0 0 12.7 10.05","xmlns:v":"https://vecta.io/nano"},[t("defs",null,[t("filter",{id:"A","color-interpolation-filters":"sRGB"},[t("feColorMatrix",{result:"A",values:"2 -0.5 -0.5 0 0 -0.5 2 -0.5 0 0 -0.5 -0.5 2 0 0 0 0 0 1 0 "}),t("feColorMatrix",{values:"0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"}),t("feColorMatrix",{in:"A",values:"2 -0.5 -0.5 0 0 -0.5 2 -0.5 0 0 -0.5 -0.5 2 0 0 0 0 0 1 0 "})]),t("path",{id:"B",d:"M80.56 75.75h3.91v22.79h-3.91z"})]),t("g",{transform:"translate(-.03 -287.07)"},[t("rect",{x:".24",y:"287.36",width:"12.33",height:"9.5",ry:".57",fill:"#e6e6e6",stroke:"#e6e6e6","stroke-linejoin":"round","stroke-width":".37","paint-order":"normal"}),t("path",{transform:"matrix(.105 0 0 .0989 -6.0532 280.72)",d:"M73.96 75.66h89.41c2.31 0 4.17 1.86 4.17 4.17v52.65h-21.74v9.41h-8.69v12.59h-36.87v-12.59h-8.69v-9.41H69.79V79.83c0-2.31 1.86-4.17 4.17-4.17z",fill:"#4d4d4d",filter:"url(#A)",stroke:"#4d4d4d","stroke-width":"2.5"}),t("g",{transform:"matrix(.1048 0 0 .1048 -6.0697 280.81)",fill:"#fff",filter:"url(#A)",stroke:"#fff"},[t("use",{"xlink:href":"#B"}),t("use",{"xlink:href":"#B",x:"73.04"}),t("use",{"xlink:href":"#B",x:"52.17"}),t("use",{"xlink:href":"#B",x:"41.74"}),t("use",{"xlink:href":"#B",x:"31.3"}),t("use",{"xlink:href":"#B",x:"20.87"}),t("use",{"xlink:href":"#B",x:"10.43"}),t("use",{"xlink:href":"#B",x:"62.61"})]),t("rect",{x:"1.27",y:"294.67",width:"1.6",height:"1.38",ry:".11",fill:"#55d400",stroke:"#55d400","stroke-width":".22","paint-order":"normal"})])])],-1)),Gr={class:"app-container_status-label_text"},jr={class:"text_info"},Rr=I({props:{item:{type:Object,required:!0},transform:{type:Number,default:0}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=$e(),r=E(null),p=_=>{const b=_.target,{left:m,top:c}=b.getBoundingClientRect();d.portitemStyle.show=!0,d.portitemStyle.left=m,d.portitemStyle.top=c,d.portitemStyle.portitem=a.item},x=_=>{d.portitemStyle.show=!1};return(_,b)=>(s(),u("div",{class:"app-container_status-label_bg",style:Yt(`transform: translateX(${o.transform}px);`),ref_key:"el",ref:r,onMouseenter:p,onMouseleave:x},[o.item.linkState=="DOWN"?(s(),u(N,{key:0},[Mr,t("div",Or,[t("div",Nr,i(e(n)("\u5DF2\u65AD\u5F00")),1),t("div",qr,i(o.item.name)+" "+i(o.item.interfaceNames?`(${o.item.interfaceNames.join(",").toLocaleUpperCase()})`:""),1)])],64)):(s(),u(N,{key:1},[Vr,t("div",Gr,[t("div",null,i(o.item.linkSpeed),1),t("div",jr,i(o.item.name)+" "+i(o.item.interfaceNames?`(${o.item.interfaceNames.join(",").toLocaleUpperCase()})`:""),1)])],64))],36))}});var Pe=S(Rr,[["__scopeId","data-v-02f10ac5"]]);const Te=o=>(W("data-v-3470ca08"),o=o(),Z(),o),Ur=Te(()=>t("span",null,i("<"),-1)),Hr=[Ur],Wr=Te(()=>t("span",null,i(">"),-1)),Zr=[Wr],Jr=I({props:{portList:{type:Array,required:!0}},setup(o){const a=E(),n=E(0),l=E(0),d=E(0),r=E(!1),p=()=>{if(d.value>=0){d.value=0;return}d.value+=100},x=()=>{if(d.value<=0-n.value+l.value){d.value=0-n.value+l.value;return}d.value-=100};return _t(()=>{ra(()=>{a.value&&(n.value=a.value.scrollWidth,l.value=a.value.clientWidth,r.value=n.value>l.value)})}),(_,b)=>(s(),u("div",{class:"app-interfaces",ref_key:"el",ref:a},[r.value?(s(),u(N,{key:0},[t("a",{class:"btn-f",onClick:p},Hr),t("a",{class:"btn-r",onClick:x},Zr)],64)):D("",!0),(s(!0),u(N,null,R(o.portList,(m,c)=>(s(),V(Pe,{item:m,transform:d.value},null,8,["item","transform"]))),256))],512))}});var Xr=S(Jr,[["__scopeId","data-v-3470ca08"]]);const Kr={},Qr={width:"82px",height:"82px",viewBox:"0 0 82 82",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},ts=$t('<g id="icon_finished" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="circle" transform="translate(2.000000, 2.000000)"><circle id="Oval" stroke="#553AFE" stroke-width="4" cx="39" cy="39" r="39"></circle><circle id="Oval" fill="#553AFE" cx="39.028463" cy="39.028463" r="35.028463"></circle><path d="M41.0148619,52.8014169 C39.924327,53.7754409 39.8138203,55.4674462 40.7680384,56.5806164 C41.7222564,57.6937867 43.3798562,57.8065871 44.4703911,56.8325631 L54.9654709,47.4587599 C56.1301083,46.4185505 56.1643255,44.5807064 55.0392485,43.4960788 L31.4253189,20.7311283 C30.3718273,19.7155123 28.7112257,19.7639428 27.7162614,20.8393009 C26.7212971,21.914659 26.7687429,23.6097284 27.8222345,24.6253444 L49.3379698,45.3675358 L41.0148619,52.8014169 Z" id="Shape" fill="#FFFFFF" fill-rule="nonzero" transform="translate(41.430740, 38.747628) rotate(-270.000000) translate(-41.430740, -38.747628) "></path></g></g>',1),es=[ts];function as(o,a){return s(),u("svg",Qr,es)}var ie=S(Kr,[["render",as]]);const os=["onSubmit"],ns={class:"actioner-dns_header"},is={class:"actioner-dns_body"},rs={class:"label-item"},ss={class:"label-item_key"},ds={class:"label-item_value"},us={class:"item_info"},ls={class:"label-item"},cs={class:"label-item_key"},ps={class:"label-item_value"},ms={selected:"true",value:""},fs=["value"],vs={class:"actioner-dns_footer"},bs=["disabled"],gs={key:1,class:"actioner-dns"},_s={class:"actioner-dns_header"},hs={class:"softsource_tit"},xs={class:"actioner-dns_body"},ks={class:"finished"},ws={class:"successed"},ys={class:"btns"},Fs=I({props:{Close:{type:Function,required:!0}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(0),r=E(""),p=E(),x=E();(()=>{P.Guide.SoftSourceList.GET().then(f=>{var v,g;if((v=f==null?void 0:f.data)!=null&&v.result){const k=(g=f==null?void 0:f.data)==null?void 0:g.result;x.value=k}}).then(()=>P.Guide.GetSoftSource.GET()).then(f=>{var v,g;if((v=f==null?void 0:f.data)!=null&&v.result){const k=f.data.result;p.value=k.softSource,(g=x.value)!=null&&g.softSourceList.find(h=>h.identity==k.softSource.identity)&&(r.value=k.softSource.identity)}})})();const b=f=>{f.preventDefault(),a.Close&&a.Close()},m=f=>{const v=C.Loading(n("\u6B63\u5728\u5207\u6362\u4E2D..."));P.Guide.SoftSource.POST({softSourceIdentity:r.value}).then(g=>{if(g!=null&&g.data){if((g.data.success||0)==0){d.value=1;return}else if(g.data.error)throw g.data.error}throw n("\u672A\u77E5\u9519\u8BEF")}).catch(g=>{C.Error(g)}).finally(()=>v.Close())},c=f=>{f.preventDefault(),location.reload()};return(f,v)=>(s(),V(ot,{Close:o.Close,type:1},{default:G(()=>{var g,k;return[d.value==0?(s(),u("form",{key:0,class:"actioner-dns",onSubmit:st(m,["prevent"])},[t("div",ns,[t("span",null,i(e(n)("\u8F6F\u4EF6\u6E90\u914D\u7F6E")),1)]),t("div",is,[t("div",rs,[t("div",ss,[t("span",null,i(e(n)("\u5F53\u524D\u8F6F\u4EF6\u6E90")),1)]),t("div",ds,[t("p",us,i((g=p.value)==null?void 0:g.name),1)])]),t("div",ls,[t("div",cs,[t("span",null,i(e(n)("\u5207\u6362\u8F6F\u4EF6\u6E90")),1)]),t("div",ps,[L(t("select",{name:"",id:"","onUpdate:modelValue":v[0]||(v[0]=h=>r.value=h)},[t("option",ms,i(e(n)("\u8BF7\u9009\u62E9\u8F6F\u4EF6\u6E90")),1),(s(!0),u(N,null,R((k=x.value)==null?void 0:k.softSourceList,(h,w)=>(s(),u("option",{value:h.identity,key:w},i(h.name),9,fs))),128))],512),[[tt,r.value,void 0,{trim:!0}]])])])]),t("div",vs,[t("button",{class:"cbi-button cbi-button-apply app-btn",disabled:r.value==""},i(e(n)("\u786E\u8BA4")),9,bs),t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:b},i(e(n)("\u53D6\u6D88")),1)])],40,os)):D("",!0),d.value==1?(s(),u("form",gs,[t("div",_s,[t("span",hs,i(e(n)("\u8F6F\u4EF6\u6E90\u914D\u7F6E")),1)]),t("div",xs,[t("div",ks,[A(ie)]),t("p",ws,i(e(n)("\u914D\u7F6E\u6210\u529F\uFF01")),1),t("div",ys,[t("button",{class:"cbi-button cbi-button-apply softsource_successed",onClick:c},i(e(n)("\u786E\u5B9A")),1)])])])):D("",!0)]}),_:1},8,["Close"]))}});var Es=S(Fs,[["__scopeId","data-v-3f8f9931"]]);const Le=()=>{const o=document.createElement("div");document.body.appendChild(o);const a=et(Es,{Close:()=>{n()}});a.mount(o);const n=()=>{a.unmount(),o.remove()};return{Close:n}},yt=o=>(W("data-v-08006dd5"),o=o(),Z(),o),Cs={class:"app-container_status-label"},$s={class:"app-container_status-label_item",style:{"padding-right":"10px"}},Ds={class:"app-container_status-container",style:{height:"100%"}},Bs={key:0,class:"app-container_status-container_body"},Ys=yt(()=>t("svg",{width:"50px",height:"50px",viewBox:"0 0 50 50",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},[t("g",{id:"icon_internet-connected",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},[t("g",{id:"wancheng","fill-rule":"nonzero"},[t("path",{d:"M0,25 C0,33.9316396 4.76497292,42.1848151 12.5,46.6506351 C20.2350269,51.116455 29.7649731,51.116455 37.5,46.6506351 C45.2350271,42.1848151 50,33.9316396 50,25 C50,11.1928812 38.8071187,0 25,0 C11.1928813,0 0,11.1928812 0,25 Z",id:"Path","fill-opacity":"0.0779329313",fill:"#553AFE"}),t("g",{id:"Group-2",transform:"translate(10.000000, 10.000000)"},[t("path",{d:"M0,15 C0,20.3589838 2.85898375,25.3108891 7.5,27.990381 C12.1410161,30.669873 17.8589839,30.669873 22.5,27.990381 C27.1410162,25.3108891 30,20.3589838 30,15 C30,6.7157287 23.2842712,0 15,0 C6.71572875,0 0,6.7157287 0,15 Z",id:"Path",fill:"#553AFE"}),t("path",{d:"M8,15 L13.2546984,20.2546984 C13.6452227,20.6452227 14.2783876,20.6452227 14.6689119,20.2546984 C14.6813066,20.2423037 14.6933732,20.2295853 14.7050993,20.2165563 L23,11 L23,11",id:"Path-3",stroke:"#FFFFFF","stroke-width":"2","stroke-linecap":"round"})])])])],-1)),As={class:"app-container_status-info"},Ss={class:"container_success"},zs={class:"container_time"},Ps={key:1,class:"app-container_status-container_body"},Ts=yt(()=>t("svg",{width:"50px",height:"50px",viewBox:"0 0 50 50",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},[t("g",{id:"icon_internet-alert",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},[t("g",{id:"wancheng"},[t("path",{d:"M0,25 C0,33.9316396 4.76497292,42.1848151 12.5,46.6506351 C20.2350269,51.116455 29.7649731,51.116455 37.5,46.6506351 C45.2350271,42.1848151 50,33.9316396 50,25 C50,11.1928812 38.8071187,0 25,0 C11.1928813,0 0,11.1928812 0,25 Z",id:"Path","fill-opacity":"0.08",fill:"#FAAD14","fill-rule":"nonzero"}),t("g",{id:"Group-2",transform:"translate(10.000000, 10.000000)"},[t("path",{d:"M0,15 C0,20.3589838 2.85898375,25.3108891 7.5,27.990381 C12.1410161,30.669873 17.8589839,30.669873 22.5,27.990381 C27.1410162,25.3108891 30,20.3589838 30,15 C30,6.7157287 23.2842712,0 15,0 C6.71572875,0 0,6.7157287 0,15 Z",id:"Path",fill:"#FAAD14","fill-rule":"nonzero"}),t("path",{d:"M15,6 C15.8284271,6 16.5,6.67157288 16.5,7.5 L16.5,18.5 C16.5,19.3284271 15.8284271,20 15,20 C14.1715729,20 13.5,19.3284271 13.5,18.5 L13.5,7.5 C13.5,6.67157288 14.1715729,6 15,6 Z",id:"\u8DEF\u5F84",fill:"#FFFFFF"}),t("path",{d:"M15,25 C14.171875,25 13.5,24.328125 13.5,23.5 C13.5,22.671875 14.171875,22 15,22 C15.828125,22 16.5,22.671875 16.5,23.5 C16.5,24.328125 15.828125,25 15,25 Z",id:"\u8DEF\u5F84",fill:"#FFFFFF"})])])])],-1)),Ls={class:"app-container_status-info"},Is={class:"container_failure"},Ms={class:"container_time"},Os={key:2,class:"app-container_status-container_body"},Ns=yt(()=>t("svg",{width:"50px",height:"50px",viewBox:"0 0 50 50",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},[t("g",{id:"icon_internet-alert",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},[t("g",{id:"wancheng"},[t("path",{d:"M0,25 C0,33.9316396 4.76497292,42.1848151 12.5,46.6506351 C20.2350269,51.116455 29.7649731,51.116455 37.5,46.6506351 C45.2350271,42.1848151 50,33.9316396 50,25 C50,11.1928812 38.8071187,0 25,0 C11.1928813,0 0,11.1928812 0,25 Z",id:"Path","fill-opacity":"0.08",fill:"#FAAD14","fill-rule":"nonzero"}),t("g",{id:"Group-2",transform:"translate(10.000000, 10.000000)"},[t("path",{d:"M0,15 C0,20.3589838 2.85898375,25.3108891 7.5,27.990381 C12.1410161,30.669873 17.8589839,30.669873 22.5,27.990381 C27.1410162,25.3108891 30,20.3589838 30,15 C30,6.7157287 23.2842712,0 15,0 C6.71572875,0 0,6.7157287 0,15 Z",id:"Path",fill:"#FAAD14","fill-rule":"nonzero"}),t("path",{d:"M15,6 C15.8284271,6 16.5,6.67157288 16.5,7.5 L16.5,18.5 C16.5,19.3284271 15.8284271,20 15,20 C14.1715729,20 13.5,19.3284271 13.5,18.5 L13.5,7.5 C13.5,6.67157288 14.1715729,6 15,6 Z",id:"\u8DEF\u5F84",fill:"#FFFFFF"}),t("path",{d:"M15,25 C14.171875,25 13.5,24.328125 13.5,23.5 C13.5,22.671875 14.171875,22 15,22 C15.828125,22 16.5,22.671875 16.5,23.5 C16.5,24.328125 15.828125,25 15,25 Z",id:"\u8DEF\u5F84",fill:"#FFFFFF"})])])])],-1)),qs={class:"app-container_status-info"},Vs={class:"container_failure"},Gs={class:"container_time"},js={key:3,class:"app-container_status-container_body"},Rs=yt(()=>t("svg",{width:"50px",height:"50px",viewBox:"0 0 50 50",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},[t("g",{id:"icon_internet-alert",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},[t("g",{id:"wancheng"},[t("path",{d:"M0,25 C0,33.9316396 4.76497292,42.1848151 12.5,46.6506351 C20.2350269,51.116455 29.7649731,51.116455 37.5,46.6506351 C45.2350271,42.1848151 50,33.9316396 50,25 C50,11.1928812 38.8071187,0 25,0 C11.1928813,0 0,11.1928812 0,25 Z",id:"Path","fill-opacity":"0.08",fill:"#FAAD14","fill-rule":"nonzero"}),t("g",{id:"Group-2",transform:"translate(10.000000, 10.000000)"},[t("path",{d:"M0,15 C0,20.3589838 2.85898375,25.3108891 7.5,27.990381 C12.1410161,30.669873 17.8589839,30.669873 22.5,27.990381 C27.1410162,25.3108891 30,20.3589838 30,15 C30,6.7157287 23.2842712,0 15,0 C6.71572875,0 0,6.7157287 0,15 Z",id:"Path",fill:"#FAAD14","fill-rule":"nonzero"}),t("path",{d:"M15,6 C15.8284271,6 16.5,6.67157288 16.5,7.5 L16.5,18.5 C16.5,19.3284271 15.8284271,20 15,20 C14.1715729,20 13.5,19.3284271 13.5,18.5 L13.5,7.5 C13.5,6.67157288 14.1715729,6 15,6 Z",id:"\u8DEF\u5F84",fill:"#FFFFFF"}),t("path",{d:"M15,25 C14.171875,25 13.5,24.328125 13.5,23.5 C13.5,22.671875 14.171875,22 15,22 C15.828125,22 16.5,22.671875 16.5,23.5 C16.5,24.328125 15.828125,25 15,25 Z",id:"\u8DEF\u5F84",fill:"#FFFFFF"})])])])],-1)),Us={class:"app-container_status-info"},Hs={class:"container_failure"},Ws={class:"container_time"},Zs={key:4,class:"app-container_status-container_body"},Js=yt(()=>t("svg",{width:"50px",height:"50px",viewBox:"0 0 50 50",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},[t("g",{id:"icon_internet-launching",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},[t("g",{id:"wancheng","fill-rule":"nonzero"},[t("path",{d:"M0,25 C0,33.9316396 4.76497292,42.1848151 12.5,46.6506351 C20.2350269,51.116455 29.7649731,51.116455 37.5,46.6506351 C45.2350271,42.1848151 50,33.9316396 50,25 C50,11.1928812 38.8071187,0 25,0 C11.1928813,0 0,11.1928812 0,25 Z",id:"Path","fill-opacity":"0.08",fill:"#3ED4AB"}),t("g",{id:"Group-2",transform:"translate(10.000000, 10.000000)"},[t("path",{d:"M0,15 C0,20.3589838 2.85898375,25.3108891 7.5,27.990381 C12.1410161,30.669873 17.8589839,30.669873 22.5,27.990381 C27.1410162,25.3108891 30,20.3589838 30,15 C30,6.7157287 23.2842712,0 15,0 C6.71572875,0 0,6.7157287 0,15 Z",id:"Path",fill:"#3ED4AB"}),t("path",{d:"M11.5738525,15.0233901 C11.5738525,14.8431935 11.5023882,14.6703653 11.3750746,14.5429471 C11.2477609,14.4155288 11.0750745,14.3439644 10.8950258,14.3440059 L7.67882684,14.3440059 C7.49875102,14.3439644 7.326041,14.4155503 7.19872281,14.5430024 C7.07140462,14.6704545 6.99991721,14.8433228 7.00000007,15.0235465 C7.00000007,15.2037431 7.0714644,15.3765713 7.19877809,15.5039895 C7.32609178,15.6314078 7.4987781,15.7029722 7.67882684,15.7029307 L10.8950258,15.7029307 C11.0750745,15.7029722 11.2477609,15.6314078 11.3750746,15.5039895 C11.5023882,15.3765713 11.5738525,15.2037431 11.5738525,15.0235465 L11.5738525,15.0233901 Z M22.3211553,14.3440059 L19.1049564,14.3440059 C18.9248806,14.3439644 18.7521705,14.4155503 18.6248524,14.5430024 C18.4975342,14.6704545 18.4260468,14.8433228 18.4261296,15.0235465 C18.4261296,15.2037431 18.4975939,15.3765713 18.6249076,15.5039895 C18.7522213,15.6314078 18.9249076,15.7029722 19.1049564,15.7029307 L22.3211553,15.7029307 C22.5012041,15.7029722 22.6738904,15.6314078 22.8012041,15.5039895 C22.9285178,15.3765713 22.9999911,15.2037431 22.9999911,15.0235465 C23.0019042,14.6481319 22.6962619,14.3440059 22.3211553,14.3440059 Z M15.0075079,18.6494887 C14.8274565,18.6494887 14.6547678,18.7210138 14.5274536,18.8484354 C14.4001395,18.9758571 14.3286356,19.1486892 14.3286812,19.3288885 L14.3286812,22.3206158 C14.3286398,22.5008124 14.4001455,22.6736405 14.5274592,22.8010588 C14.6547729,22.928477 14.8274592,23 15.0075079,23 C15.1875567,23 15.360243,22.928477 15.4875567,22.8010588 C15.6148704,22.6736405 15.6863761,22.5008124 15.6863348,22.3206158 L15.6863348,19.3308123 C15.6866114,18.9551699 15.3828413,18.6502825 15.0075079,18.6494887 Z M15.0075079,7 C14.8274592,7 14.6547729,7.07152297 14.5274592,7.19894122 C14.4001455,7.32635946 14.3286398,7.49918761 14.3286812,7.67938422 L14.3286812,10.8982245 C14.3286398,11.0784212 14.4001455,11.2512493 14.5274592,11.3786675 C14.6547729,11.5060858 14.8274592,11.5776088 15.0075079,11.5776088 C15.1875567,11.5776088 15.360243,11.5060858 15.4875567,11.3786675 C15.6148704,11.2512493 15.6863761,11.0784212 15.6863346,10.8982245 L15.6863346,7.67938422 C15.6863761,7.49918761 15.6148704,7.32635946 15.4875567,7.19894122 C15.360243,7.07152297 15.1875567,7 15.0075079,7 Z M11.6020132,17.4145291 L9.32916742,19.6892415 C9.06467707,19.9548666 9.06467707,20.3845576 9.32916742,20.6501827 C9.45618492,20.7780764 9.62906847,20.8497648 9.80924376,20.8492554 C9.98367775,20.8492554 10.1560177,20.783579 10.2893201,20.6501827 L12.5637599,18.3738593 C12.8282503,18.1082342 12.8282503,17.6785432 12.5637599,17.4129181 C12.2975184,17.147886 11.8671244,17.1486768 11.601857,17.4146855 L11.6020132,17.4145291 Z M17.8766048,12.7750942 C18.0510388,12.7750942 18.2236912,12.7094361 18.3566811,12.5760242 L20.6314491,10.29956 C20.8959395,10.0339349 20.8959395,9.6042439 20.6314491,9.3386188 C20.366042,9.07391123 19.9367036,9.07391123 19.6712965,9.3386188 L17.3966847,11.6133312 C17.1321944,11.8789563 17.1321944,12.3086474 17.3966847,12.5742725 C17.5235351,12.7026276 17.6963754,12.7749288 17.8767611,12.7750942 L17.8766048,12.7750942 Z M18.5349595,17.572293 C18.2695524,17.3075854 17.8402139,17.3075854 17.5748068,17.572293 C17.3103165,17.8379181 17.3103165,18.2676091 17.5748068,18.5332342 L19.6882679,20.6501827 C19.8152854,20.7780764 19.988169,20.8497648 20.1683442,20.8492554 C20.342747,20.8492554 20.5152744,20.783579 20.6484206,20.6501827 C20.9129109,20.3845576 20.9129109,19.9548666 20.6484206,19.6892415 L18.5349595,17.5722773 L18.5349595,17.572293 Z M10.2891638,9.35734026 C10.0237567,9.09263269 9.59441827,9.09263269 9.32901114,9.35734026 C9.06452079,9.62296536 9.06452079,10.0526564 9.32901114,10.3182815 L11.6037635,12.594902 C11.7308042,12.7227441 11.9036849,12.7943806 12.0838399,12.7938344 C12.2582738,12.7938344 12.43077,12.7281576 12.5639162,12.594902 C12.8284065,12.3292769 12.8284065,11.8995859 12.5639162,11.6339608 L10.2891638,9.3573559 L10.2891638,9.35734026 Z",id:"Shape",fill:"#FFFFFF"})])])])],-1)),Xs={class:"app-container_status-info"},Ks={class:"container_failure"},Qs={class:"app-container_status-label_item",style:{"padding-left":"10px"}},td={class:"app-container_status-container",style:{height:"100%"}},ed=["title"],ad={class:"DeviceBlock"},od={href:"/cgi-bin/luci/admin/status/routes"},nd={class:"app-container_status-container_body"},id=yt(()=>t("svg",{width:"50px",height:"50px",viewBox:"0 0 50 50",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},[t("g",{id:"icon_device-number",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},[t("g",{id:"wancheng","fill-rule":"nonzero"},[t("path",{d:"M0,25 C0,33.9316396 4.76497292,42.1848151 12.5,46.6506351 C20.2350269,51.116455 29.7649731,51.116455 37.5,46.6506351 C45.2350271,42.1848151 50,33.9316396 50,25 C50,11.1928812 38.8071187,0 25,0 C11.1928813,0 0,11.1928812 0,25 Z",id:"Path","fill-opacity":"0.0804503114",fill:"#03C5FC"}),t("g",{id:"Group-2",transform:"translate(10.000000, 10.000000)"},[t("path",{d:"M0,15 C0,20.3589838 2.85898375,25.3108891 7.5,27.990381 C12.1410161,30.669873 17.8589839,30.669873 22.5,27.990381 C27.1410162,25.3108891 30,20.3589838 30,15 C30,6.7157287 23.2842712,0 15,0 C6.71572875,0 0,6.7157287 0,15 Z",id:"Path",fill:"#03C5FC"}),t("g",{id:"kehuduanIP",transform:"translate(5.000000, 7.000000)",fill:"#FFFFFF"},[t("path",{d:"M8.3164557,11.2822134 L2.39240506,11.2822134 C2.25316456,11.2822134 2.13924051,11.1683794 2.13924051,11.029249 L2.13924051,1.39130435 C2.13924051,1.25217391 2.25316456,1.13833992 2.39240506,1.13833992 L16.6075949,1.13833992 C16.7468354,1.13833992 16.8607595,1.25217391 16.8607595,1.39130435 L16.8607595,3.51620553 C17.2658228,3.5541502 17.6582278,3.69328063 18,3.9083004 L18,1.39130435 C18,0.619762846 17.3797468,0 16.6075949,0 L2.39240506,0 C1.62025316,0 1,0.619762846 1,1.39130435 L1,11.029249 C1,11.8007905 1.62025316,12.4205534 2.39240506,12.4205534 L7.15189873,12.4205534 L7.15189873,14.2798419 L6.40506329,14.2798419 C5.93670886,14.2798419 5.5443038,14.6592885 5.5443038,15.1399209 C5.5443038,15.6079051 5.92405063,16 6.40506329,16 L8.79746835,16 C8.48101266,15.5699605 8.3164557,15.0513834 8.3164557,14.5201581 L8.3164557,11.2822134 Z",id:"Path"}),t("path",{d:"M12.4062969,15.2371365 L12.4062969,14.0436242 L10.0074963,14.0436242 L10.0074963,6.39038031 C10.0074963,6.23042506 10.1394303,6.10738255 10.2833583,6.10738255 L15.6446777,6.10738255 C15.8005997,6.10738255 15.9205397,6.24272931 15.9205397,6.39038031 L15.9205397,8.77740492 L16.3283358,8.77740492 C16.5682159,8.77740492 16.7961019,8.85123043 17,8.97427293 L17,6.39038031 C17,5.62751678 16.3883058,5 15.6446777,5 L10.3313343,5 C9.58770615,5.0246085 9,5.63982103 9,6.39038031 L9,14.6465324 C9.02398801,15.3847875 9.61169415,15.9753915 10.3313343,16 L12.6581709,16 C12.5022489,15.7785235 12.4182909,15.50783 12.4062969,15.2371365 C12.4062969,15.2248322 12.4062969,15.2371365 12.4062969,15.2371365 L12.4062969,15.2371365 Z",id:"Path"}),t("path",{d:"M17.1515152,10 L13.8484848,10 C13.3787879,10 13,10.2857143 13,10.64 L13,15.36 C13,15.7142857 13.3787879,16 13.8484848,16 L17.1515152,16 C17.6212121,16 18,15.7142857 18,15.36 L18,10.64 C18,10.2857143 17.6212121,10 17.1515152,10 Z M14.0151515,10.7657143 L16.9848485,10.7657143 L16.9848485,14.8457143 L14.0151515,14.8457143 L14.0151515,10.7657143 L14.0151515,10.7657143 Z M15.4545455,15.6914286 C15.2575758,15.6914286 15.1060606,15.5657143 15.1060606,15.4285714 C15.1060606,15.28 15.2727273,15.1657143 15.469697,15.1657143 C15.6666667,15.1657143 15.8181818,15.2914286 15.8181818,15.44 C15.8181818,15.5085714 15.7727273,15.5885714 15.6969697,15.6342857 C15.6363636,15.68 15.5454545,15.7028571 15.4545455,15.6914286 C15.4545455,15.7028571 15.4545455,15.6914286 15.4545455,15.6914286 L15.4545455,15.6914286 Z",id:"Shape"})])])])])],-1)),rd={class:"app-container_status-info"},sd={class:"container_content"},dd={class:"devise"},ud=yt(()=>t("em",null,null,-1)),ld={class:"app-container_status-container"},cd=["title"],pd={class:"DeviceBlock"},md={class:"app-container_title"},fd={class:"app-container_status-label_block"},vd={class:"app-container_status-label_block"},bd={class:"app-container_title"},gd={class:"app-container_status-label_block"},_d=yt(()=>t("em",null,null,-1)),hd={class:"app-container_status-container"},xd={class:"app-container_title"},kd=["title"],wd={class:"DeviceBlock"},yd={class:"app-container_body"},Fd=I({props:{homebox:{type:Object}},setup(o){const{$gettext:a,$ngettext:n}=q(),l=()=>{Se()},d=()=>{Le()},r=Wt(),p=U(()=>r.status),x=U(()=>r.deviceList),_=E(!1),b=E(!1),m=E(!1),c=dt({portList:[],load:!1}),f=$=>{switch($){case"pppoe":return a("\u62E8\u53F7\u4E0A\u7F51");case"static":return a("\u9759\u6001\u7F51\u7EDC");case"dhcp":return"DHCP"}return $&&$.toUpperCase()},v=$=>{switch($){case"manual":return a("\u624B\u52A8\u914D\u7F6E");case"auto":return a("\u81EA\u52A8\u83B7\u53D6");default:return""}},g=()=>{(c.load&&document.hidden?Promise.resolve():P.Network.PortList.GET().then($=>{if($!=null&&$.data){const{result:z}=$==null?void 0:$.data;z&&(c.portList=z.ports||[])}})).finally(()=>{c.load=!0,setTimeout(g,1e4)})};g();const k=gt.stampForm,h=()=>{_.value=!_.value},w=()=>{b.value=!b.value},y=()=>{m.value=!m.value},F=()=>{h(),ut.installAndGo("app-meta-nlbwmon",a("\u5E26\u5BBD\u76D1\u63A7"),"/cgi-bin/luci/admin/services/nlbw")},B=()=>M(this,null,function*(){var $,z,T;if(w(),yield ut.checkAndInstallApp("app-meta-homebox","Homebox"))try{const J=yield P.Network.Homebox.Enable.POST();(z=($=J==null?void 0:J.data)==null?void 0:$.result)!=null&&z.port?Ir({port:J.data.result.port,setup:0}):((T=J==null?void 0:J.data)==null?void 0:T.success)==0?location.href="/cgi-bin/luci/admin/services/homebox":C.Warning(a("\u542F\u52A8\u5931\u8D25"))}catch(J){C.Warning(a("\u542F\u52A8\u5931\u8D25"))}}),Y=()=>{w(),ut.installAndGo("app-meta-systools","SysTools","/cgi-bin/luci/admin/system/systools/pages")};return($,z)=>{var J,j;const T=K("router-link");return s(),u(N,null,[t("div",Cs,[t("div",$s,[t("div",Ds,[e(p)!=null?(s(),u(N,{key:0},[e(p).networkInfo=="netSuccess"?(s(),u("div",Bs,[Ys,t("div",As,[t("span",Ss,i(e(a)("\u5DF2\u8054\u7F51")),1),t("span",zs,i(e(k)(e(p).uptimeStamp)),1)])])):e(p).networkInfo=="dnsFailed"?(s(),u("div",Ps,[Ts,t("div",Ls,[t("span",Is,i(e(a)("DNS\u9519\u8BEF")),1),t("span",Ms,i(e(k)(e(p).uptimeStamp)),1),t("div",{onClick:l,class:"container_configure"},i(e(a)("DNS\u914D\u7F6E")),1)])])):e(p).networkInfo=="softSourceFailed"?(s(),u("div",Os,[Ns,t("div",qs,[t("span",Vs,i(e(a)("\u8F6F\u4EF6\u6E90\u9519\u8BEF")),1),t("span",Gs,i(e(k)(e(p).uptimeStamp)),1),t("div",{onClick:d,class:"container_configure"},i(e(a)("\u8F6F\u4EF6\u6E90\u914D\u7F6E")),1)])])):e(p).networkInfo=="netFailed"?(s(),u("div",js,[Rs,t("div",Us,[t("span",Hs,i(e(a)("\u672A\u8054\u7F51")),1),t("span",Ws,i(e(k)(e(p).uptimeStamp)),1)])])):(s(),u("div",Zs,[Js,t("div",Xs,[t("span",Ks,i(e(a)("\u68C0\u6D4B\u4E2D...")),1)])]))],64)):D("",!0)])]),t("div",Qs,[t("div",td,[t("span",{class:"more_icon",title:e(a)("\u67E5\u770B\u8BBE\u5907\u4FE1\u606F")},[A(kt,{onClick:h})],8,ed),L(t("div",ad,[t("div",{class:"menu_background",onClick:h}),t("ul",null,[t("li",null,[t("a",od,i(e(a)("\u8BBE\u5907\u8DEF\u7531")),1)]),t("li",null,[t("a",{onClick:F},i(e(a)("\u5E26\u5BBD\u76D1\u63A7")),1)])])],512),[[bt,_.value]]),t("div",nd,[id,t("div",rd,[t("span",sd,i(((j=(J=e(x))==null?void 0:J.devices)==null?void 0:j.length)||0),1),t("span",dd,i(e(a)("\u5DF2\u8FDE\u63A5\u8BBE\u5907")),1)])])])])]),ud,t("div",ld,[t("span",{class:"more_icon",title:e(a)("\u6D4B\u901F")},[A(kt,{onClick:w})],8,cd),L(t("div",pd,[t("div",{class:"menu_background",onClick:w}),t("ul",null,[t("li",null,[t("a",{onClick:B},i(e(a)("\u5185\u7F51\u6D4B\u901F")),1)]),t("li",null,[t("a",{onClick:Y},i(e(a)("\u5916\u7F51\u6D4B\u901F")),1)])])],512),[[bt,b.value]]),t("div",md,[t("span",null,i(e(a)("IP\u5730\u5740"))+"\uFF08"+i(e(p).defaultInterface)+"\uFF09",1)]),t("div",fd,[t("span",null," IPv4: "+i(e(p).ipv4addr)+" \uFF08"+i(f(e(p).proto||""))+"\uFF09 ",1)]),t("div",vd,[t("span",null,"IPv6: "+i(e(p).ipv6addr),1)]),t("div",bd,[t("span",null,"DNS\uFF08"+i(v(e(p).dnsProto))+"\uFF09",1)]),(s(!0),u(N,null,R(e(p).dnsList,Q=>(s(),u("div",gd,[t("span",null,i(Q),1)]))),256))]),_d,t("div",hd,[t("div",xd,[t("span",null,i(e(a)("\u7F51\u7EDC\u63A5\u53E3\u72B6\u6001")),1),t("span",{class:"more_icon",title:e(a)("\u67E5\u770B\u7F51\u7EDC\u63A5\u53E3\u4FE1\u606F")},[A(kt,{onClick:y})],8,kd),L(t("div",wd,[t("div",{class:"menu_background",onClick:y}),t("ul",null,[t("li",null,[A(T,{to:"/interfaceconfig"},{default:G(()=>[at(i(e(a)("\u7F51\u53E3\u914D\u7F6E")),1)]),_:1})])])],512),[[bt,m.value]])]),t("div",yd,[e(c).load?(s(),V(Xr,{key:0,portList:e(c).portList},null,8,["portList"])):D("",!0)])])],64)}}});var Ed=S(Fd,[["__scopeId","data-v-08006dd5"]]);const Cd={class:"network-container"},$d={class:"network-container_flow"},Dd={class:"network-container_flow-container"},Bd={class:"network-container_status"},Yd=I({setup(o){return(a,n)=>(s(),u("div",Cd,[t("div",$d,[t("div",Dd,[A(gi)])]),t("div",Bd,[A(Ed)])]))}});var Ad=S(Yd,[["__scopeId","data-v-569bbceb"]]);const Sd={},zd={width:"14px",height:"14px",viewBox:"0 0 14 14",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},Pd=t("g",{id:"icon_alert",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},[t("g",{id:"Icon/Warning"},[t("rect",{id:"\u77E9\u5F62",fill:"#000000","fill-rule":"nonzero",opacity:"0",x:"0",y:"0",width:"14",height:"14"}),t("path",{d:"M7,0.875 C3.61757813,0.875 0.875,3.61757813 0.875,7 C0.875,10.3824219 3.61757813,13.125 7,13.125 C10.3824219,13.125 13.125,10.3824219 13.125,7 C13.125,3.61757813 10.3824219,0.875 7,0.875 Z M6.5625,4.046875 C6.5625,3.98671875 6.61171875,3.9375 6.671875,3.9375 L7.328125,3.9375 C7.38828125,3.9375 7.4375,3.98671875 7.4375,4.046875 L7.4375,7.765625 C7.4375,7.82578125 7.38828125,7.875 7.328125,7.875 L6.671875,7.875 C6.61171875,7.875 6.5625,7.82578125 6.5625,7.765625 L6.5625,4.046875 Z M7,10.0625 C6.63769531,10.0625 6.34375,9.76855469 6.34375,9.40625 C6.34375,9.04394531 6.63769531,8.75 7,8.75 C7.36230469,8.75 7.65625,9.04394531 7.65625,9.40625 C7.65625,9.76855469 7.36230469,10.0625 7,10.0625 Z",id:"\u5F62\u72B6",fill:"#FAAD14"})])],-1),Td=[Pd];function Ld(o,a){return s(),u("svg",zd,Td)}var pt=S(Sd,[["render",Ld]]);const Id={},Md={width:"18px",height:"18px",viewBox:"0 0 18 18",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},Od=$t('<g id="icon_info" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group"><circle id="Oval" stroke="#333333" cx="9" cy="9" r="8.5"></circle><circle id="Oval" fill="#333333" cx="5" cy="9" r="1"></circle><circle id="Oval" fill="#333333" cx="9" cy="9" r="1"></circle><circle id="Oval" fill="#333333" cx="13" cy="9" r="1"></circle></g></g>',1),Nd=[Od];function qd(o,a){return s(),u("svg",Md,Nd)}var ke=S(Id,[["render",qd]]);const Vd={},Gd={width:"18px",height:"18px",viewBox:"0 0 18 18",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},jd=$t('<g id="icon_disk-formatting" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group-15" stroke="#333333"><circle id="Oval" cx="9" cy="9" r="8.5"></circle><g id="Group-16" transform="translate(4.000000, 4.500000)" stroke-linejoin="round"><polygon id="Rectangle" points="0.911080155 0 9.08891985 0 10 6 -8.8817842e-16 6"></polygon><rect id="Rectangle" transform="translate(5.000000, 7.500000) scale(1, -1) translate(-5.000000, -7.500000) " x="0" y="6" width="10" height="3"></rect></g></g></g>',1),Rd=[jd];function Ud(o,a){return s(),u("svg",Gd,Rd)}var Hd=S(Vd,[["render",Ud]]);const re=o=>(W("data-v-d72e7026"),o=o(),Z(),o),Wd=["onSubmit"],Zd={class:"action-header"},Jd={class:"action-header_title"},Xd={class:"action-body"},Kd={class:"disk-info"},Qd=re(()=>t("div",{class:"disk-info_icon"},[t("svg",{t:"1642589762094",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"11301",width:"128",height:"128"},[t("path",{d:"M899.892468 123.889088c0-44.342099-36.286708-80.620486-80.624646-80.620486H204.728017C160.385918 43.268602 124.107532 79.546988 124.107532 123.889088v802.847056c0 44.342099 36.278386 80.620486 80.620485 80.620486h614.539805c44.337938 0 80.624646-36.278386 80.624646-80.620486V123.889088z",fill:"#D0D0DB","p-id":"11302"}),t("path",{d:"M169.8768 977.7772V174.930143c0-44.342099 36.278386-80.620486 80.620486-80.620485h614.539804c9.936092 0 19.426974 1.905666 28.239639 5.23434-11.525534-30.507298-40.996782-52.389169-75.398629-52.389169H203.342457c-44.342099 0-80.620486 36.278386-80.620486 80.620486v802.851217c0 34.410168 21.881871 63.873094 52.385008 75.381985A79.730065 79.730065 0 0 1 169.8768 977.7772z",fill:"#FFFFFF","p-id":"11303"}),t("path",{d:"M820.657543 40.497481H206.117739c-44.342099 0-80.620486 36.278386-80.620486 80.620485v802.847057c0 44.342099 36.278386 80.620486 80.620486 80.620486h614.539804c44.337938 0 80.624646-36.278386 80.624647-80.620486V121.117966c0-44.342099-36.286708-80.620486-80.624647-80.620485z m19.60173 828.785749c0 40.846992-33.43237 74.279362-74.287684 74.279361H199.780776c-40.855313 0-74.279362-33.424048-74.279362-74.279361V129.593603c0-40.855313 33.424048-74.279362 74.279362-74.279362h566.203296c40.842831 0 74.283522 33.424048 74.283522 74.279362l-0.008321 739.689627z",fill:"#6E6E96","p-id":"11304"}),t("path",{d:"M815.106979 1024H200.567175C146.933914 1024 103.303319 980.369405 103.303319 926.736144V123.889088C103.303319 70.255827 146.933914 26.625232 200.567175 26.625232h614.539804c53.633261 0 97.268017 43.630595 97.268017 97.263856v802.847056c0 53.633261-43.634756 97.263856-97.268017 97.263856zM200.567175 59.911972C165.287391 59.911972 136.590059 88.609303 136.590059 123.889088v802.847056c0 35.279784 28.697331 63.977115 63.977116 63.977115h614.539804c35.279784 0 63.981276-28.697331 63.981276-63.977115V123.889088c0-35.279784-28.701492-63.977115-63.981276-63.977116H200.567175z",fill:"#6E6E96","p-id":"11305"}),t("path",{d:"M301.946104 941.515457h429.985632v65.841173H301.946104z",fill:"#8A8AA1","p-id":"11306"}),t("path",{d:"M731.931736 1024H301.946104a16.64337 16.64337 0 0 1-16.64337-16.64337V941.515457a16.64337 16.64337 0 0 1 16.64337-16.64337h429.985632a16.64337 16.64337 0 0 1 16.64337 16.64337v65.841173a16.64337 16.64337 0 0 1-16.64337 16.64337z m-413.342262-33.286741h396.698892v-32.554432H318.589474v32.554432z",fill:"#6E6E96","p-id":"11307"}),t("path",{d:"M337.230049 960.318304h20.804213v47.038326h-20.804213zM386.565159 960.318304h20.804213v47.038326h-20.804213zM435.891948 960.318304h20.804213v47.038326h-20.804213zM485.231219 960.318304h20.804213v47.038326h-20.804213zM534.558008 960.318304h20.804213v47.038326h-20.804213zM583.897279 960.318304h20.804213v47.038326h-20.804213zM633.224068 960.318304h20.804213v47.038326h-20.804213zM682.563339 960.318304h20.804213v47.038326h-20.804213z",fill:"#FFE599","p-id":"11308"}),t("path",{d:"M219.153659 140.794591m-26.874883 0a26.874882 26.874882 0 1 0 53.749765 0 26.874882 26.874882 0 1 0-53.749765 0Z",fill:"#ADADD1","p-id":"11309"}),t("path",{d:"M219.153659 184.312843c-23.995579 0-43.518252-19.522673-43.518253-43.518252s19.522673-43.518252 43.518253-43.518253 43.518252 19.522673 43.518252 43.518253-19.522673 43.518252-43.518252 43.518252z m0-53.749764c-5.642103 0-10.231512 4.589409-10.231512 10.231512s4.589409 10.231512 10.231512 10.231512 10.231512-4.589409 10.231511-10.231512-4.589409-10.231512-10.231511-10.231512z",fill:"#6E6E96","p-id":"11310"}),t("path",{d:"M801.28466 140.794591m-26.870721 0a26.870721 26.870721 0 1 0 53.741442 0 26.870721 26.870721 0 1 0-53.741442 0Z",fill:"#ADADD1","p-id":"11311"}),t("path",{d:"M801.28466 184.308683c-23.995579 0-43.514092-19.518512-43.514091-43.514092s19.518512-43.514092 43.514091-43.514092 43.514092 19.518512 43.514092 43.514092-19.518512 43.514092-43.514092 43.514092z m0-53.741443c-5.637942 0-10.227351 4.589409-10.227351 10.227351s4.589409 10.227351 10.227351 10.227351 10.227351-4.589409 10.227351-10.227351-4.589409-10.227351-10.227351-10.227351z",fill:"#6E6E96","p-id":"11312"}),t("path",{d:"M801.280499 905.23291m-26.870721 0a26.870721 26.870721 0 1 0 53.741443 0 26.870721 26.870721 0 1 0-53.741443 0Z",fill:"#ADADD1","p-id":"11313"}),t("path",{d:"M801.280499 948.747001c-23.995579 0-43.514092-19.518512-43.514091-43.514091s19.518512-43.514092 43.514091-43.514092 43.514092 19.518512 43.514092 43.514092-19.518512 43.514092-43.514092 43.514091z m0-53.741442c-5.637942 0-10.227351 4.589409-10.227351 10.227351s4.589409 10.227351 10.227351 10.227351 10.227351-4.589409 10.227351-10.227351-4.589409-10.227351-10.227351-10.227351z",fill:"#6E6E96","p-id":"11314"}),t("path",{d:"M219.153659 905.23291m-26.870722 0a26.870721 26.870721 0 1 0 53.741443 0 26.870721 26.870721 0 1 0-53.741443 0Z",fill:"#ADADD1","p-id":"11315"}),t("path",{d:"M219.153659 948.747001c-23.995579 0-43.514092-19.518512-43.514092-43.514091s19.518512-43.514092 43.514092-43.514092 43.514092 19.518512 43.514091 43.514092-19.522673 43.514092-43.514091 43.514091z m0-53.741442c-5.637942 0-10.227351 4.589409-10.227351 10.227351s4.589409 10.227351 10.227351 10.227351 10.227351-4.589409 10.227351-10.227351-4.589409-10.227351-10.227351-10.227351z",fill:"#6E6E96","p-id":"11316"}),t("path",{d:"M520.972857 777.43263c-142.542145 0-258.508988-115.971004-258.508988-258.52147a16.64337 16.64337 0 0 1 33.28674 0c0 124.19699 101.033579 225.23473 225.222248 225.23473s225.222248-101.03774 225.222248-225.23473c0-124.188668-101.033579-225.218087-225.222248-225.218087a16.64337 16.64337 0 0 1 0-33.286741c142.542145 0 258.508988 115.966843 258.508988 258.504828 0 142.550466-115.966843 258.521471-258.508988 258.52147z",fill:"#6E6E96","p-id":"11317"}),t("path",{d:"M520.968696 518.919481m-83.312551 0a83.312551 83.312551 0 1 0 166.625102 0 83.312551 83.312551 0 1 0-166.625102 0Z",fill:"#A9A9BA","p-id":"11318"}),t("path",{d:"M520.968696 618.875402c-55.114521 0-99.955921-44.83724-99.955921-99.95176 0-55.118682 44.8414-99.955921 99.955921-99.955921s99.95176 44.8414 99.95176 99.955921c0 55.11036-44.83724 99.95176-99.95176 99.95176z m0-166.625101c-36.761044 0-66.669181 29.908136-66.66918 66.66918s29.908136 66.66502 66.66918 66.66502 66.66502-29.908136 66.66502-66.66502c0-36.761044-29.903976-66.669181-66.66502-66.66918z",fill:"#6E6E96","p-id":"11319"}),t("path",{d:"M301.946104 941.515457h429.985632v36.977408H301.946104z",fill:"#6E6E96","p-id":"11320"})])],-1)),t0={key:0,class:"disk-info_mount-name"},e0={key:1,class:"disk-info_mount-name"},a0={key:0,class:"label-item"},o0={class:"label-item_key"},n0={class:"label-item_path"},i0={class:"label-item"},r0={class:"label-item_key"},s0={class:"label-item_value"},d0=["disabled"],u0={key:0,value:""},l0={value:"format"},c0={key:1,value:"default"},p0={class:"label-item_value"},m0={key:0,class:"msg"},f0={key:1,class:"msg"},v0={class:"action-footer"},b0=re(()=>t("div",{class:"auto"},null,-1)),g0=["disabled"],_0=["disabled"],h0={key:1,class:"action result"},x0={class:"action-body"},k0=re(()=>t("div",{class:"action-body_icon"},[t("svg",{t:"1642063181211",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"5062",width:"128",height:"128","data-v-cda444e0":""},[t("path",{d:"M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m-74.965333 550.4L346.453333 545.152a42.666667 42.666667 0 1 0-60.330666 60.330667l120.704 120.704a42.666667 42.666667 0 0 0 60.330666 0l301.653334-301.696a42.666667 42.666667 0 1 0-60.288-60.330667l-271.530667 271.488z",fill:"#52C41A","p-id":"5063","data-v-cda444e0":""})])],-1)),w0={class:"action-body_msg"},y0={key:0,class:"action-body_info"},F0={key:1,class:"action-body_info"},E0={class:"btns"},C0=I({props:{action:String,disk:{type:Object,required:!0},mount:{type:Object},Close:{type:Function},Cancel:{type:Function},Next:{type:Function}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=()=>{a.Close&&a.Close()},r=F=>{F.preventDefault(),a.Cancel&&a.Cancel(),d()},p=F=>{a.Next&&a.Next(F),d()},x=E(!1),_=E(0),b=F=>{_.value=F},m=E(a.action=="nas"?"":"format"),c=E(),f=E(),v=()=>{switch(m.value){case"format":k();return;case"default":g();return;default:C.Warning(n("\u8BF7\u9009\u62E9\u9009\u9879"));return}},g=()=>{let F="";const B=a.mount;if(B!=null&&B.mountPoint!=null&&(F=B.mountPoint),F!=""){p(F);return}C.Warning(n("\u65E0\u6CD5\u8BC6\u522B\u8DEF\u5F84"))},k=()=>{const F=a.disk,B=a.mount;if(B){const Y=B.mountPoint||B.path;if(!confirm(n("\u8B66\u544A\uFF1A\u683C\u5F0F\u5316\u4F1A\u6E05\u7A7A %{partname} \u5206\u533A\u6570\u636E\uFF0C\u8BF7\u4F60\u8C28\u614E\u64CD\u4F5C",{partname:Y||""}))||!confirm(n("\u662F\u5426\u786E\u5B9A\u683C\u5F0F\u5316 %{partname}?",{partname:Y||""})))return;w(B);return}if(F){if(!confirm(n("\u8B66\u544A\uFF1A\u8BE5\u64CD\u4F5C\u5C06\u521D\u59CB\u5316 %{model} \u786C\u76D8\u5E76\u521B\u5EFA\u5206\u533A\uFF0C\u8BF7\u4F60\u8C28\u614E\u64CD\u4F5C",{model:F.venderModel||""}))||!confirm(n("\u662F\u5426\u786E\u5B9A\u521D\u59CB\u5316?")))return;h(F);return}C.Warning(n("\u65E0\u6CD5\u8BC6\u522B\u6570\u636E"))},h=F=>M(this,null,function*(){if(F.name==null||F.path==""){C.Warning(n("\u83B7\u53D6\u4E0D\u5230\u8BBE\u5907\u540D\u79F0"));return}if(F.path==null||F.path==""){C.Warning(n("\u83B7\u53D6\u4E0D\u5230\u8BBE\u5907\u8DEF\u5F84"));return}x.value=!0;const B=C.Loading(n("\u521D\u59CB\u5316\u4E2D..."));try{const Y=yield P.Nas.Disk.Init.POST({name:F.name,path:F.path});if(Y!=null&&Y.data){const{result:$,error:z}=Y==null?void 0:Y.data;z&&C.Warning(z),$&&($.errorInfo?C.Warning($.errorInfo):(C.Success(n("\u521D\u59CB\u5316\u6210\u529F")),$.childrens&&$.childrens.length>0&&(f.value=$.childrens[0]),c.value=$,b(1)))}}catch(Y){C.Error(Y)}B.Close(),x.value=!1}),w=F=>M(this,null,function*(){if(F.path==null||F.path==""){C.Warning(n("\u83B7\u53D6\u4E0D\u5230\u5206\u533A\u8DEF\u5F84"));return}x.value=!0;const B=C.Loading(n("\u683C\u5F0F\u5316\u4E2D..."));try{const Y=yield P.Nas.Disk.Partition.Format.POST({path:F.path,uuid:F.uuid,mountPoint:F.mountPoint});if(Y!=null&&Y.data){const{result:$,error:z}=Y==null?void 0:Y.data;z&&C.Warning(z),$&&(C.Success(n("\u683C\u5F0F\u5316\u6210\u529F")),f.value=$,b(1))}}catch(Y){C.Error(Y)}B.Close(),x.value=!1}),y=()=>{if(f.value&&f.value.mountPoint){p(f.value.mountPoint);return}C.Warning(n("\u8BFB\u53D6\u7ED3\u679C\u5931\u8D25"))};return(F,B)=>(s(),V(ot,{type:1},{default:G(()=>[A(ft,{name:"rotate",mode:"out-in"},{default:G(()=>{var Y;return[_.value==0?(s(),u("form",{key:0,class:"action format",onSubmit:st(v,["prevent"])},[t("div",Zd,[t("div",Jd,i(e(n)("\u786C\u76D8\u914D\u7F6E")),1)]),t("div",Xd,[t("div",Kd,[Qd,o.mount?(s(),u("div",t0,[t("span",null,"\u3010"+i(o.mount.total)+"\u3011",1),t("span",null,i(o.mount.mountPoint||o.mount.path),1)])):o.disk?(s(),u("div",e0,[t("span",null,"\u3010"+i(o.disk.size)+"\u3011",1),t("span",null,i(o.disk.venderModel),1)])):D("",!0)]),o.mount?(s(),u("div",a0,[t("div",o0,[t("span",null,i(e(n)("\u76EE\u6807\u5206\u533A")),1)]),t("div",n0,i(o.mount.mountPoint||o.mount.path)+"\uFF08"+i(o.mount.total)+"\uFF09",1)])):D("",!0),t("div",i0,[t("div",r0,[t("span",null,i(e(n)("\u683C\u5F0F\u5316\u9009\u9879")),1)]),t("div",s0,[L(t("select",{"onUpdate:modelValue":B[0]||(B[0]=$=>m.value=$),required:"",disabled:o.action=="disk"},[o.mount!=null?(s(),u("option",u0,i(e(n)("\u8BF7\u9009\u62E9\u9009\u9879")),1)):D("",!0),t("option",l0,i(e(n)("\u683C\u5F0F\u5316")),1),o.mount!=null?(s(),u("option",c0,i(e(n)("\u4E0D\u683C\u5F0F\u5316,\u4F7F\u7528\u539F\u6587\u4EF6\u7CFB\u7EDF")),1)):D("",!0)],8,d0),[[tt,m.value]])]),t("div",p0,[m.value=="format"?(s(),u("p",m0,i(e(n)("\u683C\u5F0F\u5316\u4E3AEXT4\u6587\u4EF6\u7CFB\u7EDF")),1)):m.value=="default"?(s(),u("p",f0)):D("",!0)])])]),t("div",v0,[b0,t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:r,type:"button",disabled:x.value},i(e(n)("\u8FD4\u56DE")),9,g0),t("button",{class:"cbi-button cbi-button-apply app-btn app-next",disabled:x.value},i(e(n)("\u4E0B\u4E00\u6B65")),9,_0)])],40,Wd)):_.value==1?(s(),u("div",h0,[t("div",x0,[k0,t("div",w0,i(e(n)("\u683C\u5F0F\u5316\u6210\u529F")),1),c.value?(s(),u("div",y0,[at(i(e(n)("\u5DF2\u7ECF\u6210\u529F\u683C\u5F0F\u5316\u78C1\u76D8"))+" "+i(c.value.venderModel)+" "+i(e(n)("\u5E76\u6302\u8F7D\u5230"))+" ",1),t("a",null,i((Y=f.value)==null?void 0:Y.mountPoint),1)])):D("",!0),f.value?(s(),u("div",F0,[at(i(e(n)("\u5DF2\u7ECF\u6210\u529F\u521D\u59CB\u5316\u5206\u533A"))+" ",1),t("a",null,i(f.value.mountPoint),1)])):D("",!0),t("div",E0,[t("button",{class:"cbi-button cbi-button-apply app-btn app-next",type:"button",onClick:y},i(o.action=="nas"?e(n)("\u4E0B\u4E00\u6B65"):e(n)("\u5B8C\u6210")),1)])])])):D("",!0)]}),_:1})]),_:1}))}});var $0=S(C0,[["__scopeId","data-v-d72e7026"]]),se=o=>{const a=document.createElement("div");document.body.appendChild(a);const n=et($0,nt(X({},o),{Close:()=>{l()}}));n.mount(a);const l=()=>{n.unmount(),a.remove()};return{Close:l}};const Jt=o=>(W("data-v-b5895698"),o=o(),Z(),o),D0=["onSubmit"],B0=Jt(()=>t("div",{class:"action-header"},[t("div",{class:"action-header_title"})],-1)),Y0={class:"action-body"},A0={class:"disk-info"},S0=Jt(()=>t("div",{class:"disk-info_icon"},[t("svg",{t:"1642589762094",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"11301",width:"128",height:"128"},[t("path",{d:"M899.892468 123.889088c0-44.342099-36.286708-80.620486-80.624646-80.620486H204.728017C160.385918 43.268602 124.107532 79.546988 124.107532 123.889088v802.847056c0 44.342099 36.278386 80.620486 80.620485 80.620486h614.539805c44.337938 0 80.624646-36.278386 80.624646-80.620486V123.889088z",fill:"#D0D0DB","p-id":"11302"}),t("path",{d:"M169.8768 977.7772V174.930143c0-44.342099 36.278386-80.620486 80.620486-80.620485h614.539804c9.936092 0 19.426974 1.905666 28.239639 5.23434-11.525534-30.507298-40.996782-52.389169-75.398629-52.389169H203.342457c-44.342099 0-80.620486 36.278386-80.620486 80.620486v802.851217c0 34.410168 21.881871 63.873094 52.385008 75.381985A79.730065 79.730065 0 0 1 169.8768 977.7772z",fill:"#FFFFFF","p-id":"11303"}),t("path",{d:"M820.657543 40.497481H206.117739c-44.342099 0-80.620486 36.278386-80.620486 80.620485v802.847057c0 44.342099 36.278386 80.620486 80.620486 80.620486h614.539804c44.337938 0 80.624646-36.278386 80.624647-80.620486V121.117966c0-44.342099-36.286708-80.620486-80.624647-80.620485z m19.60173 828.785749c0 40.846992-33.43237 74.279362-74.287684 74.279361H199.780776c-40.855313 0-74.279362-33.424048-74.279362-74.279361V129.593603c0-40.855313 33.424048-74.279362 74.279362-74.279362h566.203296c40.842831 0 74.283522 33.424048 74.283522 74.279362l-0.008321 739.689627z",fill:"#6E6E96","p-id":"11304"}),t("path",{d:"M815.106979 1024H200.567175C146.933914 1024 103.303319 980.369405 103.303319 926.736144V123.889088C103.303319 70.255827 146.933914 26.625232 200.567175 26.625232h614.539804c53.633261 0 97.268017 43.630595 97.268017 97.263856v802.847056c0 53.633261-43.634756 97.263856-97.268017 97.263856zM200.567175 59.911972C165.287391 59.911972 136.590059 88.609303 136.590059 123.889088v802.847056c0 35.279784 28.697331 63.977115 63.977116 63.977115h614.539804c35.279784 0 63.981276-28.697331 63.981276-63.977115V123.889088c0-35.279784-28.701492-63.977115-63.981276-63.977116H200.567175z",fill:"#6E6E96","p-id":"11305"}),t("path",{d:"M301.946104 941.515457h429.985632v65.841173H301.946104z",fill:"#8A8AA1","p-id":"11306"}),t("path",{d:"M731.931736 1024H301.946104a16.64337 16.64337 0 0 1-16.64337-16.64337V941.515457a16.64337 16.64337 0 0 1 16.64337-16.64337h429.985632a16.64337 16.64337 0 0 1 16.64337 16.64337v65.841173a16.64337 16.64337 0 0 1-16.64337 16.64337z m-413.342262-33.286741h396.698892v-32.554432H318.589474v32.554432z",fill:"#6E6E96","p-id":"11307"}),t("path",{d:"M337.230049 960.318304h20.804213v47.038326h-20.804213zM386.565159 960.318304h20.804213v47.038326h-20.804213zM435.891948 960.318304h20.804213v47.038326h-20.804213zM485.231219 960.318304h20.804213v47.038326h-20.804213zM534.558008 960.318304h20.804213v47.038326h-20.804213zM583.897279 960.318304h20.804213v47.038326h-20.804213zM633.224068 960.318304h20.804213v47.038326h-20.804213zM682.563339 960.318304h20.804213v47.038326h-20.804213z",fill:"#FFE599","p-id":"11308"}),t("path",{d:"M219.153659 140.794591m-26.874883 0a26.874882 26.874882 0 1 0 53.749765 0 26.874882 26.874882 0 1 0-53.749765 0Z",fill:"#ADADD1","p-id":"11309"}),t("path",{d:"M219.153659 184.312843c-23.995579 0-43.518252-19.522673-43.518253-43.518252s19.522673-43.518252 43.518253-43.518253 43.518252 19.522673 43.518252 43.518253-19.522673 43.518252-43.518252 43.518252z m0-53.749764c-5.642103 0-10.231512 4.589409-10.231512 10.231512s4.589409 10.231512 10.231512 10.231512 10.231512-4.589409 10.231511-10.231512-4.589409-10.231512-10.231511-10.231512z",fill:"#6E6E96","p-id":"11310"}),t("path",{d:"M801.28466 140.794591m-26.870721 0a26.870721 26.870721 0 1 0 53.741442 0 26.870721 26.870721 0 1 0-53.741442 0Z",fill:"#ADADD1","p-id":"11311"}),t("path",{d:"M801.28466 184.308683c-23.995579 0-43.514092-19.518512-43.514091-43.514092s19.518512-43.514092 43.514091-43.514092 43.514092 19.518512 43.514092 43.514092-19.518512 43.514092-43.514092 43.514092z m0-53.741443c-5.637942 0-10.227351 4.589409-10.227351 10.227351s4.589409 10.227351 10.227351 10.227351 10.227351-4.589409 10.227351-10.227351-4.589409-10.227351-10.227351-10.227351z",fill:"#6E6E96","p-id":"11312"}),t("path",{d:"M801.280499 905.23291m-26.870721 0a26.870721 26.870721 0 1 0 53.741443 0 26.870721 26.870721 0 1 0-53.741443 0Z",fill:"#ADADD1","p-id":"11313"}),t("path",{d:"M801.280499 948.747001c-23.995579 0-43.514092-19.518512-43.514091-43.514091s19.518512-43.514092 43.514091-43.514092 43.514092 19.518512 43.514092 43.514092-19.518512 43.514092-43.514092 43.514091z m0-53.741442c-5.637942 0-10.227351 4.589409-10.227351 10.227351s4.589409 10.227351 10.227351 10.227351 10.227351-4.589409 10.227351-10.227351-4.589409-10.227351-10.227351-10.227351z",fill:"#6E6E96","p-id":"11314"}),t("path",{d:"M219.153659 905.23291m-26.870722 0a26.870721 26.870721 0 1 0 53.741443 0 26.870721 26.870721 0 1 0-53.741443 0Z",fill:"#ADADD1","p-id":"11315"}),t("path",{d:"M219.153659 948.747001c-23.995579 0-43.514092-19.518512-43.514092-43.514091s19.518512-43.514092 43.514092-43.514092 43.514092 19.518512 43.514091 43.514092-19.522673 43.514092-43.514091 43.514091z m0-53.741442c-5.637942 0-10.227351 4.589409-10.227351 10.227351s4.589409 10.227351 10.227351 10.227351 10.227351-4.589409 10.227351-10.227351-4.589409-10.227351-10.227351-10.227351z",fill:"#6E6E96","p-id":"11316"}),t("path",{d:"M520.972857 777.43263c-142.542145 0-258.508988-115.971004-258.508988-258.52147a16.64337 16.64337 0 0 1 33.28674 0c0 124.19699 101.033579 225.23473 225.222248 225.23473s225.222248-101.03774 225.222248-225.23473c0-124.188668-101.033579-225.218087-225.222248-225.218087a16.64337 16.64337 0 0 1 0-33.286741c142.542145 0 258.508988 115.966843 258.508988 258.504828 0 142.550466-115.966843 258.521471-258.508988 258.52147z",fill:"#6E6E96","p-id":"11317"}),t("path",{d:"M520.968696 518.919481m-83.312551 0a83.312551 83.312551 0 1 0 166.625102 0 83.312551 83.312551 0 1 0-166.625102 0Z",fill:"#A9A9BA","p-id":"11318"}),t("path",{d:"M520.968696 618.875402c-55.114521 0-99.955921-44.83724-99.955921-99.95176 0-55.118682 44.8414-99.955921 99.955921-99.955921s99.95176 44.8414 99.95176 99.955921c0 55.11036-44.83724 99.95176-99.95176 99.95176z m0-166.625101c-36.761044 0-66.669181 29.908136-66.66918 66.66918s29.908136 66.66502 66.66918 66.66502 66.66502-29.908136 66.66502-66.66502c0-36.761044-29.903976-66.669181-66.66502-66.66918z",fill:"#6E6E96","p-id":"11319"}),t("path",{d:"M301.946104 941.515457h429.985632v36.977408H301.946104z",fill:"#6E6E96","p-id":"11320"})])],-1)),z0={key:0,class:"disk-info_mount-name"},P0={key:1,class:"disk-info_mount-name"},T0={key:0,class:"label-item"},L0={class:"label-item_key"},I0={class:"label-item_path"},M0={class:"label-item"},O0={class:"label-item_key"},N0={class:"label-item_value"},q0={class:"action-footer"},V0=Jt(()=>t("div",{class:"auto"},null,-1)),G0=["disabled"],j0=["disabled"],R0={key:1,class:"action result"},U0={class:"action-body"},H0=Jt(()=>t("div",{class:"action-body_icon"},[t("svg",{t:"1642063181211",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"5062",width:"128",height:"128","data-v-cda444e0":""},[t("path",{d:"M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m-74.965333 550.4L346.453333 545.152a42.666667 42.666667 0 1 0-60.330666 60.330667l120.704 120.704a42.666667 42.666667 0 0 0 60.330666 0l301.653334-301.696a42.666667 42.666667 0 1 0-60.288-60.330667l-271.530667 271.488z",fill:"#52C41A","p-id":"5063","data-v-cda444e0":""})])],-1)),W0={class:"action-body_msg"},Z0=["innerHTML"],J0={class:"btns"},X0=I({props:{action:String,disk:{type:Object,required:!0},mount:{type:Object},Close:{type:Function},Cancel:{type:Function},Next:{type:Function}},setup(o){var k;const a=o,{$gettext:n,$ngettext:l}=q(),d=()=>{a.Close&&a.Close()},r=h=>{h.preventDefault(),a.Cancel&&a.Cancel(),d()},p=h=>{a.Next&&a.Next(h),d()},x=E(!1),_=E(0),b=E("/mnt/data_"+((k=a==null?void 0:a.mount)==null?void 0:k.name)),m=h=>{_.value=h};E(a.mount?"":"format"),E();const c=E(),f=()=>M(this,null,function*(){const h=a.mount;if(h==null){C.Warning(n("\u83B7\u53D6\u4E0D\u5230\u5206\u533A"));return}if(h.path==null||h.path==""){C.Warning(n("\u83B7\u53D6\u4E0D\u5230\u5206\u533A\u8DEF\u5F84"));return}if(h.uuid==null||h.uuid==""){C.Warning(n("\u83B7\u53D6\u4E0D\u5230\u5206\u533AID"));return}x.value=!0;const w=C.Loading(n("\u6302\u8F7D\u4E2D..."));try{const y=yield P.Nas.Disk.Partition.Mount.POST({path:h.path,uuid:h.uuid,mountPoint:b.value});if(y!=null&&y.data){const{result:F,error:B}=y==null?void 0:y.data;B&&C.Warning(B),F&&(C.Success(n("\u6302\u8F7D\u6210\u529F")),c.value=F,m(1))}}catch(y){C.Error(y)}w.Close(),x.value=!1}),v=()=>{if(c.value&&c.value.mountPoint){p(c.value.mountPoint);return}C.Warning(n("\u8BFB\u53D6\u7ED3\u679C\u5931\u8D25"))},g=()=>{};return(h,w)=>(s(),V(ot,{type:1},{default:G(()=>[A(ft,{name:"rotate",mode:"out-in"},{default:G(()=>{var y,F;return[_.value==0?(s(),u("form",{key:0,class:"action format",onSubmit:st(g,["prevent"])},[B0,t("div",Y0,[t("div",A0,[S0,o.mount?(s(),u("div",z0,[t("span",null,"\u3010"+i(o.mount.total)+"\u3011",1),t("span",null,i(o.mount.mountPoint),1)])):o.disk?(s(),u("div",P0,[t("span",null,"\u3010"+i(o.disk.size)+"\u3011",1),t("span",null,i(o.disk.venderModel),1)])):D("",!0)]),o.mount?(s(),u("div",T0,[t("div",L0,[t("span",null,i(e(n)("\u76EE\u6807\u5206\u533A")),1)]),t("div",I0,i(o.mount.path)+"\uFF08"+i(o.mount.total)+"\uFF0C"+i((F=(y=o.mount)==null?void 0:y.filesystem)==null?void 0:F.toUpperCase())+"\uFF09",1)])):D("",!0),t("div",M0,[t("div",O0,[t("span",null,i(e(n)("\u6302\u8F7D\u70B9")),1)]),t("div",N0,[L(t("input",{type:"text","onUpdate:modelValue":w[0]||(w[0]=B=>b.value=B)},null,512),[[H,b.value,void 0,{trim:!0}]])])])]),t("div",q0,[V0,t("button",{class:"cbi-button cbi-button-apply app-btn app-next",disabled:x.value,onClick:f},i(e(n)("\u786E\u5B9A")),9,G0),t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:r,type:"button",disabled:x.value},i(e(n)("\u8FD4\u56DE")),9,j0)])],40,D0)):_.value==1?(s(),u("div",R0,[t("div",U0,[H0,t("div",W0,i(e(n)("\u6302\u8F7D\u6210\u529F")),1),c.value?(s(),u("div",{key:0,class:"action-body_info",innerHTML:e(n)("\u5DF2\u6210\u529F\u5C06\u5206\u533A %{dev} \u6302\u8F7D\u5230 <a>%{mount}</a>",{dev:c.value.path||"",mount:c.value.mountPoint||""},!0)},null,8,Z0)):D("",!0),t("div",J0,[t("button",{class:"cbi-button cbi-button-apply app-btn app-next",type:"button",onClick:v},i(o.action=="nas"?e(n)("\u5B8C\u6210"):e(n)("\u4E0B\u4E00\u6B65")),1)])])])):D("",!0)]}),_:1})]),_:1}))}});var K0=S(X0,[["__scopeId","data-v-b5895698"]]),Ie=o=>{const a=document.createElement("div");document.body.appendChild(a);const n=et(K0,nt(X({},o),{Close:()=>{l()}}));n.mount(a);const l=()=>{n.unmount(),a.remove()};return{Close:l}};const Q0={class:"disk-content"},tu={class:"disk-item"},eu={class:"disk-item_name"},au={key:0},ou={key:1},nu={key:2},iu={class:"disk_value"},ru={class:"disk-item_value"},su={class:"value-data"},du={key:0,class:"disk-item"},uu={class:"disk-item_name"},lu={key:0},cu=["href"],pu={key:0},mu={class:"disk_status"},fu={key:0,class:"disk_status_item"},vu={key:0,class:"tooltip-trigger disk_tip"},bu={class:"tooltip-text tooltip-top"},gu={class:"disk_dir_tip"},_u={class:"disk_status_item"},hu={key:0,class:"tooltip-trigger disk_tip"},xu={class:"tooltip-text tooltip-top"},ku={class:"disk_dir_tip"},wu=I({props:{part:{type:Object,required:!0},disk:{type:Object,required:!0}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=U(()=>a.part.filesystem=="No FileSystem"),r=U(()=>a.part.filesystem&&["ntfs","vfat","exfat"].indexOf(a.part.filesystem)>=0),p=U(()=>a.part.mountPoint&&a.part.isReadOnly&&a.part.filesystem!="swap"),x=U(()=>d.value||!a.part.isSystemRoot&&(p.value||r.value||!a.part.mountPoint&&a.part.filesystem=="swap")),_=function(){se({action:"disk",disk:a.disk,mount:a.part,Cancel:()=>{},Next:v=>{location.reload()}})},b=()=>{Ie({action:"nas",disk:a.disk,mount:a.part,Cancel:()=>{},Next:()=>{location.reload()}})},m=()=>M(this,null,function*(){const v=C.Loading(n("\u5904\u7406\u4E2D..."));try{const g=yield P.Nas.Disk.InitRest.POST({name:a.disk.name,path:a.disk.path});if(g!=null&&g.data){const{result:k,error:h}=g==null?void 0:g.data;h&&C.Warning(h),k&&(C.Success(n("\u6302\u8F7D\u6210\u529F")),location.reload())}}catch(g){C.Error(g)}v.Close()}),c=U(()=>a.part.filesystem=="Free Space"),f=U(()=>{const v=a.part.mountPoint?a.part.mountPoint:"";return v.indexOf("/mnt/")==0?"/cgi-bin/luci/admin/services/linkease/file/?path=/"+v.substring(5):"/cgi-bin/luci/admin/services/linkease/file/?path=/root"+v});return(v,g)=>{var h;const k=K("progress-item");return s(),u("div",Q0,[t("li",tu,[t("div",eu,[e(c)?(s(),u("span",au,i(e(n)("\u672A\u5206\u533A")),1)):(s(),u("span",ou,i(o.part.name)+i(o.part.mountPoint?"":e(d)?e(n)("\uFF08\u672A\u683C\u5F0F\u5316\uFF09"):e(n)("\uFF08\u672A\u6302\u8F7D\uFF09")),1)),o.part.isSystemRoot?(s(),u("span",nu,i(e(n)("\uFF08\u7CFB\u7EDF\u5206\u533A\uFF09")),1)):D("",!0)]),t("div",iu,[t("div",ru,[t("div",su,[A(k,{value:e(c)||!o.part.usage?0:o.part.usage,text:e(c)?e(n)("\u672A\u5206\u533A\uFF08%{total}\uFF09",{total:o.part.total||""}):(o.part.mountPoint&&o.part.filesystem!="swap"?o.part.used:e(n)("\u672A\u77E5"))+"/"+(o.part.total||""),style:{backgroundColor:"#767676"}},null,8,["value","text"])])]),e(c)?(s(),u("button",{key:0,class:"cbi-button cbi-button-apply",onClick:m},i(e(n)("\u5206\u533A\u5E76\u683C\u5F0F\u5316")),1)):e(x)?(s(),u("button",{key:1,class:"cbi-button cbi-button-apply",onClick:_},i(e(n)("\u683C\u5F0F\u5316\u5206\u533A")),1)):D("",!0)])]),!e(c)&&!e(d)?(s(),u("li",du,[t("span",uu,[o.part.mountPoint?(s(),u(N,{key:0},[o.part.filesystem=="swap"?(s(),u("span",lu,i(e(n)("\u5DF2\u6302\u8F7D\u4E3A\u4EA4\u6362\u533A")),1)):(s(),u("a",{key:1,href:e(f),target:"_blank"},i(o.part.mountPoint),9,cu))],64)):(s(),u(N,{key:1},[o.part.filesystem=="swap"?(s(),u("span",pu,i(e(n)("\u4E0D\u652F\u6301\u6302\u8F7D")),1)):(s(),u("span",{key:1,class:"value-data buttondiv",onClick:b},i(e(n)("\u624B\u52A8\u6302\u8F7D")),1))],64))]),t("div",mu,[o.part.mountPoint&&o.part.filesystem!="swap"?(s(),u("div",fu,[t("div",null,i(e(n)("\u53EF\u8BFB\u5199\u72B6\u6001\uFF1A"))+i(o.part.isReadOnly?e(n)("\u53EA\u8BFB"):e(n)("\u8BFB\u5199")),1),e(p)?(s(),u("div",vu,[A(pt),t("div",bu,[t("div",gu,i(e(n)("\u6B64\u5206\u533A\u4E3A\u53EA\u8BFB\u72B6\u6001\uFF0C\u53EF\u80FD\u65E0\u6CD5\u5199\u5165\u6570\u636E")),1)])])):D("",!0)])):D("",!0),t("div",_u,[t("div",null,i(e(n)("\u6587\u4EF6\u7CFB\u7EDF\uFF1A"))+i((h=o.part.filesystem)==null?void 0:h.toUpperCase()),1),!o.part.isSystemRoot&&e(r)?(s(),u("div",hu,[A(pt),t("div",xu,[t("span",ku,i(e(n)("\u6B64\u6587\u4EF6\u7CFB\u7EDF\u4E0D\u652F\u6301Docker\u7B49\u5E94\u7528\u6570\u636E\uFF0C\u5EFA\u8BAE\u683C\u5F0F\u5316\u6210EXT4\u6587\u4EF6\u7CFB\u7EDF")),1)])])):D("",!0)])])])):D("",!0)])}}});var yu=S(wu,[["__scopeId","data-v-10dd00b8"]]);const Fu=o=>(W("data-v-127a3100"),o=o(),Z(),o),Eu={key:0,class:"action"},Cu={class:"title"},$u={class:"app-container_info"},Du={class:"app-container_body"},Bu={class:"action-footer"},Yu=Fu(()=>t("div",{class:"auto"},null,-1)),Au=I({props:{disk:{type:Object,required:!0},Close:{type:Function},Cancel:{type:Function},Next:{type:Function}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(0),r=()=>{a.Close&&a.Close()},p=x=>{x.preventDefault(),a.Cancel&&a.Cancel(),r()};return(x,_)=>(s(),V(ot,{Close:o.Close,type:1},{default:G(()=>[A(ft,{name:"rotate",mode:"out-in"},{default:G(()=>[d.value==0?(s(),u("div",Eu,[t("h2",Cu,i(e(n)("\u5206\u533A\u4FE1\u606F"))+" - "+i((o.disk.name||"?")+(o.disk.isSystemRoot?e(n)("\uFF08\u7CFB\u7EDF\u76D8\uFF09"):"")),1),t("ul",null,[t("li",null,[t("div",$u,[t("span",null,i(e(n)("\u5206\u533A / \u6302\u8F7D\u70B9")),1),t("span",null,i(e(n)("\u5BB9\u91CF")),1)]),t("div",Du,[(s(!0),u(N,null,R(o.disk.childrens,(b,m)=>(s(),V(yu,{key:m,part:b,disk:o.disk},null,8,["part","disk"]))),128))])])]),t("div",Bu,[Yu,t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:p,type:"button"},i(e(n)("\u8FD4\u56DE")),1)])])):D("",!0)]),_:1})]),_:1},8,["Close"]))}});var Su=S(Au,[["__scopeId","data-v-127a3100"]]),zu=o=>{const a=document.createElement("div");document.body.appendChild(a);const n=et(Su,nt(X({},o),{Close:()=>{l()}}));n.component("progress-item",Be),n.mount(a);const l=()=>{n.unmount(),a.remove()};return{Close:l}};const Pu={key:0,class:"disk-item error"},Tu=["title"],Lu={class:"disk-item_value"},Iu={class:"value-data"},Mu={class:"error"},Ou={key:1,class:"disk-item"},Nu=["title"],qu={key:0,class:"disk_value"},Vu={class:"value-data"},Gu={href:"/cgi-bin/luci/admin/nas/smart"},ju={class:"error"},Ru={key:1,class:"disk_value"},Uu={class:"disk-item_value"},Hu={class:"value-data"},Wu={class:"disk-item-tooltip"},Zu={class:"disk_icon"},Ju={key:0,class:"tooltip-trigger"},Xu={class:"disk_tip"},Ku={class:"tooltip-text tooltip-top"},Qu={class:"disk_dir_tip"},tl={key:1,class:"tooltip-trigger"},el={class:"disk_tip"},al={class:"tooltip-text tooltip-top"},ol={class:"disk_dir_tip"},nl={key:2,class:"disk-item load"},il=["title"],rl={class:"disk_value"},sl={class:"disk-item_value"},dl={class:"value-data"},ul={key:3,class:"disk-item load"},ll=["title"],cl={class:"disk_value"},pl={key:0,class:"disk-item_value"},ml={class:"value-data"},fl={class:"disk_icon"},vl=I({props:{disk:{type:Object,required:!0},smartWarning:{type:Boolean}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=U(()=>a.disk.errorInfo?"error":a.disk.childrens==null||a.disk.childrens.length==0||a.disk.childrens.length==1&&a.disk.childrens[0].filesystem=="No FileSystem"?"load":a.disk.childrens.filter(m=>m.mountPoint).length==0?"unmounted":"success"),r=U(()=>{const m=a.disk;let c=m.name;return m.size&&(c+=`\u3010${m.size}\u3011`),m.venderModel&&(c+=`(${m.venderModel})`),c}),p=U(()=>{var c;const m=a.disk;return!m.isSystemRoot&&(((c=m.childrens)==null?void 0:c.filter(f=>f.isReadOnly&&f.filesystem!="swap").length)||0)>0}),x=()=>{se({action:"disk",disk:a.disk,Cancel:()=>{},Next:()=>{location.reload()}})},_=()=>{zu({action:"disk",disk:a.disk,Cancel:()=>{},Next:()=>{location.reload()}})},b=()=>{const m=a.disk,c=m.childrens||[];Ie({action:"nas",disk:m,mount:c[0],Cancel:()=>{},Next:()=>{location.reload()}})};return(m,c)=>{var v,g,k;const f=K("progress-item");return e(d)=="error"?(s(),u("li",Pu,[t("div",{class:"disk-item_name",title:e(r)},[t("span",null,i(e(r)),1)],8,Tu),t("div",Lu,[t("div",Iu,[t("span",Mu,i(o.disk.errorInfo),1)])])])):e(d)=="success"?(s(),u("li",Ou,[t("div",{class:"disk-item_name",title:e(r)},[t("span",null,i(e(r)),1)],8,Nu),o.disk.smartWarning&&o.smartWarning?(s(),u("div",qu,[t("div",Vu,[t("a",Gu,[t("span",ju,i(e(n)("S.M.A.R.T\u5F02\u5E38")),1)])])])):(s(),u("div",Ru,[t("div",Uu,[t("div",Hu,[A(f,{value:o.disk.usage||0,text:`${o.disk.used}/${o.disk.total}`,style:{backgroundColor:"#767676"}},null,8,["value","text"])]),t("div",Wu,[t("span",null,i(e(n)("\u4EC5\u7EDF\u8BA1\u5DF2\u6302\u8F7D\u5206\u533A")),1)])]),t("div",Zu,[o.disk.isDockerRoot&&o.disk.isSystemRoot&&o.disk.usage&&o.disk.usage>=90?(s(),u("span",Ju,[t("span",Xu,[A(pt)]),t("div",null,[t("div",Ku,[t("span",Qu,i(e(n)("\u60A8\u7684\u7CFB\u7EDF\u7A7A\u95F4\u5DF2\u4E0D\u8DB3\uFF0C\u68C0\u6D4B\u5230\u60A8\u7684Docker\u6839\u76EE\u5F55\u4F4D\u4E8E\u7CFB\u7EDF\u6839\u76EE\u5F55\u4E0A\uFF0C\u53EF\u80FD\u4F1A\u5F71\u54CD\u7CFB\u7EDF\u7684\u6B63\u5E38\u8FD0\u884C\uFF0C\u5EFA\u8BAE\u4F7F\u7528Docker\u8FC1\u79FB\u5411\u5BFC\u5C06Docker\u6839\u76EE\u5F55\u8FC1\u79FB\u5230\u5916\u7F6E\u786C\u76D8\u4E0A\u3002")),1)])])])):D("",!0),e(p)?(s(),u("span",tl,[t("span",el,[A(pt)]),t("div",null,[t("div",al,[t("span",ol,i(e(n)("\u5206\u533A\u5B58\u5728\u5F02\u5E38\uFF0C\u70B9\u51FB\u5206\u533A\u5217\u8868\u67E5\u770B\u9519\u8BEF")),1)])])])):D("",!0),e(p)&&((v=o.disk.childrens)==null?void 0:v.length)==1?(s(),u("span",{key:2,class:"disk_infoicon",onClick:c[0]||(c[0]=h=>x())},[A(Hd)])):D("",!0),t("span",{class:"disk_infoicon",onClick:c[1]||(c[1]=h=>_())},[A(ke)])])]))])):e(d)=="load"?(s(),u("li",nl,[t("div",{class:"disk-item_name",title:e(r)},[t("span",null,i(e(r)),1)],8,il),t("div",rl,[t("div",sl,[t("div",dl,[t("button",{onClick:c[2]||(c[2]=h=>x())},i(e(n)("\u683C\u5F0F\u5316\u5E76\u6302\u8F7D")),1)])])])])):e(d)=="unmounted"?(s(),u("li",ul,[t("div",{class:"disk-item_name",title:e(r)},[t("span",null,i(e(r)),1)],8,ll),t("div",cl,[((g=o.disk.childrens)==null?void 0:g.length)==1?(s(),u("div",pl,[t("div",ml,[o.disk.childrens[0].filesystem=="swap"?(s(),u("button",{key:0,onClick:c[3]||(c[3]=h=>_())},i(e(n)("\u67E5\u770B\u8BE6\u60C5")),1)):(s(),u("button",{key:1,onClick:c[4]||(c[4]=h=>b())},i(e(n)("\u624B\u52A8\u6302\u8F7D")),1))])])):D("",!0),t("div",fl,[(((k=o.disk.childrens)==null?void 0:k.length)||0)>1?(s(),u("span",{key:0,class:"disk_infoicon",onClick:c[5]||(c[5]=h=>_())},[A(ke)])):D("",!0)])])])):D("",!0)}}});var te=S(vl,[["__scopeId","data-v-0b8d992f"]]);const bl=o=>(W("data-v-5f7dc1ac"),o=o(),Z(),o),gl={class:"app-container"},_l={class:"app-container_title"},hl={class:"disk_info"},xl={class:"app-container_tool"},kl=["title"],wl={class:"DeviceBlock"},yl={href:"/cgi-bin/luci/admin/nas/raid"},Fl=bl(()=>t("li",null,[t("a",{href:"/cgi-bin/luci/admin/nas/smart"},"S.M.A.R.T.")],-1)),El={href:"/cgi-bin/luci/admin/system/diskman"},Cl={href:"/cgi-bin/luci/admin/system/mounts"},$l={key:0},Dl={class:"disk_loading_icon"},Bl={class:"disk_loading_info"},Yl={key:1},Al={class:"app-container_info"},Sl={class:"app-container_body"},zl={key:2},Pl={class:"app-container_info"},Tl={class:"app-container_body"},Ll={key:3},Il={class:"app-container_info"},Ml={class:"app-container_body"},Ol=I({setup(o){const{$gettext:a,$ngettext:n}=q(),l=E(!1),d=dt({disks:null,raidList:null}),r=()=>{P.Nas.Disk.Status.GET().then(b=>{var m;if((m=b==null?void 0:b.data)!=null&&m.result){const c=b.data.result;d.disks=c.disks||[]}})};(()=>M(this,null,function*(){try{const b=yield P.Raid.List.GET();if(b!=null&&b.data){const{success:m,error:c,result:f}=b.data;if(f&&(d.raidList=f.disks||[]),c)throw c}}catch(b){console.log(b)}}))(),r();const x=()=>{l.value=!l.value},_=()=>{ut.installAndGo("luci-app-linkease",a("\u6613\u6709\u4E91"),"/cgi-bin/luci/admin/services/linkease/file/","app-meta-linkease")};return(b,m)=>{var v,g;const c=K("GlHelp"),f=K("icon-loading");return s(),u("div",gl,[t("ul",null,[t("li",null,[t("div",_l,[t("span",hl,[at(i(e(a)("\u78C1\u76D8\u4FE1\u606F"))+" ",1),A(c,{type:"disk"})]),t("div",xl,[t("div",{class:"app-container_configure",onClick:_},i(e(a)("\u6587\u4EF6\u7BA1\u7406")),1),t("span",{class:"more_icon",title:e(a)("\u67E5\u770B\u78C1\u76D8\u7BA1\u7406\u4FE1\u606F")},[A(kt,{onClick:x})],8,kl)]),L(t("div",wl,[t("div",{class:"menu_background",onClick:x}),t("ul",null,[t("li",null,[t("a",yl,i(e(a)("RAID\u7BA1\u7406")),1)]),Fl,t("li",null,[t("a",El,i(e(a)("\u78C1\u76D8\u7BA1\u7406")),1)]),t("li",null,[t("a",Cl,i(e(a)("\u6302\u8F7D\u70B9")),1)])])],512),[[bt,l.value]])])]),!e(d).disks&&!e(d).raidList?(s(),u("li",$l,[t("div",Dl,[A(f,{size:38,color:"currentColor"}),t("span",Bl,i(e(a)("\u6B63\u5728\u83B7\u53D6\u78C1\u76D8\u4FE1\u606F...")),1)])])):D("",!0),e(d).disks?(s(),u("li",Yl,[t("div",Al,[t("span",null,i(e(a)("\u7CFB\u7EDF\u6839\u76EE\u5F55")),1)]),t("div",Sl,[(s(!0),u(N,null,R((v=e(d).disks)==null?void 0:v.filter(k=>k.isSystemRoot),(k,h)=>(s(),V(te,{key:h,disk:k},null,8,["disk"]))),128))])])):D("",!0),e(d).disks?(s(),u("li",zl,[t("div",Pl,[t("span",null,i(e(a)("\u5DF2\u6302\u8F7D\u78C1\u76D8")),1)]),t("div",Tl,[(s(!0),u(N,null,R((g=e(d).disks)==null?void 0:g.filter(k=>!k.isSystemRoot),(k,h)=>(s(),V(te,{key:h,disk:k,smartWarning:!0},null,8,["disk"]))),128))])])):D("",!0),e(d).raidList&&e(d).raidList.length>0?(s(),u("li",Ll,[t("div",Il,[t("span",null,i(e(a)("RAID\u8BBE\u5907")),1)]),t("div",Ml,[(s(!0),u(N,null,R(e(d).raidList,(k,h)=>(s(),V(te,{key:h,disk:k},null,8,["disk"]))),128))])])):D("",!0)])])}}});var Nl=S(Ol,[["__scopeId","data-v-5f7dc1ac"]]);const ql={class:"app-container_samba"},Vl={key:0,class:"sambas-item"},Gl={class:"sambas-item_name"},jl={class:"sambas-item_value"},Rl={class:"sambas-item"},Ul={class:"sambas-item_name tit"},Hl={class:"sambas-item_value tit"},Wl={class:"samba-item"},Zl={class:"samba-item_name"},Jl=["title"],Xl=["href"],Kl=I({props:{sambas:{type:Array}},setup(o){const{$gettext:a,$ngettext:n}=q(),l=window.location.hostname;return(d,r)=>{var p;return s(),u("ul",ql,[o.sambas?(s(),u("li",Vl,[t("div",Gl,[t("span",null,i(e(a)("\u5F53\u524D\u72B6\u6001:")),1)]),t("div",jl,[t("span",null,i((p=o.sambas)!=null&&p.length?e(a)("\u5DF2\u542F\u7528"):e(a)("\u672A\u542F\u7528")),1)])])):D("",!0),t("li",Rl,[t("div",Ul,[t("span",null,i(e(a)("\u5730\u5740")),1)]),t("div",Hl,[t("span",null,i(e(a)("\u76EE\u5F55")),1)])]),(s(!0),u(N,null,R(o.sambas,x=>(s(),u("li",Wl,[t("div",Zl,[t("span",null,"smb://"+i(e(l))+"/"+i(x.shareName),1)]),t("div",{class:"samba-item_value",title:x.path},[t("a",{target:"_blank",href:"/cgi-bin/luci/admin/services/linkease/file/?path=/root"+x.path},i(x.path),9,Xl)],8,Jl)]))),256))])}}});var Ql=S(Kl,[["__scopeId","data-v-ba3ddae2"]]);const tc={class:"webdav-item"},ec={class:"webdav-item_name"},ac={class:"webdav-item_value"},oc={key:0,class:"webdav-item"},nc={class:"webdav-item_name"},ic={class:"webdav-item_value"},rc=["href"],sc={key:1,class:"webdav-item"},dc={class:"webdav-item_name"},uc={class:"webdav-item_value"},lc=["href"],cc={key:2,class:"webdav-item"},pc={class:"webdav-item_name"},mc={class:"webdav-item_value"},fc=I({props:{webdav:{type:Object}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=U(()=>{var r;return`http://${location.hostname}:${(r=a.webdav)==null?void 0:r.port}`});return(r,p)=>{var x,_,b,m,c,f,v;return s(),u(N,null,[t("li",tc,[t("div",ec,[t("span",null,i(e(n)("\u5F53\u524D\u72B6\u6001:")),1)]),t("div",ac,[t("span",null,i((x=o.webdav)!=null&&x.path?e(n)("\u5DF2\u542F\u7528"):e(n)("\u672A\u542F\u7528")),1)])]),(_=o.webdav)!=null&&_.path?(s(),u("li",oc,[t("div",nc,[t("span",null,i(e(n)("\u6302\u8F7D\u8DEF\u5F84:")),1)]),t("div",ic,[t("a",{target:"_blank",href:"/cgi-bin/luci/admin/services/linkease/file/?path=/root"+((b=o.webdav)==null?void 0:b.path)},i((m=o.webdav)==null?void 0:m.path),9,rc)])])):D("",!0),(c=o.webdav)!=null&&c.port?(s(),u("li",sc,[t("div",dc,[t("span",null,i(e(n)("\u670D\u52A1\u8DEF\u5F84:")),1)]),t("div",uc,[t("a",{href:e(d),target:"_blank",rel:"noopener noreferrer"},i(e(d)),9,lc)])])):D("",!0),(f=o.webdav)!=null&&f.username?(s(),u("li",cc,[t("div",pc,[t("span",null,i(e(n)("\u8D26\u53F7:")),1)]),t("div",mc,[t("span",null,i((v=o.webdav)==null?void 0:v.username),1)])])):D("",!0)],64)}}});var vc=S(fc,[["__scopeId","data-v-2bc5f580"]]);const de=o=>(W("data-v-7732abe2"),o=o(),Z(),o),bc={class:"disk-item"},gc=de(()=>t("div",{class:"disk-item_icon"},[t("svg",{t:"1642563338465",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2216",width:"128",height:"128"},[t("path",{d:"M998.4 711.68l-119.467-512c-6.826-42.667-42.666-75.093-87.04-76.8H232.107c-44.374 1.707-80.214 35.84-87.04 78.507L25.6 711.68c-5.12 13.653-6.827 29.013-6.827 42.667 0 76.8 63.147 139.946 141.654 139.946H865.28c78.507 0 141.653-63.146 141.653-139.946 0-13.654-3.413-29.014-8.533-42.667zM394.24 366.933c1.707-51.2 56.32-92.16 124.587-92.16S640 315.733 640 365.227c44.373-1.707 81.92 23.893 83.627 58.026s-34.134 63.147-78.507 64.854h-6.827l-245.76 1.706c-44.373 0-80.213-27.306-80.213-59.733 0-35.84 37.547-63.147 81.92-63.147z m471.04 459.094H160.427c-39.254 0-69.974-30.72-69.974-69.974s32.427-69.973 69.974-69.973H865.28c39.253 0 69.973 30.72 69.973 69.973 1.707 37.547-30.72 69.974-69.973 69.974z m-35.84-92.16c-11.947 0-22.187 8.533-23.893 20.48 0 11.946 8.533 22.186 20.48 23.893h3.413c11.947 0 22.187-10.24 22.187-22.187 0-13.653-8.534-22.186-22.187-22.186z m-46.08 22.186c0-25.6 20.48-46.08 46.08-46.08s46.08 20.48 46.08 46.08-20.48 46.08-46.08 46.08-46.08-20.48-46.08-46.08z","p-id":"2217"})])],-1)),_c={class:"disk-item_f"},hc={class:"disk-item_venderModel"},xc={class:"disk-item_used"},kc=de(()=>t("div",{class:"auto"},null,-1)),wc={class:"disk-item-r"},yc={class:"disk-children"},Fc=["onClick"],Ec=de(()=>t("div",{class:"disk-item_icon"},[t("svg",{t:"1642563581459",class:"icon",viewBox:"0 0 1228 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"7132",width:"128",height:"128"},[t("path",{d:"M525.2096 145.3568c1.9968-45.568-35.6864-99.1232-57.4976-99.1232H57.4976C15.872 79.9232 17.8176 145.408 17.8176 145.408h507.392z",fill:"#ECC049","p-id":"7133"}),t("path",{d:"M21.8112 143.36L19.8144 825.1392c0 75.3152 75.3152 152.576 150.6304 152.576h887.9104c75.264 0 150.6304-75.264 150.6304-152.576V297.984c0-75.264-75.3152-152.576-150.6304-152.576h-434.0224L21.8112 143.36z",fill:"#FFD658","p-id":"7134"})])],-1)),Cc={key:0},$c={key:1},Dc=I({props:{disk:{type:Object,required:!0},currDisk:{type:Object},currMountPoint:{type:Object},onDisk:{type:Function,required:!0}},setup(o){var p,x;const a=o,{$gettext:n,$ngettext:l}=q(),d=E(!1);a.currDisk!=null&&((p=a.currDisk)==null?void 0:p.venderModel)==((x=a.disk)==null?void 0:x.venderModel)&&(d.value=!0);const r=_=>{d.value=!d.value,a.onDisk(_,null)};return(_,b)=>{var m;return s(),u("ul",bc,[t("li",{class:rt(["disk-info",{on:o.disk.venderModel==((m=o.currDisk)==null?void 0:m.venderModel),nopoint:o.disk.childrens==null||o.disk.childrens.length==0}]),onClick:b[0]||(b[0]=c=>r(o.disk))},[gc,t("div",_c,[t("div",hc,i(o.disk.venderModel),1),t("div",xc,i(o.disk.used)+"/"+i(o.disk.size),1)]),kc,t("div",wc,i(o.disk.path),1)],2),L(t("div",yc,[(s(!0),u(N,null,R(o.disk.childrens,c=>{var f,v;return s(),u("li",{class:rt(["disk-children_item",{on:c.uuid==((f=o.currMountPoint)==null?void 0:f.uuid)&&c.path==((v=o.currMountPoint)==null?void 0:v.path)}]),onClick:g=>o.onDisk(o.disk,c)},[Ec,c.mountPoint?(s(),u("span",Cc," \u3010"+i(c.filesystem)+"\u3011 "+i(c.mountPoint)+" \uFF08"+i(c.used)+"/"+i(c.total)+"\uFF09 ["+i(c.uuid)+"] ",1)):(s(),u("span",$c," \u3010"+i(c.filesystem)+"\u3011 "+i(c.mountPoint||c.path||e(n)("\u672A\u6302\u8F7D\u78C1\u76D8"))+" ["+i(c.uuid)+"] ",1))],10,Fc)}),256))],512),[[bt,d.value]])])}}});var we=S(Dc,[["__scopeId","data-v-7732abe2"]]);const Bc=o=>(W("data-v-0d1b6ac8"),o=o(),Z(),o),Yc={class:"action list"},Ac={class:"action-header"},Sc={class:"action-header_title"},zc={class:"action-body"},Pc={class:"disk-list"},Tc={class:"action-msg"},Lc={href:"/cgi-bin/luci/admin/system/diskman"},Ic={class:"action-footer"},Mc=Bc(()=>t("div",{class:"auto"},null,-1)),Oc=I({props:{Cancel:{type:Function},Next:{type:Function},Close:{type:Function}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(!0),r=dt({disks:[],raids:[]});(()=>M(this,null,function*(){const g=yield Promise.all([P.Nas.Disk.Status.GET(),P.Raid.List.GET()]);try{if(g[0]){const k=g[0];k!=null&&k.data.result&&(r.disks=(k==null?void 0:k.data.result.disks)||[])}if(g[1]){const k=g[1];k.data.result&&(r.raids=k.data.result.disks||[])}}catch(k){C.Warning(k)}}))();const x=E(),_=E(),b=(g,k)=>{x.value=g,_.value=k},m=()=>{a.Close&&a.Close()},c=()=>{a.Cancel&&a.Cancel(),m()},f=g=>{a.Next&&a.Next(g),m()},v=()=>{if(x.value==null){C.Warning(n("\u8BF7\u9009\u62E9\u76EE\u6807\u786C\u76D8"));return}if(x.value.childrens!=null&&x.value.childrens.length>0&&_.value==null){C.Warning(n("\u8BF7\u9009\u62E9\u786C\u76D8\u5206\u533A"));return}if(_.value!=null&&(_.value.mountPoint==null||_.value.mountPoint=="")){C.Warning(n("\u8BE5\u5206\u533A\u5C1A\u672A\u6302\u8F7D\uFF0C\u8BF7\u5148\u53BB\u6302\u8F7D"));return}d.value=!1,se({action:"nas",disk:x.value,mount:_.value,Cancel:()=>{d.value=!0},Next:g=>{f(g)}})};return(g,k)=>d.value?(s(),V(ot,{key:0,type:1},{default:G(()=>[A(ft,{name:"rotate",mode:"out-in"},{default:G(()=>[t("div",Yc,[t("div",Ac,[t("div",Sc,i(e(n)("\u8BF7\u9009\u62E9\u4E00\u4E2A\u786C\u76D8\u6216\u5206\u533A")),1)]),t("div",zc,[t("div",Pc,[(s(!0),u(N,null,R(e(r).disks,h=>(s(),V(we,{disk:h,onDisk:b,currDisk:x.value,currMountPoint:_.value},null,8,["disk","currDisk","currMountPoint"]))),256)),(s(!0),u(N,null,R(e(r).raids,h=>(s(),V(we,{disk:h,onDisk:b,currDisk:x.value,currMountPoint:_.value},null,8,["disk","currDisk","currMountPoint"]))),256))])]),t("div",Tc,[t("span",null,[at(i(e(n)("\u60F3\u8981\u66F4\u7CBE\u786E\u7684\u914D\u7F6E\uFF1F\u8BF7\u524D\u5F80"))+" ",1),t("a",Lc,i(e(n)("\u9AD8\u7EA7\u8BBE\u7F6E")),1)])]),t("div",Ic,[Mc,t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:c,type:"button"},i(e(n)("\u8FD4\u56DE")),1),t("button",{class:"cbi-button cbi-button-apply app-btn app-next",onClick:v,type:"button"},i(e(n)("\u4E0B\u4E00\u6B65")),1)])])]),_:1})]),_:1})):D("",!0)}});var Nc=S(Oc,[["__scopeId","data-v-0d1b6ac8"]]),qc=o=>{const a=document.createElement("div");document.body.appendChild(a);const n=et(Nc,nt(X({},o),{Close:()=>{l()}}));n.mount(a);const l=()=>{n.unmount(),a.remove()};return{Close:l}};const Vc=o=>(W("data-v-5f6e53be"),o=o(),Z(),o),Gc={class:"action"},jc={class:"action-body"},Rc=Vc(()=>t("div",{class:"icon"},[t("svg",{t:"1642063181211",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"5062",width:"128",height:"128","data-v-cda444e0":""},[t("path",{d:"M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m-74.965333 550.4L346.453333 545.152a42.666667 42.666667 0 1 0-60.330666 60.330667l120.704 120.704a42.666667 42.666667 0 0 0 60.330666 0l301.653334-301.696a42.666667 42.666667 0 1 0-60.288-60.330667l-271.530667 271.488z",fill:"#52C41A","p-id":"5063","data-v-cda444e0":""})])],-1)),Uc={class:"title"},Hc={class:"info"},Wc=["href"],Zc={class:"btns"},Jc=I({props:{Close:Function},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(""),r=U(()=>`http://${location.hostname}:${d.value}`);(()=>{P.Nas.Linkease.Enable.POST().then(_=>{var b,m;(b=_==null?void 0:_.data)!=null&&b.result&&(d.value=((m=_.data.result)==null?void 0:m.port)||"")})})();const x=()=>{a.Close&&a.Close(),location.reload()};return(_,b)=>(s(),V(ot,{type:1},{default:G(()=>[A(ft,{name:"rotate",mode:"out-in"},{default:G(()=>[t("div",Gc,[t("div",jc,[Rc,t("h2",Uc,i(e(n)("\u670D\u52A1\u5DF2\u542F\u52A8")),1),t("div",Hc,[t("span",null,i(e(n)("\u524D\u5F80")),1),t("a",{href:e(r),target:"_blank",rel:"noopener noreferrer"},i(e(r)),9,Wc),t("span",null,i(e(n)("\u7EE7\u7EED\u914D\u7F6E")),1)]),t("div",Zc,[t("button",{class:"cbi-button cbi-button-remove app-btn app-back",type:"button",onClick:x},i(e(n)("\u5173\u95ED")),1)])])])]),_:1})]),_:1}))}});var Xc=S(Jc,[["__scopeId","data-v-5f6e53be"]]),Kc=o=>{const a=document.createElement("div");document.body.appendChild(a);const n=et(Xc,nt(X({},o),{Close:()=>{l()}}));n.mount(a);const l=()=>{n.unmount(),a.remove()};return{Close:l}};const Qc=o=>(W("data-v-2eafa10c"),o=o(),Z(),o),t1=["onSubmit"],e1={class:"action-header"},a1={class:"action-header_title"},o1={class:"action-body"},n1={class:"label-item"},i1={class:"label-item_key"},r1={class:"label-item_value"},s1=["value"],d1={class:"label-item"},u1={class:"label-item_key"},l1={class:"label-item_value"},c1=["placeholder"],p1={class:"label-item"},m1={class:"label-item_key"},f1={class:"label-item_value"},v1={class:"action-footer"},b1=Qc(()=>t("div",{class:"auto"},null,-1)),g1=["disabled"],_1=["disabled"],h1=I({props:{rootPath:{type:String,required:!0},Close:Function},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=m=>{m.preventDefault(),a.Close&&a.Close()},r=E(!1),p=E({username:"root",password:"",rootPath:a.rootPath});(()=>M(this,null,function*(){const m=C.Loading(n("\u52A0\u8F7D\u4E2D..."));r.value=!0;try{const c=yield P.Nas.Webdav.Status.GET();if(c!=null&&c.data){const{result:f,error:v}=c.data;if(v){C.Warning(v);return}f&&(f.username&&(p.value.username=f.username),f.password&&(p.value.password=f.password))}}catch(c){C.Error(c)}r.value=!1,m.Close()}))();const _=()=>{const m=p.value;if(m.rootPath==""){C.Warning(n("\u5171\u4EAB\u8DEF\u5F84\u4E0D\u80FD\u4E3A\u7A7A"));return}if(m.username==""){C.Warning(n("\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A"));return}if(m.password==""){C.Warning(n("\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"));return}b(m)},b=m=>M(this,null,function*(){r.value=!0;const c=C.Loading(n("\u521B\u5EFA\u4E2D..."));try{const f=yield P.Nas.Webdav.Create.POST(m);if(f!=null&&f.data){const{error:v,result:g}=f.data;v&&C.Warning(v),g&&(C.Success(n("\u521B\u5EFA\u6210\u529F")),window.setTimeout(()=>{location.reload()},1e3))}}catch(f){C.Error(f)}c.Close(),r.value=!1});return(m,c)=>(s(),V(ot,{type:1},{default:G(()=>[A(ft,{name:"rotate",mode:"out-in"},{default:G(()=>[t("form",{class:"action",onSubmit:st(_,["prevent"])},[t("div",e1,[t("div",a1,i(e(n)("Webdav\u5171\u4EAB\u914D\u7F6E")),1)]),t("div",o1,[t("div",n1,[t("div",i1,[t("span",null,i(e(n)("\u670D\u52A1\u76EE\u5F55\u8DEF\u5F84")),1)]),t("div",r1,[t("input",{type:"text",value:p.value.rootPath,disabled:"",required:"",style:{backgroundColor:"#eee"}},null,8,s1)])]),t("div",d1,[t("div",u1,[t("span",null,i(e(n)("\u7528\u6237\u540D")),1)]),t("div",l1,[L(t("input",{type:"text",required:"",placeholder:e(n)("\u8D26\u53F7\u7528\u6237\u540D"),"onUpdate:modelValue":c[0]||(c[0]=f=>p.value.username=f)},null,8,c1),[[H,p.value.username,void 0,{trim:!0}]])])]),t("div",p1,[t("div",m1,[t("span",null,i(e(n)("\u5BC6\u7801")),1)]),t("div",f1,[L(t("input",{type:"password","onUpdate:modelValue":c[1]||(c[1]=f=>p.value.password=f)},null,512),[[H,p.value.password,void 0,{trim:!0}]])])])]),t("div",v1,[b1,t("button",{class:"cbi-button cbi-button-remove app-btn app-back",type:"button",onClick:d,disabled:r.value},i(e(n)("\u5173\u95ED")),9,g1),t("button",{class:"cbi-button cbi-button-apply app-btn app-next",disabled:r.value},i(e(n)("\u521B\u5EFA")),9,_1)])],40,t1)]),_:1})]),_:1}))}});var x1=S(h1,[["__scopeId","data-v-2eafa10c"]]),k1=o=>{const a=document.createElement("div");document.body.appendChild(a);const n=et(x1,nt(X({},o),{Close:()=>{l()}}));n.mount(a);const l=()=>{n.unmount(),a.remove()};return{Close:l}};const w1=o=>(W("data-v-58844394"),o=o(),Z(),o),y1=["onSubmit"],F1={class:"action-header"},E1={class:"action-header_title"},C1={class:"action-body"},$1={class:"label-item"},D1={class:"label-item_key"},B1={class:"label-item_value"},Y1=["value"],A1={class:"label-item"},S1={class:"label-item_key"},z1={class:"label-item_value"},P1=["placeholder"],T1={class:"label-item"},L1={class:"label-item_key"},I1={class:"label-item_value"},M1=["placeholder"],O1={class:"label-item"},N1={class:"label-item_key"},q1={class:"label-item_value"},V1={class:"samba-item"},G1={class:"samba-item_allow"},j1={for:"allow",class:"samba-allow"},R1={class:"samba-item_tips"},U1={class:"tooltip-trigger"},H1={class:"samba_tip"},W1={class:"samba_dir_tip"},Z1={class:"action-footer"},J1=w1(()=>t("div",{class:"auto"},null,-1)),X1=["disabled"],K1=["disabled"],Q1=I({props:{rootPath:{type:String,required:!0},Close:Function},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=b=>{b.preventDefault(),a.Close&&a.Close()},r=E(!1),p=E({shareName:"",username:"",password:"",rootPath:a.rootPath,allowLegacy:!1}),x=()=>{const b=p.value;if(b.rootPath==""){C.Warning(n("\u5171\u4EAB\u8DEF\u5F84\u4E0D\u80FD\u4E3A\u7A7A"));return}if(b.shareName==""){C.Warning(n("\u5171\u4EAB\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"));return}if(b.username==""){C.Warning(n("\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A"));return}if(b.password==""){C.Warning(n("\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"));return}const m=gt.checkSmabaUserName(b.username);if(m!==!0){C.Warning(`${m}`);return}_(b)},_=b=>M(this,null,function*(){r.value=!0;const m=C.Loading(n("\u521B\u5EFA\u4E2D..."));try{const c=yield P.Nas.Samba.Create.POST(b);if(c!=null&&c.data){const{error:f,result:v}=c.data;f&&C.Warning(f),v&&(C.Success(n("\u521B\u5EFA\u6210\u529F")),window.setTimeout(()=>{location.reload()},1e3))}}catch(c){C.Error(c)}m.Close(),r.value=!1});return(b,m)=>(s(),V(ot,{type:1},{default:G(()=>[A(ft,{name:"rotate",mode:"out-in"},{default:G(()=>[t("form",{class:"action",onSubmit:st(x,["prevent"])},[t("div",F1,[t("div",E1,i(e(n)("Samba\u5171\u4EAB\u914D\u7F6E")),1)]),t("div",C1,[t("div",$1,[t("div",D1,[t("span",null,i(e(n)("\u670D\u52A1\u76EE\u5F55\u8DEF\u5F84")),1)]),t("div",B1,[t("input",{type:"text",value:p.value.rootPath,disabled:"",required:"",style:{backgroundColor:"#eee"}},null,8,Y1)])]),t("div",A1,[t("div",S1,[t("span",null,i(e(n)("\u5171\u4EAB\u540D\uFF08\u5EFA\u8BAE\u4F7F\u7528\u82F1\u6587\u5B57\u6BCD\uFF09")),1)]),t("div",z1,[L(t("input",{type:"text","onUpdate:modelValue":m[0]||(m[0]=c=>p.value.shareName=c),required:"",placeholder:e(n)("\u5171\u4EAB\u540D\u79F0")},null,8,P1),[[H,p.value.shareName,void 0,{trim:!0}]])])]),t("div",T1,[t("div",L1,[t("span",null,i(e(n)("\u7528\u6237\u540D")),1)]),t("div",I1,[L(t("input",{type:"text",required:"",placeholder:e(n)("\u8D26\u53F7\u7528\u6237\u540D"),"onUpdate:modelValue":m[1]||(m[1]=c=>p.value.username=c)},null,8,M1),[[H,p.value.username,void 0,{trim:!0}]])])]),t("div",O1,[t("div",N1,[t("span",null,i(e(n)("\u5BC6\u7801")),1)]),t("div",q1,[L(t("input",{type:"password","onUpdate:modelValue":m[2]||(m[2]=c=>p.value.password=c)},null,512),[[H,p.value.password,void 0,{trim:!0}]])])]),t("div",V1,[t("div",G1,[L(t("input",{type:"checkbox",id:"allow","onUpdate:modelValue":m[3]||(m[3]=c=>p.value.allowLegacy=c)},null,512),[[Ct,p.value.allowLegacy]]),t("label",j1,i(e(n)("\u5141\u8BB8\u65E7\u534F\u8BAE\u4E0E\u8EAB\u4EFD\u9A8C\u8BC1(\u4E0D\u5B89\u5168)")),1)]),t("div",R1,[t("span",U1,[t("span",H1,[A(pt)]),t("span",W1,i(e(n)("\u517C\u5BB9\u4E00\u4E9B\u7535\u89C6\u6216\u8005\u7535\u89C6\u76D2\u5B50")),1)])])])]),t("div",Z1,[J1,t("button",{class:"cbi-button cbi-button-remove app-btn app-back",type:"button",onClick:d,disabled:r.value},i(e(n)("\u5173\u95ED")),9,X1),t("button",{class:"cbi-button cbi-button-apply app-btn app-next",disabled:r.value},i(e(n)("\u521B\u5EFA")),9,K1)])],40,y1)]),_:1})]),_:1}))}});var t2=S(Q1,[["__scopeId","data-v-58844394"]]),e2=o=>{const a=document.createElement("div");document.body.appendChild(a);const n=et(t2,nt(X({},o),{Close:()=>{l()}}));n.mount(a);const l=()=>{n.unmount(),a.remove()};return{Close:l}};const Bt=o=>!Array.isArray(window.quickstart_features)||window.quickstart_features.indexOf(o)!=-1,a2={key:0,class:"action"},o2={class:"title"},n2={class:"desc"},i2={value:"linkease"},r2={value:"samba"},s2={value:"webdav"},d2=["innerHTML"],u2={class:"btns"},l2=["disabled"],c2=I({props:{setup:Number,Close:{type:Function,required:!0}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(!0),r=E("linkease"),p=E(!1),x=E(a.setup||0),_=()=>{a.Close&&a.Close()},b=()=>M(this,null,function*(){switch(r.value){case"webdav":yield m();break;case"samba":yield f();break;case"linkease":yield c();break}}),m=()=>M(this,null,function*(){p.value=!0,(yield ut.checkAndInstallApp("app-meta-gowebdav","GoWebdav"))&&v(),p.value=!1}),c=()=>M(this,null,function*(){p.value=!0,(yield ut.checkAndInstallApp("linkease",n("\u6613\u6709\u4E91"),"app-meta-linkease"))&&g(),p.value=!1}),f=()=>M(this,null,function*(){p.value=!0;const w=C.Loading(n("\u914D\u7F6E\u4E2D..."));v(),w.Close(),p.value=!1}),v=()=>{p.value=!1,d.value=!1,qc({Cancel:()=>{d.value=!0},Next:w=>{switch(r.value){case"webdav":k(w);break;case"samba":h(w);break}}})},g=()=>{Kc({}),_()},k=w=>{k1({rootPath:w}),_()},h=w=>{e2({rootPath:w}),_()};return(w,y)=>d.value?(s(),V(ot,{key:0,Close:o.Close,type:1},{default:G(()=>[A(ft,{name:"rotate",mode:"out-in"},{default:G(()=>[x.value==0?(s(),u("div",a2,[t("h2",o2,i(e(n)("\u6B22\u8FCE\u4F7F\u7528 NAS \u914D\u7F6E\u5411\u5BFC")),1),t("h3",n2,i(e(n)("\u8BF7\u9009\u62E9\u9700\u8981\u6DFB\u52A0\u7684NAS\u670D\u52A1")),1),t("form",null,[t("label",null,[L(t("select",{"onUpdate:modelValue":y[0]||(y[0]=F=>r.value=F)},[t("option",i2,i(e(n)("\u8DE8\u8BBE\u5907\u5171\u4EAB\uFF08\u6613\u6709\u4E91\uFF09")),1),t("option",r2,i(e(n)("\u5C40\u57DF\u7F51\u6587\u4EF6\u5171\u4EAB\uFF08Samba\uFF09")),1),t("option",s2,i(e(n)("\u5C40\u57DF\u7F51\u6587\u4EF6\u5171\u4EAB\uFF08WebDAV\uFF09")),1)],512),[[tt,r.value]])])]),e(Bt)("unishare")?(s(),u("div",{key:0,class:"tips",innerHTML:e(n)("\u5982\u9700\u5BF9 Samba \u6216 WebDAV \u8FDB\u884C\u66F4\u7EC6\u81F4\u7684\u6743\u9650\u63A7\u5236\uFF0C\u8BF7\u4F7F\u7528\u201C%{unishare}\u201D",{unishare:'<a href="/cgi-bin/luci/admin/nas/unishare">'+e(n)("\u7EDF\u4E00\u6587\u4EF6\u5171\u4EAB")+"</a>"},!0)},null,8,d2)):D("",!0),t("div",u2,[t("button",{class:"cbi-button cbi-button-apply app-btn app-next",onClick:b,type:"button",disabled:p.value},i(e(n)("\u4E0B\u4E00\u6B65")),9,l2),t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:_,type:"button"},i(e(n)("\u53D6\u6D88")),1)])])):D("",!0)]),_:1})]),_:1},8,["Close"])):D("",!0)}});var p2=S(c2,[["__scopeId","data-v-1d64dea6"]]),Me=o=>{const a=document.createElement("div");document.body.appendChild(a);const n=et(p2,nt(X({},o),{Close:()=>{l()}}));n.mount(a);const l=()=>{n.unmount(),a.remove()};return{Close:l}};const m2={class:"app-container_linkease"},f2={class:"linkease-item"},v2={class:"linkease-item_name"},b2={class:"linkease-item_value"},g2={key:0,class:"configure"},_2={key:0,class:"linkease-item"},h2={class:"linkease-item_name"},x2={class:"linkease-item_value"},k2=["href"],w2={href:" https://app.linkease.com/",target:"_blank"},y2=I({props:{linkease:{type:Object}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=U(()=>{var p;return`http://${location.hostname}:${(p=a.linkease)==null?void 0:p.port}`}),r=()=>{Me({setup:0})};return(p,x)=>{var _,b,m;return s(),u("ul",m2,[t("li",f2,[t("div",v2,[t("span",null,i(e(n)("\u5F53\u524D\u72B6\u6001:")),1)]),t("div",b2,[(_=o.linkease)!=null&&_.enabel?(s(),u("span",g2,i(e(n)("\u5DF2\u914D\u7F6E")),1)):(s(),u("span",{key:1,class:"configure enabel",onClick:x[0]||(x[0]=c=>r())},i(e(n)("\u672A\u914D\u7F6E")),1))])]),(b=o.linkease)!=null&&b.enabel?(s(),u(N,{key:0},[(m=o.linkease)!=null&&m.port?(s(),u("li",_2,[t("div",h2,[t("span",null,i(e(n)("\u670D\u52A1\u5730\u5740:")),1)]),t("div",x2,[t("a",{href:e(d),target:"_blank",rel:"noopener noreferrer"},i(e(d)),9,k2)])])):D("",!0)],64)):D("",!0),t("div",null,[t("a",w2,i(e(n)("\u4E0B\u8F7D\u6613\u6709\u4E91\u5BA2\u6237\u7AEF\uFF0C\u968F\u65F6\u968F\u5730\u76F8\u518C\u5907\u4EFD\u3001\u8FDC\u7A0B\u8BBF\u95EE")),1)])])}}});var F2=S(y2,[["__scopeId","data-v-55d1fac2"]]);const E2={class:"app-container"},C2={class:"app-container_title"},$2={class:"app-container_tool"},D2=["title"],B2={class:"DeviceBlock"},Y2={href:"/cgi-bin/luci/admin/services/samba4"},A2={class:"app-container_body"},S2={class:"app-container_nas-menu"},z2=I({setup(o){const{$gettext:a,$ngettext:n}=q(),l=E(!1),d=E("linkease"),r=E(),p=De();(()=>{P.Nas.Service.Status.GET().then(c=>{var f;if((f=c==null?void 0:c.data)!=null&&f.result){const v=c.data.result;r.value=v,v.webdav&&(p.webdav=v.webdav)}})})();const _=()=>{Me({setup:0})},b=()=>{l.value=!l.value},m=()=>{b(),ut.installAndGo("app-meta-gowebdav","GoWebDAV","/cgi-bin/luci/admin/nas/gowebdav")};return(c,f)=>{var g,k,h;const v=K("GlHelp");return s(),u("div",E2,[t("div",C2,[t("span",null,[t("span",null,i(e(a)("\u5B58\u50A8\u670D\u52A1")),1),A(v,{type:"store"})]),t("div",$2,[t("div",{class:"app-container_configure",onClick:_},i(e(a)("\u5FEB\u901F\u914D\u7F6E")),1),t("span",{class:"more_icon",title:e(a)("\u67E5\u770B\u5B58\u50A8\u670D\u52A1\u4FE1\u606F")},[A(kt,{onClick:b})],8,D2)]),L(t("div",B2,[t("div",{class:"menu_background",onClick:b}),t("ul",null,[t("li",null,[t("a",Y2,i(e(a)("SAMBA\u9AD8\u7EA7\u914D\u7F6E")),1)]),t("li",null,[t("a",{onClick:m},i(e(a)("WebDAV\u9AD8\u7EA7\u914D\u7F6E")),1)])])],512),[[bt,l.value]])]),t("div",A2,[t("ul",S2,[t("button",{onClick:f[0]||(f[0]=w=>d.value="linkease"),class:rt({on:d.value=="linkease"})},i(e(a)("\u6613\u6709\u4E91")),3),t("button",{onClick:f[1]||(f[1]=w=>d.value="samba"),class:rt({on:d.value=="samba"})},i(e(a)("SAMBA")),3),t("button",{onClick:f[2]||(f[2]=w=>d.value="webdav"),class:rt({on:d.value=="webdav"})},i(e(a)("WEBDAV")),3)]),d.value=="samba"?(s(),V(Ql,{key:0,sambas:(g=r.value)==null?void 0:g.sambas},null,8,["sambas"])):d.value=="webdav"?(s(),V(vc,{key:1,webdav:(k=r.value)==null?void 0:k.webdav},null,8,["webdav"])):d.value=="linkease"?(s(),V(F2,{key:2,linkease:(h=r.value)==null?void 0:h.linkease},null,8,["linkease"])):D("",!0)])])}}});var P2=S(z2,[["__scopeId","data-v-1e1fa308"]]);const T2=o=>(W("data-v-3b1e9470"),o=o(),Z(),o),L2={class:"app-container_docker"},I2={class:"docker-item"},M2={class:"docker-item_name"},O2={key:0,class:"docker-item_value"},N2={class:"configure"},q2={key:1,class:"docker-item_value"},V2={class:"input-switch"},G2=["value","disabled"],j2=T2(()=>t("em",null,null,-1)),R2=[j2],U2={key:0,class:"docker-item"},H2={class:"docker-item_name"},W2={class:"docker-item_value"},Z2={class:"configure enabel"},J2={key:0},X2={class:"tooltip-trigger"},K2={class:"docker_tip"},Q2={class:"tooltip-text tooltip-top"},t5={class:"docker_dir_tip"},e5=I({props:{docker:{type:Object}},setup(o){var x;const a=o,{$gettext:n,$ngettext:l}=q(),d=U(()=>{var _;return((_=a.docker)==null?void 0:_.status)!="not installed"}),r=dt({enable:((x=a.docker)==null?void 0:x.status)=="running",disabled:!1}),p=()=>M(this,null,function*(){r.disabled=!0;try{const _=yield P.Guide.DockerSwitch.POST({enable:r.enable});if(_!=null&&_.data){const{success:b,error:m}=_.data;if(m)throw r.enable=!r.enable,m;(b||0)==0}}catch(_){C.Warning(`${_}`)}finally{r.disabled=!1}});return(_,b)=>{var m,c,f,v;return s(),u("ul",L2,[t("li",I2,[t("div",M2,[t("span",null,i(e(n)("\u5F53\u524D\u72B6\u6001:")),1)]),(m=a.docker)!=null&&m.status?(s(),u(N,{key:0},[e(d)?(s(),u("div",q2,[t("label",V2,[L(t("input",{type:"checkbox",hidden:"",value:!e(r).enable,"onUpdate:modelValue":b[0]||(b[0]=g=>e(r).enable=g),disabled:e(r).disabled,onChange:p},null,40,G2),[[Ct,e(r).enable]]),t("span",{class:rt(e(r).enable?"enable":"close")},R2,2)])])):(s(),u("div",O2,[t("span",N2,i(e(n)("\u672A\u5B89\u88C5")),1)]))],64)):D("",!0)]),((c=o.docker)==null?void 0:c.status)=="running"?(s(),u("li",U2,[t("div",H2,[t("span",null,i(e(n)("Docker\u6839\u76EE\u5F55\uFF1A")),1)]),t("div",W2,[t("span",Z2,i((f=o.docker)==null?void 0:f.path),1),(v=o.docker)!=null&&v.errorInfo?(s(),u("span",J2,[t("span",X2,[t("span",K2,[A(pt)]),t("div",null,[t("div",Q2,[t("span",t5,i(o.docker.errorInfo),1)])])])])):D("",!0)])])):D("",!0)])}}});var a5=S(e5,[["__scopeId","data-v-3b1e9470"]]);const o5={},n5={width:"128px",height:"128px",viewBox:"0 0 128 128",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},i5=t("g",{id:"icon_yellow",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},[t("g",{id:"Icon/Warning"},[t("rect",{id:"\u77E9\u5F62",fill:"#000000","fill-rule":"nonzero",opacity:"0",x:"0",y:"0",width:"128",height:"128"}),t("path",{d:"M64,8 C33.075,8 8,33.075 8,64 C8,94.925 33.075,120 64,120 C94.925,120 120,94.925 120,64 C120,33.075 94.925,8 64,8 Z M60,37 C60,36.45 60.45,36 61,36 L67,36 C67.55,36 68,36.45 68,37 L68,71 C68,71.55 67.55,72 67,72 L61,72 C60.45,72 60,71.55 60,71 L60,37 Z M64,92 C60.6875,92 58,89.3125 58,86 C58,82.6875 60.6875,80 64,80 C67.3125,80 70,82.6875 70,86 C70,89.3125 67.3125,92 64,92 Z",id:"\u5F62\u72B6",fill:"#FAAD14"})])],-1),r5=[i5];function s5(o,a){return s(),u("svg",n5,r5)}var d5=S(o5,[["render",s5]]);const u5={key:0,class:"action"},l5={class:"title"},c5={class:"desc"},p5={class:"roots"},m5={class:"roots_tit"},f5={class:"root"},v5={class:"move"},b5={class:"roots_tit"},g5={key:0},_5=["onSubmit"],h5={class:"select-editable"},x5={selected:"",value:null},k5=["value"],w5={value:"useInput"},y5=["placeholder"],F5={key:1,class:"tips"},E5={class:"tips_content"},C5={class:"tip"},$5={key:0,class:"btns"},D5={key:1,class:"btns"},B5={key:1,class:"action docker_success"},Y5={class:"title"},A5={class:"finished"},S5={class:"successed"},z5={class:"btns"},P5={key:2,class:"action docker_download"},T5={class:"title"},L5={class:"finished"},I5={class:"successed"},M5={class:"docker_moves"},O5={class:"moves change"},N5={for:"move"},q5={class:"moves"},V5={for:"cover"},G5={class:"btns"},j5=I({props:{rootPath:{type:String,required:!0},Close:Function},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(),r=E(),p=E(0),x=E("null"),_=E(""),b=E(),m=E(!1),c=E("");(()=>{P.Nas.Disk.Status.GET().then(F=>{F!=null&&F.data.result&&(b.value=F==null?void 0:F.data.result)}),P.Guide.DockerStatus.GET().then(F=>{var B;if((B=F==null?void 0:F.data)!=null&&B.result){const Y=F.data.result;d.value=Y}}),P.Guide.DockerPartitionList.GET().then(F=>{var B;if((B=F==null?void 0:F.data)!=null&&B.result){const Y=F.data.result;r.value=Y}})})();const v=F=>{let B=x.value;if(B=="useInput"&&(B=_.value),B==null||B=="null"||B=="")return;const Y=C.Loading(n("\u6B63\u5728\u8FC1\u79FB\u4E2D..."));P.Guide.DockerTransfer.POST({path:B,force:F,overwriteDir:!!c.value}).then($=>{var z;if($!=null&&$.data){if(($.data.success||0)==0){if((z=$.data.result)!=null&&z.emptyPathWarning){m.value=!0,p.value=2;return}p.value=1;return}else if($.data.error)throw $.data.error}throw n("\u672A\u77E5\u9519\u8BEF")}).catch($=>{C.Error($)}).finally(()=>Y.Close())},g=()=>{m.value=!1,v(!1)},k=F=>{F.preventDefault(),a.Close&&a.Close()},h=F=>{F.preventDefault(),location.reload()},w=F=>{F.preventDefault(),p.value=0},y=F=>{F.preventDefault(),v(!0)};return(F,B)=>(s(),V(ot,{Close:o.Close,type:1},{default:G(()=>{var Y,$,z,T,J,j;return[p.value==0?(s(),u("div",u5,[t("h2",l5,i(e(n)("Docker\u8FC1\u79FB\u5411\u5BFC")),1),t("p",c5,i(e(n)("\u5F53\u7CFB\u7EDF\u6839\u76EE\u5F55\u7A7A\u95F4\u4E0D\u8DB3\u65F6\uFF0C\u53EF\u5C06Docker\u6839\u76EE\u5F55\u8FC1\u79FB\u5230\u5916\u7F6E\u786C\u76D8\uFF0C\u4EE5\u4FDD\u8BC1\u7CFB\u7EDF\u7684\u6B63\u5E38\u8FD0\u884C\uFF08\u76EE\u6807\u5206\u533A\u4E0D\u652F\u6301NTFS\uFF0CFAT\u7B49\u6587\u4EF6\u7CFB\u7EDF\uFF09")),1),t("div",p5,[t("span",m5,i(e(n)("Docker\u6839\u76EE\u5F55\uFF1A")),1),t("span",f5,i((Y=d.value)==null?void 0:Y.path),1)]),t("div",v5,[t("span",b5,i(e(n)("\u8FC1\u79FB\u5230\uFF1A")),1),(z=($=r.value)==null?void 0:$.partitionList)!=null&&z.length?(s(),u("div",g5,[t("form",{onSubmit:st(g,["prevent"])},[t("label",null,[t("div",h5,[L(t("select",{"onUpdate:modelValue":B[0]||(B[0]=Q=>x.value=Q)},[t("option",x5,i(e(n)("\u8BF7\u9009\u62E9\u8FC1\u79FB\u8DEF\u5F84")),1),(s(!0),u(N,null,R((T=r.value)==null?void 0:T.partitionList,(Q,ht)=>(s(),u("option",{value:Q,key:ht},i(Q),9,k5))),128)),t("option",w5,i(e(n)("- -\u81EA\u5B9A\u4E49- -")),1)],512),[[tt,x.value,void 0,{trim:!0}]]),x.value=="useInput"?L((s(),u("input",{key:0,type:"text","onUpdate:modelValue":B[1]||(B[1]=Q=>_.value=Q),required:"",placeholder:e(n)("\u8BF7\u8F93\u5165\u8FC1\u79FB\u8DEF\u5F84")},null,8,y5)),[[H,_.value,void 0,{trim:!0}]]):D("",!0)])])],40,_5)])):r.value?(s(),u("div",F5,[t("div",E5,[A(pt),t("span",C5,i(e(n)("\u68C0\u6D4B\u5230\u60A8\u8FD8\u6CA1\u6709\u6302\u8F7D\u5916\u7F6E\u786C\u76D8\u6216\u5206\u533A\u5C0F\u4E8E8GB\uFF0C\u9700\u8981\u60A8\u63A5\u4E0A\u786C\u76D8\u5E76\u683C\u5F0F\u5316\u6216\u624B\u52A8\u6302\u8F7D\u786C\u76D8\u540E\uFF0C\u518D\u6267\u884CDocker\u8FC1\u79FB\u5411\u5BFC\uFF0C\u5C06Docker\u8FC1\u79FB\u5230\u76EE\u6807\u786C\u76D8\u3002")),1)])])):D("",!0)]),(j=(J=r.value)==null?void 0:J.partitionList)!=null&&j.length?(s(),u("div",$5,[t("button",{class:"cbi-button cbi-button-apply",onClick:g},i(e(n)("\u786E\u5B9A")),1),t("button",{class:"cbi-button cbi-button-remove app-btn app-back",type:"button",onClick:k},i(e(n)("\u53D6\u6D88")),1)])):(s(),u("div",D5,[t("button",{class:"cbi-button cbi-button-apply",onClick:k},i(e(n)("\u786E\u5B9A")),1)]))])):p.value==1?(s(),u("div",B5,[t("h2",Y5,i(e(n)("Docker\u8FC1\u79FB\u5411\u5BFC")),1),t("div",A5,[A(ie)]),t("p",S5,i(e(n)("\u8FC1\u79FB\u6210\u529F\uFF01")),1),t("div",z5,[t("button",{class:"cbi-button cbi-button-apply",onClick:h},i(e(n)("\u786E\u5B9A")),1)])])):p.value==2?(s(),u("div",P5,[t("h2",T5,i(e(n)("Docker\u8FC1\u79FB\u5411\u5BFC")),1),t("div",L5,[A(d5)]),t("p",I5,i(e(n)("\u8BE5\u76EE\u6807\u8DEF\u5F84\u4E0D\u4E3A\u7A7A")),1),t("div",M5,[t("div",O5,[L(t("input",{type:"radio",id:"move",name:"moves","onUpdate:modelValue":B[2]||(B[2]=Q=>c.value=Q),value:""},null,512),[[lt,c.value]]),t("label",N5,i(e(n)("\u66F4\u6362\u76EE\u5F55\uFF08\u4E0D\u8986\u76D6\u76EE\u6807\u8DEF\u5F84\uFF0C\u4EC5\u5C06Docker\u76EE\u5F55\u4FEE\u6539\u4E3A\u76EE\u6807\u8DEF\u5F84\uFF09")),1)]),t("div",q5,[L(t("input",{type:"radio",id:"cover",name:"moves","onUpdate:modelValue":B[3]||(B[3]=Q=>c.value=Q),value:"true"},null,512),[[lt,c.value]]),t("label",V5,i(e(n)("\u8986\u76D6\u8FC1\u79FB\uFF08\u8986\u76D6\u76EE\u6807\u8DEF\u5F84\uFF0C\u7EE7\u7EED\u8FC1\u79FB\u4F1A\u6E05\u7A7A\u8BE5\u76EE\u6807\u8DEF\u5F84\u4E0B\u7684\u6587\u4EF6\uFF09")),1)])]),t("div",G5,[m.value?(s(),u("button",{key:0,class:"cbi-button cbi-button-apply",onClick:y},i(e(n)("\u786E\u5B9A")),1)):D("",!0),t("button",{class:"cbi-button cbi-button-apply",onClick:w},i(e(n)("\u8FD4\u56DE")),1),m.value?D("",!0):(s(),u("button",{key:1,class:"cbi-button cbi-button-remove app-btn app-back",type:"button",onClick:h},i(e(n)("\u53D6\u6D88")),1))])])):D("",!0)]}),_:1},8,["Close"]))}});var R5=S(j5,[["__scopeId","data-v-919e529c"]]);const U5=()=>{const o=document.createElement("div");document.body.appendChild(o);const a=et(R5,{Close:()=>{n()}});a.mount(o);const n=()=>{a.unmount(),o.remove()};return{Close:n}},H5=o=>(W("data-v-fcb97952"),o=o(),Z(),o),W5={class:"app-container"},Z5={class:"app-container_title"},J5=H5(()=>t("span",null,"Docker",-1)),X5={key:0,class:"app-container_tool"},K5=["title"],Q5={class:"DeviceBlock"},t6={href:"/cgi-bin/luci/admin/docker/overview"},e6={key:1,class:"loading_placeholder"},a6=I({props:{docker:{type:Object}},setup(o){const{$gettext:a,$ngettext:n}=q(),l=E(!1),d=E(),r=E(!1),p=()=>{r.value=!r.value},x=()=>{U5()};return setTimeout(()=>{P.Guide.DockerStatus.GET().then(b=>{var m;if((m=b==null?void 0:b.data)!=null&&m.result){const c=b.data.result;d.value=c}}).finally(()=>{l.value=!0})},1100),(b,m)=>{var v,g;const c=K("GlHelp"),f=K("icon-loading");return s(),u("div",W5,[t("div",Z5,[t("span",null,[J5,A(c,{type:"docker"})]),l.value?(s(),u("div",X5,[((v=d.value)==null?void 0:v.status)!="not installed"?(s(),u("div",{key:0,class:"app-container_configure",onClick:x},i(e(a)("\u5FEB\u901F\u914D\u7F6E")),1)):D("",!0),((g=d.value)==null?void 0:g.status)==="running"?(s(),u("span",{key:1,class:"more_icon",title:e(a)("Docker\u7BA1\u7406")},[A(kt,{onClick:p})],8,K5)):D("",!0)])):D("",!0),L(t("div",Q5,[t("div",{class:"menu_background",onClick:p}),t("ul",null,[t("li",null,[t("a",t6,i(e(a)("Docker\u9AD8\u7EA7\u914D\u7F6E")),1)])])],512),[[bt,r.value]])]),t("div",null,[l.value?(s(),V(a5,{key:0,docker:d.value},null,8,["docker"])):(s(),u("div",e6,[A(f,{size:50,color:"currentColor"})]))])])}}});var o6=S(a6,[["__scopeId","data-v-fcb97952"]]);const n6={class:"app-container_aria2"},i6={class:"aria2-item"},r6={class:"aria2-item_name"},s6={class:"aria2-item_value"},d6={key:0,class:"configure"},u6={key:1,class:"configure enabel"},l6={class:"aria2-item"},c6={class:"aria2-item_name"},p6={class:"aria2-item_value"},m6=["href"],f6={class:"aria2-item"},v6={class:"aria2-item_name"},b6={class:"aria2-item_value"},g6=["href"],_6={class:"aria2-item"},h6={class:"aria2-item_name right"},x6={class:"aria2-item_value"},k6=["href"],w6={class:"use-url_app"},y6={href:"https://doc.linkease.com/zh/guide/linkease_app/tutorial.html#%E8%BF%9C%E7%A8%8B%E4%B8%8B%E8%BD%BD",target:"_blank"},F6=I({props:{aria2:{type:Object}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=U(()=>{var p;return`${location.origin}${(p=a.aria2)==null?void 0:p.webPath}`}),r=U(()=>{var _,b,m;let p=(_=a.aria2)==null?void 0:_.rpcToken;p?p=encodeURIComponent(btoa(p)):p="";const x=encodeURIComponent(location.hostname);return`${location.origin}${(b=a.aria2)==null?void 0:b.webPath}/#!/settings/rpc/set/http/${x}/${(m=a.aria2)==null?void 0:m.rpcPort}/jsonrpc/${p}`});return(p,x)=>{var _,b,m,c;return s(),u("ul",n6,[t("li",i6,[t("div",r6,[t("span",null,i(e(n)("\u5F53\u524D\u72B6\u6001:")),1)]),t("div",s6,[((_=o.aria2)==null?void 0:_.status)=="running"?(s(),u("span",d6,i(e(n)("\u5DF2\u542F\u52A8")),1)):(s(),u("span",u6,i(e(n)("\u672A\u542F\u52A8")),1))])]),((b=o.aria2)==null?void 0:b.status)=="running"?(s(),u(N,{key:0},[t("li",l6,[t("div",c6,[t("span",null,i(e(n)("\u4E0B\u8F7D\u76EE\u5F55:")),1)]),t("div",p6,[t("a",{target:"_blank",href:"/cgi-bin/luci/admin/services/linkease/file/?path=/root"+((m=o.aria2)==null?void 0:m.downloadPath)},i((c=o.aria2)==null?void 0:c.downloadPath),9,m6)])]),t("li",f6,[t("div",v6,[t("span",null,i(e(n)("\u7F51\u7EDC\u5730\u5740:")),1)]),t("div",b6,[t("a",{href:e(d),target:"_blank",rel:"noopener noreferrer"},i(e(d)),9,g6)])]),t("li",_6,[t("div",h6,[t("span",null,i(e(n)("\u8BA4\u8BC1\u5931\u8D25\uFF1F")),1)]),t("div",x6,[t("a",{href:e(r),target:"_blank",rel:"noopener noreferrer"},i(e(n)("\u70B9\u6B64\u81EA\u52A8\u914D\u7F6E AriaNg")),9,k6)])])],64)):D("",!0),t("div",w6,[t("a",y6,i(e(n)("\u4F7F\u7528\u6613\u6709\u4E91APP\uFF0C\u968F\u65F6\u968F\u5730\u8FDC\u7A0B\u4E0B\u8F7D")),1)])])}}});var E6=S(F6,[["__scopeId","data-v-40652d1d"]]);const C6={class:"app-container_qbittorrent"},$6={class:"qbittorrent-item"},D6={class:"qbittorrent-item_name"},B6={class:"qbittorrent-item_value"},Y6={key:0,class:"configure"},A6={key:1,class:"configure enabel"},S6={class:"qbittorrent-item"},z6={class:"qbittorrent-item_name"},P6={class:"qbittorrent-item_value"},T6=["href"],L6={class:"qbittorrent-item"},I6={class:"qbittorrent-item_name"},M6={class:"qbittorrent-item_value"},O6=["href"],N6={class:"qbittorrent-item"},q6={class:"qbittorrent-item_name right"},V6={class:"qbittorrent-item_value"},G6=I({props:{qbittorrent:{type:Object}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=U(()=>{var r;return`http://${location.hostname}${(r=a.qbittorrent)==null?void 0:r.webPath}`});return(r,p)=>{var x,_,b,m;return s(),u("ul",C6,[t("li",$6,[t("div",D6,[t("span",null,i(e(n)("\u5F53\u524D\u72B6\u6001:")),1)]),t("div",B6,[((x=o.qbittorrent)==null?void 0:x.status)=="running"?(s(),u("span",Y6,i(e(n)("\u5DF2\u542F\u52A8")),1)):(s(),u("span",A6,i(e(n)("\u672A\u542F\u52A8")),1))])]),((_=o.qbittorrent)==null?void 0:_.status)=="running"?(s(),u(N,{key:0},[t("li",S6,[t("div",z6,[t("span",null,i(e(n)("\u4E0B\u8F7D\u76EE\u5F55:")),1)]),t("div",P6,[t("a",{target:"_blank",href:"/cgi-bin/luci/admin/services/linkease/file/?path=/root"+((b=o.qbittorrent)==null?void 0:b.downloadPath)},i((m=o.qbittorrent)==null?void 0:m.downloadPath),9,T6)])]),t("li",L6,[t("div",I6,[t("span",null,i(e(n)("\u7F51\u7EDC\u5730\u5740:")),1)]),t("div",M6,[t("a",{href:e(d),target:"_blank",rel:"noopener noreferrer"},i(e(d)),9,O6)])]),t("li",N6,[t("div",q6,[t("span",null,i(e(n)("\u9ED8\u8BA4\u7528\u6237\u540D\uFF1A"))+"admin",1)]),t("div",V6,[t("span",null,i(e(n)("\u9ED8\u8BA4\u5BC6\u7801\uFF1A"))+"adminadmin",1)])])],64)):D("",!0)])}}});var j6=S(G6,[["__scopeId","data-v-96972a5a"]]);const R6={class:"app-container_transmission"},U6={class:"transmission-item"},H6={class:"transmission-item_name"},W6={class:"transmission-item_value"},Z6={key:0,class:"configure"},J6={key:1,class:"configure enabel"},X6={class:"transmission-item"},K6={class:"transmission-item_name"},Q6={class:"transmission-item_value"},t3=["href"],e3={class:"transmission-item"},a3={class:"transmission-item_name"},o3={class:"transmission-item_value"},n3=["href"],i3=I({props:{transmission:{type:Object}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=U(()=>{var r;return`http://${location.hostname}${(r=a.transmission)==null?void 0:r.webPath}`});return(r,p)=>{var x,_,b,m;return s(),u("ul",R6,[t("li",U6,[t("div",H6,[t("span",null,i(e(n)("\u5F53\u524D\u72B6\u6001:")),1)]),t("div",W6,[((x=o.transmission)==null?void 0:x.status)=="running"?(s(),u("span",Z6,i(e(n)("\u5DF2\u542F\u52A8")),1)):(s(),u("span",J6,i(e(n)("\u672A\u542F\u52A8")),1))])]),((_=o.transmission)==null?void 0:_.status)=="running"?(s(),u(N,{key:0},[t("li",X6,[t("div",K6,[t("span",null,i(e(n)("\u4E0B\u8F7D\u76EE\u5F55:")),1)]),t("div",Q6,[t("a",{target:"_blank",href:"/cgi-bin/luci/admin/services/linkease/file/?path=/root"+((b=o.transmission)==null?void 0:b.downloadPath)},i((m=o.transmission)==null?void 0:m.downloadPath),9,t3)])]),t("li",e3,[t("div",a3,[t("span",null,i(e(n)("\u7F51\u7EDC\u5730\u5740:")),1)]),t("div",o3,[t("a",{href:e(d),target:"_blank",rel:"noopener noreferrer"},i(e(d)),9,n3)])])],64)):D("",!0)])}}});var r3=S(i3,[["__scopeId","data-v-05c8d77a"]]);const s3={},d3={width:"14px",height:"14px",viewBox:"0 0 14 14",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},u3=t("path",{d:"M7,0.875 C3.61757813,0.875 0.875,3.61757813 0.875,7 C0.875,10.3824219 3.61757813,13.125 7,13.125 C10.3824219,13.125 13.125,10.3824219 13.125,7 C13.125,3.61757813 10.3824219,0.875 7,0.875 Z M6.5625,4.046875 C6.5625,3.98671875 6.61171875,3.9375 6.671875,3.9375 L7.328125,3.9375 C7.38828125,3.9375 7.4375,3.98671875 7.4375,4.046875 L7.4375,7.765625 C7.4375,7.82578125 7.38828125,7.875 7.328125,7.875 L6.671875,7.875 C6.61171875,7.875 6.5625,7.82578125 6.5625,7.765625 L6.5625,4.046875 Z M7,10.0625 C6.63769531,10.0625 6.34375,9.76855469 6.34375,9.40625 C6.34375,9.04394531 6.63769531,8.75 7,8.75 C7.36230469,8.75 7.65625,9.04394531 7.65625,9.40625 C7.65625,9.76855469 7.36230469,10.0625 7,10.0625 Z",id:"\u5F62\u72B6","fill-opacity":"0.65"},null,-1),l3=[u3];function c3(o,a){return s(),u("svg",d3,l3)}var Ft=S(s3,[["render",c3]]);const Xt=o=>(W("data-v-7b328460"),o=o(),Z(),o),p3={key:0,class:"action"},m3={class:"title"},f3={class:"load_service input_row"},v3={class:"left"},b3={class:"radios"},g3=Xt(()=>t("label",{for:"Aria2"},"Aria2",-1)),_3={class:"radios"},h3=Xt(()=>t("label",{for:"qB"},"qBittorrent",-1)),x3={class:"radios"},k3=Xt(()=>t("label",{for:"Tr"},"Transmission",-1)),w3=["onSubmit"],y3={class:"input_row"},F3={class:"left"},E3={class:"tooltip-trigger"},C3={class:"tooltip-text tooltip-top"},$3={class:"dowload_dir_tip"},D3={class:"myinput_wrap"},B3={class:"input_row"},Y3={class:"left"},A3={class:"tooltip-trigger"},S3={class:"tooltip-text tooltip-top"},z3={class:"dowload_dir_tip"},P3={class:"myinput_wrap"},T3={class:"input_row"},L3={class:"left"},I3={class:"tooltip-trigger"},M3={class:"tooltip-text tooltip-bottom"},O3={class:"dowload_rpc_tip"},N3=["placeholder"],q3={class:"input_row"},V3={class:""},G3={class:"radios"},j3={for:"default"},R3={class:"radios"},U3={for:"add"},H3={class:"input_row"},W3=Xt(()=>t("div",{class:"left"},null,-1)),Z3={class:"myinput_wrap Tracker_input"},J3=["placeholder"],X3=["onSubmit"],K3={class:"input_row"},Q3={class:"left"},t8={class:"tooltip-trigger"},e8={class:"tooltip-text tooltip-top"},a8={class:"dowload_dir_tip"},o8={class:"myinput_wrap"},n8={class:"input_row"},i8={class:"left"},r8={class:"tooltip-trigger"},s8={class:"tooltip-text tooltip-top"},d8={class:"dowload_dir_tip"},u8={class:"myinput_wrap"},l8=["onSubmit"],c8={class:"input_row"},p8={class:"left"},m8={class:"tooltip-trigger"},f8={class:"tooltip-text tooltip-top"},v8={class:"dowload_dir_tip"},b8={class:"myinput_wrap"},g8={class:"input_row"},_8={class:"left"},h8={class:"tooltip-trigger"},x8={class:"tooltip-text tooltip-top"},k8={class:"dowload_dir_tip"},w8={class:"myinput_wrap"},y8={class:"btns"},F8={key:1,class:"action"},E8={class:"title"},C8={class:"finished"},$8={class:"successed"},D8={class:"btns"},B8=I({props:{services:{type:Object,required:!0},partitionList:{type:Array,required:!0},defaultTab:{type:String,required:!1},Close:Function},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(""),r=E(""),p=E(""),x=E(""),_=E("default"),b=E("Aria2"),m=E(""),c=E(""),f=E(""),v=E(""),g=E([]),k=E([]),h=E(0);_t(()=>{var j,Q,ht,ce,pe,me,fe,ve,be,ge;switch(a.defaultTab){case"aria2":b.value="Aria2";break;case"qbittorrent":b.value="qBittorrent";break;case"transmission":b.value="Transmission";break}g.value=a.partitionList.map(Pt=>({key:Pt})),k.value=a.partitionList.filter(Pt=>Pt.startsWith("/mnt/")).map(Pt=>Pt.replace(/(\/mnt\/[^/]+).*/,"$1")),p.value=((j=a.services.aria2)==null?void 0:j.configPath)||"";const $=((Q=a.services.aria2)==null?void 0:Q.downloadPath)||((ht=a.services.qbittorrent)==null?void 0:ht.downloadPath)||((ce=a.services.transmission)==null?void 0:ce.downloadPath);$&&(x.value=$);const z=(pe=a.services.aria2)==null?void 0:pe.rpcToken;z&&(d.value=z),m.value=((me=a.services.qbittorrent)==null?void 0:me.configPath)||"";const T=((fe=a.services.qbittorrent)==null?void 0:fe.downloadPath)||$||((ve=a.services.transmission)==null?void 0:ve.downloadPath);T&&(c.value=T),f.value=((be=a.services.transmission)==null?void 0:be.configPath)||"";const J=((ge=a.services.transmission)==null?void 0:ge.downloadPath)||$||T;J&&(v.value=J)});const w=()=>{let $=p.value,z=x.value;$==null||$==""||z==null||z==""||M(this,null,function*(){if(yield ut.checkAndInstallApp("app-meta-aria2","Aria2")){const J=C.Loading(n("\u914D\u7F6E\u4E2D..."));P.Guide.Aria2Init.POST({configPath:$,downloadPath:z,rpcToken:d.value,btTracker:_.value=="add"?r.value:""}).then(j=>{var Q;if(j!=null&&j.data){if((j.data.success||0)==0){h.value=1;return}else if((Q=j.data)!=null&&Q.error)throw j.data.error}throw n("\u672A\u77E5\u9519\u8BEF")}).catch(j=>C.Error(j)).finally(()=>J.Close())}})},y=()=>{let $=m.value,z=c.value;$==null||$==""||z==null||z==""||M(this,null,function*(){if(yield ut.checkAndInstallApp("app-meta-qbittorrent","qBittorrent")){const J=C.Loading(n("\u914D\u7F6E\u4E2D..."));P.Guide.qbitorrentInit.POST({configPath:$,downloadPath:z}).then(j=>{var Q;if(j!=null&&j.data){if((j.data.success||0)==0){h.value=1;return}else if((Q=j.data)!=null&&Q.error)throw j.data.error}throw n("\u672A\u77E5\u9519\u8BEF")}).catch(j=>C.Error(j)).finally(()=>J.Close())}})},F=()=>{let $=f.value,z=v.value;$==null||$==""||z==null||z==""||M(this,null,function*(){if(yield ut.checkAndInstallApp("app-meta-transmission","Transmission")){const J=C.Loading(n("\u914D\u7F6E\u4E2D..."));P.Guide.transmissionInit.POST({configPath:$,downloadPath:z}).then(j=>{var Q;if(j!=null&&j.data){if((j.data.success||0)==0){h.value=1;return}else if((Q=j.data)!=null&&Q.error)throw j.data.error}throw n("\u672A\u77E5\u9519\u8BEF")}).catch(j=>C.Error(j)).finally(()=>J.Close())}})},B=$=>{$.preventDefault(),a.Close&&a.Close()},Y=$=>{$.preventDefault(),location.reload()};return($,z)=>(s(),V(ot,{Close:o.Close,type:1},{default:G(()=>[h.value==0?(s(),u("div",p3,[t("h2",m3,i(e(n)("\u4E0B\u8F7D\u670D\u52A1\u914D\u7F6E\u5411\u5BFC")),1),t("ul",null,[t("li",null,[t("div",f3,[t("div",v3,[t("span",null,i(e(n)("\u4E0B\u8F7D\u670D\u52A1\uFF1A")),1)]),t("div",b3,[L(t("input",{type:"radio",value:"Aria2","onUpdate:modelValue":z[0]||(z[0]=T=>b.value=T),name:"download",id:"Aria2"},null,512),[[lt,b.value]]),g3]),t("div",_3,[L(t("input",{type:"radio",value:"qBittorrent","onUpdate:modelValue":z[1]||(z[1]=T=>b.value=T),name:"download",id:"qB"},null,512),[[lt,b.value]]),h3]),t("div",x3,[L(t("input",{type:"radio",value:"Transmission","onUpdate:modelValue":z[2]||(z[2]=T=>b.value=T),name:"download",id:"Tr"},null,512),[[lt,b.value]]),k3])])])]),b.value=="Aria2"?(s(),u("form",{key:0,onSubmit:st(w,["prevent"])},[t("ul",null,[t("li",null,[t("div",y3,[t("div",F3,[t("span",E3,[A(Ft),t("div",null,[t("div",C3,[t("span",$3,i(e(n)("\u7528\u4E8E\u653E\u7F6E\u914D\u7F6E\u6587\u4EF6\u7684\u76EE\u5F55\u3002\u4F8B\u5982\uFF1A/mnt/sda1/Configs/aria2\uFF1B\u8BF7\u52FF\u4F7F\u7528 /tmp \u6216 /var \uFF0C\u4EE5\u514D\u91CD\u542F\u4EE5\u540E\u4EFB\u52A1\u4E22\u5931")),1)])])]),t("span",null,i(e(n)("\u914D\u7F6E\u76EE\u5F55\uFF1A")),1)]),t("div",D3,[A(Et,{modelValue:p.value,"onUpdate:modelValue":z[3]||(z[3]=T=>p.value=T),modelModifiers:{trim:!0},title:e(n)("\u914D\u7F6E\u76EE\u5F55"),options:k.value.concat("/root").map(T=>({key:T+"/Configs/aria2"}))},null,8,["modelValue","title","options"])])])]),t("li",null,[t("div",B3,[t("div",Y3,[t("span",A3,[A(Ft),t("div",null,[t("div",S3,[t("span",z3,i(e(n)("\u7528\u4E8E\u653E\u7F6E\u4E0B\u8F7D\u6587\u4EF6\u7684\u76EE\u5F55\u3002\u4F8B\u5982\uFF1A/mnt/sda1/download")),1)])])]),t("span",null,i(e(n)("\u4E0B\u8F7D\u76EE\u5F55\uFF1A")),1)]),t("div",P3,[A(Et,{modelValue:x.value,"onUpdate:modelValue":z[4]||(z[4]=T=>x.value=T),modelModifiers:{trim:!0},title:e(n)("\u4E0B\u8F7D\u76EE\u5F55"),options:g.value},null,8,["modelValue","title","options"])])])]),t("li",null,[t("div",T3,[t("div",L3,[t("span",I3,[A(Ft),t("div",null,[t("div",M3,[t("span",O3,i(e(n)("\u7528\u4E8E\u8FDC\u7A0B\u8BBF\u95EE\u7684\u4EE4\u724C\u3002")),1)])])]),t("span",null,i(e(n)("RPC \u4EE4\u724C\uFF1A")),1)]),L(t("input",{type:"text",class:"RPC_input",placeholder:e(n)("\u8BF7\u8F93\u5165RPC\u4EE4\u724C"),"onUpdate:modelValue":z[5]||(z[5]=T=>d.value=T)},null,8,N3),[[H,d.value,void 0,{trim:!0}]])])]),t("li",null,[t("div",q3,[t("div",V3,[t("span",null,i(e(n)("\u9644\u52A0\u7684 BT Tracker\uFF1A")),1)]),t("div",G3,[L(t("input",{type:"radio",value:"default",name:"BT",id:"default","onUpdate:modelValue":z[6]||(z[6]=T=>_.value=T)},null,512),[[lt,_.value]]),t("label",j3,i(e(n)("\u9ED8\u8BA4")),1)]),t("div",R3,[L(t("input",{type:"radio",value:"add",name:"BT",id:"add","onUpdate:modelValue":z[7]||(z[7]=T=>_.value=T)},null,512),[[lt,_.value]]),t("label",U3,i(e(n)("\u81EA\u5DF1\u6DFB\u52A0")),1)])])]),t("li",null,[t("div",H3,[W3,t("div",Z3,[_.value=="add"?L((s(),u("textarea",{key:0,"onUpdate:modelValue":z[8]||(z[8]=T=>r.value=T),rows:"4",placeholder:e(n)("\u8BF7\u8F93\u5165BT Tracker\u670D\u52A1\u5668\u5730\u5740\uFF0C\u591A\u4E2A\u5730\u5740\u4F7F\u7528\u6362\u884C\u6216\u8005\u82F1\u6587\u9017\u53F7\u5206\u9694")},null,8,J3)),[[H,r.value,void 0,{trim:!0}]]):D("",!0)])])])])],40,w3)):D("",!0),b.value=="qBittorrent"?(s(),u("form",{key:1,onSubmit:st(y,["prevent"])},[t("ul",null,[t("li",null,[t("div",K3,[t("div",Q3,[t("span",t8,[A(Ft),t("div",null,[t("div",e8,[t("span",a8,i(e(n)("\u7528\u4E8E\u653E\u7F6E\u914D\u7F6E\u6587\u4EF6\u7684\u76EE\u5F55\u3002\u4F8B\u5982\uFF1A/mnt/sda1/Configs/qb\uFF1B\u8BF7\u52FF\u4F7F\u7528 /tmp \u6216 /var \uFF0C\u4EE5\u514D\u91CD\u542F\u4EE5\u540E\u4EFB\u52A1\u4E22\u5931")),1)])])]),t("span",null,i(e(n)("\u914D\u7F6E\u76EE\u5F55\uFF1A")),1)]),t("div",o8,[A(Et,{modelValue:m.value,"onUpdate:modelValue":z[9]||(z[9]=T=>m.value=T),modelModifiers:{trim:!0},title:e(n)("\u914D\u7F6E\u76EE\u5F55"),options:k.value.concat("/root").map(T=>({key:T+"/Configs/qb"}))},null,8,["modelValue","title","options"])])])]),t("li",null,[t("div",n8,[t("div",i8,[t("span",r8,[A(Ft),t("div",null,[t("div",s8,[t("span",d8,i(e(n)("\u7528\u4E8E\u653E\u7F6E\u4E0B\u8F7D\u6587\u4EF6\u7684\u76EE\u5F55\u3002\u4F8B\u5982\uFF1A/mnt/sda1/download")),1)])])]),t("span",null,i(e(n)("\u4E0B\u8F7D\u76EE\u5F55\uFF1A")),1)]),t("div",u8,[A(Et,{modelValue:c.value,"onUpdate:modelValue":z[10]||(z[10]=T=>c.value=T),modelModifiers:{trim:!0},title:e(n)("\u4E0B\u8F7D\u76EE\u5F55"),options:g.value},null,8,["modelValue","title","options"])])])])])],40,X3)):D("",!0),b.value=="Transmission"?(s(),u("form",{key:2,onSubmit:st(F,["prevent"])},[t("ul",null,[t("li",null,[t("div",c8,[t("div",p8,[t("span",m8,[A(Ft),t("div",null,[t("div",f8,[t("span",v8,i(e(n)("\u7528\u4E8E\u653E\u7F6E\u914D\u7F6E\u6587\u4EF6\u7684\u76EE\u5F55\u3002\u4F8B\u5982\uFF1A/mnt/sda1/Configs/tr\uFF1B\u8BF7\u52FF\u4F7F\u7528 /tmp \u6216 /var \uFF0C\u4EE5\u514D\u91CD\u542F\u4EE5\u540E\u4EFB\u52A1\u4E22\u5931")),1)])])]),t("span",null,i(e(n)("\u914D\u7F6E\u76EE\u5F55\uFF1A")),1)]),t("div",b8,[A(Et,{modelValue:f.value,"onUpdate:modelValue":z[11]||(z[11]=T=>f.value=T),modelModifiers:{trim:!0},title:e(n)("\u914D\u7F6E\u76EE\u5F55"),options:k.value.concat("/root").map(T=>({key:T+"/Configs/transmission"}))},null,8,["modelValue","title","options"])])])]),t("li",null,[t("div",g8,[t("div",_8,[t("span",h8,[A(Ft),t("div",null,[t("div",x8,[t("span",k8,i(e(n)("\u7528\u4E8E\u653E\u7F6E\u4E0B\u8F7D\u6587\u4EF6\u7684\u76EE\u5F55\u3002\u4F8B\u5982\uFF1A/mnt/sda1/download")),1)])])]),t("span",null,i(e(n)("\u4E0B\u8F7D\u76EE\u5F55\uFF1A")),1)]),t("div",w8,[A(Et,{modelValue:v.value,"onUpdate:modelValue":z[12]||(z[12]=T=>v.value=T),modelModifiers:{trim:!0},title:e(n)("\u4E0B\u8F7D\u76EE\u5F55"),options:g.value},null,8,["modelValue","title","options"])])])])])],40,l8)):D("",!0),t("div",y8,[b.value=="Aria2"?(s(),u("button",{key:0,class:"cbi-button cbi-button-apply",onClick:w},i(e(n)("\u542F\u7528")),1)):D("",!0),b.value=="qBittorrent"?(s(),u("button",{key:1,class:"cbi-button cbi-button-apply",onClick:y},i(e(n)("\u542F\u7528")),1)):D("",!0),b.value=="Transmission"?(s(),u("button",{key:2,class:"cbi-button cbi-button-apply",onClick:F},i(e(n)("\u542F\u7528")),1)):D("",!0),t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:B},i(e(n)("\u53D6\u6D88")),1)])])):h.value==1?(s(),u("div",F8,[t("h2",E8,i(e(n)("%{status}\u4E0B\u8F7D\u670D\u52A1\u914D\u7F6E\u5411\u5BFC",{status:b.value})),1),t("div",C8,[A(ie)]),t("p",$8,i(e(n)("\u914D\u7F6E\u6210\u529F\uFF01")),1),t("div",D8,[t("button",{class:"cbi-button cbi-button-apply",onClick:Y},i(e(n)("\u786E\u5B9A")),1)])])):D("",!0)]),_:1},8,["Close"]))}});var Y8=S(B8,[["__scopeId","data-v-7b328460"]]);const A8=o=>{const a=document.createElement("div");document.body.appendChild(a);const n=et(Y8,nt(X({},o),{Close:()=>{l()}}));n.mount(a);const l=()=>{n.unmount(),a.remove()};return{Close:l}},S8={class:"app-container"},z8={class:"app-container_title"},P8={class:"app-container_tool"},T8=["disabled"],L8=["title"],I8={class:"DeviceBlock"},M8={class:"app-container_body"},O8={class:"app-container_nas-menu"},N8=I({setup(o){const{$gettext:a,$ngettext:n}=q();E(!1);const l=E("aria2"),d=E();De(),setTimeout(()=>{P.Guide.DownloadService.Status.GET().then(g=>{var k;if((k=g==null?void 0:g.data)!=null&&k.result){const h=g.data.result;d.value=h}})},800);const p=E(!1),x=E(!1),_=()=>{x.value=!x.value},b=()=>{P.Guide.DownloadPartition.List.GET().then(g=>{var h,w;let k=[];(w=(h=g==null?void 0:g.data)==null?void 0:h.result)!=null&&w.partitionList&&(k=g.data.result.partitionList),A8({services:d.value,partitionList:k,defaultTab:l.value})})},m=(g,k,h)=>M(this,null,function*(){_(),ut.installAndGo(g,k,h)}),c=()=>{m("app-meta-aria2","Aria2","/cgi-bin/luci/admin/services/aria2")},f=()=>{m("app-meta-qbittorrent","qBittorrent","/cgi-bin/luci/admin/nas/qBittorrent")},v=()=>{m("app-meta-transmission","Transmission","/cgi-bin/luci/admin/services/transmission")};return(g,k)=>{var w,y,F;const h=K("GlHelp");return s(),u("div",S8,[t("div",z8,[t("span",null,[t("span",null,i(e(a)("\u4E0B\u8F7D\u670D\u52A1")),1),A(h,{type:"download"})]),t("div",P8,[d.value?(s(),u("div",{key:0,class:"app-container_configure",onClick:b,disabled:p.value},i(e(a)("\u5FEB\u901F\u914D\u7F6E")),9,T8)):D("",!0),t("span",{class:"more_icon",title:e(a)("\u67E5\u770B\u9AD8\u7EA7\u914D\u7F6E")},[A(kt,{onClick:_})],8,L8)]),L(t("div",I8,[t("div",{class:"menu_background",onClick:_}),t("ul",null,[t("li",null,[t("a",{onClick:c},i(e(a)("Aria2\u9AD8\u7EA7\u914D\u7F6E")),1)]),t("li",null,[t("a",{onClick:f},i(e(a)("qBittorrent\u9AD8\u7EA7\u914D\u7F6E")),1)]),t("li",null,[t("a",{onClick:v},i(e(a)("Transmission\u9AD8\u7EA7\u914D\u7F6E")),1)])])],512),[[bt,x.value]])]),t("div",M8,[t("ul",O8,[t("button",{onClick:k[0]||(k[0]=B=>l.value="aria2"),class:rt({on:l.value=="aria2"})},"Aria2",2),t("button",{onClick:k[1]||(k[1]=B=>l.value="qbittorrent"),class:rt({on:l.value=="qbittorrent"})},"qBittorrent",2),t("button",{onClick:k[2]||(k[2]=B=>l.value="transmission"),class:rt({on:l.value=="transmission"})},"Transmission",2)]),l.value=="aria2"?(s(),V(E6,{key:0,aria2:(w=d.value)==null?void 0:w.aria2},null,8,["aria2"])):l.value=="qbittorrent"?(s(),V(j6,{key:1,qbittorrent:(y=d.value)==null?void 0:y.qbittorrent},null,8,["qbittorrent"])):l.value=="transmission"?(s(),V(r3,{key:2,transmission:(F=d.value)==null?void 0:F.transmission},null,8,["transmission"])):D("",!0)])])}}});var q8=S(N8,[["__scopeId","data-v-602f6713"]]);const V8={class:"actioner-container"},G8={class:"actioner-container_header"},j8={class:"actioner-container_body"},R8={class:"label-item"},U8={class:"label_info"},H8={class:"label-item"},W8={class:"label_info"},Z8={class:"label-item"},J8={class:"label_info"},X8={class:"label-item"},K8={class:"label_info"},Q8={class:"actioner-container_footer"},t7=I({props:{onSetup:{type:Function,required:!0},active:{type:String,default:"ddnsto"}},emits:["update:active"],setup(o,{emit:a}){const n=o,{$gettext:l,$ngettext:d}=q(),r=()=>{n.onSetup()},p=E(n.active),x=()=>{switch(a("update:active",p.value),p.value){case"ddnsto":n.onSetup("ddnsto");break;case"ali":n.onSetup("ddns-ali");break;case"dnspod":n.onSetup("ddns-dnspod");break;case"oray":n.onSetup("ddns-oray");break}};return(_,b)=>(s(),u("div",V8,[t("div",G8,[t("span",null,i(e(l)("\u57DF\u540D\u914D\u7F6E\u5411\u5BFC")),1)]),t("div",j8,[t("div",R8,[t("label",null,[L(t("input",{type:"radio","onUpdate:modelValue":b[0]||(b[0]=m=>p.value=m),value:"ddnsto"},null,512),[[lt,p.value]]),t("span",null,i(e(l)("DDNSTO")),1)]),t("p",U8,i(e(l)("DDNSTO \u662F\u4E00\u4E2A\u4E0D\u9700\u8981\u516C\u7F51IP\u4E5F\u53EF\u4EE5\u5728\u5916\u7F51\u8BBF\u95EE\u7684\u7A7F\u900F\u57DF\u540D\u670D\u52A1\uFF0C\u4E00\u4E2A\u6D4F\u89C8\u5668\u641E\u5B9A\u5185\u7F51\u7A7F\u900F\uFF0C\u8FDC\u7A0B\u8BBF\u95EEOpenwrt\u3001\u8FDC\u7A0B\u7EC8\u7AEF\u3001\u8FDC\u7A0B\u684C\u9762...")),1)]),t("div",H8,[t("label",null,[L(t("input",{type:"radio","onUpdate:modelValue":b[1]||(b[1]=m=>p.value=m),value:"ali"},null,512),[[lt,p.value]]),t("span",null,i(e(l)("\u963F\u91CC\u4E91")),1)]),t("p",W8,i(e(l)("\u4E3A\u62E5\u6709\u52A8\u6001IP\u7684\u4E3B\u673A\u914D\u7F6E\u4E00\u4E2A\u56FA\u5B9A\u7684\u53EF\u8BBF\u95EE\u57DF\u540D")),1)]),t("div",Z8,[t("label",null,[L(t("input",{type:"radio","onUpdate:modelValue":b[2]||(b[2]=m=>p.value=m),value:"dnspod"},null,512),[[lt,p.value]]),t("span",null,i(e(l)("Dnspod")),1)]),t("p",J8,i(e(l)("\u4E3A\u62E5\u6709\u52A8\u6001IP\u7684\u4E3B\u673A\u914D\u7F6E\u4E00\u4E2A\u56FA\u5B9A\u7684\u53EF\u8BBF\u95EE\u57DF\u540D")),1)]),t("div",X8,[t("label",null,[L(t("input",{type:"radio","onUpdate:modelValue":b[3]||(b[3]=m=>p.value=m),value:"oray"},null,512),[[lt,p.value]]),t("span",null,i(e(l)("\u82B1\u751F\u58F3")),1)]),t("p",K8,i(e(l)("\u4E3A\u62E5\u6709\u52A8\u6001IP\u7684\u4E3B\u673A\u914D\u7F6E\u4E00\u4E2A\u56FA\u5B9A\u7684\u53EF\u8BBF\u95EE\u57DF\u540D")),1)])]),t("div",Q8,[t("div",{class:"close",onClick:r},i(e(l)("\u53D6\u6D88")),1),t("div",{class:"next",onClick:x},i(e(l)("\u4E0B\u4E00\u6B65")),1)])]))}});var e7=S(t7,[["__scopeId","data-v-46dd945e"]]);const a7=o=>(W("data-v-8a3b670c"),o=o(),Z(),o),o7={class:"actioner-container"},n7={class:"actioner-container_body"},i7=a7(()=>t("svg",{t:"1642063181211",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"5062",width:"128",height:"128","data-v-cda444e0":""},[t("path",{d:"M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m-74.965333 550.4L346.453333 545.152a42.666667 42.666667 0 1 0-60.330666 60.330667l120.704 120.704a42.666667 42.666667 0 0 0 60.330666 0l301.653334-301.696a42.666667 42.666667 0 1 0-60.288-60.330667l-271.530667 271.488z",fill:"#52C41A","p-id":"5063","data-v-cda444e0":""})],-1)),r7={class:"body-title"},s7={class:"body-tips"},d7={class:"body-info"},u7=["href"],l7={href:"/cgi-bin/luci/admin/services/ddns",target:"_blank"},c7={class:"actioner-container_footer"},p7=I({props:{target:{type:String,required:!0},onSetup:{type:Function,required:!0}},setup(o){const{$gettext:a,$ngettext:n}=q(),l=()=>{location.reload()};return(d,r)=>(s(),u("div",o7,[t("div",n7,[i7,t("div",r7,i(e(a)("\u6DFB\u52A0\u6210\u529F")),1),t("p",s7,i(e(a)("\u8BF7\u7A0D\u7B491\u5206\u949F\u751F\u6548\u540E\u518D\u4F7F\u7528\u3002")),1),t("div",d7,[t("span",null,i(e(a)("\u8BBF\u95EE\u5730\u5740\uFF1A")),1),t("a",{href:o.target,target:"_blank",rel:"noopener noreferrer"},i(o.target),9,u7)]),t("div",null,[t("span",null,i(e(a)("\u53EF\u524D\u5F80")),1),t("a",l7,i(e(a)("\u670D\u52A1-\u52A8\u6001DNS")),1),t("span",null,i(e(a)("\u67E5\u770B\u66F4\u591A\u8BE6\u60C5")),1)])]),t("div",c7,[t("div",{class:"close",onClick:l},i(e(a)("\u5173\u95ED")),1)])]))}});var m7=S(p7,[["__scopeId","data-v-8a3b670c"]]);const f7=o=>(W("data-v-064efd50"),o=o(),Z(),o),v7={class:"actioner-container"},b7={class:"actioner-container_header"},g7=f7(()=>t("div",{class:"actioner-container_body ddnsto-login"},[t("iframe",{src:"https://www.kooldns.cn/bind/#/auth?send=1&source=openwrt&callback=*"})],-1)),_7={class:"actioner-container_footer"},h7=I({props:{onSetup:{type:Function,required:!0},onDdnstoConfig:{type:Function,required:!0}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=()=>{a.onSetup()},r=p=>{if(p.data.auth=="ddnsto"){const x=p.data.sign,_=p.data.token;x&&_&&(removeEventListener("message",r),a.onDdnstoConfig(x,_),a.onSetup("ddnsto-run"))}};return _t(()=>{window.addEventListener("message",r)}),St(()=>{removeEventListener("message",r)}),(p,x)=>(s(),u("div",v7,[t("div",b7,[t("span",null,i(e(n)("\u57DF\u540D\u914D\u7F6E\u5411\u5BFC")),1)]),g7,t("div",_7,[t("div",{class:"close",onClick:d},i(e(n)("\u53D6\u6D88")),1)])]))}});var x7=S(h7,[["__scopeId","data-v-064efd50"]]);const k7={class:"actioner-container"},w7={class:"actioner-container_header"},y7={class:"actioner-container_body ddnsto-bind"},F7=["src"],E7=I({props:{onSetup:{type:Function,required:!0},config:{type:Object,required:!0},domain:{type:String,required:!0}},emits:["update:domain"],setup(o,{emit:a}){const n=o,{$gettext:l,$ngettext:d}=q(),r=U(()=>{const{domain:_,token:b,sign:m,routerId:c,netaddr:f}=n.config,v=encodeURIComponent(_),g=encodeURIComponent(f);return`https://www.kooldns.cn/bind/#/domain?domain=${v}&sign=${m}&token=${b}&routerId=${c}&netaddr=${g}`}),p=_=>{if(_.data){const{auth:b,url:m}=_.data;b==="ddnsto"&&m&&x(m)}},x=_=>M(this,null,function*(){var b;try{const m=yield P.Guide.DdnstoAddress.POST({address:_});m!=null&&m.data&&(((b=m==null?void 0:m.data)==null?void 0:b.success)||0)==0&&(a("update:domain",_),n.onSetup("ddnsto-save"))}catch(m){}});return _t(()=>{window.addEventListener("message",p)}),St(()=>{removeEventListener("message",p)}),(_,b)=>(s(),u("div",k7,[t("div",w7,[t("span",null,i(e(l)("\u57DF\u540D\u914D\u7F6E\u5411\u5BFC")),1)]),t("div",y7,[t("iframe",{src:e(r)},null,8,F7)])]))}});var C7=S(E7,[["__scopeId","data-v-49c43a08"]]);const $7=o=>(W("data-v-2904f676"),o=o(),Z(),o),D7={class:"actioner-container"},B7={class:"actioner-container_body"},Y7=$7(()=>t("svg",{t:"1642063181211",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"5062",width:"128",height:"128","data-v-cda444e0":""},[t("path",{d:"M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m-74.965333 550.4L346.453333 545.152a42.666667 42.666667 0 1 0-60.330666 60.330667l120.704 120.704a42.666667 42.666667 0 0 0 60.330666 0l301.653334-301.696a42.666667 42.666667 0 1 0-60.288-60.330667l-271.530667 271.488z",fill:"#52C41A","p-id":"5063","data-v-cda444e0":""})],-1)),A7={class:"body-title"},S7={class:"body-tips"},z7={class:"body-info"},P7=["href"],T7={href:"https://www.ddnsto.com/app/#/devices",target:"_blank"},L7={class:"actioner-container_footer"},I7=I({props:{onSetup:{type:Function,required:!0},target:{type:String,required:!0}},setup(o){const{$gettext:a,$ngettext:n}=q(),l=()=>{location.reload()};return(d,r)=>(s(),u("div",D7,[t("div",B7,[Y7,t("div",A7,i(e(a)("\u6DFB\u52A0\u6210\u529F")),1),t("p",S7,i(e(a)("\u8BF7\u7A0D\u7B491\u5206\u949F\u751F\u6548\u540E\u518D\u4F7F\u7528\u3002")),1),t("div",z7,[t("span",null,i(e(a)("\u8BBF\u95EE\u5730\u5740\uFF1A")),1),t("a",{href:o.target,target:"_blank",rel:"noopener noreferrer"},i(o.target),9,P7)]),t("div",null,[t("span",null,i(e(a)("\u53EF\u524D\u5F80")),1),t("a",T7,i(e(a)("DDNSTO\u63A7\u5236\u53F0")),1),t("span",null,i(e(a)("\u67E5\u770B\u66F4\u591A\u8BE6\u60C5")),1)])]),t("div",L7,[t("div",{class:"close",onClick:l},i(e(a)("\u5173\u95ED")),1)])]))}});var M7=S(I7,[["__scopeId","data-v-2904f676"]]);const O7={class:"actioner-container"},N7={class:"actioner-container_header"},q7={class:"actioner-container_body"},V7={class:"actioner-container_footer"},G7=I({props:{onSetup:{type:Function,required:!0}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=()=>{a.onSetup()},r=()=>M(this,null,function*(){if(_.value)return;_.value=!0;const m=C.Loading(n("\u5B89\u88C5\u4E2D..."));try{if(yield ut.installApp("app-meta-ddnsto",30)){a.onSetup("ddnsto-login");return}else p.value=n("\u5B89\u88C5\u5931\u8D25")}catch(c){p.value=c}finally{m.Close()}_.value=!1}),p=E(n("\u6B63\u5728\u68C0\u6D4B\u4E2D...")),x=E(!1),_=E(!1);return(()=>M(this,null,function*(){try{const m=yield P.App.Check.POST({name:"ddnsto"});if(m!=null&&m.data){const{result:c,error:f}=m.data;if(f){p.value=f;return}if(c){if(c.status=="installed"){a.onSetup("ddnsto-login");return}c.status=="uninstalled"&&(p.value=n("\u9700\u8981\u5B89\u88C5DDNSTO\u63D2\u4EF6\uFF0C\u70B9\u51FB\u201C\u786E\u5B9A\u201D\u5F00\u59CB\u5B89\u88C5"))}}}catch(m){p.value=m}x.value=!0}))(),(m,c)=>(s(),u("div",O7,[t("div",N7,[t("span",null,i(e(n)("\u57DF\u540D\u914D\u7F6E\u5411\u5BFC")),1)]),t("div",q7,[t("span",null,i(p.value),1)]),t("div",V7,[x.value?(s(),u(N,{key:0},[t("div",{class:"close",onClick:d},i(e(n)("\u53D6\u6D88")),1),t("div",{class:"next",onClick:r},i(e(n)("\u786E\u5B9A")),1)],64)):D("",!0)])]))}});var j7=S(G7,[["__scopeId","data-v-210c03e8"]]);const R7={class:"actioner-container"},U7={class:"actioner-container_header"},H7={class:"actioner-container_body"},W7=I({props:{onSetup:{type:Function,required:!0},token:{type:String,required:!0},onDdnstoLocalConfig:{type:Function,required:!0}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(n("\u6B63\u5728\u68C0\u6D4B\u63D2\u4EF6\u662F\u5426\u5DF2\u542F\u52A8..."));(m=>M(this,null,function*(){var c;try{const f=yield P.Guide.Ddnsto.POST({token:a.token});f!=null&&f.data&&(f.data.error&&(d.value=f.data.error),(((c=f==null?void 0:f.data)==null?void 0:c.success)||0)==0&&x())}catch(f){d.value=f}}))(a.token);const p=E(),x=()=>{const m=()=>M(this,null,function*(){if((yield _())===!0){b();return}p.value=window.setTimeout(m,2e3)});m()},_=()=>M(this,null,function*(){try{const m=yield P.App.Check.POST({name:"ddnsto",checkRunning:!0});if(m!=null&&m.data){m.data.error&&(d.value=m.data.error);const c=m.data.result;if((c==null?void 0:c.status)=="running")return!0}}catch(m){d.value=m}return!1});St(()=>{p.value&&clearInterval(p.value)});const b=()=>M(this,null,function*(){var m;try{const c=yield P.Guide.DdntoConfig.GET();if(c!=null&&c.data&&(c.data.error&&(d.value=c.data.error),(((m=c==null?void 0:c.data)==null?void 0:m.success)||0)==0&&c.data.result)){const f=c.data.result;a.onDdnstoLocalConfig(f.netAddr,f.deviceId),a.onSetup("ddnsto-bind")}}catch(c){d.value=c}});return(m,c)=>(s(),u("div",R7,[t("div",U7,[t("span",null,i(e(n)("\u57DF\u540D\u914D\u7F6E\u5411\u5BFC")),1)]),t("div",H7,i(d.value),1)]))}});var Z7=S(W7,[["__scopeId","data-v-1b21487b"]]);const J7={class:"action-main"},X7=I({props:{Close:{type:Function,required:!0},url:{type:String,required:!0}},setup(o){const a=o,n=E("ddnsto-install"),l=_=>{_!=null?n.value=_:d()},d=()=>{a.Close&&a.Close()},r=dt({sign:"",token:"",domain:a.url,netaddr:"",routerId:""}),p=(_,b)=>{r.sign=_,r.token=b},x=(_,b)=>{r.netaddr=_,r.routerId=b};return(_,b)=>(s(),V(ot,{type:1},{default:G(()=>[t("div",J7,[n.value=="ddnsto-install"?(s(),V(j7,{key:0,onSetup:l})):n.value=="ddnsto-login"?(s(),V(x7,{key:1,onSetup:l,onDdnstoConfig:p})):n.value=="ddnsto-run"?(s(),V(Z7,{key:2,onSetup:l,token:e(r).token,onDdnstoLocalConfig:x},null,8,["token"])):n.value=="ddnsto-bind"?(s(),V(C7,{key:3,onSetup:l,config:{token:e(r).token,sign:e(r).sign,domain:e(r).domain,netaddr:e(r).netaddr,routerId:e(r).routerId},domain:e(r).domain,"onUpdate:domain":b[0]||(b[0]=m=>e(r).domain=m)},null,8,["config","domain"])):n.value=="ddnsto-save"?(s(),V(M7,{key:4,onSetup:l,target:e(r).domain},null,8,["target"])):D("",!0)])]),_:1}))}});var K7=S(X7,[["__scopeId","data-v-7a6bd385"]]);const Q7=o=>{const a=document.createElement("div");document.body.appendChild(a);const n=et(K7,nt(X({},o),{Close:()=>{l()}}));n.mount(a);const l=()=>{n.unmount(),a.remove()};return{Close:l}},tp={class:"action"},ep={class:"action-header"},ap=["innerHTML"],op={class:"action-footer"},np=I({props:{Close:Function,next:{type:Function},clear:{type:Function},continuer:{type:Function},nextTitle:{type:String},clearTitle:{type:String},continuerTitle:{type:String},title:{type:String},content:{type:String}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=()=>{a.next&&a.next(),a.Close&&a.Close()},r=()=>{a.clear&&a.clear(),a.Close&&a.Close()},p=()=>{a.continuer&&a.continuer(),a.Close&&a.Close()};return(x,_)=>(s(),V(ot,{Close:o.Close,type:1},{default:G(()=>[t("div",tp,[t("div",ep,i(o.title||e(n)("\u63D0\u793A")),1),t("div",{class:"action-body",innerHTML:o.content},null,8,ap),t("div",op,[o.clear?(s(),u("div",{key:0,class:"clear",onClick:r},i(o.clearTitle||e(n)("\u8FD4\u56DE")),1)):D("",!0),t("div",{class:"next",onClick:d},i(o.nextTitle||e(n)("\u786E\u5B9A")),1),o.continuer?(s(),u("div",{key:1,class:"next",onClick:p},i(o.continuerTitle||e(n)("\u7EE7\u7EED\u4FDD\u5B58")),1)):D("",!0)])])]),_:1},8,["Close"]))}});var ip=S(np,[["__scopeId","data-v-05611967"]]);const Rt=o=>{const a=document.createElement("div");document.body.appendChild(a);const n=et(ip,nt(X({},o),{Close:()=>{l()}}));n.mount(a);const l=()=>{n.unmount(),a.remove()};return{Close:l}},rp=o=>(W("data-v-6e29e960"),o=o(),Z(),o),sp={class:"actioner-container"},dp=["onSubmit"],up={class:"actioner-container_header"},lp={key:0,class:"title_info"},cp={href:"https://doc.linkease.com/zh/guide/istoreos/basic/domain.html#%E9%98%BF%E9%87%8C%E4%BA%91",target:"_blank"},pp={key:1,class:"title_info"},mp={href:"https://doc.linkease.com/zh/guide/istoreos/basic/domain.html#dnspod",target:"_blank"},fp={key:2,class:"title_info"},vp={href:"https://doc.linkease.com/zh/guide/istoreos/basic/domain.html#%E8%8A%B1%E7%94%9F%E5%A3%B3",target:"_blank"},bp={class:"label-item"},gp={class:"label-item_key"},_p={class:"label-item_value"},hp={value:"ipv4"},xp={value:"ipv6"},kp={class:"label_tips"},wp=rp(()=>t("svg",{width:"14px",height:"14px",viewBox:"0 0 14 14",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},[t("g",{id:"icon_alert",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},[t("g",{id:"Icon/Warning"},[t("rect",{id:"\u77E9\u5F62",fill:"#000000","fill-rule":"nonzero",opacity:"0",x:"0",y:"0",width:"14",height:"14"}),t("path",{d:"M7,0.875 C3.61757813,0.875 0.875,3.61757813 0.875,7 C0.875,10.3824219 3.61757813,13.125 7,13.125 C10.3824219,13.125 13.125,10.3824219 13.125,7 C13.125,3.61757813 10.3824219,0.875 7,0.875 Z M6.5625,4.046875 C6.5625,3.98671875 6.61171875,3.9375 6.671875,3.9375 L7.328125,3.9375 C7.38828125,3.9375 7.4375,3.98671875 7.4375,4.046875 L7.4375,7.765625 C7.4375,7.82578125 7.38828125,7.875 7.328125,7.875 L6.671875,7.875 C6.61171875,7.875 6.5625,7.82578125 6.5625,7.765625 L6.5625,4.046875 Z M7,10.0625 C6.63769531,10.0625 6.34375,9.76855469 6.34375,9.40625 C6.34375,9.04394531 6.63769531,8.75 7,8.75 C7.36230469,8.75 7.65625,9.04394531 7.65625,9.40625 C7.65625,9.76855469 7.36230469,10.0625 7,10.0625 Z",id:"\u5F62\u72B6",fill:"#FAAD14"})])])],-1)),yp={class:"info"},Fp={class:"label-item"},Ep={class:"label-item_key"},Cp={class:"label-item_value"},$p={class:"label-item"},Dp={class:"label-item_key"},Bp={class:"label-item_value"},Yp=["placeholder"],Ap={class:"label-item"},Sp={class:"label-item_key"},zp={class:"label-item_value"},Pp=["placeholder"],Tp={class:"actioner-container_footer"},Lp=["disabled"],Ip=I({props:{name:{type:String,default:"ali"},onSetup:{type:Function,required:!0},target:{type:String,required:!0}},emits:["update:target"],setup(o,{emit:a}){const n=o,{$gettext:l,$ngettext:d}=q(),r=E("ipv4"),p=E(n.name),x=E(""),_=E(""),b=E(""),m=E(!1),c=()=>{n.onSetup("index")},f=()=>{m.value=!0;const h=C.Loading(l("\u68C0\u6D4B\u4E2D..."));P.Network.CheckPublickNet.POST({ipVersion:r.value}).then(w=>{var y,F;if(w!=null&&w.data){if((y=w==null?void 0:w.data)!=null&&y.error){C.Warning(w==null?void 0:w.data.error);return}if((((F=w==null?void 0:w.data)==null?void 0:F.success)||0)==0){const B=w.data.result;B&&B.address?k():v();return}}throw l("\u672A\u77E5\u9519\u8BEF")}).catch(w=>{C.Error(w)}).finally(()=>{h.Close(),m.value=!1})},v=()=>{Rt({title:l("\u6E29\u99A8\u63D0\u793A"),nextTitle:l("\u4F7F\u7528DDNSTO"),continuerTitle:l("\u7EE7\u7EED\u4FDD\u5B58"),content:l("\u68C0\u6D4B\u5230\u60A8\u7684wan\u53E3\u6CA1\u6709\u516C\u7F51IP\u6216\u8005IPv6\u5730\u5740\uFF0C\u53EF\u4EE5\u4F7F\u7528DDNSTO\u914D\u7F6E\u8FDC\u7A0B\u57DF\u540D\u8BBF\u95EE"),next(){g()},continuer(){k()},clear(){}})},g=()=>{n.onSetup("ddnsto")},k=()=>{m.value=!0;const h=C.Loading(l("\u914D\u7F6E\u4E2D..."));P.Guide.PostDdns.POST({ipVersion:r.value,serviceName:p.value,domain:x.value,userName:_.value,password:b.value}).then(w=>{if(w!=null&&w.data){const{error:y,scope:F,success:B}=w.data;if(y=="-100"&&F=="guide.ddns"){Rt({title:l("\u6E29\u99A8\u63D0\u793A"),content:l("\u68C0\u6D4B\u5230\u4F60\u6709\u672A\u4FDD\u5B58\u7684\u914D\u7F6E\uFF0C\u53EF\u524D\u5F80\u9875\u9762\u53F3\u4E0A\u89D2\u70B9\u51FB\u67E5\u770B\uFF0C\u4FDD\u5B58\u5E76\u5E94\u7528\u6216\u8005\u6062\u590D\u914D\u7F6E\u540E\u7EE7\u7EED"),next(){}});return}if(y){C.Warning(y);return}if((B||0)==0){a("update:target",x.value),n.onSetup("ddns-success");return}}throw l("\u672A\u77E5\u9519\u8BEF")}).catch(w=>{C.Error(w)}).finally(()=>{h.Close(),m.value=!1})};return(h,w)=>(s(),u("div",sp,[t("form",{class:"actioner-dns",onSubmit:st(f,["prevent"])},[t("div",up,[t("span",null,i(e(l)("\u57DF\u540D\u914D\u7F6E\u5411\u5BFC")),1)]),t("div",{class:rt(["actioner-container_body",o.name])},[o.name=="ali"?(s(),u("div",lp,[t("p",null,i(e(l)("\u963F\u91CC\u4E91")),1),t("span",null,i(e(l)("\u4E3A\u62E5\u6709\u52A8\u6001IP\u7684\u4E3B\u673A\u914D\u7F6E\u4E00\u4E2A\u56FA\u5B9A\u7684\u53EF\u8BBF\u95EE\u57DF\u540D")),1),t("a",cp,i(e(l)("\u67E5\u770B\u6559\u7A0B"))+">>",1)])):o.name=="dnspod"?(s(),u("div",pp,[t("p",null,i(e(l)("dnspod")),1),t("span",null,i(e(l)("\u4E3A\u62E5\u6709\u52A8\u6001IP\u7684\u4E3B\u673A\u914D\u7F6E\u4E00\u4E2A\u56FA\u5B9A\u7684\u53EF\u8BBF\u95EE\u57DF\u540D")),1),t("a",mp,i(e(l)("\u67E5\u770B\u6559\u7A0B"))+">>",1)])):o.name=="oray"?(s(),u("div",fp,[t("p",null,i(e(l)("\u82B1\u751F\u58F3")),1),t("span",null,i(e(l)("\u4E3A\u62E5\u6709\u52A8\u6001IP\u7684\u4E3B\u673A\u914D\u7F6E\u4E00\u4E2A\u56FA\u5B9A\u7684\u53EF\u8BBF\u95EE\u57DF\u540D")),1),t("a",vp,i(e(l)("\u67E5\u770B\u6559\u7A0B"))+">>",1)])):D("",!0),t("div",bp,[t("div",gp,[t("span",null,i(e(l)("IP\u5730\u5740\u7248\u672C\uFF1A")),1)]),t("div",_p,[L(t("select",{name:"",id:"","onUpdate:modelValue":w[0]||(w[0]=y=>r.value=y)},[t("option",hp,i(e(l)("IPv4\u5730\u5740")),1),t("option",xp,i(e(l)("IPv6\u5730\u5740")),1)],512),[[tt,r.value]])]),t("div",kp,[wp,t("span",yp,i(e(l)("\u8BBE\u5B9A\u54EA\u4E00\u4E2A IP \u5730\u5740\uFF08IPv4 \u6216 IPv6\uFF09\u4F1A\u88AB\u53D1\u9001\u7ED9 DDNS \u63D0\u4F9B\u5546")),1)])]),t("div",Fp,[t("div",Ep,[t("span",null,i(e(l)("\u57DF\u540D\uFF1A")),1)]),t("div",Cp,[L(t("input",{type:"text",placeholder:"myhost.example.com","onUpdate:modelValue":w[1]||(w[1]=y=>x.value=y),required:""},null,512),[[H,x.value,void 0,{trim:!0}]])])]),t("div",$p,[t("div",Dp,[t("span",null,i(e(l)("\u7528\u6237\u540D\uFF1A")),1)]),t("div",Bp,[L(t("input",{type:"text","onUpdate:modelValue":w[2]||(w[2]=y=>_.value=y),placeholder:e(l)("\u8BF7\u8F93\u5165\u7528\u6237\u540D"),required:""},null,8,Yp),[[H,_.value,void 0,{trim:!0}]])])]),t("div",Ap,[t("div",Sp,[t("span",null,i(e(l)("\u5BC6\u7801\uFF1A")),1)]),t("div",zp,[L(t("input",{type:"password","onUpdate:modelValue":w[3]||(w[3]=y=>b.value=y),placeholder:e(l)("\u8BF7\u8F93\u5165\u5BC6\u7801"),required:""},null,8,Pp),[[H,b.value,void 0,{trim:!0}]])])])],2),t("div",Tp,[t("div",{class:"close",onClick:c,type:"button"},i(e(l)("\u8FD4\u56DE")),1),t("button",{class:"next save",type:"submit",disabled:m.value},i(e(l)("\u4FDD\u5B58")),9,Lp)])],40,dp)]))}});var ee=S(Ip,[["__scopeId","data-v-6e29e960"]]);const Mp={class:"action-main"},Op=I({props:{Close:{type:Function,required:!0},url:{type:String,required:!0}},setup(o){const a=o,n=E(""),l=E("index"),d=_=>{if(_!=null){if(_=="ddnsto"){r();return}l.value=_}else p()},r=()=>{p(),Q7({url:a.url})},p=()=>{a.Close&&a.Close()},x=E("ddnsto");return(_,b)=>(s(),V(ot,{Close:o.Close,type:1},{default:G(()=>[t("div",Mp,[l.value=="index"?(s(),V(e7,{key:0,onSetup:d,active:x.value,"onUpdate:active":b[0]||(b[0]=m=>x.value=m)},null,8,["active"])):l.value=="ddns-ali"?(s(),V(ee,{key:1,onSetup:d,target:n.value,"onUpdate:target":b[1]||(b[1]=m=>n.value=m),name:"ali"},null,8,["target"])):l.value=="ddns-dnspod"?(s(),V(ee,{key:2,onSetup:d,target:n.value,"onUpdate:target":b[2]||(b[2]=m=>n.value=m),name:"dnspod"},null,8,["target"])):l.value=="ddns-oray"?(s(),V(ee,{key:3,onSetup:d,target:n.value,"onUpdate:target":b[3]||(b[3]=m=>n.value=m),name:"oray"},null,8,["target"])):l.value=="ddns-success"?(s(),V(m7,{key:4,onSetup:d,target:n.value},null,8,["target"])):D("",!0)])]),_:1},8,["Close"]))}});var Np=S(Op,[["__scopeId","data-v-6f1d92d9"]]);const qp=o=>{const a=document.createElement("div");document.body.appendChild(a);const n=et(Np,nt(X({},o),{Close:()=>{l()}}));n.mount(a);const l=()=>{n.unmount(),a.remove()};return{Close:l}},qt=o=>(W("data-v-1532b758"),o=o(),Z(),o),Vp={class:"app-container"},Gp={class:"app-container_title"},jp={class:"app-container_tool"},Rp={class:"app-container_domain"},Up={class:"domain-item"},Hp=qt(()=>t("div",{class:"domain-item_name"},[t("span",null,"DDNSTO: ")],-1)),Wp={class:"domain-item_value"},Zp=["href","title"],Jp={key:1,class:"configure"},Xp={class:"item_btn",href:"https://www.kooldns.cn/app/#/devices",target:"_blank"},Kp={key:0,class:"domain-item"},Qp=qt(()=>t("div",{class:"domain-item_name"},[t("span",null,"myddns_ipv4: ")],-1)),t4={class:"domain-item_value"},e4={key:0},a4=["href"],o4={key:2,href:"/cgi-bin/luci/admin/services/ddns"},n4=qt(()=>t("svg",{t:"1653625385794",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4476",width:"28",height:"28"},[t("path",{d:"M145.83060282785186 873.7309800675556h650.2280809434073c24.411293468444445 0 44.384169832296294-19.97287636385185 44.38416861866666-44.384169832296294V500.90395784533337c0-13.315251313777777-8.876834209185184-22.19208430933333-22.19208430933333-22.19208430933333s-22.19208430933333 8.876834209185184-22.19208430933333 22.19208430933333v326.22364444444446H145.83060282785186V179.1187305054815h616.9399532657777c13.315251313777777 0 22.19208430933333-8.876834209185184 22.19208552296296-22.19208552296296s-8.876834209185184-22.19208430933333-22.19208552296296-22.19208430933333H145.83060282785186c-24.411293468444445 0-44.384169832296294 19.97287636385185-44.38416861866666 44.384169832296294v650.2280797297777c0 24.411293468444445 19.97287636385185 44.384169832296294 44.38416861866666 44.384169832296294z",fill:"#666","p-id":"4477"}),t("path",{d:"M887.0462301677038 203.53002276029633l-488.225862087111 488.2258633007407c-8.876834209185184 8.876834209185184-8.876834209185184 22.19208430933333 0 31.06891851851852 4.438417104592592 4.438417104592592 11.096042154666666 6.657625050074073 15.53445925925926 6.657625050074073s11.096042154666666-2.2192079454814815 15.53445925925926-6.657625050074073l490.4450712462222-490.4450712462222c8.876834209185184-8.876834209185184 8.876834209185184-22.19208430933333 0-31.06891851851852s-24.411293468444445-6.657625050074073-33.288127677629625 2.2192079454814815z",fill:"#666","p-id":"4478"})],-1)),i4=[n4],r4={key:1,class:"domain-item"},s4=qt(()=>t("div",{class:"domain-item_name"},[t("span",null,"myddns_ipv6: ")],-1)),d4={class:"domain-item_value"},u4={key:0},l4=["href"],c4={key:2,href:"/cgi-bin/luci/admin/services/ddns"},p4=qt(()=>t("svg",{t:"1653625385794",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4476",width:"28",height:"28"},[t("path",{d:"M145.83060282785186 873.7309800675556h650.2280809434073c24.411293468444445 0 44.384169832296294-19.97287636385185 44.38416861866666-44.384169832296294V500.90395784533337c0-13.315251313777777-8.876834209185184-22.19208430933333-22.19208430933333-22.19208430933333s-22.19208430933333 8.876834209185184-22.19208430933333 22.19208430933333v326.22364444444446H145.83060282785186V179.1187305054815h616.9399532657777c13.315251313777777 0 22.19208430933333-8.876834209185184 22.19208552296296-22.19208552296296s-8.876834209185184-22.19208430933333-22.19208552296296-22.19208430933333H145.83060282785186c-24.411293468444445 0-44.384169832296294 19.97287636385185-44.38416861866666 44.384169832296294v650.2280797297777c0 24.411293468444445 19.97287636385185 44.384169832296294 44.38416861866666 44.384169832296294z",fill:"#666","p-id":"4477"}),t("path",{d:"M887.0462301677038 203.53002276029633l-488.225862087111 488.2258633007407c-8.876834209185184 8.876834209185184-8.876834209185184 22.19208430933333 0 31.06891851851852 4.438417104592592 4.438417104592592 11.096042154666666 6.657625050074073 15.53445925925926 6.657625050074073s11.096042154666666-2.2192079454814815 15.53445925925926-6.657625050074073l490.4450712462222-490.4450712462222c8.876834209185184-8.876834209185184 8.876834209185184-22.19208430933333 0-31.06891851851852s-24.411293468444445-6.657625050074073-33.288127677629625 2.2192079454814815z",fill:"#666","p-id":"4478"})],-1)),m4=[p4],f4=I({setup(o){const{$gettext:a,$ngettext:n}=q();let l=!1,d;const r=E({}),p=function(){!l||(document.hidden?Promise.resolve():P.Guide.GetDdns.GET().then(m=>{var c;m!=null&&m.data&&(((c=m==null?void 0:m.data)==null?void 0:c.success)||0)==0&&m.data.result&&(r.value=m.data.result)})).then(()=>{!l||(d=window.setTimeout(p,3e3))})};_t(()=>{l=!0,d=window.setTimeout(p,1100)}),St(()=>{d!==void 0&&window.clearTimeout(d),l=!1});const x=()=>{qp({url:r.value.ddnstoDomain})},_=U(()=>{const m=r.value.ipv4Domain;return!m||m=="Stopped"||m=="Disabled"?m:`http://${m}`}),b=U(()=>{const m=r.value.ipv6Domain;return!m||m=="Stopped"||m=="Disabled"?m:`http://${m}`});return(m,c)=>{var v,g,k,h;const f=K("GlHelp");return s(),u("div",Vp,[t("div",Gp,[t("span",null,[t("span",null,i(e(a)("\u8FDC\u7A0B\u57DF\u540D")),1),A(f,{type:"ddns"})]),t("div",jp,[t("div",{class:"app-container_configure",onClick:x},i(e(a)("\u5FEB\u901F\u914D\u7F6E")),1)])]),t("ul",Rp,[t("li",Up,[Hp,t("div",Wp,[(v=r.value)!=null&&v.ddnstoDomain?(s(),u("a",{key:0,class:"configure",href:(g=r.value)==null?void 0:g.ddnstoDomain,target:"_blank",rel:"noopener noreferrer",title:(k=r.value)==null?void 0:k.ddnstoDomain},i((h=r.value)==null?void 0:h.ddnstoDomain),9,Zp)):(s(),u("span",Jp,i(e(a)("\u672A\u5B89\u88C5\u6216\u672A\u914D\u7F6E")),1)),t("a",Xp,i(e(a)("\u63A7\u5236\u53F0")),1)])]),e(_)?(s(),u("li",Kp,[Qp,t("div",t4,[e(_)=="Stopped"||e(_)=="Disabled"?(s(),u("span",e4,i(e(_)),1)):(s(),u("a",{key:1,class:"configure",href:e(_),target:"_blank",rel:"noopener noreferrer"},i(e(_)),9,a4)),e(_)?(s(),u("a",o4,i4)):D("",!0)])])):D("",!0),e(b)?(s(),u("li",r4,[s4,t("div",d4,[e(b)=="Stopped"||e(b)=="Disabled"?(s(),u("span",u4,i(e(b)),1)):(s(),u("a",{key:1,class:"configure",href:e(b),target:"_blank",rel:"noopener noreferrer"},i(e(b)),9,l4)),e(b)?(s(),u("a",c4,m4)):D("",!0)])])):D("",!0)])])}}});var v4=S(f4,[["__scopeId","data-v-1532b758"]]);const b4={class:"nas-container"},g4={class:"nas-container_card"},_4={class:"nas-container_card"},h4={key:0,class:"nas-container_card"},x4={class:"nas-container_card"},k4={class:"nas-container_card"},w4=I({setup(o){return(a,n)=>(s(),u("div",b4,[t("div",g4,[A(Nl)]),t("div",_4,[A(P2)]),e(Bt)("dockerd")?(s(),u("div",h4,[A(o6)])):D("",!0),t("div",x4,[A(q8)]),t("div",k4,[A(v4)])]))}});var y4=S(w4,[["__scopeId","data-v-66cc4e33"]]);const F4={class:"app-container"},E4={class:"app-container_title"},C4=["title"],$4={class:"DeviceBlock"},D4={href:"/cgi-bin/luci/admin/system/flash"},B4={href:"/cgi-bin/luci/admin/store/pages/maintance"},Y4={class:"item-label"},A4={class:"item-label_key"},S4={class:"item-label_value"},z4={class:"item-label"},P4={class:"item-label_key"},T4={class:"item-label_value"},L4={class:"item-label"},I4={class:"item-label_key"},M4={class:"item-label_value"},O4={class:"item-label"},N4={class:"item-label_key"},q4={class:"item-label_value"},V4={class:"item-label"},G4={class:"item-label_key"},j4={class:"item-label_value"},R4={class:"item-label"},U4={class:"item-label_key"},H4={class:"item-label_value"},W4={class:"item-label"},Z4={class:"item-label_key"},J4={class:"item-label_value"},X4={class:"item-label"},K4={class:"item-label_key"},Q4={class:"item-label_value"},t9=I({setup(o){const{$gettext:a,$ngettext:n}=q(),l=ne(),d=U(()=>l.version),r=U(()=>l.systemStatus),p=E(!1),x=U(()=>{var v;return((v=r.value)==null?void 0:v.cpuUsage)||0}),_=U(()=>{var v;return((v=r.value)==null?void 0:v.cpuTemperature)||0}),b=U(()=>{var g;const v=((g=r.value)==null?void 0:g.memAvailablePercentage)||100;return 100-v}),m=gt.stampForm;_t(()=>{});const c=()=>{p.value=!p.value},f=()=>{c(),ut.installAndGo("app-meta-netdata","NetData","/cgi-bin/luci/admin/status/netdata")};return(v,g)=>{var h,w,y,F,B;const k=K("progress-item");return s(),u("div",F4,[t("div",E4,[t("span",null,i(e(a)("\u7CFB\u7EDF\u4FE1\u606F")),1),t("span",{class:"more_icon",title:e(a)("\u67E5\u770B\u7CFB\u7EDF\u4FE1\u606F")},[A(kt,{onClick:c})],8,C4),L(t("div",$4,[t("div",{class:"menu_background",onClick:c}),t("ul",null,[t("li",null,[t("a",{onClick:f},i(e(a)("\u7CFB\u7EDF\u76D1\u63A7")),1)]),t("li",null,[t("a",D4,i(e(a)("\u5907\u4EFD\u5347\u7EA7")),1)]),t("li",null,[t("a",B4,i(e(a)("\u63D2\u4EF6\u5907\u4EFD")),1)])])],512),[[bt,p.value]])]),t("div",z4,[t("div",P4,[t("span",null,i(e(a)("CPU\u4F7F\u7528\u7387")),1)]),t("div",T4,[A(k,{value:e(x),text:`${e(x)}%`},null,8,["value","text"])])]),t("div",L4,[t("div",I4,[t("span",null,i(e(a)("\u5185\u5B58\u4F7F\u7528\u7387")),1)]),t("div",M4,[A(k,{value:e(b),text:`${e(b)}%`},null,8,["value","text"])])]),t("div",O4,[t("div",N4,[t("span",null,i(e(a)("\u8BBE\u5907\u578B\u53F7")),1)]),t("div",q4,[t("span",null,i((h=e(d))==null?void 0:h.model),1)])]),t("div",V4,[t("div",G4,[t("span",null,i(e(a)("\u56FA\u4EF6\u7248\u672C")),1)]),t("div",j4,[t("span",null,i((w=e(d))==null?void 0:w.firmwareVersion),1)])]),t("div",R4,[t("div",U4,[t("span",null,i(e(a)("\u5185\u6838\u7248\u672C")),1)]),t("div",H4,[t("span",null,i((y=e(d))==null?void 0:y.kernelVersion),1)])]),t("div",W4,[t("div",Z4,[t("span",null,i(e(a)("\u5DF2\u542F\u52A8")),1)]),t("div",J4,[t("span",null,i(e(m)((F=e(r))==null?void 0:F.uptime)),1)])]),t("div",X4,[t("div",K4,[t("span",null,i(e(a)("\u7CFB\u7EDF\u65F6\u95F4")),1)]),t("div",Q4,[t("span",null,i((B=e(r))==null?void 0:B.localtime),1)])])])}}});var e9=S(t9,[["__scopeId","data-v-b8dfe98c"]]);const Oe=/\d+\.\d+\.\d+\.\d+/,a9=o=>Oe.test(o)&&Nt.IPv4.isValid(o),xt=o=>{const a=Nt.IPv4.parse(o).toByteArray();return a[0]<<24|a[1]<<16|a[2]<<8|a[3]},ye=o=>Nt.fromByteArray([o>>24&255,o>>16&255,o>>8&255,o&255]).toString(),o9=o=>{if(!Oe.test(o)||!Nt.IPv4.isIPv4(o))return!1;let a=0,n=xt(o);for(let l=31;l>=0&&(n&1<<l)!=0;l--)a=a+(1<<l);return(~a&n)==0},n9=(o,a,n,l)=>{let d=xt(o)&xt(a),r=xt(n),p=xt(l),_=~xt(a);return r<p&&r>d+1&&p<d+_},i9=(o,a)=>{let n=xt(a),l=xt(o)&n,d=~n,r;return d>=105?(r=l|d-5,l=l|100):d>=3?(r=l|d-1,l=l|2):(l=l|1,r=l),[ye(l),ye(r)]},r9=o=>Nt.IPv4.subnetMaskFromPrefixLength(o).toString();var mt={isValidMask:o9,isValidIPv4:a9,isValidMaskRange:n9,calcMaskRange:i9,prefixToMask:r9};const ue=o=>(W("data-v-22104807"),o=o(),Z(),o),s9=["onSubmit"],d9={class:"actioner-dns_header"},u9={class:"actioner-dns_body"},l9={class:"label-item"},c9={class:"label-item_key"},p9={class:"label-item_value"},m9={class:"label-item"},f9={class:"label-item_key"},v9={class:"label-item_value"},b9={key:0,class:"chose_dhcp"},g9={key:0,class:"dhcp_info"},_9={key:1,class:"dhcp_info"},h9={class:"label-item"},x9={class:"label-item_key"},k9={class:"label-item_value"},w9={class:"label-item"},y9={class:"label-item_key"},F9={class:"label-item_value"},E9={class:"actioner-dns_footer"},C9=["disabled"],$9={key:1,class:"actioner-dns"},D9={class:"actioner-dns_header"},B9={class:"actioner-dns_body"},Y9={key:0,class:"setting_status"},A9=ue(()=>t("div",{class:"success_icon"},[t("svg",{t:"1642063181211",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"5062",width:"128",height:"128"},[t("path",{d:"M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m-74.965333 550.4L346.453333 545.152a42.666667 42.666667 0 1 0-60.330666 60.330667l120.704 120.704a42.666667 42.666667 0 0 0 60.330666 0l301.653334-301.696a42.666667 42.666667 0 1 0-60.288-60.330667l-271.530667 271.488z",fill:"#52C41A","p-id":"5063"})])],-1)),S9={class:"config-message"},z9=["href"],P9={key:1,class:"setting_status"},T9=ue(()=>t("div",{class:"success_icon"},[t("svg",{t:"1642063200324",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"5898",width:"128",height:"128"},[t("path",{d:"M549.044706 512l166.189176-166.249412a26.383059 26.383059 0 0 0 0-36.98447 26.383059 26.383059 0 0 0-37.044706 0L512 475.015529l-166.249412-166.249411a26.383059 26.383059 0 0 0-36.98447 0 26.383059 26.383059 0 0 0 0 37.044706L475.015529 512l-166.249411 166.249412a26.383059 26.383059 0 0 0 0 36.98447 26.383059 26.383059 0 0 0 37.044706 0L512 548.984471l166.249412 166.249411a26.383059 26.383059 0 0 0 36.98447 0 26.383059 26.383059 0 0 0 0-37.044706L548.984471 512zM512 1024a512 512 0 1 1 0-1024 512 512 0 0 1 0 1024z",fill:"#E84335","p-id":"5899"})])],-1)),L9={class:"config-message"},I9={key:2,class:"setting_status"},M9=ue(()=>t("div",{class:"success_icon"},[t("svg",{width:"128px",height:"128px",viewBox:"0 0 128 128",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},[t("g",{id:"icon_yellow",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},[t("g",{id:"Icon/Warning"},[t("rect",{id:"\u77E9\u5F62",fill:"#000000","fill-rule":"nonzero",opacity:"0",x:"0",y:"0",width:"128",height:"128"}),t("path",{d:"M64,8 C33.075,8 8,33.075 8,64 C8,94.925 33.075,120 64,120 C94.925,120 120,94.925 120,64 C120,33.075 94.925,8 64,8 Z M60,37 C60,36.45 60.45,36 61,36 L67,36 C67.55,36 68,36.45 68,37 L68,71 C68,71.55 67.55,72 67,72 L61,72 C60.45,72 60,71.55 60,71 L60,37 Z M64,92 C60.6875,92 58,89.3125 58,86 C58,82.6875 60.6875,80 64,80 C67.3125,80 70,82.6875 70,86 C70,89.3125 67.3125,92 64,92 Z",id:"\u5F62\u72B6",fill:"#FAAD14"})])])])],-1)),O9={class:"config-message"},N9=I({props:{Close:{type:Function,required:!0}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(0),r=E({lanIp:"",netMask:"255.255.255.0",enableDhcp:!1,dhcpStart:"",dhcpEnd:""});E("");const p=E(!1);E(!0),E(!1);const x=E(""),_=E(2),b=E(!1),m=E("timeout");let c=!0;(()=>{P.Guide.GetLan.GET().then(w=>{w.data.result&&(b.value=w.data.result.enableDhcp||!1,w.data.result.enableDhcp=!1,r.value=w.data.result,w.data.result.lanIp!==location.hostname&&(c=!1))})})();const v=()=>{const w=r.value;if(!mt.isValidIPv4(w.lanIp)){C.Warning(n("IPv4\u5730\u5740\u683C\u5F0F\u9519\u8BEF"));return}if(!mt.isValidMask(w.netMask)){C.Warning(n("IPv4\u5B50\u7F51\u63A9\u7801\u683C\u5F0F\u9519\u8BEF"));return}const y=mt.calcMaskRange(w.lanIp,w.netMask);w.dhcpStart=y[0],w.dhcpEnd=y[1],r.value=w},g=()=>{const w=r.value;if(!mt.isValidIPv4(w.lanIp)){C.Warning(n("IPv4\u5730\u5740\u683C\u5F0F\u9519\u8BEF"));return}if(!mt.isValidMask(w.netMask)){C.Warning(n("IPv4\u5B50\u7F51\u63A9\u7801\u683C\u5F0F\u9519\u8BEF"));return}if(w.enableDhcp&&!(mt.isValidIPv4(w.dhcpStart)&&mt.isValidIPv4(w.dhcpEnd)&&mt.isValidMaskRange(w.lanIp,w.netMask,w.dhcpStart,w.dhcpEnd))){C.Warning(n("DHCP\u7684IP\u6C60\u683C\u5F0F\u9519\u8BEF\u6216\u8D85\u51FA\u5B50\u7F51\u8303\u56F4"));return}const y=C.Loading(n("\u6B63\u5728\u914D\u7F6E\u2026\u8BF7\u7A0D\u7B49"),30);let F=0;const B=$=>{m.value=$,d.value=1,F=1,y.Close()},Y=()=>{const $=new Date().getTime()+3e4,z=c?location.protocol+"//"+w.lanIp+(location.port?":"+location.port:""):location.origin,T=z+"/luci-static/resources/icons/loading.gif",J=()=>{F==0&&(new Date().getTime()>$?B("timeout"):window.setTimeout(Q,2e3))},j=()=>{F==0&&(x.value=z+location.pathname,B("success"),window.setTimeout(()=>{_.value=1},1e3),window.setTimeout(()=>{location.href=x.value},2e3))},Q=()=>{if(F!=0)return;console.log("check online ",T);const ht=new Image;ht.onload=j,ht.onerror=J,ht.src=T};window.setTimeout(Q,5e3)};P.Guide.LanIp.POST(w).then($=>{var z;if($!=null&&$.data){if(($.data.success||0)==0)return;if((z=$.data)!=null&&z.error)throw $.data.error}throw n("\u672A\u77E5\u9519\u8BEF")}).catch($=>{F==0&&(B("fail"),C.Error($))}),Y(),window.setTimeout(()=>{F==0&&B("timeout")},3e4)},k=w=>{w.preventDefault(),a.Close&&a.Close()},h=w=>{location.reload()};return(w,y)=>(s(),V(ot,{Close:o.Close,type:1},{default:G(()=>[d.value==0?(s(),u("form",{key:0,class:"actioner-dns",onSubmit:st(g,["prevent"])},[t("div",d9,[t("span",null,i(e(n)("\u5185\u7F51\u914D\u7F6E")),1)]),t("div",u9,[t("div",l9,[t("div",c9,[t("span",null,i(e(n)("IPv4\u5730\u5740")),1)]),t("div",p9,[L(t("input",{type:"text",placeholder:"192.168.100.1",required:"","onUpdate:modelValue":y[0]||(y[0]=F=>r.value.lanIp=F),onChange:v},null,544),[[H,r.value.lanIp,void 0,{trim:!0}]])])]),t("div",m9,[t("div",f9,[t("span",null,i(e(n)("IPv4\u5B50\u7F51\u63A9\u7801")),1)]),t("div",v9,[L(t("input",{type:"text",placeholder:"255.255.255.0",required:"","onUpdate:modelValue":y[1]||(y[1]=F=>r.value.netMask=F),onChange:v},null,544),[[H,r.value.netMask,void 0,{trim:!0}]])])]),b.value?(s(),u("div",b9,[A(Ye,{modelValue:r.value.enableDhcp,"onUpdate:modelValue":y[2]||(y[2]=F=>r.value.enableDhcp=F)},{default:G(()=>[r.value.enableDhcp?(s(),u("span",g9,i(e(n)("\u4FEE\u6539DHCP\u670D\u52A1")),1)):(s(),u("span",_9,i(e(n)("\u4FDD\u6301DHCP\u670D\u52A1\u8BBE\u7F6E")),1))]),_:1},8,["modelValue"])])):D("",!0),r.value.enableDhcp?(s(),u(N,{key:1},[t("div",h9,[t("div",x9,[t("span",null,i(e(n)("IP\u6C60\u8D77\u59CB\u5730\u5740")),1)]),t("div",k9,[L(t("input",{type:"text",placeholder:"192.168.100.100",required:"","onUpdate:modelValue":y[3]||(y[3]=F=>r.value.dhcpStart=F)},null,512),[[H,r.value.dhcpStart,void 0,{trim:!0}]])])]),t("div",w9,[t("div",y9,[t("span",null,i(e(n)("IP\u6C60\u7ED3\u675F\u5730\u5740")),1)]),t("div",F9,[L(t("input",{type:"text",placeholder:"192.168.100.100",required:"","onUpdate:modelValue":y[4]||(y[4]=F=>r.value.dhcpEnd=F)},null,512),[[H,r.value.dhcpEnd,void 0,{trim:!0}]])])])],64)):D("",!0)]),t("div",E9,[t("button",{class:"cbi-button cbi-button-apply app-btn",disabled:p.value},i(e(n)("\u786E\u8BA4")),9,C9),t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:k},i(e(n)("\u53D6\u6D88")),1)])],40,s9)):d.value==1?(s(),u("div",$9,[t("div",D9,[t("span",null,i(e(n)("\u66F4\u6362\u914D\u7F6E")),1)]),t("div",B9,[m.value=="success"?(s(),u("div",Y9,[A9,t("div",S9,i(e(n)("\u914D\u7F6E\u6210\u529F")),1),t("a",{href:x.value,class:"NewAdress"},i(e(n)("%{ countdown }s\u540E \u8DF3\u8F6C\u65B0\u5730\u5740",{countdown:""+_.value})),9,z9)])):m.value=="fail"?(s(),u("div",P9,[T9,t("div",L9,i(e(n)("\u914D\u7F6E\u5931\u8D25")),1),t("p",null,i(e(n)("\u8BF7\u5C1D\u8BD5\u91CD\u65B0\u914D\u7F6E")),1),t("button",{class:"cbi-button cbi-button-apply app-btn",onClick:h},i(e(n)("\u6211\u77E5\u9053\u4E86")),1)])):m.value=="timeout"?(s(),u("div",I9,[M9,t("div",O9,i(e(n)("\u914D\u7F6E\u8D85\u65F6")),1),t("p",null,i(e(n)("\u8DEF\u7531\u5668 IP \u53EF\u80FD\u5DF2\u7ECF\u4FEE\u6539\u6210\u529F\u3002\u82E5\u5237\u65B0\u9875\u9762\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u8FDE\u63A5\u8DEF\u7531\u5668\uFF0C\u5426\u5219\u8BF7\u5C1D\u8BD5\u91CD\u65B0\u914D\u7F6E\u3002")),1),t("button",{class:"cbi-button cbi-button-apply app-btn",onClick:h},i(e(n)("\u5237\u65B0\u9875\u9762")),1)])):D("",!0)])])):D("",!0)]),_:1},8,["Close"]))}});var q9=S(N9,[["__scopeId","data-v-22104807"]]);const V9=()=>{const o=document.createElement("div");document.body.appendChild(o);const a=et(q9,{Close:()=>{n()}});a.mount(o);const n=()=>{a.unmount(),o.remove()};return{Close:n}},G9={key:0,class:"actioner-dns"},j9={class:"actioner-dns_header"},R9={class:"actioner-dns_body"},U9={class:"sandbox_info"},H9={key:0,class:"disk_loading_icon"},W9={class:"disk_loading_info"},Z9={key:1,class:"disk_tips"},J9={class:"label-item"},X9={class:"label-item_key"},K9={class:"label-item_value"},Q9={value:""},tm=["value"],em={class:"label-item"},am={class:"label-item_key"},om={class:"label-item_value"},nm={selected:"true",value:""},im=["value","disabled"],rm={class:"sandbox_tips"},sm={class:"sandbox_info timeout"},dm={class:"sandbox_roboot_tips"},um={class:"sandbox_roboot_refresh"},lm={key:0,class:"actioner-dns_footer"},cm=["disabled"],pm={key:1,class:"actioner-tips"},mm={class:"actioner-tips_header"},fm={class:"actioner-tips_body"},vm={class:"sandbox_info"},bm={class:"actioner-tips_footer"},gm={key:2,class:"actioner-tips"},_m={class:"actioner-tips_header"},hm={class:"actioner-tips_body"},xm={class:"sandbox_info"},km={class:"actioner-tips_footer"},wm=I({props:{Close:{type:Function,required:!0}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(0);E("disk");const r=E(""),p=E(3),x=E(""),_=E([]),b=E(""),m=E(null);(()=>{P.Nas.SandboxDisks.GET().then(F=>{var B;if(F!=null&&F.data&&(B=F.data)!=null&&B.result){m.value=F.data.result;return}throw n("\u52A0\u8F7D\u78C1\u76D8\u4FE1\u606F\u5931\u8D25")}).catch(F=>{r.value=F,d.value=3})})();const f=()=>P.System.Reboot.POST({name:x.value,path:b.value}).then(F=>{var B;if(!(F!=null&&F.data&&(((B=F==null?void 0:F.data)==null?void 0:B.success)||0)==0))throw n("\u672A\u77E5\u9519\u8BEF")}),v=F=>{var B,Y;b.value="",_.value=x.value&&((Y=(B=m.value)==null?void 0:B.disks.find($=>$.path==x.value))==null?void 0:Y.childrens)||[]},g=()=>{p.value>0&&(p.value-=1,window.setTimeout(g,1e3))},k=F=>{F.preventDefault(),a.Close&&a.Close()},h=()=>{new Promise((F,B)=>{const Y="/luci-static/resources/icons/loading.gif",$=()=>{window.setTimeout(z,2e3)},z=()=>{const T=new Image;T.onload=F,T.onerror=$,T.src=Y};window.setTimeout(z,1e4)}).then(()=>{window.setTimeout(()=>{location.reload()},2e3)})},w=F=>{const B=C.Loading(n("\u914D\u7F6E\u6C99\u7BB1\u91CD\u542F\u4E2D..."));P.Nas.Sandbox.POST({path:b.value}).then(Y=>{var $;if(Y!=null&&Y.data){if((Y.data.success||0)==0)return d.value=2,window.setTimeout(g,1e3),f();if(($=Y.data)!=null&&$.error)throw Y.data.error}throw n("\u672A\u77E5\u9519\u8BEF")}).then(h).catch(Y=>C.Warning(Y)).finally(()=>B.Close())},y=()=>{d.value=0};return(F,B)=>{const Y=K("icon-loading");return s(),V(ot,{Close:o.Close,type:1},{default:G(()=>[d.value==0||d.value==2?(s(),u("div",G9,[t("div",j9,[t("span",null,i(e(n)("\u6C99\u7BB1\u6A21\u5F0F\u914D\u7F6E\u5411\u5BFC")),1)]),t("div",R9,[t("p",U9,i(e(n)("\u4E00\u4E2A\u7B80\u6613\u6C99\u7BB1\uFF0C\u65B9\u4FBF\u7528\u6765\u5B9E\u9A8C\u7CFB\u7EDF\u914D\u7F6E\u548C\u7A0B\u5E8F\uFF0C\u65B9\u4FBF\u5F00\u53D1\u672A\u5B8C\u6210\u7684\u8F6F\u4EF6\uFF0C\u4F46\u4E0D\u4FDD\u62A4 Docker \u548C\u786C\u76D8\u7684\u6570\u636E")),1),d.value==0?(s(),u(N,{key:0},[m.value?D("",!0):(s(),u("div",H9,[A(Y,{size:38,color:"currentColor"}),t("span",W9,i(e(n)("\u6B63\u5728\u52A0\u8F7D\u4E2D...")),1)])),m.value&&m.value.disks.length==0?(s(),u("div",Z9,[A(pt),t("span",null,i(e(n)("\u68C0\u6D4B\u4E0D\u5230\u6302\u8F7D\u7684\u78C1\u76D8\u4FE1\u606F\uFF0C\u8BF7\u5148\u63D2\u4E0A\u78C1\u76D8\uFF0C\u5EFA\u8BAE\u4F7F\u7528U\u76D8\u6216\u8005\u79FB\u52A8\u786C\u76D8\uFF0C\u65B9\u4FBF\u88C5\u5378")),1)])):D("",!0),m.value&&m.value.disks.length>0?(s(),u(N,{key:2},[t("div",J9,[t("div",X9,[t("span",null,i(e(n)("\u76EE\u6807\u78C1\u76D8\uFF08\u5EFA\u8BAE\u9009\u62E9U\u76D8\u6216\u8005\u79FB\u52A8\u786C\u76D8\uFF0C\u65B9\u4FBF\u88C5\u5378\uFF09")),1)]),t("div",K9,[L(t("select",{name:"",id:"",onChange:v,"onUpdate:modelValue":B[0]||(B[0]=$=>x.value=$)},[t("option",Q9,i(e(n)("\u8BF7\u9009\u62E9\u76EE\u6807\u78C1\u76D8")),1),(s(!0),u(N,null,R(m.value.disks,($,z)=>(s(),u("option",{value:$.path,key:z},i($.venderModel)+"\uFF08"+i($.size)+"\uFF09 ",9,tm))),128))],544),[[tt,x.value]])])]),t("div",em,[t("div",am,[t("span",null,i(e(n)("\u76EE\u6807\u5206\u533A\uFF08\u5206\u533A\u5927\u5C0F\u987B\u5927\u4E8E2G\uFF0C\u5C06\u6B64\u5206\u533A\u4F5C\u4E3A\u5916\u90E8 overlay \u4F7F\u7528\uFF09")),1)]),t("div",om,[L(t("select",{name:"",id:"","onUpdate:modelValue":B[1]||(B[1]=$=>b.value=$)},[t("option",nm,i(e(n)("\u8BF7\u9009\u62E9\u76EE\u6807\u5206\u533A")),1),(s(!0),u(N,null,R(_.value,($,z)=>(s(),u("option",{value:$.path,key:z,disabled:$.sizeInt<(1<<30)*1||$.isSystemRoot},i($.name)+"\uFF08"+i($.filesystem||e(n)("\u672A\u683C\u5F0F\u5316"))+"\uFF09"+i($.total),9,im))),128))],512),[[tt,b.value]])])]),t("div",rm,[A(pt),t("span",null,i(e(n)("\u6B64\u64CD\u4F5C\u4F1A\u5C06\u4F1A\u5220\u9664\u8BE5\u5206\u533A\u5168\u90E8\u6570\u636E")),1)])],64)):D("",!0)],64)):D("",!0),d.value==2?(s(),u(N,{key:1},[t("p",sm,[at(i(e(n)("\u5373\u5C06\u91CD\u542F\u8BBE\u5907"))+" ",1),t("span",null,"\uFF08"+i(p.value)+"s\uFF09",1)]),t("p",dm,[at(i(e(n)("\u7B49\u5F85\u8BBE\u5907\u91CD\u542F\uFF0C\u91CD\u542F\u5B8C\u6210\u540E")),1),t("span",um,i(e(n)("\u8BF7\u5237\u65B0\u754C\u9762")),1)])],64)):D("",!0)]),d.value==0?(s(),u("div",lm,[t("button",{class:"cbi-button cbi-button-apply app-btn",disabled:!b.value,onClick:B[2]||(B[2]=$=>d.value=1)},i(e(n)("\u5F00\u542F\u6C99\u7BB1")),9,cm),t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:k},i(e(n)("\u53D6\u6D88")),1)])):D("",!0)])):D("",!0),d.value==1?(s(),u("div",pm,[t("div",mm,[t("span",null,i(e(n)("\u6E29\u99A8\u63D0\u793A")),1)]),t("div",fm,[t("p",vm,i(e(n)("\u6B64\u64CD\u4F5C\u4F1A\u5C06\u4F1A\u5220\u9664\u8BE5\u5206\u533A\u5168\u90E8\u6570\u636E\uFF0C\u5E76\u683C\u5F0F\u5316\u6210EXT4\uFF0C\u968F\u540E\u81EA\u52A8\u91CD\u542F\u8FDB\u5165\u6C99\u7BB1\u6A21\u5F0F\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F")),1)]),t("div",bm,[t("button",{class:"cbi-button cbi-button-apply app-btn",onClick:w},i(e(n)("\u7EE7\u7EED")),1),t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:y},i(e(n)("\u53D6\u6D88")),1)])])):D("",!0),d.value==3?(s(),u("div",gm,[t("div",_m,[t("span",null,i(e(n)("\u9519\u8BEF")),1)]),t("div",hm,[t("p",xm,i(r.value),1)]),t("div",km,[t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:y},i(e(n)("\u53D6\u6D88")),1)])])):D("",!0)]),_:1},8,["Close"])}}});var ym=S(wm,[["__scopeId","data-v-2b57eea5"]]);const Fm=()=>{const o=document.createElement("div");document.body.appendChild(o);const a=et(ym,{Close:()=>{n()}});a.mount(o);const n=()=>{a.unmount(),o.remove()};return{Close:n}},Em={key:0,class:"actioner-dns"},Cm={class:"actioner-dns_header"},$m={class:"actioner-dns_body"},Dm={class:"sandbox_info"},Bm={class:"sandbox_environment"},Ym={class:"sandbox_environment_info"},Am={class:"sandbox_environment_reboot"},Sm=["innerHTML"],zm={class:"actioner-dns_footer"},Pm=["disabled"],Tm=["disabled"],Lm=["disabled"],Im=I({props:{Close:{type:Function,required:!0}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(0),r=E(!1),p=()=>{new Promise((c,f)=>{const v="/luci-static/resources/icons/loading.gif",g=()=>{window.setTimeout(k,2e3)},k=()=>{const h=new Image;h.onload=c,h.onerror=g,h.src=v};window.setTimeout(k,1e4)}).then(()=>{window.setTimeout(()=>{location.reload()},2e3)})},x=()=>{r.value=!0;const c=C.Loading(n("\u63D0\u4EA4\u4E2D..."));P.Nas.SandboxCommit.POST().then(f=>{var v,g;if(f!=null&&f.data)if((((v=f==null?void 0:f.data)==null?void 0:v.success)||0)==0){C.Loading(n("\u8BBE\u5907\u91CD\u542F\u4E2D..."));return}else(g=f==null?void 0:f.data)!=null&&g.error&&alert(f.data.error);throw n("\u672A\u77E5\u9519\u8BEF")}).then(p).catch(f=>{C.Error(f),r.value=!1}).finally(()=>c.Close())},_=()=>{r.value=!0;const c=C.Loading(n("\u91CD\u7F6E\u4E2D..."));P.Nas.SandboxReset.POST().then(f=>{var v,g;if(f!=null&&f.data)if((((v=f==null?void 0:f.data)==null?void 0:v.success)||0)==0){C.Loading(n("\u8BBE\u5907\u91CD\u542F\u4E2D... \u82E5\u9875\u9762\u957F\u65F6\u95F4\u672A\u5237\u65B0\u53EF\u80FD\u9700\u8981\u624B\u52A8\u586B\u5199\u5730\u5740"));return}else(g=f==null?void 0:f.data)!=null&&g.error&&alert(f.data.error);throw n("\u672A\u77E5\u9519\u8BEF")}).then(p).catch(f=>{C.Error(f),r.value=!1}).finally(()=>c.Close())},b=()=>{if(!confirm(n("\u786E\u5B9A\u653E\u5F03\u6C99\u7BB1\u4E2D\u7684\u6570\u636E\uFF1F\u518D\u6B21\u8FDB\u5165\u6C99\u7BB1\u9700\u8981\u91CD\u65B0\u683C\u5F0F\u5316\u76F8\u5E94\u78C1\u76D8\u5206\u533A")))return;r.value=!0;const c=C.Loading(n("\u6267\u884C\u4E2D..."));P.Nas.SandboxExit.POST().then(f=>{var v,g;if(f!=null&&f.data)if((((v=f==null?void 0:f.data)==null?void 0:v.success)||0)==0){C.Loading(n("\u8BBE\u5907\u91CD\u542F\u4E2D... \u82E5\u9875\u9762\u957F\u65F6\u95F4\u672A\u5237\u65B0\u53EF\u80FD\u9700\u8981\u624B\u52A8\u586B\u5199\u5730\u5740"));return}else(g=f==null?void 0:f.data)!=null&&g.error&&alert(f.data.error);throw n("\u672A\u77E5\u9519\u8BEF")}).then(p).catch(f=>{C.Error(f),r.value=!1}).finally(()=>c.Close())},m=c=>{c.preventDefault(),a.Close&&a.Close()};return(c,f)=>(s(),V(ot,{Close:o.Close,type:1},{default:G(()=>[d.value==0?(s(),u("div",Em,[t("div",Cm,[t("span",null,i(e(n)("\u6C99\u7BB1\u6A21\u5F0F\u914D\u7F6E\u5411\u5BFC")),1)]),t("div",$m,[t("p",Dm,i(e(n)("\u4E00\u4E2A\u7B80\u6613\u6C99\u7BB1\uFF0C\u65B9\u4FBF\u7528\u6765\u5B9E\u9A8C\u7CFB\u7EDF\u914D\u7F6E\u548C\u7A0B\u5E8F\uFF0C\u65B9\u4FBF\u5F00\u53D1\u672A\u5B8C\u6210\u7684\u8F6F\u4EF6\uFF0C\u4F46\u4E0D\u4FDD\u62A4 Docker \u548C\u786C\u76D8\u7684\u6570\u636E")),1),t("div",Bm,[t("p",null,i(e(n)("\u5F53\u524D\u5904\u4E8E\u6C99\u7BB1\u73AF\u5883\uFF1A")),1),t("p",null,i(e(n)("1\u3001\u70B9\u51FB\u201C\u63D0\u4EA4\u201D\u53EF\u5C06\u53D8\u66F4\u5408\u5E76\u5230\u975E\u6C99\u7BB1\u73AF\u5883")),1),t("p",null,i(e(n)("2\u3001\u70B9\u51FB\u201C\u91CD\u7F6E\u201D\u53EF\u5C06\u6C99\u7BB1\u6062\u590D\u5230\u521D\u59CB\u72B6\u6001")),1),t("p",null,i(e(n)("3\u3001\u70B9\u51FB\u201C\u9000\u51FA\u201D\u53EF\u9000\u51FA\u6C99\u7BB1\u73AF\u5883\uFF0C\u5E76\u653E\u5F03\u6C99\u7BB1\u4E2D\u7684\u6570\u636E")),1)]),t("div",Ym,[at(i(e(n)("\u4EE5\u4E0A\u64CD\u4F5C\u90FD\u5C06\u91CD\u542F\u8BBE\u5907\uFF0C\u8BBE\u5907\u91CD\u542F\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u5237\u65B0\u9875\u9762\u3002\u5982\u679C IP \u53D8\u5316\u53EF\u80FD\u9700\u8981")),1),t("span",Am,i(e(n)("\u624B\u52A8\u5728\u5730\u5740\u680F\u8F93\u5165\u5730\u5740")),1),t("p",{class:"sandbox_environment_tex",innerHTML:e(n)("\u5982\u9700<b>\u4E34\u65F6</b>\u9000\u51FA\u6C99\u7BB1\u73AF\u5883\uFF0C\u8BF7\u5C06\u8BBE\u5907\u5173\u673A\u540E\u62D4\u51FA\u76F8\u5173\u78C1\u76D8\uFF0C\u542F\u52A8\u524D\u63D2\u5165\u76F8\u5173\u78C1\u76D8\u53EF\u518D\u6B21\u8FDB\u5165\u6C99\u7BB1\u3002<br/> \u6CE8\u610F\u4E34\u65F6\u9000\u51FA\u6C99\u7BB1\u73AF\u5883\u4EE5\u540E\u5347\u7EA7\u56FA\u4EF6\u4F1A\u5BFC\u81F4\u4E4B\u524D\u7684\u6C99\u7BB1\u6570\u636E\u65E0\u6548",{},!0)},null,8,Sm)])]),t("div",zm,[t("button",{class:"cbi-button cbi-button-apply app-btn",onClick:x,disabled:r.value},i(e(n)("\u63D0\u4EA4")),9,Pm),t("button",{class:"cbi-button cbi-button-apply app-btn",onClick:_,disabled:r.value},i(e(n)("\u91CD\u7F6E")),9,Tm),t("button",{class:"cbi-button cbi-button-apply app-btn",onClick:b,disabled:r.value},i(e(n)("\u9000\u51FA")),9,Lm),t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:m},i(e(n)("\u53D6\u6D88")),1)])])):D("",!0)]),_:1},8,["Close"]))}});var Mm=S(Im,[["__scopeId","data-v-9573dc70"]]);const Om=()=>{const o=document.createElement("div");document.body.appendChild(o);const a=et(Mm,{Close:()=>{n()}});a.mount(o);const n=()=>{a.unmount(),o.remove()};return{Close:n}},Nm={class:"nav-container"},qm=["onClick"],Vm={key:1,class:"btn_styles color3 app-update-button",onclick:"window.location.href='/cgi-bin/luci/admin/system/ota'"},Gm={key:0,style:{display:"inline-block"}},jm={key:1},Rm=["disabled"],Um={key:0,style:{display:"inline-block"}},Hm=I({setup(o){const{$gettext:a,$ngettext:n}=q(),l=ne(),d=Wt(),r=U(()=>d.status);E(!1),E(!0);const p=E(),x=()=>{Se()},_=()=>{Fm()},b=()=>{Om()},m=()=>{alert(a("\u8BE5\u56FA\u4EF6\u4E0D\u652F\u6301\u6C99\u7BB1\u6A21\u5F0F"))},c=()=>{V9()},f=()=>{Le()},v=()=>{var g,k,h,w;window.open(`${(k=(g=window.quickstart_configs)==null?void 0:g.ttyd)!=null&&k.ssl?"https":"http"}://${window.location.hostname}:${((w=(h=window.quickstart_configs)==null?void 0:h.ttyd)==null?void 0:w.port)||7681}/`,"_blank")};return Bt("sandbox")&&P.Nas.GetSandbox.GET().then(k=>{var h,w,y;k!=null&&k.data&&((((h=k==null?void 0:k.data)==null?void 0:h.success)||0)==0?(w=k==null?void 0:k.data)!=null&&w.result&&(p.value=k.data.result):(y=k==null?void 0:k.data)!=null&&y.error&&alert(k.data.error))}).catch(k=>C.Warning(k)),(g,k)=>{var y,F,B,Y,$,z;const h=K("router-link"),w=K("icon-loading");return s(),u("div",Nm,[A(h,{to:"/network",custom:""},{default:G(({navigate:T})=>[t("button",{class:"btn_styles color1",onClick:T},i(e(a)("\u7F51\u7EDC\u5411\u5BFC")),9,qm)]),_:1}),e(Bt)("ttyd")?(s(),u("button",{key:0,class:"btn_styles color2 app-btn-ttyd",onClick:v},i(e(a)("\u7EC8\u7AEF")),1)):D("",!0),e(Bt)("ota")?(s(),u("button",Vm,[at(i(e(a)("\u56FA\u4EF6\u66F4\u65B0"))+" ",1),e(l).checkUpdate==null?(s(),u("span",Gm,[A(w,{size:"0.8em",color:"currentColor"})])):(y=e(l).checkUpdate)!=null&&y.needUpdate?(s(),u("i",jm)):D("",!0)])):D("",!0),t("button",{class:"btn_styles color4",onClick:c},i(e(a)("\u5185\u7F51\u914D\u7F6E")),1),t("button",{class:"btn_styles color5",onClick:x,disabled:!((F=e(r))!=null&&F.proto)},[at(i(e(a)("DNS\u914D\u7F6E"))+" ",1),(B=e(r))!=null&&B.proto?D("",!0):(s(),u("span",Um,[A(w,{size:"0.8em",color:"currentColor"})]))],8,Rm),t("button",{class:"btn_styles color1",onClick:f},i(e(a)("\u8F6F\u4EF6\u6E90\u914D\u7F6E")),1),e(Bt)("sandbox")?(s(),u(N,{key:2},[((Y=p.value)==null?void 0:Y.status)=="unsupport"?(s(),u("button",{key:0,class:"btn_styles color2",onClick:m},i(e(a)("\u5F00\u542F\u6C99\u7BB1")),1)):(($=p.value)==null?void 0:$.status)=="stopped"?(s(),u("button",{key:1,class:"btn_styles color3",onClick:_},i(e(a)("\u5F00\u542F\u6C99\u7BB1")),1)):((z=p.value)==null?void 0:z.status)=="running"?(s(),u("button",{key:2,class:"btn_styles color4",onClick:b},i(e(a)("\u6C99\u7BB1\u5DF2\u5F00\u542F")),1)):D("",!0)],64)):D("",!0)])}}});var Wm=S(Hm,[["__scopeId","data-v-3a6a7fea"]]);const le=o=>(W("data-v-d954742e"),o=o(),Z(),o),Zm={id:"page"},Jm={style:{height:"48px","text-align":"right"}},Xm={onclick:"void(0)",href:"https://www.istoreos.com/",target:"_blank",style:{"text-decoration":"none",color:"white","line-height":"1.5em"}},Km=le(()=>t("em",null,null,-1)),Qm=le(()=>t("em",null,null,-1)),tf=le(()=>t("em",null,null,-1)),ef=I({setup(o){$a();const{$gettext:a,$ngettext:n}=q();return(l,d)=>(s(),u("div",Zm,[t("div",Jm,[t("a",Xm,i(e(a)("iStoreOS\u5B98\u7F51")),1)]),A(Ad),Km,A(Wm),A(y4),Qm,A(e9),tf]))}});var af=S(ef,[["__scopeId","data-v-d954742e"]]);const of={};function nf(o,a){const n=K("router-view");return s(),V(n)}var rf=S(of,[["render",nf]]);const sf={},df={width:"136px",height:"136px",viewBox:"0 0 136 136",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},uf=$t('<defs><rect id="path-1" x="0" y="0" width="72" height="72" rx="10"></rect><filter x="-68.1%" y="-65.3%" width="236.1%" height="236.1%" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="16" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.00576685472   0 0 0 0 0.712891067   0 0 0 0 0.523400265  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g id="icon_router" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group" transform="translate(32.000000, 30.000000)"><g id="Rectangle"><use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use><use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use></g><g id="luyouqi" transform="translate(9.000000, 12.000000)" fill="#2FBE96" fill-rule="nonzero"><path d="M5,36.25 L6.24999997,36.25 L6.24999997,37.5 C6.24999997,38.8750001 7.37499997,40 8.74999999,40 L13.75,40 C15.125,40 16.25,38.875 16.25,37.5 L16.25,36.25 L38.75,36.25 L38.75,37.5 C38.75,38.8750001 39.875,40 41.25,40 L46.25,40 C47.625,40 48.75,38.875 48.75,37.5 L48.75,36.25 L50,36.25 C52.75,36.25 55,34 55,31.25 L0,31.25 C0,34 2.25,36.25 5,36.25 Z M50,20 L45,20 L45,1.875 C45,0.874999981 44.1250001,0 43.125,0 C42.125,0 41.25,0.874999981 41.25,1.875 L41.25,20 L13.75,20 L13.75,1.875 C13.75,0.874999981 12.875,0 11.875,0 C10.8749999,0 10,0.874999981 10,1.875 L10,20 L5,20 C2.25,20 0,22.25 0,25 L0,28.75 L55,28.75 L55,25 C55,22.25 52.75,20 50,20 Z M30.625,26.25 C29.625,26.25 28.75,25.375 28.75,24.375 C28.75,23.375 29.625,22.5 30.625,22.5 C31.625,22.5 32.5,23.375 32.5,24.375 C32.5,25.375 31.625,26.25 30.625,26.25 Z M36.875,26.25 C35.875,26.25 35,25.375 35,24.375 C35,23.375 35.875,22.5 36.875,22.5 C37.875,22.5 38.75,23.375 38.75,24.375 C38.75,25.375 37.875,26.25 36.875,26.25 Z M43.125,26.25 C42.125,26.25 41.25,25.375 41.25,24.375 C41.25,23.375 42.125,22.5 43.125,22.5 C44.1250001,22.5 45,23.375 45,24.375 C45,25.375 44.1250001,26.25 43.125,26.25 Z" id="Shape"></path></g></g></g>',2),lf=[uf];function cf(o,a){return s(),u("svg",df,lf)}var pf=S(sf,[["render",cf]]);const mf={},ff={width:"136px",height:"136px",viewBox:"0 0 136 136",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},vf=$t('<defs><rect id="path-1" x="0" y="0" width="72" height="72" rx="10"></rect><filter x="-68.1%" y="-65.3%" width="236.1%" height="236.1%" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="16" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.788163337   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g id="icon_dial" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group" transform="translate(32.000000, 30.000000)"><g id="Rectangle"><use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use><use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use></g><g id="bohao" transform="translate(14.000000, 13.000000)" fill="#FF6C68" fill-rule="nonzero"><path d="M27.2980992,0.874200971 C26.7268663,0.758523804 26.1331134,0.866913453 25.6392917,1.17701641 C25.1554389,1.47930436 24.8141653,1.96483113 24.6930984,2.52315663 C24.5731079,3.07574301 24.6878398,3.65344238 25.0098158,4.11789644 C25.3371296,4.5939296 25.8390162,4.92096156 26.4060118,5.02766508 C31.045922,5.95330175 35.0418401,8.55830791 37.6547588,12.3772204 C40.2676774,16.1961329 41.1782401,20.7555549 40.2228092,25.2210907 C40.1022213,25.7732483 40.2170154,26.350782 40.5395266,26.8145082 C40.9402684,27.3951092 41.5930751,27.7496771 42.2973083,27.7692363 C42.7546094,27.787238 43.2065645,27.6654879 43.5932104,27.420139 C44.0774855,27.1189844 44.4196894,26.6344423 44.542043,26.0766435 C47.0071602,14.5551113 39.2726569,3.24779794 27.2980992,0.874200971 M31.0947493,32.74255 C31.2267149,32.824535 34.1299578,34.6215925 36.3733729,36.8312195 C37.2153133,37.6669372 38.6247059,39.0646486 38.5877555,40.6871575 C38.5560837,41.7952768 37.906813,42.9047185 36.5990341,44.0789548 C36.2743987,44.3844149 33.3645574,46.9999998 28.710131,46.9999998 C27.3912247,46.9937384 26.0799397,46.7991615 24.8158264,46.422138 C23.3601676,45.9861014 21.9649286,45.3685851 20.6628693,44.584088 C15.2153297,41.4871721 11.0188239,37.5109013 7.02422548,31.6621998 C0.162014763,21.6230086 -0.0293353467,13.0238438 0.00233638896,11.4039796 C0.0142132841,3.92483507 6.48844518,0.983955044 7.22613283,0.671883236 C8.2422679,0.218321248 9.12907663,6.56389309e-05 9.94594365,6.56389309e-05 C10.3221663,-0.00210452636 10.6967773,0.0495481459 11.0584136,0.153526698 C11.7736671,0.362456139 12.7647287,0.901970084 13.4337942,2.28910278 C14.3430371,4.17343462 15.2021331,6.8736491 15.7880603,9.69419635 C16.4056593,12.6271423 14.6953853,13.450959 13.0418564,14.2470065 L12.9771933,14.2734533 C12.9771933,14.2734533 10.0515161,15.4476896 9.53685034,15.6513296 C9.03619964,15.8421642 8.77356796,16.3935308 8.94036587,16.9035838 C10.1201383,20.341663 11.9227882,23.9119759 14.1477281,27.2178213 C16.2898673,30.4151399 18.819615,33.3337939 21.6790044,35.9069051 C21.8774142,36.0783671 22.130935,36.1722806 22.3929382,36.1713728 L22.4826748,36.1713728 C22.7712253,36.1486937 23.0383058,36.009873 23.2230017,35.7865724 C23.7910711,35.0765111 24.4084443,34.4075091 25.07052,33.7845524 C26.4350442,32.5349429 27.6702421,31.933279 28.8434163,31.9332791 C29.1639159,31.9320794 29.4829541,31.9766039 29.7909292,32.0655129 C30.2528699,32.2365199 30.6924376,32.4629666 31.1000279,32.7399053 M21.8400024,18.2655921 C21.2727998,18.1576666 20.7707788,17.8303809 20.4424867,17.3545011 C20.1195351,16.8899676 20.0042929,16.3116272 20.1244497,15.758439 C20.3633736,14.7240741 21.3099013,14.0116196 22.3678647,14.0698132 C22.4897786,14.07308 22.61119,14.0867942 22.7307701,14.1108057 C27.8483957,15.1263614 31.1554534,19.9595073 30.1010483,24.8852168 C29.9793303,25.4425668 29.6381304,25.9270351 29.1548551,26.2287124 C28.767264,26.4717676 28.3158939,26.5928996 27.8589529,26.5764873 C27.7379231,26.5712459 27.6174771,26.5566569 27.4986869,26.5328501 C26.9296524,26.4268815 26.4259713,26.0986569 26.098532,25.6204368 C25.77801,25.1583614 25.6633089,24.5836905 25.7818146,24.033631 C26.0564522,22.762289 25.7906175,21.4337675 25.0480859,20.3667874 C24.2959909,19.2710084 23.1434575,18.5161347 21.8400024,18.2655921 M24.130925,11.620843 C22.9432347,11.3828221 22.1738753,10.2628017 22.4153724,9.11633459 C22.5346624,8.55724948 22.875754,8.07082659 23.360246,7.76887199 C23.8543437,7.45823035 24.448547,7.34937141 25.0203731,7.46473423 C29.1614533,8.28722853 32.7258439,10.6145437 35.0589956,14.0235314 C37.3755259,17.3601994 38.204796,21.5111457 37.3485986,25.484236 C37.2282609,26.0425595 36.8861326,26.5276693 36.4010857,26.8277315 C35.9088475,27.1418728 35.3138166,27.2514444 34.7422782,27.1331916 C33.5545879,26.8951707 32.7852285,25.7751504 33.0267255,24.6286832 C33.6442543,21.7595069 33.0443871,18.7622168 31.3705573,16.3534912 C29.6708669,13.8824331 27.0678646,12.1820541 24.1256464,11.620843 L24.130925,11.620843 Z" id="Shape"></path></g></g></g>',2),bf=[vf];function gf(o,a){return s(),u("svg",ff,bf)}var _f=S(mf,[["render",gf]]);const hf={},xf={width:"136px",height:"136px",viewBox:"0 0 136 136",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},kf=$t('<defs><rect id="path-1" x="0" y="0" width="72" height="72" rx="10"></rect><filter x="-68.1%" y="-65.3%" width="236.1%" height="236.1%" filterUnits="objectBoundingBox" id="filter-2"><feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="16" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.064613567   0 0 0 0 0.378874402   0 0 0 0 0.840799967  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g id="icon_side-router" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group-5" transform="translate(32.000000, 30.000000)"><g id="Rectangle"><use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use><use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use></g><g id="route" transform="translate(15.000000, 15.000000)" fill="#3B89FE"><path d="M37.25,31 L37.25,18.66 L22.2525,18.66 L22.2525,11 L26,11 L26,1 L16,1 L16,11 L19.75,11 L19.75,18.6625 L4.75,18.6625 L4.75,31 L1,31 L1,41 L11,41 L11,31 L7.25,31 L7.25,21.16 L19.75,21.16 L19.75,31 L16,31 L16,41 L26,41 L26,31 L22.2525,31 L22.2525,21.16 L34.75,21.16 L34.75,31 L31,31 L31,41 L41,41 L41,31 L37.25,31 Z M23.1425,38.1425 L18.8575,38.1425 L18.8575,33.855 L23.1425,33.855 L23.1425,38.1425 Z M8.1425,38.14 L3.8575,38.14 L3.8575,33.855 L8.1425,33.855 L8.1425,38.14 Z M23.1425,8.1425 L18.8575,8.1425 L18.8575,3.8575 L23.1425,3.8575 L23.1425,8.1425 Z M38.285,38.1425 L34,38.1425 L34,33.855 L38.285,33.855 L38.285,38.1425 Z" id="Shape" fill-rule="nonzero"></path><rect id="Rectangle" x="15" y="0" width="12" height="12" rx="2"></rect><rect id="Rectangle" x="0" y="30" width="12" height="12" rx="2"></rect><rect id="Rectangle" x="15" y="30" width="12" height="12" rx="2"></rect><rect id="Rectangle" x="30" y="30" width="12" height="12" rx="2"></rect></g></g></g>',2),wf=[kf];function yf(o,a){return s(),u("svg",xf,wf)}var Ff=S(hf,[["render",yf]]);const Ef={id:"page"},Cf={class:"title"},$f={class:"desc"},Df={class:"network-containers"},Bf={class:"network-container_item"},Yf={class:"cover"},Af={class:"thumbnail"},Sf={class:"network-container_item"},zf={class:"cover"},Pf={class:"thumbnail"},Tf={class:"network-container_item"},Lf={class:"cover"},If={class:"thumbnail"},Mf=["innerHTML"],Of=I({setup(o){const{$gettext:a,$ngettext:n}=q(),l=a("\u6CA1\u627E\u5230\u60F3\u8981\u7684\u914D\u7F6E\uFF1F\u8BF7\u4F7F\u7528%{link}",{link:'<a href="/cgi-bin/luci/admin/network/network">'+a("\u9AD8\u7EA7\u6A21\u5F0F")+"</a>"},!0);return(d,r)=>{const p=K("router-link");return s(),u("div",Ef,[t("div",Cf,i(e(a)("\u6B22\u8FCE\u4F7F\u7528\u7F51\u7EDC\u914D\u7F6E\u5411\u5BFC")),1),t("div",$f,i(e(a)("\u9009\u62E9\u4E00\u79CD\u8FDE\u63A5\u65B9\u5F0F\u4EE5\u5F00\u59CB")),1),t("div",Df,[t("div",Bf,[A(p,{to:"/network/pppoe"},{default:G(()=>[t("div",Yf,[t("div",Af,[A(_f),t("span",null,i(e(a)("\u5BBD\u5E26\u62E8\u53F7\u8FDE\u63A5")),1)])])]),_:1})]),t("div",Sf,[A(p,{to:"/network/dhcp"},{default:G(()=>[t("div",zf,[t("div",Pf,[A(pf),t("span",null,i(e(a)("\u8FDE\u63A5\u73B0\u6709\u8DEF\u7531\u5668")),1)])])]),_:1})]),t("div",Tf,[A(p,{to:"/network/gateway"},{default:G(()=>[t("div",Lf,[t("div",If,[A(Ff),t("span",null,i(e(a)("\u914D\u7F6E\u4E3A\u65C1\u8DEF\u7531")),1)])])]),_:1})])]),t("div",{class:"info",innerHTML:e(l)},null,8,Mf)])}}});var Nf=S(Of,[["__scopeId","data-v-52c03678"]]);const qf={key:0,id:"page"},Vf={class:"title"},Gf={class:"desc"},jf={class:"network-message"},Rf=["innerHTML"],Uf=["onSubmit"],Hf={class:"label-key"},Wf=["placeholder","disabled"],Zf={class:"label-key"},Jf=["placeholder","disabled"],Xf={key:0,class:"chose_dhcp"},Kf={class:"dhcp_info"},Qf={key:1,class:"msg"},tv={class:"btns"},ev=["disabled"],av=["onClick"],ov={key:1,id:"page"},nv={class:"title"},iv={class:"btns"},rv=["onClick"],sv=["onClick"],dv=I({setup(o){const{$gettext:a,$ngettext:n}=q(),l=a("\u7531\u4E8E\u60A8\u7684\u8BBE\u5907<span>\u6CA1\u6709 WAN \u53E3</span>\uFF0C\u65E0\u6CD5\u4F7F\u7528\u672C\u8BBE\u7F6E\u5411\u5BFC\uFF0C\u5177\u4F53\u8BF7\u770B%{link}",{link:'<a href="https://doc.linkease.com/zh/guide/istoreos/question.html#%E7%BD%91%E7%BB%9C" target="_blank" rel="noopener noreferrer">'+a("\u94FE\u63A5")+"</a>"},!0),d=E(0),r=E({}),p=E(""),x=E(!1),_=E(0),b=E(!1);(()=>M(this,null,function*(){var f,v;x.value=!0;try{const g=yield Promise.all([P.Guide.Pppoe.GET(),P.Guide.GetLan.GET()]);if(g[0].data){const{success:k,error:h,result:w}=g[0].data;w&&(w.enableLanDhcp=!1,r.value=w),k==-1011&&(x.value=!0,_.value=k)}(f=g[1].data)!=null&&f.result&&(((v=g[1].data)==null?void 0:v.result).enableDhcp||(b.value=!0,r.value.enableLanDhcp=!0))}catch(g){p.value=g}_.value==0&&(x.value=!1)}))();const c=()=>M(this,null,function*(){const f=r.value.account||"",v=r.value.password||"";if(f==""){p.value=a("\u8D26\u53F7\u4E0D\u80FD\u4E3A\u7A7A");return}if(v==""){p.value=a("\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A");return}x.value=!0;const g=C.Loading(a("\u914D\u7F6E\u4E2D..."));try{const k=yield P.Guide.Pppoe.POST({account:f,password:v});if(k!=null&&k.data){const{error:h,success:w}=k.data;h&&(p.value=h),(w==null||w==0)&&(C.Success(a("\u914D\u7F6E\u6210\u529F")),d.value=1)}}catch(k){p.value=k}x.value=!1,g.Close()});return(f,v)=>{const g=K("switch-box"),k=K("router-link");return d.value==0?(s(),u("div",qf,[t("h2",Vf,i(e(a)("\u914D\u7F6E\u5BBD\u5E26\u8D26\u53F7")),1),t("h3",Gf,i(e(a)("\u8BF7\u786E\u4FDD\u60A8\u5DF2\u5C06\u8DEF\u7531 WAN \u53E3\u8FDE\u63A5\u5230\u5149\u732B")),1),t("div",jf,[_.value==-1011?(s(),u("li",{key:0,innerHTML:e(l)},null,8,Rf)):D("",!0)]),t("form",{onSubmit:st(c,["prevent"])},[t("label",null,[t("div",Hf,[t("span",null,i(e(a)("\u5BBD\u5E26\u8D26\u53F7")),1)]),L(t("input",{type:"text","onUpdate:modelValue":v[0]||(v[0]=h=>r.value.account=h),placeholder:e(a)("\u5BBD\u5E26\u8D26\u53F7"),required:"",disabled:x.value},null,8,Wf),[[H,r.value.account,void 0,{trim:!0}]])]),t("label",null,[t("div",Zf,[t("span",null,i(e(a)("\u5BC6\u7801")),1)]),L(t("input",{type:"password","onUpdate:modelValue":v[1]||(v[1]=h=>r.value.password=h),placeholder:e(a)("\u5BBD\u5E26\u5BC6\u7801"),required:"",disabled:x.value},null,8,Jf),[[H,r.value.password,void 0,{trim:!0}]])]),b.value?(s(),u("div",Xf,[A(g,{modelValue:r.value.enableLanDhcp,"onUpdate:modelValue":v[2]||(v[2]=h=>r.value.enableLanDhcp=h)},{default:G(()=>[t("span",Kf,i(e(a)("\u542F\u7528LAN\u53E3DHCP\u670D\u52A1\uFF08\u7528\u4E8E\u4ECE\u65C1\u8DEF\u7531\u6A21\u5F0F\u6062\u590D\u6210\u9ED8\u8BA4\u72B6\u6001\uFF09")),1)]),_:1},8,["modelValue"])])):D("",!0),p.value?(s(),u("div",Qf,i(p.value),1)):D("",!0),t("div",tv,[t("button",{class:"cbi-button cbi-button-apply app-btn app-next",disabled:x.value},i(e(a)("\u4FDD\u5B58\u914D\u7F6E")),9,ev),A(k,{to:"/network",custom:""},{default:G(({navigate:h})=>[t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:h},i(e(a)("\u8FD4\u56DE")),9,av)]),_:1})])],40,Uf)])):d.value==1?(s(),u("div",ov,[t("h2",nv,i(e(a)("\u914D\u7F6E\u6210\u529F")),1),t("div",iv,[A(k,{to:"/",custom:""},{default:G(({navigate:h})=>[t("button",{class:"cbi-button cbi-button-apply app-btn app-next",onClick:h},i(e(a)("\u8FDB\u5165\u63A7\u5236\u53F0")),9,rv)]),_:1}),A(k,{to:"/network",custom:""},{default:G(({navigate:h})=>[t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:h},i(e(a)("\u8FD4\u56DE")),9,sv)]),_:1})])])):D("",!0)}}});var uv=S(dv,[["__scopeId","data-v-e0dbc410"]]);const lv={key:0,id:"page"},cv={class:"title"},pv={class:"desc"},mv={class:"network-message"},fv=["innerHTML"],vv=["onSubmit"],bv={class:"label-key"},gv={value:"dhcp"},_v={value:"static"},hv={class:"label-key"},xv=["placeholder","disabled"],kv={key:0,class:"msg"},wv={class:"label-key"},yv=["placeholder","disabled"],Fv={key:1,class:"msg"},Ev={class:"label-key"},Cv=["placeholder","disabled"],$v={class:"label-key"},Dv=["disabled"],Bv={value:"manual"},Yv={class:"label-key"},Av=["onUpdate:modelValue","placeholder","disabled"],Sv={class:"label-key"},zv=["placeholder","disabled"],Pv={class:"label-key"},Tv=["placeholder","disabled"],Lv={key:2,class:"chose_dhcp"},Iv={class:"dhcp_info"},Mv={key:3,class:"msgs"},Ov={class:"btns"},Nv=["disabled"],qv=["onClick"],Vv={key:1,id:"page"},Gv={class:"title"},jv={class:"btns"},Rv=["onClick"],Uv=["onClick"],Hv=I({setup(o){const{$gettext:a,$ngettext:n}=q(),l=a("\u7531\u4E8E\u60A8\u7684\u8BBE\u5907<span>\u6CA1\u6709 WAN \u53E3</span>\uFF0C\u65E0\u6CD5\u4F7F\u7528\u672C\u8BBE\u7F6E\u5411\u5BFC\uFF0C\u5177\u4F53\u8BF7\u770B%{link}",{link:'<a href="https://doc.linkease.com/zh/guide/istoreos/question.html#%E7%BD%91%E7%BB%9C" target="_blank" rel="noopener noreferrer">'+a("\u94FE\u63A5")+"</a>"},!0),d=E(0),r=E({}),p=E(""),x=E(""),_=E(""),b=E(!1),m=E(""),c=E(""),f=E(0),v=gt.checkIsIP,g=E(!1);(()=>M(this,null,function*(){var B,Y;b.value=!0;try{const $=yield Promise.all([P.Guide.ClientModel.GET(),P.Guide.GetLan.GET()]);if($[0]){const z=$[0];if(z.data){const{success:T,error:J,result:j}=z.data;j&&(j.wanProto!="dhcp"&&j.wanProto!="static"&&(j.wanProto="dhcp",j.dnsProto="auto"),j.enableLanDhcp=!1,r.value=j),T==-1011&&(f.value=T,b.value=!0)}}(B=$[1].data)!=null&&B.result&&(((Y=$[1].data)==null?void 0:Y.result).enableDhcp||(g.value=!0,r.value.enableLanDhcp=!0))}catch($){p.value=$}f.value==0&&(b.value=!1)}))();const h=B=>{B.target.value=="static"?((r.value.staticIp==null||r.value.staticIp=="")&&(r.value.staticIp="192.168.1.100"),(r.value.subnetMask==null||r.value.subnetMask=="")&&(r.value.subnetMask="255.255.255.0"),r.value.dnsProto=="auto"&&setTimeout(()=>r.value.dnsProto="manual",0)):r.value.dnsProto=="manual"&&setTimeout(()=>r.value.dnsProto="auto",0)},w=B=>{const Y=B.target;if(Y.value==""){m.value="";return}v(Y.value)?m.value="":m.value=a("\u8BF7\u8F93\u5165\u5408\u6CD5\u7684IP\u5730\u5740")},y=B=>{const Y=B.target;if(Y.value==""){c.value="";return}v(Y.value)?c.value="":c.value=a("\u8BF7\u8F93\u5165\u5408\u6CD5\u7684\u5730\u5740")},F=()=>M(this,null,function*(){const B={};switch(r.value.wanProto){case"dhcp":break;case"static":B.staticIp=r.value.staticIp,B.subnetMask=r.value.subnetMask,B.gateway=r.value.gateway;break}switch(r.value.dnsProto){case"auto":break;case"manual":B.manualDnsIp=[],r.value.manualDnsIp!=null&&r.value.manualDnsIp.length>0?B.manualDnsIp=r.value.manualDnsIp:(B.manualDnsIp.push(x.value),_.value&&B.manualDnsIp.push(_.value));break}B.dnsProto=r.value.dnsProto,B.wanProto=r.value.wanProto,B.enableLanDhcp=r.value.enableLanDhcp;const Y=C.Loading(a("\u914D\u7F6E\u4E2D...."));b.value=!0;try{const $=yield P.Guide.ClientModel.POST(B);if($!=null&&$.data){const{success:z,error:T}=$==null?void 0:$.data;T&&(p.value=T),(z==null||z==0)&&(C.Success(a("\u914D\u7F6E\u6210\u529F")),d.value=1)}}catch($){p.value=$}b.value=!1,Y.Close()});return(B,Y)=>{const $=K("switch-box"),z=K("router-link");return d.value==0?(s(),u("div",lv,[t("h2",cv,i(e(a)("\u914D\u7F6E\u4E92\u8054\u7F51")),1),t("h3",pv,i(e(a)("\u8BF7\u786E\u4FDD\u60A8\u5DF2\u5C06\u672C\u8BBE\u5907 WAN \u53E3\u8FDE\u63A5\u5230\u4E0A\u7EA7\u8DEF\u7531\u5668\u5C40\u57DF\u7F51\uFF08 LAN \uFF09\u63A5\u53E3")),1),t("div",mv,[f.value==-1011?(s(),u("li",{key:0,innerHTML:e(l)},null,8,fv)):D("",!0)]),t("form",{onSubmit:st(F,["prevent"])},[t("label",null,[t("div",bv,[t("span",null,i(e(a)("WAN \u63A5\u53E3\u914D\u7F6E\u65B9\u5F0F")),1)]),L(t("select",{"onUpdate:modelValue":Y[0]||(Y[0]=T=>r.value.wanProto=T),onInput:h},[t("option",gv,i(e(a)("\u81EA\u52A8\u83B7\u53D6IP\u5730\u5740\uFF08DHCP\uFF09")),1),t("option",_v,i(e(a)("\u9759\u6001IP\u5730\u5740")),1)],544),[[tt,r.value.wanProto]])]),r.value.wanProto=="static"?(s(),u(N,{key:0},[t("label",null,[t("div",hv,[t("span",null,i(e(a)("IP\u5730\u5740")),1)]),L(t("input",{type:"text","onUpdate:modelValue":Y[1]||(Y[1]=T=>r.value.staticIp=T),placeholder:e(a)("\u9759\u6001IP\u5730\u5740"),required:"",disabled:b.value,onInput:w},null,40,xv),[[H,r.value.staticIp,void 0,{trim:!0}]])]),m.value?(s(),u("p",kv,i(m.value),1)):D("",!0),t("label",null,[t("div",wv,[t("span",null,i(e(a)("\u5B50\u7F51\u63A9\u7801")),1)]),L(t("input",{type:"text","onUpdate:modelValue":Y[2]||(Y[2]=T=>r.value.subnetMask=T),placeholder:e(a)("\u5B50\u7F51\u63A9\u7801"),required:"",disabled:b.value,onInput:y},null,40,yv),[[H,r.value.subnetMask,void 0,{trim:!0}]])]),c.value?(s(),u("p",Fv,i(c.value),1)):D("",!0),t("label",null,[t("div",Ev,[t("span",null,i(e(a)("\u7F51\u5173\u5730\u5740")),1)]),L(t("input",{type:"text","onUpdate:modelValue":Y[3]||(Y[3]=T=>r.value.gateway=T),placeholder:e(a)("\u7F51\u5173\u5730\u5740"),required:"",disabled:b.value},null,8,Cv),[[H,r.value.gateway,void 0,{trim:!0}]])])],64)):D("",!0),t("label",null,[t("div",$v,[t("span",null,i(e(a)("DNS \u914D\u7F6E\u65B9\u5F0F")),1)]),L(t("select",{"onUpdate:modelValue":Y[4]||(Y[4]=T=>r.value.dnsProto=T)},[t("option",{value:"auto",disabled:r.value.wanProto=="static"},i(e(a)("\u81EA\u52A8\u83B7\u53D6\uFF08DHCP\uFF09")),9,Dv),t("option",Bv,i(e(a)("\u624B\u5DE5\u914D\u7F6E")),1)],512),[[tt,r.value.dnsProto]])]),r.value.dnsProto=="manual"?(s(),u(N,{key:1},[r.value.manualDnsIp!=null&&r.value.manualDnsIp.length>0?(s(!0),u(N,{key:0},R(r.value.manualDnsIp,(T,J)=>(s(),u("label",null,[t("div",Yv,[t("span",null,i(e(a)("DNS\u670D\u52A1\u5668")),1)]),L(t("input",{type:"text","onUpdate:modelValue":j=>r.value.manualDnsIp[J]=j,placeholder:e(a)("DNS\u670D\u52A1\u5668"),required:"",disabled:b.value},null,8,Av),[[H,r.value.manualDnsIp[J],void 0,{trim:!0}]])]))),256)):(s(),u(N,{key:1},[t("label",null,[t("div",Sv,[t("span",null,i(e(a)("DNS\u670D\u52A1\u5668")),1)]),L(t("input",{type:"text","onUpdate:modelValue":Y[5]||(Y[5]=T=>x.value=T),placeholder:e(a)("DNS\u670D\u52A1\u5668"),required:"",disabled:b.value},null,8,zv),[[H,x.value,void 0,{trim:!0}]])]),t("label",null,[t("div",Pv,i(e(a)("\u5907\u7528DNS\u670D\u52A1\u5668")),1),L(t("input",{type:"text","onUpdate:modelValue":Y[6]||(Y[6]=T=>_.value=T),placeholder:e(a)("\u5907\u7528DNS\u670D\u52A1\u5668"),disabled:b.value},null,8,Tv),[[H,_.value,void 0,{trim:!0}]])])],64))],64)):D("",!0),g.value?(s(),u("div",Lv,[A($,{modelValue:r.value.enableLanDhcp,"onUpdate:modelValue":Y[7]||(Y[7]=T=>r.value.enableLanDhcp=T)},{default:G(()=>[t("span",Iv,i(e(a)("\u542F\u7528LAN\u53E3DHCP\u670D\u52A1\uFF08\u7528\u4E8E\u4ECE\u65C1\u8DEF\u7531\u6A21\u5F0F\u6062\u590D\u6210\u9ED8\u8BA4\u72B6\u6001\uFF09")),1)]),_:1},8,["modelValue"])])):D("",!0),p.value?(s(),u("div",Mv,i(p.value),1)):D("",!0),t("div",Ov,[t("button",{class:"cbi-button cbi-button-apply app-btn app-next",disabled:b.value},i(e(a)("\u4FDD\u5B58\u914D\u7F6E")),9,Nv),A(z,{to:"/network",custom:""},{default:G(({navigate:T})=>[t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:T},i(e(a)("\u8FD4\u56DE")),9,qv)]),_:1})])],40,vv)])):d.value==1?(s(),u("div",Vv,[t("h2",Gv,i(e(a)("\u914D\u7F6E\u6210\u529F")),1),t("div",jv,[A(z,{to:"/",custom:""},{default:G(({navigate:T})=>[t("button",{class:"cbi-button cbi-button-apply app-btn app-next",onClick:T},i(e(a)("\u8FDB\u5165\u63A7\u5236\u53F0")),9,Rv)]),_:1}),A(z,{to:"/network",custom:""},{default:G(({navigate:T})=>[t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:T},i(e(a)("\u8FD4\u56DE")),9,Uv)]),_:1})])])):D("",!0)}}});var Wv=S(Hv,[["__scopeId","data-v-2a551d90"]]);const Zv=o=>(W("data-v-21e138ec"),o=o(),Z(),o),Jv={key:0,id:"page"},Xv={class:"title"},Kv=Zv(()=>t("br",null,null,-1)),Qv={class:"btns"},tb=["onClick"],eb={key:1,id:"page"},ab={class:"title"},ob={class:"desc"},nb=["onSubmit"],ib={class:"label-key"},rb={class:"label-value"},sb={class:"label-key"},db=["placeholder"],ub={class:"label-key"},lb=["placeholder"],cb={class:"label-key"},pb=["placeholder"],mb={class:"label-key"},fb=["placeholder"],vb={key:0,class:"msgs"},bb={class:"switch_inline"},gb={key:0,class:"switch_info"},_b={key:1,class:"switch_info"},hb={class:"switch_inline"},xb={class:"switch_info"},kb={class:"switch_inline"},wb={class:"switch_info"},yb={class:"btns"},Fb={class:"cbi-button cbi-button-apply app-btn app-next"},Eb=["onClick"],Cb={key:2,id:"page"},$b={class:"title"},Db={class:"desc"},Bb={class:"btns"},Yb={key:3,id:"page"},Ab={class:"title"},Sb=["disabled"],zb={style:{"text-align":"left"}},Pb={class:"btns"},Tb=["disabled"],Lb=["onClick"],Ib=I({setup(o){const{$gettext:a,$ngettext:n}=q(),l=E(0),d=E(""),r=E(!1),p=U(()=>{var v,g,k;return!(((v=_.value)==null?void 0:v.ipv4addr)&&((g=_.value)==null?void 0:g.ipv4mask)&&((k=_.value)==null?void 0:k.gateway))}),x=E({subnetMask:"255.255.255.0",staticDnsIp:"223.5.5.5",staticLanIp:"",gateway:"",enableDhcp:!0,dhcp6c:!1,enableNat:!1}),_=E(),b=()=>{r.value=!0,P.Network.Status.GET().then(v=>{if(v!=null&&v.data){const{result:g}=v==null?void 0:v.data;g&&(_.value=g)}}).finally(()=>{r.value=!1})},m=v=>{var g,k,h,w,y;v&&(x.value.staticLanIp=((g=_.value)==null?void 0:g.ipv4addr)||"",x.value.subnetMask=((k=_.value)==null?void 0:k.ipv4mask)&&mt.prefixToMask(_.value.ipv4mask)||"",x.value.gateway=((h=_.value)==null?void 0:h.gateway)||"",x.value.staticDnsIp=((w=_.value)==null?void 0:w.dnsList)&&((y=_.value)==null?void 0:y.dnsList[0])||"223.5.5.5"),l.value=1},c=v=>{window.location.href=location.protocol+"//"+x.value.staticLanIp+(location.port?":"+location.port:"")},f=()=>M(this,null,function*(){const v=x.value,g=C.Loading(a("\u914D\u7F6E\u4E2D..."));try{const k=yield P.Guide.GatewayRouter.POST(v);if(k!=null&&k.data){const{success:h,error:w}=k==null?void 0:k.data;if(w&&(d.value=w),h==null||h==0){setTimeout(()=>{l.value=2,g.Close()},5e3);return}}}catch(k){d.value=k}g.Close()});return(v,g)=>{var w,y,F,B;const k=K("router-link"),h=K("switch-box");return l.value==0?(s(),u("div",Jv,[t("h2",Xv,i(e(a)("\u65C1\u8DEF\u7531\u914D\u7F6E\u524D\u7684\u51C6\u5907\u5DE5\u4F5C")),1),t("code",null,[at(i(e(a)("\u65C1\u8DEF\u7531\u6A21\u5F0F\uFF0C\u4E5F\u53EB\u5355\u81C2\u8DEF\u7531\u6A21\u5F0F\u3002"))+" ",1),t("p",null,i(e(a)("\u60A8\u53EF\u4EE5\u7528\u4E0A\u4E00\u7EA7\u8DEF\u7531\uFF08\u4E3B\u8DEF\u7531\uFF09\u62E8\u53F7\uFF0C\u7136\u540E\u7528\u672C\u8DEF\u7531\u6765\u5B9E\u73B0\u4E00\u4E9B\u9AD8\u7EA7\u529F\u80FD\u3002")),1),Kv,t("p",null,i(e(a)("\u672C\u5411\u5BFC\u652F\u6301\u81EA\u52A8\u6216\u624B\u52A8\u914D\u7F6E\uFF1A")),1),t("p",null,i(e(a)("\u70B9\u51FB\u201C\u81EA\u52A8\u914D\u7F6E\u201D\u6309\u94AE\u5F00\u59CB\u81EA\u52A8\u914D\u7F6E\u5411\u5BFC\uFF1B")),1),t("p",null,i(e(a)("\u624B\u52A8\u914D\u7F6E\u5219\u9700\u81EA\u884C\u83B7\u53D6\u4E3B\u8DEF\u7531\u5668\u7684IP\u5730\u5740\uFF08\u4F8B\u5982 192.168.2.1 \uFF09\u548C\u5B50\u7F51\u63A9\u7801\uFF0C\u8BB0\u5F55\u4EE5\u5907\u540E\u7EED\u586B\u5199\uFF0C\u70B9\u51FB\u201C\u624B\u52A8\u914D\u7F6E\u201D\u6309\u94AE\uFF0C\u5207\u6362\u5230\u53C2\u6570\u914D\u7F6E\u9875\uFF0C\u6309\u5B9E\u9645\u60C5\u51B5\u81EA\u884C\u586B\u5199\u3002")),1)]),t("div",Qv,[t("button",{class:"cbi-button cbi-button-success app-btn app-next",onClick:g[0]||(g[0]=Y=>l.value=3)},i(e(a)("\u81EA\u52A8\u914D\u7F6E...")),1),t("button",{class:"cbi-button cbi-button-neutral app-btn app-next",onClick:g[1]||(g[1]=Y=>m(!1))},i(e(a)("\u624B\u52A8\u914D\u7F6E...")),1),A(k,{to:"/network",custom:""},{default:G(({navigate:Y})=>[t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:Y},i(e(a)("\u8FD4\u56DE")),9,tb)]),_:1})])])):l.value==1?(s(),u("div",eb,[t("h2",ab,i(e(a)("\u914D\u7F6E\u65C1\u8DEF\u7531\u7F51\u7EDC")),1),t("h3",ob,i(e(a)("\u73B0\u5728\uFF0C\u8BF7\u4F60\u914D\u7F6E\u65C1\u8DEF\u7531\u4FE1\u606F")),1),t("form",{onSubmit:st(f,["prevent"])},[t("label",null,[t("div",ib,[t("span",null,i(e(a)("LAN \u63A5\u53E3\u914D\u7F6E\u65B9\u5F0F")),1)]),t("div",rb,[t("select",{disabled:"",style:Yt({backgroundColor:"rgba(215, 215, 215, 1)",color:"#333"})},[t("option",null,i(e(a)("\u65C1\u8DEF\u7531\u6A21\u5F0F\u4EC5\u652F\u6301\u9759\u6001IP\u5730\u5740")),1)],4)])]),t("label",null,[t("div",sb,[t("span",null,i(e(a)("IP \u5730\u5740")),1)]),L(t("input",{type:"text","onUpdate:modelValue":g[2]||(g[2]=Y=>x.value.staticLanIp=Y),placeholder:e(a)("IP\u5730\u5740"),required:""},null,8,db),[[H,x.value.staticLanIp,void 0,{trim:!0}]])]),t("label",null,[t("div",ub,[t("span",null,i(e(a)("\u5B50\u7F51\u63A9\u7801")),1)]),L(t("input",{type:"text","onUpdate:modelValue":g[3]||(g[3]=Y=>x.value.subnetMask=Y),placeholder:e(a)("\u5B50\u7F51\u63A9\u7801"),required:""},null,8,lb),[[H,x.value.subnetMask,void 0,{trim:!0}]])]),t("label",null,[t("div",cb,[t("span",null,i(e(a)("\u7F51\u5173\u5730\u5740")),1)]),L(t("input",{type:"text","onUpdate:modelValue":g[4]||(g[4]=Y=>x.value.gateway=Y),placeholder:e(a)("\u7F51\u5173\u5730\u5740"),required:""},null,8,pb),[[H,x.value.gateway,void 0,{trim:!0}]])]),t("label",null,[t("div",mb,[t("span",null,i(e(a)("DNS\u670D\u52A1\u5668")),1)]),L(t("input",{type:"text","onUpdate:modelValue":g[5]||(g[5]=Y=>x.value.staticDnsIp=Y),placeholder:e(a)("223.5.5.5"),required:""},null,8,fb),[[H,x.value.staticDnsIp,void 0,{trim:!0}]])]),d.value?(s(),u("div",vb,i(d.value),1)):D("",!0),t("div",bb,[A(h,{modelValue:x.value.enableDhcp,"onUpdate:modelValue":g[6]||(g[6]=Y=>x.value.enableDhcp=Y)},{default:G(()=>[x.value.enableDhcp?(s(),u("span",gb,i(e(a)("\u63D0\u4F9B DHCPv4 \u670D\u52A1\uFF08\u9700\u8981\u5173\u95ED\u4E3B\u8DEF\u7531 DHCP \u670D\u52A1\uFF09")),1)):(s(),u("span",_b,i(e(a)("\u63D0\u4F9B DHCPv4 \u670D\u52A1")),1))]),_:1},8,["modelValue"])]),t("div",hb,[A(h,{modelValue:x.value.dhcp6c,"onUpdate:modelValue":g[7]||(g[7]=Y=>x.value.dhcp6c=Y)},{default:G(()=>[t("span",xb,i(e(a)("\u81EA\u52A8\u83B7\u53D6 IPV6\uFF08\u5373\u5F00\u542F DHCPv6 \u5BA2\u6237\u7AEF\uFF09")),1)]),_:1},8,["modelValue"])]),t("div",kb,[A(h,{modelValue:x.value.enableNat,"onUpdate:modelValue":g[8]||(g[8]=Y=>x.value.enableNat=Y)},{default:G(()=>[t("span",wb,i(e(a)("\u5F00\u542F NAT\uFF08\u53EF\u4FEE\u590D\u67D0\u4E9B\u65E0\u7EBF\u70ED\u70B9\u4E0D\u80FD\u8BBF\u95EE\u5916\u7F51\u95EE\u9898\uFF09")),1)]),_:1},8,["modelValue"])]),t("div",yb,[t("button",Fb,i(e(a)("\u4FDD\u5B58\u914D\u7F6E")),1),A(k,{to:"/network",custom:""},{default:G(({navigate:Y})=>[t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:Y},i(e(a)("\u8FD4\u56DE")),9,Eb)]),_:1})])],40,nb)])):l.value==2?(s(),u("div",Cb,[t("h2",$b,i(e(a)("\u914D\u7F6E\u6210\u529F")),1),t("h3",Db,i(e(a)("\u73B0\u5728\uFF0C\u5C06\u672C\u8DEF\u7531WAN\u53E3\u65AD\u5F00\uFF0C\u5C06\u5176\u4E2D\u4E00\u4E2ALAN\u53E3\u4E0E\u4E3B\u8DEF\u7531\u8FDE\u63A5\uFF0C\u5E76\u5C06\u5F53\u524D\u6D4F\u89C8\u5668\u8BBE\u5907\u8FDE\u63A5\u5230\u4E3B\u8DEF\u7531\u3002\u70B9\u51FB\u201C\u8FDB\u5165\u63A7\u5236\u53F0\u201D\u6D4F\u89C8\u5668\u5C06\u8DF3\u8F6C\u5230\u65B0\u7684\u8DEF\u7531IP")),1),t("div",Bb,[t("button",{class:"cbi-button cbi-button-apply app-btn app-next",onClick:c},i(e(a)("\u8FDB\u5165\u63A7\u5236\u53F0")),1)])])):l.value==3?(s(),u("div",Yb,[t("h2",Ab,i(e(a)("\u65C1\u8DEF\u7531\u81EA\u52A8\u914D\u7F6E")),1),t("code",null,i(e(a)("\u9996\u5148\u786E\u8BA4\u4E3B\u8DEF\u7531\u5F00\u542F\u4E86 DHCP \u670D\u52A1\uFF0C\u786E\u8BA4\u672C\u8DEF\u7531 WAN \u53E3\u662F DHCP \u5BA2\u6237\u7AEF\u6A21\u5F0F\uFF08\u9ED8\u8BA4\u5373\u662F\uFF0C\u5982\u679C\u4E0D\u662F\u53EF\u4F7F\u7528\u201C\u8FDE\u63A5\u73B0\u6709\u8DEF\u7531\u5668\u201D\u5411\u5BFC\u6539\u6210 DHCP \u5BA2\u6237\u7AEF\uFF09\uFF0C\u7136\u540E\u5C06\u672C\u8DEF\u7531 WAN \u53E3\u4E0E\u4E3B\u8DEF\u7531\u7684 LAN \u8FDE\u63A5\uFF0C\u4EE5\u81EA\u52A8\u83B7\u53D6\u914D\u7F6E\u3002")),1),at(" "+i(e(a)("1. \u6EE1\u8DB3\u4E0A\u8FF0\u6761\u4EF6\u4EE5\u540E\uFF0C\u70B9\u51FB\u201C\u5F53\u524D IPv4 \u4E0A\u6E38\u4FE1\u606F\u201D\u4EE5\u5237\u65B0\u5F53\u524D\u8FDE\u63A5\u4FE1\u606F\uFF0C\u6210\u529F\u4EE5\u540E\uFF0C\u201C\u81EA\u52A8\u586B\u5199\u201D\u6309\u94AE\u5C06\u88AB\u6FC0\u6D3B\u3002(\u5931\u8D25\u53EF\u518D\u6B21\u70B9\u51FB)"))+" ",1),t("button",{class:rt(["cbi-button cbi-button-neutral",e(p)?"cbi-button-neutral":"cbi-button-success"]),disabled:r.value,onClick:b},[at(i(e(a)("\u5F53\u524D IPv4 \u4E0A\u6E38\u4FE1\u606F\uFF08\u70B9\u6B64\u5237\u65B0\uFF09"))+" ",1),t("p",zb,[t("ul",null,[t("li",null,i(e(a)("IP \u5730\u5740: "))+i((w=_.value)==null?void 0:w.ipv4addr),1),t("li",null,i(e(a)("\u5B50\u7F51\u63A9\u7801: "))+i(((y=_.value)==null?void 0:y.ipv4mask)&&e(mt).prefixToMask(_.value.ipv4mask)),1),t("li",null,i(e(a)("\u7F51\u5173\u5730\u5740: "))+i((F=_.value)==null?void 0:F.gateway),1),t("li",null,i(e(a)("DNS\u670D\u52A1\u5668: "))+i(((B=_.value)==null?void 0:B.dnsList)&&_.value.dnsList[0]||(e(p)?"":e(a)("\uFF08\u65E0DNS\u670D\u52A1\u5668\uFF0C\u8BF7\u4E4B\u540E\u81EA\u884C\u586B\u5199\u516C\u5171DNS\u670D\u52A1\u5668\uFF0C\u4F8B\u5982 223.5.5.5\uFF09"))),1)])])],10,Sb),at(" "+i(e(a)("2. \u70B9\u51FB\u201C\u81EA\u52A8\u586B\u5199\u201D\uFF0C\u5C06\u5207\u6362\u5230\u53C2\u6570\u9875\u5E76\u81EA\u52A8\u586B\u5199\u3002\u6B64\u65F6\u4F9D\u7136\u53EF\u4EE5\u81EA\u884C\u8C03\u6574\u53C2\u6570\u3002"))+" ",1),t("div",Pb,[t("button",{class:"cbi-button cbi-button-apply app-btn app-next",disabled:e(p),onClick:g[9]||(g[9]=Y=>m(!0))},i(e(a)("\u81EA\u52A8\u586B\u5199..."))+i(e(p)?e(a)("\uFF08\u8BF7\u5148\u83B7\u53D6IPv4\u4E0A\u6E38\u4FE1\u606F\uFF09"):""),9,Tb),A(k,{to:"/network",custom:""},{default:G(({navigate:Y})=>[t("button",{class:"cbi-button cbi-button-remove app-btn app-back",onClick:Y},i(e(a)("\u8FD4\u56DE")),9,Lb)]),_:1})])])):D("",!0)}}});var Mb=S(Ib,[["__scopeId","data-v-21e138ec"]]);const Ob={class:"actioner-container"},Nb={class:"actioner-container_header"},qb={class:"actioner-container_body"},Vb={class:"label-item"},Gb={class:"label-item_key"},jb={class:"label-item_value"},Rb=["value"],Ub={class:"label-item_tips"},Hb={class:"label-item"},Wb={class:"label-item_key"},Zb={key:0,class:"label-item_value"},Jb={class:"msg-warning"},Xb={key:1,class:"label-item_value"},Kb=["value"],Qb={key:1,class:"msg-warning"},tg={class:"label-item_tips"},eg={class:"actioner-container_footer"},ag=["disabled"],og=["disabled"],ng={key:1,class:"actioner-container_body setup-loading"},ig={class:"actioner-container_body setup-error"},rg={class:"actioner-container_footer"},sg=["disabled"],dg={class:"actioner-container_body setup-success"},ug={class:"body-title"},lg={class:"actioner-container_footer"},cg=I({props:{Close:{type:Function,required:!0},success:{type:Function}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=()=>{a.Close()},r=()=>{a.success&&a.success()},p=E("init"),x=E(""),_=[{name:"jbod",title:n("JBOD (\u7EBF\u6027)"),info:n("\u81F3\u5C11\u9700\u89812\u5757\u786C\u76D8\uFF0C\u5C06\u591A\u4E2A\u786C\u76D8\u5408\u5E76\u4E3A\u5355\u4E2A\u5B58\u50A8\u7A7A\u95F4\uFF0C\u5176\u5BB9\u91CF\u7B49\u4E8E\u6240\u6709\u786C\u76D8\u5BB9\u91CF\u7684\u603B\u548C\u3002\u4E0D\u63D0\u4F9B\u6570\u636E\u5197\u4F59\u3002"),select:2},{name:"raid0",title:n("RAID 0 (\u6761\u5E26)"),info:n("\u81F3\u5C11\u9700\u89812\u5757\u786C\u76D8\uFF0C\u201C\u533A\u5757\u5EF6\u5C55\u201D\u529F\u80FD\u662F\u5C06\u6570\u636E\u5206\u6210\u591A\u4E2A\u5757\uFF0C\u5E76\u5C06\u6570\u636E\u5757\u5206\u6563\u5230\u7EC4\u6210\u7684\u591A\u4E2A\u786C\u76D8\u4E0A\u4EE5\u63D0\u9AD8\u6027\u80FD\u7684\u8FC7\u7A0B\u3002\u4E0D\u63D0\u4F9B\u6570\u636E\u5197\u4F59\u3002"),select:2},{name:"raid1",title:n("RAID 1 (\u955C\u50CF)"),info:n("\u81F3\u5C11\u9700\u89812\u5757\u786C\u76D8\uFF0C\u540C\u65F6\u5411\u6240\u6709\u786C\u76D8\u5199\u5165\u76F8\u540C\u7684\u6570\u636E\u3002\u63D0\u4F9B\u6570\u636E\u5197\u4F59\u3002"),select:2},{name:"raid5",title:"RAID 5 ",info:n("\u81F3\u5C11\u9700\u89813\u5757\u786C\u76D8\uFF0C\u6267\u884C\u6BB5\u843D\u5206\u5757\u5EF6\u5C55\uFF0C\u5E76\u5BF9\u5206\u5E03\u5230\u6240\u6709\u7EC4\u6210\u786C\u76D8\u4E0A\u7684\u6570\u636E\u6267\u884C\u5947\u5076\u6821\u9A8C\uFF0C\u4ECE\u800C\u63D0\u4F9B\u6BD4 RAID 1 \u66F4\u6709\u6548\u7684\u6570\u636E\u5197\u4F59\u3002"),select:3},{name:"raid6",title:"RAID 6 ",info:n("\u81F3\u5C11\u9700\u89814\u5757\u786C\u76D8\uFF0C\u6267\u884C\u4E24\u4E2A\u5C42\u7EA7\u7684\u6570\u636E\u5947\u5076\u6821\u9A8C\u4EE5\u5B58\u50A8\u7B49\u4E8E 2 \u4E2A\u786C\u76D8\u5BB9\u91CF\u7684\u5197\u4F59\u6570\u636E\uFF0C\u63D0\u4F9B\u6BD4 RAID 5 \u66F4\u5927\u7A0B\u5EA6\u7684\u6570\u636E\u5197\u4F59\u3002"),select:4},{name:"raid10",title:"RAID 10",info:n("\u81F3\u5C11\u9700\u89814\u5757\u786C\u76D8\uFF0C\u63D0\u4F9B RAID 0 \u7684\u6027\u80FD\u548C RAID 1 \u7684\u6570\u636E\u4FDD\u62A4\u7EA7\u522B\uFF0C\u5C06\u786C\u76D8\u7EC4\u5408\u8FDB\u955C\u50CF\u6570\u636E\u7684\u7531\u4E24\u4E2A\u786C\u76D8\u7EC4\u6210\u7684\u7EC4\u3002"),select:4}],b=E("raid5"),m=E([]),c=w=>{let y="";return _.forEach(F=>{F.name===w&&(y=F.info)}),y},f=E(!1),v=dt({loading:!1,members:[]}),g=w=>{};(()=>M(this,null,function*(){v.loading=!0;try{const w=yield P.Raid.CreateList.GET();if(w!=null&&w.data){const{success:y,error:F,result:B}=w.data;if(B&&(v.members=B.members||[]),F)throw F}}catch(w){console.log(w)}finally{v.loading=!1}}))();const h=()=>M(this,null,function*(){const w=_.filter(F=>F.name===b.value)[0],y=m.value;if(!w){C.Warning(n("\u8BF7\u9009\u62E9raid\u7C7B\u578B"));return}if(y.length==0){C.Warning(n("\u8BF7\u9009\u62E9\u78C1\u76D8"));return}if(w.select>y.length){C.Warning(n("\u8BF7\u9009\u62E9\u81F3\u5C11%{min}\u5757\u78C1\u76D8",{min:""+w.select}));return}if(!!confirm(n("\u662F\u5426\u7ACB\u5373\u521B\u5EFA %{name}\uFF1F\u9009\u62E9\u7684\u786C\u76D8\u6240\u6709\u5206\u533A\u5C06\u4F1A\u88AB\u6E05\u9664\uFF0C\u6B64\u64CD\u4F5C\u53EF\u80FD\u4F1A\u5BFC\u81F4\u786C\u76D8\u6570\u636E\u4E22\u5931\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C\u3002",{name:w.name}))&&!!confirm(n("\u786E\u5B9A\u521B\u5EFA %{name}\uFF1F\u8BE5\u64CD\u4F5C\u4E0D\u53EF\u9006,\u8BF7\u8C28\u614E\u64CD\u4F5C",{name:w.name}))){f.value=!0,p.value="loading";try{const F=yield P.Raid.Create.POST({level:w.name,devicePaths:y});if(F.data){const{success:B,error:Y,result:$}=F.data;if(Y)throw Y;(B||0)==0&&(p.value="success",r())}}catch(F){x.value=F,p.value="error"}finally{f.value=!1}}});return(w,y)=>{const F=K("icon-loading"),B=K("icon-error"),Y=K("icon-success");return s(),u("div",Ob,[t("div",Nb,[t("span",null,i(e(n)("RAID\u521B\u5EFA\u5411\u5BFC")),1)]),p.value=="init"?(s(),u(N,{key:0},[t("div",qb,[t("p",null,i(e(n)("RAID\u78C1\u76D8\u9635\u5217\u662F\u7528\u591A\u4E2A\u72EC\u7ACB\u7684\u78C1\u76D8\u7EC4\u6210\u5728\u4E00\u8D77\u5F62\u6210\u4E00\u4E2A\u5927\u7684\u78C1\u76D8\u7CFB\u7EDF\uFF0C\u4ECE\u800C\u5B9E\u73B0\u6BD4\u5355\u5757\u78C1\u76D8\u66F4\u597D\u7684\u5B58\u50A8\u6027\u80FD\u548C\u66F4\u9AD8\u7684\u53EF\u9760\u6027\u3002")),1),t("div",Vb,[t("div",Gb,[t("span",null,i(e(n)("RAID\u7EA7\u522B\uFF1A")),1)]),t("div",jb,[L(t("select",{"onUpdate:modelValue":y[0]||(y[0]=$=>b.value=$),onChange:g},[(s(),u(N,null,R(_,$=>t("option",{value:$.name},i($.title),9,Rb)),64))],544),[[tt,b.value]])]),t("div",Ub,[A(pt),at(" "+i(c(b.value)),1)])]),t("div",Hb,[t("div",Wb,[t("span",null,i(e(n)("\u78C1\u76D8\u9635\u5217\u6210\u5458\uFF1A")),1)]),e(v).loading?(s(),u("div",Zb,[t("span",Jb,i(e(n)("\u68C0\u6D4B\u4E2D...")),1)])):(s(),u("div",Xb,[e(v).members.length>0?(s(!0),u(N,{key:0},R(e(v).members,$=>(s(),u("label",null,[L(t("input",{type:"checkbox","onUpdate:modelValue":y[1]||(y[1]=z=>m.value=z),value:$.path},null,8,Kb),[[Ct,m.value]]),at(" \u3010"+i($.model)+"\u3011"+i($.name)+" "+i($.path)+" ["+i($.sizeStr)+"] ",1)]))),256)):(s(),u("span",Qb,i(e(n)("\u68C0\u6D4B\u4E0D\u5230\u53EF\u7528\u78C1\u76D8\u9635\u5217\u6210\u5458")),1))])),t("div",tg,[A(pt),at(" "+i(e(n)("\u9009\u62E9\u5C06\u8981\u7528\u4E8E\u521B\u5EFA RAID \u7684\u786C\u76D8\uFF0C\u901A\u8FC7 USB \u63A5\u5165\u7684\u8BBE\u5907\u4E0D\u4F1A\u5728\u5217\u8868\u4E2D\u663E\u793A\uFF08USB\u63A5\u5165\u4E0D\u7A33\u5B9A\uFF09\u3002")),1)])])]),t("div",eg,[t("div",{class:"close",onClick:d,disabled:f.value},i(e(n)("\u53D6\u6D88")),9,ag),t("div",{class:"next",onClick:h,disabled:f.value},i(e(n)("\u521B\u5EFA")),9,og)])],64)):p.value=="loading"?(s(),u("div",ng,[A(F,{size:60,color:"#666"}),t("span",null,i(e(n)("\u6B63\u5728\u521B\u5EFA\u4E2D...")),1)])):p.value=="error"?(s(),u(N,{key:2},[t("div",ig,[A(B),t("span",null,i(x.value),1)]),t("div",rg,[t("div",{class:"close",onClick:d},i(e(n)("\u5173\u95ED")),1),t("div",{class:"next",onClick:h,disabled:f.value},i(e(n)("\u91CD\u65B0\u521B\u5EFA")),9,sg)])],64)):p.value=="success"?(s(),u(N,{key:3},[t("div",dg,[A(Y),t("div",ug,i(e(n)("\u521B\u5EFA\u6210\u529F")),1)]),t("div",lg,[t("div",{class:"close",onClick:d},i(e(n)("\u5173\u95ED")),1)])],64)):D("",!0)])}}});var pg=S(cg,[["__scopeId","data-v-7cf2dd18"]]);const mg={class:"actioner-container"},fg={class:"actioner-container_body"},vg=["value"],bg={class:"actioner-container_footer"},gg=I({props:{Close:{type:Function,required:!0},raid:{type:Object,required:!0}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=()=>{a.Close()},r=E("");return(()=>{P.Raid.Detail.POST({path:a.raid.path}).then(x=>{if(x.data){const{result:_,error:b}=x.data;b?r.value=b:r.value=(_==null?void 0:_.detail)||""}}).catch(x=>{r.value=x.message})})(),(x,_)=>(s(),u("div",mg,[t("div",fg,[t("textarea",{value:r.value},null,8,vg)]),t("div",bg,[t("div",{class:"close",onClick:d},i(e(n)("\u5173\u95ED")),1)])]))}});var _g=S(gg,[["__scopeId","data-v-0ef06e27"]]);const hg={class:"actioner-container"},xg={class:"actioner-container_header"},kg={class:"actioner-container_body"},wg={class:"label-item"},yg={class:"label-item_key"},Fg={class:"label-item_value"},Eg={disabled:""},Cg={class:"label-item"},$g={class:"label-item_key"},Dg={key:0,class:"label-item_value"},Bg={class:"msg-warning"},Yg={key:1,class:"label-item_value"},Ag=["value"],Sg={key:1,class:"msg-warning"},zg={class:"actioner-container_footer"},Pg=["disabled"],Tg=["disabled"],Lg=I({props:{Close:{type:Function,required:!0},raid:{type:Object,required:!0},success:{type:Function}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=()=>{a.Close()},r=()=>{a.success&&a.success()},p=()=>M(this,null,function*(){const c=b.value;if(c==""){C.Warning(n("\u8BF7\u9009\u62E9\u8981\u6DFB\u52A0\u7684\u786C\u76D8"));return}_.value=!0;const f=C.Loading(n("\u4FDD\u5B58\u4E2D..."));try{const v=yield P.Raid.Add.POST({path:a.raid.path,memberPath:c});if(v.data){const{error:g,success:k}=v.data;if(g)throw g;(k||0)==0&&(C.Success(n("\u4FDD\u5B58\u6210\u529F")),r(),d())}}catch(v){C.Error(`${v}`)}finally{_.value=!1,f.Close()}}),x=dt({loading:!1,members:[]}),_=E(!1),b=E("");return(()=>M(this,null,function*(){x.loading=!0,_.value=!0;try{const c=yield P.Raid.CreateList.GET();if(c!=null&&c.data){const{success:f,error:v,result:g}=c.data;if(g&&(x.members=g.members||[]),v)throw v}}catch(c){console.log(c)}finally{_.value=!1,x.loading=!1}}))(),(c,f)=>(s(),u("div",hg,[t("div",xg,[t("span",null,"RAID - "+i(o.raid.name)+" "+i(e(n)("\u4FEE\u6539")),1)]),t("div",kg,[t("div",wg,[t("div",yg,i(e(n)("\u8BBE\u5907")),1),t("div",Fg,[t("select",Eg,[t("option",null,i(o.raid.name)+"_"+i(o.raid.venderModel)+" ("+i(o.raid.path)+"\uFF0C"+i(o.raid.level)+"\uFF0C"+i(o.raid.size)+") ",1)])])]),t("div",Cg,[t("div",$g,i(e(n)("\u9009\u62E9\u786C\u76D8\uFF08\u9009\u62E9\u88AB\u6DFB\u52A0\u5230RAID\u7684\u786C\u76D8\uFF09\uFF1A")),1),e(x).loading?(s(),u("div",Dg,[t("span",Bg,i(e(n)("\u68C0\u6D4B\u4E2D...")),1)])):(s(),u("div",Yg,[e(x).members.length>0?(s(!0),u(N,{key:0},R(e(x).members,v=>(s(),u("label",null,[L(t("input",{type:"radio","onUpdate:modelValue":f[0]||(f[0]=g=>b.value=g),value:v.path},null,8,Ag),[[lt,b.value]]),at(" \u3010"+i(v.model)+"\u3011"+i(v.name)+" "+i(v.path)+" ["+i(v.sizeStr)+"] ",1)]))),256)):(s(),u("span",Sg,i(e(n)("\u68C0\u6D4B\u4E0D\u5230\u53EF\u7528\u78C1\u76D8\u9635\u5217\u6210\u5458")),1))]))])]),t("div",zg,[t("div",{class:"close",onClick:d,disabled:_.value},i(e(n)("\u53D6\u6D88")),9,Pg),t("div",{class:"next",onClick:p,disabled:_.value},i(e(n)("\u4FDD\u5B58")),9,Tg)])]))}});var Ig=S(Lg,[["__scopeId","data-v-593445fb"]]);const Mg={class:"actioner-container"},Og={class:"actioner-container_header"},Ng={class:"actioner-container_body"},qg={class:"label-item"},Vg={class:"label-item_key"},Gg={class:"label-item_value"},jg={disabled:""},Rg={class:"label-item"},Ug={class:"label-item_key"},Hg={class:"label-item_value"},Wg=["value"],Zg={class:"actioner-container_footer"},Jg=["disabled"],Xg=["disabled"],Kg=I({props:{Close:{type:Function,required:!0},raid:{type:Object,required:!0},success:{type:Function}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=()=>{a.Close()},r=()=>{a.success&&a.success()},p=()=>M(this,null,function*(){const b=_.value;if(b==""){C.Warning(n("\u8BF7\u9009\u62E9\u8981\u5220\u9664\u7684\u786C\u76D8"));return}x.value=!0;const m=C.Loading(n("\u4FDD\u5B58\u4E2D..."));try{const c=yield P.Raid.Remove.POST({path:a.raid.path,memberPath:b});if(c.data){const{error:f,success:v}=c.data;if(f)throw f;(v||0)==0&&(C.Success(n("\u4FDD\u5B58\u6210\u529F")),r(),d())}}catch(c){C.Error(`${c}`)}finally{x.value=!1,m.Close()}}),x=E(!1),_=E("");return(b,m)=>(s(),u("div",Mg,[t("div",Og,[t("span",null,"RAID - "+i(o.raid.name)+" "+i(e(n)("\u79FB\u9664")),1)]),t("div",Ng,[t("div",qg,[t("div",Vg,i(e(n)("\u8BBE\u5907")),1),t("div",Gg,[t("select",jg,[t("option",null,i(o.raid.name)+"_"+i(o.raid.venderModel)+" ("+i(o.raid.path)+"\uFF0C"+i(o.raid.level)+"\uFF0C"+i(o.raid.size)+") ",1)])])]),t("div",Rg,[t("div",Ug,i(e(n)("\u9009\u62E9\u786C\u76D8\uFF08\u9009\u62E9\u8981\u4ECERAID\u9635\u5217\u4E2D\u5220\u9664\u7684\u786C\u76D8\uFF09\uFF1A")),1),t("div",Hg,[(s(!0),u(N,null,R(o.raid.members,c=>(s(),u("label",null,[L(t("input",{type:"radio","onUpdate:modelValue":m[0]||(m[0]=f=>_.value=f),value:c},null,8,Wg),[[lt,_.value]]),at(" "+i(c),1)]))),256))])])]),t("div",Zg,[t("div",{class:"close",onClick:d,disabled:x.value},i(e(n)("\u53D6\u6D88")),9,Jg),t("div",{class:"next",onClick:p,disabled:x.value},i(e(n)("\u4FDD\u5B58")),9,Xg)])]))}});var Qg=S(Kg,[["__scopeId","data-v-77aa4121"]]);const t_={class:"actioner-container"},e_={class:"actioner-container_header"},a_={class:"actioner-container_body"},o_={class:"label-item"},n_={class:"label-item_key"},i_={class:"label-item_value"},r_={disabled:""},s_={class:"label-item"},d_={class:"label-item_key"},u_={key:0,class:"label-item_value"},l_={class:"msg-warning"},c_={key:1,class:"label-item_value"},p_=["value"],m_={key:1,class:"msg-warning"},f_={class:"actioner-container_footer"},v_=["disabled"],b_=["disabled"],g_=I({props:{Close:{type:Function,required:!0},raid:{type:Object,required:!0},success:{type:Function}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=()=>{a.Close()},r=()=>{a.success&&a.success()},p=()=>M(this,null,function*(){const c=b.value;if(c==""){C.Warning(n("\u8BF7\u9009\u62E9\u8981\u6DFB\u52A0\u7684\u786C\u76D8"));return}_.value=!0;const f=C.Loading(n("\u4FDD\u5B58\u4E2D..."));try{const v=yield P.Raid.Recover.POST({path:a.raid.path,memberPath:c});if(v.data){const{error:g,success:k}=v.data;if(g)throw g;(k||0)==0&&(C.Success(n("\u4FDD\u5B58\u6210\u529F")),r(),d())}}catch(v){C.Error(`${v}`)}finally{_.value=!1,f.Close()}}),x=dt({loading:!1,members:[]}),_=E(!1),b=E("");return(()=>M(this,null,function*(){x.loading=!0,_.value=!0;try{const c=yield P.Raid.CreateList.GET();if(c!=null&&c.data){const{success:f,error:v,result:g}=c.data;if(g&&(x.members=g.members||[]),v)throw v}}catch(c){console.log(c)}finally{_.value=!1,x.loading=!1}}))(),(c,f)=>(s(),u("div",t_,[t("div",e_,[t("span",null,"RAID - "+i(o.raid.name)+" "+i(e(n)("\u6062\u590D")),1)]),t("div",a_,[t("div",o_,[t("div",n_,i(e(n)("\u8BBE\u5907")),1),t("div",i_,[t("select",r_,[t("option",null,i(o.raid.name)+"_"+i(o.raid.venderModel)+" ("+i(o.raid.path)+"\uFF0C"+i(o.raid.level)+"\uFF0C"+i(o.raid.size)+") ",1)])])]),t("div",s_,[t("div",d_,i(e(n)("\u9009\u62E9\u786C\u76D8\uFF08\u9009\u62E9\u7A7A\u95F2\u7684\u786C\u76D8\u6062\u590DRAID\u8BBE\u5907\uFF09\uFF1A")),1),e(x).loading?(s(),u("div",u_,[t("span",l_,i(e(n)("\u68C0\u6D4B\u4E2D...")),1)])):(s(),u("div",c_,[e(x).members.length>0?(s(!0),u(N,{key:0},R(e(x).members,v=>(s(),u("label",null,[L(t("input",{type:"radio","onUpdate:modelValue":f[0]||(f[0]=g=>b.value=g),value:v.path},null,8,p_),[[lt,b.value]]),at(" \u3010"+i(v.model)+"\u3011"+i(v.name)+" "+i(v.path)+" ["+i(v.sizeStr)+"] ",1)]))),256)):(s(),u("span",m_,i(e(n)("\u68C0\u6D4B\u4E0D\u5230\u53EF\u7528\u78C1\u76D8\u9635\u5217\u6210\u5458")),1))]))])]),t("div",f_,[t("div",{class:"close",onClick:d,disabled:_.value},i(e(n)("\u53D6\u6D88")),9,v_),t("div",{class:"next",onClick:p,disabled:_.value},i(e(n)("\u4FDD\u5B58")),9,b_)])]))}});var __=S(g_,[["__scopeId","data-v-a924400c"]]);const h_={class:"action-main"},x_=I({props:{Close:{type:Function,required:!0},setup:{type:String,default:"create"},raid:{type:Object},success:{type:Function}},setup(o){return(a,n)=>(s(),V(ot,{type:2},{default:G(()=>[t("div",h_,[o.setup=="create"?(s(),V(pg,{key:0,Close:o.Close},null,8,["Close"])):o.setup=="info"&&o.raid!=null?(s(),V(_g,{key:1,Close:o.Close,raid:o.raid,success:o.success},null,8,["Close","raid","success"])):o.setup=="edit"&&o.raid!=null?(s(),V(Ig,{key:2,Close:o.Close,raid:o.raid,success:o.success},null,8,["Close","raid","success"])):o.setup=="remove"&&o.raid!=null?(s(),V(Qg,{key:3,Close:o.Close,raid:o.raid,success:o.success},null,8,["Close","raid","success"])):o.setup=="recover"&&o.raid!=null?(s(),V(__,{key:4,Close:o.Close,raid:o.raid,success:o.success},null,8,["Close","raid","success"])):D("",!0)])]),_:1}))}});var k_=S(x_,[["__scopeId","data-v-6ef94d02"]]);const It=o=>{const a=document.createElement("div");document.body.appendChild(a);const n=et(k_,nt(X({},o),{Close:()=>{l()}}));n.use(Ae),n.mount(a);const l=()=>{n.unmount(),a.remove()};return{Close:l}},Ne=o=>(W("data-v-e68d5bbe"),o=o(),Z(),o),w_={id:"page"},y_={name:"content"},F_={class:"cbi-map-descr"},E_={style:{color:"#f5365b","margin-top":"10px"}},C_={style:{color:"#f5365b","margin-top":"10px"}},$_={class:"btns"},D_=["disabled"],B_={class:"cbi-section cbi-tblsection",id:"cbi-nfs-mount"},Y_={class:"table cbi-section-table"},A_={style:{}},S_={class:"tr cbi-section-table-titles anonymous"},z_={class:"th cbi-section-table-cell","data-widget":"value"},P_={class:"th cbi-section-table-cell","data-widget":"value"},T_={class:"th cbi-section-table-cell","data-widget":"value"},L_={class:"th cbi-section-table-cell","data-widget":"value"},I_={class:"th cbi-section-table-cell","data-widget":"value"},M_={class:"th cbi-section-table-cell","data-widget":"value"},O_={class:"th cbi-section-table-cell","data-widget":"value"},N_={class:"th cbi-section-table-cell","data-widget":"value"},q_={class:"tr cbi-section-table-row"},V_={class:"td cbi-value-field"},G_={class:"td cbi-value-field"},j_=["title"],R_={class:"item-status"},U_={key:0,class:"item-status item-status-detail"},H_={class:"td cbi-value-field"},W_={class:"td cbi-value-field"},Z_={class:"td cbi-value-field"},J_=Ne(()=>t("br",null,null,-1)),X_={class:"td cbi-value-field"},K_=Ne(()=>t("br",null,null,-1)),Q_={key:1,href:"/cgi-bin/luci/admin/quickstart/"},th={class:"td cbi-section-table-cell nowrap cbi-section-actions"},eh=["title","disabled","onClick"],ah=["title","disabled","onClick"],oh=["title","onClick"],nh=["title","onClick"],ih=["title","onClick"],rh=I({setup(o){const{$gettext:a,$ngettext:n}=q(),l=dt({disksList:[]}),d=()=>M(this,null,function*(){try{const h=yield P.Raid.List.GET();if(h!=null&&h.data){const{success:w,error:y,result:F}=h.data;if(F&&(l.disksList=F.disks||[]),y)throw y}}catch(h){console.log(h)}}),r=gt.easyInterval(d,5e3);ae(()=>{r()});const p=h=>{switch(h.level){case"raid0":case"jbod":return!0}return h.status.indexOf("degraded")!=-1||h.status.indexOf("resyncing(")!=-1},x=h=>{let w=[];return h.childrens&&h.childrens.forEach(y=>{y.mountPoint&&w.push(`${y.name}(${y.mountPoint})`)}),w},_=()=>M(this,null,function*(){It({setup:"create",success:()=>{d()}})}),b=h=>{It({setup:"info",raid:h})},m=h=>M(this,null,function*(){if(h.childrens&&h.childrens.length>0&&h.childrens.filter(F=>F.mountPoint).length>0){Rt({content:a("\u5220\u9664 RAID \u8BBE\u5907\u4E4B\u524D\u8BF7\u5148\u5378\u8F7D\u6587\u4EF6\u7CFB\u7EDF"),nextTitle:a("\u53BB\u5378\u8F7D"),next:()=>{location.href="/cgi-bin/luci/admin/system/mounts"},clearTitle:a("\u53D6\u6D88"),clear:()=>{}});return}if(!confirm(a("\u786E\u5B9A\u8981\u5220\u9664 %{name} \u8BE5\u78C1\u76D8\u9635\u5217\u5417\uFF1F\u5220\u9664\u64CD\u4F5C\u53EF\u80FD\u4F1A\u5BFC\u81F4\u6570\u636E\u4E22\u5931\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C\u3002\u5220\u9664\u6210\u529F\u540E\uFF0C\u5982\u9700\u53E6\u5916\u7EC4RAID\uFF0C\u5EFA\u8BAE\u7A0D\u7B49\u51E0\u5206\u949F\u540E\u518D\u8BD5\u3002",{name:h.name}))||!confirm(a("\u786E\u5B9A\u8981\u5220\u9664 %{name} \u5417?",{name:h.name})))return;const w=C.Loading(a("\u5220\u9664\u4E2D..."));try{const y=yield P.Raid.Delete.POST({path:h.path,members:h.members});if(y.data){const{success:F,error:B}=y.data;if(B)throw B;(F||0)==0&&(C.Success(a("\u5220\u9664\u6210\u529F")),d())}}catch(y){C.Error(`${y}`)}finally{w.Close()}}),c=h=>{It({setup:"edit",raid:h,success:()=>{d()}})},f=h=>{It({setup:"remove",raid:h,success:()=>{d()}})},v=h=>{It({setup:"recover",raid:h,success:()=>{d()}})},g=E(!1),k=()=>{Rt({content:a("\u5C06\u626B\u63CF\u78C1\u76D8\u91CC RAID \u7684\u78C1\u76D8\u9635\u5217\u914D\u7F6E\u5E76\u6062\u590D\uFF0C\u786E\u5B9A\u8981\u6062\u590D RAID \u78C1\u76D8\u9635\u5217\u5417\uFF1F"),nextTitle:a("\u786E\u5B9A"),next:()=>M(this,null,function*(){g.value=!0;const h=C.Loading(a("\u626B\u63CF\u4E2D..."));try{const w=yield P.Raid.Autofix.GET();if(w.data){const{error:y,success:F}=w.data;if(y)throw y;(F||0)==0&&(C.Success(a("\u6062\u590D\u5B8C\u6210")),d())}}catch(w){C.Error(`${w}`)}finally{h.Close(),g.value=!1}}),clearTitle:a("\u53D6\u6D88"),clear:()=>{}})};return(h,w)=>(s(),u("div",w_,[t("h2",y_,i(e(a)("RAID\u7BA1\u7406")),1),t("div",F_,[t("p",null,i(e(a)("RAID \uFF08 Redundant Array of Independent Disks \uFF09\u5373\u72EC\u7ACB\u78C1\u76D8\u5197\u4F59\u9635\u5217\uFF0C\u7B80\u79F0\u4E3A\u300C\u78C1\u76D8\u9635\u5217\u300D\uFF0C\u5C31\u662F\u7528\u591A\u4E2A\u72EC\u7ACB\u7684\u78C1\u76D8\u7EC4\u6210\u5728\u4E00\u8D77\u5F62\u6210\u4E00\u4E2A\u5927\u7684\u78C1\u76D8\u7CFB\u7EDF\uFF0C\u4ECE\u800C\u5B9E\u73B0\u6BD4\u5355\u5757\u78C1\u76D8\u66F4\u597D\u7684\u5B58\u50A8\u6027\u80FD\u548C\u66F4\u9AD8\u7684\u53EF\u9760\u6027\u3002")),1),t("p",E_," * "+i(e(a)("RAID\u529F\u80FD\u6B63\u5728\u516C\u6D4B\u4E2D\uFF0C\u4F7F\u7528\u8FC7\u7A0B\u4E2D\u5982\u9020\u6210\u6570\u636E\u4E22\u5931\u7B49\u95EE\u9898\uFF0C\u6982\u4E0D\u8D1F\u8D23\uFF0C\u8BF7\u8C28\u614E\u4F7F\u7528\u3002")),1),t("p",C_," * "+i(e(a)("\u5982\u679C\u7531\u4E8E\u7CFB\u7EDF\u91CD\u7F6E\u6216\u91CD\u542F\u5BFC\u81F4\u7684RAID\u8BBE\u5907\u4E22\u5931\u53EF\u4EE5\u5C1D\u8BD5\u901A\u8FC7\u4E0B\u65B9'\u626B\u63CF\u6062\u590DRAID'\u6309\u94AE\u6062\u590D")),1)]),t("div",$_,[t("button",{class:"btn cbi-button cbi-button-apply",onClick:w[0]||(w[0]=y=>_())},i(e(a)("\u521B\u5EFARAID")),1),t("button",{class:"btn cbi-button cbi-button-apply",onClick:w[1]||(w[1]=y=>k()),disabled:g.value},i(e(a)("\u626B\u63CF\u6062\u590DRAID")),9,D_)]),t("div",null,[t("div",B_,[t("table",Y_,[t("tbody",A_,[t("tr",S_,[t("th",z_,i(e(a)("\u540D\u79F0")),1),t("th",P_,i(e(a)("\u8BBE\u5907")),1),t("th",T_,i(e(a)("\u72B6\u6001")),1),t("th",L_,i(e(a)("\u7EA7\u522B")),1),t("th",I_,i(e(a)("\u5BB9\u91CF")),1),t("th",M_,i(e(a)("\u6210\u5458")),1),t("th",O_,i(e(a)("\u6302\u8F7D\u4FE1\u606F")),1),t("th",N_,i(e(a)("\u64CD\u4F5C")),1)]),(s(!0),u(N,null,R(e(l).disksList,y=>(s(),u("tr",q_,[t("td",V_,[t("b",null,i(y.name),1)]),t("td",G_,[t("b",null,i(y.path),1)]),t("td",{class:"td cbi-value-field",title:y.status+(y.rebuildStatus||"")},[t("b",R_,i(y.status),1),y.rebuildStatus?(s(),u("b",U_," \u2026 ")):D("",!0)],8,j_),t("td",H_,[t("b",null,i(y.level),1)]),t("td",W_,[t("b",null,i(y.size),1)]),t("td",Z_,[(s(!0),u(N,null,R(y.members,F=>(s(),u("b",null,[at(i(F)+" ",1),J_]))),256))]),t("td",X_,[x(y).length>0?(s(!0),u(N,{key:0},R(x(y),F=>(s(),u("b",null,[at(i(F)+" ",1),K_]))),256)):(s(),u("a",Q_,i(e(a)("\u53BB\u6302\u8F7D")),1))]),t("td",th,[t("button",{class:"btn cbi-button cbi-button-apply",title:e(a)("\u6269\u5145"),disabled:p(y),onClick:F=>c(y)},i(e(a)("\u6269\u5145")),9,eh),t("button",{class:"btn cbi-button cbi-button-apply",title:e(a)("\u79FB\u9664"),disabled:p(y),onClick:F=>f(y)},i(e(a)("\u79FB\u9664")),9,ah),t("button",{class:"btn cbi-button cbi-button-apply",title:e(a)("\u6062\u590D"),onClick:F=>v(y)},i(e(a)("\u6062\u590D")),9,oh),t("button",{class:"btn cbi-button cbi-button-apply",title:e(a)("\u8BE6\u60C5"),onClick:F=>b(y)},i(e(a)("\u8BE6\u60C5")),9,nh),t("button",{class:"cbi-button cbi-button-remove",title:e(a)("\u5982\u679C\u60A8\u5728RAID\u78C1\u76D8\u9635\u5217\u4E2D\u521B\u5EFA\u4E86\u6587\u4EF6\u7CFB\u7EDF\uFF0C\u5148\u5378\u8F7D\u6587\u4EF6\u7CFB\u7EDF\uFF0C\u540E\u5220\u9664\u6587\u4EF6\u7CFB\u7EDF\u5220\u9664\u64CD\u4F5C\u53EF\u80FD\u4F1A\u5BFC\u81F4\u6570\u636E\u4E22\u5931\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C\u3002"),onClick:F=>m(y)},i(e(a)("\u5220\u9664")),9,ih)])]))),256))])])])])]))}});var sh=S(rh,[["__scopeId","data-v-e68d5bbe"]]);const dh=o=>(W("data-v-16dd0913"),o=o(),Z(),o),uh={id:"page"},lh=dh(()=>t("h2",{name:"content"},"S.M.A.R.T.",-1)),ch={class:"cbi-map-descr"},ph={class:"tabs"},mh=["href","onClick"],fh=I({setup(o){const{$gettext:a,$ngettext:n}=q(),l=[{to:"/smart",name:a("\u5E38\u89C4\u8BBE\u7F6E")},{to:"/smart/task",name:a("\u8BA1\u5212\u4EFB\u52A1")},{to:"/smart/log",name:a("\u67E5\u770B\u65E5\u5FD7")}],d=E(!1),r=dt({global:{enable:!1,powermode:"never",tmpDiff:0,tmpMax:0},devices:[],tasks:[]}),p=b=>{const{global:m,devices:c,tasks:f}=b;m&&(r.global.enable=m.enable||!1,r.global.powermode=m.powermode||"never"),r.devices=c||[],r.tasks=f||[]};(()=>M(this,null,function*(){try{const b=yield P.Smart.Config.GET();if(b.data){const{result:m}=b.data;m&&p(m)}}catch(b){}finally{d.value=!0}}))();const _=b=>M(this,null,function*(){const m=C.Loading(a("\u4FDD\u5B58\u4E2D..."));try{const c=yield P.Smart.Config.POST(b);if(c.data){console.log(c.data);const{success:f,error:v,result:g}=c.data;if(v)throw v;(f||0)==0&&(C.Success(a("\u4FDD\u5B58\u6210\u529F")),g&&p(g))}}catch(c){C.Error(`${c}`)}finally{m.Close()}});return(b,m)=>{const c=K("router-link"),f=K("router-view");return s(),u("div",uh,[lh,t("div",ch,[t("p",null,i(e(a)("S.M.A.R.T.\uFF0C\u5168\u79F0\u4E3A\u201CSelf-Monitoring Analysis and Reporting Technology\u201D\uFF0C\u5373\u201C\u81EA\u6211\u76D1\u6D4B\u3001\u5206\u6790\u53CA\u62A5\u544A\u6280\u672F\u201D\uFF0C")),1),t("p",null,i(e(a)("\u662F\u4E00\u79CD\u81EA\u52A8\u7684\u786C\u76D8\u72B6\u6001\u68C0\u6D4B\u4E0E\u9884\u8B66\u7CFB\u7EDF\u548C\u89C4\u8303\u3002\u901A\u8FC7\u5728\u786C\u76D8\u786C\u4EF6\u5185\u7684\u68C0\u6D4B\u6307\u4EE4\u5BF9\u786C\u76D8\u7684\u786C\u4EF6\u5982\u78C1\u5934\u3001\u76D8\u7247\u3001\u9A6C\u8FBE\u3001")),1),t("p",null,i(e(a)("\u7535\u8DEF\u7684\u8FD0\u884C\u60C5\u51B5\u8FDB\u884C\u76D1\u63A7\u3001\u8BB0\u5F55\u5E76\u4E0E\u5382\u5546\u6240\u8BBE\u5B9A\u7684\u9884\u8BBE\u5B89\u5168\u503C\u8FDB\u884C\u6BD4\u8F83\uFF0C\u82E5\u76D1\u63A7\u60C5\u51B5\u5C06\u8981\u6216\u5DF2\u8D85\u51FA\u9884\u8BBE\u5B89\u5168\u503C\u7684\u5B89\u5168\u8303\u56F4\uFF0C")),1),t("p",null,i(e(a)("\u5C31\u53EF\u4EE5\u901A\u8FC7\u4E3B\u673A\u7684\u76D1\u63A7\u786C\u4EF6\u6216\u8F6F\u4EF6\u81EA\u52A8\u5411\u7528\u6237\u4F5C\u51FA\u8B66\u544A\u5E76\u8FDB\u884C\u8F7B\u5FAE\u7684\u81EA\u52A8\u4FEE\u590D\uFF0C\u4EE5\u63D0\u524D\u4FDD\u969C\u786C\u76D8\u6570\u636E\u7684\u5B89\u5168\u3002")),1)]),t("ul",ph,[(s(),u(N,null,R(l,v=>A(c,{to:v.to,custom:"",key:v.to},{default:G(({route:g,href:k,navigate:h,isActive:w,isExactActive:y})=>[t("li",{class:rt({"active cbi-tab":w&&y})},[t("a",{href:k,onClick:h},i(v.name),9,mh)],2)]),_:2},1032,["to"])),64))]),d.value?(s(),V(f,{key:0,name:"default"},{default:G(({Component:v,route:g})=>[(s(),V(sa,null,{default:G(()=>[(s(),V(da(v),{key:g.path,config:e(r),saveData:_},null,8,["config"]))]),_:2},1024))]),_:1})):D("",!0)])}}});var vh=S(fh,[["__scopeId","data-v-16dd0913"]]);const bh={class:"action-main"},gh=I({setup(o){return(a,n)=>(s(),V(ot,{type:2},{default:G(()=>[t("div",bh,[wt(a.$slots,"default",{},void 0,!0)])]),_:3}))}});var Kt=S(gh,[["__scopeId","data-v-742230ae"]]);const _h={class:"actioner-container"},hh={class:"actioner-container_header"},xh={class:"actioner-container_body"},kh={class:"cbi-value"},wh={class:"cbi-value-title"},yh={class:"cbi-value-field"},Fh={class:"cbi-value-description"},Eh={class:"cbi-value"},Ch={class:"cbi-value-title"},$h={class:"cbi-value-field"},Dh={class:"cbi-checkbox"},Bh={value:-1},Yh={value:0},Ah=["value"],Sh={class:"cbi-value-description"},zh={class:"cbi-value"},Ph={class:"cbi-value-title"},Th={class:"cbi-value-field"},Lh={class:"cbi-checkbox"},Ih={value:-1},Mh={value:0},Oh=["value"],Nh={class:"cbi-value-description"},qh={class:"actioner-container_footer"},Vh=["disabled"],Gh=["disabled"],jh=I({props:{close:{type:Function,required:!0},disk:{type:Object,required:!0},device:{type:Object},next:{type:Function,required:!0}},setup(o){var _,b,m;const a=o,{$gettext:n,$ngettext:l}=q();console.log(a.device);const d=E(!1),r=dt({tmpDiff:((_=a.device)==null?void 0:_.tmpDiff)||0,tmpMax:((b=a.device)==null?void 0:b.tmpMax)||0,devicePath:((m=a.device)==null?void 0:m.devicePath)||""}),p=()=>{d.value=!0,a.close()},x=()=>M(this,null,function*(){d.value=!0;try{yield a.next({tmpDiff:r.tmpDiff,tmpMax:r.tmpMax,devicePath:r.devicePath}),d.value=!1,p()}catch(c){}});return(c,f)=>(s(),V(Kt,null,{default:G(()=>[t("div",_h,[t("div",hh,[t("span",null," S.M.A.R.T. \xBB "+i(e(n)("\u8BBE\u5907"))+" \xBB "+i(o.disk.path),1)]),t("div",xh,[t("div",kh,[t("label",wh,i(e(n)("\u78C1\u76D8")),1),t("div",yh,[t("div",Fh,i(o.disk.model)+" [ "+i(o.disk.path)+"\uFF0C"+i(o.disk.sizeStr)+" ] ",1)])]),t("div",Eh,[t("label",Ch,i(e(n)("\u6E29\u5EA6\u76D1\u6D4B\uFF08\u5DEE\u5F02\uFF09")),1),t("div",$h,[t("div",Dh,[L(t("select",{class:"cbi-input-select","onUpdate:modelValue":f[0]||(f[0]=v=>e(r).tmpDiff=v)},[t("option",Bh,i(e(n)("\u4F7F\u7528\u5168\u5C40\u914D\u7F6E")),1),t("option",Yh,i(e(n)("\u7981\u7528")),1),(s(),u(N,null,R(20,v=>t("option",{value:v},i(v)+"\xB0C",9,Ah)),64))],512),[[tt,e(r).tmpDiff,void 0,{number:!0}]])]),t("div",Sh,i(e(n)("\u81EA\u4E0A\u6B21\u62A5\u544A\u4EE5\u6765\u6E29\u5EA6\u53D8\u5316\u81F3\u5C11 N \u5EA6\uFF0C\u5219\u9700\u62A5\u544A.")),1)])]),t("div",zh,[t("label",Ph,i(e(n)("\u6E29\u5EA6\u76D1\u6D4B\uFF08\u6700\u5927\uFF09")),1),t("div",Th,[t("div",Lh,[L(t("select",{class:"cbi-input-select","onUpdate:modelValue":f[1]||(f[1]=v=>e(r).tmpMax=v)},[t("option",Ih,i(e(n)("\u4F7F\u7528\u5168\u5C40\u914D\u7F6E")),1),t("option",Mh,i(e(n)("\u7981\u7528")),1),(s(),u(N,null,R(20,v=>t("option",{value:v*5},i(v*5)+"\xB0C",9,Oh)),64))],512),[[tt,e(r).tmpMax,void 0,{number:!0}]])]),t("div",Nh,i(e(n)("\u5982\u679C\u6E29\u5EA6\u5927\u4E8E\u6216\u7B49\u4E8E N \u6444\u6C0F\u5EA6\u5219\u62A5\u544A.")),1)])])]),t("div",qh,[t("button",{class:"close",onClick:p,disabled:d.value},i(e(n)("\u53D6\u6D88")),9,Vh),t("button",{class:"next",onClick:x,disabled:d.value},i(e(n)("\u4FDD\u5B58")),9,Gh)])])]),_:1}))}}),Rh={class:"actioner-container"},Uh={class:"actioner-container_header"},Hh={class:"actioner-container_body"},Wh={class:"cbi-value"},Zh={class:"cbi-value-title"},Jh={class:"cbi-value-field"},Xh={class:"cbi-checkbox"},Kh={value:""},Qh=["value"],tx={class:"cbi-value"},ex={class:"cbi-value-title"},ax={class:"cbi-value-field"},ox={class:"cbi-checkbox"},nx={value:"short"},ix={value:"long"},rx={value:"conveyance"},sx={value:"offline"},dx={class:"cbi-value"},ux={class:"cbi-value-title"},lx={class:"cbi-value-field"},cx={class:"cbi-checkbox"},px=t("option",{value:"*"},"*",-1),mx=["value"],fx={class:"cbi-value-description"},vx={class:"cbi-value"},bx={class:"cbi-value-title"},gx={class:"cbi-value-field"},_x={class:"cbi-checkbox"},hx=t("option",{value:"*"},"*",-1),xx=["value"],kx={class:"cbi-value-description"},wx={class:"cbi-value"},yx={class:"cbi-value-title"},Fx={class:"cbi-value-field"},Ex={class:"cbi-checkbox"},Cx=t("option",{value:"*"},"*",-1),$x=["value"],Dx={class:"cbi-value-description"},Bx={class:"actioner-container_footer"},Yx=["disabled"],Ax=["disabled"],Sx=I({props:{close:{type:Function,required:!0},config:{type:Object,required:!0},next:{type:Function,required:!0}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(!1),r=dt({type:"short",devicePath:"",month:"*",dayPerMonth:"*",hour:"*"}),p=E([]);(()=>M(this,null,function*(){try{const m=yield P.Smart.List.GET();if(m.data){const{result:c,error:f}=m.data;c&&c.disks&&(p.value=c.disks)}}catch(m){}}))();const _=()=>{d.value=!0,a.close()},b=()=>M(this,null,function*(){if(r.devicePath==""){C.Warning(n("\u8BF7\u9009\u62E9\u78C1\u76D8"));return}d.value=!0;try{yield a.next(r),_()}catch(m){}finally{d.value=!1}});return(m,c)=>(s(),V(Kt,null,{default:G(()=>[t("div",Rh,[t("div",Uh,[t("span",null,i(e(n)("\u521B\u5EFA\u8BA1\u5212\u4EFB\u52A1")),1)]),t("div",Hh,[t("div",Wh,[t("label",Zh,i(e(n)("\u78C1\u76D8")),1),t("div",Jh,[t("div",Xh,[L(t("select",{class:"cbi-input-select","onUpdate:modelValue":c[0]||(c[0]=f=>e(r).devicePath=f)},[t("option",Kh,i(e(n)("\u9009\u62E9\u78C1\u76D8")),1),(s(!0),u(N,null,R(p.value,f=>(s(),u("option",{value:f.path},i(f.model)+" [ "+i(f.path)+"\uFF0C"+i(f.sizeStr)+" ] ",9,Qh))),256))],512),[[tt,e(r).devicePath,void 0,{trim:!0}]])])])]),t("div",tx,[t("label",ex,i(e(n)("\u7C7B\u578B")),1),t("div",ax,[t("div",ox,[L(t("select",{class:"cbi-input-select","onUpdate:modelValue":c[1]||(c[1]=f=>e(r).type=f)},[t("option",nx,i(e(n)("\u77ED\u6682\u81EA\u68C0")),1),t("option",ix,i(e(n)("\u957F\u65F6\u81EA\u68C0")),1),t("option",rx,i(e(n)("\u4F20\u8F93\u65F6\u81EA\u68C0")),1),t("option",sx,i(e(n)("\u79BB\u7EBF\u65F6\u81EA\u68C0")),1)],512),[[tt,e(r).type,void 0,{trim:!0}]])])])]),t("div",dx,[t("label",ux,i(e(n)("\u5C0F\u65F6")),1),t("div",lx,[t("div",cx,[L(t("select",{class:"cbi-input-select","onUpdate:modelValue":c[2]||(c[2]=f=>e(r).hour=f)},[px,(s(),u(N,null,R(24,(f,v)=>t("option",{value:`${v}`},i(v),9,mx)),64))],512),[[tt,e(r).hour,void 0,{trim:!0}]])]),t("div",fx,i(e(n)("* \u8868\u793A\u6BCF\u5C0F\u65F6")),1)])]),t("div",vx,[t("label",bx,i(e(n)("\u5929")),1),t("div",gx,[t("div",_x,[L(t("select",{class:"cbi-input-select","onUpdate:modelValue":c[3]||(c[3]=f=>e(r).dayPerMonth=f)},[hx,(s(),u(N,null,R(31,f=>t("option",{value:`${f}`},i(f),9,xx)),64))],512),[[tt,e(r).dayPerMonth,void 0,{trim:!0}]])]),t("div",kx,i(e(n)("* \u8868\u793A\u6BCF\u5929")),1)])]),t("div",wx,[t("label",yx,i(e(n)("\u6708")),1),t("div",Fx,[t("div",Ex,[L(t("select",{class:"cbi-input-select","onUpdate:modelValue":c[4]||(c[4]=f=>e(r).month=f)},[Cx,(s(),u(N,null,R(12,(f,v)=>t("option",{value:`${f}`},i(f),9,$x)),64))],512),[[tt,e(r).month,void 0,{trim:!0}]])]),t("div",Dx,i(e(n)("* \u8868\u793A\u6BCF\u6708")),1)])])]),t("div",Bx,[t("button",{class:"close",onClick:_,disabled:d.value},i(e(n)("\u53D6\u6D88")),9,Yx),t("button",{class:"next",onClick:b,disabled:d.value},i(e(n)("\u4FDD\u5B58")),9,Ax)])])]),_:1}))}}),zx={class:"actioner-container"},Px={class:"actioner-container_header"},Tx={class:"actioner-container_body"},Lx=["value"],Ix={class:"actioner-container_footer"},Mx=["disabled"],Ox=["disabled"],Nx=I({props:{close:{type:Function,required:!0},task:{type:Object,required:!0}},setup(o){const a=o,{$gettext:n,$ngettext:l}=q(),d=E(!1),r=E(""),p=E(""),x=E(""),_=()=>M(this,null,function*(){r.value+=".";try{const f=yield P.Smart.Test.Result.POST({type:"selftest",devicePath:a.task.devicePath||""});if(f.data){const{result:v,error:g}=f.data;v&&v.result&&(x.value=v.result),g&&(x.value=g)}}catch(f){f&&(x.value=f)}}),b=gt.easyInterval(_,5e3);ae(()=>{b()});const m=()=>{d.value=!0,b(),a.close()},c=()=>M(this,null,function*(){d.value=!0;try{const f=yield P.Smart.Test.POST({type:a.task.type||"short",devicePath:a.task.devicePath||""});if(f.data){const{success:v,error:g,result:k}=f.data;g&&(p.value=g),k&&k.result&&(p.value=k.result)}}catch(f){p.value=f}finally{}});return(f,v)=>(s(),V(Kt,null,{default:G(()=>[t("div",zx,[t("div",Px,[t("span",null,i(e(n)("\u8FD0\u884C\u8C03\u8BD5")),1)]),t("div",Tx,[t("textarea",{value:p.value+`
                                ` + x.value + ` + r.value,
                                disabled: ""
                            },
                            null,
                            8,
                            Lx)]), t("div", Ix, [t("div", {
                                class: "close",
                                onClick: m,
                                disabled: d.value
                            },
                            i(e(n)("\u5173\u95ED")), 9, Mx), d.value ? D("", !0) : (s(), u("div", {
                                key: 0,
                                class: "next",
                                onClick: c,
                                disabled: d.value
                            },
                            i(e(n)("\u8FD0\u884C")), 9, Ox))])])]), _: 1
                        }))
                    }
                });
                var qx = S(Nx, [["__scopeId", "data-v-70c3aae0"]]);const Vx = {
                    class: "actioner-container"
                },
                Gx = {
                    class: "actioner-container_header"
                },
                jx = {
                    class: "tabs"
                },
                Rx = {
                    class: "actioner-container_body"
                },
                Ux = {
                    key: 0,
                    class: "table"
                },
                Hx = {
                    class: "tr"
                },
                Wx = {
                    class: "td left"
                },
                Zx = {
                    class: "td left"
                },
                Jx = {
                    class: "tr"
                },
                Xx = {
                    class: "td left"
                },
                Kx = {
                    class: "td left"
                },
                Qx = {
                    class: "tr"
                },
                tk = {
                    class: "td left"
                },
                ek = {
                    class: "td left"
                },
                ak = ["value"], ok = ["value"], nk = ["value"], ik = {
                    class: "actioner-container_footer"
                },
                rk = ["disabled"], sk = I({
                    props: {
                        close: {
                            type: Function,
                            required: !0
                        },
                        disk: {
                            type: Object,
                            required: !0
                        }
                    },
                    setup(o) {
                        const a = o,
                        {
                            $gettext: n,
                            $ngettext: l
                        } = q(),
                        d = E(!1),
                        r = E("info"),
                        p = f => {
                            switch (r.value = f, f) {
                            case "info":
                                break;
                            case "attribute":
                                m();
                                break;
                            case "log":
                                b();
                                break;
                            case "extend":
                                c();
                                break
                            }
                        },
                        x = () => {
                            d.value = !0,
                            a.close()
                        },
                        _ = dt({
                            log: "",
                            attribute: "",
                            extend: ""
                        }),
                        b = () => M(this, null, function * () {
                            try {
                                const f = yield P.Smart.Test.Result.POST({
                                    type: "selftest",
                                    devicePath: a.disk.path || ""
                                });
                                if (f.data) {
                                    const {
                                        result: v,
                                        error: g
                                    } = f.data;
                                    v && v.result && (_.log = v.result),
                                    g && (_.log = g)
                                }
                            } catch(f) {
                                _.log = f
                            }
                        }),
                        m = () => M(this, null, function * () {
                            try {
                                const f = yield P.Smart.Attribute.Result.POST({
                                    devicePath: a.disk.path || ""
                                });
                                if (f.data) {
                                    const {
                                        result: v,
                                        error: g
                                    } = f.data;
                                    v && v.result && (_.attribute = v.result),
                                    g && (_.attribute = g)
                                }
                            } catch(f) {
                                _.attribute = f
                            }
                        }),
                        c = () => M(this, null, function * () {
                            try {
                                const f = yield P.Smart.Extend.Result.POST({
                                    devicePath: a.disk.path || ""
                                });
                                if (f.data) {
                                    const {
                                        result: v,
                                        error: g
                                    } = f.data;
                                    v && v.result && (_.extend = v.result),
                                    g && (_.extend = g)
                                }
                            } catch(f) {
                                _.extend = f
                            }
                        });
                        return (f, v) => (s(), V(Kt, null, {
                        default:
                            G(() => [t("div", Vx, [t("div", Gx, [t("ul", jx, [t("li", {
                                class: rt({
                                    "active cbi-tab": r.value == "info"
                                }),
                                onClick: v[0] || (v[0] = g => p("info"))
                            },
                            [t("a", null, i(e(n)("\u8BBE\u5907\u4FE1\u606F")), 1)], 2), t("li", {
                                class: rt({
                                    "active cbi-tab": r.value == "attribute"
                                }),
                                onClick: v[1] || (v[1] = g => p("attribute"))
                            },
                            [t("a", null, i(e(n)("\u5C5E\u6027")), 1)], 2), t("li", {
                                class: rt({
                                    "active cbi-tab": r.value == "log"
                                }),
                                onClick: v[2] || (v[2] = g => p("log"))
                            },
                            [t("a", null, i(e(n)("\u81EA\u68C0\u65E5\u5FD7")), 1)], 2), t("li", {
                                class: rt({
                                    "active cbi-tab": r.value == "extend"
                                }),
                                onClick: v[3] || (v[3] = g => p("extend"))
                            },
                            [t("a", null, i(e(n)("\u6269\u5C55\u4FE1\u606F")), 1)], 2)])]), t("div", Rx, [r.value == "info" ? (s(), u("table", Ux, [t("tr", Hx, [t("td", Wx, i(e(n)("\u8BBE\u5907")), 1), t("td", Zx, i(o.disk.path), 1)]), t("tr", Jx, [t("td", Xx, i(e(n)("\u578B\u53F7")), 1), t("td", Kx, i(o.disk.model), 1)]), t("tr", Qx, [t("td", tk, i(e(n)("\u5E8F\u53F7")), 1), t("td", ek, i(o.disk.serial), 1)])])) : r.value == "attribute" ? (s(), u("textarea", {
                                key: 1,
                                disabled: "",
                                value: e(_).attribute
                            },
                            null, 8, ak)) : r.value == "log" ? (s(), u("textarea", {
                                key: 2,
                                disabled: "",
                                value: e(_).log
                            },
                            null, 8, ok)) : r.value == "extend" ? (s(), u("textarea", {
                                key: 3,
                                disabled: "",
                                value: e(_).extend
                            },
                            null, 8, nk)) : D("", !0)]), t("div", ik, [t("div", {
                                class: "close",
                                onClick: x,
                                disabled: d.value
                            },
                            i(e(n)("\u5173\u95ED")), 9, rk)])])]),
                            _: 1
                        }))
                    }
                });
                var dk = S(sk, [["__scopeId", "data-v-313197ee"]]);const uk = o => {
                    const a = document.createElement("div");
                    document.body.appendChild(a);
                    const n = A(jh, nt(X({},
                    o), {
                        close: () => {
                            l()
                        }
                    })),
                    l = () => {
                        a.remove()
                    };
                    Ut(n, a)
                },
                lk = o => {
                    const a = document.createElement("div");
                    document.body.appendChild(a);
                    const n = A(Sx, nt(X({},
                    o), {
                        close: () => {
                            l()
                        }
                    })),
                    l = () => {
                        a.remove()
                    };
                    Ut(n, a)
                },
                ck = o => {
                    const a = document.createElement("div");
                    document.body.appendChild(a);
                    const n = A(qx, nt(X({},
                    o), {
                        close: () => {
                            l()
                        }
                    })),
                    l = () => {
                        a.remove()
                    };
                    Ut(n, a)
                },
                pk = o => {
                    const a = document.createElement("div");
                    document.body.appendChild(a);
                    const n = A(dk, nt(X({},
                    o), {
                        close: () => {
                            l()
                        }
                    })),
                    l = () => {
                        a.remove()
                    };
                    Ut(n, a)
                },
                mk = {
                    class: "cbi-section"
                },
                fk = {
                    class: "cbi-value"
                },
                vk = {
                    class: "cbi-value-title"
                },
                bk = {
                    class: "cbi-value-field"
                },
                gk = {
                    class: "cbi-checkbox"
                },
                _k = ["value"], hk = {
                    class: "cbi-value"
                },
                xk = {
                    class: "cbi-value-title"
                },
                kk = {
                    class: "cbi-value-field"
                },
                wk = {
                    class: "cbi-checkbox"
                },
                yk = {
                    value: "never"
                },
                Fk = {
                    value: "sleep"
                },
                Ek = {
                    value: "standby"
                },
                Ck = {
                    value: "idle"
                },
                $k = {
                    class: "cbi-value-description"
                },
                Dk = t("br", null, null, -1), Bk = t("br", null, null, -1), Yk = t("br", null, null, -1), Ak = t("br", null, null, -1), Sk = {
                    class: "cbi-value"
                },
                zk = {
                    class: "cbi-value-title"
                },
                Pk = {
                    class: "cbi-value-field"
                },
                Tk = {
                    class: "cbi-checkbox"
                },
                Lk = {
                    value: 0
                },
                Ik = ["value"], Mk = {
                    class: "cbi-value-description"
                },
                Ok = {
                    class: "cbi-value"
                },
                Nk = {
                    class: "cbi-value-title"
                },
                qk = {
                    class: "cbi-value-field"
                },
                Vk = {
                    class: "cbi-checkbox"
                },
                Gk = {
                    value: 0
                },
                jk = ["value"], Rk = {
                    class: "cbi-value-description"
                },
                Uk = {
                    class: "cbi-section cbi-tblsection",
                    id: "cbi-nfs-mount"
                },
                Hk = {
                    class: "table cbi-section-table"
                },
                Wk = {
                    class: "tr cbi-section-table-titles anonymous"
                },
                Zk = {
                    class: "th cbi-section-table-cell",
                    "data-widget": "value"
                },
                Jk = {
                    class: "th cbi-section-table-cell",
                    "data-widget": "value"
                },
                Xk = {
                    class: "th cbi-section-table-cell",
                    "data-widget": "value"
                },
                Kk = {
                    class: "th cbi-section-table-cell",
                    "data-widget": "value"
                },
                Qk = {
                    class: "th cbi-section-table-cell",
                    "data-widget": "value"
                },
                tw = {
                    class: "th cbi-section-table-cell",
                    "data-widget": "value"
                },
                ew = {
                    class: "th cbi-section-table-cell",
                    "data-widget": "value"
                },
                aw = {
                    class: "th cbi-section-table-cell",
                    "data-widget": "value"
                },
                ow = {
                    class: "tr cbi-section-table-row"
                },
                nw = {
                    class: "td cbi-value-field"
                },
                iw = {
                    class: "td cbi-value-field"
                },
                rw = {
                    class: "td cbi-value-field"
                },
                sw = {
                    class: "td cbi-value-field"
                },
                dw = {
                    class: "td cbi-value-field"
                },
                uw = {
                    class: "td cbi-value-field"
                },
                lw = {
                    class: "td cbi-value-field"
                },
                cw = {
                    class: "td cbi-value-field"
                },
                pw = ["title", "onClick"], mw = ["title", "onClick"], fw = {
                    class: "cbi-page-actions control-group"
                },
                vw = ["value"], bw = I({
                    props: {
                        config: {
                            type: Object,
                            required: !0
                        },
                        saveData: {
                            type: Function,
                            required: !0
                        }
                    },
                    setup(o) {
                        const a = o,
                        {
                            $gettext: n,
                            $ngettext: l
                        } = q(),
                        d = dt(a.config),
                        r = () => {
                            d.global.tmpDiff = a.config.global.tmpDiff || 0,
                            d.global.tmpMax = a.config.global.tmpMax || 0,
                            d.global.enable = a.config.global.enable || !1,
                            d.global.powermode = a.config.global.powermode || "never",
                            d.devices = a.config.devices || [],
                            d.tasks = a.config.tasks || []
                        },
                        p = E([]),
                        x = () => M(this, null, function * () {
                            try {
                                const f = yield P.Smart.List.GET();
                                if (f.data) {
                                    const {
                                        result: v,
                                        error: g
                                    } = f.data;
                                    v && v.disks && (p.value = v.disks || [])
                                }
                            } catch(f) {}
                        }),
                        _ = gt.easyInterval(x, 5e3);
                        ae(() => {
                            _()
                        });
                        const b = () => M(this, null, function * () {
                            yield a.saveData({
                                global: d.global,
                                devices: a.config.devices,
                                tasks: a.config.tasks
                            }),
                            r()
                        }),
                        m = f => {
                            pk({
                                disk: f
                            })
                        },
                        c = (f, v) => M(this, null, function * () {
                            let g = null,
                            k = -1;
                            if (d.devices) {
                                for (let h = 0; h < d.devices.length; h++) if (d.devices[h].devicePath == f.path) {
                                    g = d.devices[h],
                                    k = h;
                                    break
                                }
                            }
                            uk({
                                disk: f,
                                device: g,
                                next: h => M(this, null, function * () {
                                    h.tmpDiff == -1 && (h.tmpDiff = d.global.tmpDiff),
                                    h.tmpMax == -1 && (h.tmpMax = d.global.tmpMax),
                                    h.devicePath == "" && (h.devicePath = f.path);
                                    let w = [.d.devices];
                                    k >= 0 && (w[k] = h);
                                    const y = new Map;
                                    w.forEach(F => {
                                        F.devicePath != null && y.set(F.devicePath, null)
                                    });
                                    for (let F = 0; F < p.value.length; F++) {
                                        const B = p.value[F];
                                        B.path != null && !y.has(B.path) && w.push({
                                            devicePath: B.path,
                                            tmpDiff: d.global.tmpDiff,
                                            tmpMax: d.global.tmpMax
                                        })
                                    }
                                    yield a.saveData({
                                        tasks: a.config.tasks,
                                        global: a.config.global,
                                        devices: w
                                    }),
                                    r()
                                })
                            })
                        });
                        return (f, v) => (s(), u(N, null, [t("fieldset", mk, [t("div", fk, [t("label", vk, i(e(n)("\u542F\u7528")), 1), t("div", bk, [t("div", gk, [L(t("input", {
                            type: "checkbox",
                            "onUpdate:modelValue": v[0] || (v[0] = g => e(d).global.enable = g),
                            value: !e(d).global.enable
                        },
                        null, 8, _k), [[Ct, e(d).global.enable]])])])]), t("div", hk, [t("label", xk, i(e(n)("\u7535\u6E90\u6A21\u5F0F")), 1), t("div", kk, [t("div", wk, [L(t("select", {
                            class: "cbi-input-select",
                            "onUpdate:modelValue": v[1] || (v[1] = g => e(d).global.powermode = g)
                        },
                        [t("option", yk, i(e(n)("\u603B\u662F")), 1), t("option", Fk, i(e(n)("\u7761\u7720")), 1), t("option", Ek, i(e(n)("\u5F85\u673A")), 1), t("option", Ck, i(e(n)("\u95F2\u7F6E")), 1)], 512), [[tt, e(d).global.powermode, void 0, {
                            trim: !0
                        }]])]), t("div", $k, [t("span", null, i(e(n)("\u6D4B\u8BD5\u65F6\u78C1\u76D8\u4F1A\u8F6C\u52A8\uFF0C\u8BF7\u9009\u62E9\u5408\u9002\u7684\u6A21\u5F0F\u6765\u63A7\u5236\u78C1\u76D8\u8F6C\u52A8\u3002")), 1), Dk, t("span", null, "* " + i(e(n)("\u603B\u662F-\u65E0\u8BBA\u662F\u4EC0\u4E48\u529F\u8017\u6A21\u5F0F\u4E0B\u90FD\u6D4B\u8BD5(\u68C0\u67E5)\u78C1\u76D8\uFF0C\u5F53\u68C0\u67E5\u65F6\uFF0C\u8FD9\u53EF\u80FD\u4F1A\u4F7F\u505C\u8F6C\u7684\u78C1\u76D8\u5F00\u59CB\u8F6C\u52A8\u3002")), 1), Bk, t("span", null, "* " + i(e(n)("\u7761\u7720-\u5904\u4E8E\u7761\u7720\u6A21\u5F0F\u4E0B\u4E0D\u68C0\u67E5\u8BBE\u5907\u3002")), 1), Yk, t("span", null, "* " + i(e(n)("\u5F85\u673A-\u5904\u4E8E\u5F85\u673A\u548C\u7761\u7720\u6A21\u5F0F\u4E0B\u4E0D\u68C0\u67E5\u8BBE\u5907\u3002\u6B64\u6A21\u5F0F\u4E0B\u78C1\u76D8\u4E00\u822C\u4E0D\u65CB\u8F6C\uFF0C\u5982\u679C\u4F60\u4E0D\u60F3\u6BCF\u6B21\u68C0\u67E5\u90FD\u8F6C\u52A8\u78C1\u76D8\uFF0C\u90A3\u4E48\u8FD9\u4E2A\u6A21\u5F0F\u6BD4\u8F83\u9002\u5408\u3002")), 1), Ak, t("span", null, "* " + i(e(n)("\u95F2\u7F6E-\u5904\u4E8E\u5F85\u673A\u3001\u7761\u7720\u3001\u95F2\u7F6E\u6A21\u5F0F\u4E0B\u4E0D\u68C0\u67E5\u8BBE\u5907\uFF0C\u5728\u95F2\u7F6E\u72B6\u6001\u4E0B\uFF0C\u5927\u591A\u6570\u78C1\u76D8\u8FD8\u5728\u8F6C\u52A8\uFF0C\u6240\u4EE5\u8FD9\u53EF\u80FD\u4E0D\u9002\u5408\u4F60\u3002")), 1)])])]), t("div", Sk, [t("label", zk, i(e(n)("\u6E29\u5EA6\u76D1\u6D4B\uFF08\u5DEE\u5F02\uFF09")), 1), t("div", Pk, [t("div", Tk, [L(t("select", {
                            class: "cbi-input-select",
                            "onUpdate:modelValue": v[2] || (v[2] = g => e(d).global.tmpDiff = g)
                        },
                        [t("option", Lk, i(e(n)("\u7981\u7528")), 1), (s(), u(N, null, R(15, g => t("option", {
                            value: g
                        },
                        i(g) + "\xB0C", 9, Ik)), 64))], 512), [[tt, e(d).global.tmpDiff, void 0, {
                            number: !0
                        }]])]), t("div", Mk, i(e(n)("\u81EA\u4E0A\u6B21\u62A5\u544A\u4EE5\u6765\u6E29\u5EA6\u53D8\u5316\u81F3\u5C11 N \u5EA6\uFF0C\u5219\u9700\u62A5\u544A.")), 1)])]), t("div", Ok, [t("label", Nk, i(e(n)("\u6E29\u5EA6\u76D1\u6D4B\uFF08\u6700\u5927\uFF09")), 1), t("div", qk, [t("div", Vk, [L(t("select", {
                            class: "cbi-input-select",
                            "onUpdate:modelValue": v[3] || (v[3] = g => e(d).global.tmpMax = g)
                        },
                        [t("option", Gk, i(e(n)("\u7981\u7528")), 1), (s(), u(N, null, R(20, g => t("option", {
                            value: g * 5
                        },
                        i(g * 5) + "\xB0C", 9, jk)), 64))], 512), [[tt, e(d).global.tmpMax, void 0, {
                            number: !0
                        }]])]), t("div", Rk, i(e(n)("\u5982\u679C\u6E29\u5EA6\u5927\u4E8E\u6216\u7B49\u4E8E N \u6444\u6C0F\u5EA6\u5219\u62A5\u544A.")), 1)])])]), t("div", Uk, [t("table", Hk, [t("thead", null, [t("tr", Wk, [t("th", Zk, i(e(n)("\u8BBE\u5907")), 1), t("th", Jk, i(e(n)("\u578B\u53F7")), 1), t("th", Xk, i(e(n)("\u5E8F\u53F7")), 1), t("th", Kk, i(e(n)("\u5BB9\u91CF")), 1), t("th", Qk, i(e(n)("\u6E29\u5EA6")), 1), t("th", tw, i(e(n)("\u72B6\u6001")), 1), t("th", ew, i(e(n)("\u5065\u5EB7")), 1), t("th", aw, i(e(n)("\u64CD\u4F5C")), 1)])]), t("tbody", null, [(s(!0), u(N, null, R(p.value, (g, k) => (s(), u("tr", ow, [t("td", nw, [t("b", null, i(g.path), 1)]), t("td", iw, [t("b", null, i(g.model), 1)]), t("td", rw, [t("b", null, i(g.serial), 1)]), t("td", sw, [t("b", null, i(g.sizeStr), 1)]), t("td", dw, [t("b", null, i(g.temp), 1)]), t("td", uw, [t("b", null, i(g.status), 1)]), t("td", lw, [t("b", null, i(g.health), 1)]), t("td", cw, [t("button", {
                            class: "btn cbi-button cbi-button-apply",
                            title: e(n)("\u7F16\u8F91"),
                            onClick: h => c(g)
                        },
                        i(e(n)("\u7F16\u8F91")), 9, pw), t("button", {
                            class: "btn cbi-button cbi-button-apply",
                            title: e(n)("\u8BE6\u60C5"),
                            onClick: h => m(g)
                        },
                        i(e(n)("\u8BE6\u60C5")), 9, mw)])]))), 256))])])]), t("span", fw, [t("input", {
                            class: "btn cbi-button cbi-button-apply",
                            type: "button",
                            value: e(n)("\u4FDD\u5B58\u5E76\u5E94\u7528"),
                            onClick: b
                        },
                        null, 8, vw)])], 64))
                    }
                }), gw = {
                    class: "cbi-section cbi-tblsection",
                    id: "cbi-nfs-mount"
                },
                _w = {
                    class: "table cbi-section-table"
                },
                hw = {
                    class: "tr cbi-section-table-titles anonymous"
                },
                xw = {
                    class: "th cbi-section-table-cell",
                    "data-widget": "value"
                },
                kw = {
                    class: "th cbi-section-table-cell",
                    "data-widget": "value"
                },
                ww = {
                    class: "th cbi-section-table-cell",
                    "data-widget": "value"
                },
                yw = {
                    class: "th cbi-section-table-cell",
                    "data-widget": "value"
                },
                Fw = {
                    class: "tr cbi-section-table-row"
                },
                Ew = {
                    class: "td cbi-value-field"
                },
                Cw = {
                    class: "td cbi-value-field"
                },
                $w = {
                    class: "td cbi-value-field"
                },
                Dw = {
                    class: "td cbi-value-field"
                },
                Bw = ["title", "onClick"], Yw = ["title", "onClick"], Aw = I({
                    props: {
                        config: {
                            type: Object,
                            required: !0
                        },
                        saveData: {
                            type: Function,
                            required: !0
                        }
                    },
                    setup(o) {
                        const a = o,
                        {
                            $gettext: n,
                            $ngettext: l
                        } = q(),
                        d = dt(a.config),
                        r = b => {
                            switch (b) {
                            case "short":
                                return n("\u77ED\u6682\u81EA\u68C0");
                            case "long":
                                return n("\u957F\u65F6\u81EA\u68C0");
                            case "conveyance":
                                return n("\u4F20\u8F93\u65F6\u81EA\u68C0");
                            case "offline":
                                return n("\u79BB\u7EBF\u65F6\u81EA\u68C0");
                            default:
                                return n("\u672A\u77E5")
                            }
                        },
                        p = () => {
                            lk({
                                config: a.config,
                                disks: [],
                                next: b => M(this, null, function * () {
                                    yield a.saveData({
                                        tasks: [.d.tasks, b],
                                        global: a.config.global,
                                        devices: a.config.devices
                                    }),
                                    d.tasks = a.config.tasks || []
                                })
                            })
                        },
                        x = b => M(this, null, function * () {
                            const m = [.d.tasks];
                            m.splice(b, 1),
                            yield a.saveData({
                                tasks: m,
                                global: a.config.global,
                                devices: a.config.devices
                            }),
                            d.tasks = a.config.tasks || []
                        }),
                        _ = b => {
                            ck({
                                task: b
                            })
                        };
                        return (b, m) => (s(), u(N, null, [t("button", {
                            class: "btn cbi-button cbi-button-apply",
                            onClick: m[0] || (m[0] = c => p())
                        },
                        i(e(n)("\u65B0\u5EFA")), 1), t("div", gw, [t("table", _w, [t("thead", null, [t("tr", hw, [t("th", xw, i(e(n)("\u8BBE\u5907")), 1), t("th", kw, i(e(n)("\u7C7B\u578B")), 1), t("th", ww, i(e(n)("\u8C03\u5EA6")), 1), t("th", yw, i(e(n)("\u529F\u80FD")), 1)])]), t("tbody", null, [(s(!0), u(N, null, R(e(d).tasks, (c, f) => (s(), u("tr", Fw, [t("td", Ew, [t("b", null, i(c.devicePath), 1)]), t("td", Cw, [t("b", null, i(r(c.type)), 1)]), t("td", $w, [t("b", null, i(c.month) + "/" + i(c.dayPerMonth) + "/" + i(c.hour), 1)]), t("td", Dw, [t("button", {
                            class: "btn cbi-button cbi-button-apply",
                            title: e(n)("\u8C03\u8BD5"),
                            onClick: v => _(c)
                        },
                        i(e(n)("\u9884\u89C8")), 9, Bw), t("button", {
                            class: "cbi-button cbi-button-remove",
                            title: e(n)("\u5220\u9664"),
                            onClick: v => x(f)
                        },
                        i(e(n)("\u5220\u9664")), 9, Yw)])]))), 256))])])])], 64))
                    }
                }), Sw = {
                    class: "cbi-section"
                },
                zw = ["value"], Pw = I({
                    setup(o) {
                        return M(this, null, function * () {
                            let a,
                            n;
                            const l = E(""),
                            d = () => M(this, null, function * () {
                                try {
                                    const r = yield P.Smart.Log.GET();
                                    if (r.data) {
                                        const {
                                            result: p,
                                            error: x
                                        } = r.data;
                                        p && p.result && (l.value = p.result),
                                        x && (l.value = x)
                                    }
                                } catch(r) {
                                    l.value = r
                                }
                            });
                            return [a, n] = ua(() => d()),
                            yield a,
                            n(),
                            (r, p) => (s(), u("fieldset", Sw, [t("textarea", {
                                value: l.value,
                                disabled: ""
                            },
                            null, 8, zw)]))
                        })
                    }
                });
                var Tw = S(Pw, [["__scopeId", "data-v-76197cba"]]);const Lw = {},
                Iw = {
                    t: "1659511092204",
                    class: "icon",
                    viewBox: "0 0 1024 1024",
                    version: "1.1",
                    xmlns: "http://www.w3.org/2000/svg",
                    "p-id": "2332",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    width: "200",
                    height: "200"
                },
                Mw = t("path", {
                    d: "M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z",
                    "p-id": "2333"
                },
                null, -1), Ow = [Mw];function Nw(o, a) {
                    return s(),
                    u("svg", Iw, Ow)
                }
                var Fe = S(Lw, [["render", Nw]]);const qw = ["onSubmit"], Vw = {
                    class: "actioner-dns_header"
                },
                Gw = {
                    key: 0
                },
                jw = {
                    key: 1
                },
                Rw = {
                    class: "actioner-dns_body"
                },
                Uw = {
                    class: "label-item"
                },
                Hw = {
                    class: "label-item_key"
                },
                Ww = {
                    class: "label-item_value"
                },
                Zw = {
                    class: "label-item"
                },
                Jw = {
                    class: "label-item_key"
                },
                Xw = {
                    class: "label-item_value"
                },
                Kw = {
                    value: "dhcp"
                },
                Qw = {
                    key: 0,
                    value: "pppoe"
                },
                ty = {
                    value: "static"
                },
                ey = {
                    class: "actioner-dns_footer"
                },
                ay = ["disabled"], oy = I({
                    props: {
                        Close: {
                            type: Function,
                            required: !0
                        },
                        e: {
                            type: String,
                            required: !0
                        },
                        name: {
                            type: String,
                            required: !0
                        },
                        inface: {
                            type: Object,
                            required: !0
                        },
                        next: {
                            type: Function,
                            required: !0
                        }
                    },
                    setup(o) {
                        const a = o,
                        {
                            $gettext: n,
                            $ngettext: l
                        } = q(),
                        d = E(!1),
                        r = E(a.inface),
                        p = () => M(this, null, function * () {
                            C.Loading(n("\u914D\u7F6E\u4E2D...")).Close(),
                            a.next(r.value),
                            x()
                        }),
                        x = () => {
                            a.Close && a.Close()
                        };
                        return (_, b) => (s(), V(ot, {
                            Close: o.Close,
                            type: 1
                        },
                        {
                        default:
                            G(() => [t("form", {
                                class: "actioner-dns",
                                onSubmit: st(p, ["prevent"])
                            },
                            [t("div", Vw, [o.name == "wan" ? (s(), u("span", Gw, i(o.e == "edit" ? e(n)("\u7F16\u8F91WAN") : e(n)("\u6DFB\u52A0WAN")), 1)) : (s(), u("span", jw, i(o.e == "edit" ? e(n)("\u7F16\u8F91LAN") : e(n)("\u6DFB\u52A0LAN")), 1))]), t("div", Rw, [t("div", Uw, [t("div", Hw, [t("span", null, i(e(n)("\u540D\u79F0")), 1)]), t("div", Ww, [t("span", null, i(r.value.name.toLocaleUpperCase()), 1)])]), t("div", Zw, [t("div", Jw, [t("span", null, i(e(n)("\u534F\u8BAE\uFF08\u7F51\u7EDC\u83B7\u53D6\u65B9\u5F0F\uFF09")), 1)]), t("div", Xw, [L(t("select", {
                                "onUpdate:modelValue": b[0] || (b[0] = m => r.value.proto = m)
                            },
                            [t("option", Kw, i(e(n)("DHCP\u5BA2\u6237\u7AEF")), 1), o.name == "wan" ? (s(), u("option", Qw, "PPPoE")) : D("", !0), t("option", ty, i(e(n)("\u9759\u6001\u5730\u5740")), 1)], 512), [[tt, r.value.proto]])])])]), t("div", ey, [t("button", {
                                class: "cbi-button cbi-button-apply app-btn",
                                disabled: d.value
                            },
                            i(e(n)("\u4FDD\u5B58")), 9, ay), t("button", {
                                class: "cbi-button cbi-button-remove app-btn app-back",
                                onClick: x
                            },
                            i(e(n)("\u53D6\u6D88")), 1)])], 40, qw)]),
                            _: 1
                        },
                        8, ["Close"]))
                    }
                });
                var ny = S(oy, [["__scopeId", "data-v-c88486ac"]]);const Ee = o => {
                    const a = document.createElement("div");
                    document.body.appendChild(a);
                    const n = et(ny, nt(X({},
                    o), {
                        Close: () => {
                            l()
                        }
                    }));
                    n.mount(a);
                    const l = () => {
                        n.unmount(),
                        a.remove()
                    }
                },
                ct = o => (W("data-v-afd1f5d2"), o = o(), Z(), o), iy = {
                    id: "page"
                },
                ry = {
                    name: "content"
                },
                sy = {
                    class: "cbi-section cbi-tblsection",
                    id: "cbi-nfs-mount"
                },
                dy = {
                    class: "table cbi-section-table"
                },
                uy = {
                    width: "200"
                },
                ly = ct(() => t("col", null, null, -1)), cy = ct(() => t("col", null, null, -1)), py = ct(() => t("col", {
                    width: "200"
                },
                null, -1)), my = {
                    class: "tr cbi-section-table-cell"
                },
                fy = {
                    class: "th cbi-section-table-cell interface-device",
                    "data-widget": "value"
                },
                vy = {
                    class: "interface-device-flex"
                },
                by = ct(() => t("th", {
                    style: {
                        width: "10px"
                    }
                },
                null, -1)), gy = ct(() => t("th", {
                    style: {
                        width: "32px"
                    }
                },
                null, -1)), _y = ct(() => t("th", null, null, -1)), hy = {
                    class: "tr cbi-section-table-row cbi-rowstyle-1"
                },
                xy = {
                    class: "td cbi-value-field interface-device info"
                },
                ky = ["name", "value", "onUpdate:modelValue", "onInput"], wy = ct(() => t("td", {
                    class: "td cbi-value-field"
                },
                null, -1)), yy = {
                    class: "td cbi-value-field"
                },
                Fy = {
                    class: "td cbi-value-field btns"
                },
                Ey = ["title", "onClick"], Cy = ["onClick"], $y = {
                    class: "tr cbi-section-table-row cbi-rowstyle-1"
                },
                Dy = {
                    class: "td cbi-value-field"
                },
                By = ct(() => t("td", {
                    class: "td cbi-value-field"
                },
                null, -1)), Yy = ct(() => t("td", {
                    class: "td cbi-value-field"
                },
                null, -1)), Ay = {
                    class: "tr cbi-section-table-row cbi-rowstyle-1"
                },
                Sy = {
                    class: "td cbi-value-field interface-device info",
                    "data-widget": "value"
                },
                zy = ["name", "value", "onUpdate:modelValue", "onInput"], Py = ct(() => t("td", {
                    class: "td cbi-value-field"
                },
                null, -1)), Ty = {
                    class: "td cbi-value-field"
                },
                Ly = {
                    class: "td cbi-value-field btns"
                },
                Iy = ["title", "onClick"], My = ["onClick"], Oy = {
                    class: "tr cbi-section-table-row cbi-rowstyle-1"
                },
                Ny = {
                    class: "td cbi-value-field"
                },
                qy = ct(() => t("td", {
                    class: "td cbi-value-field"
                },
                null, -1)), Vy = ct(() => t("td", {
                    class: "td cbi-value-field"
                },
                null, -1)), Gy = {
                    class: "cbi-page-actions control-group"
                },
                jy = ["value", "disabled"], Ry = I({
                    setup(o) {
                        const {
                            $gettext: a,
                            $ngettext: n
                        } = q(),
                        l = dt({
                            devices: [],
                            interfaces: []
                        }),
                        d = E(!1),
                        r = dt({
                            lan: [],
                            wan: []
                        });
                        (() => {
                            P.Network.GetInterfaceConfig.GET().then(v => {
                                if (v.data) {
                                    const {
                                        result: g
                                    } = v.data;
                                    if (g) {
                                        l.devices = g.devices || [],
                                        l.interfaces = g.interfaces || [];
                                        for (let k = 0; k < l.interfaces.length; k++) l.interfaces[k].firewallType == "wan" ? r.wan.push(l.interfaces[k]) : l.interfaces[k].firewallType == "lan" && r.lan.push(l.interfaces[k])
                                    }
                                }
                            })
                        })();
                        const x = (v, g) => {
                            v == "wan" ? r.wan.splice(g, 1) : v == "lan" && r.lan.splice(g, 1)
                        },
                        _ = (v, g) => {
                            if (g == null) {
                                let k = v == "wan" ? r.wan.length : r.lan.length;
                                k == 6 && v == "wan" && k++,
                                Ee({
                                    e: "add",
                                    name: v,
                                    inface: {
                                        name: v + `$ {
                                            k
                                        }`,
                                        proto: "dhcp",
                                        ipv4Addr: "",
                                        ipv6Addr: "",
                                        portName: "",
                                        deviceNames: [],
                                        ports: [],
                                        firewallType: v
                                    },
                                    next: h => {
                                        v == "wan" ? r.wan.push(h) : r.lan.push(h),
                                        C.Message(a("\u8BF7\u5728\u4FDD\u5B58\u4EE5\u540E\u524D\u5F80'\u7F51\u7EDC-\u63A5\u53E3'\u9875\u9762\u914D\u7F6E\u63A5\u53E3\u8BE6\u7EC6\u53C2\u6570"))
                                    }
                                })
                            } else Ee({
                                e: "edit",
                                name: v,
                                inface: v == "wan" ? r.wan[g] : r.lan[g],
                                next: k => {
                                    v == "wan" ? r.wan[g] = k : r.lan[g] = k
                                }
                            })
                        },
                        b = (v, g) => v ? v.indexOf(g) : -1,
                        m = (v, g) => {
                            const h = v.target.value;
                            for (let y = 0; y < r.wan.length; y++) {
                                const F = b(r.wan[y].deviceNames, h);
                                F != -1 && r.wan[y].deviceNames.splice(F, 1)
                            }
                            for (let y = 0; y < r.lan.length; y++) if (y != g) {
                                const F = b(r.lan[y].deviceNames, h);
                                F != -1 && r.lan[y].deviceNames.splice(F, 1)
                            }
                            const w = b(r.lan[g].deviceNames, h);
                            w != -1 ? r.lan[g].deviceNames.splice(w, 1) : (r.lan[g].deviceNames === null && (r.lan[g].deviceNames = []), r.lan[g].deviceNames.push(h))
                        },
                        c = (v, g) => {
                            const h = v.target.value;
                            for (let w = 0; w < r.wan.length; w++) if (w != g) {
                                const y = b(r.wan[w].deviceNames, h);
                                y != -1 && r.wan[w].deviceNames.splice(y, 1)
                            }
                            for (let w = 0; w < r.lan.length; w++) {
                                const y = b(r.lan[w].deviceNames, h);
                                y != -1 && r.lan[w].deviceNames.splice(y, 1)
                            }
                            r.wan[g].deviceNames = [h]
                        },
                        f = () => M(this, null, function * () {
                            d.value = !0;
                            const v = [];
                            for (let k = 0; k < r.wan.length; k++) {
                                const h = r.wan[k];
                                v.push({
                                    name: h.name,
                                    proto: h.proto,
                                    devices: h.deviceNames || [],
                                    firewallType: h.firewallType
                                })
                            }
                            for (let k = 0; k < r.lan.length; k++) {
                                const h = r.lan[k];
                                if (h.name === "lan" && (!h.deviceNames || h.deviceNames.length == 0) && !confirm(a("LAN\u53E3\u672A\u5173\u8054\u4EFB\u4F55\u7269\u7406\u7F51\u53E3\uFF0C\u53EF\u80FD\u5BFC\u81F4\u8DEF\u7531\u5668\u5931\u8054\uFF0C\u662F\u5426\u7EE7\u7EED\u64CD\u4F5C\uFF1F"))) {
                                    d.value = !1;
                                    return
                                }
                                v.push({
                                    name: h.name,
                                    proto: h.proto,
                                    devices: h.deviceNames || [],
                                    firewallType: h.firewallType
                                })
                            }
                            const g = C.Loading(a("\u4FDD\u5B58\u4E2D..."));
                            try {
                                const k = yield P.Network.POSTInterfaceConfig.POST({
                                    configs: v
                                });
                                if (k.data) {
                                    const {
                                        success: h,
                                        result: w,
                                        error: y
                                    } = k.data;
                                    if (y) throw y;
                                    (h || 0) == 0 && C.Success(a("\u914D\u7F6E\u6210\u529F"))
                                }
                            } catch(k) {
                                C.Error(`$ {
                                    k
                                }`)
                            } finally {
                                g.Close(),
                                d.value = !1
                            }
                        });
                        return (v, g) => (s(), u("div", iy, [t("h2", ry, i(e(a)("\u7F51\u53E3\u914D\u7F6E")), 1), t("div", null, [t("div", sy, [t("table", dy, [t("colgroup", null, [(s(!0), u(N, null, R(e(l).devices, k => (s(), u("col", uy))), 256)), ly, cy, py]), t("thead", null, [t("tr", my, [(s(!0), u(N, null, R(e(l).devices, k => (s(), u("th", fy, [t("div", vy, [A(Pe, {
                            item: k
                        },
                        null, 8, ["item"])])]))), 256)), by, gy, _y])]), t("tbody", null, [(s(!0), u(N, null, R(e(r).lan, (k, h) => (s(), u("tr", hy, [(s(!0), u(N, null, R(e(l).devices, w => (s(), u("td", xy, [L(t("input", {
                            type: "checkbox",
                            name: w.name,
                            value: w.name,
                            "onUpdate:modelValue": y => k.deviceNames = y,
                            onInput: y => m(y, h)
                        },
                        null, 40, ky), [[Ct, k.deviceNames]])]))), 256)), wy, t("td", yy, [t("b", null, i(k.name), 1)]), t("td", Fy, [t("button", {
                            class: "btn cbi-button cbi-button-apply",
                            title: e(a)("\u7F16\u8F91"),
                            onClick: w => _("lan", h)
                        },
                        i(e(a)("\u7F16\u8F91")), 9, Ey), h != 0 ? (s(), u("button", {
                            key: 0,
                            class: "cbi-button cbi-button-remove",
                            onClick: w => x("lan", h)
                        },
                        i(e(a)("\u5220\u9664")), 9, Cy)) : D("", !0)])]))), 256)), t("tr", $y, [(s(!0), u(N, null, R(e(l).devices, k => (s(), u("td", Dy))), 256)), By, Yy, t("td", {
                            class: "td cbi-value-field btns",
                            onClick: g[0] || (g[0] = k => _("lan"))
                        },
                        [A(Fe, {
                            class: "icon"
                        })])]), (s(!0), u(N, null, R(e(r).wan, (k, h) => (s(), u("tr", Ay, [(s(!0), u(N, null, R(e(l).devices, w => (s(), u("td", Sy, [L(t("input", {
                            type: "checkbox",
                            name: w.name,
                            value: w.name,
                            "onUpdate:modelValue": y => k.deviceNames = y,
                            onInput: y => c(y, h)
                        },
                        null, 40, zy), [[Ct, k.deviceNames]])]))), 256)), Py, t("td", Ty, [t("b", null, i(k.name), 1)]), t("td", Ly, [t("button", {
                            class: "btn cbi-button cbi-button-apply",
                            title: e(a)("\u7F16\u8F91"),
                            onClick: w => _("wan", h)
                        },
                        i(e(a)("\u7F16\u8F91")), 9, Iy), h != 0 ? (s(), u("button", {
                            key: 0,
                            class: "cbi-button cbi-button-remove",
                            onClick: w => x("wan", h)
                        },
                        i(e(a)("\u5220\u9664")), 9, My)) : D("", !0)])]))), 256)), t("tr", Oy, [(s(!0), u(N, null, R(e(l).devices, k => (s(), u("td", Ny))), 256)), qy, Vy, t("td", {
                            class: "td cbi-value-field btns",
                            onClick: g[1] || (g[1] = k => _("wan"))
                        },
                        [A(Fe, {
                            class: "icon"
                        })])])])])]), t("div", Gy, [t("input", {
                            class: "btn cbi-button cbi-button-apply",
                            type: "button",
                            value: e(a)("\u4FDD\u5B58\u5E76\u5E94\u7528"),
                            onClick: f,
                            disabled: d.value
                        },
                        null, 8, jy)])])]))
                    }
                });
                var Uy = S(Ry, [["__scopeId", "data-v-afd1f5d2"]]);const Hy = () => window.vue_base || "/cgi-bin/luci/admin/quickstart", qe = la({
                    history: ca(Hy()),
                    routes: [{
                        name: "IndexPage",
                        path: "/",
                        meta: {
                            title: "\u63A7\u5236\u53F0"
                        },
                        component: af
                    },
                    {
                        name: "NetworkPage",
                        path: "/network",
                        meta: {
                            title: "\u7F51\u7EDC\u8BBE\u7F6E\u5411\u5BFC"
                        },
                        component: rf,
                        children: [{
                            path: "",
                            component: Nf
                        },
                        {
                            path: "pppoe",
                            component: uv
                        },
                        {
                            path: "dhcp",
                            component: Wv
                        },
                        {
                            path: "gateway",
                            component: Mb
                        }]
                    },
                    {
                        name: "RaidPage",
                        path: "/raid",
                        meta: {
                            title: "raid\u5411\u5BFC"
                        },
                        component: sh
                    },
                    {
                        name: "SmartPage",
                        path: "/smart",
                        meta: {
                            title: "smart\u68C0\u6D4B"
                        },
                        component: vh,
                        children: [{
                            path: "",
                            component: bw
                        },
                        {
                            path: "task",
                            component: Aw
                        },
                        {
                            path: "log",
                            component: Tw
                        }]
                    },
                    {
                        path: "/interfaceconfig",
                        component: Uy
                    }]
                });qe.beforeEach((o, a) => (o.meta.title, !0));const it = et(Sa);it.component("svg-menu", Oa);it.component("svg-system", Ra);it.component("svg-download", Xa);it.component("svg-store", io);it.component("svg-info", po);it.component("svg-disk", Lo);it.component("svg-nav", Vo);it.component("progress-item", Be);it.component("svg-view-show", mn);it.component("svg-view-hidden", hn);it.component("article-item", Cn);it.component("switch-box", Ye);it.component("editable-select", Et);it.use(Ae);it.use(qe);it.use(pa());fa(it).
                finally(() => it.mount("#app"))
            });export
        default Wy();