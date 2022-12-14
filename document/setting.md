## Ignore file list
본 프로젝트는 개인 정보 보호를 위해 생략된 파일들이 있습니다.

<br/>

- `config/default.yml`
    ```yml
    server:
      port: 3000

    db:
      type: 'postgres'
      port: 15433
      database: [데이터베이스 이름]

    jwt:
      expiresIn: 3600
  ```

<br/>

- `config/development.yml`
    ```yml
    db:
      host: 'localhost'
      username: [관리자 이름]
      password: [관리자 비밀번호]
      synchronize: true

    jwt:
      secret: [암호화 키]
    ```

<br/>

- `config/production.yml`
    ```yml
    db:
      synchronize: false
    ```

<br/>

- `docker/.env`
    ```
    DB_NAME=[위에서 작성한 dbname]
    DB_USER=[위에서 작성한 username]
    DB_PASSWORD=[위에서 작성한 password]
    POSTGRES_HOME=./postgres
    ```

<br/>

- `docker/docker-compose.yml`
    ```yml
    version: '3.9'
    services:
      database:
        image: postgres
        container_name: [도커 컨테이너 이름]
        environment:
          POSTGRES_DB: "${DB_NAME}"
          POSTGRES_USER: "${DB_USER}"
          POSTGRES_PASSWORD: "${DB_PASSWORD}"
          POSTGRES_INITDB_ARGS: "--encoding=UTF-8 --lc-collate=C"
        ports:
          - 15433:5432
        volumes:
          - "${POSTGRES_HOME}/data/:/var/lib/postgresql/data/"
    ```

<br/>

- `src/auth/jwt.strategy.ts`
    ```typescript
    import { Injectable, UnauthorizedException } from '@nestjs/common';
    import { PassportStrategy } from '@nestjs/passport';
    import { Strategy } from 'passport-jwt';
    import { InjectRepository } from '@nestjs/typeorm';
    import { User } from './user.entity';
    import { UserRepository } from './user.repository';
    import { ExtractJwt } from 'passport-jwt';
    import * as config from 'config';
    import * as process from 'process';

    @Injectable()
    export class JwtStrategy extends PassportStrategy(Strategy) {
        constructor(
            @InjectRepository(User)
            private userRepository: UserRepository,
        ) {
            super({
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            });
        }

        async validate(payload) {
            const { username } = payload;
            const user = await this.userRepository.findOne({
            where: { username: username },
            });

            if (!user) {
            throw new UnauthorizedException();
            }

            return user;
        }
    }
    ```

<br/>

- `src/configs/typeorm.config.ts`
    ```typescript
    import { TypeOrmModuleOptions } from '@nestjs/typeorm';
    import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
    import * as config from 'config';
    import * as process from 'process';

    const dbConfig = config.get('db');
    export const typeormConfig: TypeOrmModuleOptions = {
    //Database Type
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,

    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    namingStrategy: new SnakeNamingStrategy(),

    synchronize: dbConfig.synchronize,
    };
    ```