# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

<style>
  .sub {
  	background-color: #473F06;
    color: #4EF16B;
		padding: 5px;
  }

  .li {margin-bottom: 10px}
  }
</style>

При реалзиации проекта WebLaker был применён следующий паттерн проектирования MVP.
</br>

## Слой МОДЕЛЬ

### <mark class="sub">Класс Model</mark>

Базовый абстрактный класс <mark class="sub"> Model &lt;T&gt;</mark> предстовляет из себя родительский класс для всех дочерних Модель-классов. В качестве первого аргумента принимает данные дженериком <mark class="sub">data: T</mark> и вторым аргументом принимает экземлпяр класса брокера-событий.
Класс имеет один метод <mark class="sub">emitChanges</mark>, который принимает два аргумента: событие и некоторые данные. Метод иницирует вызов события.
<br></br>

### <mark class="sub">Класс ProductItem</mark>

Класс <mark class="sub">ProductItem</mark> отвечает за хранения данных о товаре.
</br>
Класс содержит следующие свойства:

<ul>
<li class="li"><mark class="sub">id</mark> - уникальный индификатор товара</li>
<li class="li"><mark class="sub">description</mark> -  описание товара</li>
<li class="li"><mark class="sub">image</mark> -  ccылка на изображение товара</li>
<li class="li"><mark class="sub">title</mark> -  название товара</li>
<li class="li"><mark class="sub">category</mark> -  категория товара</li>
<li class="li"><mark class="sub">catepricegory</mark> -  цена товара</li>
<li class="li"><mark class="sub">_selected</mark> -  содержит логическое состояние товара</li>
</ul>

Класс содержит один сеттер:

- <mark class="sub" style="">selected</mark> - изменяет логическое состояние товара

Класс содержит один геттер:

- <mark class="sub">selected</mark> - возвращает логическое состояние товара
  </br>

### <mark class="sub">Класс AppState</mark>

Класс <mark class="sub">AppState</mark> отвечает за хранение данных и за логику работы с ними.
Класс содержит следующие свойства:

<ul>
<li class="li"><mark class="sub">_catalog</mark> - представляет из себя массив объектов товара</li>
<li class="li"><mark class="sub">_basket</mark> - представляет из себя массив товаров, добавленных в корзину</li>
<li class="li"><mark class="sub">_preview</mark> - содержит индификатор выбранного товара</li>
<li class="li"><mark class="sub">_order</mark> - объект с информацией о заказе</li>
<li class="li"><mark class="sub">_formErrorsr</mark> - объект с информацией о неправильных заполненных полях форм</li> 
</ul>
Класс содержит следующие методы:
<ul>
<li class="li"><mark class="sub">setCatalog</mark> - метод заполняет свойство _catalog данными о товарах и инициирует событие "card:render" </li>
<li class="li"><mark class="sub">setBasket</mark> - метод заполняет и удаляет данные о товаре в свойстве _basket </li>
<li class="li"><mark class="sub">setPreview</mark> - метод устсанвливает значение для свойства _preview и инициирует событие "preview:render"</li>
<li class="li"><mark class="sub">setOrderField</mark> - метод заполняет одно или несколько полей для свойства _order</li>
<li class="li"><mark class="sub">setOrderItems</mark> - метод для  заполнения массва поля items свойства _order </li> 
<li class="li"><mark class="sub">isSelected</mark> - метод проверяет выбран ли товар</li> 
<li class="li"><mark class="sub">getBasketItems</mark> - метод возвращает массив объектов с товарами добавленные в корзину </li>
<li class="li"><mark class="sub">clearOrder</mark> - метод очищает данные о заказе</li>
<li class="li"><mark class="sub">validateOrder</mark> - метод проверяет валдацию формы Order и инициирует событие "orderFormErrors:change"</li>
<li class="li"><mark class="sub">validateContacts</mark> - метод проверяет валдацию формы Contacts и инициирует событие <mark style="font-size:14px; background-color: transparent;color:white ">"contactsFormErrors:change"</mark></li>
</ul>
Класс содержит два геттера:
<ul>
  <li class="li"><mark class="sub">catalog</mark>- геттер возвращает весь каталог товаров</li>
  <li class="li"><mark class="sub">order</mark>- геттер возвращает данные о заказе</li>
