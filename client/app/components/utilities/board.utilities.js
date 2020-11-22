
export const isFoundCard = (name, foundImages) => foundImages.includes(name);

export const getCardContent = (item, currentCard, previousCard, foundImages) => {
  if ((currentCard.id === item.id ||
    previousCard.id === item.id) ||
    isFoundCard(item.name, foundImages)) {
    return item.url;
  }

  return '';
};
