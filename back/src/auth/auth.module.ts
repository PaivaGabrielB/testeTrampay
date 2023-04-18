import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Endpoint para recuperação de senha
  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('password') password: string,
  ) {
    // Chama o serviço para redefinir a senha do usuário
    await this.authService.resetPassword(token, password);
  }

  // Outros endpoints do controller...
}
