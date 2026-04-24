<!-- CMS/index.vue -->
<template>
  <TabView :tabs="tabs" v-model="activeTab">

    <template #tab-0>
      <Current :projects="currentProjects" @publish="publishProject" @preview="openPreview" />
    </template>

    <template #tab-1>
      <Previous :projects="previousProjects" @preview="openPreview" />
    </template>

  </TabView>
</template>

<script setup>
import { ref, computed } from 'vue'
import projectsData from '~/assets/data/projects.json'

import Current from './tabs/Current.vue'
import Previous from './tabs/Previous.vue'

const tabs = ['Current Projects', 'Previous Projects']
const activeTab = ref(0)

const CURRENT_YEAR = new Date().getFullYear()

// 🔹 single source of truth
const allProjects = ref(
  projectsData.map(p => ({
    ...p,
    _published: false,
    _publishedAt: null,
  }))
)

// 🔹 derived
const currentProjects = computed(() =>
  allProjects.value.filter(p =>
    new Date(p.dates.started).getFullYear() === CURRENT_YEAR
  )
)

const previousProjects = computed(() =>
  allProjects.value.filter(p =>
    new Date(p.dates.started).getFullYear() < CURRENT_YEAR
  )
)

// 🔹 actions (shared)
const publishProject = (project) => {
  const target = allProjects.value.find(p => p.id === project.id)
  if (!target || target.status !== 'Completed') return

  target._published = true
  target._publishedAt = new Date().toISOString().split('T')[0]
}

const openPreview = (project) => {
  console.log('preview', project)
}
</script>