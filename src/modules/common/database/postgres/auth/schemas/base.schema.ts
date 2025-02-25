import { EntitySchemaColumnOptions } from 'typeorm';

export const BaseSchema = {
  createdAt: {
    name: 'created_at',
    type: 'timestamp with time zone',
    createDate: true,
    comment: 'Creation date',
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: 'timestamp with time zone',
    updateDate: true,
    comment: 'Last update date',
  } as EntitySchemaColumnOptions,
};
