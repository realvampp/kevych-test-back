import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigurationModule } from './configuration/configuration.module';
import { AuthModule } from './modules/auth/auth.module';
import { StationsModule } from './modules/stations/stastions.module';
import { RoutesModule } from './modules/routes/routes.module';

@Module({
  imports: [
    ConfigurationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get<TypeOrmModuleOptions>('database');
        if (!dbConfig) {
          throw new Error('Database configuration is missing');
        }
        return dbConfig;
      },
    }),
    AuthModule,
    StationsModule,
    RoutesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
