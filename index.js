
async function fetchData() {
    // let loader=document.createElement("div")
    let response=await fetch("https://brick-tourmaline-case.glitch.me/products")
    try{
        if(!response.ok){
            throw new Error(response.statusText)
        }
        let data=await response.json()
        // if(data.length===0){
        //     loader.innerText="DATA IS NOT AVIALABLE"
        //     document.body.appendChild(loader)

        // }else{
        // displayData(data)
        // }
        displayData(data)
    }catch(error){
        alert("data is fetch to failed")
        console.error(error)
    }
    
}
fetchData()

function displayData(products){
let container =document.getElementById("container")
container.innerHTML=""
    products.forEach((product) => {
        // console.log(product.id)
        let item = document.createElement("div");
        item.innerHTML = `
            <p>ID : ${product.id}</p>
            <p>Name : ${product.productName}</p>
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
        }
       editBtn.onclick=()=>{
        // v.stopPropagation()
         editData(product.id)
       }

    })
 
 
    
};

async function deleteData(productId) {
// console.log(productId)
    let response=await fetch(`https://brick-tourmaline-case.glitch.me/products/${productId}`,{"method":"DELETE"})
    try{
        if(!response.ok){
            alert("deleteData function")
            throw new Error("delete function " ,response.statusText)
        }
        alert("deleteData successfully")
      
    }catch(error){
        alert("deletedata is failed")
        console.error(error)
    }

    
}

async function editData(id){
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

        // console.log(student)
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

function vaildateInput(){
   
    let productName=document.getElementById("name").value
    let image=document.getElementById("image").value
    let des=document.getElementById("des").value
 
    let price=document.getElementById("price").value

    let productNameError=document.getElementById("nameError")
    productNameError=productName? "" :"Name is required";

     let imageError=document.getElementById("imageError")
    imageError=image? "":"imageis required";

     let desError=document.getElementById("discriptionError")
    desError=des?"":" description is required";

     let priceError=document.getElementById("priceError")
    priceError=price?"":"Price is required";
    
    if(!productName || !image){
        return false;

    }else if(!price || !des){
        return false ;

    }else{
        return true;
    }

}


async function saveData() {
    
           if(!vaildateInput()) return;
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
    let URL=productId?`https://brick-tourmaline-case.glitch.me/products/${productId}`:"https://brick-tourmaline-case.glitch.me/products"
    let response=await fetch(URL,{
        method,
        "headers":{
            "content-type":"application/json"
           
        },
        "body":JSON.stringify(obj)
    })
    try{
        if(!response.ok){
            throw new Error(response.statusText)
        }
        alert("data updated successfully")
     
        fetchData()

    }catch(error){
        console.error(error)
    }


}

