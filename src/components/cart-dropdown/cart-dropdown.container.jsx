import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import CartDropdown from "./cart-dropdown.component";

// TODO: since these get reused they should be moved into their own file / folder
const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

/*  whats going on here?
Mutation is a function that gives us toggleCartHidden
Which returns a Query function that gives us access to cartItems
And that returns CartDropdown, allowing us to pass those values in as props
*/
const CartDropdownContainer = () => (
  <Mutation mutation={TOGGLE_CART_HIDDEN}>
    {(toggleCartHidden) => (
      <Query query={GET_CART_ITEMS}>
        {({ data: { cartItems } }) => (
          <CartDropdown
            toggleCartHidden={toggleCartHidden}
            cartItems={cartItems}
          />
        )}
      </Query>
    )}
  </Mutation>
);

export default CartDropdownContainer;
