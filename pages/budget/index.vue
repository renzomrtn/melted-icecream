<template>
  <TabView :tabs="tabs" v-model="activeTab" @tab-change="onTabChange" />
</template>

<script setup>
const tabs = ['Tab 1', 'Tab 2', 'Tab 3']
const activeTab = ref(0)

const onTabChange = inject('onTabChange', () => {})
</script>
