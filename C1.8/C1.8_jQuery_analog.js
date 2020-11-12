function jQuery (selector, context = document){
	this.elements = Array.from(context.querySelectorAll(selector));
	return this
}

jQuery.prototype.each = function (fn){
	this.elements.forEach((element, index) => fn.call(element, element, index));
	return this;
}

jQuery.prototype.click = function(fn){
    this.each(element => element.addEventListener('click', fn))
	return this
}

jQuery.prototype.hide = function(){
    this.each(element => element.style.display = 'none')
  return this;
}

jQuery.prototype.show = function(){
    this.each(element => element.style.display = '');
  return this;
}

jQuery.prototype.remove = function(){
	this.each(element => element.remove())
  return this;
}

jQuery.prototype.class = function(name){
    this.each(element => element.className = name)
  return this;
}

//-------------------Методы из заданий 1 и 2 -------------------------------------------//

/* Написать метод jQuery.prototype.html(), который возвращает или изменяет html-содержимое выбранных элементов. */
jQuery.prototype.html = function(text) {
    if (!text) {
        this.each(element => element.innerHTML)
        console.log(this.elements[0])
        //return this.elements[0] //Можно ли так возвращать?        
    } else {
        this.each(element => element.innerHTML = text)
        //return this       
    }
    return this
}

/* Написать метод jQuery.prototype.text(), который возвращает или изменяет текстовое содержимое выбранных элементов. */
jQuery.prototype.text = function(text) {
    if (!text) {
        this.each(element => element.innerText)
        console.log(this.elements[0].innerText)
        //return this.elements[0].innerText //Можно ли так возвращать?
        
    } else {
        this.each(element => element.innerText = text)
        //return this
    }
    return this
}

//----------------------------------------------------------------------------------------------//

const $ = (e) => new jQuery(e);


const button_1 = $('#button-1');
const button_2 = $('#button-2');
const button_3 = $('#button-3');
const button_4 = $('#button-4');
const button_5 = $('#button-5');
const div = $('div');


button_1.click(() => { div.html('<h1>Hello, world!!!</h1>') }) //Изменяем html-содержимое 

button_2.click(() => { div.html() }); //Возвращаем html-содержимое, сделал вывод в консоль потому что непонял как вернуть, пробный вариант закоментил

button_3.click(() => { div.text('New Text') }) //Изменяем текстовое-содержимое 

button_4.click(() => { div.text() }) //Возвращаем текстовое-содержимое, сделал вывод в консоль потому что непонял как вернуть, пробный вариант закоментил