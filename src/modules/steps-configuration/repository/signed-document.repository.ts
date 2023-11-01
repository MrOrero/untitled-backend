import { AbstractRepo } from "src/libs/db/AbstractRepo";
import SignDocumentModel, { SignDocument } from "../models/sign-document.model";

export class SignedDocumentRepo extends AbstractRepo<SignDocument>{
    constructor() {
        super(SignDocumentModel.getModel());
      }
    
}