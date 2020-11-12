//Создадим небольшой аналог библиотеки jQuery - smallQuery
//Создадим собственные методы
//Самый простой метод - возвращающий нам элемент DOM
 function smallQuery (element) {
     return document.querySelector(element);
 };

 //Напишем метод, возвращающий коллекцию элементов
 smallQuery.prototype.all = function (elements) {
     return document.querySelectorAll(elements);
 };

 //Напищем фукнцию-обертку, которая будет вызывать функцию-конструктор
 const Q = elem => new smallQuery(elem);