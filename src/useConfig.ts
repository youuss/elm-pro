import {
  computed,
  onMounted, reactive, Ref, ref, UnwrapNestedRefs, ComputedRef, provide, toRaw,
} from 'vue-demi';
import {
  Config, FormItem, Page, TableColumn,
} from './types';

interface Cfn<S, R> {
  model: UnwrapNestedRefs<S>
  formItems: FormItem[]
  queryTable: () => void
  tableData: Ref<R[]>
  columns: TableColumn<R>[]
  loading: Ref<Boolean>
  pagination: ComputedRef<Page>
  pageHandler: ({ current, pageSize }: { current: number, pageSize: number}) => void
}

export default function useConfig<S extends Object, R = any>(config: Config): Cfn<S, R> {
  const { table, search } = config;

  const { formOption, formItems } = search;
  const { model } = formOption;

  const {
    query, beforeQuery, pagination, immediately, columns,
  } = table;

  const formModel = reactive<S>(model);

  const {
    isCustomTotal, layout, pageSizes, ...pageKeyMap
  } = pagination;

  const _pn = ref(1);
  const _ps = ref(10);
  const _total = ref(100);

  const _pagination = computed(() => ({
    current: _pn.value,
    pageSize: _ps.value,
    total: _total.value,
    isCustomTotal,
    layout,
    pageSizes,
  }));

  const tableData: Ref<R[]> = ref([]);
  const loading = ref(false);

  const queryTable = async (pn = 1) => {
    loading.value = true;
    const _params = beforeQuery(toRaw(formModel));
    _pn.value = pn;
    const { list = [], total } = await query({
      ..._params,
      [pageKeyMap.pageSizeKey]: _ps.value,
      [pageKeyMap.currentKey]: pn,
    });
    if (list) {
      tableData.value = list;
      _total.value = isCustomTotal ? list.length : total || 0;
    }
    loading.value = false;
  };

  const pageHandler = async ({ current }: { current: number}) => {
    await queryTable(current);
  };

  onMounted(async () => {
    if (immediately) {
      await queryTable();
    }
  });

  const initProvide = () => {
    provide('mode', model);
    provide('formItems', formItems);
    provide('tableData', tableData);
    provide('columns', columns);
    provide('loading', loading);
    provide('pagination', _pagination);
  };

  initProvide();

  return {
    model: formModel,
    formItems,
    queryTable,
    tableData,
    columns,
    loading,
    pagination: _pagination,
    pageHandler,
  };
}
