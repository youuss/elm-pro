import { defineComponent } from 'vue-demi';

export default defineComponent({
  name: 'ElmLayout',
  setup(props, { slots }) {
    return () => (
      <div class='elm-layout'>
        <div class='elm-layout__header'>
          { slots.header && slots.header() }
        </div>
        <div class='elm-layout__container'>
          { slots.container && slots.container() }
        </div>
      </div>
    );
  },
});
