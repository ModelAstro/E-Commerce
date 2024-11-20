// Initialize products array
let products = JSON.parse(localStorage.getItem('products')) || [];

// Function to render the product list
function renderProducts() {
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = '';

    products.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';

        productElement.innerHTML = `
            <div class="product-details">
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <span class="product-name">${product.name}</span>
                    <span class="product-price">- $${product.price}</span>
                </div>
            </div>
            <button class="remove-btn" onclick="removeProduct(${index})">Remove</button>
        `;

        productContainer.appendChild(productElement);
    });
}

// Function to add a product
function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const image = document.getElementById('productImage').value;

    // Add product to array
    products.push({ name, price, image });

    // Save to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Clear the form
    document.getElementById('productForm').reset();

    // Re-render the product list
    renderProducts();
}

// Function to remove a product
function removeProduct(index) {
    products.splice(index, 1);

    // Save updated list to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Re-render the product list
    renderProducts();
}

// Function to handle logout
function logout() {
    // Clear session data
    localStorage.removeItem('isAdminLoggedIn');

    // Redirect to login page
    window.location.href = '/index';
}

// Attach event listeners
document.getElementById('productForm').addEventListener('submit', addProduct);
document.getElementById('logoutBtn').addEventListener('click', logout);

// Initial render
renderProducts();
