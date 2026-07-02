import { products } from "./products.js";

function groupByVendor(items) {
    const vendors = {};

    items.forEach((product) => {
        if (!vendors[product.vendor]) {
            vendors[product.vendor] = [];
        }

        vendors[product.vendor].push(product);
    });

    return vendors;
}

function createCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("data-title", product.title);
    card.setAttribute("data-price", product.price);
    card.setAttribute("data-description", product.description || "More details coming soon.");
    card.setAttribute("data-link", product.purchaseLink || "https://sandbox.hitpay.link/cqkkqa");
    card.setAttribute("data-image", product.image || "../Assets/placeholder.svg");

    const preview = document.createElement("div");
    preview.className = "product-card__preview";
    preview.textContent = product.title;

    const title = document.createElement("h3");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = product.price;

    const description = document.createElement("p");
    description.className = "product-card__description";
    description.textContent = product.description || "A digital download curated for your creative projects.";

    const button = document.createElement("a");
    button.className = "button";
    button.textContent = "Purchase";
    button.href = product.purchaseLink || "https://sandbox.hitpay.link/cqkkqa";
    button.target = "_blank";
    button.rel = "noopener noreferrer";

    card.append(preview, title, price, description, button);
    return card;
}

function renderShop() {
    const root = document.getElementById("product-grid");

    if (!root) return;

    root.innerHTML = "";

    const grouped = groupByVendor(products);

    if (Object.keys(grouped).length === 0) {
        const emptyState = document.createElement("p");
        emptyState.className = "empty-state";
        emptyState.textContent = "More products will be available soon.";
        root.appendChild(emptyState);
        return;
    }

    Object.entries(grouped).forEach(([vendorName, items]) => {
        const vendorBlock = document.createElement("section");
        vendorBlock.className = "vendor-block";

        const header = document.createElement("div");
        header.className = "vendor-block__header";

        const title = document.createElement("h2");
        title.textContent = vendorName;
        header.appendChild(title);

        const grid = document.createElement("div");
        grid.className = "vendor-block__grid";

        items.forEach((item) => {
            grid.appendChild(createCard(item));
        });

        vendorBlock.append(header, grid);
        root.appendChild(vendorBlock);
    });
}

document.addEventListener("DOMContentLoaded", renderShop);

document.addEventListener("click", (event) => {
    const card = event.target.closest(".product-card");

    if (!card) return;

    if (event.target.closest(".button")) return;

    if (typeof window.openModal === "function") {
        window.openModal(card);
    }
});