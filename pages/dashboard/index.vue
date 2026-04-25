<!-- Project Management/Dashboard.vue -->
<template>
  <section class="dash-section">

    <!-- ── Header ─────────────────────────────────────────── -->
    <div class="dash-header">
      <div>
        <p class="dash-eyebrow">Project Management</p>
        <h2 class="dash-title">Dashboard</h2>
        <p class="dash-sub">{{ adminYearLabel }} · As of {{ today }}</p>
      </div>
      <div class="dash-header-right">
        <div class="live-chip">
          <span class="live-dot"></span>
          Live Data
        </div>
      </div>
    </div>

    <!-- ── KPI Row ─────────────────────────────────────────── -->
    <div class="kpi-row">
      <div class="kpi-card">
        <div class="kpi-icon kpi-icon-blue">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <div class="kpi-body">
          <span class="kpi-value">{{ stats.total }}</span>
          <span class="kpi-label">Total Projects</span>
        </div>
        <div class="kpi-trend kpi-trend-neutral">{{ currentYear }}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon kpi-icon-green">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div class="kpi-body">
          <span class="kpi-value">{{ stats.completed }}</span>
          <span class="kpi-label">Completed</span>
        </div>
        <div class="kpi-trend kpi-trend-green">{{ completionRate }}%</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon kpi-icon-amber">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div class="kpi-body">
          <span class="kpi-value">{{ stats.inProgress }}</span>
          <span class="kpi-label">In Progress</span>
        </div>
        <div class="kpi-trend kpi-trend-amber">{{ 100 - completionRate }}% remaining</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon kpi-icon-purple">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <div class="kpi-body">
          <span class="kpi-value kpi-value-sm">₱{{ formatCurrencyShort(stats.totalBudget) }}</span>
          <span class="kpi-label">Total Budget</span>
        </div>
        <div class="kpi-trend kpi-trend-neutral">₱{{ formatCurrencyShort(stats.totalSpent) }} spent</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon kpi-icon-teal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <div class="kpi-body">
          <span class="kpi-value">{{ stats.avgProgress }}%</span>
          <span class="kpi-label">Avg. Progress</span>
        </div>
        <div class="kpi-trend kpi-trend-neutral">across all projects</div>
      </div>
    </div>

    <!-- ── Main Grid ──────────────────────────────────────── -->
    <div class="main-grid">

      <!-- LEFT COLUMN -->
      <div class="left-col">

        <!-- Project Status Breakdown -->
        <div class="widget">
          <div class="widget-header">
            <h3 class="widget-title">Project Status Breakdown</h3>
            <span class="widget-year-tag">{{ currentYear }}</span>
          </div>

          <!-- Stacked bar -->
          <div class="stacked-bar-wrap">
            <div class="stacked-bar">
              <div class="stack-seg seg-completed" :style="{ width: completionRate + '%' }"
                :title="`Completed: ${stats.completed}`"></div>
              <div class="stack-seg seg-inprogress" :style="{ width: (100 - completionRate) + '%' }"
                :title="`In Progress: ${stats.inProgress}`"></div>
            </div>
            <div class="stacked-labels">
              <span class="stack-label"><span class="swatch swatch-green"></span>Completed ({{ stats.completed
                }})</span>
              <span class="stack-label"><span class="swatch swatch-blue"></span>In Progress ({{ stats.inProgress
                }})</span>
            </div>
          </div>

          <!-- Area breakdown -->
          <div class="area-list">
            <p class="area-list-title">By Area of Participation</p>
            <div class="area-item" v-for="area in areaBreakdown" :key="area.name">
              <div class="area-name-row">
                <span class="area-name">{{ area.name }}</span>
                <span class="area-count">{{ area.count }}</span>
              </div>
              <div class="area-bar-track">
                <div class="area-bar-fill" :style="{ width: (area.count / stats.total * 100) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Budget Utilization -->
        <div class="widget">
          <div class="widget-header">
            <h3 class="widget-title">Budget Utilization</h3>
          </div>
          <div class="budget-util">
            <div class="budget-ring-wrap">
              <!-- SVG donut ring -->
              <svg class="ring-svg" viewBox="0 0 80 80">
                <circle class="ring-track" cx="40" cy="40" r="32" />
                <circle class="ring-fill" cx="40" cy="40" r="32"
                  :stroke-dasharray="`${spendRate * 2.0106} ${200.96 - spendRate * 2.0106}`"
                  stroke-dashoffset="50.27" />
              </svg>
              <div class="ring-label">
                <span class="ring-pct">{{ spendRate }}%</span>
                <span class="ring-sub">spent</span>
              </div>
            </div>
            <div class="budget-details">
              <div class="budget-row">
                <span class="budget-dot budget-dot-blue"></span>
                <div>
                  <p class="budget-key">Total Budget</p>
                  <p class="budget-val">₱{{ formatCurrency(stats.totalBudget) }}</p>
                </div>
              </div>
              <div class="budget-row">
                <span class="budget-dot budget-dot-green"></span>
                <div>
                  <p class="budget-key">Amount Spent</p>
                  <p class="budget-val">₱{{ formatCurrency(stats.totalSpent) }}</p>
                </div>
              </div>
              <div class="budget-row">
                <span class="budget-dot budget-dot-gray"></span>
                <div>
                  <p class="budget-key">Remaining</p>
                  <p class="budget-val remaining">₱{{ formatCurrency(stats.totalBudget - stats.totalSpent) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- RIGHT COLUMN -->
      <div class="right-col">

        <!-- CMS Summary -->
        <div class="widget widget-cms">
          <div class="widget-header">
            <h3 class="widget-title">CMS Publishing Status</h3>
            <a class="widget-link" href="#" @click.prevent>Go to CMS →</a>
          </div>

          <div class="cms-kpi-row">
            <div class="cms-kpi cms-kpi-green">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="cms-kpi-num">{{ cms.published }}</span>
              <span class="cms-kpi-lbl">Published</span>
            </div>
            <div class="cms-kpi cms-kpi-blue">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              <span class="cms-kpi-num">{{ cms.ready }}</span>
              <span class="cms-kpi-lbl">Ready to Publish</span>
            </div>
            <div class="cms-kpi cms-kpi-amber">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              <span class="cms-kpi-num">{{ cms.queue }}</span>
              <span class="cms-kpi-lbl">In Queue</span>
            </div>
          </div>

          <!-- CMS publication bar -->
          <div class="cms-pub-bar-wrap">
            <div class="cms-pub-bar">
              <div class="cms-bar-seg cms-seg-published" :style="{ flex: cms.published }" v-if="cms.published"></div>
              <div class="cms-bar-seg cms-seg-ready" :style="{ flex: cms.ready }" v-if="cms.ready"></div>
              <div class="cms-bar-seg cms-seg-queue" :style="{ flex: cms.queue }" v-if="cms.queue"></div>
            </div>
            <p class="cms-bar-note">
              {{ cms.publishedPct }}% of current projects published
            </p>
          </div>

          <!-- Auto-publish reminder -->
          <div class="auto-publish-reminder">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p>All unpublished records will be <strong>automatically published</strong> at the end of the {{ currentYear
              }} administration year.</p>
          </div>
        </div>

        <!-- Expense Verification -->
        <div class="widget">
          <div class="widget-header">
            <h3 class="widget-title">Expense Verification</h3>
          </div>
          <div class="expense-summary">
            <div class="expense-half expense-ready">
              <div class="expense-ring">
                <svg viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#e8ecf4" stroke-width="3.5" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" stroke-width="3.5"
                    :stroke-dasharray="`${expenseReadyPct * 0.879646} 87.9646`" stroke-dashoffset="21.99"
                    stroke-linecap="round" />
                </svg>
                <span class="expense-ring-pct">{{ expenseReadyPct }}%</span>
              </div>
              <div class="expense-info">
                <p class="expense-val">{{ stats.expenseReady }}</p>
                <p class="expense-key">
                  <span class="e-dot e-dot-green"></span>
                  Verified Ready
                </p>
              </div>
            </div>
            <div class="expense-divider"></div>
            <div class="expense-half expense-not-ready">
              <div class="expense-ring">
                <svg viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#e8ecf4" stroke-width="3.5" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" stroke-width="3.5"
                    :stroke-dasharray="`${(100 - expenseReadyPct) * 0.879646} 87.9646`" stroke-dashoffset="21.99"
                    stroke-linecap="round" />
                </svg>
                <span class="expense-ring-pct">{{ 100 - expenseReadyPct }}%</span>
              </div>
              <div class="expense-info">
                <p class="expense-val">{{ stats.expenseNotReady }}</p>
                <p class="expense-key">
                  <span class="e-dot e-dot-amber"></span>
                  Not Verified
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Projects -->
        <div class="widget">
          <div class="widget-header">
            <h3 class="widget-title">Recent Projects</h3>
            <a class="widget-link" href="#" @click.prevent>See all →</a>
          </div>
          <div class="recent-list">
            <div class="recent-item" v-for="p in recentProjects" :key="p.id">
              <div class="recent-avatar">{{ getInitials(p.proponent) }}</div>
              <div class="recent-body">
                <p class="recent-title">{{ p.title }}</p>
                <p class="recent-meta">{{ p.proponent }} · {{ p.area }}</p>
                <div class="recent-progress">
                  <div class="recent-track">
                    <div class="recent-fill" :class="p.status === 'Completed' ? 'fill-green' : 'fill-blue'"
                      :style="{ width: p.progress + '%' }">
                    </div>
                  </div>
                  <span class="recent-pct">{{ p.progress }}%</span>
                </div>
              </div>
              <span class="status-badge" :class="p.status === 'Completed' ? 'badge-green' : 'badge-amber'">
                <span class="badge-dot"></span>{{ p.status }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ── Committees Overview ────────────────────────────── -->
    <div class="widget widget-full">
      <div class="widget-header">
        <h3 class="widget-title">Committee Coverage</h3>
        <span class="widget-year-tag">{{ currentYear }}</span>
      </div>
      <div class="committee-overview-grid">
        <div class="committee-overview-item" v-for="item in committeeOverview" :key="item.committee">
          <div class="cov-top">
            <span class="cov-name">{{ item.committee }}</span>
            <span class="cov-count">{{ item.projects }} project{{ item.projects !== 1 ? 's' : '' }}</span>
          </div>
          <div class="cov-members">
            <div class="cov-avatar" v-for="(m, i) in item.chairs.slice(0, 3)" :key="i" :title="m"
              :style="{ zIndex: 10 - i, marginLeft: i === 0 ? '0' : '-8px' }">
              {{ getInitials(m) }}
            </div>
            <div class="cov-avatar cov-more" v-if="item.chairs.length > 3">
              +{{ item.chairs.length - 3 }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { computed } from 'vue';
import projectsData from '~/assets/data/projects.json';

const CURRENT_YEAR = new Date().getFullYear();

const currentYearProjects = projectsData.filter(
  p => new Date(p.dates.started).getFullYear() === CURRENT_YEAR
);

// ─── Helpers ──────────────────────────────────────────────
const getInitials = (name) =>
  (name || '?').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

const formatCurrency = (v) =>
  new Intl.NumberFormat('en-US').format(v ?? 0);

const formatCurrencyShort = (v) => {
  if (!v) return '0';
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (v >= 1_000) return (v / 1_000).toFixed(0) + 'K';
  return String(v);
};

const today = new Date().toLocaleDateString('en-US', {
  month: 'long', day: 'numeric', year: 'numeric'
});

const currentYear = CURRENT_YEAR;
const adminYearLabel = `${CURRENT_YEAR} Administration`;

// ─── Core stats ───────────────────────────────────────────
const stats = computed(() => {
  const list = currentYearProjects;
  return {
    total: list.length,
    completed: list.filter(p => p.status === 'Completed').length,
    inProgress: list.filter(p => p.status !== 'Completed').length,
    totalBudget: list.reduce((s, p) => s + (p.budget || 0), 0),
    totalSpent: list.reduce((s, p) => s + (p.spent || 0), 0),
    avgProgress: list.length
      ? Math.round(list.reduce((s, p) => s + (p.progress || 0), 0) / list.length)
      : 0,
    expenseReady: list.filter(p => p.expenseVerification === 'Ready').length,
    expenseNotReady: list.filter(p => p.expenseVerification !== 'Ready').length,
  };
});

const completionRate = computed(() =>
  stats.value.total
    ? Math.round(stats.value.completed / stats.value.total * 100)
    : 0
);

const spendRate = computed(() =>
  stats.value.totalBudget
    ? Math.round(stats.value.totalSpent / stats.value.totalBudget * 100)
    : 0
);

const expenseReadyPct = computed(() =>
  stats.value.total
    ? Math.round(stats.value.expenseReady / stats.value.total * 100)
    : 0
);

// ─── Area breakdown ────────────────────────────────────────
const areaBreakdown = computed(() => {
  const map = {};
  currentYearProjects.forEach(p => {
    map[p.area] = (map[p.area] || 0) + 1;
  });
  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
});

// ─── CMS summary ──────────────────────────────────────────
const cms = computed(() => {
  const list = currentYearProjects;
  const published = 0; // simulated — no _published flag in raw JSON
  const ready = list.filter(p => p.status === 'Completed').length;
  const queue = list.filter(p => p.status !== 'Completed').length;
  const total = list.length;
  return {
    published,
    ready,
    queue,
    publishedPct: total ? Math.round(published / total * 100) : 0,
  };
});

// ─── Recent projects (last 4 by start date) ───────────────
const recentProjects = computed(() =>
  [...currentYearProjects]
    .sort((a, b) => new Date(b.dates.started) - new Date(a.dates.started))
    .slice(0, 4)
);

// ─── Committee overview ────────────────────────────────────
const committeeOverview = computed(() => {
  const map = {};
  currentYearProjects.forEach(p => {
    (p.committees || []).forEach(c => {
      if (!map[c.name]) map[c.name] = { committee: c.name, projects: 0, chairs: [] };
      map[c.name].projects++;
      if (c.chairman && !map[c.name].chairs.includes(c.chairman))
        map[c.name].chairs.push(c.chairman);
    });
  });
  return Object.values(map).sort((a, b) => b.projects - a.projects);
});
</script>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.dash-section {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  padding: 1.75rem 2rem 3rem;
  background: #f4f6f9;
  min-height: 100%;
  color: #1a2035;
  box-sizing: border-box;
}

/* ─── Header ────────────────────────────────────────────── */
.dash-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1.4rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.dash-eyebrow {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #2e4fa3;
  margin: 0 0 0.2rem;
}

.dash-title {
  font-size: 1.55rem;
  font-weight: 800;
  color: #1a2035;
  margin: 0 0 0.2rem;
  letter-spacing: -0.025em;
  line-height: 1.15;
}

.dash-sub {
  font-size: 0.78rem;
  color: #9ca3af;
  margin: 0;
  font-weight: 500;
}

.dash-header-right {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.live-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #059669;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.3rem 0.75rem;
  border-radius: 99px;
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #059669;
  box-shadow: 0 0 0 3px rgba(5, 150, 105, .2);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    box-shadow: 0 0 0 3px rgba(5, 150, 105, .2);
  }

  50% {
    box-shadow: 0 0 0 6px rgba(5, 150, 105, .05);
  }
}

/* ─── KPI Row ───────────────────────────────────────────── */
.kpi-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.1rem;
}

@media (max-width: 1100px) {
  .kpi-row {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 700px) {
  .kpi-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

.kpi-card {
  background: #ffffff;
  border: 1px solid #e2e6f0;
  border-radius: 10px;
  padding: 1rem 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .05), 0 4px 12px rgba(0, 0, 0, .04);
  transition: box-shadow 0.16s, transform 0.15s;
}

.kpi-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, .08);
  transform: translateY(-1px);
}

.kpi-icon {
  width: 38px;
  height: 38px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid transparent;
}

.kpi-icon svg {
  width: 17px;
  height: 17px;
}

.kpi-icon-blue {
  background: #eef2fc;
  color: #2e4fa3;
  border-color: rgba(46, 79, 163, .15);
}

.kpi-icon-green {
  background: #ecfdf5;
  color: #059669;
  border-color: rgba(5, 150, 105, .15);
}

.kpi-icon-amber {
  background: #fffbeb;
  color: #d97706;
  border-color: rgba(217, 119, 6, .15);
}

.kpi-icon-purple {
  background: #f5f3ff;
  color: #7c3aed;
  border-color: rgba(124, 58, 237, .15);
}

.kpi-icon-teal {
  background: #f0fdfa;
  color: #0f766e;
  border-color: rgba(15, 118, 110, .15);
}

.kpi-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.kpi-value {
  font-size: 1.55rem;
  font-weight: 800;
  color: #1a2035;
  line-height: 1;
  letter-spacing: -0.03em;
}

.kpi-value-sm {
  font-size: 1.2rem;
}

.kpi-label {
  font-size: 0.68rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.kpi-trend {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 99px;
  white-space: nowrap;
  flex-shrink: 0;
}

.kpi-trend-green {
  background: #ecfdf5;
  color: #059669;
}

.kpi-trend-amber {
  background: #fffbeb;
  color: #d97706;
}

.kpi-trend-neutral {
  background: #f4f6f9;
  color: #6b7a99;
}

/* ─── Main Grid ─────────────────────────────────────────── */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 0.85rem;
  margin-bottom: 0.85rem;
}

@media (max-width: 900px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
}

.left-col,
.right-col {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

/* ─── Widget ────────────────────────────────────────────── */
.widget {
  background: #ffffff;
  border: 1px solid #e2e6f0;
  border-radius: 10px;
  padding: 1.1rem 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .05), 0 4px 12px rgba(0, 0, 0, .04);
}

.widget-full {
  margin-top: 0;
}

.widget-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.widget-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #1a2035;
  margin: 0;
  letter-spacing: -0.01em;
}

