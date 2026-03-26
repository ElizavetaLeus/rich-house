<template>
  <div v-click-outside="closeSelect">
    <div :class="$style.placeholder">{{ placeholder }}</div>
    
    <div :class="$style.selected" @click="isShown = !isShown">
      <span :class="[$style.value, !selectedOption && $style.valueEmpty]">
        {{ selectedOption || emptyText }}
      </span>
      <AppIcon name="arrow" :class="[$style.icon, isShown && $style.iconActive]" />
    </div>

    <ul v-if="isShown" :class="$style.optionList">
      <li
        v-for="option in options"
        :key="option.id"
        :class="$style.option"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue';
import { ref } from 'vue';

interface Option {
  id: number;
  name: string;
}

interface Props {
  options: Option[];
  placeholder?: string;
  emptyText?: string;
}

interface Emits {
  (event: 'changeOption', value: number): void;
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Технология строительства',
  emptyText: 'Не выбрано',
});

const emits = defineEmits<Emits>();

const selectedOption = ref('');
const isShown = ref(false);

const selectOption = (option: Option) => {
  selectedOption.value = option.name;
  isShown.value = false;
  emits('changeOption', option.id);
};

const closeSelect = () => {
  isShown.value = false;
};
</script>

<style module>
.placeholder {
  font-size: 16px;
  color: var(--color-black-25);
  padding: 0 12px 4px 12px;
}
.selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px;
  border-radius: 5px;
  color: var(--color-gray);
  user-select: none;
  cursor: pointer;
}
.value {
  font-size: 16px;
  transition: color 0.2s;
  color: var(--color-black);
}
.valueEmpty {
  color: var(--color-black-25);
}
.icon {
  transition: 0.3s;
  filter: brightness(0);
  color: var(--color-black-25);
}
.iconActive {
  transform: rotate(180deg);
}
.optionList {
  list-style: none;
  margin: 8px 0 0 0;
  border-radius: 5px;
  background: var(--color-white);
  box-shadow: 0 4px 12px var(--color-black-25);
}
.option {
  padding: 12px;
  cursor: pointer;
  color: var(--color-black);
  border-bottom: 1px solid var(--color-gray);
}
.option:last-child {
  border-bottom: none;
}
.option:hover {
  background: var(--color-black-10);
  opacity: 0.8;
}
</style>