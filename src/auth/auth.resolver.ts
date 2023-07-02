import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { CreateAuthInput } from './dto/create-auth.input'
import { UpdateRefreshTokenInput } from './dto/update-refresh-token.input'
import { HttpCode, UsePipes, ValidationPipe } from '@nestjs/common'
import { User } from '../user/entities/user.entity'

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(returns => User)
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	async login(@Args('input') input: CreateAuthInput) {
		return this.authService.login(input)
	}

	@Mutation(returns => User)
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	async getNewTokens(@Args('input') input: UpdateRefreshTokenInput) {
		return this.authService.getNewTokens(input.refreshToken)
	}

	@Mutation(returns => User)
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	async register(@Args('input') input: CreateAuthInput) {
		return this.authService.register(input)
	}
}