.widget-year-tag {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  background: #eef2fc;
  color: #2e4fa3;
  padding: 0.2rem 0.55rem;
  border-radius: 99px;
  border: 1px solid rgba(46, 79, 163, .18);
}

.widget-link {
  font-size: 0.75rem;
  font-weight: 600;
  color: #2e4fa3;
  text-decoration: none;
  transition: color 0.14s;
}

.widget-link:hover {
  color: #243f8a;
}

/* ─── Stacked Bar ───────────────────────────────────────── */
.stacked-bar-wrap {
  margin-bottom: 1.1rem;
}

.stacked-bar {
  display: flex;
  height: 10px;
  border-radius: 99px;
  overflow: hidden;
  background: #e8ecf4;
  margin-bottom: 0.55rem;
  gap: 2px;
}

.stack-seg {
  height: 100%;
  transition: width 0.5s ease;
}

.seg-completed {
  background: #10b981;
  border-radius: 99px 0 0 99px;
}

.seg-inprogress {
  background: #2e4fa3;
  border-radius: 0 99px 99px 0;
  flex: 1;
}

.stacked-labels {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.stack-label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  color: #6b7a99;
  font-weight: 500;
}

.swatch {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  flex-shrink: 0;
}

.swatch-green {
  background: #10b981;
}

