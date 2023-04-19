"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const user_repository_1 = require("./user.repository");
let AuthService = class AuthService {
    constructor(jwtService, userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    async validateUser(username, password) {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            return null;
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (passwordMatched) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async forgotPassword(username) {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            return null;
        }
        const token = 'gerar_token_aqui';
        const emailSent = await this.sendPasswordRecoveryEmail(user.email, token);
        if (emailSent) {
            return { message: 'E-mail enviado com sucesso' };
        }
        return null;
    }
    async sendPasswordRecoveryEmail(email, token) {
        return true;
    }
    async resetPassword(token, password) {
        const user = await this.userRepository.findOne({
            where: { resetPasswordToken: token },
            select: ['id', 'email', 'username'],
        });
        if (!user) {
            throw new Error('Token inválido');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await this.userRepository.save(user);
        await this.userRepository.save(user);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_repository_1.UserRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map