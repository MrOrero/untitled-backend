import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

export class Guard {
  protected static extractAndThrowError(errors: ValidationError[]) {
    if (errors.length > 0) {
      if (errors[0].children && errors[0].children.length > 0) {
        return Guard.extractAndThrowError(errors[0].children[0].children);
      }

      const e = errors[0];
      const key = Object.keys(e.constraints || {})[0];

      const payload = {
        property: e.property,
        error: key ? e.constraints[key] : '',
      };

      return {
        fields: payload,
        errMsg: payload.error,
      };
    } else {
      return null;
    }
  }

  protected static validateAndError(data: any) {
    const errors = validateSync(data, {
      whitelist: true,
    });

    const response = Guard.extractAndThrowError(errors);

    if (response == null) {
      return;
    }

    return { errMsg: response.errMsg };
  }

  static validate<C, P>(validationClass: ClassConstructor<C>, props: P) {
    const validatedProps = plainToInstance(validationClass, props, {
      enableImplicitConversion: true,
    });

    return Guard.validateAndError(validatedProps);
  }
}
