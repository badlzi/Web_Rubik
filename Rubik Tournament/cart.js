
function renderCartProducts() {
    const searchTerm = document.querySelector('#searchInput').value.toLowerCase();
    const cartProductContainer = document.querySelector('.cart-product');
    const cartTable = document.createElement('table');
    cartTable.className = 'cart-information';

    const headerRow = `
        <tr class="column-1">
            <td class="c1-r1"><input type="checkbox" id="cbo-all" onclick="cbocheckedall()"></td>
            <td class="c1-r2"><b>Sản Phẩm</b></td>
            <td class="c1-r3"><b>Đơn Giá</b></td>
            <td class="c1-r4"><b>Số Lượng</b></td>
            <td class="c1-r5"><b>Tạm Tính</b></td>
            <td class="c1-r6"><b>Thao Tác</b></td>
        </tr>`;
    cartTable.innerHTML += headerRow;

    var tamtinh = 0
    const dataLocal = JSON.parse(localStorage.getItem('cart'))
    for (let i = 0; i < dataLocal.length; i++) {
        const inputSearch = document.querySelector('#searchInput').value
        if (dataLocal[i].name.toLowerCase().includes(inputSearch.toLowerCase()) || dataLocal[i].price.toLowerCase().includes(inputSearch.toLowerCase())) {
            tamtinh = dongiavssoluong(i);
            const productRow = `
                <tr class="column-2" data-index=${i}>
                    <td class="c2:r1">
                        <input type="checkbox" id="cbo-${i}" onclick="updateTotalPrice()">
                    </td>
                    <td class="c2-r2">
                        <div class="picture">
                            <img src="${dataLocal[i].img}" alt="">
                        </div>
                        <div class="infomation">${dataLocal[i].name}</div>
                    </td>
                    <td class="c2-r3">
                        <p class="cost">${formatCurrency(parseFloat(dataLocal[i].price))}</p>
                    </td>
                    <td class="c2-r4" id=products-${i}>
                        <button style="text-align: center; width: 15%;" onclick="decrementValue(${i})" class="decrement">-</button>
                        <input style="text-align: center; width: 30%;" type="text" id="number-${i}" value="${dataLocal[i].quantity}" oninput="updateQuantity(${i}, this)">
                        <button style="text-align: center; width: 15%;" onclick="incrementValue(${i})" class="increment">+</button>
                    </td>
                    <td class="c2-r5">
                        <p class="money" id="subtotal-${i}">${formatCurrency(tamtinh)}</p>
                    </td>
                    <td class="c2-r6">
                        <a href="#" onclick="removeProduct(${i})"><i class="fa-solid fa-trash" style="color : red;"></i></a>
                    </td>
                </tr>`;
            cartTable.innerHTML += productRow;

        }

    }
    cartProductContainer.innerHTML = '';
    cartProductContainer.appendChild(cartTable);

    updateTotalPrice();
    provisional();
}
function formatCurrency(value) {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ');
}

function cbocheckedall() {
    const dataLocal = JSON.parse(localStorage.getItem('cart'))
    var cboall = document.querySelector(`input[id=cbo-all]`)
    if (cboall.checked == true) {
        for (let i = 0; i < dataLocal.length; i++) {
            var cbo = document.querySelector(`input[id=cbo-${i}]`)
            cbo.checked = true;
            updateTotalPrice()
        }
    }
    else {
        for (let i = 0; i < dataLocal.length; i++) {
            var cbo = document.querySelector(`input[id=cbo-${i}]`)
            cbo.checked = false;
            updateTotalPrice()
        }
    }
}
function updateQuantity(i, element) {
    updatePriceLocal(i, element.value)
    renderCartProducts()
}
function dongiavssoluong(i) {
    const dataLocal = JSON.parse(localStorage.getItem('cart'))
    return dataLocal[i].price * dataLocal[i].quantity;
}
function updatePriceLocal(vitri, index) {
    var local = JSON.parse(localStorage.getItem('cart'))
    local[vitri].quantity = index
    localStorage.setItem('cart', JSON.stringify(local));

}

function incrementValue(vitri) {
    var index = document.querySelector(`#number-${vitri}`).value
    index++
    document.querySelector(`#number-${vitri}`).value = index
    updatePriceLocal(vitri, index)
    renderCartProducts()

}

function decrementValue(vitri) {
    var index = document.querySelector(`#number-${vitri}`).value
    if (index > 1) {
        index--
        document.querySelector(`#number-${vitri}`).value = index
        updatePriceLocal(vitri, index)
        renderCartProducts()
    }

}


function formatCurrency(value) {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ');
}
function updateTotalPrice() {
    let sum = 0;
    const dataLocal = JSON.parse(localStorage.getItem('cart'))
    for (let i = 0; i < dataLocal.length; i++) {
        var cbo = document.querySelector(`input[id=cbo-${i}]`)
        if (cbo.checked == true) {
            sum += dataLocal[i].price * dataLocal[i].quantity;
            const tong_html = document.querySelector('#totalSum');
            tong_html.innerHTML = formatCurrency(sum)
        }
        if (cbo.checked == false) {
            const tong_html = document.querySelector('#totalSum');
            tong_html.innerHTML = formatCurrency(sum)
        }
    }

}

function provisional() {
    let sum = 0;
    const dataLocal = JSON.parse(localStorage.getItem('cart'))
    for (let i = 0; i < dataLocal?.length; i++) {
        sum += dataLocal[i].price * dataLocal[i].quantity;
        const tong_html = document.querySelector('#totalPrice');
        tong_html.innerHTML = formatCurrency(sum)
    }
}

function removeProduct(i) {
    const row = document.querySelector(`.column-2[data-index="${i}"]`);
    if (row) {
        row.parentNode.removeChild(row);
        const dataLocal = JSON.parse(localStorage.getItem('cart'))
        dataLocal.splice(i, 1);
        localStorage.setItem('cart', JSON.stringify(dataLocal));
        renderCartProducts()
    } else {
        console.log(`Row with index ${i} does not exist.`);
    }
}



function searchProducts() {
    renderCartProducts()
}

function payment() {
    var totalSum = document.querySelector('#totalSum').textContent
    window.location.href = 'http://127.0.0.1:3000/payment/payment.html?sum=' + totalSum
}

// Initial render
document.addEventListener('DOMContentLoaded', renderCartProducts);


