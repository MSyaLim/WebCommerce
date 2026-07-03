import { supabase } from "./supabase.js";

const vendorName = document.getElementById("vendorName");
const vendorDesc = document.getElementById("vendorDesc");
const productGrid = document.getElementById("productGrid");
const logoutBtn = document.getElementById("logoutBtn");

async function loadDashboard() {
  try {
    // 1. Get logged in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      window.location.href = "vendor-login.html";
      return;
    }

    // 2. Get vendor profile
    const { data: vendor, error: vendorError } = await supabase
      .from("Vendors")
      .select("*")
      .eq("id", user.id)
      .single();

    if (vendorError) {
      console.error("Vendor fetch error:", vendorError);
    }

    if (vendor) {
      vendorName.textContent = vendor.name || "Unnamed vendor";
      vendorDesc.textContent = vendor.description || "";
    }

    // 3. Get products
    const { data: products, error: productsError } = await supabase
      .from("Products")
      .select("*")
      .eq("vendorId", user.id);

    if (productsError) {
      console.error("Products fetch error:", productsError);
      renderProducts([]);
      return;
    }

    renderProducts(products || []);
  } catch (err) {
    console.error(err);
    window.location.href = "vendor-login.html";
  }
}

function renderProducts(products) {
  productGrid.innerHTML = "";

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "dashboard-card";

    // safe DOM construction to avoid XSS
    const img = document.createElement("img");
    img.alt = p.title || "Product image";
    if (p.image) {
      img.src = p.image;
    } else {
      img.src = ""; // or a placeholder path
    }

    const h3 = document.createElement("h3");
    h3.textContent = p.title || "Untitled";

    const price = document.createElement("p");
    price.textContent = p.price != null ? String(p.price) : "";

    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(price);

    productGrid.appendChild(card);
  });
}

// logout
logoutBtn.addEventListener("click", async () => {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error("Sign out error:", err);
  } finally {
    window.location.href = "vendor-login.html";
  }
});

loadDashboard();
