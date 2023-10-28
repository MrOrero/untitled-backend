import { ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";
import { SignDocument } from "src/modules/steps-configuration/models/sign-document.model";
import { UploadDocument } from "src/modules/steps-configuration/models/upload-document.model";

export function IsValidDataForType(validationOptions?: ValidationOptions) {
    return function(object: any, propertyName: string) {
      registerDecorator({
        name: 'isValidDataForType',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
              const type = args.object['type'];
              return isDataValidForType(type, value);
          },
        },
      });
    };
  }

  function isDataValidForType(type: string, data: any): boolean {
    if (type === 'sign') {
      const signDocument: SignDocument = data;
      if (
        signDocument &&
        typeof signDocument.title === 'string' &&
        typeof signDocument.overview === 'string' &&
        Array.isArray(signDocument.documents) &&
        signDocument.documents.every(
          (doc) =>
            doc &&
            typeof doc.name === 'string' &&
            typeof doc.url === 'string'
        ) &&
        Array.isArray(signDocument.signedDocuments) &&
        signDocument.signedDocuments.every(
          (signedDoc) =>
            signedDoc &&
            typeof signedDoc.name === 'string' &&
            typeof signedDoc.url === 'string'
        )
      ) {
        return true;
      }
    } else if (type === 'Upload') {
      const UploadDocument: UploadDocument = data;
        if (
            UploadDocument &&
            typeof UploadDocument.title === 'string' &&
            typeof UploadDocument.overview === 'string' &&
            Array.isArray(UploadDocument.documents) &&
            UploadDocument.documents.every(
            (doc) =>
                doc &&
                typeof doc.name === 'string' 
            )
        ) {
            return true;
        }
    }
    return false;
  }
  