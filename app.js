var createButton = document.getElementById('createButton');
var email = document.getElementById('email');

createButton.addEventListener('click', function(ev){
  ev.preventDefault();
  fetch('/api/customers', {
    method: 'POST',
    body: JSON.stringify({ email: email.value }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then( response => {
      if(!response.ok){
        throw response.json();
      }
      return response.json();
    })
    .then( customer=> {
      email.value = '';
      addCustomerToList(customer);
      socket.send(JSON.stringify({type: 'customerCreated', customer }));
    })
    .catch((ex)=> {
      ex.then((er)=> {
        var message = document.getElementById('message');
        message.innerHTML = er.error.errors[0].message;
      });
    });
});

function addCustomerToList(customer){
  var message = document.getElementById('message');
  message.innerHTML = '';
  var ul = document.getElementById('customerList');
  var li= document.createElement('li');
  li.setAttribute('data-id', customer.id);
  li.append(customer.email);
  li.addEventListener('click', ()=> {
    fetch(`/api/customers/${customer.id}`, {
      method: 'delete'
    })
    .then(()=> {
      li.remove();
      socket.send(JSON.stringify({type: 'customerDestroyed', customer}));
    }) 
  });
  ul.append(li);
}

var socket;

function setUpSocket(){
  socket = new WebSocket(document.location.origin.replace('http', 'ws'));
  socket.addEventListener('message', function(ev){
    var message = JSON.parse(ev.data);
    console.log(message);
    switch(message.type){
      case 'customerCreated':
        addCustomerToList(message.customer);
        break;
      case 'customerDestroyed':
        const li = document.querySelector(`[data-id='${message.customer.id}']`);
        li.remove();
        break;
    }
  });

}
function init(){
  setUpSocket();
  fetch('/api/customers')
    .then( result => result.json())
    .then( customers => {
      customers.forEach( customer => {
        addCustomerToList(customer);
      });
    })
}
init();
