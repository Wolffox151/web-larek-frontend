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
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Настройка
Убедитесь что в корне проекта присутствует .env файл в формате:

`
API_ORIGIN = https://yoursite.com
`
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

## Данные и их типизация в приложении.
### Интерфейс данных карточек на главной странице.

```
export interface IProduct {
  id: string;
  image: string;
  title: string; 
  category: string;
  price: number | null;
}
```

### Описание данных полей в форме оформления заказа

```
interface IOrderPayment {
  payment?: string;
  address?: string;
}
```

```
export interface IOrderContacts {
  email?: string;
  phone?: string;
}
```

### Модель списка карточек на странице

```
export interface IProductData {
  items: IProduct[];
}
```

### Модель списка карточек в корзине

```
export interface IOrderData {
  items: IProduct[];
}
```

## Архитектура приложения
Код написан в парадигме MVP(Model, View, Presenter)
- Модель отвечает за хранение данных.
- Представление отвечает за отображение данных на странице
- Презентер является связующим звеном между моделью и отображением

### Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с загаловками запросов.
Методы:
- `get` - Выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектов, который ответил сервер
- `post` - Принимает объект с данными, который будут переданы в JSON в теле запроса и отправляет эти данные на ендпоинт, переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Броке событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - полдписка на событие
- `emit` - инициалзиация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие.

### Слой данных

#### Класс ProductData
Класс отвечает за хранение и логику работы с данными карточек товара. \
Конструктор класса принимает инстант брокера событий\
В полях класса хранятся следующие данные:
- items: IProduct[] - массив, содержащий в себе карточки.
- preview: string | null - id карточки, выбранной для просмотра в модальном окне.

Так же класс предоставляет метод для взаимодействия с данными.
- getProduct(productId: string): IProduct - возвращает карточку по ее айдишнику.
- getProductList(): IProduct[] - получает список товаров
- getProductPreview(product: IProduct): TProductInfo - превью карточки(модалка)

#### Класс OrderData
Класс отвечает за хранение данных карточек в корзине.
-  items: IProduct[] - список товаров
Так же класс предоставляет метод для взаимодействия с данными.
- addProduct(product: IProduct): void - добавляет товар в корзину.
- removeProduct(product: IProduct['id']): void - удаляет товар из корзины
- getCartData(): IProduct[] | null - получает список товаров из корзины
- getTotalPrice(orderItems: IProduct[]): number | null; - получает стоимость корзины
- getTotalLength(orderItems: IProduct[]): number | null; - получает кол-во товаров
- checkProductinCart(orderItems: IProduct[], product: IProduct): boolean; - проверяяет наличие товара в корзине

### Слой представления

Все классы представления отвечают за отображение данных внутри контейнера (DOM-элемента) и управление взаимодействием с пользователем.

#### Класс MainPage

Класс MainPage управляет отображением карточек товаров на главной странице, а также кнопкой корзины и счетчиком товаров в корзине. Предоставляет методы для добавления карточек в контейнер и обновления счетчика корзины.

Поля:

- `mainPage: HTMLElement` — корневой элемент главной страницы.
- `container: HTMLElement` — контейнер для размещения карточек товаров.
- `basketCounter: HTMLElement` — элемент для отображения количества товаров в корзине.
- `event: IEvent` — объект для генерации событий при изменениях в корзине.

Конструктор:
Принимает корневой элемент страницы, контейнер для карточек товаров, кнопку корзины и элемент для счетчика товаров на кнопке корзины.
Методы:

- `set containerElement(newContainer: HTMLElement): void` — сеттер для обновления контейнера, в котором будут размещаться карточки товаров.
- `set basketCounterElement(newBasketCounter: HTMLElement): void` — сеттер для обновления контейнера, в котором будут размещаться карточки товаров.

#### Класс CardView

Отвечает за отображение карточки товара, включая данные о категории, названии, описании, изображении, цене и кнопку "Заказать" с проверкой наличия товара в корзине. Конструктор класса принимает DOM-элемент шаблона, что позволяет формировать карточки разных вариантов. В классе устанавливаются слушатели на все интерактивные элементы для генерации событий при взаимодействии пользователя.

Поля:
- `templateElement: HTMLElement` — шаблон карточки товара.
- `event: IEvent` — объект для генерации событий.
- элементы разметки карточки (`categoryElement`, `titleElement`, `descriptionElement`, `imageElement`, `priceElement`, `orderButton`).

Методы:
- `setData(cardData: IProduct): void` — заполняет карточку данными товара.
- `render(): HTMLElement` — возвращает заполненную карточку с установленными слушателями.

#### Класс Modal

Класс `Modal` отвечает за отображение и управление модальными окнами. Методы `open` и `close` контролируют отображение окна, а также установлены слушатели для закрытия окна при нажатии на клавишу Esc, клике на оверлей или кнопку-крестик.

Поля:
- `modal: HTMLElement` — элемент модального окна.
- `event: IEvents` — объект для генерации событий.

