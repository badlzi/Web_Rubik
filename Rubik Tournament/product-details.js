const urlParams = new URLSearchParams(window.location.search);
const storedName = urlParams.get('name');
const storedPrice = urlParams.get('price');
const storedImg = urlParams.get('img');

document.querySelector('.title-big-details').innerHTML = decodeURIComponent(storedName)
document.querySelector('.price-details').innerHTML = decodeURIComponent(storedPrice)
document.querySelector('.img-details-product img').src = decodeURIComponent(storedImg)



var getNumber = document.querySelector('.number-quatity-details');
var index = 1;
function plus() {
    index++
    getNumber.innerHTML = index;
}

function minus() {
    if (index > 1) {
        index--
        getNumber.innerHTML = index
    }
}


function checkValidateProduct(keyLocal, value) { //hàm dùng để kiểm tra xem items đã tồn tại hay chưa nếu tồn tại thì gộp số lượng lại
    const cart = JSON.parse(localStorage.getItem(keyLocal));

    let found = false;
    for (let index = 0; index < cart.length; index++) {
        if (value.name === cart[index].name) {
            const sum = parseInt(cart[index].quantity) + parseInt(value.quantity);
            cart[index].quantity = sum;
            found = true;
            break;
        }
    }

    if (!found) {
        cart.push(value);
    }
    localStorage.setItem(keyLocal, JSON.stringify(cart));
}

function showPopup(message) {
    document.getElementById('popup-message').textContent = message;
    document.getElementById('popup').style.display = 'block';
    setTimeout(closePopup, 1000);
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function countLocalStorageKeys() { //hàm dùng để trả về số lượng items trong localStorage 
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    return cart.length
}

function addProductsToLocalStorage(keyLocal, value) { //hàm để add sản phẩm (mảng) vào local
    let products = JSON.parse(localStorage.getItem(keyLocal)) || [];
    products.push(value);
    localStorage.setItem(keyLocal, JSON.stringify(products));
}

function reloadCountCart() { //hàm này khi gọi sẽ update số lượng items đang có từ hàm countLocalStorageKeys() vào id count-products ở html
    document.querySelector('#count-products').innerHTML = countLocalStorageKeys()
}
reloadCountCart()

function add() {
    showPopup('Đã thêm vào giỏ hàng!');

    const nameProduct = document.querySelector(".title-big-details").textContent
    const price = document.querySelector('.price-details').innerHTML = decodeURIComponent(storedPrice)
    const img = document.querySelector('.img-details-product img').src
    const quantity = document.querySelector('.number-quatity-details').textContent
    value = {
        name: nameProduct,
        price: price.split(' ')[0].replace('.', ''),
        img: img,
        quantity: JSON.parse(quantity)
    }
    const keyLocal = 'cart'
    try {
        checkValidateProduct(keyLocal, value)
        reloadCountCart()
    } catch (error) {
        addProductsToLocalStorage(keyLocal, value)
        reloadCountCart()
    }

};

function bought() {
    showPopup('Đã mua hàng!');
    add()
}


function cart() {
    const btnCart = document.querySelector('#cart-icon')
    window.location.href = 'http://localhost:3000/Rubik%20Tournament/cart.html'
}