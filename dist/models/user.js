"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUserByEmail = getUserByEmail;
exports.getUserById = getUserById;
const db_1 = __importDefault(require("../db"));
function createUser(name, email, googleId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('INSERT INTO Users (name, email, google_id) VALUES ($1, $2, $3) RETURNING *', [name, email, googleId]);
        return result.rows[0];
    });
}
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('SELECT * FROM Users WHERE email = $1', [email]);
        return result.rows[0];
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('SELECT * FROM Users WHERE id = $1', [id]);
        return result.rows[0];
    });
}