Конструктор:
- Принимает селектор для идентификации модального окна на странице и экземпляр класса `EventEmitter` для генерации событий.

Методы:
- `open(content: HTMLElement): void` — метод класса, заполняющий элементы модального.
- `close(): void` — очищает содержимое модального окна при закрытии, чтобы подготовить его к следующему использованию.

#### Класс Form
Form — это класс для управления логикой форм, отображаемых в Modal. Он обрабатывает поля формы, проверяет их заполненность, управляет состоянием кнопки отправки и генерирует события при отправке данных./
Поля:
- `formElement: HTMLFormElement` — элемент формы, выбранный по селектору или загруженный из шаблона.
- `event: IEvent` — объект для генерации событий, таких как отправка формы.
- `submitButton: HTMLButtonElement` — кнопка отправки формы, активируемая при корректном заполнении обязательных полей.

Методы:
- `isValid(): boolean` — Проверяет, заполнены ли все обязательные поля формы. Используется для активации кнопки отправк
- `clear(): void` - Очищает содержимое формы и деактивирует кнопку отправки.


#### Класс Basket

Класс `Basket` управляет отображением корзины товаров в модальном окне и взаимодействием с её содержимым. Корзина отображает список добавленных товаров, их стоимость, общую сумму и предоставляет возможность удалять товары. Также включает кнопку для оформления заказа.

Поля:
- `listProducts: HTMLUListElement` — контейнер для списка товаров в корзине.
- `totalPrice: HTMLElement` — элемент для отображения общей стоимости товаров.
- `eventEmitter: EventEmitter` — объект для генерации событий при изменениях в корзине.

Методы:
- `order(data: IProduct[]): void` — добавляет товары в корзину, используя шаблон 
- `removeProduct(productId: string): void` — удаляет товар из корзины по его идентификатору.
- `render(): void` — перерисовывает содержимое модального окна корзины, отображая актуальный список товаров и общую стоимость.
- `open(): void` — открывает модальное окно корзины, делая её видимой для пользователя.
- `close(): void` — закрывает модальное окно корзины и очищает её содержимое.

#### Класс OrderSuccessModal

Класс `OrderSuccessModal` управляет модальным окном, которое отображает сообщение об успешном завершении заказа. Использует `Modal` для отображения окна и содержит логику для обновления информации о заказе.

Поля:
- `modal: Modal` — экземпляр `Modal`, управляющий отображением окна.
- `titleElement: HTMLElement` — заголовок модального окна.
- `descriptionElement: HTMLElement` — элемент для отображения итоговой суммы заказа.
- `closeButton: HTMLElement` — кнопка для закрытия модального окна.

Методы:
- `open(totalAmount: number): void` — открывает модальное окно и обновляет текст с итоговой суммой заказа.
- `close(): void` — закрывает модальное окно.



### Слой коммуникации

#### Класс AppApi
Принимает в конструктор экземпляр класса Api и предоставляет методы, реализующие взаимодействие с бэкендом сервиса.

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных, находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счёт событий, генерируемых с помощью брокера событий, и обработчиков этих событий, описанных в `index.ts`.\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.\

*Список всех событий, которые могут генерироваться в системе:*\

*События изменения данных (генерируются классами моделей данных)*:
- `cards:changed` — изменения массива карточек товаров.
- `cart:updated` — обновление содержимого корзины (например, при добавлении или удалении товаров).
- `cart:totalChanged` — обновление итоговой суммы товаров в корзине.
- `order:created` — создание нового заказа.
- `order:submitted` — подтверждение заказа пользователем.

*События взаимодействия с интерфейсом (генерируются слоями представления)*:
- `container:changed` — обновление контейнера карточек на главной странице.
- `card:open` — открытие модального окна с подробной информацией о товаре.
- `card:close` — закрытие окна с подробной информацией о товаре.
- `card:clear` — очистка содержимого окна с информацией о товаре.
- `cart:open` — открытие окна корзины.
- `cart:close` — закрытие окна корзины.
- `orderForm:open` — открытие формы оформления заказа.
- `orderForm:close` — закрытие формы оформления заказа.
- `orderComplete:open` — открытие окна с подтверждением успешного оформления заказа.
- `orderComplete:close` — закрытие окна с подтверждением успешного оформления заказа.

*События для валидации и отправки форм*:
- `paymentForm:submitted` — отправка данных формы с оплатой и адресом доставки.
- `paymentForm:validationError` — ошибка валидации формы с оплатой и адресом.
- `contactForm:submitted` — отправка данных формы с контактной информацией.
- `contactForm:validationError` — ошибка валидации формы с контактной информацией.


*События взаимодействия с сервером (генерируются классом AppApi)*:
- `api:fetchCards` — получение списка карточек с сервера.
- `api:addToCart` — добавление товара в корзину на сервере.
- `api:removeFromCart` — удаление товара из корзины на сервере.
- `api:createOrder` — создание заказа на сервере.
- `api:submitOrder` — отправка подтверждения заказа на сервер.
