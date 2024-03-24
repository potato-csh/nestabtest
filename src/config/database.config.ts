import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const database = (): TypeOrmModuleOptions => ({
    type: 'mysql',
    charset: 'utf8mb4',
    logging: ['error'],
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'nestabtest',
    synchronize: true,
    autoLoadEntities: true,
});
