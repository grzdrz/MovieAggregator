import React from "react";
import { connect } from "react-redux";
import "./product-details.scss";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const product = this.props.products.find((product) => product.id === this.props.id);
    const {
      id,
      name,
      price,
      currencyType,
      descriptions,
      manufacturer,
      energyValue,
      proteins,
      fats,
      carbohydrates,
      energyUnits,
      weightUnits,
      shelfLife,
      shelfLifeUnits,
      packaging,
      imageNames,
      checkedStars,
      reviewsCount,
    } = product;

    return (
      <div className="product-details">
        <p className="product-details__name">Наименование: {name}</p>
        <p className="product-details__price">
          <span className="product-details__price-number">Цена: {price}</span>
          <span className="product-details__price-currency-type">{currencyType}</span>
        </p>
        <p className="product-details__manufacturer">Производитель: {manufacturer}</p>
        <p className="product-details__shelf-life">
          <span className="product-details__shelf-life-number">Срок годности: {shelfLife}</span>
          <span className="product-details__shelf-life-units">{shelfLifeUnits}</span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return state;
}

export default connect(mapStateToProps)(ProductDetails);
