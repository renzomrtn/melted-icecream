<!-- Project Management/Tabs/Kanban.vue -->
<template>
    <section class="kanban-section">

        <!-- Header -->
        <div class="kanban-header">
            <div class="kanban-header-left">
                <button class="back-btn" @click="goBack">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back
                </button>
                <div class="header-divider"></div>
                <div class="header-meta">
                    <p class="header-eyebrow">
                        {{ project?.title ?? 'Project' }}
                        <span class="eyebrow-sep">›</span>
                        Committee Board
                    </p>
                    <h4 class="header-title">
                        {{ committee?.name ?? '' }} Committee
                    </h4>
                </div>
            </div>

            <div class="header-right">
                <!-- Committee members pill row -->
                <div class="member-pill-row" v-if="committee">
                    <div class="member-pill" :title="committee.chairman">
                        <div class="pill-avatar avatar-blue">{{ getInitials(committee.chairman) }}</div>
                        <span>{{ committee.chairman }}</span>
                        <span class="pill-role">Chair</span>
                    </div>
                    <div class="member-pill" :title="committee.viceChairman">
                        <div class="pill-avatar avatar-teal">{{ getInitials(committee.viceChairman) }}</div>
                        <span>{{ committee.viceChairman }}</span>
                        <span class="pill-role">V. Chair</span>
                    </div>
                    <div class="member-avatars-stack" v-if="committee.members?.length">
                        <div v-for="(m, i) in committee.members.slice(0, 4)" :key="i" class="stack-avatar avatar-coral"
                            :title="m" :style="{ zIndex: 10 - i }">
                            {{ getInitials(m) }}
                        </div>
                        <div v-if="committee.members.length > 4" class="stack-avatar stack-more"
                            :title="`${committee.members.length - 4} more members`">
                            +{{ committee.members.length - 4 }}
                        </div>
                    </div>
                </div>

                <button class="btn-add-task" @click="openAddTask()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Task
                </button>
            </div>
        </div>

        <!-- Board -->
        <div class="board">
            <div v-for="col in columns" :key="col.id" class="board-column" @dragover.prevent
                @drop="onDrop($event, col.id)">

                <!-- Column Header -->
                <div class="col-header">
                    <div class="col-title-row">
                        <span class="col-dot" :style="{ background: col.color }"></span>
                        <span class="col-title">{{ col.label }}</span>
                        <span class="col-count">{{ tasksByColumn(col.id).length }}</span>
                    </div>
                    <button class="col-add-btn" @click="openAddTask(col.id)" :title="`Add to ${col.label}`">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                </div>

                <!-- Column accent bar -->
                <div class="col-bar" :style="{ background: col.color }"></div>

                <!-- Task Cards -->
                <div class="task-list">
                    <div v-for="task in tasksByColumn(col.id)" :key="task.id" class="task-card" draggable="true"
                        @dragstart="onDragStart($event, task.id)">

                        <!-- Priority badge -->
                        <div class="task-top">
                            <span class="priority-badge" :class="`priority-${task.priority}`">{{ task.priority }}</span>
                            <button class="task-menu-btn" @click.stop>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <circle cx="12" cy="5" r="1.5" />
                                    <circle cx="12" cy="12" r="1.5" />
                                    <circle cx="12" cy="19" r="1.5" />
                                </svg>
                            </button>
                        </div>

                        <p class="task-title">{{ task.title }}</p>

                        <p v-if="task.description" class="task-desc">{{ task.description }}</p>

                        <!-- Tags -->
                        <div class="task-tags" v-if="task.tags?.length">
                            <span class="task-tag" v-for="tag in task.tags" :key="tag">{{ tag }}</span>
                        </div>

                        <!-- Footer -->
                        <div class="task-footer">
                            <div class="task-assignee" v-if="task.assignee">
                                <div class="task-avatar avatar-coral">{{ getInitials(task.assignee) }}</div>
                                <span class="task-assignee-name">{{ task.assignee }}</span>
                            </div>
                            <div class="task-due" v-if="task.due" :class="{ 'due-overdue': isOverdue(task.due) }">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                {{ formatDate(task.due) }}
                            </div>
                        </div>

                    </div>

                    <!-- Empty state -->
                    <div v-if="tasksByColumn(col.id).length === 0" class="col-empty">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <line x1="9" y1="9" x2="15" y2="9" />
                            <line x1="9" y1="12" x2="15" y2="12" />
                            <line x1="9" y1="15" x2="11" y2="15" />
                        </svg>
                        <span>No tasks yet</span>
                    </div>
                </div>

            </div>
        </div>

        <!-- Add Task Modal -->
        <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">New Task</h3>
                    <button class="modal-close" @click="closeModal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <label class="form-label">Title <span class="required">*</span></label>
                    <input class="form-input" v-model="newTask.title" placeholder="What needs to be done?" />

                    <label class="form-label">Description</label>
                    <textarea class="form-input form-textarea" v-model="newTask.description"
                        placeholder="Optional details…" rows="2"></textarea>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Column</label>
                            <select class="form-input" v-model="newTask.columnId">
                                <option v-for="col in columns" :key="col.id" :value="col.id">{{ col.label }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Priority</label>
                            <select class="form-input" v-model="newTask.priority">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Assignee</label>
                            <select class="form-input" v-model="newTask.assignee">
                                <option value="">— Unassigned —</option>
                                <option v-for="m in allMembers" :key="m" :value="m">{{ m }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Due Date</label>
                            <input class="form-input" type="date" v-model="newTask.due" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" @click="closeModal">Cancel</button>
                    <button class="btn-create" @click="createTask" :disabled="!newTask.title.trim()">Create
                        Task</button>
                </div>
            </div>
        </div>

    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import projectsData from '~/assets/data/projects.json';

const route = useRoute();
const router = useRouter();

// ─── Resolve project + committee from route query ─────────
const projectId = route.query.projectId;
const committeeName = route.query.committeeName;

const project = computed(() => projectsData.find(p => p.id === projectId) ?? null);
const committee = computed(() => project.value?.committees?.find(c => c.name === committeeName) ?? null);

// ─── All members (for assignee select) ────────────────────
const allMembers = computed(() => {
    if (!committee.value) return [];
    return [
        committee.value.chairman,
        committee.value.viceChairman,
        ...(committee.value.members ?? []),
    ];
});

// ─── Columns ───────────────────────────────────────────────
const columns = [
    { id: 'todo', label: 'To Do', color: '#94a3b8' },
    { id: 'inprogress', label: 'In Progress', color: '#2e4fa3' },
    { id: 'review', label: 'For Review', color: '#f59e0b' },
    { id: 'done', label: 'Done', color: '#10b981' },
];

// ─── Seed tasks from committee context ────────────────────
const seedTasks = (committee) => {
    if (!committee) return [];

    const base = [
        { col: 'todo', priority: 'high', title: 'Finalize committee workplan', desc: 'Draft and align objectives for the quarter.', tags: ['Planning'], assignee: committee.chairman },
        { col: 'todo', priority: 'medium', title: 'Prepare budget proposal', desc: 'Break down costs per activity.', tags: ['Finance'], assignee: committee.viceChairman },
        { col: 'todo', priority: 'low', title: 'Coordinate with other committees', desc: 'Schedule alignment meeting.', tags: ['Coordination'], assignee: committee.members?.[0] ?? committee.chairman },
        { col: 'inprogress', priority: 'high', title: 'Execute primary deliverable', desc: 'Main output for the committee this cycle.', tags: ['Delivery'], assignee: committee.chairman },
        { col: 'inprogress', priority: 'medium', title: 'Gather resource requirements', desc: 'Collect needs from all sub-groups.', tags: ['Resources'], assignee: committee.viceChairman },
        { col: 'review', priority: 'medium', title: 'Review documentation', desc: 'Proof-read all submitted reports.', tags: ['Docs'], assignee: committee.chairman },
        { col: 'review', priority: 'low', title: 'Validate completed tasks', desc: 'Cross-check against success criteria.', tags: ['QA'], assignee: committee.members?.[1] ?? committee.viceChairman },
        { col: 'done', priority: 'high', title: 'Initial committee orientation', desc: 'Onboarded all members on project scope.', tags: ['Onboarding'], assignee: committee.chairman },
        { col: 'done', priority: 'low', title: 'Set up communication channels', desc: 'Group chats and email threads established.', tags: ['Comms'], assignee: committee.members?.[0] ?? committee.viceChairman },
    ];

    const today = new Date();
    const due = (daysOffset) => {
        const d = new Date(today);
        d.setDate(d.getDate() + daysOffset);
        return d.toISOString().split('T')[0];
    };

    const dueDates = [-3, 7, 14, 3, 10, 5, 8, -10, -5];

    return base.map((t, i) => ({
        id: `task-${i}`,
        columnId: t.col,
        title: t.title,
        description: t.desc,
        priority: t.priority,
        tags: t.tags,
        assignee: t.assignee ?? '',
        due: due(dueDates[i]),
    }));
};

const tasks = ref(seedTasks(committee.value));

// ─── Board helpers ─────────────────────────────────────────
const tasksByColumn = (colId) => tasks.value.filter(t => t.columnId === colId);

// ─── Drag & Drop ───────────────────────────────────────────
let draggingId = null;

const onDragStart = (e, taskId) => {
    draggingId = taskId;
    e.dataTransfer.effectAllowed = 'move';
};

const onDrop = (e, colId) => {
    if (!draggingId) return;
    const task = tasks.value.find(t => t.id === draggingId);
    if (task) task.columnId = colId;
    draggingId = null;
};

// ─── Add Task Modal ────────────────────────────────────────
const showModal = ref(false);
const newTask = ref(emptyTask());

function emptyTask(columnId = 'todo') {
    return { title: '', description: '', columnId, priority: 'medium', assignee: '', due: '', tags: [] };
}

const openAddTask = (colId = 'todo') => {
    newTask.value = emptyTask(colId);
    showModal.value = true;
};

const closeModal = () => { showModal.value = false; };

const createTask = () => {
    if (!newTask.value.title.trim()) return;
    tasks.value.push({
        ...newTask.value,
        id: `task-${Date.now()}`,
        tags: newTask.value.tags ?? [],
    });
    closeModal();
};

// ─── Utilities ─────────────────────────────────────────────
const goBack = () => router.back();

const getInitials = (name) =>
    (name || '?').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const isOverdue = (dateStr) => dateStr && new Date(dateStr) < new Date();
</script>

<style src="~/assets/project-css/kanban.css" scoped></style>