.swatch-blue {
  background: #2e4fa3;
}

/* ─── Area List ─────────────────────────────────────────── */
.area-list-title {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #b0b8cc;
  margin: 0 0 0.65rem;
}

.area-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.area-item {
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
}

.area-name-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.area-name {
  font-size: 0.78rem;
  font-weight: 600;
  color: #1a2035;
}

.area-count {
  font-size: 0.68rem;
  font-weight: 700;
  background: #f0f2f7;
  color: #6b7a99;
  padding: 0.1rem 0.45rem;
  border-radius: 99px;
}

.area-bar-track {
  height: 4px;
  background: #e8ecf4;
  border-radius: 99px;
  overflow: hidden;
}

.area-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #2e4fa3, #5b7fe8);
  border-radius: 99px;
  transition: width 0.5s ease;
}

/* ─── Budget Ring ───────────────────────────────────────── */
.budget-util {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.budget-ring-wrap {
  position: relative;
  width: 90px;
  height: 90px;
  flex-shrink: 0;
}

.ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(0deg);
}

.ring-track {
  fill: none;
  stroke: #e8ecf4;
  stroke-width: 7;
}

.ring-fill {
  fill: none;
  stroke: #2e4fa3;
  stroke-width: 7;
  stroke-linecap: round;
  transition: stroke-dasharray 0.6s ease;
}

