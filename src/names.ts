const firstNames = [
  'Быстрый',
  'Мощный',
  'Неуловимый',
  'Горячий',
  'Королевский',
  'Великий',
  'Чёрный',
  'Крадущийся',
  'Грязный',
  'Летучий',
  'Красивый',
  'Кровавый',
  'Первый',
  'Ужасный',
  'Могучий',
  'Прекрасный',
  'Утренний',
  'Дьявольский',
  'Немощный',
  'Грозный',
];
const lastNames = [
  'Мститель',
  'Пирожок',
  'Пёс',
  'Сапог',
  'Испанец',
  'Голландец',
  'Терминатор',
  'Приговор',
  'Рыцарь',
  'Акулёныш',
  'Ангел',
  'Навигатор',
  'Денди',
  'Вихрь',
  'Цветок',
  'Пират',
  'Роджер',
  'Патриарх',
];

export function generateRandomName(): string {
  const name =
    firstNames[Math.floor(Math.random() * firstNames.length)] +
    ' ' +
    lastNames[Math.floor(Math.random() * lastNames.length)];
  return name;
}

export const generateRandonColor = (): string => {
  return '#' + `${Math.floor(Math.random() * 16777215).toString(16)}`; // generate random hex color
};
