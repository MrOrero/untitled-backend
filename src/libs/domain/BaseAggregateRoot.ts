import { AggregateRoot } from '@nestjs/cqrs';
import { UniqueEntityID } from './UniqueEntityID';

const isBaseAggregate = (v: any): v is BaseAggregateRoot<any> => {
  return v instanceof BaseAggregateRoot;
};

export abstract class BaseAggregateRoot<T> extends AggregateRoot {
  protected readonly _id: UniqueEntityID;
  public readonly props: T;

  constructor(props: T, id?: UniqueEntityID) {
    super();
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  public equals(object?: BaseAggregateRoot<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isBaseAggregate(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
