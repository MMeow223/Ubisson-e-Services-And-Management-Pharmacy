"use strict";
exports.__esModule = true;
exports.routes = void 0;
var auth_guard_1 = require("./guards/auth.guard");
exports.routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'page-login',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('./page-login/page-login.page'); }).then(function (m) { return m.PageLoginPage; });
        }
    },
    {
        path: 'home',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./home/home.page'); }).then(function (m) { return m.HomePage; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'page-prescription-scan',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('./page-prescription-scan/page-prescription-scan.page'); }).then(function (m) { return m.PagePrescriptionScanPage; });
        },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'page-prescription-details',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('./page-prescription-details/page-prescription-details.page'); }).then(function (m) { return m.PagePrescriptionDetailsPage; });
        },
        canActivate: [auth_guard_1.AuthGuard]
    },
];
