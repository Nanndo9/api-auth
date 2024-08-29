"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const data_source_1 = require("./data-source");
const route_1 = __importDefault(require("./routes/route"));
const error_1 = require("./middlewares/error");
data_source_1.AppDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(route_1.default);
    app.use(error_1.errorMiddleware);
    return app.listen(process.env.PORT, () => {
        console.log("rodando");
    });
});
