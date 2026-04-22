<!-- Project Management/index.vue -->
<template>
  <TabView :tabs="tabs" v-model="activeTab" @tab-change="onTabChange">
    <template #tab-0>
      <Projects />
    </template>
    <template #tab-1>
      <Monitoring />
    </template>
    <template #tab-2>
      <Records />
    </template>
  </TabView>
</template>

<script setup>
import Projects from './tabs/Projects.vue';
import Monitoring from './tabs/Monitoring.vue';
import Records from './tabs/Records.vue';

const tabs = ['Projects', 'Monitoring', 'Records']
const activeTab = ref(0)

const onTabChange = inject('onTabChange', () => { })
</script>