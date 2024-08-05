var check = false;

document.querySelectorAll(".toggle-password").forEach((toggle) => {
  toggle.addEventListener("click", function () {
    let input = this.previousElementSibling;
    let icon = this.querySelector("i");
    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    }
  });
});

function thaydou(kt, event){
  const storedDataJSON = localStorage.getItem("userdata");
  userData = JSON.parse(storedDataJSON) || [];
  if(!kt){
    document.getElementById('login-register').style.display = 'none';
    document.getElementById('login-out').style.display = 'block';
    document.getElementById('use').textContent = userData[0].name;
  }else{
    document.getElementById('login-register').style.display = 'block';
    document.getElementById('login-out').style.display = 'none';
  }
}
thaydou(check);
function validateForm(event) {
  event.preventDefault(); // Ngăn form submit tự động
  // Lấy giá trị từ các trường nhập liệu
  let notifications = document.querySelector(".notifications");
  const emails = document.forms["registrationForm"]["email"].value;
  const passwords = document.forms["registrationForm"]["password"].value;
  var audio = document.getElementById("myAudio");
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  function createToast(type, icon, title, text) {
    let newToast = document.createElement("div");
    newToast.innerHTML = `
          <div class="toast ${type}">
              <i class="${icon}"></i>
              <div class="content">
                  <div class="title">${title}</div>
                  <span>${text}</span>
              </div>
              <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
          </div>`;
    notifications.appendChild(newToast);
    newToast.timeOut = setTimeout(() => newToast.remove(), 5000);
  }
  function Thongbao() {
    let type = "success";
    let icon = "fa-solid fa-circle-check";
    let title = "Thông báo";
    let text = "Đăng nhập thành công";
    createToast(type, icon, title, text);
  }
  function BaoLoi() {
    let type = "error";
    let icon = "fa-solid fa-circle-exclamation";
    let title = "Lỗi";
    let text = "Email hoặc mật khẩu không đúng.";
    createToast(type, icon, title, text);
  }
  function Loidetrong() {
    let type = "warning";
    let icon = "fa-solid fa-circle-exclamation";
    let title = "Cảnh báo";
    let text = "Vui lòng nhập đầy đủ thông tin";
    createToast(type, icon, title, text);
  }
  function loiEmail() {
    let type = "error";
    let icon = "fa-solid fa-circle-exclamation";
    let title = "Lỗi";
    let text = "Email nhập không đúng định dạng";
    createToast(type, icon, title, text);
  }
  const storedDataJSON = localStorage.getItem("userdata");
  userData = JSON.parse(storedDataJSON) || [];
  if (emails === "" || passwords === "") {
    Loidetrong();
    return;
  }
  if (!emailPattern.test(emails)) {
    loiEmail();
    return;
  }
  let check = true;
  for (let is = 0; is <= userData?.length - 1; is++) {
    console.log(userData[is].password);
    console.log(userData[is].email);
    if (emails == userData[is].email && passwords == userData[is].password) {
      check = true;
      break;
    }
  }

  if (check) {
    Thongbao();
    audio.play();
    setTimeout(window.location.href = "../Home/index.html", 1000)
    return check;
  } else {
    BaoLoi();
  }
}
