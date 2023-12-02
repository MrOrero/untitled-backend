import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeService } from 'src/modules/users/services/employee.service';
import { FirebaseStorage } from 'src/libs/infra/firebase-storage/firebase-storage';
import { InjectionTokens } from 'src/libs/common/types/enum';
import { RepositoryRepo } from '../repository/repository.repository';

@Injectable()
export class RepositoryService {
  @Inject(InjectionTokens.RepositoryRepo)
  private readonly repositoryRepo: RepositoryRepo;

  async addDocument(doc: Express.Multer.File, companyId: string) {
    const res = await FirebaseStorage.uploadFile(doc);

    const document = await this.repositoryRepo.save({
      ...res,
      companyId,
    });

    return document;
  }

  async getAllDocuments(companyId: string) {
    const documents = await this.repositoryRepo.find({ companyId });

    if (!documents) {
      throw new NotFoundException('No document found');
    }

    return documents;
  }
}
