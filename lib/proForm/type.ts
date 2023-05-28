import type { FormItemProps } from 'element-plus';

export interface Layout {
  lineCount?: number;
  labelWidth?: string | number
  type?: 'horizontal' | 'vertical';
}

export interface ProFormProps {
  layout: Layout
  formOption?: Record<string, unknown>
  formItems?: FormItem[],
}

export interface SelectOptions {
  initData: any[];
  optionLabelKey: string;
  optionValueKey: string;
  remote?: (params: any) => Promise<any[]>;
  dependsOn?: string[];
}

export interface FormItem extends Partial<FormItemProps> {
  type: string;
  inputControl?: {
    [key: string]: any
  }
  options?: SelectOptions
}
