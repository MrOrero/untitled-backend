import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './libs/db/DatabaseModule';
import { OnboardingWorkflowModule } from './modules/onboarding-workflow/onboarding-workflow.module';
import { OnboardingStepsModule } from './modules/onborading-steps/onboarding-steps.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { RepositoryModule } from './modules/repository/repository.module';

@Module({
  imports: [
    DatabaseModule,
    OnboardingWorkflowModule,
    OnboardingStepsModule,
    UsersModule,
    AuthModule,
    RepositoryModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
