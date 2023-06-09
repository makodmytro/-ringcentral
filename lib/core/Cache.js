"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Cache = /** @class */ (function () {
    function Cache(_a) {
        var _b = _a.prefix, prefix = _b === void 0 ? Cache.defaultPrefix : _b, externals = _a.externals;
        this._prefix = null;
        this._externals = null;
        this._prefix = prefix;
        this._externals = externals;
    }
    Cache.prototype.setItemSync = function (key, data) {
        this._externals.localStorage.setItem(this._prefixKey(key), JSON.stringify(data));
        return this;
    };
    Cache.prototype.setItem = function (key, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setItemSync(key, data);
                return [2 /*return*/];
            });
        });
    };
    Cache.prototype.removeItemSync = function (key) {
        this._externals.localStorage.removeItem(this._prefixKey(key));
        return this;
    };
    Cache.prototype.removeItem = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.removeItemSync(key)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Cache.prototype.getItemSync = function (key) {
        var item = this._externals.localStorage.getItem(this._prefixKey(key));
        if (!item)
            return null;
        return JSON.parse(item);
    };
    Cache.prototype.getItem = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getItemSync(key)];
            });
        });
    };
    Cache.prototype._keys = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 'keys' in this._externals.localStorage
                        ? this._externals.localStorage.keys() // could be async
                        : Object.keys(this._externals.localStorage)];
            });
        });
    };
    Cache.prototype.clean = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, this._keys()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).map(function (key) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!key.startsWith(this._prefix)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this._externals.localStorage.removeItem(key)];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); })])];
                    case 2:
                        _c.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Cache.prototype._prefixKey = function (key) {
        return this._prefix + key;
    };
    Cache.defaultPrefix = 'rc-';
    return Cache;
}());
exports.default = Cache;
//# sourceMappingURL=Cache.js.map