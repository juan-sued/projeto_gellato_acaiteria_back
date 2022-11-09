"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const chalk_1 = __importDefault(require("chalk"));
const PORT = process.env.PORT || '4000';
app_1.default.listen(PORT, () => {
    console.log(chalk_1.default.cyan('Servidor rodando na porta ' + PORT));
});
//# sourceMappingURL=server.js.map