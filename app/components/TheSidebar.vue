<script setup lang="ts">
import { NMenu } from 'naive-ui';
import {
  FileTrayOutline as FileIcon,
  HomeOutline as HomeIcon,
} from '@vicons/ionicons5';
import { NuxtLink } from '#components';
import { renderIcon } from '~/helpers';

function renderMenuLabel(label: string, to: string) {
  return h(NuxtLink, { to }, label);
}

const menuOptions = [
  {
    label: () => renderMenuLabel('Home', '/'),
    key: 'home',
    icon: renderIcon(HomeIcon),
  },
  {
    label: () => renderMenuLabel('Schemas', '/schemas'),
    key: 'schema',
    icon: renderIcon(FileIcon),
  },
];
</script>
<template>
  <n-menu
    :options="menuOptions"
    :collapsed-width="64"
    :collapsed-icon-size="22"
  />
</template>