.ring-label {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.05rem;
}

.ring-pct {
  font-size: 1.05rem;
  font-weight: 800;
  color: #1a2035;
  line-height: 1;
}

.ring-sub {
  font-size: 0.6rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.budget-details {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  flex: 1;
}

.budget-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.budget-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.budget-dot-blue {
  background: #2e4fa3;
}

.budget-dot-green {
  background: #10b981;
}

.budget-dot-gray {
  background: #e2e6f0;
  border: 1px solid #c5d0e8;
}

.budget-key {
  font-size: 0.68rem;
  color: #9ca3af;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.budget-val {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a2035;
  margin: 0;
}

.budget-val.remaining {
  color: #6b7a99;
}

/* ─── CMS Widget ────────────────────────────────────────── */
.cms-kpi-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
  margin-bottom: 1rem;
}

.cms-kpi {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0.85rem 0.5rem;
  border-radius: 8px;
  border: 1px solid transparent;
  text-align: center;
}

.cms-kpi svg {
  width: 18px;
  height: 18px;
}

.cms-kpi-num {
  font-size: 1.4rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
}

.cms-kpi-lbl {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.cms-kpi-green {
  background: #ecfdf5;
  color: #059669;
  border-color: #a7f3d0;
}

.cms-kpi-blue {
  background: #eff6ff;
  color: #2563eb;
  border-color: #bfdbfe;
}

.cms-kpi-amber {
  background: #fffbeb;
  color: #d97706;
  border-color: #fde68a;
}

.cms-pub-bar-wrap {
  margin-bottom: 0.85rem;
}

.cms-pub-bar {
  display: flex;
  height: 8px;
  border-radius: 99px;
  overflow: hidden;
  background: #e8ecf4;
  margin-bottom: 0.4rem;
  gap: 2px;
}

.cms-bar-seg {
  height: 100%;
  transition: flex 0.5s ease;
}

.cms-seg-published {
  background: #10b981;
}

.cms-seg-ready {
  background: #2563eb;
}

.cms-seg-queue {
  background: #f59e0b;
}

.cms-bar-note {
  font-size: 0.7rem;
  color: #9ca3af;
  margin: 0;
  font-weight: 500;
}

.auto-publish-reminder {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  font-size: 0.75rem;
  color: #92400e;
  line-height: 1.5;
}

.auto-publish-reminder svg {
  width: 14px;
  height: 14px;
  color: #d97706;
  flex-shrink: 0;
  margin-top: 1px;
}

/* ─── Expense Widget ────────────────────────────────────── */
.expense-summary {
  display: flex;
  align-items: center;
  gap: 0;
}

.expense-half {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.5rem 0;
}

.expense-divider {
  width: 1px;
  height: 50px;
  background: #e2e6f0;
  margin: 0 1rem;
  flex-shrink: 0;
}

.expense-ring {
  position: relative;
  width: 52px;
  height: 52px;
  flex-shrink: 0;
}

.expense-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.expense-ring-pct {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 800;
  color: #1a2035;
}

.expense-val {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a2035;
  line-height: 1;
  margin: 0 0 0.18rem;
}

.expense-key {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.68rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.e-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.e-dot-green {
  background: #10b981;
}

.e-dot-amber {
  background: #f59e0b;
}

/* ─── Recent List ───────────────────────────────────────── */
.recent-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.recent-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f2f7;
  transition: background 0.13s;
  border-radius: 6px;
}

.recent-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.recent-item:first-child {
  padding-top: 0;
}

.recent-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  flex-shrink: 0;
  background: #eef2fc;
  color: #2e4fa3;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid rgba(46, 79, 163, .18);
  margin-top: 1px;
}

