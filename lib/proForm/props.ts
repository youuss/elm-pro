import { PropType } from 'vue-demi';
import { ProFormProps } from './type';

export default {
  formOption: {
    type: Object as PropType<ProFormProps['formOption']>,
    default: () => ({}),
  },
  formItems: {
    type: Array as PropType<ProFormProps['formItems']>,
    default: () => [] as ProFormProps['formItems'],
  },
  layout: {
    type: Object as PropType<ProFormProps['layout']>,
    default: () => ({
      labelWidth: '120px',
      lineCount: 4,
      type: 'horizontal',
    }),
  },
};
