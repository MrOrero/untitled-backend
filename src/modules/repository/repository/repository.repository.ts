import { AbstractRepo } from "src/libs/db/AbstractRepo";
import RepositoryModel, { Repository } from "../model/repository.model";

export class RepositoryRepo extends AbstractRepo<Repository>{
    constructor() {
        super(RepositoryModel.getModel());
      }    
}