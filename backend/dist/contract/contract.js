"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = exports.web3 = void 0;
const web3_1 = __importDefault(require("web3"));
const ABI_json_1 = __importDefault(require("../ABI.json"));
//https://sepolia.infura.io/v3/e0de627bc9634195a545c2cee7989ea8
//
const web3 = new web3_1.default("https://eth-sepolia.g.alchemy.com/v2/lcgFyooUpazgR8K6EbRoqVof7_7exCDM");
exports.web3 = web3;
const contractAddress = "0xa2f56d5bca5b8afd90fc2e309dfb41eff9840123";
const contract = new web3.eth.Contract(ABI_json_1.default, contractAddress);
exports.contract = contract;
//# sourceMappingURL=contract.js.map