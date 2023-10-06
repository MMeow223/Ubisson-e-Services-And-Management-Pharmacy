"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.__esModule = true;
exports.PageLoginPage = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var apiHelper_1 = require("../helper/apiHelper");
var PageLoginPage = /** @class */ (function () {
    function PageLoginPage(fb, navCtrl) {
        this.fb = fb;
        this.navCtrl = navCtrl;
        this.screen = 'signin';
        this.isLoading = false;
        if (localStorage.getItem('token') != null) {
            this.navCtrl.navigateForward("/home");
        }
        this.loginFormData = this.fb.group({
            organizationId: ['', [forms_1.Validators.required]],
            username: ['', [forms_1.Validators.required]],
            password: ['', [forms_1.Validators.required]]
        });
        this.forgetFormData = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]]
        });
    }
    PageLoginPage.prototype.ngOnInit = function () { };
    PageLoginPage.prototype.change = function (event) {
        this.screen = event;
    };
    PageLoginPage.prototype.login = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.loginFormData.valid) return [3 /*break*/, 2];
                        this.isLoading = true;
                        return [4 /*yield*/, apiHelper_1.loginHelper((_a = this.loginFormData.get('organizationId')) === null || _a === void 0 ? void 0 : _a.value, (_b = this.loginFormData.get('username')) === null || _b === void 0 ? void 0 : _b.value, (_c = this.loginFormData.get('password')) === null || _c === void 0 ? void 0 : _c.value)];
                    case 1:
                        _d.sent();
                        if (localStorage.getItem('token') != null) {
                            this.navCtrl.navigateForward("/home");
                        }
                        else {
                            alert('Invalid credentials');
                            this.isLoading = false;
                        }
                        _d.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    PageLoginPage.prototype.forget = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.forgetFormData.valid) return [3 /*break*/, 2];
                        this.isLoading = true;
                        return [4 /*yield*/, apiHelper_1.forgotPasswordHelper((_a = this.forgetFormData.get('email')) === null || _a === void 0 ? void 0 : _a.value)];
                    case 1:
                        response = _b.sent();
                        alert('If your account exists, you will receive an email with instructions on how to reset your password.');
                        this.isLoading = false;
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    PageLoginPage.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    PageLoginPage = __decorate([
        core_1.Component({
            selector: 'app-page-login',
            templateUrl: './page-login.page.html',
            styleUrls: ['./page-login.page.scss'],
            standalone: true,
            imports: [angular_1.IonicModule, common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule]
        })
    ], PageLoginPage);
    return PageLoginPage;
}());
exports.PageLoginPage = PageLoginPage;
