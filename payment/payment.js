let taiKhoanDangNhap = null;
const sanPhamList = document.getElementById("table-product");
const infoTaiKhoan = document.getElementById("info-taikhoan");
const loginForm = document.getElementById("loginForm");

function khoiTao() {
  hienThiDanhSachSanPham();
}

function hienThiThongTinTaiKhoan() {
  if (taiKhoanDangNhap) {
    infoTaiKhoan.textContent = `Xin chào, ${taiKhoanDangNhap.username}`;
  } else {
    infoTaiKhoan.textContent = "Bạn chưa đăng nhập";
  }
}

function hienThiDanhSachSanPham() {
  const data = JSON.parse(localStorage.getItem("selectCartProduct"));
  let quantityAll = 0;
  for (let i = 0; i < data?.length; i++) {
    const tr = document.createElement("tr");
    let totalProduc = data[i].price * data[i].quantity;
    tr.innerHTML = `
      <td style="display: flex;"><img src="${data[i].img}" alt="${
      data[i].name
    } "style = "width:50px;">
      <h3>${data[i].name}</h3></td>
      <td><p class="gia" style="  text-align: center;">${data[
        i
      ].price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}  VND</p></td>
      <td><p style="text-align: center;">${data[i].quantity}</p></td>
      <td><p style="text-align: center;">${totalProduc}  VND</p></td>
    `;
    quantityAll += Number(data[i].quantity);
    sanPhamList.appendChild(tr);
  }
  const tr2 = document.createElement("tr");
  let totalOrder = totalCatShopping();
  tr2.innerHTML = `
    <td><p></p></td>
      <td style="display:  flex; font-weight: bold; font-size: 20px; text-align: center;">Tổng: </td>
      <td><p style="text-align: center;">${quantityAll}</p></td>
    <td><p style="text-align: center;">${totalOrder.totalOrder}  VND</p></td>
    `;
  sanPhamList.appendChild(tr2);
}
async function totalCatShopping() {
  let totalCatShopping = 0;
  let totalOrder = 0;
  let sales = 0;
  const data = JSON.parse(localStorage.getItem("selectCartProduct"));
  for (let i = 0; i < data?.length; i++) {
    totalCatShopping += data[i].price * data[i].quantity;
  }
  totalOrder = totalCatShopping - sales;
  document.getElementById("total").textContent = totalCatShopping + "\t VND";
  document.getElementById("voucher").textContent = sales + "\t VND";
  document.getElementById("total-order").textContent = totalOrder + "\t VND";
  //------------------------//
  let My_Bank = {
    BANK_ID: "BIDV",
    ACCOUNT_NO: "7500537037",
  };
   document.getElementById("totalbank").textContent = totalCatShopping + "\t VND";
  document.getElementById("voucherbank").textContent = sales + "\t VND";
  document.getElementById("total-orderbank").textContent = totalOrder + "\t VND";
  const course_qr_img = document.querySelector(".course_qr_img");
  //---------------------//
  let QR = `https://img.vietqr.io/image/${My_Bank.BANK_ID}-${My_Bank.ACCOUNT_NO}-compact2.png?amount=${totalOrder}&addInfo=COURSE00111`;
  course_qr_img.src = QR;
  while(true){
    const check = await checkPaid(totalOrder, `COURSE0011`);
    if(check){
        alert("Thành công");
        return;
    }
  }
  return {
    totalOrder: totalOrder,
  };
}
// ----//
let isSucess = false;
async function checkPaid(price, content) {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxGkiE6AkFW7U2J_XLcfw8ba0HMH5tN0QG_6YEVhcS4DKE0w_v9-53-JPl1R65lXDEt/exec"
    );
    const data = await response.json();
    const lastPaid = data.data[data.data.length - 1];
    lastPrice = lastPaid["Giá trị"];
    lastContent = lastPaid["Mô tả"];
    console.log(lastPaid);
    if (lastPrice == price && lastContent.includes(content)) {
    //   alert("Thanh toán thành công");
    //   clearInterval(interval)
      // clearintervel();
      return true;
    } else {
      console.log("Không thành công");
      return false;
    }
  } catch {
    console.error("Lỗi");
    return false;
  }
}

paypal.Buttons({
  createOrder: function (data, actions) {
      return actions.order.create({
          purchase_units: [{
              amount: {
                  value: '100'
              }
          }]
      });
  },
  onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
          // Xử lý khi thanh toán thành công
          console.log(details);
      });
  },
  onError: function (err) {
      // Xử lý khi xảy ra lỗi
      console.error(err);
  }
}).render('#paypal-button-container');
// Hiển thị URL ra console

khoiTao();
totalCatShopping();
