import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateUserInput {
	@Field()
	@IsEmail()
	email: string

	@Field()
	@IsOptional()
	@IsString()
	password?: string

	@Field()
	@IsOptional()
	@IsString()
	name: string

	@Field()
	@IsOptional()
	@IsString()
	avatarPath: string

	@Field()
	@IsOptional()
	@IsString()
	phone?: string
}
