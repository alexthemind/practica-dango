let Engine = (() => {
    let parent;
    let items = [
        {
            image: './public/images/bottle.png',
            title: 'Tourmaline & Eucalyptus Bar Soap',
            price: 12.00,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi libero quaerat hic in asperiores, nulla sint.'
        }
    ]
    let cartItems = [];
    
    function Render(root=null) {
        if(root != null) parent = root;
        localStorage.items == undefined && addItemsToLocalStorage();
        drawEelments();
        btnAction();

        let localItems = localStorage.items != undefined ? JSON.parse(localStorage.items) : [];
        
        if(localStorage.cart != undefined)
        {
            let cartItems = JSON.parse(localStorage.cart);
            let cartCount = document.getElementById('cart-count');

            cartCount.innerHTML = cartItems.length;
        }

        let btnNew = document.getElementById('add-new-item');
            btnNew.onclick = () => {
                swal({
                    title: '¿Quieres agregar un nuevo item?',
                    text: '',
                    icon: 'info',
                    buttons: ['no','si']
                }).then(click => {
                    if(click)
                    {
                        items = localItems;
                        items.push({
                            image: './public/images/bottle.png',
                            title: 'Tourmaline ' + btoa(new Date()).substring(0,15) + ' ' + (localItems.length),
                            price: 20.54,
                            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi libero quaerat hic in asperiores, nulla sint.'
                        });

                        console.log(items);

                        addItemsToLocalStorage();

                        swal({
                            title: 'Item creado',
                            text: '',
                            icon: 'success',
                            closeOnClickOutside: false,
                            closeOnEsc: false
                        }).then(cc => {
                            if(cc)
                            {
                                window.location.reload();
                            }
                        })
                    }
                });
            }
    }

    function drawEelments() {
        let str = '';
        let localItems = JSON.parse(localStorage.items);
        localItems.map((el, index) => {
            let item = `
            <div id="card" class="p-2 mr-1 mt-1 text-center rounded bg-white border-gray-400 border-width-3 shadow" style="width: 11em;" tabindex="1">
                <div class="rounded-md of-hidden border-gray-200 w-full h-100 mb-1 mt-sm flex justify-center" tabindex="2">
                    <img class="bg-size-cover w-full" src="${el.image}" alt="" />
                </div>
                <h5 class="mb-2 text-start">${el.title}</h5>
                <div class="mb-1 text-start flex align-items-c" tabindex="4">
                    <b class="mr-1">$${parseFloat(el.price).toFixed(2)}</b> <input type="number" class="p-1 border w-18 text-center font-sm" value="1" min="1" max="100" />
                </div>
                <p class="font-sm mb-2 text-gray-300 text-start" tabindex="5">
                    ${el.description}
                </p>
                <button class="button py-1 px-2 mb-1 border-width-1 bg-blue-500 ho-bg-blue-600 text-white rounded-min" tabindex="6" data-info="${btoa(JSON.stringify(el))}">
                    Añadir paquete
                </button>
                <button class="remove mb-2" tabindex="7" data-index="${index}" data-title="${el.title}">
                    remover <i class="fa fa-remove" style="color: red;"></i>
                </button>
            </div>
            `;

            str += item;

            if((index+1) == localItems.length)
            {
                parent.innerHTML = str;
            }
        });
    }

    function btnAction() {
        let buttons = document.querySelectorAll('.button');
            buttons.forEach((btn,index) => {
                btn.onclick = () => {
                    swal({
                        title: '¿Deseas agregar a carrito?',
                        text: '',
                        icon: 'info',
                        buttons: ['no','si']
                    }).then(click => {
                        if(click)
                        {
                            let data = JSON.parse(atob(btn.dataset.info))
                            cartItems.push(data);
                            addToLocalStorage();
                        }
                    });
                }
            })

        let removes = document.querySelectorAll('.remove');
            removes.forEach((btn,index) => {
                btn.onclick = () => {
                    let localItems = JSON.parse(localStorage.items);
                    swal({
                        title: '¿Deseas eliminar este elemento?',
                        text: '',
                        icon: 'warning',
                        buttons: ['no','si']
                    }).then(click => {
                        if(click)
                        {
                            let idx = parseInt(btn.dataset.index);
                            items = localItems;
                            items.splice(idx,1);

                            addItemsToLocalStorage();
                            
                            swal({
                                title: 'Elemento eliminado',
                                text: '',
                                icon: 'success'
                            }).then(cc => {
                                if(cc)
                                {
                                    window.location.reload();
                                }
                            })
                        }
                    });
                }
            })
    }

    function addItemsToLocalStorage() {
        Object.assign(localStorage,{
            items: JSON.stringify(items)
        })
    }

    function addToLocalStorage() {
        Object.assign(localStorage,{
            cart: JSON.stringify(cartItems)
        });

        let cartCount = document.getElementById('cart-count');
            cartCount.innerHTML = cartItems.length;
    }

    return {
        Render
    }

})();

/**
 * CUANDO SE CARGA LA PANTALLA
 */
window.onload = () => {
    let root = document.getElementById('root');
    Engine.Render(root);
}

