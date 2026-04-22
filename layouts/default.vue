<template>
  <div class="shell" :class="{ 'shell--drawer-open': drawerOpen, 'shell--sidebar-collapsed': sidebarCollapsed }">

    <!-- Mobile Overlay -->
    <div class="overlay" @click="drawerOpen = false" aria-hidden="true"></div>

    <!-- LEFT PANEL -->
    <aside class="sidebar" role="navigation" aria-label="Main navigation">
      <div class="sidebar__header">
        <div class="sidebar__brand">
          <img src="/youth-ims-logo.svg" alt="YOUTH Logo" class="sidebar__logo" />
          <div class="sidebar__brand-text">
            <span class="sidebar__title">YOUTH</span>
            <span class="sidebar__sub">Youth Officials' Unified Transparency Hub</span>
          </div>
        </div>
      </div>

      <nav class="sidebar__nav">
        <div class="nav-group">
          <span class="nav-group__label">Overview</span>
          <NuxtLink to="/dashboard" class="nav-item" active-class="nav-item--active" @click="closeDrawer">
            <span class="nav-item__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                <rect x="14" y="14" width="7" height="7" rx="1.5"/>
              </svg>
            </span>
            <span class="nav-item__label">Dashboard</span>
          </NuxtLink>
        </div>

        <div class="nav-group">
          <span class="nav-group__label">Modules</span>

          <NuxtLink to="/project-management" class="nav-item" active-class="nav-item--active" @click="closeDrawer">
            <span class="nav-item__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
              </svg>
            </span>
            <span class="nav-item__label">Project Management</span>
          </NuxtLink>
          <!--
          <NuxtLink to="/budget" class="nav-item" active-class="nav-item--active" @click="closeDrawer">
            <span class="nav-item__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
              </svg>
            </span>
            <span class="nav-item__label">Budget</span>
          </NuxtLink>

          <NuxtLink to="/expense-verification" class="nav-item" active-class="nav-item--active" @click="closeDrawer">
            <span class="nav-item__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </span>
            <span class="nav-item__label">Expense Verification</span>
          </NuxtLink>
          -->
          <NuxtLink to="/cms" class="nav-item" active-class="nav-item--active" @click="closeDrawer">
            <span class="nav-item__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18M9 21V9"/>
              </svg>
            </span>
            <span class="nav-item__label">CMS</span>
          </NuxtLink>
          <!--
          <NuxtLink to="/archiving" class="nav-item" active-class="nav-item--active" @click="closeDrawer">
            <span class="nav-item__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="21 8 21 21 3 21 3 8"/>
                <rect x="1" y="3" width="22" height="5" rx="1"/>
                <line x1="10" y1="12" x2="14" y2="12"/>
              </svg>
            </span>
            <span class="nav-item__label">Archiving</span>
          </NuxtLink>
          -->
        </div>
      </nav>
    </aside>

    <!-- RIGHT PANEL -->
    <div class="main-area">

      <header class="topbar">
        <!-- Hamburger (mobile) -->
        <button class="topbar__menu-btn" @click="drawerOpen = true" aria-label="Open menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <!-- Collapse toggle (desktop) -->
        <button class="topbar__collapse-btn" @click="toggleSidebar" :title="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <!-- Breadcrumb -->
        <div class="topbar__breadcrumb">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <span class="breadcrumb__home">YOUTH</span>
            <template v-if="currentPage">
              <span class="breadcrumb__sep">›</span>
              <span class="breadcrumb__current">{{ currentPage }}</span>
            </template>
            <template v-if="currentTab">
              <span class="breadcrumb__sep">›</span>
              <span class="breadcrumb__tab">{{ currentTab }}</span>
            </template>
          </nav>
        </div>

        <div class="topbar__actions">
          <!-- Dark mode -->
          <button class="topbar__icon-btn" @click="toggleDark" :title="isDark ? 'Light mode' : 'Dark mode'">
            <svg v-if="!isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </button>

          <!-- Notifications -->
          <button class="topbar__icon-btn topbar__notif-btn" title="Notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <span class="notif-badge">3</span>
          </button>

          <div class="topbar__divider"></div>

          <!-- User chip with dropdown -->
          <div class="topbar__user-wrap" ref="userWrapRef">
            <div class="topbar__user-chip" @click="toggleUserMenu" :class="{ 'topbar__user-chip--open': userMenuOpen }">
              <div class="user-avatar">{{ initials }}</div>
              <div class="topbar__user-info">
                <span class="topbar__user-name">Welcome Back</span>
                <span class="topbar__user-role">Administrator</span>
              </div>
              <svg class="topbar__caret" :class="{ 'topbar__caret--open': userMenuOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>

            <!-- Dropdown -->
            <Transition name="dropdown">
              <div v-if="userMenuOpen" class="user-dropdown">
                <div class="user-dropdown__header">
                  <div class="user-avatar user-avatar--lg">{{ initials }}</div>
                  <div>
                    <div class="user-dropdown__name">Welcome Back</div>
                    <div class="user-dropdown__role">Administrator</div>
                  </div>
                </div>
                <div class="user-dropdown__divider"></div>
                <button class="user-dropdown__btn user-dropdown__btn--logout" @click="logout">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Log out
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="page-content">
        <Transition name="fade" mode="out-in">
          <slot />
        </Transition>
      </main>
    </div>

  </div>
