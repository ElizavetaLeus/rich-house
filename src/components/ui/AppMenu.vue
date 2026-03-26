<template>
  <nav :class="$style.menu">
    <AppMenuItem
      v-for="menuItem in menu"
      :listName="menuItem.text"
      :listHref="menuItem.href"
      :children="menuItem.children"
    />
  </nav>
</template>

<script setup lang="ts">
import { DropdownMenuListItem } from '@/types/DropdownMenuListItem';
import AppMenuItem from './AppMenuItem.vue';
import { EnumRouteName } from '@/router/enum-route-name';

interface Menu extends DropdownMenuListItem {
    children?: DropdownMenuListItem[],
}

const serviceChildren = [
  { text: 'Строительство частных домов', href: '#' },
  { text: 'Строительство коммерческих зданий', href: '#' },
  { text: 'Индивидуальное проектирование', href: '#' },
  { text: 'Экспресс-строительство', href: '#' },
];

const menu: Menu[] = [
  { text: 'Проекты', href: EnumRouteName.PROJECTS },
  { text: 'Услуги', href: '', children: serviceChildren },
  { text: 'Построенные дома', href: EnumRouteName.BUILT_HOUSES },
  { text: 'Полезное', href: '', children: [] },
  { text: 'Контакты', href: EnumRouteName.CONTACTS },

];

</script>

<style module>
.menu {
  display: flex;
  gap: 48px;
  align-items: center;
  justify-content: center;
}
</style>