</ul>
</br>
## Слой ПРЕДСТАВЛЕНИЯ
### <mark class="sub">Класс Component</mark>
Базоый абстрактный класс <mark class="sub">Component&lt;T&gt;</mark> предстовляет из себя родительский класс для создания классов предназначеных для пользователького интерфейса. Конструктор класса принимает один аргумент - container, который является html-элементом и является родительским контейнером для дочерних классов.
</br>
Класс содержит следующие методы:
<ul>
  <li class="li"><mark class="sub">toggleClass</mark>- устанавливает/удаляет селектор класс у элемента</li>
  <li class="li"><mark class="sub">setText</mark>- устанавливает текст элемента</li>
  <li class="li"><mark class="sub">setDisabled</mark>- устанавливает/удаляет атрибут disabled для элемента</li>
  <li class="li"><mark class="sub">containsClass</mark>- возвращает логическое значение содержит ли элемент переданный cелектор класса</li>
  <li class="li"><mark class="sub">setHidden</mark>- устанавливает для элемента ccs-свойство display в значение "none"</li>
  <li class="li"><mark class="sub">setVisible</mark>- удаляет ccs-свойство display для элемента</li>
  <li class="li"><mark class="sub">setImage</mark>- устанавливает для элемента картинку и текст для картинки</li>
  <li class="li"><mark class="sub">render</mark>- добавляет в текущий класс данные, после возвращает родительский контейнер</li>
</ul>
## Переиспользуемые классы-интерфейса
### <mark class="sub">Класс Modal</mark>
Класс <mark class="sub">Model</mark> предназначен для отоброжения модальных окон. В конструторе принимает два аргумента: container - являющийся родительским элементом; events - экземпляр брокера-событий.

Класс содержит следующие свойства:

<ul>
<li class="li"><mark class="sub">_closeButton</mark> - кнопка для закрытия модального окна</mark></li>
<li class="li"><mark class="sub">_content</mark> - блок-контейнер, который содержит контент модального окна</li>
</ul>
Класс содержит следующие методы:
<ul>
<li class="li"><mark class="sub">open</mark> - метод добавляет селектор класса "modal__active" и инициирует событие "modal:open"</li>
<li class="li"><mark class="sub">close</mark> - метод удаляет селектор класса "modal__active" и инициирует событие "modal:close"</li>
<li class="li"><mark class="sub">render</mark> - метод предназначен для автоматического вызова сеттера свойста _conten и возвращает родительский контейрен</li>
</ul>
Класс содержит один сеттер:
<ul>
<li class="li"><mark class="sub">content</mark> - сеттер для установки html-элемена</li>
</ul>
</br>
### <mark class="sub">Класс Basket</mark>
Класс <mark class="sub">Basket</mark> предназначен для отоброжения корзины в модальном окне. В конструторе принимает два аргумента: container - являющийся родительским элементом; events - экземпляр брокера-событий.
Класс содержит следующие свойства:
<ul>
    <li class="li"><mark class="sub">_list</mark> - отображает список товаров, добавленных в корзину</li>
    <li class="li"><mark class="sub">_total</mark> - отображает цену всех выбранных товаров</li>
    <li class="li"><mark class="sub">_button</mark> - кнопка, которая инициирует событие "formContacts:open"</li>
</ul>
Класс содержит следующие сеттеры:
<ul>
    <li class="li"><mark class="sub">list</mark>- сеттер для установки  продукт-элементов</li>
    <li class="li"><mark class="sub">total</mark> - сеттер для установки текста элементу _total</li>
    <li class="li"><mark class="sub">isActive</mark> - сеттер, который отключает и включает кнопку</li>
</ul>
</br>
### <mark class="sub">Класс Form</mark>
Класс <mark class="sub">Basket</mark> предназначен для отоброжения формы в модальном окне. В конструторе принимает два аргумента: container - являющийся родительским элементом; events - экземпляр брокера-событий.
Класс содержит следующие свойства:
<ul>
    <li class="li"><mark class="sub">_submit</mark> - кнопка для отправки данных  </li>
    <li class="li"><mark class="sub">_errors</mark> - html-элемент для отображения некорректных ведённых данных </li>
</ul>
Класс содержит следующие методы:
<ul>
    <li class="li"><mark class="sub">reset</mark> - метод очищает поля форм</li>
    <li class="li"><mark class="sub">render</mark> - метод устанавливает валидацию и сообщения об ошибках ведённых данных, после чего возвращает родительский контейнер </li>
</ul>
Класс содержит следующие сетторы:
<ul>
    <li class="li"><mark class="sub">valid</mark> - устанавливает состояние для кнопки отправки формы </li>
    <li class="li"><mark class="sub">errors</mark> - заполняет элемент для отображения ошибок текстом </li>
