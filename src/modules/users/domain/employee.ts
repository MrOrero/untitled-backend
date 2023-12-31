import { IsString, IsNotEmpty } from 'class-validator';
import { BaseAggregateRoot } from 'src/libs/domain/BaseAggregateRoot';
import { Guard } from 'src/libs/domain/logic/Guard';
import { Result } from 'src/libs/domain/logic/Result';

export interface EmployeeProps {
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  role: string;
  department: string;
  jobTitle: string;
  hasChangedPassword?: boolean;
}

export class EmployeeValidation {
  @IsString()
  @IsNotEmpty()
  companyId: string;

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

  @IsString()
  @IsNotEmpty()
  jobTitle: string;
}

export class EmployeeDomain extends BaseAggregateRoot<EmployeeProps> {
  private constructor(props: EmployeeProps) {
    super(props);
  }

  get id(): string {
    return this._id.toString();
  }

  get companyId(): string {
    return this.props.companyId;
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

  get jobTitle(): string {
    return this.props.jobTitle;
  }

  get hasChangedPassword(): boolean {
    return this.props.hasChangedPassword;
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
