"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const app_1 = __importDefault(require("./app"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
// Colocando certificado ssl na api
const credentials = {
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, '/cert/key.pem')),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, '/cert/cert.pem')),
};
const PORT = parseInt(`${process.env.PORT || 4001}`);
// cria-se o app pelo node
// eslint-disable-next-line no-unused-vars
const server = https_1.default.createServer(credentials, app_1.default).listen(PORT, () => {
    console.clear();
    console.log(`Server running at ${PORT}.`);
});
