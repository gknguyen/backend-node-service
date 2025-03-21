import { Collection, CreateIndexesOptions, Document, IndexSpecification } from 'mongodb';

export async function getIndexNames(collection: Collection<Document>, indexes: string[]) {
  const listIdx = await collection.indexes();
  return listIdx
    .filter(Boolean)
    .filter((i) => indexes.includes(i.name))
    .map((index) => index.name);
}

export async function dropOldIndexes(collection: Collection<Document>, indexes: string[]) {
  const indexNames = await getIndexNames(collection, indexes);
  for (const indexName of indexNames) {
    await collection.dropIndex(indexName);
  }
}

export async function createIndex(
  collection: Collection<Document>,
  indexSpec: IndexSpecification,
  options: CreateIndexesOptions,
): Promise<void> {
  const isIndexExisted = options.name ? await collection.indexExists(options.name) : undefined;
  if (!isIndexExisted) {
    await collection.createIndex(indexSpec, options);
  }
}
