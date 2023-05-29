import type { FormItemProps } from 'element-plus';

export interface Layout {
  lineCount?: number;
  labelWidth?: string | number
  type?: 'horizontal' | 'vertical';
}

export interface ProFormProps {
  layout: Layout
  formOption?: Record<string, unknown>
  formItems?: ConfigFormItem[],
}

export interface SelectOptions {
  initData: any[];
  optionLabelKey: string;
  optionValueKey: string;
  remote?: (params: any) => Promise<any[]>;
  dependsOn?: string[];
}

export interface ConfigFormItem extends Partial<FormItemProps> {
  type: string;
  inputControl?: Record<string, any>
  options?: SelectOptions
}


export interface FormItem extends Partial<FormItemProps> {
  type: string;
  inputControl?: Record<string, any>
  options?: any[]
}
