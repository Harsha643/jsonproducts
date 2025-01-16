
// Fetch and display product data
async function getData() {
    let loader=document.getElementById("loader")
    // let notavailable=document.getElementById('notavailable')

    try {
        let response = await fetch("https://brick-tourmaline-case.glitch.me/products");
        if (!response.ok) throw new Error(response.statusText);

        let products = await response.json();
        if (products.length === 0) {
            // No data available
            loader.style.display = 'none';
            // notavailable.style.display = 'block';
        } else {
            document.getElementById('notavailable').style.display = 'none';
            displayData(products);
         
        }
    } catch (error) {
        console.error(error);
    }
}

// Display products
function displayData(products) {
    // document.getElementById('notavailable').style.display = 'none';
    setTimeout(()=>{
        document.querySelector(".loader").style.display = 'none';
        products.forEach((product) => {
            let container = document.getElementsByClassName("container")[0];
            let item = document.createElement("div");
            item.className = "item";
            item.innerHTML = `
                <img src='${product.image}' alt='${product.productName}'>
                <p>${product.productName}</p>
                <p>Rating: ${product.rate}</p>
                <p>₹${product.price}.00</p>
                <button onclick="addToCart(${product.id}, '${product.productName}', '${product.image}', ${product.price})">Add to Cart</button>
                <button onclick="buyNow(${product.id}, '${product.productName}', '${product.image}', ${product.price})">Buy Now</button>
            `;
       
            container.appendChild(item);
    })
    },3000);
}


let cart = []; // To store cart items
// Add to cart
function addToCart(id, name, image, price) {
    cart.push({ id, name, image, price });
    
}




// Buy now functionality
function buyNow(id, name, image, price) {
    localStorage.setItem(
        "buyNowProduct",
        JSON.stringify({ id, name, image, price })
    );
    window.location.href = "buy.html";
}

document.addEventListener("DOMContentLoaded", getData);
