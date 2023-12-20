const SCREEN = {
    DASHBOARD: 'DASHBOARD',
    ORDER_MENU: 'ORDER_MENU',
    CART: 'CART',
};

class CartSystem {

    constructor(root) {
        this.root = root;
        this.cart = [];
        this.navStack = [];
        this.navigate(SCREEN.DASHBOARD);
    }

    getCartItems = () => {
        return this.cart;
    }

    createOrderMenuItems = (clasName, imgSrc, title, onclick) => {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('menu-items', clasName);

        itemContainer.addEventListener('click', (e) => {
            onclick();
        });

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-box');

        const img = document.createElement('img');
        img.src = imgSrc;

        imageContainer.appendChild(img);

        const h3 = document.createElement('h3');
        h3.innerText = title;

        itemContainer.append(imageContainer,h3);

        return itemContainer;
    }

    navigate = (screen, payload={}) => {
        this.navStack.push({
            name: screen,
            payload: payload
        });
        this.root.innerHTML = "";
        this.root.appendChild(this.render());
    }

    popBackStack = () => {
        this.navStack.pop();
        this.root.innerHTML = "";
        this.root.appendChild(this.render());
    }

    /**
     * DashboardScreen start
     */
    dashBoardScreenView = (
        onCheesePizzaClick,
        onVegetablePizzaClick,
        onFriesClick
    ) => {
        const dashBoard = document.createElement('div');
        dashBoard.classList.add('dashboard-screen');


        /**
         *  TopArea Start
         */
        const topArea = document.createElement('div');
        topArea.classList.add('top-area');

        /**
         *  TopArea End
         */


        /**
         *  MiddleArea Start
         */
        const h1 = document.createElement('h1');
        h1.innerText = 'Select Your Order';

        topArea.appendChild(h1);

        const middleArea = document.createElement('div');
        middleArea.classList.add('middle-area');

        middleArea.append(
            this.createOrderMenuItems(
                'cheese-pizza-item',
                'assets/images/cheese-pizza.jpg',
                'Cheese Pizza',
                onCheesePizzaClick
            ),
            this.createOrderMenuItems(
                'vegetable-pizza-item',
                'assets/images/vegetable-pizza.jpg',
                'Vegetable Pizza',
                onVegetablePizzaClick
            ),
            this.createOrderMenuItems(
                'fries-item',
                'assets/images/fries.jpg',
                'Fries',
                onFriesClick
            )
        );


        /**
         *  MiddleArea End
         */

        const bottomArea = document.createElement('div');
        bottomArea.classList.add('bottom-area');

        dashBoard.append(topArea, middleArea, bottomArea);

        return dashBoard;
    }

    orderScreenView = (
        elementType,
        onBackPressed
    ) => {
        const orderScreenView = document.createElement('div');
        orderScreenView.classList.add('order-screen-view');

        const topArea = document.createElement('div');
        topArea.classList.add('top-area');

        const h1 = document.createElement('h1');
        h1.innerText = 'Make Order';

        topArea.appendChild(h1);

        const bottomArea = document.createElement('div');
        bottomArea.classList.add('bottom-area');

        const leftArea = document.createElement('div');
        leftArea.classList.add('left-area');

        leftArea.append((() => {
            if (elementType === 'cheese-pizza') {
                return this.createOrderMenuItems(
                    'cheese-pizza-item',
                    'assets/images/cheese-pizza.jpg',
                    'Cheese Pizza'
                )
            } else if (elementType === 'vegetable-pizza') {
                return this.createOrderMenuItems(
                    'vegetable-pizza-item',
                    'assets/images/vegetable-pizza.jpg',
                    'Vegetable Pizza'
                )
            } else if (elementType === 'fries') {
                return this.createOrderMenuItems(
                    'fries-item',
                    'assets/images/fries.jpg',
                    'Fries'
                )
            }
        })());

        const rightArea = document.createElement('div');
        rightArea.classList.add('right-area');

        const buttonArea = document.createElement('div');
        buttonArea.classList.add('radio-button-area');

        const priceArea = document.createElement('h3');
        priceArea.innerText = 'Price';

        const initialPrice = elementType === 'cheese-pizza' ? 5 : elementType === 'vegetable-pizza' ? 6 : 10;

        const createRadioChip = ({label, checked, name='radio-group', onClick}) => {
            const formGroup = document.createElement('div');
            formGroup.classList.add('radio-chip');

            const labelView = document.createElement("label");
            labelView.innerText = label;

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = name;

            if (checked) {
                radio.checked = true;
            }

            if (onClick) {
                radio.addEventListener('click', e => {
                    onClick();
                });
            }

            formGroup.append(radio, labelView);

            return formGroup;
        }

        if (elementType !== 'fries') {
            buttonArea.append(
                createRadioChip({
                    label: 'Small',
                    checked: true,
                    onClick: () => {
                        priceArea.innerText = `Price: ${initialPrice}`;
                    }
                }),
                createRadioChip({
                    label: 'Medium',
                    onClick: () => {
                        priceArea.innerText = `Price: ${initialPrice * 2}`;
                    }
                }),
                createRadioChip({
                    label: 'Large',
                    onClick: () => {
                        priceArea.innerText = `Price: ${initialPrice * 3}`;
                    }
                }),
            )
        }

        priceArea.innerText = `Price: ${initialPrice}`;

        const addToCart =document.createElement('div');
        addToCart.classList.add('add-to-cart');

        const button = document.createElement('button');
        button.innerText = 'Add to Cart';

        const button1 = document.createElement('button');
        button1.innerText = 'Back';

        button1.addEventListener('click', e => {
            onBackPressed();
        })

        addToCart.append(button,button1);

        button.addEventListener('click', e => {
            const cartItem = {
                elementType,
                size: (() => {
                    let size = '';

                    buttonArea.querySelectorAll('.radio-chip').forEach(inputTag => {
                        if (inputTag.querySelector('input').checked) {
                            size = inputTag.querySelector('label').innerText;
                        }
                    });

                    return size;
                })(),
                price: parseInt(priceArea.innerText.split(' ')[1].replace('$', ''))
            };

            this.cart.push(cartItem);
            console.log(cartItem);
        })

        rightArea.append(buttonArea, priceArea, addToCart);

        bottomArea.append(leftArea, rightArea);

        orderScreenView.append(topArea, bottomArea);

        return orderScreenView;
    }


    render = () => {
        const lastScreen = this.navStack.pop();
        this.navStack.push(lastScreen);

        if (lastScreen.name === SCREEN.DASHBOARD) {
            return this.dashBoardScreenView(
                () => {
                    this.navigate(SCREEN.ORDER_MENU, {
                        item_type: 'cheese-pizza'
                    });
                },
                () => {
                    this.navigate(SCREEN.ORDER_MENU, {
                        item_type: 'vegetable-pizza'
                    });
                },
                () => {
                    this.navigate(SCREEN.ORDER_MENU, {
                        item_type: 'fries'
                    });
                }
            )
        } else if (lastScreen.name === SCREEN.ORDER_MENU) {
            return this.orderScreenView(lastScreen.payload.item_type, () => {
                this.popBackStack();
            });
        } else if (lastScreen.name === SCREEN.CART) {

        }
    }

}

const cartItems = new CartSystem(document.querySelector('.root'));

console.log(cartItems.getCartItems());




