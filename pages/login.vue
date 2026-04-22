<template>
  <div class="login-page">
    <div class="login-container">

      <header class="brand">
        <div class="brand__logo">
          <img src="/youth-ims-logo.svg" alt="YOUTH Logo" class="logo-img" />
        </div>
        <div class="brand__text">
          <h1 class="brand__title">YOUTH</h1>
          <p class="brand__sub">Youth Officials' Unified Transparency Hub</p>
        </div>
      </header>

      <main class="login-card">
        <div class="login-card__header">
          <h2 class="login-card__title">Sign in to your account</h2>
          <p class="login-card__sub">Use your authorized credentials to continue.</p>
        </div>

        <button class="btn-login" @click="goToDashboard">
          <span>Log in with Authentik</span>
        </button>
      </main>

    </div>

    <footer class="login-footer">
      <span>© {{ year }} Youth Officials' Unified Transparency Hub</span>
    </footer>

  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const router = useRouter()
const year = new Date().getFullYear()

function goToDashboard() {
  router.push('/dashboard')
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  width: 100%;
  background: linear-gradient(160deg, #0b1320 0%, #1c2a3a 40%, #27496d 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 440px;
  gap: 40px;
  flex: 1;
}

.brand {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: left;
  gap: 16px;
}

.brand__logo { width: 80px; }

.logo-img {
  width: 100%;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
}

.brand__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.brand__title {
  font-size: 52px;
  font-weight: 900;
  color: #fff;
  margin: 0;
  line-height: 1;
}

.brand__sub {
  font-size: 16px;
  color: rgba(255,255,255,0.9);
  margin-top: 4px;
}

.login-card {
  width: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.25);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.login-card__header { text-align: center; }

.login-card__title {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
}

.login-card__sub {
  font-size: 13px;
  color: #7f8c8d;
}

.btn-login {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px;
  background: #e67e22;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 4px 6px rgba(230,126,34,0.25);
}

.btn-login:hover {
  background: #d35400;
  transform: translateY(-1px);
}

.login-footer {
  font-size: 11px;
  color: rgba(255,255,255,0.6);
  letter-spacing: 0.5px;
  text-align: center;
  margin-top: auto;
}

@media (max-width: 480px) {
  .brand__title { font-size: 40px; }
  .brand__logo { width: 70px; }
  .login-card { padding: 28px 24px; }
}
</style>
