<!-- Project Management/Tabs/Projects.vue -->
<template>
    <section class="projects-section">

        <!-- Header -->
        <div class="projects-header">
            <div class="header-left">
                <p class="header-eyebrow">Project Management</p>
                <h4 class="header-title">Projects for {{ currentYear }}</h4>
            </div>
            <div class="header-actions">
                <div class="search-box">
                    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input type="text" placeholder="Search projects..." />
                </div>
                <button class="btn-new-project">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    New Project
                </button>
            </div>
        </div>

        <!-- Stats Bar -->
        <div class="stats-bar">
            <div class="stat-item">
                <span class="stat-value">{{ filteredProjects.length }}</span>
                <span class="stat-label">Total Projects</span>
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
        </div>

        <!-- Table -->
        <div class="table-wrapper">
            <table class="projects-table">
                <thead>
                    <tr>
                        <th class="col-expand"></th>
                        <th>Proponent</th>
                        <th>Project Title</th>
                        <th>Line Item Info</th>
                        <th>Budgeting</th>
                        <th>Dates</th>
                        <th>Progress & Status</th>
                        <th>Expense</th>
                        <th class="col-action">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="project in filteredProjects" :key="project.id">

                        <!-- Main Row -->
                        <tr class="project-row" :class="{ 'row-expanded': expandedRows.has(project.id) }">
                            <td class="col-expand">
                                <button class="expand-btn" :class="{ 'is-open': expandedRows.has(project.id) }"
                                    @click="toggleRow(project.id)"
                                    :title="expandedRows.has(project.id) ? 'Collapse' : 'Expand committees'">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </button>
                            </td>
                            <td>
                                <div class="proponent-cell">
                                    <div class="proponent-avatar">{{ getInitials(project.proponent) }}</div>
                                    <span class="proponent-name">{{ project.proponent }}</span>
                                </div>
                            </td>
                            <td><span class="project-title">{{ project.title }}</span></td>
                            <td>
                                <div class="info-cell">
                                    <div class="info-row">
                                        <span class="info-label">ID</span>
                                        <span class="info-value info-mono">{{ project.line_item_id }}</span>
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
                            <td class="col-action">
                                <button class="action-edit-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>

                        <!-- Accordion Row -->
                        <tr v-if="expandedRows.has(project.id)" class="accordion-row">
                            <td colspan="9" class="accordion-cell">
                                <div class="accordion-inner">
                                    <div class="accordion-heading">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="accordion-heading-icon">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                        Committees
                                        <span class="accordion-count">{{ project.committees.length }}</span>
                                        <span class="accordion-hint">Click a card to open its Kanban board</span>
                                    </div>

                                    <div class="committee-grid">
                                        <div v-for="(committee, ci) in project.committees" :key="ci"
                                            class="committee-card" role="button" tabindex="0"
                                            :title="`Open ${committee.name} Kanban board`"
                                            @click="openKanban(project, committee)"
                                            @keydown.enter="openKanban(project, committee)"
                                            @keydown.space.prevent="openKanban(project, committee)">

                                            <!-- Card Header -->
                                            <div class="committee-card-header">
                                                <span class="committee-name">{{ committee.name }}</span>
                                                <div class="committee-header-right">
                                                    <span class="committee-pill">Committee</span>
                                                    <span class="kanban-arrow">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                            fill="none" stroke="currentColor" stroke-width="2.5"
                                                            stroke-linecap="round" stroke-linejoin="round">
                                                            <line x1="5" y1="12" x2="19" y2="12" />
                                                            <polyline points="12 5 19 12 12 19" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>

                                            <!-- Chairman & Vice Chairman -->
                                            <div class="committee-section">
                                                <div class="committee-member-row">
                                                    <div class="member-avatar avatar-blue">{{
                                                        getInitials(committee.chairman) }}</div>
                                                    <div class="member-info">
                                                        <span class="member-role">Chairman</span>
                                                        <span class="member-name">{{ committee.chairman }}</span>
                                                    </div>
                                                </div>
                                                <div class="committee-member-row">
                                                    <div class="member-avatar avatar-teal">{{
                                                        getInitials(committee.viceChairman) }}</div>
                                                    <div class="member-info">
                                                        <span class="member-role">Vice Chairman</span>
                                                        <span class="member-name">{{ committee.viceChairman }}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Members (limited) -->
                                            <div class="committee-members-section" v-if="committee.members?.length">
                                                <p class="members-label">
                                                    Members
                                                    <span class="members-total">{{ committee.members.length }}</span>
                                                </p>
                                                <div class="committee-member-row"
                                                    v-for="(member, mi) in visibleMembers(committee.members)" :key="mi">
                                                    <div class="member-avatar avatar-coral">{{ getInitials(member) }}
                                                    </div>
                                                    <span class="member-name-only">{{ member }}</span>
                                                </div>
                                                <div v-if="hiddenMemberCount(committee.members) > 0"
                                                    class="overflow-row">
                                                    <div class="overflow-avatars">
                                                        <div v-for="(m, oi) in overflowPreviewAvatars(committee.members)"
                                                            :key="oi" class="overflow-avatar avatar-coral">{{
                                                                getInitials(m) }}</div>
                                                    </div>
                                                    <span class="overflow-label">+{{
                                                        hiddenMemberCount(committee.members) }} more</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </template>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-bar">
            <span class="page-info">Showing 1–{{ projects.length }} of {{ projects.length }} projects</span>
            <div class="page-controls">
                <button class="page-btn" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Previous
                </button>
                <span class="page-number page-active">1</span>
                <button class="page-btn">
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </div>

    </section>
</template>

<script setup>
import { navigateTo } from 'nuxt/app';
import { ref, computed } from 'vue';
import projectsData from '~/assets/data/projects.json';

const MEMBER_LIMIT = 2;

const projects = ref(projectsData);

const currentYear = new Date().getFullYear();

const filteredProjects = computed(() => {
    return projects.value.filter(project => {
        return new Date(project.dates.started).getFullYear() === currentYear;
    });
});

const expandedRows = ref(new Set());

const toggleRow = (id) => {
    const next = new Set(expandedRows.value);
    next.has(id) ? next.delete(id) : next.add(id);
    expandedRows.value = next;
};

const openKanban = (project, committee) => {
    navigateTo({
        path: '/project-management/tabs/kanban',
        query: {
            projectId: project.id,
            committeeName: committee.name,
        },
    });
};

const visibleMembers = (members = []) => members.slice(0, MEMBER_LIMIT);
const hiddenMemberCount = (members = []) => Math.max(0, members.length - MEMBER_LIMIT);
const overflowPreviewAvatars = (members = []) => members.slice(MEMBER_LIMIT, MEMBER_LIMIT + 2);

const completedCount = computed(() =>
    filteredProjects.value.filter(p => p.status === 'Completed').length
);

const inProgressCount = computed(() =>
    filteredProjects.value.filter(p => p.status !== 'Completed').length
);
const getInitials = (name) =>
    (name || '?').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

const formatCurrency = (v) =>
    (v || v === 0) ? new Intl.NumberFormat('en-US').format(v) : '—';

const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
</script>

<style src="~/assets/project-css/projects.css" scoped></style>