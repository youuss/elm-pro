import {
  defineComponent, toRef, computed,
} from 'vue-demi';
import {
  ElForm, ElRow, ElCol,
} from 'element-plus';
import props from './props';
import { FormItem } from './type';
import itemRenderHelper from './itemRenderHelper';

export default defineComponent({
  name: 'ElmProForm',
  props,
  setup(props, { slots }) {
    const config = toRef(props, 'config');
    const formItems = toRef(props, 'formItems'); // todo 字段命名优化
    const formOption = toRef(props, 'formOption'); // todo 字段命名优化

    const { model, ...formProps } = formOption.value;

    const { lineCount = 3, labelWidth, type = 'horizontal' } = config.value;

    if (type === 'vertical') {
      return () => (
        <ElForm
          model={model}
          {...formProps}
          labelWidth={labelWidth}
        >
          {
            formItems.value
              .map(({ type, ...formItemProps }) => itemRenderHelper(type, formItemProps, model, slots))
          }
          {slots.custom?.()}
        </ElForm>
      );
    }

    const colSpan = { span: 24 / lineCount };
    const restItemsLength = lineCount - (props.formItems.length % lineCount);

    const innerFormItems = computed(() => {
      const _formItems = [...formItems.value];
      if (restItemsLength < lineCount) {
        for (let i = 0; i < restItemsLength; i += 1) {
          if (_formItems[_formItems.length - 1].prop === 'btn') {
            _formItems.splice(-1, 0, {} as FormItem);
          } else {
            _formItems.push({} as FormItem);
          }
        }
      }

      return _formItems;
    });

    const formRows = computed(() => {
      let arr: FormItem[][] = [];
      for (let i = 0; i < innerFormItems.value.length / lineCount; i += 1) {
        arr = arr.concat([innerFormItems.value.slice(i * lineCount, (i + 1) * lineCount)]);
      }
      return arr;
    });

    return () => (
      <ElForm
        model={model}
        {...formProps}
        labelWidth={labelWidth}
      >
        {
          formRows.value.map((item) => (
            <ElRow>
              {
                item.map(({ type, ...formItemProps }) => (
                  <ElCol { ...colSpan}>
                    {
                      itemRenderHelper(type, formItemProps, model, slots)
                    }
                  </ElCol>
                ))
              }
            </ElRow>
          ))
        }
        {slots.custom?.()}
      </ElForm>
    );
  },
});
