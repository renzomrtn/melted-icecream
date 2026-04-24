<!-- CMS/tabs/Previous.vue -->
<template>
    <div>

        <!-- Archive Notice -->
        <div class="archive-notice">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="3" width="22" height="5" />
                <polyline points="21 8 21 21 3 21 3 8" />
                <line x1="10" y1="12" x2="14" y2="12" />
            </svg>
            These are projects published by previous administrations. They are permanently archived and cannot be
            unpublished.
        </div>

        <!-- Empty -->
        <div v-if="projects.length === 0" class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="21 8 21 21 3 21 3 8" />
                <rect x="1" y="3" width="22" height="5" />
                <line x1="10" y1="12" x2="14" y2="12" />
            </svg>
            <span>No archived publications yet</span>
        </div>

        <!-- Archive Cards -->
        <div v-else class="cms-cards">
            <div v-for="project in projects" :key="project.id" class="cms-card card-published card-archived">
                <div class="card-accent"></div>
                <div class="card-body">
                    <div class="card-top">
                        <div class="card-title-group">
                            <div class="card-pub-status-badge">
                                <span class="pub-badge badge-published">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Published
                                </span>
                                <span class="pub-date">{{ formatDate(project._publishedAt) }}</span>
                                <span class="archive-lock-badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    Permanently Archived
                                </span>
                            </div>
                            <h3 class="card-title">{{ project.title }}</h3>
                            <p class="card-proponent">by {{ project.proponent }}</p>
                        </div>
                        <div class="card-actions">
                            <button class="btn-preview" @click="$emit('openPreview', project)"
                                title="Preview publication">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                Preview
                            </button>
                        </div>
                    </div>
                    <div class="card-details">
                        <div class="detail-item">
                            <span class="detail-label">Project ID</span>
                            <span class="detail-value mono">{{ project.id }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Area</span>
                            <span class="detail-value">{{ project.area }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Budget</span>
                            <span class="detail-value">₱{{ formatCurrency(project.budget) }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Spent</span>
                            <span class="detail-value spent">₱{{ formatCurrency(project.spent) }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Started</span>
                            <span class="detail-value">{{ formatDate(project.dates.started) }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Accomplished</span>
                            <span class="detail-value">{{ formatDate(project.dates.accomplished) || '—' }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Progress</span>
                            <span class="detail-value">
                                <span class="inline-progress">
                                    <span class="inline-track">
                                        <span class="inline-fill fill-green" style="width: 100%"></span>
                                    </span>
                                    100%
                                </span>
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Admin Year</span>
                            <span class="detail-value">{{ new Date(project.dates.started).getFullYear() }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
defineProps({
    projects: { type: Array, default: () => [] }
})

defineEmits(['openPreview']);

const formatCurrency = (v) =>
    (v || v === 0) ? new Intl.NumberFormat('en-US').format(v) : '—';

const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
</script>

<style scoped src="~/assets/project-css/cms.css"></style>