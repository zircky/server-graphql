import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { ProductModule } from './product/product.module'
import { CategoryModule } from './category/category.module'
import { ReviewModule } from './review/review.module'
import { OrderModule } from './order/order.module'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma.service'
import { PaginationModule } from './pagination/pagination.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: true,
			autoSchemaFile: './src/schema.gql'
		}),
		ConfigModule.forRoot(),
		UserModule,
		AuthModule,
		ProductModule,
		CategoryModule,
		ReviewModule,
		OrderModule,
		PaginationModule,
		StatisticsModule
	],
	controllers: [],
	providers: [PrismaService]
})
export class AppModule {}
