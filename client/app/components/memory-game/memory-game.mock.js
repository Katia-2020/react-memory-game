const cards = [
  {
    name: 'watermelon',
    url: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'pineapple',
    url: 'https://images.unsplash.com/photo-1548805973-e8b0751bd0f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'banana',
    url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'cucumber',
    url: 'https://images.unsplash.com/photo-1566486189376-d5f21e25aae4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=489&q=80',
  },
  {
    name: 'pumpkin',
    url: 'https://images.unsplash.com/photo-1569976710208-b52636b52c09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=476&q=80',
  },
  {
    name: 'lemon',
    url: 'https://images.unsplash.com/photo-1582087463261-ddea03f80e5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'orange',
    url: 'https://www.visitsicily.info/wp-content/uploads/2018/11/arance-rosse-cavasenna.jpg',
  },
  {
    name: 'kiwi',
    url: 'https://images.unsplash.com/photo-1542400935-70190c63c242?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'strawberry',
    url: 'https://www.gardenersdream.co.uk/images/strawberry-cambridge-favourite-bare-root-plants-p3542-25404_image.jpg',
  },
  {
    name: 'tomato',
    url: 'https://images.unsplash.com/photo-1566383444833-43afb88e5dc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=462&q=80',
  },
  {
    name: 'chilli',
    url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'coconut',
    url: 'https://images.unsplash.com/photo-1588503341879-81257d43071e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'nuts',
    url: 'https://images.unsplash.com/photo-1573851552153-816785fecf4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'zucchini',
    url: 'https://images.unsplash.com/photo-1583687355032-89b902b7335f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'sunflower',
    url: 'https://images.unsplash.com/photo-1583687745386-e497599b2c87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
];

const duplicateValues = (arr) => {
  const newArr = [];

  arr.forEach((item) => {
    newArr.push(item);
    newArr.push(item);
  });

  return newArr;
};

const createCardStructure = (arr) => arr.map((item, index) => ({
  id: index,
  ...item,
}));

const result = createCardStructure(duplicateValues(cards));

export const getDeckBasedOnLevel = (level) => {
  const newArray = [...result];

  if (level === 'easy') {
    return newArray.slice(0, 16);
  }

  if (level === 'medium') {
    return newArray.slice(0, 20);
  }

  if (level === 'hard') {
    return newArray;
  }

  return newArr;
};
