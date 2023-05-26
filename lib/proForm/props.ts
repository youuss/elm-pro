import { PropType } from 'vue-demi';
import { ProFormProps, FormItem } from './type';

export default {
  formOption: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({}),
  },
  formItems: {
    type: Array as PropType<FormItem[]>,
    default: () => [] as PropType<FormItem[]>,
  },
  config: {
    type: Object as PropType<ProFormProps['config']>,
    default: () => ({
      labelWidth: '120px',
      lineCount: 4,
      type: 'horizontal',
    }),
  },
};
