<!-- CMS/tabs/Current.vue -->
<template>
    <section class="cms-section">

        <!-- Header -->
        <div class="cms-header">
            <div class="header-left">
                <p class="header-eyebrow">Content Management</p>
                <h4 class="header-title">Current Project Publications</h4>
            </div>
            <div class="header-right">
                <button class="info-btn" @click="showInfoModal = true" title="Publishing policy">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Publishing Policy
                </button>
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

        <!-- Status Summary -->
        <div class="status-summary">
            <div class="summary-chip chip-published" @click="setStatusFilter('published')">
                <span class="chip-dot"></span>
                <span class="chip-count">{{ publishedCount }}</span>
                Published
            </div>
            <div class="summary-chip chip-ready" @click="setStatusFilter('ready')">
                <span class="chip-dot"></span>
                <span class="chip-count">{{ readyCount }}</span>
                Ready to Publish
            </div>
            <div class="summary-chip chip-queue" @click="setStatusFilter('queue')">
                <span class="chip-dot"></span>
                <span class="chip-count">{{ queueCount }}</span>
                In Queue
            </div>
            <button v-if="statusFilter" class="clear-filter-btn" @click="statusFilter = null">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Clear filter
            </button>
        </div>

        <!-- Publish All Ready Banner -->
        <div v-if="readyCount > 0 && !statusFilter" class="publish-banner">
            <div class="banner-left">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                <div>
                    <p class="banner-title">{{ readyCount }} project{{ readyCount !== 1 ? 's are' : ' is' }} ready to
                        publish</p>
                    <p class="banner-sub">Completed projects can be published to make them publicly visible.</p>
                </div>
            </div>
            <button class="btn-publish-all" @click="publishAll">Publish All Ready</button>
        </div>

        <!-- Empty -->
        <div v-if="filteredCurrentProjects.length === 0" class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>No projects found</span>
        </div>

        <!-- Project Cards -->
        <div v-else class="cms-cards">
            <div v-for="project in filteredCurrentProjects" :key="project.id" class="cms-card" :class="{
                'card-published': project._pubStatus === 'published',
                'card-ready': project._pubStatus === 'ready',
                'card-queue': project._pubStatus === 'queue',
            }">
                <div class="card-accent"></div>
                <div class="card-body">
                    <div class="card-top">
                        <div class="card-title-group">
                            <div class="card-pub-status-badge">
                                <template v-if="project._pubStatus === 'published'">
                                    <span class="pub-badge badge-published">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Published
                                    </span>
                                    <span class="pub-date">{{ formatDate(project._publishedAt) }}</span>
                                </template>
                                <template v-else-if="project._pubStatus === 'ready'">
                                    <span class="pub-badge badge-ready">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        Ready to Publish
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="pub-badge badge-queue">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <line x1="8" y1="6" x2="21" y2="6" />
                                            <line x1="8" y1="12" x2="21" y2="12" />
                                            <line x1="8" y1="18" x2="21" y2="18" />
                                            <line x1="3" y1="6" x2="3.01" y2="6" />
                                            <line x1="3" y1="12" x2="3.01" y2="12" />
                                            <line x1="3" y1="18" x2="3.01" y2="18" />
                                        </svg>
                                        In Queue
                                    </span>
                                </template>
                            </div>
                            <h3 class="card-title">{{ project.title }}</h3>
                            <p class="card-proponent">by {{ project.proponent }}</p>
                        </div>

                        <div class="card-actions">
                            <button class="btn-preview" @click="openPreview(project)" title="Preview publication">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                Preview
                            </button>
                            <button v-if="project._pubStatus === 'ready'" class="btn-publish"
                                @click="publishProject(project)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                                Publish
                            </button>
                            <button v-if="project._pubStatus === 'published'" class="btn-unpublish"
                                @click="openUnpublishConfirm(project)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                </svg>
                                Unpublish
                            </button>
                            <button v-if="project._pubStatus === 'queue'" class="btn-disabled" disabled
                                title="Project must be completed before publishing">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                Not Ready
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
                                        <span class="inline-fill"
                                            :class="project.status === 'Completed' ? 'fill-green' : 'fill-blue'"
                                            :style="{ width: project.progress + '%' }"></span>
                                    </span>
                                    {{ project.progress }}%
                                </span>
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Status</span>
                            <span class="status-badge"
                                :class="project.status === 'Completed' ? 'badge-green' : 'badge-amber'">
                                <span class="badge-dot"></span>{{ project.status }}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Committees</span>
                            <span class="detail-value">
                                <span v-if="project.committees?.length" class="committee-chips">
                                    <span v-for="c in project.committees" :key="c.name" class="committee-chip">{{ c.name
                                        }}</span>
                                </span>
                                <span v-else class="detail-none">None</span>
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Expense</span>
                            <span class="status-badge"
                                :class="project.expenseVerification === 'Ready' ? 'badge-green' : 'badge-red'">
                                <span class="badge-dot"></span>{{ project.expenseVerification }}
                            </span>
                        </div>
                    </div>

                    <div v-if="project._pubStatus === 'queue'" class="queue-note">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        This project is still <strong>{{ project.status }}</strong> ({{ project.progress }}% complete).
                        It will
                        become eligible for publishing once marked Completed.
                    </div>
                </div>
            </div>
        </div>

        <!-- ══════════════ INFO MODAL ══════════════ -->
        <div v-if="showInfoModal" class="modal-backdrop" @click.self="showInfoModal = false">
            <div class="modal modal-info">
                <div class="modal-header">
                    <div class="modal-header-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="modal-title">Publishing Policy</h3>
                        <p class="modal-subtitle">How project publishing works</p>
                    </div>
                    <button class="modal-close" @click="showInfoModal = false">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="policy-item">
                        <div class="policy-icon policy-icon-green">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <div>
                            <p class="policy-title">Ready to Publish</p>
                            <p class="policy-desc">A project becomes eligible for publishing once its status is marked
                                as
                                <strong>Completed</strong>. You can then manually publish it at any time.
                            </p>
                        </div>
                    </div>
                    <div class="policy-item">
                        <div class="policy-icon policy-icon-amber">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="8" y1="6" x2="21" y2="6" />
                                <line x1="8" y1="12" x2="21" y2="12" />
                                <line x1="8" y1="18" x2="21" y2="18" />
                                <line x1="3" y1="6" x2="3.01" y2="6" />
                                <line x1="3" y1="12" x2="3.01" y2="12" />
                                <line x1="3" y1="18" x2="3.01" y2="18" />
                            </svg>
                        </div>
                        <div>
                            <p class="policy-title">In Queue</p>
                            <p class="policy-desc">Projects that are still ongoing are placed in the publishing queue.
                                They
                                cannot be
                                published until they are completed.</p>
                        </div>
                    </div>
                    <div class="policy-item">
                        <div class="policy-icon policy-icon-blue">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <div>
                            <p class="policy-title">Automatic Publishing at Year-End</p>
                            <p class="policy-desc"><strong>All project records for the current administration year will
                                    be
                                    automatically published at the end of the administration year</strong>, regardless
                                of their
                                individual
                                publish status. This ensures full transparency and a complete public record.</p>
                        </div>
                    </div>
                    <div class="policy-item">
                        <div class="policy-icon policy-icon-gray">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="21 8 21 21 3 21 3 8" />
                                <rect x="1" y="3" width="22" height="5" />
                                <line x1="10" y1="12" x2="14" y2="12" />
                            </svg>
                        </div>
                        <div>
                            <p class="policy-title">Permanent Archive</p>
                            <p class="policy-desc">Once a project is auto-published at year-end or moved to a previous
                                administration's record, it becomes <strong>permanently archived</strong> and can no
                                longer be
                                unpublished.</p>
                        </div>
                    </div>
                    <div class="policy-highlight">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path
                                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <p>Publishing makes the full project record — including its title, proponent, budget,
                            committees, dates,
                            and
                            progress — publicly visible. No information is added or removed.</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-got-it" @click="showInfoModal = false">Got it</button>
                </div>
            </div>
        </div>

        <!-- ══════════════ PREVIEW MODAL ══════════════ -->
        <div v-if="previewProject" class="modal-backdrop" @click.self="previewProject = null">
            <div class="modal modal-preview">
                <div class="modal-header">
                    <div class="modal-header-icon modal-header-icon-preview">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="modal-title">Publication Preview</h3>
                        <p class="modal-subtitle">This is exactly what will be publicly shown</p>
                    </div>
                    <button class="modal-close" @click="previewProject = null">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div class="modal-body preview-body">
                    <div class="preview-section">
                        <p class="preview-eyebrow">Project Record</p>
                        <h2 class="preview-title">{{ previewProject.title }}</h2>
                        <p class="preview-proponent">Proponent: <strong>{{ previewProject.proponent }}</strong></p>
                    </div>
                    <div class="preview-grid">
                        <div class="preview-field">
                            <span class="preview-label">Project ID</span>
                            <span class="preview-value mono">{{ previewProject.id }}</span>
                        </div>
                        <div class="preview-field">
                            <span class="preview-label">Area of Participation</span>
                            <span class="preview-value">{{ previewProject.area }}</span>
                        </div>
                        <div class="preview-field">
                            <span class="preview-label">Total Budget</span>
                            <span class="preview-value">₱{{ formatCurrency(previewProject.budget) }}</span>
                        </div>
                        <div class="preview-field">
                            <span class="preview-label">Amount Spent</span>
                            <span class="preview-value">₱{{ formatCurrency(previewProject.spent) }}</span>
                        </div>
                        <div class="preview-field">
                            <span class="preview-label">Date Started</span>
                            <span class="preview-value">{{ formatDate(previewProject.dates.started) }}</span>
                        </div>
                        <div class="preview-field">
                            <span class="preview-label">Due Date</span>
                            <span class="preview-value">{{ formatDate(previewProject.dates.due) }}</span>
                        </div>
                        <div class="preview-field">
                            <span class="preview-label">Date Accomplished</span>
                            <span class="preview-value">{{ formatDate(previewProject.dates.accomplished) || '—'
                                }}</span>
                        </div>
                        <div class="preview-field">
                            <span class="preview-label">Status</span>
                            <span class="preview-value">{{ previewProject.status }}</span>
                        </div>
                        <div class="preview-field">
                            <span class="preview-label">Overall Progress</span>
                            <span class="preview-value">{{ previewProject.progress }}%</span>
                        </div>
                        <div class="preview-field">
                            <span class="preview-label">Expense Verification</span>
                            <span class="preview-value">{{ previewProject.expenseVerification }}</span>
                        </div>
                    </div>
                    <div class="preview-committees" v-if="previewProject.committees?.length">
                        <p class="preview-section-label">Committees</p>
                        <div class="preview-committee-grid">
                            <div v-for="c in previewProject.committees" :key="c.name" class="preview-committee-card">
                                <p class="preview-committee-name">{{ c.name }}</p>
                                <p class="preview-committee-role"><span>Chairman:</span> {{ c.chairman }}</p>
                                <p class="preview-committee-role"><span>Vice Chairman:</span> {{ c.viceChairman }}</p>
                                <p class="preview-committee-role" v-if="c.members?.length">
                                    <span>Members:</span> {{ c.members.join(', ') }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="preview-notice">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        All information above will be published as-is. No details will be added or removed from this
                        record.
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" @click="previewProject = null">Close</button>
                    <button v-if="previewProject._pubStatus === 'ready'" class="btn-publish"
                        @click="publishProject(previewProject); previewProject = null">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Publish Now
                    </button>
                </div>
            </div>
        </div>

        <!-- ══════════════ UNPUBLISH CONFIRM MODAL ══════════════ -->
        <div v-if="unpublishTarget" class="modal-backdrop" @click.self="unpublishTarget = null">
            <div class="modal modal-confirm">
                <div class="modal-header">
                    <div class="modal-header-icon modal-header-icon-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="modal-title">Unpublish Project</h3>
                        <p class="modal-subtitle">This will remove it from public view</p>
                    </div>
                    <button class="modal-close" @click="unpublishTarget = null">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="confirm-text">
                        Are you sure you want to unpublish <strong>{{ unpublishTarget?.title }}</strong>?
                        This will make it no longer visible to the public.
                        You can republish it at any time while this administration is active.
                    </p>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" @click="unpublishTarget = null">Cancel</button>
                    <button class="btn-confirm-unpublish" @click="confirmUnpublish">Yes, Unpublish</button>
                </div>
            </div>
        </div>

    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import projectsData from '~/assets/data/projects.json';

// ─── Helpers ──────────────────────────────────────────────
const formatCurrency = (v) =>
    (v || v === 0) ? new Intl.NumberFormat('en-US').format(v) : '—';

const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const CURRENT_YEAR = new Date().getFullYear();

// ─── Derive publish status ─────────────────────────────────
const pubStatus = (project) => {
    if (project._published) return 'published';
    if (project.status === 'Completed') return 'ready';
    return 'queue';
};

// ─── Reactive project list (current admin year only) ──────
const allProjects = ref(
    projectsData
        .filter(p => new Date(p.dates.started).getFullYear() === CURRENT_YEAR)
        .map(p => ({
            ...p,
            _published: false,
            _publishedAt: null,
            _adminYear: CURRENT_YEAR,
        }))
);

const currentProjects = computed(() =>
    allProjects.value.map(p => ({ ...p, _pubStatus: pubStatus(p) }))
);

// ─── UI State ─────────────────────────────────────────────
const searchQuery = ref('');
const statusFilter = ref(null);
const showInfoModal = ref(false);
const previewProject = ref(null);
const unpublishTarget = ref(null);

// ─── Stats ────────────────────────────────────────────────
const publishedCount = computed(() => currentProjects.value.filter(p => p._pubStatus === 'published').length);
const readyCount = computed(() => currentProjects.value.filter(p => p._pubStatus === 'ready').length);
const queueCount = computed(() => currentProjects.value.filter(p => p._pubStatus === 'queue').length);

// ─── Filtered list ─────────────────────────────────────────
const filteredCurrentProjects = computed(() => {
    let list = currentProjects.value;
    if (statusFilter.value) list = list.filter(p => p._pubStatus === statusFilter.value);
    const q = searchQuery.value.trim().toLowerCase();
    if (!q) return list;
    return list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.proponent.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
    );
});

// ─── Actions ──────────────────────────────────────────────
const setStatusFilter = (status) => {
    statusFilter.value = statusFilter.value === status ? null : status;
};

const publishProject = (project) => {
    const target = allProjects.value.find(p => p.id === project.id);
    if (!target || target.status !== 'Completed') return;
    target._published = true;
    target._publishedAt = new Date().toISOString().split('T')[0];
};

const publishAll = () => {
    allProjects.value.forEach(p => {
        if (p.status === 'Completed' && !p._published) {
            p._published = true;
            p._publishedAt = new Date().toISOString().split('T')[0];
        }
    });
};

const openUnpublishConfirm = (project) => { unpublishTarget.value = project; };

const confirmUnpublish = () => {
    const target = allProjects.value.find(p => p.id === unpublishTarget.value?.id);
    if (target) { target._published = false; target._publishedAt = null; }
    unpublishTarget.value = null;
};

const openPreview = (project) => { previewProject.value = project; };
</script>

<style src="~/assets/project-css/cms.css" scoped></style>