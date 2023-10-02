const getRandomColor = () => {
  const color = Math.floor(Math.random() * 6);
  switch(color) {
    case 0: {
      return 'lightBlue'
    }
    case 1: {
      return 'gray'
    }
    case 2: {
      return 'orange'
    }
    case 3: {
      return 'yellow'
    }
    case 4: {
      return 'lightGreen'
    }
    case 5: {
      return 'purple'
    }
    default: {
      return 'lightBlue'
    }
  }
}

module.exports = getRandomColor;