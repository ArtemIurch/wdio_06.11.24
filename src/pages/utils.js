const { app } = require('../pages/Application');

function getRandomNumber(a) {
    return Math.floor(Math.random() * (a-1)) + 1;
  }

  function rundom(getRun){
    let a = [];
    for (let b = 0; b <= 2; b++) {
        let randomNumber = getRun(6); // Сохраняем случайное число в переменную
        
        if (!a.includes(randomNumber)) {
          a.push(randomNumber); // Используем сохраненное число для добавления
        }
      }
      return a;
  }

  async function add_tovar (funk_rob){
    let actual_list_array = [];
    for(let items of funk_rob){    
        await app.inventory.button(items).click()// добавляю рандомные товары в корзину
        actual_list_array.push(await app.inventory.get_all_information_by_item(items))// добавляем товары в массив 
    }
    return  actual_list_array 

}

module.exports = {getRandomNumber, rundom, add_tovar};