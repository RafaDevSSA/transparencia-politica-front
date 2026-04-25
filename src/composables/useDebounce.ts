import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay = 350): Ref<T> {
  const debouncedValue = ref<T>(value.value) as Ref<T>
  let timer: ReturnType<typeof setTimeout>

  watch(value, (newValue) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })

  return debouncedValue
}
