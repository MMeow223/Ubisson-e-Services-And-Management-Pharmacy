"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomePage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var HomePage = /** @class */ (function () {
    function HomePage() {
        this.user = 'User';
    }
    HomePage.prototype.ngOnInit = function () { };
    // startScan = async () => {
    //   // Check camera permission
    //   // This is just a simple example, check out the better checks below
    //   await BarcodeScanner.checkPermission({ force: true });
    //   // make background of WebView transparent
    //   // note: if you are using ionic this might not be enough, check below
    //   BarcodeScanner.hideBackground();
    //   const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    //   // if the result has content
    //   if (result.hasContent) {
    //     console.log(result.content); // log the raw scanned content
    //   }
    // };
    // stopScan = () => {
    //   BarcodeScanner.showBackground();
    //   BarcodeScanner.stopScan();
    // };
    // ngOnDestroy(): void {
    //   this.stopScan();
    // }
    HomePage.prototype.logout = function () {
        localStorage.removeItem('token');
        window.location.reload();
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
            standalone: true,
            imports: [angular_1.IonicModule]
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
