<template>
  <div :class="$style.listItem">
    <div :class="$style.listItemName">
      <div v-if="listHref.length === 0">{{ listName }}</div>
      <RouterLink v-else :to="listHref">{{ listName }}</RouterLink>
      <div :class="$style.icon" v-if="children.length">
        <AppIcon name="arrow" />
      </div>
    </div>
          
    <ul v-if="children.length" :class="$style.underList">
      <li 
        v-for="item in children" 
        :key="item.href"
        :class="$style.underListItem"
      >
        <a :href="item.href" :class="$style.underListItemLink">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { DropdownMenuListItem } from '@/types/DropdownMenuListItem';
import AppIcon from './AppIcon.vue';

interface Props {
  listName: string,
  listHref: string,
  children?: DropdownMenuListItem[],
}

withDefaults(defineProps<Props>(), {
  children: (): DropdownMenuListItem[] => [],
});
</script>

<style module>
.listItem {
  --height-item: 20px;
  font-size: 18px;
  line-height: 1;
  position: relative;
  height: var(--height-item);
  width: fit-content;
}
.listItemName {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
.underList {
  max-width: max-content;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: absolute;
  left: 0;
  top: -30%;
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
  border: 1px var(--color-orange) solid;
}
.icon {
  width: 20px;
  height: 20px;
  transition: 0.3s ease;
  color: var(--color-black-25);
}
.listItem:hover .icon {
  transform: rotate(180deg);
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.listItem:hover .underList {
  opacity: 1;
  visibility: visible;
  top: var(--height-item);
}
.underListItemLink {
  display: block;
  padding-block: 4px;
}
.underListItem {
  padding: 10px 5px;
}
</style>