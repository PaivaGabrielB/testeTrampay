import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    resetPassword(token: string, password: string): Promise<void>;
}
