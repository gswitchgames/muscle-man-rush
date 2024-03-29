var _interopRequireDefault = babel_require("../../@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(babel_require("../../@babel/runtime/helpers/typeof"));

var _createClass2 = _interopRequireDefault(babel_require("../../@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(babel_require("../../@babel/runtime/helpers/classCallCheck"));

window.zs = window.zs || {}, function(t) {
    "use strict";
    var e = function e() {
        (0, _classCallCheck2.default)(this, e);
    };
    function Coop(t, e, r) {
        var n = new Promise(t);
        if (e) {
            if (r) {
                var _t = !1;
                n.then(function(r) {
                    _t || (_t = !0, e(r));
                }).catch(function(e) {
                    // console.error("coop error", e), _t || (_t = !0, r(e));
                });
            } else n.then(e).catch(function(t) {
                // console.error("promise rejected", t);
            });
        } else r ? n.catch(function(t) {
            // console.error("coop error", t), r(t);
        }) : n.catch(function(t) {
            // console.error("promise rejected", t);
        });
        return n;
    }
    e.linearNone = "linearNone", e.linearIn = "linearIn", e.linearInOut = "linearInOut", 
    e.linearOut = "linearOut", e.bounceIn = "bounceIn", e.bounceInOut = "bounceInOut", 
    e.bounceOut = "bounceOut", e.backIn = "backIn", e.backInOut = "backInOut", e.backOut = "backOut", 
    e.elasticIn = "elasticIn", e.elasticInOut = "elasticInOut", e.elasticOut = "elasticOut", 
    e.strongIn = "strongIn", e.strongInOut = "strongInOut", e.strongOut = "strongOut", 
    e.sineInOut = "sineInOut", e.sineIn = "sineIn", e.sineOut = "sineOut", e.quintIn = "quintIn", 
    e.quintInOut = "quintInOut", e.quintOut = "quintOut", e.quartIn = "quartIn", e.quartInOut = "quartInOut", 
    e.quartOut = "quartOut", e.cubicIn = "cubicIn", e.cubicInOut = "cubicInOut", e.cubicOut = "cubicOut", 
    e.quadIn = "quadIn", e.quadInOut = "quadInOut", e.quadOut = "quadOut", e.expoIn = "expoIn", 
    e.expoInOut = "expoInOut", e.expoOut = "expoOut", e.circIn = "circIn", e.circInOut = "circInOut", 
    e.circOut = "circOut";
    var r = /* */ function() {
        function r() {
            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var _r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
            (0, _classCallCheck2.default)(this, r);
            this.once = !1, this._id = 0, this.setTo(t, e, _r, n);
        }
        (0, _createClass2.default)(r, [ {
            key: "setTo",
            value: function setTo(t, e, n) {
                var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
                return this._id = r._gid++, this.caller = t, this.method = e, this.args = n, this.once = s, 
                this;
            }
        }, {
            key: "run",
            value: function run() {
                if (null == this.method) return null;
                var t = this._id, e = this.method.apply(this.caller, this.args);
                return this._id === t && this.once && this.recover(), e;
            }
        }, {
            key: "runWith",
            value: function runWith(t) {
                if (null == this.method) return null;
                var e = this._id;
                if (null == t) var r = this.method.apply(this.caller, this.args); else r = this.args || t.unshift ? this.args ? this.method.apply(this.caller, this.args.concat(t)) : this.method.apply(this.caller, t) : this.method.call(this.caller, t);
                return this._id === e && this.once && this.recover(), r;
            }
        }, {
            key: "clear",
            value: function clear() {
                return this.caller = null, this.method = null, this.args = null, this;
            }
        }, {
            key: "recover",
            value: function recover() {
                this._id > 0 && (this._id = 0, r._pool.push(this.clear()));
            }
        } ], [ {
            key: "create",
            value: function create(t, e) {
                var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
                var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
                return r._pool.length ? r._pool.pop().setTo(t, e, n, s) : new r(t, e, n, s);
            }
        } ]);
        return r;
    }();
    r._pool = [], r._gid = 1;
    var n = /* */ function() {
        (0, _createClass2.default)(n, null, [ {
            key: "getGID",
            value: function getGID() {
                var t = this._gid;
                return this._gid++, t;
            }
        }, {
            key: "inst",
            get: function get() {
                return this._inst || (this._inst = new n()), this._inst;
            }
        } ]);
        function n() {
            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
            (0, _classCallCheck2.default)(this, n);
            this.scale = 1, this.currTimer = Date.now(), this.currFrame = 0, this._delta = 0, 
            this._lastTimer = Date.now(), this._map = [], this._handlers = [], this._temp = [], 
            this._count = 0, t && n.gTimer && n.gTimer.frameLoop(1, this, this._update);
        }
        (0, _createClass2.default)(n, [ {
            key: "_update",
            value: function _update() {
                if (this.scale <= 0) return this._lastTimer = Date.now(), void (this._delta = 0);
                var t = this.currFrame = this.currFrame + this.scale, e = Date.now(), r = e - this._lastTimer > 3e4;
                this._delta = (e - this._lastTimer) * this.scale;
                var n = this.currTimer = this.currTimer + this._delta;
                this._lastTimer = e;
                var s = this._handlers;
                this._count = 0;
                for (var l = 0, i = s.length; l < i; l++) {
                    var a = s[l];
                    if (null !== a.method) {
                        var u = a.userFrame ? t : n;
                        if (u >= a.exeTime) if (a.repeat) {
                            if (!a.jumpFrame || r) a.exeTime += a.delay, a.run(!1), u > a.exeTime && (a.exeTime += Math.ceil((u - a.exeTime) / a.delay) * a.delay); else for (;u >= a.exeTime; ) {
                                a.exeTime += a.delay, a.run(!1);
                            }
                        } else a.run(!0);
                    } else this._count++;
                }
                (this._count > 30 || t % 200 == 0) && this._clearHandlers();
            }
        }, {
            key: "_clearHandlers",
            value: function _clearHandlers() {
                for (var t = this._handlers, e = 0, r = t.length; e < r; e++) {
                    var n = t[e];
                    null !== n.method ? this._temp.push(n) : this._recoverHandler(n);
                }
                this._handlers = this._temp, t.length = 0, this._temp = t;
            }
        }, {
            key: "_recoverHandler",
            value: function _recoverHandler(t) {
                this._map[t.key] == t && (this._map[t.key] = null), t.clear(), n._pool.push(t);
            }
        }, {
            key: "_create",
            value: function _create(t, e, r, l, i, a, u) {
                if (!r) return i.apply(l, a), null;
                if (u) {
                    var h = this._getHandler(l, i);
                    if (h) return h.repeat = e, h.userFrame = t, h.delay = r, h.caller = l, h.method = i, 
                    h.args = a, h.exeTime = r + (t ? this.currFrame : this.currTimer + Date.now() - this._lastTimer), 
                    h;
                }
                return (h = n._pool.length > 0 ? n._pool.pop() : new s()).repeat = e, h.userFrame = t, 
                h.delay = r, h.caller = l, h.method = i, h.args = a, h.exeTime = r + (t ? this.currFrame : this.currTimer + Date.now() - this._lastTimer), 
                this._indexHandler(h), this._handlers.push(h), h;
            }
        }, {
            key: "_indexHandler",
            value: function _indexHandler(t) {
                var e = t.caller, r = t.method, s = e ? e.$_GID || (e.$_GID = n.getGID()) : 0, l = r.$_TID || (r.$_TID = 1e5 * n._mid++);
                t.key = s + l, this._map[t.key] = t;
            }
        }, {
            key: "once",
            value: function once(t, e, r) {
                var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
                var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !0;
                this._create(!1, !1, t, e, r, n, s);
            }
        }, {
            key: "loop",
            value: function loop(t, e, r) {
                var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
                var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !0;
                var l = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : !1;
                var i = this._create(!1, !0, t, e, r, n, s);
                i && (i.jumpFrame = l);
            }
        }, {
            key: "frameOnce",
            value: function frameOnce(t, e, r) {
                var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
                var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !0;
                this._create(!0, !1, t, e, r, n, s);
            }
        }, {
            key: "frameLoop",
            value: function frameLoop(t, e, r) {
                var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
                var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !0;
                this._create(!0, !0, t, e, r, n, s);
            }
        }, {
            key: "toString",
            value: function toString() {
                return " handlers:" + this._handlers.length + " pool:" + n._pool.length;
            }
        }, {
            key: "clear",
            value: function clear(t, e) {
                var r = this._getHandler(t, e);
                r && (this._map[r.key] = null, r.key = 0, r.clear());
            }
        }, {
            key: "clearAll",
            value: function clearAll(t) {
                if (t) for (var e = 0, r = this._handlers.length; e < r; e++) {
                    var n = this._handlers[e];
                    n.caller === t && (this._map[n.key] = null, n.key = 0, n.clear());
                }
            }
        }, {
            key: "_getHandler",
            value: function _getHandler(t, e) {
                var r = t ? t.$_GID || (t.$_GID = n.getGID()) : 0, s = e.$_TID || (e.$_TID = 1e5 * n._mid++);
                return this._map[r + s];
            }
        }, {
            key: "callLater",
            value: function callLater(t, e) {
                var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
                CallLater.I.callLater(t, e, r);
            }
        }, {
            key: "runCallLater",
            value: function runCallLater(t, e) {
                CallLater.I.runCallLater(t, e);
            }
        }, {
            key: "runTimer",
            value: function runTimer(t, e) {
                var r = this._getHandler(t, e);
                r && null != r.method && (this._map[r.key] = null, r.run(!0));
            }
        }, {
            key: "pause",
            value: function pause() {
                this.scale = 0;
            }
        }, {
            key: "resume",
            value: function resume() {
                this.scale = 1;
            }
        }, {
            key: "delta",
            get: function get() {
                return this._delta;
            }
        } ]);
        return n;
    }();
    n.gTimer = null, n._pool = [], n._gid = 1, n._mid = 1;
    var s = /* */ function() {
        function s() {
            (0, _classCallCheck2.default)(this, s);
        }
        (0, _createClass2.default)(s, [ {
            key: "clear",
            value: function clear() {
                this.caller = null, this.method = null, this.args = null;
            }
        }, {
            key: "run",
            value: function run(t) {
                var e = this.caller;
                if (e && e.destroyed) return this.clear();
                var r = this.method, n = this.args;
                t && this.clear(), null != r && (n ? r.apply(e, n) : r.call(e));
            }
        } ]);
        return s;
    }();
    var l = /* */ function() {
        function l() {
            (0, _classCallCheck2.default)(this, l);
        }
        (0, _createClass2.default)(l, null, [ {
            key: "getOrAddComponent",
            value: function getOrAddComponent(t, e) {
                if (null == t) return;
                var r = t.getComponent(e);
                return null == r && (r = t.addComponent(e)), r;
            }
        }, {
            key: "sleep",
            value: function sleep(t) {
                return new Coop(function(e, r) {
                    setTimeout(function() {
                        e();
                    }, t);
                });
            }
        }, {
            key: "isToday",
            value: function isToday(t, e) {
                var r = Date.now();
                if (r - t > (e ? 86400 : 864e5)) return !1;
                var n = new Date(r), s = new Date(t);
                return n.getDate() == s.getDate();
            }
        }, {
            key: "randInt",
            value: function randInt(t, e) {
                return Math.random() * (e - t) + t << 0;
            }
        }, {
            key: "srandInt",
            value: function srandInt(t, e) {
                return this.seedRandom() * (e - t) + t << 0;
            }
        }, {
            key: "rand",
            value: function rand(t, e) {
                return Math.random() * (e - t) + t;
            }
        }, {
            key: "srand",
            value: function srand(t, e) {
                return this.seedRandom() * (e - t) + t;
            }
        }, {
            key: "seedRandom",
            value: function seedRandom() {
                return this.randSeed = (9301 * this.randSeed + 49297) % 233280, this.randSeed / 233280;
            }
        }, {
            key: "setRandSeed",
            value: function setRandSeed(t) {
                this.randSeed = t, this.randSeed = (9301 * this.randSeed + 49297) % 233280;
            }
        }, {
            key: "pickNumbers",
            value: function pickNumbers(t, e, r) {
                var _ref;
                if (r <= 0) return [];
                t > e && (_ref = [ e, t ], t = _ref[0], e = _ref[1], _ref);
                var n = [], s = [];
                for (var _r2 = t; _r2 <= e; _r2++) {
                    s.push(_r2);
                }
                r >= s.length && (r = s.length);
                for (var _t2 = 0; _t2 < r; _t2++) {
                    var _t3 = this.randInt(0, s.length);
                    n.push(s[_t3]), s.splice(_t3, 1);
                }
                return n;
            }
        }, {
            key: "spickNumbers",
            value: function spickNumbers(t, e, r, n) {
                var _ref2;
                if (r <= 0) return [];
                t > e && (_ref2 = [ e, t ], t = _ref2[0], e = _ref2[1], _ref2);
                var s = [], l = [];
                for (var _r3 = t; _r3 <= e; _r3++) {
                    l.push(_r3);
                }
                r >= l.length && (r = l.length), n && this.setRandSeed(n);
                for (var _t4 = 0; _t4 < r; _t4++) {
                    var _t5 = this.srandInt(0, l.length);
                    s.push(l[_t5]), l.splice(_t5, 1);
                }
                return s;
            }
        }, {
            key: "pickArray",
            value: function pickArray(t, e) {
                if (null == t || t.length <= 0 || e <= 0) return [];
                var r = [], n = t.concat();
                e >= n.length && (e = n.length);
                for (var _t6 = 0; _t6 < e; _t6++) {
                    var _t7 = this.randInt(0, n.length);
                    r.push(n[_t7]), n.splice(_t7, 1);
                }
                return r;
            }
        }, {
            key: "spickArray",
            value: function spickArray(t, e, r) {
                if (null == t || t.length <= 0 || e <= 0) return [];
                var n = [], s = t.concat();
                e >= s.length && (e = s.length), r && this.setRandSeed(r);
                for (var _t8 = 0; _t8 < e; _t8++) {
                    var _t9 = this.srandInt(0, s.length);
                    n.push(s[_t9]), s.splice(_t9, 1);
                }
                return n;
            }
        }, {
            key: "isNumber",
            value: function isNumber(t) {
                return !(!/^\d+(\.\d+)?$/.test(t) && !/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/.test(t));
            }
        }, {
            key: "startwith",
            value: function startwith(t, e) {
                return !(t.length < e.length) && t.slice(0, e.length) == e;
            }
        }, {
            key: "randByte",
            value: function randByte() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
            }
        }, {
            key: "flatKVJson",
            value: function flatKVJson(t, e) {
                var r = {};
                if (!Array.isArray(t) || t.length <= 0) return r;
                for (var _n = 0, _s = t.length; _n < _s; _n++) {
                    var _s2 = t[_n];
                    if (_s2.key && _s2.value) {
                        var _t10 = _s2.value;
                        if (e && "number" != typeof _s2.value) {
                            var _e = parseFloat(_s2.value);
                            isNaN(_e) || (_t10 = _s2.value);
                        }
                        r[_s2.key] = _t10;
                    }
                }
                return r;
            }
        }, {
            key: "getItem",
            value: function getItem(t) {
                return zs.proxy.LocalStorage.getItem(zs.core.appId + "." + t);
            }
        }, {
            key: "setItem",
            value: function setItem(t, e) {
                zs.proxy.LocalStorage.setItem(zs.core.appId + "." + t, e);
            }
        }, {
            key: "arrayDeepCopy",
            value: function arrayDeepCopy(t) {
                if (!Array.isArray(t) || t.length <= 0) return [];
                var e = [];
                for (var _r4 = 0, _n2 = t.length; _r4 < _n2; _r4++) {
                    var _n3 = t[_r4];
                    if ("object" == (0, _typeof2.default)(_n3)) {
                        var _t11 = {};
                        for (var _e2 in _n3) {
                            _t11[_e2] = _n3[_e2];
                        }
                        e.push(_t11);
                    } else e.push(_n3);
                }
                return e;
            }
        }, {
            key: "getEventCode",
            value: function getEventCode(t) {
                return null == zs.network.loginCode || null == zs.core.userId ? null : zs.configs.gameCfg.appId + "-" + zs.network.loginCode + "-" + zs.core.userId + "-" + t;
            }
        } ]);
        return l;
    }();
    l.randSeed = 5, t.Ease = e, t.Coop = Coop, t.Handler = r, t.Timer = n, t.Tween = /* */ function() {
        function _class() {
            (0, _classCallCheck2.default)(this, _class);
        }
        (0, _createClass2.default)(_class, null, [ {
            key: "to",
            value: function to(t, e, r) {
                var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
                var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
                var l = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
                return zs.proxy.Tween.to(t, e, r, n, s, l);
            }
        }, {
            key: "clearAll",
            value: function clearAll(t) {
                zs.proxy.Tween.clearAll(t);
            }
        } ]);
        return _class;
    }(), t.utils = l;
}(window.zs = window.zs || {});