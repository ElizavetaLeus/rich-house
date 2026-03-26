<template>
  <button
    :class="classList"
    @click="emitListener()"
    :style="styleList"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';

type ButtonType = 'default' | 'text';
type ButtonColour = 'default'| 'secondary' | 'transparent'

interface Props {
  text: string,
  type?: ButtonType,
  colour?: ButtonColour,
  maxWidth?: number,
}
interface Emits {
  (event: 'click'): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  colour: 'default',
  maxWidth: 0,
});
const emits = defineEmits<Emits>();
const $style = useCssModule();

const classList = computed(() => {
  return [
    $style.button,
    props.type === 'text' && $style.buttonTypeText,
    props.colour === 'secondary' && $style.colourSecondary,
  ];
});
const styleList = computed(() => {
  return {
    '--max-width': props.maxWidth > 0 ? `${props.maxWidth}px` : '100%',
  };
});
const emitListener = () => {
  emits('click');
};
</script>

<style module>
.button {
  color: var(--color-white);
  background-color: var(--color-orange);
  padding-inline: 24px;
  border-radius: 6px;
  border: none;
  font-size: 18px;
  width: 100%;
  height: 50px;
  transition: 0.3s;
  line-height: 1;
  max-width: var(--max-width, 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.button:hover {
  opacity: 90%;
}
.buttonTypeText {
  padding: 0;
  background-color: transparent;
  color: var(--color-black);
  font-size: 18px;
  height: fit-content;
  width: fit-content;
}
.colourSecondary {
  color: var(--color-orange);
  background-color: var(--color-orange-12);
}
</style>