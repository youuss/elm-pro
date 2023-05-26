import {
  defineComponent, ref, toRef, computed, watch, h,
} from 'vue-demi';
import { ElPagination } from 'element-plus';
import props from './props';

export default defineComponent({
  name: 'ElmPagination',
  emits: ['change', 'update:current'],
  props,
  setup(props, { emit }) {
    const innerCurrent = toRef(props, 'current');
    const innerPageSize = toRef(props, 'pageSize');
    const total = toRef(props, 'total');
    const currentPs = ref(innerPageSize.value);
    const innerTotal = ref(total.value);

    const currentChangeHandler = (pn: number) => {
      emit('update:current', pn);
      emit('change', { current: pn, pageSize: currentPs.value });
      if (props.isCustomTotal) {
        innerTotal.value = total.value < currentPs.value
          ? pn * currentPs.value
          : (pn + 1) * currentPs.value;
      }
    };

    const sizeChangeHandler = (ps: never) => {
      currentPs.value = ps;
      emit('change', { current: innerCurrent.value, pageSize: ps });
    };

    const layout = computed(() => props.isCustomTotal ? 'prev, jumper, next' : props.layout);

    watch([total], () => {
      if (props.isCustomTotal) {
        innerTotal.value = total.value < currentPs.value
          ? innerCurrent.value * currentPs.value
          : (innerCurrent.value + 1) * currentPs.value;
      } else {
        innerTotal.value = total.value;
      }
    });

    return () => h(ElPagination, {
      style: {
        'justify-content': 'end', // TODO 位置prop
      },
      currentPage: innerCurrent.value,
      total: innerTotal.value,
      pageSize: innerPageSize.value,
      layout: layout.value,
      onCurrentChange: currentChangeHandler,
      onSizeChange: sizeChangeHandler,
    });
  },
});
