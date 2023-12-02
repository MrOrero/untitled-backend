import { Module } from '@nestjs/common';
import { InjectionTokens } from 'src/libs/common/types/enum';
import { UsersModule } from '../users/users.module';
import { RepositoryService } from './services/repository.service';
import { RepositoryRepo } from './repository/repository.repository';
import { RepositoryController } from './repository.controller';

@Module({
  imports: [UsersModule],
  controllers: [RepositoryController],
  providers: [
    RepositoryService,
    {
      provide: InjectionTokens.RepositoryRepo,
      useClass: RepositoryRepo,
    },
  ],
})
export class RepositoryModule {}
