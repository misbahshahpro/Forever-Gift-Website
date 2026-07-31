// =================================
// FOREVER WEBSITE JAVASCRIPT
// FINAL VERSION PART 1
// =================================



// ================================
// UPDATE CART COUNT
// ================================


function updateCartCount(){


    let cartCount = document.getElementById("cart-count");


    let products = JSON.parse(localStorage.getItem("products")) || [];



    if(cartCount){

        cartCount.innerHTML = products.length;

    }


}


updateCartCount();







// ================================
// ADD TO CART
// ================================


document.addEventListener("click",function(e){



    if(
        e.target.classList.contains("cart-btn")
        &&
        !e.target.classList.contains("popup-cart-btn")
    ){


        let card = e.target.closest(".shop-card, .card");



        if(card){



            let product = {


                name: card.getAttribute("data-name"),


                price: Number(card.getAttribute("data-price")),


                category: card.getAttribute("data-category"),


                image: card.querySelector("img")?.src || "",


                quantity:1



            };




            let products = JSON.parse(localStorage.getItem("products")) || [];



            products.push(product);



            localStorage.setItem(

                "products",

                JSON.stringify(products)

            );




            updateCartCount();



            alert("❤️ Product Added To Cart");



        }


    }


});










// ================================
// ORDER NOW
// ================================


document.addEventListener("click",function(e){



    if(
        e.target.classList.contains("order-btn")
        &&
        !e.target.classList.contains("popup-order-btn")
    ){



        let card = e.target.closest(".shop-card, .card");



        if(card){



            let product = {



                name: card.getAttribute("data-name"),



                price:Number(card.getAttribute("data-price")),



                category:card.getAttribute("data-category"),



                image:card.querySelector("img")?.src || "",



                quantity:1



            };




            let products = JSON.parse(localStorage.getItem("products")) || [];




            products.push(product);



            localStorage.setItem(

                "products",

                JSON.stringify(products)

            );




            window.location.href="checkout.html";



        }


    }


});











// ================================
// WHATSAPP ORDER
// ================================


document.addEventListener("click",function(e){



    if(
        e.target.classList.contains("whatsapp-btn")
        &&
        !e.target.classList.contains("popup-whatsapp-btn")
    ){



        let card=e.target.closest(".shop-card, .card");



        if(card){



            let name = card.getAttribute("data-name");


            let price = card.getAttribute("data-price");



            let number="918421213591";




            let message =

            "Hello Forever 🎁\n\n"+

            "I want to order:\n\n"+

            "Product: "+name+

            "\nPrice: ₹"+price;





            let url =

            "https://wa.me/"+number+

            "?text="+encodeURIComponent(message);




            window.open(url,"_blank");



        }


    }


});










// ================================
// SHOW CART
// ================================


function showCart(){



    let container=document.getElementById("cart-container");


    let totalBox=document.getElementById("cart-total");


    let deliveryBox=document.getElementById("delivery-charge");


    let discountBox=document.getElementById("discount-amount");


    let finalBox=document.getElementById("final-total");



    if(!container){

        return;

    }





    let products = JSON.parse(localStorage.getItem("products")) || [];



    container.innerHTML="";



    let total=0;




    if(products.length===0){



        container.innerHTML=

        "<h2>Your Cart Is Empty 🛒</h2>";



        if(totalBox){

            totalBox.innerHTML="0";

        }



        if(finalBox){

            finalBox.innerHTML="0";

        }



        return;


    }







    products.forEach(function(product,index){



        total += Number(product.price) * product.quantity;




        container.innerHTML +=`


        <div class="cart-item">


        <img src="${product.image}" width="80">



        <h3>

        ${product.name}

        </h3>



        <p>

        Price : ₹${product.price}

        </p>



        <p>

        Quantity : ${product.quantity}

        </p>



        <button onclick="removeProduct(${index})">

        Remove

        </button>



        </div>


        `;



    });






    let delivery=50;


    let discount=0;



    let coupon=localStorage.getItem("coupon");




    if(coupon==="FREEDELIVERY"){


        delivery=0;


    }





    if(coupon==="SAVE30"){


        discount=total*30/100;


    }






    let finalTotal=

    total + delivery - discount;






    if(totalBox){

        totalBox.innerHTML=total.toFixed(0);

    }





    if(deliveryBox){

        deliveryBox.innerHTML=delivery.toFixed(0);

    }





    if(discountBox){

        discountBox.innerHTML=discount.toFixed(0);

    }





    if(finalBox){

        finalBox.innerHTML=finalTotal.toFixed(0);

    }





}





showCart();





// ================================
// REMOVE PRODUCT
// ================================


