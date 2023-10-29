import { Model } from 'mongoose';
import { Company } from 'src/modules/users/model/company.model';
import { Employee } from 'src/modules/users/model/employee.model';

export abstract class AbstractRepo<T> {
  constructor(private readonly model: Model<T>) {}

  async save(entity: T): Promise<T> {
    const savedEntity = await this.model.create(entity);
    savedEntity.save();
    return savedEntity;
  }

  async exists(where: Record<string, any>): Promise<boolean> {
    const count = await this.model.countDocuments(where);
    return count > 0;
  }

  async findOne(where: Record<string, any>) {
    const entity = await this.model.findOne(where).exec();
    return entity;
  }
  async findCompanyByEmail(email: string): Promise<Company | null> {
    const company = await this.model.findOne({ email }).exec();
    return company as unknown as Company | null;
  }

  async findEmployeeByEmail(email: string): Promise<Employee | null> {
    const employee = await this.model.findOne({ email }).exec();
    return employee as unknown as Employee | null;
  }

  async findById(id: string) {
    const entity = await this.model.findById(id).exec();
    return entity;
  }

  async findOneAndUpdate(
    where: Record<string, any>,
    partialEntity: Record<string, any>,
  ) {
    const updatedEntity = await this.model
      .findOneAndUpdate(where, partialEntity, { new: true })
      .exec();
    if (!updatedEntity) {
      console.warn('Entity not found with where', where);
      return null; // Or throw an error
    }
    return updatedEntity;
  }

  async findPaginated(
    pageSize = 10,
    currentPage = 1,
    where: Record<string, any> = {},
    relation?: any,
  ): Promise<{
    data: T[];
    pagination: PaginatedData;
  }> {
    const offset = (currentPage - 1) * pageSize;
    const [data, total] = await Promise.all([
      this.model
        .find(where)
        .limit(pageSize)
        .skip(offset)
        .populate(relation)
        .exec(),
      this.model.countDocuments(where),
    ]);
    return {
      data,
      pagination: {
        total,
        pageSize,
        currentPage,
      },
    };
  }

  async find(where: Record<string, any>, order: Record<string, any> = {}) {
    return this.model.find(where).sort(order).exec();
  }

  async findOneAndDelete(
    where: Record<string, any>,
  ): Promise<{ status: boolean }> {
    const res = await this.model.deleteOne(where).exec();
    return {
      status: res.deletedCount > 0,
    };
  }

  // async search(
  //   keyword: string,
  //   columns: string[],
  //   pageSize = 10,
  //   currentPage = 1
  // ): Promise<{ data: T[], pagination: { total: number, pageSize: number, currentPage: number } }> {
  //   const whereConditions = columns.map(column => ({ [column]: { $regex: new RegExp(keyword, 'i') } }));
  //   const offset = (currentPage - 1) * pageSize;

  //   const [data, total] = await Promise.all([
  //     this.model.find({ $or: whereConditions }).limit(pageSize).skip(offset).exec(),
  //     this.model.countDocuments({ $or: whereConditions }),
  //   ]);

  //   return {
  //     data,
  //     pagination: {
  //       total,
  //       pageSize,
  //       currentPage,
  //     },
  //   };
  // }

  async count(): Promise<number> {
    return this.model.countDocuments({});
  }
}
