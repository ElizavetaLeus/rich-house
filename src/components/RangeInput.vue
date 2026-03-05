<template>
  <div :class="$style.rangeContainer">
    <!-- Блок с ценой -->
    <div :class="$style.valueBlock">
      <span :class="$style.valueLabel">{{ label }}</span>
      
      <!-- Показываем отформатированное число, когда не редактируем -->
      <div
        v-if="!isEditing"
        :class="$style.valueDisplay"
        @click="startEditing"
      >
        {{ formattedPrice }}
      </div>
      
      <!-- Поле ввода для редактирования -->
      <input
        v-else
        ref="inputRef"
        type="number"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="editValue"
        @input="handleNumberInput"
        @blur="stopEditing"
        @keydown.enter="stopEditing"
        :class="$style.valueInput"
      />
    </div>

    <!-- Ползунок -->
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model="sliderValue"
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
  /** Подпись над числом (например: "Цена до, ₽" или "Вес, кг") */
  label: string
  /** Минимальное значение */
  min?: number
  /** Максимальное значение */
  max?: number
  /** Шаг изменения */
  step?: number
  /** Текущее значение */
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

const formattedPrice = computed(() => {
  return priceFormatter(sliderValue.value);
});

const fillPercentage = computed(() => {
  return ((sliderValue.value - props.min) / (props.max - props.min)) * 100;
});

const sliderValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  sliderValue.value = newValue;
  editValue.value = newValue;
});

// Ползунок двигается
const handleSliderInput = () => {
  sliderValue.value = Number(sliderValue.value);
  editValue.value = sliderValue.value;
  emit('update:modelValue', Number(sliderValue.value));
};

// Начало редактирования
const startEditing = () => {
  editValue.value = sliderValue.value;
  isEditing.value = true;
  
  nextTick(() => {
    inputRef.value?.focus();
  });
};

// Ввод числа
const handleNumberInput = () => {
  sliderValue.value = editValue.value;
  emit('update:modelValue', Number(editValue.value));
};

// Конец редактирования
const stopEditing = () => {
  isEditing.value = false;
  
  if (editValue.value < props.min) {
    editValue.value = props.min;
  } else if (editValue.value > props.max) {
    editValue.value = props.max;
  }
  
  sliderValue.value = editValue.value;
  emit('update:modelValue', Number(editValue.value));
};
</script>

<style module>
.rangeContainer {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 32px;
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
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
}

.valueDisplay:hover {
  border-bottom-color: #e0e0e0;
}

/* Поле ввода */
.valueInput {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-black);
  line-height: 1.2;
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--color-orange);
  padding: 0;
  width: 100%;
  outline: none;
  font-family: inherit;
}

.valueInput:focus {
  border-bottom-color: var(--color-orange);
}

.valueInput::-webkit-outer-spin-button,
.valueInput::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.valueInput[type=number] {
  -moz-appearance: textfield;
}

/* Ползунок */
.rangeSlider {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  background: linear-gradient(
    to right, 
    var(--color-orange) 0%,
    var(--color-orange) var(--fill-percentage),
    var(--color-gray) var(--fill-percentage),
    var(--color-gray) 100%
  );
  border-radius: 3px;
  outline: none;
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