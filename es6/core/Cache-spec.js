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
import { asyncTest, expect, createSdk } from '../test/test';
describe('RingCentral.core.Cache', function () {
    describe('getItem', function () {
        it('returns null if item not found', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var cache, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cache = sdk.cache();
                        _a = expect;
                        return [4 /*yield*/, cache.getItem('foo')];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.equal(null);
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    describe('setItem', function () {
        it('sets an item in storage', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var cache, json, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        cache = sdk.cache();
                        json = { foo: 'bar' };
                        return [4 /*yield*/, cache.setItem('foo', json)];
                    case 1:
                        _c.sent();
                        _a = expect;
                        return [4 /*yield*/, cache.getItem('foo')];
                    case 2:
                        _a.apply(void 0, [_c.sent()]).to.deep.equal(json);
                        return [4 /*yield*/, cache.removeItem('foo')];
                    case 3:
                        _c.sent();
                        _b = expect;
                        return [4 /*yield*/, cache.getItem('foo')];
                    case 4:
                        _b.apply(void 0, [_c.sent()]).to.equal(null);
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    describe('clean', function () {
        it('removes all prefixed entries from cache leaving non-prefixed ones untouched', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var cache, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        cache = sdk.cache();
                        cache['_externals'].localStorage.setItem('rc-foo', '"foo"');
                        cache['_externals'].localStorage.setItem('foo', '"foo"');
                        _a = expect;
                        return [4 /*yield*/, cache.getItem('foo')];
                    case 1:
                        _a.apply(void 0, [_c.sent()]).to.equal('foo');
                        return [4 /*yield*/, cache.clean()];
                    case 2:
                        _c.sent();
                        _b = expect;
                        return [4 /*yield*/, cache.getItem('foo')];
                    case 3:
                        _b.apply(void 0, [_c.sent()]).to.equal(null);
                        // prettier-ignore
                        expect(cache['_externals'].localStorage.getItem('foo')).to.equal('"foo"');
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    describe('prefix', function () {
        it('different prefixes dont overlap', asyncTest(function (sdk1) { return __awaiter(void 0, void 0, void 0, function () {
            var sdk2, cache1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sdk2 = createSdk({ cachePrefix: 'foo' });
                        cache1 = sdk1.cache();
                        return [4 /*yield*/, cache1.setItem('foo', { foo: 'bar' })];
                    case 1:
                        _b.sent();
                        _a = expect;
                        return [4 /*yield*/, sdk2.cache().getItem('foo')];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.equal(null);
                        return [2 /*return*/];
                }
            });
        }); }));
    });
});
//# sourceMappingURL=Cache-spec.js.map