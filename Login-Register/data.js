 const data = {
  // Data giỏ hàng
  cart: {
    productsName: "",
    productsImg: "",
    price: 0,
    quantity: 0,
    status: false,
  },
  // Data thông tin người dùng
  userInfo: {
    name: "nghi",
    email: "nghindpc08445@gmail.com",
    address: "",
    password: "1234",
  },
  // data thông tin thanh toán
  Billing_Information: {
    id_pay: "",
    price_pay: "",
    note_paY: "",
  },
};
function loadDataFromLocalStorage() {
  const storedData = localStorage.getItem("appData");
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      Object.assign(data, parsedData); // Sáp nhập dữ liệu được truy xuất
    } catch (error) {
      console.error("Lỗi tải dữ liệu từ local storage:", error);
      // Xử lý các lỗi tiềm ẩn một cách khéo léo (ví dụ: đặt lại dữ liệu, thông báo cho người dùng)
    }
  }
}

// Hàm lưu dữ liệu vào local storage
 function saveDataToLocalStorage() {
  try {
    localStorage.setItem("appData", JSON.stringify(data));
  } catch (error) {
    console.error("Lỗi lưu dữ liệu vào local storage:", error);
    // Xử lý các lỗi tiềm ẩn một cách khéo léo (ví dụ: thông báo cho người dùng, cân nhắc lưu trữ thay thế)
  }
}

// Hàm lấy dữ liệu
function getData() {
  return data;
}

// Hàm cập nhật dữ liệu
 function updateData(newData) {
  Object.assign(data, newData);
  saveDataToLocalStorage(); // Lưu dữ liệu đã cập nhật
}
function addItem(dataSection, item) {
  if (data[dataSection] && Array.isArray(data[dataSection][item])) {
    data[dataSection][item].push(item);
    saveDataToLocalStorage(); // Lưu dữ liệu đã cập nhật
    return true; // Thêm thành công
  } else {
    console.error(
      `Không thể thêm mục vào phần dữ liệu: "${dataSection}" hoặc kiểu mục không hợp lệ`
    );
    return false; // Thêm thất bại
  }
}

// Hàm sửa mục dữ liệu trong một phần dữ liệu
function editItem(dataSection, key, newValue) {
  if (data[dataSection] && data[dataSection][key] !== undefined) {
    data[dataSection][key] = newValue;
    saveDataToLocalStorage(); // Lưu dữ liệu đã cập nhật
    return true; // Sửa thành công
  } else {
    console.error(
      `Không thể sửa mục dữ liệu: Phần dữ liệu "<span class="math-inline">\{dataSection\}" hoặc khóa "</span>{key}" không hợp lệ`
    );
    return false; // Sửa thất bại
  }
}

//   Hàm xóa mục dữ liệu khỏi một phần dữ liệu
export function removeItem(dataSection, item) {
  if (data[dataSection] && Array.isArray(data[dataSection][item])) {
    const itemIndex = data[dataSection][item].findIndex((i) => i === item);
    if (itemIndex !== -1) {
      data[dataSection][item].splice(itemIndex, 1);
      saveDataToLocalStorage(); // Lưu dữ liệu đã cập nhật
      return true; // Xóa thành công
    } else {
      console.error(
        `Không thể xóa mục: Mục không được tìm thấy trong phần dữ liệu "${dataSection}"`
      );
      return false; // Xóa thất bại
    }
  } else {
    console.error(
      `Không thể xóa mục: Phần dữ liệu "${dataSection}" không hợp lệ hoặc kiểu mục không hợp lệ`
    );
    return false; // Xóa thất bại
  }
}
// ví dụ
// addItem('cart', 'items', { name: 'Product 3', price: 25 });
// console.log(getData().cart.items); // Output: [{ name: 'Product 1', price: 10 }, { name: 'Product 2', price: 15 }, { name: 'Product 3', price: 25 }]

// // Example usage - Editing user name
// editItem('userInfo', 'name', 'Jane Doe');
// console.log(getData().userInfo.name); // Output: Jane Doe

// // Example usage - Removing billing info price
// removeItem('billingInfo', 'price_pay');
// console.log(getData().billingInfo.price_pay); // Output: undefined (price removed)
// // Tải ban đầu (tùy chọn)
// loadDataFromLocalStorage();
// var daa = localStorage.getItem("appData");
// console.log(JSON.parse(daa).userInfo);
