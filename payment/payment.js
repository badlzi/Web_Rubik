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
  for (let i = 0; i < data.length; i++) {
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
function totalCatShopping() {
  let totalCatShopping = 0;
  let totalOrder = 0;
  let sales = 0;
  const data = JSON.parse(localStorage.getItem("selectCartProduct"));
  for (let i = 0; i < data.length; i++) {
    totalCatShopping += data[i].price * data[i].quantity;
  }
  totalOrder = totalCatShopping - sales;
  document.getElementById("total").textContent = totalCatShopping + "\t VND";
  document.getElementById("voucher").textContent = sales + "\t VND";
  document.getElementById("total-order").textContent = totalOrder + "\t VND";
  return {
    totalOrder: totalOrder,
  };
}

khoiTao();
totalCatShopping();
