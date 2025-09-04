export const categories = [
  {
    name: 'Піци',
  },
  {
    name: 'Сніданок',
  },
  {
    name: 'Закуски',
  },
  {
    name: 'Коктейлі',
  },
  {
    name: 'Кава',
  },
];

export const _ingredients = [
  {
    name: 'Сирний бортик',
    price: 179,
    imageUrl: '/assets/images/ingredients/cheese_board.png',
  },
  {
    name: 'Вершкова моцарела',
    price: 79,
    imageUrl: '/assets/images/ingredients/mozzarella.png',
  },
  {
    name: 'Сири чеддер і пармезан',
    price: 79,
    imageUrl: '/assets/images/ingredients/parmesan.png',
  },
  {
    name: 'Гострий перець халапеньйо',
    price: 59,
    imageUrl: '/assets/images/ingredients/jalapeno.png',
  },
  {
    name: 'Ніжне курча',
    price: 79,
    imageUrl: '/assets/images/ingredients/chicken.png',
  },
  {
    name: 'Шампіньйони',
    price: 59,
    imageUrl: '/assets/images/ingredients/champignons.png',
  },
  {
    name: 'Бекон',
    price: 79,
    imageUrl: '/assets/images/ingredients/bacon.png',
  },
  {
    name: 'Шинка',
    price: 79,
    imageUrl: '/assets/images/ingredients/ham.png',
  },
  {
    name: 'Пікантна пепероні',
    price: 79,
    imageUrl: '/assets/images/ingredients/pepperoni.png',
  },
  {
    name: 'Гостра чорізо',
    price: 79,
    imageUrl: '/assets/images/ingredients/chorizo.png',
  },
  {
    name: 'Мариновані огірочки',
    price: 59,
    imageUrl: '/assets/images/ingredients/pickled-cucumbers.png',
  },
  {
    name: 'Свіжі томати',
    price: 59,
    imageUrl: '/assets/images/ingredients/tomatoes.png',
  },
  {
    name: 'Червона цибуля',
    price: 59,
    imageUrl: '/assets/images/ingredients/onion.png',
  },
  {
    name: 'Соковиті ананаси',
    price: 59,
    imageUrl: '/assets/images/ingredients/pineapples.png',
  },
  {
    name: 'Італійські трави',
    price: 39,
    imageUrl: '/assets/images/ingredients/herbs.png',
  },
  {
    name: 'Солодкий перець',
    price: 59,
    imageUrl: '/assets/images/ingredients/pepper.png',
  },
  {
    name: 'Кубики бринзи',
    price: 79,
    imageUrl: '/assets/images/ingredients/cheeses.png',
  },
  {
    name: 'Мітболи',
    price: 79,
    imageUrl: '/assets/images/ingredients/meatballs.png',
  },
].map((obj, i) => ({ id: i + 1, ...obj }));

export const products = [
  {
    name: 'Омлет з пепероні в пирозі',
    imageUrl: '/assets/images/breakfasts/pepperoni-omelet.webp',
    categoryId: 2,
  },
  {
    name: 'Омлет із беконом',
    imageUrl: '/assets/images/breakfasts/bacon-omelette.webp',
    categoryId: 2,
  },
  {
    name: 'Сирники зі згущеним молоком',
    imageUrl: '/assets/images/breakfasts/cheesecakes-condensed-milk.webp',
    categoryId: 2,
  },
  {
    name: 'Сирники з малиновим варенням',
    imageUrl: '/assets/images/breakfasts/cheesecakes-raspberry-jam.webp',
    categoryId: 2,
  },
  {
    name: 'Сенвіч шинка та сир',
    imageUrl: '/assets/images/snacks/ham-cheese-sandwich.webp',
    categoryId: 3,
  },
  {
    name: 'Курячі нагетси',
    imageUrl: '/assets/images/snacks/chicken-nuggets.webp',
    categoryId: 3,
  },
  {
    name: 'Картопля з печі з соусом Цезар',
    imageUrl: '/assets/images/snacks/potatoes-sauce.webp',
    categoryId: 3,
  },
  {
    name: 'Додстер',
    imageUrl: '/assets/images/snacks/dodster.webp',
    categoryId: 3,
  },
  {
    name: 'Гострий Додстер',
    imageUrl: '/assets/images/snacks/spicy-dodster.webp',
    categoryId: 3,
  },
  {
    name: 'Персиковий молочний коктейль',
    imageUrl: '/assets/images/milkshake/peach-milkshake.webp',
    categoryId: 4,
  },
  {
    name: 'Молочний коктейль Фісташка',
    imageUrl: '/assets/images/milkshake/milkshake-pistachio.webp',
    categoryId: 4,
  },
  {
    name: 'Молочний коктейль з печивом Орео',
    imageUrl: '/assets/images/milkshake/oreo-cookie-milkshake.webp',
    categoryId: 4,
  },
  {
    name: 'Класичний молочний коктейль',
    imageUrl: '/assets/images/milkshake/milkshake.webp',
    categoryId: 4,
  },
  {
    name: 'Кава Кокосова латте',
    imageUrl: '/assets/images/сoffee/Coffee-Coconut-Latte.webp',
    categoryId: 5,
  },
  {
    name: 'Кава Горіховий латте',
    imageUrl: '/assets/images/сoffee/Coffee-Nut-Latte.webp',
    categoryId: 5,
  },
  {
    name: 'Кава Капучіно',
    imageUrl: '/assets/images/сoffee/Coffee-Cappuccino.webp',
    categoryId: 5,
  },
  {
    name: 'Кава Латте',
    imageUrl: '/assets/images/сoffee/coffee-latte.webp',
    categoryId: 5,
  },
];
