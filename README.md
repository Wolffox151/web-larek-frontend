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
  description?: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

### Описание данных полей в форме оформления заказа

```
interface IOrder {
  payment: string;
  address: string; 
  email: string; 
  phoneNumber: string;
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
#### 