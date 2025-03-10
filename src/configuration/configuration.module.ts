import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { database, jwt } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database, jwt],
      envFilePath: '../.env',
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
