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
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
  },
  {
    name: 'Вершкова моцарела',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
  },
  {
    name: 'Сири чеддер і пармезан',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
  },
  {
    name: 'Гострий перець халапеньйо',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
  },
  {
    name: 'Ніжне курча',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
  },
  {
    name: 'Шампіньйони',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
  },
  {
    name: 'Бекон',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
  },
  {
    name: 'Шинка',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
  },
  {
    name: 'Пікантна пепероні',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
  },
  {
    name: 'Гостра чорізо',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
  },
  {
    name: 'Мариновані огірочки',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
  },
  {
    name: 'Свіжі томати',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
  },
  {
    name: 'Червона цибуля',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
  },
  {
    name: 'Соковиті ананаси',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
  },
  {
    name: 'Італійські трави',
    price: 39,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
  },
  {
    name: 'Солодкий перець',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
  },
  {
    name: 'Кубики бринзи',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
  },
  {
    name: 'Мітболи',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
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
