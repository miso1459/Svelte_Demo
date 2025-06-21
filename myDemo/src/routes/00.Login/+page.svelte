<script>
  import { preventDefault } from 'svelte/legacy';

  let username = $state('');
  let password = $state('');
  let error = $state('');
  let loading = $state(false);

  async function handleLogin(event) {
    event.preventDefault();
    error = '';
    loading = true;
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      window.location.href = '/01.Menu';

      if (!res.ok) {
        error = '로그인 실패';
        return;
      }
      // 로그인 성공 시 처리 (예: 페이지 이동)
      // const result = await res.json();
      window.location.href = '/01.Menu';
    } catch (e) {
      error = '네트워크 오류';
    } finally {
      loading = false;
    }
  }
</script>

<div class="wrapper">
  <div class="container">
    <h1>Welcome</h1>
    <form class="form" onsubmit={preventDefault(handleLogin)}>
      <input type="text" placeholder="Username" bind:value={username} />
      <input type="password" placeholder="Password" bind:value={password} />
      <button type="submit" id="login-button" disabled={loading}>
        {#if loading}로그인 중...{/if}
        {#if !loading}Login{/if}
      </button>
      {#if error}
        <div style="color:red; margin-top:8px;">{error}</div>
      {/if}
    </form>
  </div>
  <ul class="bg-bubbles">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>

<style>
  @import './Login.css';
</style>