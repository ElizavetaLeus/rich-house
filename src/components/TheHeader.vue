<template>
  <header :class="$style.header">
    <RouterLink to="/">
      <div  :class="$style.logoWrapper">
        <AppVector :vector="vectors.logo"/>
      </div>
    </RouterLink>
    <div :class="$style.headerMenu">
      <AppMenu />

      <div :class="$style.feedback">
        <a href="tel:+79286003320" :class="$style.phone">+7 (928) 600-33-20</a>
        <AppButton
          text="Заказать звонок"
          size="small"
          colour="secondary"
          :class="$style.callButton"
          :maxWidth="187"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppVector from '@/components/ui/AppVector.vue';
import vectors from '@/assets/vectors/vectors';
import AppButton from './ui/AppButton.vue';
import AppMenu from './ui/AppMenu.vue';
</script>

<style module>
.header {
  display: flex;
  width: 100%;
}
.logoWrapper {
  padding: 10px 28px;
  border-inline-end: 1px solid var(--color-gray-light);
}
.headerMenu {
  justify-content: space-between;
  display: flex;
  width: 100%;
  padding-inline: 56px;
}
.feedback {
  display: flex;
  gap: 48px;
  align-items: center;
  justify-content: center;
}
.phone {
  font-size: 18px;
  width: 162px;
}
.callButton {
  width: 100%;
  white-space: nowrap;
}
</style>