// import {
//   Repository,
//   EntityManager,
//   EntityTarget,
//   ObjectLiteral,
// } from 'typeorm';

// export interface IUnitOfWork {
//   readonly startTransaction: (
//     level?:
//       | 'READ UNCOMMITTED'
//       | 'READ COMMITTED'
//       | 'REPEATABLE READ'
//       | 'SERIALIZABLE',
//   ) => Promise<void>;
//   readonly commitTransaction: () => Promise<void>;
//   readonly rollbackTransaction: () => Promise<void>;
//   readonly isTransactionActive: boolean;
//   readonly manager: EntityManager;
//   readonly getRepository: <T extends ObjectLiteral>(
//     target: EntityTarget<T>,
//   ) => Repository<T>;

//   complete(work: () => void): Promise<void>;
// }
