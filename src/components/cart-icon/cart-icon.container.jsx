import { graphql } from "react-apollo";
import flowRight from "lodash/flowRight";
import { gql } from "apollo-boost";

import CartIcon from "./cart-icon.component";

// TODO: since these get reused they should be moved into their own file / folder
const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;
// version 2 using flowRight and higher order component structure similare to redux connect
const CartIconContainer = (props) => {
  const { itemCount, toggleCartHidden } = props;
  return <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />;
};

export default flowRight(
  graphql(GET_ITEM_COUNT),
  // second prop being passed in is a config object where we can specify the name of whats returns as props name.
  graphql(TOGGLE_CART_HIDDEN, { name: "toggleCartHidden" })
)(CartIconContainer);

///////////////////////////
///////////////////////////
///////////////////////////

/* 
// version using Query and Mutation Component functions
const CartIconContainer = () => (
  <Query query={GET_ITEM_COUNT}>
    {({ data: { itemCount } }) => (
      <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {(toggleCartHidden) => (
          <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
        )}
      </Mutation>
    )}
  </Query>
);

export default CartIconContainer;
*/
