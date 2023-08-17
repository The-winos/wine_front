
export const handlePriceFilter = (event, option, filter) => {
  const priceRange = event.target.value;
  let filtered = [];

  // filter wines based on price
  switch (priceRange) {
    case "1-10":
      filtered = option.filter(wine => wine.price >= 1 && wine.price <= 1000);
      break;
    case "11-20":
      filtered = option.filter(wine => wine.price >= 1100 && wine.price <= 2000);
      break;
    case "21-30":
      filtered = option.filter(wine => wine.price >= 2100 && wine.price <= 3000);
      break;
    case "30+":
      filtered = option.filter(wine => wine.price >= 3000);
      break;
    default:
      filtered = option;
      break;
  }
  filter(filtered);
}

export const handleRatingFilter = (event, option, filter, ratingFilter) => {
  const ratingRange = event.target.value;
  let filtered = [];
  switch (ratingRange) {
    case "5":
      filtered = option.filter((wine) => parseInt(wine.rating) === 5);
      break;
    case "4":
      filtered = option.filter((wine) => parseInt(wine.rating) === 4);
      break;
    case "3":
      filtered = option.filter((wine) => parseInt(wine.rating) === 3);
      break;
    case "2":
      filtered = option.filter((wine) => parseInt(wine.rating) === 2);
      break;
    case "1":
      filtered = option.filter((wine) => parseInt(wine.rating) === 1);
      break;
    default:
      filtered = option;
      break;
  }
  ratingFilter(ratingRange);
  filter(filtered);
};

export const handleSearch = (event, searchItem) => {
  const value = event.target.value;
  searchItem(value);
};
