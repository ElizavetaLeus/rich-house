<template>
  <div :class="$style.container">
    <h1 :class="$style.title">Строим дома под ключ на Юге России</h1>
    <div :class="$style.filtersWrapper">
      <RangeInput 
        v-model="price"
        label="Цена до, ₽"
        :min="100000"
        :max="10000000"
        :class="$style.filter"
      />
      <RangeInput 
        v-model="area"
        label="Площадь от, м²"
        :step="10"
        :min="0"
        :max="500"
        :class="$style.filter"
      />
      <AppSelect
        :options="options"
        @changeOption="console.log($event)"
        :class="$style.filter"
      />
      <AppButton text="Подобрать проект" :class="$style.button"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import RangeInput from '@/components/RangeInput.vue';
import AppSelect from '@/components/ui/AppSelect.vue';
import { ref } from 'vue';
import AppButton from '../ui/AppButton.vue';

const price = ref(100000);
const area = ref(0);
const options = [
  { id: 1, name: 'Каркасные дома' },
  { id: 2, name: 'Дома из блока' },
  { id: 3, name: 'Дома из кирпича' },
  { id: 4, name: 'Дома из ЛСТК' },
  { id: 5, name: 'Коммерческие здания' },
];
</script>

<style module>
.container {
  padding-inline: 282px;
  padding-block-end: 100px;
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.2)
  ), url('@/assets/images/hero-section-background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  /* min-height: 100vh; */
  /* max-height: 594px;
  width: 100%; */
  display: flow-root;
}
.title {
  max-width: 755px;
  color: var(--color-white);
  font-size: 64px;
  font-weight: 500;
  line-height: 100%;
  margin-top: 132px;
}
.filtersWrapper {
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
  border-radius: 8px;
  width: 1300px;
  padding-inline-end: 40px;
  margin-top: 110px;
}
.filter {
  width: 325px;
  border-right: 1px solid var(--color-gray);
}
.button {
  max-width: 219px;
  margin-inline-start: 40px;
}
</style>