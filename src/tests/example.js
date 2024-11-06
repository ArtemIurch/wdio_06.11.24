var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));

const { app } = require('../pages/Application');
const { getRandomNumber, rundom, add_tovar } = require('../pages/utils');


describe('Saucedemo app basic tests', async() => {
    let itemNamesZA = [];
    let itemNamesAZ = [];
    let itemNamesLOHI = [];
    let itemNamesHILO = [];

    function sortlowtohigh(a){
        return a.sort((a, b) => a - b)
    }
    function sortAtoZ(a){
        return a.sort((a, b) => b - a)
    }

    beforeEach(async () => {
        //Login
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');

       
     });

    before(async () => {
        let a = ['za', 'az', 'lohi', 'hilo'];

        const amount_of_items = await app.inventory.inventoryItems.length;

        for (let i = 0; i < await app.inventory.option.length; i++) {
            await app.inventory.clickOnFilter(a[i]);

            for (let v = 0; v < amount_of_items; v++) {
                const name = await app.inventory.inventory_item_price_getinventory_item_name(".inventory_item_name", v);
                const price = await app.inventory.inventory_item_price_getinventory_item_name(".inventory_item_price", v);
                

                if (await app.inventory.active_option() === 'Name (Z to A)') {
                    itemNamesZA.push(name);
                } else if (await app.inventory.active_option() === 'Name (A to Z)') {
                    itemNamesAZ.push(name);
                } else if (await app.inventory.active_option() === 'Price (high to low)') {
                    itemNamesHILO.push(+price.split("$")[1]);
                } else if (await app.inventory.active_option() === 'Price (low to high)') {
                    itemNamesLOHI.push(+price.split("$")[1]);
                    
                }
            }
        }
    });

    

    it('should verify Price (low to high) sorting', async() => {
        expect(itemNamesLOHI).toEqual(sortlowtohigh([...itemNamesLOHI]));
    });

    it('should verify Price (high to low) sorting', async() => {
        expect(itemNamesHILO).toEqual(sortAtoZ([...itemNamesHILO]));
    });

    it('should verify Name (Z to A) sorting', async() => {
        expect(itemNamesZA).toEqual(sortAtoZ([...itemNamesZA]));
        
    });

    it('should verify Name (A to Z) sorting', async() => {
        expect(itemNamesAZ).toEqual(sortAtoZ([...itemNamesAZ]));
        
    });

    it('should add and remove product from the cart', async () => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
    
        await app.inventory.addItemToCartById(0);
        await expect(app.inventory.shoppingCartBadge).toHaveText('1');
    
        await app.inventory.shoppingCart.click();
        await expect(app.shoppingCart.cartItems).toBeElementsArrayOfSize(1);
    
        await app.shoppingCart.removeCartItemById(0);
        await expect(app.shoppingCart.cartItems).toBeElementsArrayOfSize(0);
    });

    
    it('task2', async () => {
        let lenth = await app.inventory.addItemToCartButton.length;
        let funk_rob = rundom(getRandomNumber)
        let actual_list_array = await add_tovar(funk_rob);
       
        expect(funk_rob.length).toEqual(+(await app.inventory.shopping_cart_badge))//количество добавленных товаров на иконке корзина
        await app.inventory.shopping_cart_link.click()// переходим в шопинг кард

        let length_shop_card = await app.shoppingCart.cart_item.length;// првоеряем количество товаров магазе
        let exep_array = []

        for(let i =1; i<=length_shop_card; i++){
            exep_array.push(await app.shoppingCart.get_all_information_by_item(i))
        }
        expect(actual_list_array).toEqual(exep_array);
    });

    it("Test3:", async() => {
      let lenth = await app.inventory.addItemToCartButton.length;
      let funk_rob = rundom(getRandomNumber)
      let actual_list_array = await add_tovar(funk_rob);

        await app.inventory.shopping_cart_link.click()// переходим в шопинг кард
        await app.shoppingCart.checkout.click()
        await app.checkaut.add_value_name("Artem")
        await app.checkaut.add_value_last_name("iurchenkov")
        await app.checkaut.add_value_postal_code("123")
        await app.checkaut.continue.click();


        let cart_item_labe_length = await app.checkaut.cart_item_label.length;// првоеряем количество товаров магазе
        console.log(await cart_item_labe_length);

         let exep_array = []
         let sum = 0;

        for(let i =1; i<=cart_item_labe_length; i++){
            exep_array.push(await app.checkaut.get_all_information_by_item(i))
            sum += +((await app.checkaut.get_all_information_by_item(i)).price.slice(1))
        }      
        console.log(await actual_list_array);
        console.log(await exep_array);
        expect(actual_list_array).toEqual(exep_array);// сравниваем 2 массива  Verify: products (Name, Description, and Price values)

        let total = await app.checkaut.summary_total_label.getText()     
        let tax = sum * 0.08
        let total_i_get_round = +tax.toFixed(2) + sum
        let total_i_get = tax + sum
        chai.expect(total.slice(8)).to.equal(total_i_get_round.toFixed(2));
        
    });
});





// что надо спросить у чата
// 1) кода ставить авейт
// 2) посомтреть все типы данных которых есть в пейдж обджектах
// тиа когда надо просто тсавить гед
// когда надо ставить обычный метод
// когда надо метод ретурнить и тд





