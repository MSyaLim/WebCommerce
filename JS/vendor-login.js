import { supabase } from "./supabase.js";

const form = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const email = formData.get("email");

  // validate email
  if (!isValidEmail(email)) {
    message.textContent = "Please enter a valid email address";
    message.style.color = "#ef4444";
    message.classList.add("show");
    return;
  }

  message.textContent = "Logging you in...";
  message.style.color = ""; // reset color to default
  message.classList.add("show");

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: formData.get("password"),
    });

    if (error) {
      message.textContent = error.message;
      message.style.color = "#ef4444";
      return;
    }

    message.style.color = "var(--color-success)";
    message.textContent = "Welcome back! Redirecting...";

    setTimeout(() => {
      window.location.href = "./vendor-dashboard.html";
    }, 1000);
  } catch (err) {
    console.error(err);
    message.textContent = "An unexpected error occurred. Try again.";
    message.style.color = "#ef4444";
  }
});
