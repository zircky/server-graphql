import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/user/user.module'
import { JwtStrategy } from './jwt.strategy'
import { getJwtConfig } from 'src/config/jwt.config'

@Module({
	providers: [
		AuthResolver,
		JwtStrategy,
		AuthService,
		PrismaService,
		UserService
	],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		UserModule
	]
})
export class AuthModule {}
