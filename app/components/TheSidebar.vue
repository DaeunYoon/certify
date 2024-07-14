<script setup lang="ts">
import { NMenu } from 'naive-ui';
import {
  FileTrayOutline as FileIcon,
  HomeOutline as HomeIcon,
  ShieldCheckmarkOutline as ShieldIcon,
} from '@vicons/ionicons5';
import { NuxtLink } from '#components';
import { renderIcon } from '~/helpers/index';

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
    label: () => renderMenuLabel('Schemas', '/schema'),
    key: 'schema',
    icon: renderIcon(FileIcon),
  },
  {
    label: () => renderMenuLabel('Attestations', '/attestation'),
    key: 'attestation',
    icon: renderIcon(ShieldIcon),
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
