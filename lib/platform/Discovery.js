"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_RENEW_HANDICAP_MS = exports.DEFAULT_RETRY_Interval = exports.DEFAULT_RETRY_COUNT = exports.events = void 0;
var events_1 = require("events");
var Client_1 = __importDefault(require("../http/Client"));
var utils_1 = require("./utils");
var events;
(function (events) {
    events["initialized"] = "initialized";
    events["externalDataUpdated"] = "externalDataUpdated";
    events["externalRefreshError"] = "externalRefreshError";
    events["initialFetchError"] = "initialFetchError";
})(events = exports.events || (exports.events = {}));
exports.DEFAULT_RETRY_COUNT = 3;
exports.DEFAULT_RETRY_Interval = 3;
exports.DEFAULT_RENEW_HANDICAP_MS = 60 * 1000; // 1 minute
var Discovery = /** @class */ (function (_super) {
    __extends(Discovery, _super);
    function Discovery(_a) {
        var cache = _a.cache, cacheId = _a.cacheId, fetchGet = _a.fetchGet, clientId = _a.clientId, initialEndpoint = _a.initialEndpoint, _b = _a.refreshHandicapMs, refreshHandicapMs = _b === void 0 ? exports.DEFAULT_RENEW_HANDICAP_MS : _b, _c = _a.refreshDelayMs, refreshDelayMs = _c === void 0 ? 100 : _c, _d = _a.retryCount, retryCount = _d === void 0 ? exports.DEFAULT_RETRY_COUNT : _d, _e = _a.retryInterval, retryInterval = _e === void 0 ? exports.DEFAULT_RETRY_Interval : _e, brandId = _a.brandId;
        var _this = _super.call(this) || this;
        _this.events = events;
        _this._initialized = false;
        _this._initialRetryCount = 0;
        _this._externalRetryCount = 0;
        _this._externalRetryCycleTimeout = null;
        _this._cache = cache;
        _this._initialCacheId = "".concat(cacheId, "-initial");
        _this._externalCacheId = "".concat(cacheId, "-external");
        _this._refreshHandicapMs = refreshHandicapMs;
        _this._refreshDelayMs = refreshDelayMs;
        _this._initialEndpoint = initialEndpoint;
        _this._fetchGet = fetchGet;
        _this._clientId = clientId;
        _this._defaultBrandId = brandId;
        _this._initialRetryMaxCount = retryCount;
        _this._initialRetryInterval = retryInterval;
        _this._externalRetryMaxCount = retryCount;
        _this._externalRetryInterval = retryInterval;
        return _this;
    }
    Discovery.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._clientId) {
                            throw new Error('Client Id is required for discovery');
                        }
                        if (!this._initialPromise) {
                            this._initialPromise = this._init();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._initialPromise];
                    case 2:
                        _a.sent();
                        this._initialPromise = null;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this._initialPromise = null;
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Discovery.prototype._init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var initialData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initialData()];
                    case 1:
                        initialData = _a.sent();
                        if (!!initialData) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fetchInitialData()];
                    case 2:
                        initialData = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this._initialRetryMaxCount = initialData.retryCount;
                        this._initialRetryInterval = initialData.retryInterval;
                        this._externalRetryMaxCount = initialData.retryCount;
                        this._externalRetryInterval = initialData.retryInterval;
                        _a.label = 4;
                    case 4:
                        this._initialized = true;
                        this.emit(events.initialized, initialData);
                        return [2 /*return*/];
                }
            });
        });
    };
    Discovery.prototype.fetchInitialData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var initialData, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this._initialFetchPromise) {
                            this._initialFetchPromise = this._fetchInitialData();
                        }
                        return [4 /*yield*/, this._initialFetchPromise];
                    case 1:
                        initialData = _a.sent();
                        this._initialRetryMaxCount = initialData.retryCount;
                        this._initialRetryInterval = initialData.retryInterval;
                        this._externalRetryMaxCount = initialData.retryCount;
                        this._externalRetryInterval = initialData.retryInterval;
                        this._initialFetchPromise = null;
                        return [2 /*return*/, initialData];
                    case 2:
                        e_2 = _a.sent();
                        this._initialFetchPromise = null;
                        this.emit(events.initialFetchError, e_2);
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Discovery.prototype._fetchInitialData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var initialParams, response, initialData, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 7]);
                        initialParams = { clientId: this._clientId };
                        if (this._defaultBrandId) {
                            initialParams['brandId'] = this._defaultBrandId;
                        }
                        return [4 /*yield*/, this._fetchGet(this._initialEndpoint, initialParams, {
                                skipAuthCheck: true,
                                skipDiscoveryCheck: true,
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        initialData = _a.sent();
                        return [4 /*yield*/, this._setInitialData(initialData)];
                    case 3:
                        _a.sent();
                        this._initialRetryCount = 0;
                        return [2 /*return*/, initialData];
                    case 4:
                        e_3 = _a.sent();
                        this._initialRetryCount += 1;
                        if (!(this._initialRetryCount < this._initialRetryMaxCount)) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, utils_1.delay)(this._initialRetryInterval * 1000)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, this._fetchInitialData()];
                    case 6:
                        this._initialRetryCount = 0;
                        throw e_3;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Discovery.prototype._fetchExternalData = function (externalEndpoint) {
        return __awaiter(this, void 0, void 0, function () {
            var response, externalData, discoveryTag, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 6]);
                        return [4 /*yield*/, this._fetchGet(externalEndpoint, null, { skipDiscoveryCheck: true })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        externalData = _a.sent();
                        discoveryTag = response.headers.get('discovery-tag');
                        if (discoveryTag) {
                            externalData.tag = discoveryTag;
                        }
                        return [2 /*return*/, externalData];
                    case 3:
                        e_4 = _a.sent();
                        if (e_4.response && e_4.response.status === Client_1.default._unauthorizedStatus) {
                            throw e_4;
                        }
                        this._externalRetryCount += 1;
                        if (!(this._externalRetryCount < this._externalRetryMaxCount)) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, utils_1.delay)(this._externalRetryInterval * 1000)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, this._fetchExternalData(externalEndpoint)];
                    case 5:
                        this._externalRetryCount = 0;
                        throw e_4;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Discovery.prototype.fetchExternalData = function (externalEndpoint) {
        return __awaiter(this, void 0, void 0, function () {
            var externalData, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!this._externalFetchPromise) {
                            this._externalFetchPromise = this._fetchExternalData(externalEndpoint);
                        }
                        return [4 /*yield*/, this._externalFetchPromise];
                    case 1:
                        externalData = _a.sent();
                        return [4 /*yield*/, this._setExternalData(externalData)];
                    case 2:
                        _a.sent();
                        this._externalFetchPromise = null;
                        this.emit(events.externalDataUpdated, externalData);
                        return [2 /*return*/, externalData];
                    case 3:
                        e_5 = _a.sent();
                        this._externalFetchPromise = null;
                        throw e_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Discovery.prototype._refreshExternalData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oldExternalData, externalEndpoint, initialData, e_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.externalRetryCycleScheduled) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, (0, utils_1.delay)(this._refreshDelayMs)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.externalData()];
                    case 2:
                        oldExternalData = _a.sent();
                        if (!oldExternalData) return [3 /*break*/, 3];
                        externalEndpoint = oldExternalData.discoveryApi.externalUri;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.initialData()];
                    case 4:
                        initialData = _a.sent();
                        externalEndpoint = initialData.discoveryApi.defaultExternalUri;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.fetchExternalData(externalEndpoint)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_6 = _a.sent();
                        this._externalRetryCycleTimeout = setTimeout(function () {
                            _this._externalRetryCycleTimeout = null;
                            _this._refreshExternalData();
                        }, oldExternalData.retryCycleDelay * 1000);
                        this.emit(events.externalRefreshError, {
                            error: e_6,
                            message: "Fetch External Discovery data error, will retry after ".concat(oldExternalData.retryCycleDelay, "s."),
                        });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Discovery.prototype.refreshExternalData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._externalRefreshPromise) {
                            this._externalRefreshPromise = this._refreshExternalData();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._externalRefreshPromise];
                    case 2:
                        _a.sent();
                        this._externalRefreshPromise = null;
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        this._externalRefreshPromise = null;
                        throw e_7;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Discovery.prototype.initialData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._cache.getItem(this._initialCacheId)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data || null];
                }
            });
        });
    };
    Discovery.prototype.externalData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._cache.getItem(this._externalCacheId)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data || null];
                }
            });
        });
    };
    Discovery.prototype._setInitialData = function (newData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._cache.setItem(this._initialCacheId, newData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Discovery.prototype._setExternalData = function (newData) {
        return __awaiter(this, void 0, void 0, function () {
            var expireTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (newData.expiresIn) {
                            expireTime = Date.now() + newData.expiresIn * 1000;
                        }
                        return [4 /*yield*/, this._cache.setItem(this._externalCacheId, __assign(__assign({}, newData), { expireTime: expireTime }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Discovery.prototype.removeExternalData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._cache.removeItem(this._externalCacheId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Discovery.prototype.removeInitialData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._cache.removeItem(this._initialCacheId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check if there is expired
     */
    Discovery.prototype.externalDataExpired = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.externalData()];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2 /*return*/, true];
                        }
                        if (!data.expireTime) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, data.expireTime - this._refreshHandicapMs < Date.now()];
                }
            });
        });
    };
    Object.defineProperty(Discovery.prototype, "initialized", {
        get: function () {
            return this._initialized;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Discovery.prototype, "refreshingExternalData", {
        get: function () {
            return !!this._externalRefreshPromise;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Discovery.prototype, "externalRetryCycleScheduled", {
        get: function () {
            return this._externalRetryCycleTimeout !== null;
        },
        enumerable: false,
        configurable: true
    });
    Discovery.prototype.cancelExternalRetryCycleTimeout = function () {
        if (this._externalRetryCycleTimeout !== null) {
            clearTimeout(this._externalRetryCycleTimeout);
        }
    };
    Discovery.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    return Discovery;
}(events_1.EventEmitter));
exports.default = Discovery;
//# sourceMappingURL=Discovery.js.map