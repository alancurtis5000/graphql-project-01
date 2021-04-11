import { gql } from "apollo-boost";
import { addItemToCart, getCartItemCount } from "./cart.utils";

// type definitions / type / schema for grapql
// extend means add new mutations to graphql
// type definitons should be pascalCase
export const typeDefs = gql`
  extend type Item {
    quanitity: Int
  }
  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]
  }
`;

// @client specifies to look at local cache / apollo's version of redux store.
// not hit the backend
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

// this is a mutation defination so it is camelCase
// paramenters are from the apollo docs:
// _root represents
// _args are the variables passed into mutations / queries
// _context : these are the things apollo has access too. cache / client itself
// _info: is information about the query or mutation itself
// https://www.apollographql.com/docs/apollo-server/data/resolvers/
export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, _context, _info) => {
      // destructuring data object // apollo cache
      const { cartHidden } = _context.cache.readQuery({
        query: GET_CART_HIDDEN,
      });

      _context.cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });

      return !cartHidden;
    },

    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) },
      });
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });
      return newCartItems;
    },
  },
};
