/**
 * @Description event filter(防抖、节流)
 * @Author youus
 * @Date 2023/5/29 21:10
 * @Version v1.0.0
 *
 * Hello, humor
 */
import { unref } from 'vue-demi';
import type { Ref, ComputedRef } from 'vue-demi';

/**
 * Any function
 */
export type Fn = () => void;

/**
 * Maybe it's a ref, or a plain value
 *
 * ```ts
 * type MaybeRef<T> = T | Ref<T>
 * ```
 */
export type MaybeRef<T> = T | Ref<T>;

/**
 * Maybe it's a computed ref, or a getter function
 *
 * ```ts
 * type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>
 * ```
 */
export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;

/**
 * Maybe it's a ref, or a plain value, or a getter function
 *
 * ```ts
 * type MaybeComputedRef<T> = (() => T) | T | Ref<T> | ComputedRef<T>
 * ```
 */
export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

export function resolveUnref<T>(r: MaybeComputedRef<T>): T {
  return typeof r === 'function' ? (r as any)() : unref(r);
}

export type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return;

export interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
  fn: FunctionArgs<Args, This>,
  args: Args,
  thisArg: This
}

export type EventFilter<Args extends any[] = any[], This = any> = (
  invoke: Fn,
  options: FunctionWrapperOptions<Args, This>
) => void;

export interface DebounceFilterOptions {
  /**
   * The maximum time allowed to be delayed before it's invoked.
   * In milliseconds.
   */
  maxWait?: MaybeComputedRef<number>
}

/**
 * @internal
 */
export function createFilterWrapper<T extends FunctionArgs>(filter: EventFilter, fn: T) {
  function wrapper(this: any, ...args: any[]) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args });
  }

  return wrapper as any as T;
}

/**
 * Create an EventFilter that debounce the events
 *
 * @param ms
 * @param options
 */
export function debounceFilter(ms: MaybeComputedRef<number>, options: DebounceFilterOptions = {}) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let maxTimer: ReturnType<typeof setTimeout> | undefined | null;

  const filter: EventFilter = (invoke) => {
    const duration = resolveUnref(ms);
    const maxDuration = resolveUnref(options.maxWait);

    if (timer) clearTimeout(timer);

    if (duration <= 0 || (maxDuration !== undefined && maxDuration <= 0)) {
      if (maxTimer) {
        clearTimeout(maxTimer);
        maxTimer = null;
      }
      return invoke();
    }

    // Create the maxTimer. Clears the regular timer on invoke
    if (maxDuration && !maxTimer) {
      maxTimer = setTimeout(() => {
        if (timer) clearTimeout(timer);
        maxTimer = null;
        invoke();
      }, maxDuration);
    }

    // Create the regular timer. Clears the max timer on invoke
    timer = setTimeout(() => {
      if (maxTimer) clearTimeout(maxTimer);
      maxTimer = null;
      invoke();
    }, duration);
  };

  return filter;
}

/**
 * Create an EventFilter that throttle the events
 *
 * @param ms
 * @param [trailing=true]
 * @param [leading=true]
 */
export function throttleFilter(ms: MaybeComputedRef<number>, trailing = true, leading = true) {
  let lastExec = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let isLeading = true;

  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  const filter: EventFilter = (invoke) => {
    const duration = resolveUnref(ms);
    const elapsed = Date.now() - lastExec;

    clear();

    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }

    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      timer = setTimeout(() => {
        lastExec = Date.now();
        isLeading = true;
        clear();
        invoke();
      }, duration);
    }

    if (!leading && !timer) timer = setTimeout(() => (isLeading = true), duration);

    isLeading = false;
  };

  return filter;
}
