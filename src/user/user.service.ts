import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma } from '@prisma/client'
import { returnUserObject } from './return-user.object'
import { CreateUserInput } from './dto/create-user.input'
import { hash } from 'argon2'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.user.findMany({ select: returnUserObject })
	}
	async byId(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
			select: {
				...returnUserObject,
				favorites: {
					select: {
						id: true,
						name: true,
						price: true,
						images: true,
						slug: true,
						category: {
							select: {
								slug: true
							}
						},
						reviews: true
					}
				},
				...selectObject
			}
		})
		if (!user) {
			throw new Error('User not found')
		}
		return user
	}
	async updateProfile(id: number, input: CreateUserInput) {
		const isSameUser = await this.prisma.user.findUnique({
			where: { email: input.email }
		})
		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Email already in use')
		const user = await this.byId(id)
		return this.prisma.user.update({
			where: { id },
			data: {
				email: input.email,
				name: input.name,
				avatarPath: input.avatarPath,
				phone: input.phone,
				password: input.password ? await hash(input.password) : user.password
			}
		})
	}

	async toggleFavorite(userId: number, productId: number) {
		const user = await this.byId(userId)

		if (!user) throw new NotFoundException('User not found!')

		const isExists = user.favorites.some(product => product.id === productId)

		await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				favorites: {
					[isExists ? 'disconnect' : 'connect']: {
						id: productId
					}
				}
			}
		})
		return {
			message: 'Success'
		}
	}
}
