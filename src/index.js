const promotions = ["SINGLE LOOK", "DOUBLE LOOK", "TRIPLE LOOK", "FULL LOOK"];

function filterProducts(ids, productsList) {
  return productsList.filter((product) => {
    return ids.includes(product.id);
  });
}

function getProductDetails(value) {
  return value.map((product) => {
    return {
      name: product.name,
      category: product.category,
    };
  });
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

function getPrices(products, promotion) {
  const sum = (x, y) => x + y;

  let totalRegular =  products
    .map((product) => {
      return product.regularPrice;
    })
    .reduce(sum, 0)
    .toFixed(2);

  let totalPrice = products
    .map((product) => {
      let promotionPrice = product.promotions.filter((promo) => {
        return promo.looks.includes(promotion);
      });

      if (promotionPrice[0]) {
        promotionPrice = promotionPrice[0].price;
      } else {
        promotionPrice = product.regularPrice;
      }
      return promotionPrice;
    })
    .reduce(sum, 0)
    .toFixed(2);
    
  let discountValue = (totalRegular - totalPrice).toFixed(2);
  let discount = Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(1 - totalPrice / totalRegular);

  return {
    totalPrice,
    discountValue,
    discount,
  };
}

function getShoppingCart(ids, productsList) {
  const filteredProducts = filterProducts(ids, productsList);
  const products = getProductDetails(filteredProducts);
  const promotion = getPromotion(filteredProducts);
  const { totalPrice, discountValue, discount } = getPrices(
    filteredProducts,
    promotion
  );

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
