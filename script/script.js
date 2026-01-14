// ======================
// GIỎ HÀNG (CHUẨN DUY NHẤT)
// ======================
const CART_KEY = "cart";

// LẤY GIỎ HÀNG
function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// LƯU GIỎ HÀNG
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

// THÊM VÀO GIỎ
function addToCart(id, name, price, img) {
    let cart = getCart();
    let item = cart.find(p => p.id === id);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            img,
            quantity: 1
        });
    }

    saveCart(cart);
    alert("Đã thêm vào giỏ hàng!");
}

// HIỂN THỊ SỐ LƯỢNG TRÊN MENU
function updateCartCount() {
    let cart = getCart();
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    let badge = document.getElementById("cart-count");
    if (badge) badge.innerText = count;
}

// ======================
// TRANG CART.HTML
// ======================
function renderCartPage() {
    const tbody = document.getElementById("cart-list");
    const totalEl = document.getElementById("total-price");
    if (!tbody || !totalEl) return;

    let cart = getCart();
    tbody.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center">Giỏ hàng trống</td>
            </tr>`;
        totalEl.innerText = "0₫";
        return;
    }

    cart.forEach(item => {
        let sub = item.price * item.quantity;
        total += sub;

        tbody.innerHTML += `
        <tr>
            <td>
                <img src="${item.img}" style="width:60px;height:60px;object-fit:cover;border-radius:8px">
            </td>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()}₫</td>
            <td>${item.quantity}</td>
            <td>${sub.toLocaleString()}₫</td>
        </tr>`;
    });

    totalEl.innerText = total.toLocaleString() + "₫";
}

// ======================
// ĐĂNG NHẬP
// ======================
function login() {
    let username = document.getElementById("login-username").value.trim();
    let password = document.getElementById("login-password").value;

    let data = localStorage.getItem("user_" + username);
    if (!data) {
        alert("Tài khoản không tồn tại!");
        return;
    }

    let user = JSON.parse(data);
    if (user.password !== password) {
        alert("Sai mật khẩu!");
        return;
    }

    localStorage.setItem("loggedInUser", username);
    alert("Đăng nhập thành công!");
    window.location.href = "index.html";
}

// ======================
// ĐĂNG KÝ
// ======================
function register() {
    let username = document.getElementById("reg-username").value.trim();
    let password = document.getElementById("reg-password").value;
    let password2 = document.getElementById("reg-password2").value;

    if (!username || !password) {
        alert("Vui lòng nhập đầy đủ!");
        return;
    }
    if (password !== password2) {
        alert("Mật khẩu không khớp!");
        return;
    }
    if (localStorage.getItem("user_" + username)) {
        alert("Tài khoản đã tồn tại!");
        return;
    }

    localStorage.setItem(
        "user_" + username,
        JSON.stringify({ username, password })
    );

    alert("Đăng ký thành công!");
    window.location.href = "login.html";
}

// ======================
// KHỞI TẠO
// ======================
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCartPage();

    let username = localStorage.getItem("loggedInUser");
    if (username) {
        let nav = document.querySelector("nav");
        if (nav) {
            nav.innerHTML += `
                <span style="margin-left:15px;color:#e53935">
                    Xin chào, ${username}
                </span>`;
        }
    }
});
