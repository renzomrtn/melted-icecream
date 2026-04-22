<!-- root/components.TabView.vue -->
<template>
  <div class="tab-view">
    <!-- Tab bar (Google Classroom style) -->
    <div class="tab-bar">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-btn"
        :class="{ 'tab-btn--active': activeTab === index }"
        @click="setTab(index)"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Tab content panels -->
    <div class="tab-panel">
      <Transition name="tab-fade" mode="out-in">
        <div :key="activeTab" class="tab-panel__inner">
          <slot :name="`tab-${activeTab}`">
            <div class="tab-placeholder">
              <div class="tab-placeholder__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
              </div>
              <p class="tab-placeholder__label">{{ tabs[activeTab] }} — content coming soon</p>
            </div>
          </slot>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    default: () => ['Tab 1', 'Tab 2', 'Tab 5']
  },
  modelValue: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue', 'tab-change'])

const activeTab = ref(props.modelValue)

function setTab(index) {
  activeTab.value = index
  emit('update:modelValue', index)
  emit('tab-change', index)
}

watch(() => props.modelValue, (val) => {
  activeTab.value = val
})
</script>

<style scoped>
.tab-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.tab-bar {
  display: flex;
  align-items: flex-end;
  background: #fff;
  border-bottom: 1px solid var(--c-border, #E2E6EA);
  padding: 0 24px;
  flex-shrink: 0;
}

.tab-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 14px 20px 13px;
  font-size: 14px;
  font-weight: 500;
  color: var(--c-text-muted, #566573);
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
  white-space: nowrap;
  border-bottom: 3px solid transparent;
  margin-bottom: -1px;
}

.tab-btn:hover {
  color: var(--c-text, #1C2833);
  background: var(--c-bg, #F7F8FA);
}

.tab-btn--active {
  color: var(--c-primary, #1A5276);
  font-weight: 600;
  border-bottom: 3px solid var(--c-primary, #1A5276);
}

.tab-panel {
  flex: 1;
  overflow-y: auto;
  padding: 28px 24px;
  background: var(--c-bg, #F7F8FA);
}

.tab-panel__inner { min-height: 100%; }

.tab-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 240px;
  gap: 12px;
  color: var(--c-text-muted, #566573);
}

.tab-placeholder__icon svg { width: 48px; height: 48px; stroke: #aab; }
.tab-placeholder__label { font-size: 14px; }

.tab-fade-enter-active,
.tab-fade-leave-active { transition: opacity 0.14s ease; }
.tab-fade-enter-from,
.tab-fade-leave-to     { opacity: 0; }

@media (max-width: 480px) {
  .tab-bar { padding: 0 12px; }
  .tab-btn { padding: 12px 14px 11px; font-size: 13px; }
  .tab-panel { padding: 20px 14px; }
}
</style>
