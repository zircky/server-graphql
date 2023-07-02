import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { CreateAuthInput } from './dto/create-auth.input'
import { hash, verify } from 'argon2'
import { faker } from '@faker-js/faker'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private userService: UserService
	) {}

	async login(input: CreateAuthInput) {
		const user = await this.vallidateUser(input)
		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid shrefre token')

		const user = await this.userService.byId(result.id, {
			isAdmin: true
		})

		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async register(input: CreateAuthInput) {
		const oldUser = await this.prisma.user.findFirst({
			where: {
				email: input.email
			}
		})

		if (oldUser) throw new BadRequestException('User already exists')

		const user = await this.prisma.user.create({
			data: {
				email: input.email,
				name: faker.name.firstName(),
				avatarPath: input.avatarPath,
				phone: faker.phone.number('+7 (###) ###-####'),
				password: await hash(input.password)
			}
		})
		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	private async issueTokens(userId: number) {
		const data = { id: userId }

		const accessToken = await this.jwt.sign(data, {
			expiresIn: '1h'
		})
		const refreshToken = await this.jwt.sign(data, {
			expiresIn: '7d'
		})
		return { accessToken, refreshToken }
	}

	private returnUserFields(user: Partial<User>) {
		return {
			id: user.id,
			email: user.email,
			isAdmin: user.isAdmin
		}
	}

	private async vallidateUser(input: CreateAuthInput) {
		const user = await this.prisma.user.findFirst({
			where: {
				email: input.email
			}
		})
		if (!user) throw new NotFoundException('User not found')

		const isValid = await verify(user.password, input.password)

		if (!isValid) throw new UnauthorizedException('Invalid password')

		return user
	}
}
