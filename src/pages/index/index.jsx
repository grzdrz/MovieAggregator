import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Header from '../../components/header/header-container.jsx';
import ProductsList from '../products-list/products-list.jsx';
import ProductDetails from '../product-details/product-details.jsx';
import Footer from '../../components/footer/footer.jsx';
import SignUpForm from '../../components/sign-up-form/sign-up-form.jsx';
import SignInForm from '../../components/sign-in-form/sign-in-form.jsx';

function ProductSupermarket() {
  return (
    <>
      <Header />
      <Switch>
        <Route
          path='/ProductSupermarket/pageDetails/:productId(\d+)?'
          render={(props) => {
            const { productId } = props.match.params;
            const id = Number.parseInt(productId || 0, 10);
            return (
              <ProductDetails id={id} />
            );
          }}
        />
        <Route
          path='/ProductSupermarket/productList/:pageNumber(\d+)?'
          render={(props) => {
            let { pageNumber } = props.match.params;
            if (pageNumber !== undefined) pageNumber = Number.parseInt(pageNumber, 10);
            return (
              <ProductsList pageNumber={pageNumber !== undefined ? pageNumber : 1} />
            );
          }}
        />
      </Switch>
      <Footer />
      <SignUpForm />
      <SignInForm />
    </>
  );
}

export default ProductSupermarket;
