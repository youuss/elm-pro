import { ConfigFormItem, FormItem } from './type'
import { computed, UnwrapNestedRefs, watch } from 'vue-demi'
import { ref } from 'vue'

export default function useItems(formItems: ConfigFormItem[], model: UnwrapNestedRefs<any>) {
  const disabledMap = ref(new Map());
  const optionsMap = ref(new Map());
  for (let index = 0, length = formItems.length; index < length; index++) {
    const { prop, inputControl = {}, options } = formItems[index];

    if (inputControl.disabled) {
      watch(() => model, () => {
        disabledMap.value.set(prop, inputControl.disabled(model))
        console.log(disabledMap)
      }, {
        deep: true,
        immediate: true
      })
    }
    if (options) {
      const {
        initData, remote, optionLabelKey, optionValueKey, dependsOn,
      } = options;
      if (!optionsMap.value.has(prop)) {
        optionsMap.value.set(prop, initData.map(opt => ({
          label: opt[optionLabelKey || 'label'],
          value: opt[optionValueKey || 'value'],
        })))
      }
      for (let i = 0; i < dependsOn.length; i++) {
        watch(() => model[dependsOn[i]], async (val) => {
          if (remote) {
            const data = await remote(model);
            optionsMap.value.set(prop, data.map(opt => ({
              label: opt[optionLabelKey || 'label'],
              value: opt[optionValueKey || 'value'],
            })))

            console.log(optionsMap)
          }
        });
      }
    }
  }

  const items = computed<FormItem[]>(() => {
    return formItems.map(item => ({
      ...item,
      inputControl: {
        ...item.inputControl,
        disabled: disabledMap.value.get(item.prop)
      },
      options: optionsMap.value.get(item.prop)
    }))
  })

  console.log(items)
  return items
}
