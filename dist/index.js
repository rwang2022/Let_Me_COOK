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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const db_1 = __importDefault(require("./db"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
console.log(process.env.GOOGLE_CLIENT_ID);
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, (token, tokenSecret, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const email = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value;
    const name = profile.displayName;
    const googleId = profile.id;
    try {
        let user = yield db_1.default.query('SELECT * FROM users WHERE google_id = $1', [googleId]);
        if (user.rowCount === 0) {
            user = yield db_1.default.query('INSERT INTO users (name, email, google_id) VALUES ($1, $2, $3) RETURNING *', [name, email, googleId]);
        }
        done(null, user.rows[0]);
    }
    catch (err) {
        done(err);
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.default.query('SELECT * FROM users WHERE id = $1', [id]);
        done(null, user.rows[0]);
    }
    catch (err) {
        done(err);
    }
}));
