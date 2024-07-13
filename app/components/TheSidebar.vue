<script setup lang="ts">
import { NMenu } from 'naive-ui';

const menuOptions = [
  {
    label: 'Home',
    key: 'home',
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
