const { BasePage } = require('./Base.page');

class BaseSwagLabPage extends BasePage {
    // header
    get mainMenuButton() {
        return $('TBD');
    }

    get shoppingCart() {
        return $('.shopping_cart_link');
    }

    get shoppingCartBadge() {
        return $('.shopping_cart_badge');
    }

    async getNumberOfItemsInCart() {
        return this.shoppingCartBadge.getText();
    }
}

module.exports = { BaseSwagLabPage };
