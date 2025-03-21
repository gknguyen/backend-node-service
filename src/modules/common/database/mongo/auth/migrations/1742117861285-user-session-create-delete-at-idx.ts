import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import { createIndex, dropOldIndexes } from '../utils';

const deleteAt = 'deleteAt';
const index = `${deleteAt}_1`;

const collectionName = 'user_session';

export class UserSessionCreateDeleteAtIdx1742117861285 implements MigrationInterface {
  public async up(db: Db): Promise<void | never> {
    const collection = db.collection(collectionName);
    await createIndex(
      collection,
      { [deleteAt]: 1 },
      { name: index, background: true, expireAfterSeconds: 0 },
    );
  }

  public async down(db: Db): Promise<void | never> {
    const collection = db.collection(collectionName);
    await dropOldIndexes(collection, [index]);
  }
}
