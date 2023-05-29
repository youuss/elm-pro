import { computed, UnwrapNestedRefs, watch } from 'vue-demi';
import { ref } from 'vue';
import { debounce } from 'lodash-es';
import { ConfigFormItem, FormItem } from './type';

export default function useItems(formItems: ConfigFormItem[], model: UnwrapNestedRefs<any>) {
  const disabledMap = ref(new Map());
  const optionsMap = ref(new Map());
  for (let index = 0, { length } = formItems; index < length; index++) {
    const { prop, inputControl = {}, options } = formItems[index];

    if (inputControl.disabled) {
      watch(() => model, debounce(() => {
        disabledMap.value.set(prop, inputControl.disabled(model));
      }, 500), {
        deep: true,
        immediate: true,
      });
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
        watch(() => model[dependsOn[i]], debounce(async () => {
          if (remote) {
            const data = await remote(model);
            optionsMap.value.set(prop, data.map((opt) => ({
              label: opt[optionLabelKey || 'label'],
              value: opt[optionValueKey || 'value'],
            })));
          }
        }, 500));
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
