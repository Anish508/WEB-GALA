let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index < 0) {
        slideIndex = slides.length - 1;
    } else if (index >= slides.length) {
        slideIndex = 0;
    } else {
        slideIndex = index;
    }

    slides.forEach(slide => {
        slide.style.transform = `translateX(-${slideIndex * 100}%)`;
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    dots[slideIndex].classList.add('active');
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

setInterval(nextSlide, 2000); // Change slide every 5 seconds


let bagItems ;

onLoad();


function onLoad(){
    let bagItemstr = localStorage.getItem('bagItem');
    bagItems = bagItemstr ? JSON.parse(bagItemstr):[];
    displayItemsOnHomePages();
    DisplayBagIcon();

}

function addToBag(itemId){
bagItems.push(itemId);
localStorage.setItem('bagItem' , JSON.stringify(bagItems))
DisplayBagIcon();
}

function DisplayBagIcon(){
    let bagItemCountElem = document.querySelector('.bag-item-count');
    if(bagItems.length>0){
        bagItemCountElem.style.visibility = 'visble';
        bagItemCountElem.innerText = bagItems.length;
    }
    else{
        bagItemCountElem.style.visibility = 'hidden';

    }
}

function inputMsg(){
    alert(" This movie Added successfully in movie cart ! please check it in movie cart ")
}



//items

function displayItemsOnHomePages(){
let itemsContainerElements = document.querySelector('.items-container');
 if(!itemsContainerElements){
    return;
} 
innerHTML= '';
items.forEach(item => {

    innerHTML+= ` 
    <div class="item-container">
        <img src="${item.image}" alt="Error" class="item-img">
        <span class="rating">
           ${item.rating.stars} ⭐ | ${item.rating.count}
        </span>
            <div class="company-name">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount">${item.discount_percentage}% OFF</span>
            </div>
            <button class="btn-add-bag" onclick = "addToBag(${item.id})" >Buy Now</button>
            <button class="btn-add-cart" onclick = "inputMsg()" >Add to Bag</button>
    </div>`

});
itemsContainerElements.innerHTML = innerHTML;
}


