var harry = {
  id: 18,
  name: 'William',
  partners: [
    {
      id: 5,
      name: 'Meghan Markle',
    }
  ]
};

var william = {
  id: 13,
  name: 'William',
  partners: [
    {
      id: 14,
      name: 'Catherine',
      children: [
        {id: 15, name: 'George'},
        {id: 16, name: 'Charlotte'},
        {id: 17, name: 'Lous'},
      ]
    }
  ]
};

var charles = {
  id: 7,
  name: 'Charles',
  partners: [
    {id: 11, name: 'Camila'},
    {id: 12, name: 'Diana', children: [william, harry]},
  ]
}

var queenElizabeth = {
  id: 4,
  name: 'Elizabeth Wayne',
  partners: [
    {
      id: 6, 
      name: 'Prince Philip',
      children: [
        charles,
        { id: 8, name: 'Ann' },
        { id: 9, name: 'Andrew' },
        { id: 10, name: 'Edward' },
      ]
    },
  ]
}

var kingEdward = {
  id: 1,
  name: 'George Clooney',
  partners: [
    {
      id: 2,
      name: 'Elizabeth Marine',
      children: [
        queenElizabeth, 
        {id: 3, name: 'Margret Wisconsin'},
        {id: 3, name: 'Margret Sh'},
        {id: 3, name: 'Margret Sh'},
        {id: 3, name: 'Margret Sh'},
      ]
    },
    /* {
      id: 34,
      name: 'Elizabeth Marine',
      children: [
        queenElizabeth, 
        {id: 3, name: 'Margret Wisconsin'}
      ]
    } */
  ]
}