function removeProduct(index){



    let products = JSON.parse(localStorage.getItem("products")) || [];



    products.splice(index,1);



    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );



    updateCartCount();


    showCart();



}

// =================================
// FOREVER WEBSITE JAVASCRIPT
// FINAL VERSION PART 2
// =================================





// ================================
// WISHLIST SYSTEM
// ================================


document.addEventListener("click",function(e){



    if(e.target.classList.contains("wishlist-btn")){


        let card=e.target.closest(".shop-card, .card");



        if(card){



            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];




            let product = {



                name:card.getAttribute("data-name"),



                price:Number(card.getAttribute("data-price")),



                image:card.querySelector("img")?.src || "",



                category:card.getAttribute("data-category")



            };





            wishlist.push(product);





            localStorage.setItem(

                "wishlist",

                JSON.stringify(wishlist)

            );




            alert("❤️ Added To Wishlist");



        }



    }



});












// ================================
// MOBILE MENU
// ================================



let menuToggle=document.querySelector(".menu-toggle");


let navLinks=document.querySelector(".nav-links");




if(menuToggle && navLinks){



    menuToggle.addEventListener("click",function(){



        navLinks.classList.toggle("active");



    });



}












// ================================
// SEARCH SYSTEM
// ================================


const searchBox=document.getElementById("search-box");


const searchBtn=document.getElementById("search-btn");






function searchProduct(){



    if(!searchBox){

        return;

    }




    let value=searchBox.value.trim();



    if(value===""){


        alert("Please enter gift name");


        return;


    }





    localStorage.setItem(

        "searchProduct",

        value

    );




    window.location.href="shop.html";



}








if(searchBtn){



    searchBtn.addEventListener(

        "click",

        searchProduct

    );



}







if(searchBox){



    searchBox.addEventListener(

        "keypress",

        function(e){



            if(e.key==="Enter"){



                searchProduct();



            }



        }



    );



}












// ================================
// SEARCH FILTER IN SHOP PAGE
// ================================



let savedSearch = localStorage.getItem("searchProduct");





if(savedSearch && document.querySelector(".shop-container")){



    let cards=document.querySelectorAll(".shop-card");



    let found=false;





    cards.forEach(function(card){



        let name = card

        .getAttribute("data-name")

        .toLowerCase();





        if(

            name.includes(

                savedSearch.toLowerCase()

            )

        ){



            card.style.display="block";


            found=true;



        }

        else{



            card.style.display="none";



        }





    });







    if(!found){



        document.querySelector(".shop-container").innerHTML=


        `

        <h2 style="width:100%;text-align:center;padding:40px">

        😔 No Product Found

        </h2>

        `;



    }






    localStorage.removeItem("searchProduct");



}











// ================================
// CATEGORY FILTER
// ================================



document.querySelectorAll(".category-card")

.forEach(function(category){



    category.addEventListener("click",function(){





        let selectedCategory =

        this.getAttribute("data-category");





        localStorage.setItem(

            "category",

            selectedCategory

        );





        window.location.href="shop.html";





    });




});











// ================================
// CATEGORY FILTER ON SHOP PAGE
// ================================



let selectedCategory = localStorage.getItem("category");





if(

selectedCategory &&

document.querySelector(".shop-container")

){



    let cards=document.querySelectorAll(".shop-card");



    let found=false;





    cards.forEach(function(card){



        let category =

        card.getAttribute("data-category");







        if(category===selectedCategory){



            card.style.display="block";


            found=true;



        }

        else{



            card.style.display="none";



        }



    });







    if(!found){



        document.querySelector(".shop-container").innerHTML=



        `

        <h2 style="width:100%;text-align:center;padding:40px">

        😔 No Category Product Found

        </h2>

        `;



    }





    localStorage.removeItem("category");



}

// =================================
// FOREVER WEBSITE JAVASCRIPT
// FINAL VERSION PART 3
// =================================





// ================================
// PRODUCT POPUP
// ================================



let popup = document.getElementById("product-popup");


let popupClose = document.getElementById("popup-close");


let popupMainImage = document.getElementById("popup-main-image");


let popupTitle = document.getElementById("popup-title");


let popupPrice = document.getElementById("popup-price");



let popupProduct = {};








