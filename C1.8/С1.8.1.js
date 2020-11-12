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