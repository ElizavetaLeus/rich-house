<template>
  <header :class="$style.header">
    <RouterLink to="/">
      <div  :class="$style.logoWrapper">
        <AppVector :vector="vectors.logo"/>
      </div>
    </RouterLink>
    <div :class="$style.navigation">
      <AppButton
        type="text"
        text="Проекты"
        @click="navigateToProjects()"
      />
      <button 
        :class="[$style.servicesBtn, { [$style.open]: isOpen }]" 
        @click="toggleOpen"
      >
        <span :class="$style.text">Услуги</span>
        <span :class="[$style.arrowWrapper, { [$style.rotated]: isOpen }]">
          <AppIcon :size="8" name="arrow"/>
        </span>
      </button>
      <AppButton
        type="text"
        text="Построенные дома"
        @click="navigateToBuiltHousesPage()"
      />
      <button 
        :class="[$style.servicesBtn, { [$style.open]: isOpen }]" 
        @click="toggleOpen"
      >
        <span :class="$style.text">Полезное</span>
        <span :class="[$style.arrowWrapper, { [$style.rotated]: isOpen }]">
          <AppIcon :size="8" name="arrow"/>
        </span>
      </button>
      <AppButton
        type="text"
        text="Контакты"
        @click="navigateToContactsPage()"
      />
    </div>
    <div :class="$style.fedback">
      <a href="tel:+79286003320" :class="$style.phone">+7 (928) 600-33-20</a>
      <AppButton
        text="Заказать звонок"
        size="small"
        colour="secondary"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import AppVector from '@/components/ui/AppVector.vue';
import vectors from '@/assets/vectors/vectors';
import AppButton from './ui/AppButton.vue';
import { ref } from 'vue';
import AppIcon from './ui/AppIcon.vue';
import { useRouter } from 'vue-router';
import { EnumRouteName } from '@/enums/enum-route-name';

const isOpen = ref(false);

const router = useRouter();

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};
const navigateToProjects = () => {
  router.push({ name: EnumRouteName.PROJECTS });
};
const navigateToBuiltHousesPage = () => {
  router.push({ name: EnumRouteName.BUILT_HOUSES });
};
const navigateToContactsPage = () => {
  router.push({ name: EnumRouteName.CONTACTS });
};

</script>

<style module>
.header {
  padding-block: 10px;
  display: flex;
}
.logoWrapper {
  padding-inline: 28px;
  border-inline-end: 1px solid var(--color-gray-light);
}
.navigation {
  display: flex;
  gap: 48px;
  align-items: center;
  justify-content: center;
  padding-inline-start: 56px;
}
.servicesBtn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  color: var(--color-black);
  font-weight: 40000;
  padding: 4px 0;
  transition: opacity 0.2s ease;
}
.arrowWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8px;
  height: 8px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center center;
}
.arrowPath {
  stroke-opacity: 0.25;
  transition: stroke-opacity 0.2s ease;
}
.rotated {
  transform: rotate(180deg);
}
/* Интерактивность */
.servicesBtn:hover {
  opacity: 0.8;
}
.servicesBtn:hover .arrowPath {
  stroke-opacity: 0.4;
}
.servicesBtn:active {
  opacity: 0.6;
  transform: translateY(1px);
}
.open .arrowPath {
  stroke-opacity: 0.3;
}
</style>