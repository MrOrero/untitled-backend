import { AbstractRepo } from "src/libs/db/AbstractRepo";
import CheckListModel, { CheckList } from "../models/checklist.model";

export class CheckListRepo extends AbstractRepo<CheckList>{
    constructor() {
        super(CheckListModel.getModel());
      }
    
}