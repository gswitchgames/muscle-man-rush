var _interopRequireDefault = babel_require("../../@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(babel_require("../../@babel/runtime/helpers/classCallCheck"));

window.zs = window.zs || {}, window.zs.platform = window.zs.platform || {}, function(e) {
    "use strict";
    var r = window.platform, n = [ "setFrameRate", "share", "userInfoHide", "userInfoShow", "userInfoDestroy", "initVideo", "isVideoEnable", "initInsert", "loadInsert", "hasBanner", "nextBanner", "createBanner", "initBanner", "checkBanner", "clearDelayBanner", "showBanner", "updateBanner", "hideBanner", "recorderStart", "recorderStop", "recorderPause", "recorderResume", "recorderCreate", "recorderHide", "canShareRecorder", "statusBarHeight", "screenWidth", "screenHeight", "vibrate", "isNetValid", "addEventShow", "addEventHide", "recorderClip", "recorderShare", "showFavoriteGuide", "setDefaultShare", "updateReviveTypeInfo", "setNativeLastShowTime", "initNativeAd", "sendReqAdShowReport", "sendReqAdClickReport", "reportNativeAdClick", "initGamePortalAd", "showToast", "getLaunchOptions", "getScene", "showInsertAd", "initBannerId", "showOnePixelBanner", "showShareMenu", "openShare", "getReadSetting", "playSound", "initAppBox", "showAppBox", "checkBlockAd", "showBlockAd", "hideBlockAd", "destroyInsertAd", "pauseSound", "getAdPos", "showCustomAd", "hideCustomAd", "hideGamePortalAd" ], o = [ "login", "getLoginParams", "playVideo", "setCloudStorage", "getCloudStorage", "userInfoCreate", "navigateToOther", "loadSubpackage", "getUserInfo", "openAwemeUserProfile", "checkFollowAwemeState", "loadNativeAd", "isBeforeGameAccount", "getAdReporteStatus", "showGamePortalAd", "hasDesktopIcon", "createDesktopIcon", "getNetworkType", "shareRecorderVideo", "showMoreGamesModalSimple", "showInterstitialAd" ];
    var t = function t() {
        (0, _classCallCheck2.default)(this, t);
    };
    var a = function a() {
        (0, _classCallCheck2.default)(this, a);
    };
    e.init = function() {
        r && r.init();
        for (var _e in r) {
            var _n = r[_e];
            null != _n && "function" == typeof _n && (o.indexOf(_e) >= 0 ? t[_e] = r[_e] : a[_e] = r[_e]);
        }
        var _loop = function _loop(_e2, _r) {
            var r = n[_e2];
            if (null == a[r]) switch (r) {
              case "updateBanner":
              case "showBanner":
                a[r] = function(e) {
                    return zs.core.workflow.showPreviewBanner(e), null;
                };
                break;

              case "checkBanner":
                a[r] = function(e) {
                    if (zs.core.workflow.hidePreviewBanner(), !e || !e.data || !e.data.banner) return null;
                    var r = e.data.banner, n = !0;
                    if (r.switch) if (Array.isArray(r.switch)) {
                        for (var _e4 = 0, _o = r.switch.length; _e4 < _o; _e4++) {
                            if (!zs.product.get(r.switch[_e4])) {
                                n = !1;
                                break;
                            }
                        }
                    } else zs.product.get(r.switch) || (n = !1);
                    if (!n || !r.delay && !r.auto && !r.checkInit) return null;
                    var o = r.delay || 0 == r.auto;
                    return zs.core.workflow.showPreviewBanner({
                        pos: r.pos,
                        size: r.size,
                        isWait: o,
                        checkInit: r.checkInit
                    }), r.delay && (zs.product.get("zs_banner_banner_time") ? zs.platform.delayBanner = setTimeout(function() {
                        zs.core.workflow.showPreviewBanner({
                            pos: r.pos,
                            size: r.size
                        });
                    }, zs.product.get("zs_banner_banner_time")) : zs.core.workflow.showPreviewBanner({
                        pos: r.pos,
                        size: r.size
                    })), null;
                };
                break;

              case "hideBanner":
                a[r] = function() {
                    return zs.core.workflow.hidePreviewBanner(), null;
                };
                break;

              default:
                a[r] = function() {
                    return zs.log.debug("Sync方法 " + r + " 在当前平台不存在", "Platform"), null;
                };
            }
        };
        for (var _e2 = 0, _r = n.length; _e2 < _r; _e2++) {
            _loop(_e2, _r);
        }
        var _loop2 = function _loop2(_e3, _r2) {
            var r = o[_e3];
            if (null == t[r]) switch (r) {
              case "playVideo":
                t[r] = function() {
                    return new zs.Coop(function(e, n) {
                        zs.log.debug("Async方法 " + r + " 在当前平台不存在", "Platform"), e(!0);
                    });
                };
                break;

              default:
                t[r] = function() {
                    return new zs.Coop(function(e, n) {
                        zs.log.debug("Async方法 " + r + " 在当前平台不存在", "Platform"), n();
                    });
                };
            }
        };
        for (var _e3 = 0, _r2 = o.length; _e3 < _r2; _e3++) {
            _loop2(_e3, _r2);
        }
    }, e.initAds = function(e) {
        r && r.initAds(e);
    }, e.proxy = r, e.async = t, e.sync = a;
}(window.zs.platform = window.zs.platform || {});