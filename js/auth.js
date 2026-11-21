function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || []; // trả từ dữ liệu json sang dữ liệu mình xài bth vào local, lấy ra hêt iteams user
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
}

function logout() {
  localStorage.removeItem("currentUser"); // nhấn log out thì xóa hết dữ liệu và chuyền sáng tranh login
  location.href = "login1.html";
}

// Trang nào cần đăng nhập thì gọi hàm này đầu tiên
function requireLogin() {
  const user = getCurrentUser(); //  lấy usewer hiện tại khác vs user
  if (!user) {
    location.href = "login.html";
  }
  return user;
}

function showMessage(text, type) {
  const box = document.getElementById("msg");
  box.textContent = text;
  box.className = "msg " + type; // msg error | msg success
}

// ---------------- TRANG ĐĂNG KÝ------------------
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault(); // không cho form tải lại trang

    const name = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    if (!name || !email || !password) {
      return showMessage("Vui lòng nhập đầy đủ thông tin", "error");
    }
    if (password.length < 6) {
      return showMessage("Mật khẩu tối thiểu 6 ký tự", "error");
    }
    if (password !== confirm) {
      return showMessage("Mật khẩu nhập lại không khớp", "error");
    }

    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      return showMessage("Email này đã được đăng ký", "error");
    }

    // Thực tế KHÔNG lưu mật khẩu thô như vậy, phải mã hoá (hash) ở server
    users.push({
      id: Date.now(),
      name: name,
      email: email,
      password: password,
    });
    localStorage.setItem("users", JSON.stringify(users));

    showMessage("Đăng ký thành công! Đang chuyển trang...", "success");
    setTimeout(() => (location.href = "login1.html"), 1000);
  });
}

// ---------------- TRANG ĐĂNG NHẬP------------------
