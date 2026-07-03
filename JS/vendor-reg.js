import { supabase } from "./supabase.js";

const form = document.getElementById("vendorForm");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(url) {
  try {
    if (!url) return false;
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");

  // email validation
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // password match check
  if (password !== formData.get("confirmPassword")) {
    alert("Passwords do not match!");
    return;
  }

  // optional: validate URLs if provided
  const logoUrl = formData.get("logo_url");
  const bannerUrl = formData.get("banner_url");

  if (logoUrl && !isValidUrl(logoUrl)) {
    alert("Please enter a valid Logo URL");
    return;
  }

  if (bannerUrl && !isValidUrl(bannerUrl)) {
    alert("Please enter a valid Banner URL");
    return;
  }

  try {
    // 1. Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://msyalim.github.to/WebCommerce/Pages/Shop.html",
      },
    });

    if (error) {
      console.error("Sign up error:", error);
      alert(error.message || "Sign up failed");
      return;
    }

    // ensure user id exists
    const userId = data?.user?.id;
    if (!userId) {
      console.error("No user id returned from signUp:", data);
      alert("Registration succeeded but no user id was returned. Check auth settings.");
      return;
    }

    // 2. Save vendor profile
    const { error: vendorError } = await supabase.from("Vendors").insert({
      id: userId,
      name: formData.get("storeName"),
      description: formData.get("description"),
      long_description: formData.get("long_description"),
      banner_url: bannerUrl,
      logo_url: logoUrl,
    });

    if (vendorError) {
      console.error("Vendor insert error:", vendorError);
      alert(vendorError.message || "Failed to save vendor profile");
      return;
    }

    alert("Vendor registered!");
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("An unexpected error occurred. Check console for details.");
  }
});
