import {
  computed,
  defineComponent, h, toRef, watch,
} from 'vue-demi';
import {
  ElTable, ElTableColumn,
} from 'element-plus';
import props from './props';
import { DefaultRow, TableColumn } from './type';

export default defineComponent({
  name: 'ElmProTable',
  props,
  setup(props, { slots }) {
    const tableConfig = toRef(props, 'tableConfig');

    const { columns, ...tableProps } = tableConfig.value;

    const data = computed(() => tableConfig.value.data);

    const tableColumns = columns.map((col) => {
      const { customRender, ...colProps } = col;
      return h(ElTableColumn, {
        ...colProps,
      }, {
        default:
          ({ row, column, $index }: { row: DefaultRow, column: TableColumn<DefaultRow>, $index: number }) => slots[col.prop]
            ? slots[col.prop]({ row, column, $index })
            : (customRender && customRender(row))
              || row[col.prop],
      });
    });

    return () => (
      <>
        <div class="elm-pro-table__header-btns">
          { slots.headerExtra && slots.headerExtra() }
        </div>
        <ElTable {...tableProps} data={data.value}>
          {tableColumns}
        </ElTable>
      </>
    );
  },
});