document.addEventListener("click",function(e){



    let card=e.target.closest(".shop-card");



    if(card &&

    !e.target.classList.contains("cart-btn") &&

    !e.target.classList.contains("order-btn") &&

    !e.target.classList.contains("wishlist-btn") &&

    !e.target.classList.contains("whatsapp-btn")

    ){



        popupProduct={



            name:card.getAttribute("data-name"),



            price:Number(card.getAttribute("data-price")),



            category:card.getAttribute("data-category"),



            image:card.querySelector("img")?.src || ""



        };







        if(popupMainImage){


            popupMainImage.src = popupProduct.image;


        }






        if(popupTitle){


            popupTitle.innerHTML = popupProduct.name;


        }






        if(popupPrice){


            popupPrice.innerHTML =

            "₹"+popupProduct.price;


        }






        if(popup){


            popup.style.display="block";


            document.body.classList.add("popup-open");


        }




    }



});











// ================================
// CLOSE POPUP
// ================================



if(popupClose){



    popupClose.addEventListener("click",function(){



        popup.style.display="none";



        document.body.classList.remove("popup-open");



    });



}







window.addEventListener("click",function(e){



    if(e.target===popup){



        popup.style.display="none";


        document.body.classList.remove("popup-open");


    }



});












// ================================
// POPUP IMAGE CHANGE
// ================================



let thumbnails=document.querySelectorAll(".small-images img");





thumbnails.forEach(function(img){



    img.addEventListener("click",function(){



        if(popupMainImage){


            popupMainImage.src=this.src;


        }



    });



});












// ================================
// POPUP ADD TO CART
// ================================



document.addEventListener("click",function(e){



    if(e.target.classList.contains("popup-cart-btn")){



        let products =

        JSON.parse(localStorage.getItem("products")) || [];





        products.push({



            name:popupProduct.name,



            price:popupProduct.price,



            category:popupProduct.category,



            image:popupProduct.image,



            quantity:1



        });







        localStorage.setItem(

            "products",

            JSON.stringify(products)

        );







        updateCartCount();






        alert("❤️ Product Added To Cart");



    }



});












// ================================
// POPUP ORDER NOW
// ================================



document.addEventListener("click",function(e){



    if(e.target.classList.contains("popup-order-btn")){



        let products =

        JSON.parse(localStorage.getItem("products")) || [];





        products.push({



            name:popupProduct.name,



            price:popupProduct.price,



            category:popupProduct.category,



            image:popupProduct.image,



            quantity:1



        });







        localStorage.setItem(

            "products",

            JSON.stringify(products)

        );







        window.location.href="checkout.html";



    }



});












// ================================
// POPUP WHATSAPP ORDER
// ================================



document.addEventListener("click",function(e){



    if(e.target.classList.contains("popup-whatsapp-btn")){





        let number="918421213591";





        let message =



        "Hello Forever 🎁\n\n"+

        "I want to order:\n\n"+

        "Product: "+popupProduct.name+

        "\nPrice: ₹"+popupProduct.price;







        window.open(



            "https://wa.me/"+number+

            "?text="+encodeURIComponent(message),



            "_blank"



        );



    }



});












// ================================
// COUPON SYSTEM
// ================================



document.addEventListener("click",function(e){



    if(e.target.id==="apply-coupon"){





        let input=document.getElementById("coupon-code");


        let message=document.getElementById("coupon-message");






        if(!input || !message){


            return;


        }







        let code=input.value.toUpperCase();









        if(code==="FREEDELIVERY"){



            localStorage.setItem(

                "coupon",

                "FREEDELIVERY"

            );





            message.innerHTML=

            "🎉 Free Delivery Applied";



            message.style.color="green";



        }







        else if(code==="SAVE30"){



            localStorage.setItem(

                "coupon",

                "SAVE30"

            );





            message.innerHTML=

            "🎉 30% Discount Applied";



            message.style.color="green";



        }







        else{



            message.innerHTML=

            "❌ Invalid Coupon Code";



            message.style.color="red";



        }







        showCart();



    }



});


// =================================
// FOREVER WEBSITE JAVASCRIPT
// FINAL VERSION PART 4
// =================================





// ================================
// CHECKOUT PRODUCTS SHOW
// ================================



let checkoutProducts = document.getElementById("checkout-products");


let checkoutTotal = document.getElementById("checkout-total");



let cartProducts = JSON.parse(localStorage.getItem("products")) || [];



let checkoutAmount = 0;






if(checkoutProducts){



    checkoutProducts.innerHTML="";





    cartProducts.forEach(function(product){



        let price = Number(product.price);



        checkoutAmount += price * product.quantity;







        checkoutProducts.innerHTML +=



        `

        <div class="product-item">


        <img src="${product.image || ''}" width="80">


        <div>


        <h3>

        ${product.name}

        </h3>


        <p>

        ₹${price}

        </p>


        </div>


        </div>


        `;



    });







}






if(checkoutTotal){



    checkoutTotal.innerHTML =

    checkoutAmount;



}












