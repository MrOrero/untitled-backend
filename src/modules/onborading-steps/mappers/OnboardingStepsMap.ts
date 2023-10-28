import UploadDocumentModel, { UploadDocument } from "src/modules/steps-configuration/models/upload-document.model";
import { OnboardingStepsDomain } from "../domain/OnboardingStepsDomain";
import { OnboardingStep } from "../model/onboarding-steps.model";
import { SignDocument } from "src/modules/steps-configuration/models/sign-document.model";

export class OnboardingStepsMap{
    public static async toPersistence(onboardingStep: OnboardingStepsDomain): Promise<OnboardingStep> {

        if(onboardingStep.type === 'Upload'){
            const uploadDocumentModel = UploadDocumentModel.getModel();

            const newUploadDocument: UploadDocument = {
                title: onboardingStep.data.title,
                overview: onboardingStep.data.overview,
                documents: onboardingStep.data.documents,
            };
    
            const uploadedDocument = new uploadDocumentModel(newUploadDocument);
            await uploadedDocument.save();

            return {
                type: onboardingStep.type,
                data: uploadedDocument._id,
            };
        }

        if(onboardingStep.type === 'sign'){
            const signDocumentModel = UploadDocumentModel.getModel();

            const newSignDocument: SignDocument = {
                title: onboardingStep.data.title,
                overview: onboardingStep.data.overview,
                documents: onboardingStep.data.documents,
                signedDocuments: onboardingStep.data.signedDocuments,
            };
    
            const signedDocument = new signDocumentModel(newSignDocument);
            signedDocument.save();

            return {
                type: onboardingStep.type,
                data: signedDocument._id,
            };
        }
    }
}