</ul>
</br>
## Основные классы-представления
### <mark class="sub">Класс Page</mark>
Класс <mark class="sub">Page</mark> предназначен для отоброжения общего интерфейса страницы. В конструторе принимается два аргумента: container - являющийся родительским элементом; events - экземпляр брокера-событий.
Класс содержит следующие свойства:
<ul>
    <li class="li"><mark class="sub">_wrapper</mark> - элемент являющийся родительским общим классом для всех элементов</li>
    <li class="li"><mark class="sub">_basket</mark> - кнопка, предстовляющая из себя корзину и инициррует событие "basket:open" </li>
    <li class="li"><mark class="sub">_counter</mark> - элемент отображающий количество товаров в корзине </li>
    <li class="li"><mark class="sub">_gallery</mark> - элемент отображающий список карточек товара </li>
</ul>
Класс содержит следующие сеттеры:
 <ul>
    <li class="li"><mark class="sub">counter</mark> - устанавливает текст для отображения количества товаров в корзине</li>
    <li class="li"><mark class="sub">gallery</mark> - устанавливает карточки товаров для отображения </li>
    <li class="li"><mark class="sub">locked</mark> - устанавливает фиксировку страницы </li>
</ul>
</br>
### <mark class="sub">Класс CardItem</mark>
Класс <mark class="sub">CardItem</mark> предназначен для отоброжения карточки товара. В конструторе принимается три аргумента: container - являющийся родительским элементом; blockName - имя селектора класса; events - экземпляр брокера-событий.
Класс содержит следующие свойства:
<ul>
    <li class="li"><mark class="sub">_category</mark> - отображает категорию товара </li>
    <li class="li"><mark class="sub">_title_</mark> - отображает название товара</li>
    <li class="li"><mark class="sub">_image</mark> - отображает картинку товара</li>
    <li class="li"><mark class="sub">_price</mark> - отображает цену товара</li>
</ul>
Класс содержит следующие сеттеры:
 <ul>
    <li class="li"><mark class="sub">category</mark> - устанавливает текст для элемента отображения категории товара </li>
    <li class="li"><mark class="sub">title</mark> - устанавливает текст для элемента отображения названия товара</li>
    <li class="li"><mark class="sub">image</mark> - устанавливает картинку для элемента отображения картинки товара</li>
    <li class="li"><mark class="sub">price</mark> - устанавливает текст для элемента отображения цены товара</li>
</ul>
</br>
### <mark class="sub">Класс PreviewCard</mark>
Класс <mark class="sub">PreviewCard</mark> предназначен для отоброжения карточек подробной информации о товаре. В конструторе принимает три аргумента: container - являющийся родительским элементом; blockName - имя селектора класса; events - экземпляр брокера-событий.
Класс содержит следующие свойства:
<ul>
    <li class="li"><mark class="sub">_description</mark> - отображает дополнительную информацию о товаре</li>
    <li class="li"><mark class="sub">_button</mark> - кнопка позволяющая добавлять и удалять товар в корзину </li>
</ul>
Класс содержит следующие сеттеры:
 <ul>
    <li class="li"><mark class="sub">description</mark> - устанавливает текст для отоброжения дополнительной информации о товаре </li>
    <li class="li"><mark class="sub">isSelected</mark> - устаналивает текст на кнопке</li>
</ul>
</br>
### <mark class="sub">Класс BasketItemView</mark>
Класс <mark class="sub">BasketItemView</mark> предназначен для отоброжения карточек внутри корзины. В конструторе принимается три аргумента: container - являющийся родительским элементом; blockName - имя селектора класса; events - экземпляр брокера-событий.
<ul>
    <li class="li"><mark class="sub">_index</mark> - отображает нумерацию товара в корзине </li>
    <li class="li"><mark class="sub">_title</mark> - отображает название товара в корзине </li>
    <li class="li"><mark class="sub">_price</mark> - отображает цену товара в корзине</li>
    <li class="li"><mark class="sub">_button</mark> - кнопка позволяющая удалить товар из корзины</li>
</ul>
Класс содержит следующие сеттеры:
 <ul>
    <li class="li"><mark class="sub">index</mark> - устанавливает текст для отображения нумерации товара</li>
    <li class="li"><mark class="sub">title</mark> - устанавливает текст для отображения названия товара</li>
    <li class="li"><mark class="sub">price</mark> - усанавливает текст для отображения цены товара </li>
</ul>
</br>
### <mark class="sub">Класс Order</mark>
Класс <mark class="sub">Order</mark> предназначен для отоброжения формы c полями: выбор способа оплаты; адресс. В конструторе принимается два аргумента: container - являющийся родительским элементом; events - экземпляр брокера-событий.
Класс содержит следующие свойства:
<ul>
     <li class="li"><mark class="sub">_сash</mark> - кнопка для выбора способа оплаты "наличкой" </li>
      <li class="li"><mark class="sub">_card</mark> - кнопка для выбора оплаты "картой" </li>
