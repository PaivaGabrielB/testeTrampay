import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
export declare class AuthService {
    private readonly jwtService;
    private userRepository;
    constructor(jwtService: JwtService, userRepository: UserRepository);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    forgotPassword(username: string): Promise<{
        message: string;
    }>;
    sendPasswordRecoveryEmail(email: string, token: string): Promise<boolean>;
    resetPassword(token: string, password: string): Promise<void>;
}
