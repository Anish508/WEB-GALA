const CONVENIENCE_FEES = 99;
let bagItemObjects;
onLoad();

function onLoad(){
    displayBagItemsObjects();
    displayBagItems();
    displayBagSummery();
}

function displayBagSummery(){
    let bagSummaryElement = document.querySelector('.bag-summary');
    let totalItem = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;
    //  let finalPayment = 0;
 
    bagItemObjects.forEach(bagItem=>{
        totalMRP+= bagItem.original_price;
        totalDiscount+=bagItem.original_price-bagItem.current_price;
    })
    let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;


    bagSummaryElement.innerHTML =`<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem} ITEMS)</div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">Rs${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount"
        >-Rs${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-bag">Convenience Fee</span>
      <span class="price-item-value">Rs 99</span>
    </div>
    <hr />
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">Rs ${finalPayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>`
}

function displayBagItemsObjects(){
    console.log(bagItems);
    bagItemObjects = bagItems.map(itemId=>{
        for(let i=0 ; i< items.length ; i++){
            if(itemId == items[i].id){
                return items[i];
            }
        }
    });
    console.log(bagItemObjects);
}

function displayBagItems(){
    console.log(bagItems)
    let containerElement = document.querySelector('.bag-items-container');
    let innerHTML = '';
    bagItemObjects.forEach(bagItem => {
        innerHTML+=generateHtml(bagItem)
        
    });
containerElement.innerHTML = innerHTML;
}
 function removeFromBag(itemId){
bagItems = bagItems.filter(bagItemId =>bagItemId !=itemId );
localStorage.setItem('bagItem' , JSON.stringify(bagItems));
DisplayBagIcon();
displayBagItemsObjects();
displayBagItems();
displayBagSummery();

 }

function generateHtml(item){
return ` <div class="bag-item-container">
<div class="item-left-part">
    <img src="${item.image}" alt="Error">
</div>
<div class="item-right-part">
    <div class="company">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price-container">
        <span class="current-price">${item.current_price}</span>
        <span class="original-price">${item.original_price}</span>
        <span class="discount-percentage">${item.discount_percentage}%Off</span>
    </div>
    <div class="return-period">
    Movie license is cancelled After 
        <span class="return-period-days">${item.return_period} Days</span>
    </div>
    <div class="delivery-details">
        Released on
        <span class="delivery-details-days">${item.delivery_date}</span>
    </div>
</div>
<div class="remove-from-cart" onclick = "removeFromBag(${item.id})">X</div>
</div>`
}