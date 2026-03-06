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

type ButtonSize = 'large' | 'default' | 'small';
type ButtonType = 'default' | 'text';
type ButtonColour = 'default'| 'secondary' | 'transparent'

interface Props {
  text: string,
  type?: ButtonType,
  colour?: ButtonColour,
  size?: ButtonSize,
  maxWidth?: number,
}
interface Emits {
  (event: 'click'): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'default',
  colour: 'default',
  maxWidth: 0,
});
const emits = defineEmits<Emits>();
const $style = useCssModule();

const classList = computed(() => {
  return [
    $style.button,
    props.size === 'large' && $style.buttonSizeLarge,
    props.size === 'small' && $style.buttonSizeSmall,
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
  padding-block: 16px;
  padding-inline: 32px;
  border-radius: 6px;
  border: none;
  font-size: 16px;
  width: 100%;
  height: 53px;
  transition: 0.3s;
  line-height: 1;
  max-width: var(--max-width, 100%);
}
.button:hover {
  opacity: 90%;
}
.buttonSizeLarge {
  padding-block: 16px;
  /* height: 54px; */
}
.buttonSizeSmall {
  padding-block: 12px;
  height: 48px;
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