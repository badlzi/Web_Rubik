var citis = document.getElementById("city");
var districts = document.getElementById("district");
var wards = document.getElementById("ward");
var Parameter = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
  method: "GET",
  responseType: "application/json",
};
var promise = axios(Parameter);
promise.then(function (result) {
  renderCity(result.data);
});

function renderCity(data) {
  for (const x of data) {
    citis.options[citis.options.length] = new Option(x.Name, x.Id);
  }
  citis.onchange = function () {
    district.length = 1;
    ward.length = 1;
    if (this.value != "") {
      const result = data.filter(n => n.Id === this.value);

      for (const k of result[0].Districts) {
        district.options[district.options.length] = new Option(k.Name, k.Id);
      }
    }
  };
  district.onchange = function () {
    ward.length = 1;
    const dataCity = data.filter((n) => n.Id === citis.value);
    if (this.value != "") {
      const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

      for (const w of dataWards) {
        wards.options[wards.options.length] = new Option(w.Name, w.Id);
      }
    }
  };
}
function clickradio() {
  const bankradio = document.getElementById('bank');
  const momoradio = document.getElementById('paypal');
  const liveradio = document.getElementById('live');

  if (bankradio.checked) {
    window.location.replace("https://www.youtube.com/");
  }
  if (momoradio.checked) {
    console.log("đã check")
    paypal.Buttons({
      // ... (các tùy chọn khác)
    }).render('#paypal-button-container').then(function (paypal) {
      // Tạo đơn hàng
      paypal.core.Promise.resolve(paypal.core.Promise.needs(paypal.Buttons)).then(function (buttons) {
        buttons.createOrder({
          purchase_units: [{
            amount: {
              value: '8.99'
            }
          }]
        }).then(function (order) {
          // Xử lý đơn hàng thành công
          return buttons.actions.order.capture(order, {
            capture_method: 'AUTHORIZE_AND_CAPTURE'
          });
        }).then(function (details) {
          // Xử lý thanh toán thành công
          console.log(details);
        }).catch(function (error) {
          // Xử lý lỗi
          console.error(error);
        });
      });
    });
  }
  if (liveradio.checked) {
    window.location.replace("https://github.com/");
  }
}

function setComboboxData() {

  const data = JSON.parse(localStorage.getItem('cart'));
  const combobox = document.getElementById('myCombobox');
  for (let i = 0; i < data.length; i++) {
    const option = document.createElement('option');
    option.textContent = data[i].name
    combobox.appendChild(option)
  }
}
setComboboxData();