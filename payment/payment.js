const sanPhamDuLieu = [
  {
    id: 1,
    ten: "Áo thun nam",
    gia: 200000,
    soLuong: 10,
    hinhAnh:
      "https://cdn.tgdd.vn/Products/Images/1164/128342/sim-4g-viettel-vsim-happy-tri-hieu-10-nam-mien-phi-goi-noi-mang-viettel-10gb-thang-mua-sim-nhan-ngay-qua-tang-cuc-dep-1.jpg",
    moTa: "Áo thun nam tay ngắn cổ tròn basic cotton co giãn 4 chiều mềm mại mịn màng thoáng mát thấm hút mồ hôi tốt form ôm vừa vặn tôn dáng phù hợp mọi hoạt động",
  },
  {
    id: 2,
    ten: "Áo thun nam",
    gia: 200000,
    soLuong: 10,
    hinhAnh:
      "https://cdn.tgdd.vn/Products/Images/1164/128342/sim-4g-viettel-vsim-happy-tri-hieu-10-nam-mien-phi-goi-noi-mang-viettel-10gb-thang-mua-sim-nhan-ngay-qua-tang-cuc-dep-1.jpg",
    moTa: "Áo thun nam tay ngắn cổ tròn basic cotton co giãn 4 chiều mềm mại mịn màng thoáng mát thấm hút mồ hôi tốt form ôm vừa vặn tôn dáng phù hợp mọi hoạt động",
  },
  {
    id: 3,
    ten: "Áo thun nam",
    gia: 200000,
    soLuong: 10,
    hinhAnh:
      "https://cdn.tgdd.vn/Products/Images/1164/128342/sim-4g-viettel-vsim-happy-tri-hieu-10-nam-mien-phi-goi-noi-mang-viettel-10gb-thang-mua-sim-nhan-ngay-qua-tang-cuc-dep-1.jpg",
    moTa: "Áo thun nam tay ngắn cổ tròn basic cotton co giãn 4 chiều mềm mại mịn màng thoáng mát thấm hút mồ hôi tốt form ôm vừa vặn tôn dáng phù hợp mọi hoạt động",
  },
  // ... (Cập nhật dữ liệu 10 sản phẩm của bạn)
  // ... (Cập nhật dữ liệu 10 sản phẩm của bạn)
];

// Khởi tạo biến
let taiKhoanDangNhap = null;
const sanPhamList = document.getElementById("table-product");
const infoTaiKhoan = document.getElementById("info-taikhoan");
const loginForm = document.getElementById("loginForm");

// Hàm khởi tạo
function khoiTao() {
  hienThiDanhSachSanPham();
}

// Hàm hiển thị thông tin tài khoản
function hienThiThongTinTaiKhoan() {
  if (taiKhoanDangNhap) {
    infoTaiKhoan.textContent = `Xin chào, ${taiKhoanDangNhap.username}`;
  } else {
    infoTaiKhoan.textContent = "Bạn chưa đăng nhập";
  }
}

// Hàm hiển thị danh sách sản phẩm
function hienThiDanhSachSanPham() {
  //   sanPhamList.innerHTML = ""; // Xóa danh sách cũ trước khi hiển thị mới

  sanPhamDuLieu.forEach((sanPham) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="display: flex;"><img src="${sanPham.hinhAnh}" alt="${
      sanPham.ten
    } "style = "width:50px;">
      <h3>${sanPham.ten}</h3></td>
      <td><p>${sanPham.soLuong}</p></td>
      <td><p class="gia">${sanPham.gia.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}</p></td>
    `;

    sanPhamList.appendChild(tr);
  });
}
function totalCatShopping() {
  let totalCatShopping = 0;
  let totalproducts = 0;
  sanPhamDuLieu.forEach((sanpham) => {
    totalproducts = sanpham.gia * sanpham.soLuong;
    totalCatShopping += totalproducts;
  });
  document.getElementById("total").textContent = totalCatShopping;
}

function totalOrder() {}
// Hàm xử lý đăng nhập
// loginForm.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   if (username === "admin" && password === "123456") {
//     localStorage.setItem("taiKhoanDangNhap", JSON.stringify({ username }));
//     khoiTao(); // Cập nhật thông tin sau khi đăng nhập
//   } else {
//     alert("Đăng nhập thất bại!");
//   }
// });

// Khởi tạo ứng dụng
khoiTao();
totalCatShopping();
