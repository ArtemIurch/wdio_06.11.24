const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class Checkaut extends BaseSwagLabPage {
  
    get first_name(){
        return $('#first-name')}
    get last_name(){
        return $('#last-name')}
    get postal_code(){
        return $('#postal-code')}
    get continue(){
        return $('#continue')}
     get cart_item_label(){
        return $$('.cart_item_label')}
     get summary_total_label(){
         return $('.summary_total_label')}
        
        
 
    async add_value_name(value){
        await this.first_name.setValue(value)}

    async add_value_last_name(value){
        await this.last_name.setValue(value)}

    async add_value_postal_code(value){
        await this.postal_code.setValue(value)}

    async click_continue(){
        await this.continue.click()}




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

module.exports = { Checkaut };
