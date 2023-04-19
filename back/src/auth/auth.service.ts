import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';
import { v4 as uuidv4 } from 'uuid';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
    private userRepository: UserRepository,) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Aqui você deve buscar o usuário pelo nome de usuário na sua base de dados
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      return null;
    }

    // Aqui você deve comparar a senha digitada pelo usuário com a senha na base de dados
    const passwordMatched = await bcrypt.compare(password, user.password);

    if (passwordMatched) {
      // Se a senha estiver correta, retorna o usuário sem a senha
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(username: string) {
    // Aqui você deve buscar o usuário pelo nome de usuário na sua base de dados
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      return null;
    }

    // Aqui você deve gerar um token para recuperar a senha do usuário
    const token = 'gerar_token_aqui';

    // Aqui você deve enviar um e-mail para o usuário com o link para recuperar a senha
    const emailSent = await this.sendPasswordRecoveryEmail(user.email, token);

    if (emailSent) {
      return { message: 'E-mail enviado com sucesso' };
    }

    return null;
  }

  async sendPasswordRecoveryEmail(email: string, token: string) {
    // Aqui você deve enviar o e-mail para o usuário com o link para recuperar a senha
    // Utilize uma biblioteca de envio de e-mails, como o nodemailer
    return true;
  }

  async resetPassword(token: string, password: string): Promise<void> {
    // Busca o usuário pelo token de recuperação de senha

    type UserFindOptions = FindOneOptions<User> & {
      resetPasswordToken?: string;
    };
    const user = await this.userRepository.findOne<UserFindOptions>({
      where: {
        resetPasswordToken: token,
      },
    });

    if (!user) {
      throw new Error('Token inválido');
    }

    // Gera o hash da nova senha e atualiza a senha do usuário
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Limpa o token de recuperação de senha
    await this.userRepository.save(user);

    // Salva as alterações no banco de dados
    await this.userRepository.save(user);
  }
}
