import React from 'react'

const Context = React.createContext({
  cartList: [],
  addCartItem: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
})

export default Context
