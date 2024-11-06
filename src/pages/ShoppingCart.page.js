const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class ShoppingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    get cart_item() {
        return $$('.cart_item');
    }

    get headerTitle() {
        return $('.title');
    }
    get checkout() {
        return $('#checkout');
    }

    get cartItems() {
        return $$(this.cartItemSelector);
    }

    // async below added to show the function returns a promise
    async getCartItemByName(name) {
        return $(`${this.cartItemSelector}=${name}`);
    }

    async getCartItemById(id) {
        await this.cartItems[id];
    }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.$(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems[id].$(this.removeItemSelector).click();
    }

/////////////////////////////////
    inventory_item_name (index) {return $(`(//div[@class='inventory_item_name'])[${index}]`);}
    inventory_item_desk (index) {return $(`(//div[@class='inventory_item_desc'])[${index}]`);}
    inventory_item_price (index) {return $(`(//div[@class='inventory_item_price'])[${index}]`);}

      async get_all_information_by_item(index){
        let name = await this.inventory_item_name(index).getText()
        let desk = await this.inventory_item_desk(index).getText()
        let price = await this.inventory_item_price(index).getText()

        return {name, desk, price}
    }
}

module.exports = { ShoppingCartPage };
