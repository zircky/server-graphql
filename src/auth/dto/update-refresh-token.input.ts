import { IsString } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateRefreshTokenInput {
	@Field()
	@IsString()
	refreshToken: string
}
