import { computed, UnwrapNestedRefs, watch } from 'vue-demi';
import { ref } from 'vue';
import { ConfigFormItem, FormItem } from './type';
import useDebounceFn from '../hooks/useDebounceFn';

export default function useItems(formItems: ConfigFormItem[], model: UnwrapNestedRefs<any>) {
  const disabledMap = ref(new Map());
  const optionsMap = ref(new Map());
  for (let index = 0, { length } = formItems; index < length; index++) {
    const { prop, inputControl = {}, options } = formItems[index];

    if (inputControl.disabled) {
      watch(() => model, () => {
        useDebounceFn(() => {
          console.log('debounce~~~~');
        }, 500);
        disabledMap.value.set(prop, inputControl.disabled(model));
      }, {
        deep: true,
        immediate: true,
      });
      watch(() => model, useDebounceFn(() => {
        console.log('debounce~~~~');
      }, 1000));
    }
    if (options) {
      const {
        initData, remote, optionLabelKey, optionValueKey, dependsOn,
      } = options;
      if (!optionsMap.value.has(prop)) {
        optionsMap.value.set(prop, initData.map((opt) => ({
          label: opt[optionLabelKey || 'label'],
          value: opt[optionValueKey || 'value'],
        })));
      }
      for (let i = 0; i < dependsOn.length; i++) {
        watch(() => model[dependsOn[i]], async () => {
          if (remote) {
            const data = await remote(model);
            optionsMap.value.set(prop, data.map((opt) => ({
              label: opt[optionLabelKey || 'label'],
              value: opt[optionValueKey || 'value'],
            })));
          }
        });
      }
    }
  }

  return computed<FormItem[]>(() => formItems.map((item) => ({
    ...item,
    inputControl: {
      ...item.inputControl,
      disabled: disabledMap.value.get(item.prop),
    },
    options: optionsMap.value.get(item.prop),
  })));
}