</template>

<script setup>
const route  = useRoute()
const router = useRouter()

const drawerOpen       = ref(false)
const sidebarCollapsed = ref(false)
const isDark           = ref(false)
const userMenuOpen     = ref(false)
const userWrapRef      = ref(null)
const activeTabIndex   = ref(0)

const initials = 'YU'

const TABBED_ROUTES = ['project-management', 'budget', 'expense-verification']
const TAB_NAMES     = ['Tab 1', 'Tab 2', 'Tab 3']

const routeLabels = {
  '/dashboard':            'Dashboard',
  '/project-management':   'Project Management',
  '/budget':               'Budget',
  '/expense-verification': 'Expense Verification',
  '/cms':                  'CMS',
  '/archiving':            'Archiving',
}

const currentPage = computed(() => {
  const base = '/' + route.path.split('/')[1]
  return routeLabels[base] ?? ''
})

const isTabbed = computed(() => TABBED_ROUTES.includes(route.name))

const currentTab = computed(() => {
  if (!isTabbed.value) return null
  return TAB_NAMES[activeTabIndex.value] ?? 'Tab 1'
})

// Listen for tab-change events bubbled up from pages via provide/inject
provide('onTabChange', (index) => {
  activeTabIndex.value = index
})

// Reset tab index on navigation
watch(() => route.name, () => {
  activeTabIndex.value = 0
})

function closeDrawer()   { drawerOpen.value = false }
function toggleSidebar() { sidebarCollapsed.value = !sidebarCollapsed.value }
function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

function toggleUserMenu() { userMenuOpen.value = !userMenuOpen.value }

function logout() {
  userMenuOpen.value = false
  router.push('/login')
}

function handleOutsideClick(e) {
  if (userWrapRef.value && !userWrapRef.value.contains(e.target)) {
    userMenuOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleOutsideClick))
onUnmounted(() => document.removeEventListener('mousedown', handleOutsideClick))
</script>

<style scoped>
/* SHELL */
.shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: var(--c-bg, #F7F8FA);
  position: relative;
  --sidebar-width: 300px;
  --topbar-height: 80px;
}

.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 199;
  backdrop-filter: blur(2px);
}
.shell--drawer-open .overlay { display: block; }

/* SIDEBAR */
.sidebar {
  width: var(--sidebar-width, 256px);
  height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  transition: width 0.25s cubic-bezier(0.4,0,0.2,1);
  z-index: 200;
}

.shell--sidebar-collapsed .sidebar           { width: 64px; }
.shell--sidebar-collapsed .sidebar__brand-text,
.shell--sidebar-collapsed .nav-item__label,
.shell--sidebar-collapsed .nav-group__label  { display: none; }
.shell--sidebar-collapsed .sidebar__header   { padding: 0 16px; justify-content: center; }
.shell--sidebar-collapsed .nav-item          { justify-content: center; padding: 10px 0; }

