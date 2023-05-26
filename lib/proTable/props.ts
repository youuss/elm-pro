import { PropType } from 'vue-demi';
import { ProTableProps, DefaultRow } from './type';

export default {
  tableConfig: {
    type: Object as PropType<ProTableProps<DefaultRow>['tableConfig']>,
    default: () => ({
      data: [],
      columns: [],
    }) as ProTableProps<DefaultRow>['tableConfig'],
  },
};
