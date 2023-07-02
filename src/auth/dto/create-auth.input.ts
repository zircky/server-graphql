import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

@InputType()
export class CreateAuthInput {
	@Field()
	@IsEmail()
	email: string

	@Field()
	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	@IsString()
	password: string

	@Field()
	@IsOptional()
	@IsString()
	avatarPath?: string
}
