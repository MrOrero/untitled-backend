import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
import { CheckList } from 'src/modules/steps-configuration/models/checklist.model';
import { SignDocument } from 'src/modules/steps-configuration/models/sign-document.model';
import { UploadDocument } from 'src/modules/steps-configuration/models/upload-document.model';

export function IsValidDataForType(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
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
  if (type === 'UploadDocument') {
    const UploadDocument: UploadDocument = data;
    if (
      UploadDocument &&
      typeof UploadDocument.title === 'string' &&
      typeof UploadDocument.overview === 'string' &&
      Array.isArray(UploadDocument.documents) &&
      UploadDocument.documents.every(
        (doc) => doc && typeof doc.name === 'string',
      )
    ) {
      return true;
    }
  }
  if (type === 'CheckList') {
    const CheckList: CheckList = data;
    if (
      CheckList &&
      typeof CheckList.title === 'string' &&
      typeof CheckList.overview === 'string' &&
      Array.isArray(CheckList.items) &&
      CheckList.items.every(
        (item) =>
          item &&
          typeof item.label === 'string' 
      )
    ) {
      return true;
    }
  }
  return false;
}
