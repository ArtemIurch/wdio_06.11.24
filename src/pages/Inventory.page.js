const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() {
        return $('.title');
    }

    get inventoryItems() {
        return $$('.inventory_item');
    }

    get option() {
        return $$('option')
    }

    get shopping_cart_badge() {
        return $('.shopping_cart_badge').getText()
    }

     inventory_item_name (index) {
       return $(`(//div[@class='inventory_item_name '])[${index}]`);// получаем все нейминги
    }
    
     inventory_item_desk (index) {
        return $(`(//div[@class='inventory_item_desc'])[${index}]`);// получаем все описания
     }
     
      inventory_item_price (index) {
        return $(`(//div[@class='inventory_item_price'])[${index}]`);// получаем все суммы
     }
     

     filter(a){
        return $(`[value="${a}"]`);// поиск фильтра на странице
    }

    get addItemToCartButton() {
        return $$('[class^="btn"]');
    }

     button(index) {
        return $(`(//button[contains(@class, "btn_inventory")])[${index}]`);
    }

    

    async addItemToCartById(id) {
        await this.addItemToCartButton[id].click();
    }
    async clickOnFilter(a) {
        await this.filter(a).click();
    }

    get shopping_cart_link() {
        return $('.shopping_cart_link')
    }
    
    async clickOnFilter(a) {
        await this.filter(a).click();
    }

     inventory_item_price_getinventory_item_name(a, v) {
        return $$(`${a}`)[v].getText();
    }

     active_option() {
        return $('.active_option').getText()
    }

    Add_to_cart() {
        return $('//button[contains(text(), "Add to cart")]').getText()
    }

    async get_all_information_by_item(index){
        let name = await this.inventory_item_name(index).getText()
        let desk = await this.inventory_item_desk(index).getText()
        let price = await this.inventory_item_price(index).getText()

        return {name, desk, price}
    }
    
}

module.exports = { InventoryPage };