.sidebar__header {
  height: var(--topbar-height, 64px);
  display: flex;
  align-items: center;
  padding: 0 18px;
  gap: 10px;
  flex-shrink: 0;
}

.sidebar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  min-width: 0;
}

.sidebar__logo { width: 34px; height: 34px; object-fit: contain; flex-shrink: 0; }

.sidebar__brand-text { display: flex; flex-direction: column; overflow: hidden; min-width: 0; }

.sidebar__title {
  font-size: 18px;
  font-weight: 800;
  color: var(--c-primary, #1A5276);
  letter-spacing: 0.06em;
  line-height: 1.1;
  white-space: nowrap;
}

.sidebar__sub {
  font-size: 12px;
  color: var(--c-text-muted, #566573);
  line-height: 1.4;
  margin-top: 2px;
}

.sidebar__nav {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 10px;
  scrollbar-width: thin;
  scrollbar-color: var(--c-border, #E2E6EA) transparent;
}

.nav-group { margin-bottom: 4px; }

.nav-group__label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: var(--c-text-light, #8E9EAB);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 8px 8px 4px;
  white-space: nowrap;
  overflow: hidden;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  color: var(--c-text-muted, #566573);
  font-size: 14px;
  font-weight: 500;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 1px;
  text-decoration: none;
}
.nav-item__icon { width: 20px; height: 20px; flex-shrink: 0; display: flex; align-items: center; }
.nav-item__icon svg { width: 17px; height: 17px; }
.nav-item__label { overflow: hidden; text-overflow: ellipsis; }
.nav-item:hover { background: var(--c-bg, #F7F8FA); color: var(--c-text, #1C2833); }
.nav-item--active {
  background: var(--c-primary-pale, #EBF5FB) !important;
  color: var(--c-primary, #1A5276) !important;
  font-weight: 600;
}
.nav-item--active .nav-item__icon svg { stroke: var(--c-primary, #1A5276); }

/* MAIN AREA */
.main-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }

/* Topbar */
.topbar {
  height: var(--topbar-height, 64px);
  background: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 8px;
  flex-shrink: 0;
  z-index: 100;
  position: relative;
}

.topbar__menu-btn {
  display: none;
  background: transparent;
  border: none;
  color: var(--c-text-muted, #566573);
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  flex-shrink: 0;
}
.topbar__menu-btn svg { width: 20px; height: 20px; display: block; }
.topbar__menu-btn:hover { background: var(--c-bg, #F7F8FA); }

.topbar__collapse-btn {
  background: transparent;
  border: none;
  color: var(--c-text-muted, #566573);
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transition: background 0.15s;
}
.topbar__collapse-btn svg { width: 18px; height: 18px; display: block; }
.topbar__collapse-btn:hover { background: var(--c-bg, #F7F8FA); color: var(--c-text, #1C2833); }

/* Breadcrumb */
.topbar__breadcrumb { flex: 1; min-width: 0; padding-left: 4px; }

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: nowrap;
  overflow: hidden;
}

.breadcrumb__home {
  font-size: 13px;
  font-weight: 600;
  color: var(--c-text-muted, #566573);
  white-space: nowrap;
}

.breadcrumb__sep {
  font-size: 14px;
  color: var(--c-text-light, #8E9EAB);
  flex-shrink: 0;
}

.breadcrumb__current {
  font-size: 13px;
  font-weight: 700;
  color: var(--c-text, #1C2833);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.breadcrumb__tab {
  font-size: 13px;
  font-weight: 500;
  color: var(--c-primary, #1A5276);
  white-space: nowrap;
}

/* Actions */
.topbar__actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.topbar__icon-btn {
  position: relative;
  background: transparent;
  border: none;
  color: var(--c-text-muted, #566573);
  cursor: pointer;
  padding: 7px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: background 0.15s, color 0.15s;
}
.topbar__icon-btn svg { width: 18px; height: 18px; display: block; }
.topbar__icon-btn:hover { background: var(--c-bg, #F7F8FA); color: var(--c-text, #1C2833); }

.notif-badge {
  position: absolute;
  top: 4px; right: 4px;
  width: 15px; height: 15px;
  background: #e74c3c;
  color: #fff;
  font-size: 8px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
}

.topbar__divider {
  width: 1px;
  height: 28px;
  background: var(--c-border, #E2E6EA);
  margin: 0 6px;
  flex-shrink: 0;
}

/* User wrap + dropdown */
.topbar__user-wrap {
  position: relative;
}

.topbar__user-chip {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 5px 10px 5px 6px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s;
  user-select: none;
}
.topbar__user-chip:hover,
.topbar__user-chip--open { background: var(--c-bg, #F7F8FA); }

.user-avatar {
  width: 32px;
  height: 32px;
  background: var(--c-primary, #1A5276);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.user-avatar--lg {
  width: 40px;
  height: 40px;
  font-size: 13px;
}

.topbar__user-info { display: flex; flex-direction: column; }
.topbar__user-name { font-size: 12px; font-weight: 600; color: var(--c-text, #1C2833); white-space: nowrap; line-height: 1.2; }
.topbar__user-role { font-size: 10px; color: var(--c-text-muted, #566573); white-space: nowrap; }

.topbar__caret {
  width: 14px;
  height: 14px;
  color: var(--c-text-muted, #566573);
  flex-shrink: 0;
  transition: transform 0.2s;
}
.topbar__caret--open { transform: rotate(180deg); }

/* Dropdown */
.user-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 220px;
  background: #fff;
  border: 1px solid var(--c-border, #E2E6EA);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  z-index: 500;
  overflow: hidden;
}

.user-dropdown__header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
}

.user-dropdown__name {
  font-size: 13px;
  font-weight: 600;
  color: var(--c-text, #1C2833);
}

.user-dropdown__role {
  font-size: 11px;
  color: var(--c-text-muted, #566573);
  margin-top: 2px;
}

.user-dropdown__divider {
  height: 1px;
  background: var(--c-border, #E2E6EA);
  margin: 0;
}

.user-dropdown__btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  text-align: left;
}
.user-dropdown__btn svg { width: 16px; height: 16px; flex-shrink: 0; }

.user-dropdown__btn--logout {
  color: #e74c3c;
}
.user-dropdown__btn--logout:hover {
  background: #fdf2f2;
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active { transition: opacity 0.15s, transform 0.15s; }
.dropdown-enter-from,
.dropdown-leave-to     { opacity: 0; transform: translateY(-6px); }

/* Page content */
.page-content {
  flex: 1;
  overflow-y: auto;
  background: var(--c-bg, #F7F8FA);
  display: flex;
  flex-direction: column;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.16s ease; }
.fade-enter-from,   .fade-leave-to     { opacity: 0; }

/* MOBILE */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0; left: 0;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
    width: var(--sidebar-width, 256px) !important;
    box-shadow: 4px 0 24px rgba(0,0,0,0.1);
  }
  .shell--drawer-open .sidebar { transform: translateX(0); }
  .shell--drawer-open .sidebar__brand-text,
  .shell--drawer-open .nav-item__label,
  .shell--drawer-open .nav-group__label { display: block !important; }
  .shell--drawer-open .nav-item         { justify-content: flex-start !important; padding: 8px 10px !important; }
  .shell--drawer-open .sidebar__header  { padding: 0 18px !important; justify-content: flex-start !important; }
  .topbar__menu-btn     { display: flex; }
  .topbar__collapse-btn { display: none; }
  .topbar__user-info,
  .topbar__caret         { display: none; }
  .shell--sidebar-collapsed .sidebar { width: var(--sidebar-width, 256px) !important; }
}

@media (max-width: 480px) {
  .topbar        { padding: 0 14px; gap: 6px; }
  .topbar__divider { display: none; }
}
</style>
