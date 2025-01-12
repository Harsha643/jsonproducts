function validateInput() {
    let isValid = true;

    // Get input fields and their error placeholders
    const name = document.getElementById("name").value.trim();
    const image = document.getElementById("image").value.trim();
    const des = document.getElementById("des").value.trim();
    const rate = document.getElementById("rate").value.trim();
    const price = document.getElementById("price").value.trim();

    const nameError = document.getElementById("nameError");
    const imageError = document.getElementById("imageError");
    const desError = document.getElementById("DescriptionError");
    const rateError = document.getElementById("RateError");
    const priceError = document.getElementById("priceError");

    // Clear previous error messages
    nameError.textContent = "";
    imageError.textContent = "";
    desError.textContent = "";
    rateError.textContent = "";
    priceError.textContent = "";

    // Validate name
    if (!name) {
        nameError.textContent = "Name is required.";
        isValid = false;
    }

    // Validate image URL
    if (!image) {
        imageError.textContent = "Image URL is required.";
        isValid = false;
    } else if (!isValidURL(image)) {
        imageError.textContent = "Enter a valid URL.";
        isValid = false;
    }

    // Validate description
    if (!des) {
        desError.textContent = "Description is required.";
        isValid = false;
    }

    // Validate rate (should be a number between 1 and 5)
    if (!rate) {
        rateError.textContent = "Rating is required.";
        isValid = false;
    } else if (isNaN(rate) || rate < 1 || rate > 5) {
        rateError.textContent = "Rating must be a number between 1 and 5.";
        isValid = false;
    }

    // Validate price (should be a positive number)
    if (!price) {
        priceError.textContent = "Price is required.";
        isValid = false;
    } else if (isNaN(price) || price <= 0) {
        priceError.textContent = "Price must be a positive number.";
        isValid = false;
    }

    if (!isValid) {
        alert("Please fill out all fields correctly.");
    }

    return isValid;
}

// Helper function to validate URL
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

async function saveData() {
    if (!validateInput()) return; // Stop if validation fails

    const productId = document.getElementById("id").value.trim();
    const productName = document.getElementById("name").value.trim();
    const image = document.getElementById("image").value.trim();
    const des = document.getElementById("des").value.trim();
    const rate = document.getElementById("rate").value.trim();
    const price = document.getElementById("price").value.trim();

    const obj = {
        productName,
        image,
        description: des,
        rate,
        price,
    };

    const method = productId ? "PUT" : "POST";
    const URL = productId
        ? `https://brick-tourmaline-case.glitch.me/products/${productId}`
        : "https://brick-tourmaline-case.glitch.me/products";

    try {
        const response = await fetch(URL, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });

        if (!response.ok) {
            throw new Error("Failed to save data");
        }

        const newProduct = await response.json();
        alert("Data saved successfully!");

        // Create a new card for the saved data
        createProductCard(newProduct);

        fetchData(); // Refresh the product list
    } catch (error) {
        console.error(error);
        alert("An error occurred while saving data.");
    }
}

// Function to create and display a product card
function createProductCard(product) {
    const container = document.getElementById("container");
    const item = document.createElement("div");

    item.innerHTML = `
        <p>ID: ${product.id}</p>
        <p>Name: ${product.productName}</p>
        <img src="${product.image}" alt="${product.productName}" style="width:100%; border-radius:8px;">
        <p>Description: ${product.description}</p>
        <p>Rating: ${product.rate}</p>
        <p>Price: ${product.price}</p>
        <button id="deleteBtn-${product.id}">Delete</button>
        <button id="editBtn-${product.id}">Edit</button>
    `;

    container.appendChild(item);

    const deleteBtn = document.getElementById(`deleteBtn-${product.id}`);
    const editBtn = document.getElementById(`editBtn-${product.id}`);

    deleteBtn.onclick = () => {
        deleteData(product.id);
    };
    editBtn.onclick = () => {
        editData(product.id);
    };
}
