import type { TableColumnCtx, FormItemProps } from 'element-plus';
import { VNode } from 'vue-demi';

interface FormConfig {
  lineCount?: number;
  labelWidth?: string | number
  type?: 'horizontal' | 'vertical';
}

interface SelectOptions {
  initData: any[];
  optionLabelKey: string;
  optionValueKey: string;
  remote?: (params: any) => Promise<any[]>;
  dependsOn?: string[];
}

export interface FormItem extends Partial<FormItemProps> {
  type: string;
  inputControl?: {
    [key: string]: unknown
  }
  options?: SelectOptions
}

type Partial<T> = {
  [P in keyof T]?: T[P];
};

export interface TableColumn<R> extends Partial<TableColumnCtx<R>> {
  customRender?: (row: R) => VNode | string;
}

type Fn<T = any> = (params: T) => T;

export interface Pagination {
  currentKey: string;
  pageSizeKey: string;
  totalKey: string;
  layout?: string;
  pageSizes?: number[];
  isCustomTotal?: boolean;
}

export interface Page {
  current: number;
  pageSize: number;
  total: number;
  layout?: string;
  pageSizes?: number[];
  isCustomTotal?: boolean;
}

interface Config<Search = any, Row = any> {
  table: {
    beforeQuery: Fn<Search>;
    query: Fn<Search>;
    immediately: boolean;
    columns: TableColumn<Row>[],
    pagination: Pagination
  },
  search: {
    formOption: {
      model: Search,
      [key: string]: unknown
    }
    layout?: FormConfig
    formItems: FormItem[]
  },
}