</ul>
Класс содержит следующие методы:
 <ul>
     <li class="li"><mark class="sub">disabledButtons</mark> - устанавливает для кнопок исходное состояние</li>
</ul>
</br>
### <mark class="sub">Класс Contacts</mark>
Класс <mark class="sub">Contacts</mark> предназначен для отоброжения формы c полями: email, номер телефона. В конструторе принимается два аргумента: container - являющийся родительским элементом; events - экземпляр брокера-событий.
</br>
### <mark class="sub">Класс Success</mark>
Класс <mark class="sub">Success</mark> предназначен для отоброжения удачного заказа. В конструторе принимается три аргумента: container - являющийся родительским элементом; events - экземпляр брокера-событий.
Класс содержит следующие свойства:
<ul>
    <li class="li"><mark class="sub">_price</mark> - отображает итоговую сумму заказа</li>
    <li class="li"><mark class="sub">_button</mark> - кнопка для возврата к каталогу товаров</li>
</ul>
Класс содержит следующие сеттеры:
<ul>
     <li class="li"><mark class="sub">price</mark> - устанавливает текст для отображения итоговой суммы заказа </li>
</ul>
## Слой ПРЕЗЕНТЕН
Слой презентера не выделен в отдельный класс, размещён в основном скрипте приложения. Взаимодействие происходит за счёт брокера событий, который отслеживает измненения за данными и реагирует на них.
<br>
Основные методы брокера событий
<ul>
    <li class="li"><mark class="sub">on</mark> - устанавливает название события и закерпляет функцию за ним </li>
    <li class="li"><mark class="sub">emit</mark> - инициирует событие по названию и вызывает соотвествующую функцию  </li>
</ul>
</br>
Основные события в приложение
<ul>
    <li class="li"><mark class="sub">card:render</mark> - отображение всех карточек </li>
    <li class="li"><mark class="sub">card:select</mark> - пользователь выбрал карточку</li>
    <li class="li"><mark class="sub">preview:render</mark> - отображение одной карточки</li>
    <li class="li"><mark class="sub">product:select</mark> - добавляет/удаляет товар из корзины</li>
    <li class="li"><mark class="sub">basket:open</mark> - открывает корзину</li>
    <li class="li"><mark class="sub">basket:card-delete</mark> - удаляет товар из корзины</li>
    <li class="li"><mark class="sub">formContacts:open</mark> - открывает форму для заполнения данных</li>
    <li class="li"><mark class="sub">orderFormErrors:change</mark> - произошло изменения в форме Order</li>
    <li class="li"><mark class="sub">contactsFormErrors:change</mark> - произошло изменения в форме Contacts</li>>
    <li class="li"><mark class="sub">form:change</mark> - устанавливает значений из полей форм в соответствующий объект заказа</li>
    <li class="li"><mark class="sub">order:submit</mark> - отпрвка формы Order </li>
    <li class="li"><mark class="sub">contacts:submit</mark> - отправка формы Contacts</li>
    <li class="li"><mark class="sub">order:succes</mark> - отображение модального окна об успешном заказе</li>
    <li class="li"><mark class="sub">modal:open</mark> - открыть модальное окно </li>
    <li class="li"><mark class="sub">modal:close</mark> - закрыть модальное окно </li>
</ul>
</br>
## Взаимодействие с сервером
### <mark class="sub">Класс LarekApi</mark>
Классс <mark class="sub">LarekApi</mark> реализует взаимодействие с сервером для работы приложения. Содержит в себе базовый путь и путь доставки контента.
Класс содержит следующие методы:
<ul>
    <li class="li"><mark class="sub">getProductList</mark> - получает данные со списком товаров</li>
    <li class="li"><mark class="sub">getProductItem</mark> - получает данные об одном товаре </li>
    <li class="li"><mark class="sub">orderProdutcs</mark> - отправляет на сервер информацию о заказе</li>
</ul>
## Основные типы/интерфейсы
<ul>
    <li class="li"><mark class="sub">ICategory</mark> - перечисление категории товара </li>
    <li class="li"><mark class="sub">IProduct</mark> - интерфейс товара </li>
    <li class="li"><mark class="sub">IOrderForm</mark> - интерфейс формы Order </li>
    <li class="li"><mark class="sub">IContactsForm</mark> - интерфейс формы Contacts </li>
    <li class="li"><mark class="sub">IOrder</mark> - интерфейс данных для отправки на сервер</li>
    <li class="li"><mark class="sub">IOrderResult</mark> - интерфейс ожидаемого результата от сервера</li>
</ul>
