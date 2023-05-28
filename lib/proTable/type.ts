import type { TableProps, TableColumnCtx } from 'element-plus';
import { VNode } from 'vue-demi';

export type Action = 'modify' | 'copy' | 'view';

export interface TableColumn<Row> extends Partial<TableColumnCtx<Row>> {
  customRender?: (row: Row) => VNode | string;
}

export interface TableConfig<T> extends Partial<TableProps<T>> {
  columns?: TableColumn<T>[];
}

export interface ProTableProps<Config> {
  tableConfig: TableConfig<Config>;
}

export type DefaultRow = any;
