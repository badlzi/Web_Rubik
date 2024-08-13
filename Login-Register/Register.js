// var  newUser = { name: "quy", email: "ngocquy123@gmail.com", password: "123" };
var userData = [{ name: "", email: "", password: "  " }];
// userData.push(newUser);
// console.log(userData);
// userData = JSON.parse(storedDataJSON);
// const updatedDataJSON = JSON.stringify(userData);
// localStorage.setItem("userdata", updatedDataJSON);
function UserData(fname, femail, fpassword) {
  var newUser = { name: fname, email: femail, password: fpassword };
  console.log(newUser);
  userData.push(newUser); // Create new user object
  updatedDataJSON = JSON.stringify(userData);
  localStorage.setItem("userdata", updatedDataJSON);
}

function validateForm(event) {
  event.preventDefault(); // Ngăn form submit tự động
  // Lấy giá trị từ các trường nhập liệu

  let notifications = document.querySelector(".notifications");
  const names = document.forms["registrationForm"]["name"].value;
  const emails = document.forms["registrationForm"]["email"].value;
  const passwords = document.forms["registrationForm"]["password"].value;
  const rePassword = document.forms["registrationForm"]["re-password"].value;
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
    let text = "Đăng kí thành công";
    createToast(type, icon, title, text);
  }
  function BaoLoi() {
    let type = "error";
    let icon = "fa-solid fa-circle-exclamation";
    let title = "Lỗi";
    let text = "Tên đăng kí, mật khẩu hoặc xác nhận mật khẩu không đúng.";
    createToast(type, icon, title, text);
  }
  function Loidetrong(){
    let type = "warning";
    let icon = "fa-solid fa-circle-exclamation";
    let title = "Cảnh báo";
    let text = "Vui lòng nhập đầy đủ thông tin";
    createToast(type, icon, title, text);
  }
  function dodaimatkhau(){
    let type = "error";
    let icon = "fa-solid fa-circle-exclamation";
    let title = "Lỗi";
    let text = "Mật khẩu phải từ 3-12 kí tự";
    createToast(type, icon, title, text);
  }
  function loiEmail(){
    let type = "error";
    let icon = "fa-solid fa-circle-exclamation";
    let title = "Lỗi";
    let text = "Email nhập không đúng định dạng";
    createToast(type, icon, title, text);
  }
  function loitrungEmail(){
    let type = "error";
    let icon = "fa-solid fa-circle-exclamation";
    let title = "Lỗi";
    let text = "Email nhập bị trùng";
    createToast(type, icon, title, text);
  }
  const storedDataJSON = localStorage.getItem("userdata");
  userData = JSON.parse(storedDataJSON) || [];
  // console.log(storedDataJSON);
  if(names==='' || emails==='' || passwords==='' || rePassword===''){
    Loidetrong();
    return;
  }
  if(!emailPattern.test(emails)){
    loiEmail();  
    return;
  }
  if(passwords.length<3 || passwords.length>12){
    dodaimatkhau();
    return;
  }

  let check = false;
  for (let is = 0; is <= userData?.length - 1; is++) {
    console.log(userData[is].email);
    if (emails === userData[is].email) {
      check = true;
      break;
    }
  }
  
  if (!check) {
    if (passwords === rePassword) {
      UserData(names, emails, passwords);
      console.log(names);
      console.log(emails);
      console.log(passwords);
      Thongbao();
      audio.play();
      return;   
    } else {
      BaoLoi();
      return;
    }
  } else {
    loitrungEmail();
  }

  // Nếu tất cả đều hợp lệ, submit form
  // document.forms["registrationForm"].submit();
}
document.querySelectorAll(".toggle-password").forEach((toggle) => {
  toggle.addEventListener("click", function () {
    console.log("ok")
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
