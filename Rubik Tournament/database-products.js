database = [{
    data_2x2: [
        {
            nameProduct: "RUBIK 2X2 1",
            price: "10.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 2X2 2",
            price: "20.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 2X2 3",
            price: "30.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 2X2 4",
            price: "40.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 2X2 5",
            price: "50.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 2X2 6",
            price: "60.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 2X2 7",
            price: "70.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 2X2 8",
            price: "80.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 2X2 9",
            price: "90.000 VND",
            quantity: 1
        }
    ],
    data_3x3: [
        {
            nameProduct: "RUBIK 3X3 1",
            price: "10.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 3X3 2",
            price: "20.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 3X3 3",
            price: "30.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 3X3 4",
            price: "40.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 3X3 5",
            price: "50.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 3X3 6",
            price: "60.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 3X3 7",
            price: "70.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 3X3 8",
            price: "80.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 3X3 9",
            price: "90.000 VND",
            quantity: 1
        }
    ],

    data_4x4: [
        {
            nameProduct: "RUBIK 4X4 1",
            price: "10.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 4X4 2",
            price: "20.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 4X4 3",
            price: "30.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 4X4 4",
            price: "40.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 4X4 5",
            price: "50.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 4X4 6",
            price: "60.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 4X4 7",
            price: "70.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 4X4 8",
            price: "80.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 4X4 9",
            price: "90.000 VND",
            quantity: 1
        }
    ],

    data_5x5: [
        {
            nameProduct: "RUBIK 5X5 1",
            price: "10.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 5X5 2",
            price: "20.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 5X5 3",
            price: "30.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 5X5 4",
            price: "40.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 5X5 5",
            price: "50.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 5X5 6",
            price: "60.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 5X5 7",
            price: "70.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 5X5 8",
            price: "80.000 VND",
            quantity: 1
        },
        {
            nameProduct: "RUBIK 5X5 9",
            price: "90.000 VND",
            quantity: 1
        }
    ]
}]

const title = document.querySelector('title').textContent //lấy tên title của web hiện tại để thực hiện if else 
//dựa theo title là gì để đưa đúng các mục từ database lên ví dụ nếu title là 2x2 thì sẽ lấy data_2x2 của database để lấy thông tin đưa lên tương ứng

const db = 'data_' + title //"data_" + title là code từ database khi gán cho db thì khi gọi database[0][db] db tức là tên database của 2x2
for (let i = 0; i < database[0][db].length; i++) { //dùng for để đưa dữ liệu vào các div .rubik-product
    const info = document.querySelector(`#info${i + 1}`)
    info.querySelector('.name-product').innerHTML = database[0][db][i].nameProduct; //đưa tên từ database lên class name-product
    info.querySelector('.price').innerHTML = database[0][db][i].price; //đưa giá từ database lên class price
}


function details_to_info(button) {
    const product = button.closest('.rubik-product');
    const nameproduct = product.querySelector('.name-product').textContent; //lấy tên sản phẩm
    const price = product.querySelector('.price').textContent; //lấy giá sản phẩm
    const img = product.querySelector('.img img').src; //lấy url từ src của thẻ img

    window.location.href = `http://127.0.0.1:3000/Rubik%20Tournament/Product-details.html?name=${encodeURIComponent(nameproduct)}&price=${encodeURIComponent(price)}&img=${encodeURIComponent(img)}`

}

console.log(localStorage.getItem('cart'));