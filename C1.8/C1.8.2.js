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