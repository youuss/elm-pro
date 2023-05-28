import { App } from 'vue-demi';
import * as components from './components';
import './style.scss';

function install(app: App, config?: Record<string, unknown>): void {
  Object.keys(components).forEach((key) => {
    /plugin/i.test(key) ? app.use(components[key]) : app.use(components[key], config);
  });
}

export * from './components';
export * from './hooks/useConfig';

export default {
  install,
};
