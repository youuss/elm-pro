import {
  computed,
  h,
  UnwrapNestedRefs,
  VNode,
  watch,
  Slots,
  ref, toRaw,
} from 'vue-demi'
import {
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
} from 'element-plus';
import { FormItem } from './type';
import { debounce } from 'lodash-es';

const RENDER_TYPES = ['input', 'date', 'select', 'actions', 'slot'];

export default function itemRenderHelper(type: string, itemProps: Omit<FormItem, 'type'>, model: UnwrapNestedRefs<any>, slots: Slots): VNode {
  if (!type) {
    return null;
  }

  if (!RENDER_TYPES.includes(type)) {
    console.warn(`current item's type just contains ${RENDER_TYPES}`);
  }

  const { prop, inputControl = { disabled: () => false }, ...props } = itemProps;

  // const disabled = ref(false)
  //
  // if (inputControl.disabled) {
  //   watch(() => model, () => {
  //     disabled.value =  inputControl.disabled(model)
  //   }, {
  //     deep: true,
  //     immediate: true
  //   })
  // }

  if (type === 'actions' || type === 'slot') {
    return h(ElFormItem, {
      prop,
      class: type === 'actions' ? 'elm-pro-form__btn_group' : '',
      ...props,
    }, {
      default: () => slots[prop as string] && slots[prop as string](),
    });
  }

  const renderMap: Record<string, () => VNode > = {
    input: () => {
      const changeHandler = (value: string | number) => {
        model[prop as string] = value;
      };
      return h(ElFormItem, {
        prop,
        ...props,
      }, {
        default: () => h(ElInput, {
          ...inputControl,
          disabled: false,
          // disabled: disabled.value,
          modelValue: model[prop as string],
          'onUpdate:modelValue': changeHandler,
        }),
      });
    },
    select: () => {
      const {
        prop, inputControl, options, ...props
      } = itemProps;

      const changeHandler = (value: string | number) => {
        model[prop as string] = value;
      };

      // const {
      //   initData, remote, optionLabelKey, optionValueKey, dependsOn,
      // } = options;
      //
      // const innerOptions = ref(initData);

      // console.log('render options', innerOptions)

      // 依赖收集初始化
      // const initWatchers = async () => {
      //   console.log('initWatchers')
      //   for (let i = 0; i < dependsOn.length; i++) {
      //     watch(() => model[dependsOn[i]], async (val) => {
      //       console.log(val)
      //       // if (remote) {
      //       //   const data = await remote(model);
      //       //   innerOptions.value = data || [];
      //       // }
      //     });
      //   }
      //   // if (remote) {
      //   //   const data = await remote(toRaw(model));
      //   //   innerOptions.value = data || [];
      //   // }
      // };
      // // // TODO 好像依赖收集有点问题，会进行多次的收集
      // initWatchers();

      const renderOptions = computed(() => (options as any[]).map((opt) => h(ElOption, {
        ...opt,
        label: opt['label'],
        value: opt['value'],
        key: opt['value'],
      })));

      return h(ElFormItem, {
        prop,
        ...props,
      }, {
        default: () => h(ElSelect, {
          ...inputControl,
          disabled: false,
          // disabled: disabled.value,
          modelValue: model[prop as string],
          'onUpdate:modelValue': changeHandler,
        }, {
          default: () => renderOptions.value,
        }),
      });
    },
    date: () => {
      const { prop, inputControl, ...props } = itemProps;
      const changeHandler = (value: string | number) => {
        model[prop as string] = value;
      };
      return h(ElFormItem, {
        prop,
        ...props,
      }, {
        default: () => h(ElDatePicker, {
          ...inputControl,
          disabled: false,
          // disabled: disabled.value,
          modelValue: model[prop as string],
          'onUpdate:modelValue': changeHandler,
          type: 'date',
        }),
      });
    },
  };

  return renderMap[type]();
}
