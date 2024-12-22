document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const ordersBtn = document.getElementById('orders-btn');
  const menuSection = document.getElementById('menu-section');
  const ordersSection = document.getElementById('orders-section');
  const ordersTable = document.getElementById('orders-table');
  const servicesContainer = document.getElementById('services-container');


  let orderCount = 0;
  let orderList = [];

  // Load order list from local storage
  if (localStorage.getItem('orderList')) {
    orderList = JSON.parse(localStorage.getItem('orderList'));
    orderCount = orderList.length;
    displayOrderList();
  }



//Hide services section


// Show Menu Section
// menuBtn.addEventListener('click', () => {
//   menuSection.classList.toggle('hidden');
//   servicesContainer.classList.add('visible');
//   ordersSection.classList.add('hidden');
  
// });
let toggle=0;
menuBtn.addEventListener('click', () => {
  // Toggle the display of the two divs
toggle++;
if(toggle % 2==1){
  servicesContainer.style.display = 'block';
  menuSection.style.display='none'; 
  ordersSection.style.display='none'; 

}
else {
  servicesContainer.style.display = 'none';
  menuSection.style.display='block'; 
  ordersSection.style.display='none'; 
}
});

let toggle2=0;
ordersBtn.addEventListener('click', () => {
  // Toggle the display of the two divs
toggle2++;
if(toggle2 % 2==1){
  servicesContainer.style.display = 'block';
  menuSection.style.display='none'; 
  ordersSection.style.display='none'; 

}
else {
  servicesContainer.style.display = 'none';
  menuSection.style.display='none'; 
  ordersSection.style.display='block'; 
}
});





// Show Orders Section


  // Add Order Functionality
  document.querySelectorAll('.add-order-btn').forEach(button => {
    button.addEventListener('click', () => {
      const itemName = button.getAttribute('data-item');
      const itemPrice = parseFloat(button.getAttribute('data-price'));


      const existingOrder = orderList.find(order => order.itemName === itemName);
      if (existingOrder) {
        existingOrder.quantity++;
        existingOrder.total = (existingOrder.quantity * existingOrder.itemPrice).toFixed(2);
      }
      else {
        const quantity = 1;
        const total = (itemPrice * quantity).toFixed(2);
        orderCount++;
        orderList.push({ itemName, itemPrice, quantity, total });
      }

      localStorage.setItem('orderList', JSON.stringify(orderList));
      displayOrderList();
    });
  });



  //payment and address section

  const openModalButtons = document.querySelectorAll('[data-modal-target]')
  const closeModalButtons = document.querySelectorAll('[data-close-button]')
  const overlay = document.getElementById('overlay')

 


  // Display order list
  function displayOrderList() {

    ordersTable.innerHTML = '';
    let totalAmount = 0;
    orderList.forEach((order, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${order.itemName}</td>
        <td>Rs${order.itemPrice.toFixed(2)}</td>
        <td>${order.quantity}</td>
        <td>Rs${order.total}</td>
        <td class="order-status">Not Placed</td>
       
        <td><button class="delete-order-btn" data-index="${index}">Delete Order</button></td>
        <td><button class="increase-quantity-btn" data-index="${index}">+</button><button class="decrease-quantity-btn" data-index="${index}">-</button></td>
      `;
      ordersTable.appendChild(row);
      totalAmount+=parseFloat(order.total);

      
      

      // Add Place Order button functionality
      const placeOrderBtn = document.querySelector('.submit-btn');
      placeOrderBtn.addEventListener('click', () => {
        const statusCell = row.querySelector('.order-status');
        const now = new Date();
        const formattedDate = now.toLocaleString();
        statusCell.textContent = formattedDate;
        statusCell.classList.add('placed');   
      document.querySelector('#Total-btn').disabled=true
    });
    
    
    
    //Add Delete order butttton functionality
    const deleteOrderBtn = row.querySelector('.delete-order-btn');
    deleteOrderBtn.addEventListener('click', () => {
      const index = deleteOrderBtn.getAttribute('data-index');
      orderList.splice(index, 1);
      orderCount--;
      localStorage.setItem('orderList', JSON.stringify(orderList));
      displayOrderList();
    })
    
      //Add increase quantity in order buuton functionality
      const increaseQuantityBtn = row.querySelector('.increase-quantity-btn');
      increaseQuantityBtn.addEventListener('click', () => {
        const index = increaseQuantityBtn.getAttribute('data-index');
        orderList[index].quantity++;
        orderList[index].total = (orderList[index].quantity * orderList[index].itemPrice).toFixed(2);
        localStorage.setItem('orderList', JSON.stringify(orderList));
        displayOrderList();
      })
      
      //Add decrease quantity in order buuton functionality
      const decreaseQuantityBtn = row.querySelector('.decrease-quantity-btn');
      decreaseQuantityBtn.addEventListener('click', () => {
        const index = decreaseQuantityBtn.getAttribute('data-index');
        orderList[index].quantity--;
        orderList[index].total = (orderList[index].quantity * orderList[index].itemPrice).toFixed(2);
        localStorage.setItem('orderList', JSON.stringify(orderList));
        displayOrderList();
      })
    });

    document.getElementById('Amount').innerText=`Total Amount:  Rs ${totalAmount.toFixed(2)}`;

    
  }
  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal)
    })
  })
  
  overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
      closeModal(modal)
    })
  })
  
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal)
    })
  })
  
  function openModal(modal) {
    if (modal == null) return
    modal.classList.toggle('active')
    overlay.classList.toggle('active')
  }
  
  function closeModal(modal) {
    if (modal == null) return
    modal.classList.toggle('active')
    overlay.classList.toggle('active')
  }
  
  
  
  
  
});

