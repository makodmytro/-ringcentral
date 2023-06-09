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
import { expect, SDK, spy } from './test/test';
describe('RingCentral.SDK', function () {
    it('connects to sandbox', function theTest() {
        return __awaiter(this, void 0, void 0, function () {
            var server, sdk, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(20000);
                        server = SDK.server.sandbox;
                        sdk = new SDK({
                            server: server,
                            clientId: '',
                            clientSecret: '',
                        });
                        return [4 /*yield*/, sdk.platform().get('/restapi/v1.0/status', null, { skipAuthCheck: true })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, sdk.cache().clean()];
                    case 2:
                        _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('connects to production', function theTest() {
        return __awaiter(this, void 0, void 0, function () {
            var server, sdk, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(20000);
                        server = SDK.server.production;
                        sdk = new SDK({
                            server: server,
                            clientId: '',
                            clientSecret: '',
                        });
                        return [4 /*yield*/, sdk.platform().get('/restapi/v1.0', null, { skipAuthCheck: true })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, sdk.cache().clean()];
                    case 2:
                        _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('sets rate limit', function rateLimitTest() {
        return __awaiter(this, void 0, void 0, function () {
            var sdk;
            return __generator(this, function (_a) {
                sdk = new SDK({ handleRateLimit: 60 });
                expect(sdk.platform()['_handleRateLimit']).to.equal(60);
                return [2 /*return*/];
            });
        });
    });
    describe('handleLoginRedirect', function () {
        var sdk = new SDK();
        it('handles hash', function () {
            var s = spy();
            var win = {
                location: { hash: '#foo', origin: 'foo' },
                opener: { postMessage: s },
            };
            SDK.handleLoginRedirect(null, win);
            expect(s.getCalls()[0].args[0]).to.deep.equal({ RCAuthorizationResponse: '#foo' });
            expect(s.getCalls()[0].args[1]).to.equal('foo');
        });
        it('handles query', function () {
            var s = spy();
            var win = {
                location: { search: '?foo' },
                opener: { postMessage: s },
            };
            SDK.handleLoginRedirect('foo', win);
            expect(s.getCalls()[0].args[0]).to.deep.equal({ RCAuthorizationResponse: '?foo' });
            expect(s.getCalls()[0].args[1]).to.equal('foo');
        });
    });
});
//# sourceMappingURL=SDK-spec.js.map