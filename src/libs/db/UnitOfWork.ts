// import { connection } from './DatabaseModule';

// export class UnitOfWork {
//   public async startTransaction(
//     level?:
//       | 'READ UNCOMMITTED'
//       | 'READ COMMITTED'
//       | 'REPEATABLE READ'
//       | 'SERIALIZABLE',
//   ): Promise<void> {
//     level
//       ? await connection.startTransaction(level)
//       : await writeConnection.startTransaction();
//   }

//   public async commitTransaction(): Promise<void> {
//     await writeConnection.commitTransaction();
//   }

//   public async rollbackTransaction(): Promise<void> {
//     await writeConnection.rollbackTransaction();
//   }

//   //provided all the transactions are write we dont need this
//   //   public getRepository<T>(target: EntityTarget<T>): Repository<T> {
//   //     return this.dataSource.manager.getRepository(target);
//   //   }

//   async complete(work: () => void) {
//     try {
//       await work();
//       await this.commitTransaction();
//     } catch (error) {
//       await this.rollbackTransaction();
//       throw error;
//     } finally {
//       await writeConnection.release();
//     }
//   }
// }
