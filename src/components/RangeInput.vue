<template>
  <div :class="$style.rangeContainer">
    <div :class="$style.valueBlock">
      <span :class="$style.valueLabel">{{ label }}</span>
      <div
        v-if="!isEditing"
        :class="$style.valueDisplay"
        @click="startEditing"
      >
        {{ formattedPrice }}
      </div>
      <input
        v-else
        ref="inputRef"
        type="text"
        :min="min"
        :max="max"
        :step="step"
        :value="displayValue"
        @input="handleNumberInput"
        @blur="stopEditing"
        @keydown.enter="stopEditing"
        @keydown.delete="handleDelete"
        @keydown.backspace="handleDelete"
        :class="$style.valueInput"
      />
    </div>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="sliderValue"
      :class="$style.rangeSlider"
      @input="handleSliderInput"
      :style="{ '--fill-percentage': fillPercentage + '%' }"
    />
  </div>
</template>

<script setup lang="ts">
import { priceFormatter } from '@/helpers/price';
import { ref, watch, computed, nextTick } from 'vue';

interface Props {
  label: string
  min?: number
  max?: number
  step?: number
  modelValue?: number
}

interface Emits {
  (emit: 'update:modelValue', value: number): void
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 10000,
  step: 100,
  modelValue: 1500,
});

const emit = defineEmits<Emits>();

const isEditing = ref(false);
const editValue = ref(props.modelValue);
const inputRef = ref<HTMLInputElement | null>(null);
const sliderValue = ref(props.modelValue);
const rawInputValue = ref(''); // Храним "сырое" значение без пробелов

const formattedPrice = computed(() => {
  return priceFormatter(sliderValue.value);
});

// Отформатированное значение для отображения в input
const displayValue = computed(() => {
  if (!isEditing.value) return '';
  return priceFormatter(editValue.value);
});

// Функция для парсинга только цифр
const parseOnlyDigits = (value: string) => {
  const digits = value.replace(/\D/g, '');
  return digits ? Number(digits) : 0;
};

// Функция для ограничения значения
const clampValue = (value: number) => {
  if (value < props.min) {
    return props.min;
  }
  if (value > props.max) {
    return props.max;
  }
  return value;
};

const fillPercentage = computed(() => {
  return ((sliderValue.value - props.min) / (props.max - props.min)) * 100;
});

watch(() => props.modelValue, (newValue) => {
  sliderValue.value = newValue;
  editValue.value = newValue;
  rawInputValue.value = String(newValue);
  emit('update:modelValue', newValue);
});

// Ползунок
const handleSliderInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = Number(target.value);
  
  sliderValue.value = value;
  editValue.value = value;
  rawInputValue.value = String(value);
  emit('update:modelValue', value);
};

// Начало редактирования
const startEditing = () => {
  editValue.value = sliderValue.value;
  rawInputValue.value = String(sliderValue.value);
  isEditing.value = true;
  
  nextTick(() => {
    const input = inputRef.value;
    if (input) {
      input.focus();
      // Ставим курсор в конец
      setTimeout(() => {
        input.setSelectionRange(input.value.length, input.value.length);
      }, 0);
    }
  });
};
const handleDelete = (event: KeyboardEvent) => {
  const input = event.target as HTMLInputElement;
  const cursorPos = input.selectionStart || 0;
  
  // Удаляем пробелы из строки для подсчета позиции
  const valueWithoutSpaces = input.value.replace(/\s/g, '');
  
  nextTick(() => {
    const newInput = inputRef.value;
    if (newInput) {
      const newValueWithoutSpaces = newInput.value.replace(/\s/g, '');
      let newPos = cursorPos;
      if (newValueWithoutSpaces.length < valueWithoutSpaces.length) {
        newPos = Math.max(0, cursorPos - 1);
      }
      newInput.setSelectionRange(newPos, newPos);
    }
  });
};
const handleNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const cursorPos = target.selectionStart || 0;
  const textBeforeCursor = target.value.substring(0, cursorPos);
  const spacesBeforeCursor = (textBeforeCursor.match(/\s/g) || []).length;
  const numericValue = parseOnlyDigits(target.value);
  editValue.value = numericValue;
  rawInputValue.value = String(numericValue);
  
  nextTick(() => {
    const input = inputRef.value;
    if (input) {
      const newTextBeforeCursor = input.value.substring(0, cursorPos);
      const newSpacesBeforeCursor = (newTextBeforeCursor.match(/\s/g) || []).length;
      let newPos = cursorPos + (newSpacesBeforeCursor - spacesBeforeCursor);
      newPos = Math.min(newPos, input.value.length);
      input.setSelectionRange(newPos, newPos);
    }
  });
};

// Конец редактирования
const stopEditing = () => {
  isEditing.value = false;
  
  // Применяем ограничение
  const clampedValue = clampValue(editValue.value);
  
  editValue.value = clampedValue;
  sliderValue.value = clampedValue;
  rawInputValue.value = String(clampedValue);
  emit('update:modelValue', clampedValue);
};
</script>

<style module>
.rangeContainer {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 32px 0 32px;
  width: 100%;
  background: var(--color-white);
}

.valueBlock {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.valueLabel {
  font-size: 12px;
  color: var(--color-black-25);
  font-weight: 400;
  line-height: 125%;
}
.valueDisplay {
  font-size: 24px;
  font-weight: 450;
  color: var(--color-black);
  line-height: 125%;
  cursor: text;
  padding: 0;
  transition: border-color 0.2s;
  border-bottom: 2px solid transparent;
}
.valueInput {
  font-size: 24px;
  font-weight: 450;
  color: var(--color-black);
  line-height: 125%;
  background: transparent;
  border: none;
  padding: 0;
  width: 100%;
  outline: none;
  border-bottom: 2px solid transparent;
}

.valueInput::-webkit-outer-spin-button,
.valueInput::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.valueInput[type=number] {
  -moz-appearance: textfield;
}

.rangeSlider {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(
    to right, 
    var(--color-orange) 0%,
    var(--color-orange) var(--fill-percentage),
    var(--color-gray) var(--fill-percentage),
    var(--color-gray) 100%
  );
  border-radius: 3px;
  outline: none;
  margin: 0;
  padding: 0;
}
.rangeSlider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  background: var(--color-orange);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.rangeSlider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  filter: brightness(0.9);
  box-shadow: 0 0 10px var(--color-orange);
}
.rangeSlider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  background: var(--color-orange);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.rangeSlider::-moz-range-thumb:hover {
  transform: scale(1.15);
  filter: brightness(0.9);
  box-shadow: 0 0 10px var(--color-orange);
}
</style>