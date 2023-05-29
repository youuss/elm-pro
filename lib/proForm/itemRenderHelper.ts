import {
  computed,
  h,
  UnwrapNestedRefs,
  VNode,
  Slots,
} from 'vue-demi';
import {
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
} from 'element-plus';
import { FormItem } from './type';

const RENDER_TYPES = ['input', 'date', 'select', 'actions', 'slot'];

const ACTIONS = 'actions';
const SLOT = 'slot';

export default function itemRenderHelper(type: string, itemProps: Omit<FormItem, 'type'>, model: UnwrapNestedRefs<any>, slots: Slots): VNode {
  if (!type) {
    return null;
  }

  if (!RENDER_TYPES.includes(type)) {
    console.warn(`current item's type just contains ${RENDER_TYPES}`);
  }

  const { prop, inputControl = { disabled: () => false }, ...props } = itemProps;

  if (type === ACTIONS || type === SLOT) {
    return h(ElFormItem, {
      prop,
      class: type === ACTIONS ? 'elm-pro-form__btn_group' : '',
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
          style: { width: '100%' },
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

      const renderOptions = computed(() => (options as any[]).map((opt) => h(ElOption, {
        ...opt,
        label: opt.label,
        value: opt.value,
        key: opt.value,
      })));

      return h(ElFormItem, {
        prop,
        ...props,
      }, {
        default: () => h(ElSelect, {
          ...inputControl,
          modelValue: model[prop as string],
          'onUpdate:modelValue': changeHandler,
          style: { width: '100%' },
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
          style: { width: '100%' },
          modelValue: model[prop as string],
          'onUpdate:modelValue': changeHandler,
          type: 'date',
        }),
      });
    },
  };

  return renderMap[type]();
}
