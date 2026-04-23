<!-- Project Management/Tabs/Monitoring.vue -->
<template>
    <section class="monitoring-section">

        <!-- Header -->
        <div class="monitoring-header">
            <div class="header-left">
                <h4 class="header-title">Barangay Project Monitoring</h4>
            </div>

            <div class="header-controls">
                <!-- Year Dropdown -->
                <div class="select-wrapper">
                    <select class="control-select" v-model="selectedYear">
                        <option v-for="y in availableYears" :key="y" :value="y">{{ y }}</option>
                    </select>
                    <svg class="select-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>

                <!-- Barangay Dropdown -->
                <div class="select-wrapper">
                    <select class="control-select barangay-select" v-model="selectedBarangay">
                        <option value="all">All Barangays</option>
                        <option v-for="b in barangays" :key="b.id" :value="b.id">{{ b.name }}</option>
                    </select>
                    <svg class="select-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>

                <!-- Search -->
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

        <!-- Stats Bar -->
        <div class="stats-bar">
            <div class="stat-item">
                <span class="stat-value">{{ activeBarangayLabel }}</span>
                <span class="stat-label">Viewing</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
                <span class="stat-value">{{ filteredProjects.length }}</span>
                <span class="stat-label">Projects</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
                <span class="stat-value">{{ completedCount }}</span>
                <span class="stat-label">Completed</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
                <span class="stat-value">{{ inProgressCount }}</span>
                <span class="stat-label">In Progress</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
                <span class="stat-value">₱{{ formatCurrency(totalBudget) }}</span>
                <span class="stat-label">Total Budget</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
                <span class="stat-value">{{ avgProgress }}%</span>
                <span class="stat-label">Avg. Progress</span>
            </div>
        </div>

        <!-- "All Barangays" overview grid — shown only when no specific barangay is selected -->
        <div v-if="selectedBarangay === 'all'" class="barangay-overview-grid">
            <div v-for="b in barangaysWithData" :key="b.id" class="barangay-overview-card"
                @click="selectedBarangay = b.id">

                <div class="bov-top">
                    <div class="bov-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </div>
                    <div class="bov-meta">
                        <span class="bov-name">{{ b.name }}</span>
                        <span class="bov-count">{{ b.count }} project{{ b.count !== 1 ? 's' : '' }}</span>
                    </div>
                    <div class="bov-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </div>
                </div>

                <div class="bov-progress-track">
                    <div class="bov-progress-fill" :style="{ width: b.avgProgress + '%' }"></div>
                </div>

                <div class="bov-footer">
                    <span class="bov-avg">{{ b.avgProgress }}% avg. progress</span>
                    <span class="bov-budget">₱{{ formatCurrency(b.totalBudget) }}</span>
                </div>

            </div>

            <!-- Barangays with no projects in selected year -->
            <div v-for="b in barangaysWithoutData" :key="b.id" class="barangay-overview-card card-empty"
                @click="selectedBarangay = b.id">
                <div class="bov-top">
                    <div class="bov-icon bov-icon-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </div>
                    <div class="bov-meta">
                        <span class="bov-name">{{ b.name }}</span>
                        <span class="bov-count bov-none">No projects</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Table — shown when a specific barangay is selected -->
        <template v-else>
            <div v-if="filteredProjects.length === 0" class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>No projects found for <strong>{{ activeBarangayLabel }}</strong> in {{ selectedYear }}</span>
                <button class="empty-reset" @click="selectedBarangay = 'all'">View all barangays</button>
            </div>

            <div v-else class="table-wrapper">
                <table class="monitoring-table">
                    <thead>
                        <tr>
                            <th>Proponent</th>
                            <th>Project Title</th>
                            <th>Line Item Information</th>
                            <th>Budgeting Information</th>
                            <th>Date Information</th>
                            <th>Progress & Status</th>
                            <th>Expense</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="project in filteredProjects" :key="project.id" class="monitoring-row">

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
                                        <span class="info-value info-spent">₱{{ formatCurrency(project.spent) }}</span>
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
                                        <span class="info-value">{{ formatDate(project.dates.accomplished) || '—'
                                            }}</span>
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

                            <td>
                                <span class="status-badge"
                                    :class="project.expenseVerification === 'Ready' ? 'badge-green' : 'badge-red'">
                                    <span class="badge-dot"></span>{{ project.expenseVerification }}
                                </span>
                            </td>

                        </tr>
                    </tbody>
                </table>

                <!-- Table footer -->
                <div class="table-footer">
                    <span class="page-info">
                        {{ filteredProjects.length }} project{{ filteredProjects.length !== 1 ? 's' : '' }}
                        · {{ activeBarangayLabel }} · {{ selectedYear }}
                    </span>
                    <button class="back-to-all" @click="selectedBarangay = 'all'">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Back to all barangays
                    </button>
                </div>
            </div>
        </template>

    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import projectsData from '~/assets/data/projects.json';

