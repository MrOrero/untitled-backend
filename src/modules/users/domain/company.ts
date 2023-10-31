import { IsString, IsNotEmpty } from 'class-validator';
import { BaseAggregateRoot } from 'src/libs/domain/BaseAggregateRoot';
import { Guard } from 'src/libs/domain/logic/Guard';
import { Result } from 'src/libs/domain/logic/Result';

export interface CompanyProps {
  name: string;
  address: string;
  industry: string;
  email: string;
  taxId: string;
  password: string;
}

export class CompanyValidation {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  taxId: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CompanyDomain extends BaseAggregateRoot<CompanyProps> {
  private constructor(props: CompanyProps) {
    super(props);
  }

  get id(): string {
    return this._id.toString();
  }

  get name(): string {
    return this.props.name.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  get address(): string {
    return this.props.address;
  }

  get industry(): string {
    return this.props.industry;
  }

  get email(): string {
    return this.props.email;
  }

  get taxId(): string {
    return this.props.taxId;
  }

  get password(): string {
    return this.props.password;
  }

  public static create(props: CompanyProps): Result<CompanyDomain> {
    const guardResult = Guard.validate<CompanyValidation, CompanyProps>(
      CompanyValidation,
      props,
    );

    if (guardResult) {
      return Result.fail<CompanyDomain>(guardResult.errMsg);
    }
    const company = new CompanyDomain({
      ...props,
    });

    return Result.ok<CompanyDomain>(company);
  }
}
