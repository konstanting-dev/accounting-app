export interface Document<T> {
  transactionId: string;
  revision: string;
  document: T;
}

export interface CollectionField {
  name: string;
  type?: 'STRING' | 'BOOLEAN' | 'INTEGER' | 'DOUBLE';
}

export interface CollectionIndex {
  fields: string[];
  isUnique: boolean;
}

export interface Collection {
  name: string;
  idFieldName: string;
  fields: CollectionField[];
  indexes: CollectionIndex[];
}

export interface CreateCollectionParams {
  idFieldName?: string;
  fields?: CollectionField[];
  indexes?: CollectionIndex[];
}

interface FieldComparison {
  field: string;
  operator: 'EQ' | 'NE' | 'LT' | 'LE' | 'GT' | 'GE' | 'LIKE';
  value: unknown;
}

type QueryExpression = {
  fieldComparisons?: FieldComparison[];
};

interface OrderBy {
  field: string;
  desc: boolean;
}

export interface SearchQuery {
  expressions?: QueryExpression[];
  orderBy?: OrderBy[];
  limit?: number;
}