.recent-body {
  flex: 1;
  min-width: 0;
}

.recent-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: #1a2035;
  margin: 0 0 0.12rem;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recent-meta {
  font-size: 0.7rem;
  color: #9ca3af;
  margin: 0 0 0.4rem;
}

.recent-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.recent-track {
  flex: 1;
  height: 4px;
  background: #e8ecf4;
  border-radius: 99px;
  overflow: hidden;
}

.recent-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.4s ease;
}

.fill-green {
  background: #10b981;
}

.fill-blue {
  background: #2e4fa3;
}

.recent-pct {
  font-size: 0.68rem;
  font-weight: 700;
  color: #6b7a99;
  min-width: 26px;
  text-align: right;
}

/* ─── Status Badges ─────────────────────────────────────── */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.28rem;
  padding: 0.2rem 0.5rem;
  border-radius: 99px;
  font-size: 0.68rem;
  font-weight: 600;
  white-space: nowrap;
  line-height: 1;
  border: 1px solid transparent;
  flex-shrink: 0;
}

.badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}

.badge-green {
  background: #ecfdf5;
  color: #059669;
  border-color: #a7f3d0;
}

.badge-green .badge-dot {
  background: #059669;
}

.badge-amber {
  background: #fffbeb;
  color: #d97706;
  border-color: #fde68a;
}

.badge-amber .badge-dot {
  background: #d97706;
}

/* ─── Committee Overview ────────────────────────────────── */
.committee-overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.committee-overview-item {
  background: #f7f9fc;
  border: 1px solid #e8ecf4;
  border-radius: 8px;
  padding: 0.8rem 0.9rem;
}

.cov-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
}

.cov-name {
  font-size: 0.83rem;
  font-weight: 700;
  color: #1a2035;
}

.cov-count {
  font-size: 0.65rem;
  font-weight: 700;
  background: #eef2fc;
  color: #2e4fa3;
  padding: 0.1rem 0.45rem;
  border-radius: 99px;
  border: 1px solid rgba(46, 79, 163, .18);
}

.cov-members {
  display: flex;
}

.cov-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  position: relative;
  border: 2px solid #ffffff;
  font-size: 0.58rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dbeafe;
  color: #1d4ed8;
  flex-shrink: 0;
}

.cov-more {
  background: #e8ecf4;
  color: #6b7a99;
  font-size: 0.55rem;
}
</style>