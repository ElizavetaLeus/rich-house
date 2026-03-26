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
  font-size: 17px;
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
  background: var(--color-white-70);
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-orange-30);
  box-shadow: 0 10px 30px -5px rgba(var(--color-black-base), 0.15),
              0 5px 15px rgba(var(--color-black-base), 0.05);
  padding: 8px 0;
  transform: translateY(-5px);
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s, top 0.3s;
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
  transform: translateY(0); 
}
.underListItem {
  padding: 0;
}
.underListItemLink {
  display: block;
  padding: 10px 20px;
  color: var(--color-black);
  text-decoration: none;
  font-size: 15px;
  white-space: nowrap;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}
.underListItemLink:hover {
  background: var(--color-orange-10);
  color: var(--color-orange);
  padding-left: 24px;
}
.underListItem:not(:last-child) .underListItemLink {
  border-bottom: 1px solid var(--color-black-10);
}
.underListItemLink:active {
  background: var(--color-orange-12);
  transform: scale(0.98);
}
</style>