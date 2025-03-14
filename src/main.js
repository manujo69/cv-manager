"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var App_vue_1 = __importDefault(require("@/App.vue"));
var router_1 = __importDefault(require("./router"));
var store_1 = __importDefault(require("./store"));
var app = (0, vue_1.createApp)(App_vue_1.default);
app.use(router_1.default);
app.use(store_1.default);
app.mount('#app');
