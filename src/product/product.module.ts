import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductResolver } from './product.resolver'
import { PrismaService } from '../prisma.service'
import { PaginationService } from '../pagination/pagination.service'
import { PaginationModule } from '../pagination/pagination.module'
import { CategoryModule } from '../category/category.module'

@Module({
	providers: [
		ProductResolver,
		ProductService,
		PrismaService,
		PaginationService
	],
	imports: [PaginationModule, CategoryModule]
})
export class ProductModule {}
