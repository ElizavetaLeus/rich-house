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
  padding-block: 10px;
  display: flex;
  width: 100%;
}
.logoWrapper {
  padding-inline: 28px;
  border-inline-end: 1px solid var(--color-gray-light);
}
.headerMenu {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.feedback {
  display: flex;
  gap: 48px;
  align-items: center;
  justify-content: center;
  padding-inline-end: 56px;
}
.phone {
  font-size: 17px;
  max-width: 162px;
  width: 100%;
}
.callButton {
  max-width: 187px;
  width: 100%;
  padding-inline: 24px;
}
</style>