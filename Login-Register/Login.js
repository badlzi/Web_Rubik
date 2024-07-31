function validateForm(event) {
  event.preventDefault(); // Ngăn form submit tự động
  // Lấy giá trị từ các trường nhập liệu
  let notifications = document.querySelector('.notifications');
  const emails = document.forms["registrationForm"]["email"].value;
  const passwords = document.forms["registrationForm"]["password"].value;
  var audio = document.getElementById("myAudio");
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  function createToast(type, icon, title, text) {
    let newToast = document.createElement('div');
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
    newToast.timeOut = setTimeout(
      () => newToast.remove(), 5000
    )
  }
  function Thongbao() {
    let type = 'success';
    let icon = 'fa-solid fa-circle-check';
    let title = 'Thông báo';
    let text = 'Đăng nhập thành công';
    createToast(type, icon, title, text);
  }
  function BaoLoi() {
    let type = 'error';
    let icon = 'fa-solid fa-circle-exclamation';
    let title = 'Lỗi';
    let text = 'Email hoặc mật khẩu không đúng.';
    createToast(type, icon, title, text);
  }
  function Loidetrong() {
    let type = "warning";
    let icon = "fa-solid fa-circle-exclamation";
    let title = "Cảnh báo";
    let text = "Vui lòng nhập đầy đủ thông tin";
    createToast(type, icon, title, text);
  }
  function loiEmail(){
    let type = "error";
    let icon = "fa-solid fa-circle-exclamation";
    let title = "Lỗi";
    let text = "Email nhập không đúng định dạng";
    createToast(type, icon, title, text);
  }
  const storedDataJSON = localStorage.getItem("userdata")
  userData = JSON.parse(storedDataJSON) || []
  let check = false
  if (emails === '' || passwords === '') {
    Loidetrong();
    return;
  }
  if(!emailPattern.test(emails)){
    loiEmail();  
    return;
  }
  for (let is = 0; is <= userData?.length - 1; is++) {
    console.log(userData[is].password);
    console.log(userData[is].email);
    if (emails == userData[is].email && passwords == userData[is].password) {
      check = true
      break;
    }

  }

  if (check) {
    Thongbao();
    audio.play();
    return;

  } else {
    BaoLoi();
  }

}
document.getElementById('toggle-password').addEventListener('click', function () {
  var passwordInput = document.getElementById('password');
  var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  // Thay đổi biểu tượng con mắt khi nhấn
  this.innerHTML = type === 'password' ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>'; // Sử dụng mã Unicode cho các biểu tượng khác nhau
});