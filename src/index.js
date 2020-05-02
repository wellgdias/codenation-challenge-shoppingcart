const promotions = ["SINGLE LOOK", "DOUBLE LOOK", "TRIPLE LOOK", "FULL LOOK"];
const sumPrice = (x, y) => x + y;

function filterProducts(ids, productsList) {
  return productsList.filter((product) => ids.includes(product.id));
}

function getProductDetails(value) {
  return value.map((product) => ({
    name: product.name,
    category: product.category,
  }));
}

function getPromotion(products) {
  const category = [];
  let promotion = products.map((product) => {
    if (!category.includes(product.category)) {
      category.push(product.category);
    }
    return promotions[category.length - 1];
  });

  return promotion[promotion.length - 1];
}

function getRegularPrice(products) {
  return products
    .map((product) => product.regularPrice)
    .reduce(sumPrice, 0)
    .toFixed(2);
}

function getTotalPrice(products, promotion) {
  return products
    .map((product) => {
      let promotionPrice = product.promotions.filter((promo) =>
        promo.looks.includes(promotion)
      );

      promotionPrice = promotionPrice[0]
        ? promotionPrice[0].price
        : product.regularPrice;

      return promotionPrice;
    })
    .reduce(sumPrice, 0)
    .toFixed(2);
}

function getDiscount(regularPrice, totalPrice) {
  let discountValue = (regularPrice - totalPrice).toFixed(2);
  let discount = Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(1 - totalPrice / regularPrice);

  return {
    discountValue,
    discount,
  };
}

function getShoppingCart(ids, productsList) {
  const filteredProducts = filterProducts(ids, productsList);
  const products = getProductDetails(filteredProducts);
  const promotion = getPromotion(filteredProducts);
  let regularPrice = getRegularPrice(filteredProducts);
  let totalPrice = getTotalPrice(filteredProducts, promotion);
  let { discountValue, discount } = getDiscount(regularPrice, totalPrice);

  return {
    products,
    promotion,
    totalPrice,
    discountValue,
    discount,
  };
}

module.exports = {
  getShoppingCart,
};
