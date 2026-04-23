<!-- Project Management/Tabs/Archive.vue -->
<template>
    <section class="archive-section">

        <!-- Header -->
        <div class="archive-header">
            <div class="header-left">
                <p class="header-eyebrow">Project Management</p>
                <h4 class="header-title">Project Archive</h4>
            </div>
            <div class="header-actions">
                <div class="search-box">
                    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input type="text" v-model="searchQuery" placeholder="Search projects..." />
                </div>
            </div>
        </div>

        <!-- Year Panels -->
        <div class="year-panels">
            <div v-for="year in sortedYears" :key="year" class="year-panel"
                :class="{ 'panel-open': activeYear === year }">

                <!-- Year Panel Header -->
                <div class="year-panel-header" @click="setYear(year)">
                    <div class="year-panel-left">
                        <span class="year-chevron" :class="{ 'chevron-open': activeYear === year }">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </span>
                        <div class="year-label-group">
                            <span class="year-label">Projects for {{ year }}</span>
                            <span class="year-admin-tag" v-if="adminLabel(year)">{{ adminLabel(year) }}</span>
                        </div>
                    </div>
                    <div class="year-panel-right">
                        <div class="year-stats">
                            <span class="year-stat">
                                <span class="stat-dot dot-green"></span>
                                {{ completedForYear(year) }} Completed
                            </span>
                            <span class="year-stat-divider"></span>
                            <span class="year-stat">
                                <span class="stat-dot dot-amber"></span>
                                {{ inProgressForYear(year) }} In Progress
                            </span>
                            <span class="year-stat-divider"></span>
                            <span class="year-stat total">
                                {{ projectsByYear[year].length }} Total
                            </span>
                        </div>
                        <span class="year-budget">₱{{ formatCurrency(totalBudgetForYear(year)) }}</span>
                    </div>
                </div>

                <!-- Panel Body -->
                <div v-if="activeYear === year" class="panel-body">
                    <template v-if="filteredForYear(year).length === 0">
                        <div class="empty-state">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <span>No projects match "{{ searchQuery }}"</span>
                        </div>
                    </template>

                    <!-- TABLE -->
                    <template v-else>
                        <table class="archive-table">
                            <thead>
                                <tr>
                                    <th>Proponent</th>
                                    <th>Project Title</th>
                                    <th>Line Item Information</th>
                                    <th>Budgeting Information</th>
                                    <th>Date Information</th>
                                    <th>Progress & Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="project in filteredForYear(year)" :key="project.id" class="archive-row">
                                    <td>
                                        <div class="proponent-cell">
                                            <div class="proponent-avatar">{{ getInitials(project.proponent) }}</div>
                                            <span class="proponent-name">{{ project.proponent }}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="project-title">{{ project.title }}</span>
                                    </td>
                                    <td>
                                        <div class="info-cell">
                                            <div class="info-row">
                                                <span class="info-label">ID</span>
                                                <span class="info-value info-mono">{{ project.id }}</span>
                                            </div>
                                            <div class="info-row">
                                                <span class="info-label">Area</span>
                                                <span class="info-value">{{ project.area }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="info-cell">
                                            <div class="info-row">
                                                <span class="info-label">Budget</span>
                                                <span class="info-value">₱{{ formatCurrency(project.budget) }}</span>
                                            </div>
                                            <div class="info-row">
                                                <span class="info-label">Spent</span>
                                                <span class="info-value info-spent">₱{{ formatCurrency(project.spent)
                                                }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="info-cell">
                                            <div class="info-row">
                                                <span class="info-label">Started</span>
                                                <span class="info-value">{{ formatDate(project.dates.started) }}</span>
                                            </div>
                                            <div class="info-row">
                                                <span class="info-label">Due</span>
                                                <span class="info-value">{{ formatDate(project.dates.due) }}</span>
                                            </div>
                                            <div class="info-row">
                                                <span class="info-label">Done</span>
                                                <span class="info-value">{{ formatDate(project.dates.accomplished) ||
                                                    '—' }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="progress-cell">
                                            <div class="progress-top">
                                                <span class="progress-pct">{{ project.progress }}%</span>
                                                <span class="status-badge"
                                                    :class="project.status === 'Completed' ? 'badge-green' : 'badge-amber'">
                                                    <span class="badge-dot"></span>{{ project.status }}
                                                </span>
                                            </div>
                                            <div class="progress-track">
                                                <div class="progress-fill"
                                                    :class="project.status === 'Completed' ? 'fill-green' : 'fill-blue'"
                                                    :style="{ width: project.progress + '%' }">
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </template>

                    <!-- Pagination row inside panel -->
                    <div class="panel-pagination">
                        <span class="page-info">
                            {{ filteredForYear(year).length }} project{{ filteredForYear(year).length !== 1 ? 's' : ''
                            }}
                            in {{ year }}
                        </span>
                    </div>

                </div><!-- /panel-body -->
            </div><!-- /year-panel -->
        </div><!-- /year-panels -->

    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import projectsData from '~/assets/data/projects.json';

// ─── Helpers ────────────────────────────────────────────────
const getInitials = (name) =>
    (name || '?').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

const formatCurrency = (v) =>
    (v || v === 0) ? new Intl.NumberFormat('en-US').format(v) : '—';

const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Administration label per year (customise as needed)
const administrations = {
    2026: 'Current Administration',
    2025: '2024 Administration',
    2024: '2023 Administration',
    2023: '2022 Administration',
};

const adminLabel = (year) => administrations[year] ?? null;

// ─── State ──────────────────────────────────────────────────
const searchQuery = ref('');

// ─── Group projects by the start year ──────────────────────
const projectsByYear = computed(() => {
    const map = {};
    projectsData.forEach(p => {
        const year = new Date(p.dates.started).getFullYear();
        if (!map[year]) map[year] = [];
        map[year].push(p);
    });
    return map;
});

const sortedYears = computed(() =>
    Object.keys(projectsByYear.value)
        .map(Number)
        .sort((a, b) => b - a)           // newest first
);

// Only ONE year open at a time — default to the most recent
const activeYear = ref(null);
const initYear = () => {
    if (sortedYears.value.length) activeYear.value = sortedYears.value[0];
};
initYear();

const setYear = (year) => {
    activeYear.value = activeYear.value === year ? null : year;
};

// ─── Derived ────────────────────────────────────────────────
const filteredForYear = (year) => {
    const q = searchQuery.value.trim().toLowerCase();
    const list = projectsByYear.value[year] ?? [];
    if (!q) return list;
    return list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.proponent.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
    );
};

const completedForYear = (year) =>
    (projectsByYear.value[year] ?? []).filter(p => p.status === 'Completed').length;

const inProgressForYear = (year) =>
    (projectsByYear.value[year] ?? []).filter(p => p.status !== 'Completed').length;

const totalBudgetForYear = (year) =>
    (projectsByYear.value[year] ?? []).reduce((s, p) => s + (p.budget || 0), 0);
</script>

<style src="assets/project-css/records.css" scoped></style>