
async function fetchData() {
    let loader=document.getElementById("loading-screen")
   
    let response=await fetch("https://brick-tourmaline-case.glitch.me/products")
    try{
        if(!response.ok){
            throw new Error(response.statusText)
        }
        let data=await response.json()
if (data.length === 0) {
    // No data available
    loader.style.display = 'none';
    document.getElementById('no-data-message').style.display = 'block';
} else {
    // Display products
    loader.style.display="none"
    displayData(data);
    // fetchData()
}
        
    }catch(error){
        alert("data is fetch to failed")
        console.error(error)
        loader.innerText="Failed to load content."
    }
}
fetchData()



function valid() {
    let isValid=true;
    // Get input fields and their error placeholders
    const name = document.getElementById("name").value.trim();
    const nameError = document.getElementById("nameError");
    const image = document.getElementById("image").value.trim(); 
    const imageError = document.getElementById("imageError");
    const des = document.getElementById("des").value.trim();
    const desError = document.getElementById("descriptionError");
    const rate = document.getElementById("rate").value.trim();
    const price = document.getElementById("price").value.trim();
    const priceError = document.getElementById("priceError");

    const rateError = document.getElementById("rateError");

  
    // Clear previous error messages
//     nameError.textContent =name? "":"name is required";
//     imageError.textContent =image? "":"Image is required";
//     desError.textContent = des?"":"Description is requied";
//     priceError.textContent = price?"":"price is required";
//     rateError.textContent=rate?"":"rating is required";


//     if((((!name || !image) && (!des || !price)))&&(!rate)) isValid=false;
// return isValid;



    // Validate name
    if (!name) {
        nameError.textContent = "Name is required.";
        isValid = false;
    }else{
        nameError.style.display="none"
    }

    // Validate image URL
    if (!image) {
        imageError.textContent = "Image URL is required.";
        isValid = false;
    } else if (!isValidURL(image)) {
        imageError.textContent = "Enter a valid URL.";
        isValid = false;
    }else{
        imageError.style.display="none"
    }

    // Validate description
    if (!des) {
        desError.textContent = "Description is required.";
        desError.style.color="red"
        isValid = false;
    }else{
        desError.style.display="none"
    }

    // Validate rate (should be a number between 1 and 5)
    if (!rate) {
        rateError.innerText = "Rating is required.";
        rateError.style.color="red"
        isValid = false;
    } else if (isNaN(rate) || rate < 1 || rate > 5) {
        rateError.textContent = "Rating must be a number between 1 and 5.";
        isValid = false;
    }else{
        rateError.style.display="none"
    }

    // Validate price (should be a positive number)
    if (!price) {
        priceError.textContent = "Price is required.";
        isValid = false;
    } 
    else if (isNaN(price) || price <= 0) {
        priceError.textContent = "Price must be a positive number.";
        isValid = false;
    }else{
        priceError.style.display="none"
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
        
      




function displayData(products){


let container =document.getElementById("container")
container.innerHTML=""
document.getElementById('no-data-message').style.display = 'none';
    products.forEach((product) => {
        // console.log(product.id)
        let item = document.createElement("div");
        item.innerHTML = `
        <img src="${product.image}" alt="${product.productName}" style="width:100px; border-radius:8px;">
            <p>ID : ${product.id}</p>
            <p>Name : ${product.productName}</p>
            <p>${product.description}</p>
            <p>rating:${product.rate}</p>
            
            <p>price :${product.price}</p>
            <button id = 'deleteBtn-${product.id}'>Delete</button>
            <button id = 'editBtn-${product.id}'>Edit</button>
            `
            container.appendChild(item);
        let deleteBtn = document.getElementById(`deleteBtn-${product.id}`);
        let editBtn=document.getElementById(`editBtn-${product.id}`)
   

        deleteBtn.onclick = () => {
            deleteData(product.id);
            // console.log(product.id)
        }
       editBtn.onclick=()=>{
    //    console.log(product.id)
         editData(product.id)
       }
      // Hide loading screen after data is fetched and displayed
      document.getElementById('loading-screen').style.display = 'none';

    })
 fetchData()
 
    
};
async function deleteData(productId) {
console.log(productId)
    let response=await fetch(`https://brick-tourmaline-case.glitch.me/products/${productId}`,{"method":"DELETE"})
    try{
        if(!response.ok){
            alert("deleteData function")
            throw new Error("delete function " ,response.statusText)
        }

        alert("deleteData successfully")

   
      fetchData()
      clearForm()
        }catch(error){
        alert("deletedata is failed")
        console.error(error)
   

    }
}


  

//after update data clear that form
function clearForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("image").value = "";
    document.getElementById("des").value = "";
    document.getElementById("rate").value = "";
    document.getElementById("price").value = "";

   
}


async function editData(id){  //editdata  using id 
//    console.log(id)
    let pId=document.getElementById("id")
    let name=document.getElementById("name")
    let image=document.getElementById("image")
    let des=document.getElementById("des")
    ;let rate=document.getElementById("rate")
    let price=document.getElementById("price")

 

    let response=await fetch(`https://brick-tourmaline-case.glitch.me/products/${id}`)
    try{
        if(!response.ok){
            throw new Error(response.statusText)
   

        }
        let product=await response.json()
        console.log(product)
        pId.value=product.id
        name.value=product.productName
        image.value=product.image
        des.value=product.description
        rate.value=product.rate
        price.value=product.price
    }catch(error){
        alert("editData data error")
        console.log(error)
 
}

}
    async function saveData() {
       
        if(!valid()){
            alert("data is not valid")
            return;
        }else{
            
 let productId=document.getElementById("id").value
 let productName=document.getElementById("name").value
 let image=document.getElementById("image").value
 let des=document.getElementById("des").value
 let rate=document.getElementById("rate").value
 let price=document.getElementById("price").value

 let obj={
     "productName":productName,
     "image":image,
     "description":des,
     "rate":rate,
     "price":price
 }
 let  method=productId?"PUT":"POST"
 let URL=productId?`https://brick-tourmaline-case.glitch.me/products/${productId}`:`https://brick-tourmaline-case.glitch.me/products`;
 let res=await fetch(URL,{
     method,
     "headers":{
         "content-type":"application/json"
        
     },
     "body":JSON.stringify(obj)
 })
 try{
     if(!res.ok){
         throw new Error(res.statusText)
     }
     alert("data updated successfully")
     fetchData()
     clearForm()
 }catch(error){
     console.error(error)
 }

        }

}












// Function to create and display a product card
// function createProductCard(product) {
//     const container = document.getElementById("container");
//     const item = document.createElement("div");
//     item.innerHTML = `
//         <p>ID: ${product.id}</p>
//         <p>Name: ${product.productName}</p>
//         <img src="${product.image}" alt="${product.productName}" style="width:100%; border-radius:8px;">
//         <p>Description: ${product.description}</p>
//         <p>Rating: ${product.rate}</p>
//         <p>Price: ${product.price}</p>
//         <button id="deleteBtn-${product.id}">Delete</button>
//         <button id="editBtn-${product.id}">Edit</button>
//     `;
//     container.appendChild(item);
//     const deleteBtn = document.getElementById(`deleteBtn-${product.id}`);
//     const editBtn = document.getElementById(`editBtn-${product.id}`);
//     deleteBtn.onclick = () => {
//         deleteData(product.id);
//     };
//     editBtn.onclick = () => {
//         editData(product.id);
//     };
// }
// }