import { IsString, IsNotEmpty } from 'class-validator';
import { BaseAggregateRoot } from 'src/libs/domain/BaseAggregateRoot';
import { Guard } from 'src/libs/domain/logic/Guard';
import { Result } from 'src/libs/domain/logic/Result';

export interface EmployeeProps {
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  role: string;
  department: string;
}

export class EmployeeValidation {
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  department: string;
}

export class EmployeeDomain extends BaseAggregateRoot<EmployeeProps> {
  private constructor(props: EmployeeProps) {
    super(props);
  }

  get id(): string {
    return this._id.toString();
  }

  get company(): string {
    return this.props.company;
  }

  get firstName(): string {
    return this.props.firstName.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  get lastName(): string {
    return this.props.lastName.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get address(): string {
    return this.props.address;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  get role(): string {
    return this.props.role;
  }

  get department(): string {
    return this.props.department;
  }

  public static create(props: EmployeeProps): Result<EmployeeDomain> {
    const guardResult = Guard.validate<EmployeeValidation, EmployeeProps>(
      EmployeeValidation,
      props,
    );

    if (guardResult) {
      return Result.fail<EmployeeDomain>(guardResult.errMsg);
    }
    const employee = new EmployeeDomain({
      ...props,
    });

    return Result.ok<EmployeeDomain>(employee);
  }
}
