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
### Интерфейс карточки товара более подробный(с описанием). Для модалки.

```
export interface IProductInfo extends IProduct {
  description?: string;
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
  total: number;
  items: IProduct[];
}
```

### Модель списка карточек в корзине

```
export interface IOrderData {
  total: number;
  items: IProduct['id'][];
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

#### Клас EventEmitter
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
- total: number - итоговая стоимость корзины.
-  items: IProduct[] - список товаров
Так же класс предоставляет метод для взаимодействия с данными.
- addProduct(product: IProduct): void - добавляет товар в корзину.
- removeProduct(product: IProduct['id']): void - удаляет товар из корзины
- getCartData(): IProduct[] | null - получает список товаров из корзины