// ─── Barangay master list (tenant_id 2–28) ─────────────────
// Rename these to match your actual 27 barangays
const barangays = [
    { id: 2, name: 'Anoling' },
    { id: 3, name: 'Bukal' },
    { id: 4, name: 'Calauag' },
    { id: 5, name: 'Catambungan' },
    { id: 6, name: 'Comala' },
    { id: 7, name: 'Comon' },
    { id: 8, name: 'Cuyapi' },
    { id: 9, name: 'Dao' },
    { id: 10, name: 'Gibanga' },
    { id: 11, name: 'Ilayang Dupay' },
    { id: 12, name: 'Ilaya-Tayuman' },
    { id: 13, name: 'Isabang' },
    { id: 14, name: 'Lag-as' },
    { id: 15, name: 'Lalogan' },
    { id: 16, name: 'Mataas na Bayan' },
    { id: 17, name: 'Matingain' },
    { id: 18, name: 'Milagrosa' },
    { id: 19, name: 'Pansol' },
    { id: 20, name: 'Peñafrancia' },
    { id: 21, name: 'Poblacion' },
    { id: 22, name: 'Sabang' },
    { id: 23, name: 'San Agustin' },
    { id: 24, name: 'San Antonio' },
    { id: 25, name: 'San Isidro' },
    { id: 26, name: 'San Roque' },
    { id: 27, name: 'Santo Niño' },
    { id: 28, name: 'Sinturisan' },
];

const barangayMap = Object.fromEntries(barangays.map(b => [b.id, b.name]));

// ─── Helpers ────────────────────────────────────────────────
const getInitials = (name) =>
    (name || '?').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

const formatCurrency = (v) =>
    (v || v === 0) ? new Intl.NumberFormat('en-US').format(v) : '—';

const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// ─── All barangay projects (exclude federation: tenant_id === 1) ──
const barangayProjects = projectsData.filter(p => p.tenant_id !== 1);

// ─── Available years derived from data ──────────────────────
const availableYears = computed(() => {
    const years = [...new Set(
        barangayProjects.map(p => new Date(p.dates.started).getFullYear())
    )].sort((a, b) => b - a);
    return years;
});

// ─── State ──────────────────────────────────────────────────
const selectedYear = ref(availableYears.value[0] ?? new Date().getFullYear());
const selectedBarangay = ref('all');
const searchQuery = ref('');

// ─── Projects filtered by year (base pool) ──────────────────
const yearProjects = computed(() =>
    barangayProjects.filter(p =>
        new Date(p.dates.started).getFullYear() === Number(selectedYear.value)
    )
);

// ─── Projects filtered by year + barangay + search ──────────
const filteredProjects = computed(() => {
    let list = yearProjects.value;

    if (selectedBarangay.value !== 'all') {
        list = list.filter(p => p.tenant_id === selectedBarangay.value);
    }

    const q = searchQuery.value.trim().toLowerCase();
    if (q) {
        list = list.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.proponent.toLowerCase().includes(q) ||
            p.area.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q)
        );
    }

    return list;
});

// ─── Stats ──────────────────────────────────────────────────
const completedCount = computed(() => filteredProjects.value.filter(p => p.status === 'Completed').length);
const inProgressCount = computed(() => filteredProjects.value.filter(p => p.status !== 'Completed').length);
const totalBudget = computed(() => filteredProjects.value.reduce((s, p) => s + (p.budget || 0), 0));
const avgProgress = computed(() => {
    const list = filteredProjects.value;
    if (!list.length) return 0;
    return Math.round(list.reduce((s, p) => s + (p.progress || 0), 0) / list.length);
});

const activeBarangayLabel = computed(() =>
    selectedBarangay.value === 'all'
        ? 'All Barangays'
        : (barangayMap[selectedBarangay.value] ?? `Barangay ${selectedBarangay.value}`)
);

// ─── Overview grid data ──────────────────────────────────────
const barangaysWithData = computed(() => {
    return barangays
        .map(b => {
            const projs = yearProjects.value.filter(p => p.tenant_id === b.id);
            if (!projs.length) return null;
            const avgP = Math.round(projs.reduce((s, p) => s + (p.progress || 0), 0) / projs.length);
            const totalB = projs.reduce((s, p) => s + (p.budget || 0), 0);
            return { ...b, count: projs.length, avgProgress: avgP, totalBudget: totalB };
        })
        .filter(Boolean);
});

const barangaysWithoutData = computed(() => {
    const withData = new Set(barangaysWithData.value.map(b => b.id));
    return barangays.filter(b => !withData.has(b.id));
});
</script>

<style src="~/assets/project-css/monitoring.css" scoped></style>