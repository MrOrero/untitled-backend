import { AbstractRepo } from "src/libs/db/AbstractRepo";
import UploadDocumentModel, { UploadDocument } from "../models/upload-document.model";

export class UploadDocumentRepo extends AbstractRepo<UploadDocument>{
    constructor() {
        super(UploadDocumentModel.getModel());
      }
    
}