// ================================
// WHATSAPP CHECKOUT ORDER
// ================================



function placeOrder(){





let name=document.getElementById("name")?.value;


let phone=document.getElementById("phone")?.value;


let email=document.getElementById("email")?.value;


let address=document.getElementById("address")?.value;


let city=document.getElementById("city")?.value;


let state=document.getElementById("state")?.value;


let pincode=document.getElementById("pincode")?.value;








if(name==="" || phone==="" || address===""){



    alert("Please fill required details");


    return;



}







let orderMessage =



`

*New Order - Forever Gift Store 🎁*



Name: ${name}


Mobile: ${phone}


Email: ${email}



Address:

${address}



City:

${city}



State:

${state}



Pincode:

${pincode}





Order Details:

`;








cartProducts.forEach(function(product){





orderMessage +=



`

${product.name}

₹${product.price}

`;





});








orderMessage +=



`

Total Amount:

₹${checkoutAmount}

`;







let whatsappNumber="918421213591";







let whatsappURL =



"https://wa.me/"+whatsappNumber+

"?text="+encodeURIComponent(orderMessage);







window.open(

whatsappURL,

"_blank"

);




}












// ================================
// EMAILJS CHECKOUT ORDER
// ================================



const checkoutForm = document.getElementById("checkout-form");






if(checkoutForm){



checkoutForm.addEventListener("submit",function(e){



e.preventDefault();






let products = JSON.parse(localStorage.getItem("products")) || [];






let orderDetails="";



let total=0;






products.forEach(function(product){



orderDetails +=



product.name+

" - ₹"+

product.price+

"\n";





total += Number(product.price);



});









emailjs.send(



"service_h1hbx63",



"template_3p8522u",



{



customer_name:

document.getElementById("name").value,



customer_email:

document.getElementById("email").value,



customer_phone:

document.getElementById("phone").value,



customer_address:

document.getElementById("address").value,



order_details:

orderDetails,



total_amount:

"₹"+total



}



)





.then(function(){





alert("✅ Order Placed Successfully ❤️");






localStorage.removeItem("products");



localStorage.removeItem("coupon");






updateCartCount();






window.location.href="index.html";






})







.catch(function(error){



console.log(error);



alert("❌ Email Send Failed");



});





});



}


// ================================
// CART TO CHECKOUT BUTTON
// ================================

document.addEventListener("click",function(e){

    if(e.target.classList.contains("checkout-btn")){

        let products = JSON.parse(localStorage.getItem("products")) || [];


        if(products.length===0){

            alert("🛒 Your Cart Is Empty");

            return;

        }


        window.location.href="checkout.html";

    }

});


// =================================
// FOREVER WEBSITE JAVASCRIPT
// PART 5
// CONTACT + CUSTOMIZE EMAIL SYSTEM
// =================================



// ================================
// CUSTOMIZE FORM EMAIL
// ================================


let customizeForm = document.getElementById("customize-form");


if(customizeForm){


customizeForm.addEventListener("submit",function(e){


e.preventDefault();



let formData = new FormData(customizeForm);



let category = formData.get("category");
let name = formData.get("name");
let receiver = formData.get("receiver");
let message = formData.get("message");
let color = formData.get("color");
let instructions = formData.get("instructions");





emailjs.send(

"service_h1hbx63",

"template_3p8522u",

{


customer_name:name,

gift_category:category,

receiver_name:receiver,

gift_message:message,

gift_color:color,

instructions:instructions,


}


)



.then(function(){


alert(
"🎁 Custom Order Received!\n\nThank you for choosing Forever ❤️\n\nWe will contact you soon."
);



customizeForm.reset();



})



.catch(function(error){


console.log(error);


alert(
"❌ Something went wrong"
);


});



});



}









// =================================
// CONTACT FORM EMAIL
// =================================

let contactForm = document.getElementById("contact-form");

if(contactForm){

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();


        let name = contactForm.querySelector('[name="name"]').value;
        let email = contactForm.querySelector('[name="email"]').value;
        let phone = contactForm.querySelector('[name="phone"]').value;
        let message = contactForm.querySelector('[name="message"]').value;



        emailjs.send(
            "service_h1hbx63",
            "template_3p8522u",
            {
                customer_name:name,
                customer_email:email,
                customer_phone:phone,
                message:message
            }
        )

        .then(function(){

            alert("❤️ Thank You!\n\nYour message has been sent successfully.\n\nWe will reply soon.");

            contactForm.reset();

        })

        .catch(function(error){

            console.log(error);

            alert("❌ Message Send Failed");

        });


    });

}