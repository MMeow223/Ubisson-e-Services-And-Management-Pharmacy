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
exports.PageRewardDetailsPage = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var apiHelper_1 = require("src/app/helper/apiHelper");
var PageRewardDetailsPage = /** @class */ (function () {
    function PageRewardDetailsPage() {
        this.page_name = 'Reward';
        this.claimed = false;
    }
    PageRewardDetailsPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, apiHelper_1.loginHelper('2', 'adelinelim', '12345678')];
                    case 1:
                        _b.sent();
                        // read the url and get the id
                        // var url = window.location.href;
                        // var param = url.substring(url.lastIndexOf('=') + 1);
                        // console.log(param);
                        // this.reward_id = param.charAt(0).toUpperCase() + param.slice(1);
                        this.reward_id = 5;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        _a = this;
                        return [4 /*yield*/, this.getRewards(this.reward_id)];
                    case 3:
                        _a.rewards = _b.sent();
                        console.log(this.rewards);
                        this.page_name = this.rewards.reward_name;
                        this.title = this.rewards.reward_name;
                        this.description = this.rewards.reward_description;
                        this.term_condition = this.rewards.reward_term_condition;
                        this.point = this.rewards.required_points;
                        this.image = this.rewards.image;
                        this.type = this.rewards.type;
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.error('Error:', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PageRewardDetailsPage.prototype.preloadReward = function () {
        this.title = 'This is title';
        this.description = 'This is description';
        this.term_condition = 'This is term condition';
    };
    PageRewardDetailsPage.prototype.getRewards = function (reward_id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, apiHelper_1.authorisedFetch("v1/patient/get/one-reward", 'GET', { id: reward_id })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, (response === null || response === void 0 ? void 0 : response.data)];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data.result];
                    case 3:
                        error_2 = _a.sent();
                        throw "page-reward-detail.page.ts -> getRewards " + error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PageRewardDetailsPage.prototype.redeem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, apiHelper_1.authorisedFetch("v1/patient/put/claim-reward", 'PUT', { id: this.reward_id })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, (response === null || response === void 0 ? void 0 : response.data)];
                    case 2:
                        data = _a.sent();
                        if (data.status == 200) {
                            // this.claimed = true;
                            this.afterClaimed();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        throw "page-reward-detail.page.ts -> redeem " + error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PageRewardDetailsPage.prototype.afterClaimed = function () {
        console.log('afterClaimed');
        this.claimed = true;
        var claimBtn = document.getElementById('claim-btn');
        if (claimBtn !== null) {
            claimBtn.setAttribute('disabled', 'true');
            claimBtn.innerHTML = 'Claimed';
            claimBtn.setAttribute('color', 'success');
        }
    };
    PageRewardDetailsPage = __decorate([
        core_1.Component({
            selector: 'app-page-reward-details',
            templateUrl: './page-reward-details.page.html',
            styleUrls: ['./page-reward-details.page.scss'],
            standalone: true,
            imports: [angular_1.IonicModule, common_1.CommonModule, forms_1.FormsModule]
        })
    ], PageRewardDetailsPage);
    return PageRewardDetailsPage;
}());
exports.PageRewardDetailsPage = PageRewardDetailsPage;
