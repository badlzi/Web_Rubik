function validateForm(event) {
    event.preventDefault(); // Ngăn form submit tự động
    // Lấy giá trị từ các trường nhập liệu
    let notifications = document.querySelector('.notifications');
    const emails = document.forms["registrationForm"]["email"].value;
    const passwords = document.forms["registrationForm"]["password"].value;
    function createToast(type, icon, title, text){
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
          ()=>newToast.remove(), 5000
      )
  }
  function Thongbao(){
      let type = 'success';
      let icon = 'fa-solid fa-circle-check';
      let title = 'Thông báo';
      let text = 'Đăng nhập thành công';
      createToast(type, icon, title, text);
  }
  function BaoLoi(){
      let type = 'error';
      let icon = 'fa-solid fa-circle-exclamation';
      let title = 'Lỗi';
      let text = 'Tên đăng nhập, mật khẩu hoặc xác nhận mật khẩu không đúng.';
      createToast(type, icon, title, text);
  }
    // Kiểm tra các trường đã được điền đầy đủ
  //   if (name === "" || email === "" || password === "" || rePassword === "") {
  //       document.getElementById('information').innerText = "Vui lòng điền đầy đủ tất cả các trường.";
  //       document.getElementById('information').style.display = 'block';
  //       setTimeout(() => { document.getElementById('information').style.display = 'none'; }, 2000);
  //       return false;
  //   }
    // for(var is in userData){
    //   if(names === userData[is].name || emails=== userData[is].email){
    //     BaoLoi();
    //     return;
    //   }
    //   else{
        if (passwords === "" ) {
            Thongbao();
            return;
          //   return false; // Ngăn form submit
        } else {
            BaoLoi();
            console.log(userData);
            return;
          //   return false; // Ngăn form submit
        }
  
    // Nếu tất cả đều hợp lệ, submit form
    // document.forms["registrationForm"].submit();
  }