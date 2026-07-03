<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../CSS/vendor-login.css" />
  <link rel="stylesheet" href="../CSS/style2.css" />
  <title>Login</title>
</head>
<body>
  <section class="vendor-page">
    <div class="vendor-hero">
      <div class="hero-row" style="display:flex;align-items:center;gap:1rem;justify-content:flex-start;">
        <button class="button back-button" type="button" onclick="goToPage('../shop.html')" aria-label="Back to shop">
          ← Back
        </button>
        <div class="hero-text" style="flex:1 1 auto;">
          <h1>Vendor Login</h1>
          <p>Access your vendor dashboard</p>
        </div>
      </div>
    </div>

    <form id="loginForm" novalidate>
      <label for="loginEmail">Email</label>
      <input
        id="loginEmail"
        type="email"
        name="email"
        required
        autocomplete="email"
      />

      <label for="loginPassword">Password</label>
      <input
        id="loginPassword"
        type="password"
        name="password"
        required
        autocomplete="current-password"
      />

      <button type="submit" class="button">Login</button>
    </form>

    <p id="loginMessage" class="login-message" role="status" aria-live="polite"></p>
  </section>

  <script>
    window.addEventListener("DOMContentLoaded", () => {
      requestAnimationFrame(() => {
        document.body.classList.add("loaded");
      });
    });

    function goToPage(url) {
      document.body.classList.remove("loaded");
      document.body.classList.add("leaving");
      setTimeout(() => {
        window.location.href = url;
      }, 450);
    }

    // expose for inline handlers if needed
    window.goToPage = goToPage;
  </script>

  <script type="module" src="../global.js"></script>
  <script type="module" src="../JS/vendor-login.js"></script>
</body>
</html>
