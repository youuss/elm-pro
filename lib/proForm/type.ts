import type { FormItemProps } from 'element-plus';

export interface Config {
  lineCount?: number;
  labelWidth?: string | number
  type?: 'horizontal' | 'vertical';
}

export interface ProFormProps {
  config: Config
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
  inputControl: {
    [key: string]: any
  },
  options?: SelectOptions
}
