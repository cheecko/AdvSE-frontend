import { createContext, useReducer } from 'react'
import { FREE_DELIVERY_SUBTOTAL_PRICE } from './../utils/constants'
import { round2Decimal } from './../utils/functions'

const GlobalContext = createContext()

const GlobalReducer = (state, action) => {
  switch (action.type) {
    case 'getWishlists': {
      return {...state, wishlists: localStorage.getItem('wishlists') ? JSON.parse(localStorage.getItem('wishlists')) : []}
    }
    case 'saveWishlists': {
      localStorage.setItem('wishlists', JSON.stringify(action.payload))
      return {...state, wishlists: action.payload}
    }
    case 'getCarts': {
      return {...state, carts: localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : []}
    }
    case 'saveCarts': {
      const subtotal = round2Decimal(action.payload.reduce((a, b) => { return { price: round2Decimal(a.price) + round2Decimal(b.variant.price) * b.quantity } }, { price: 0 }).price)
      const shippingCost = subtotal > FREE_DELIVERY_SUBTOTAL_PRICE ? 0 : 3.50
      const total = round2Decimal(subtotal + shippingCost)
      const totalQuantity = action.payload.reduce((a, b) => { return {quantity: a.quantity + b.quantity} }, { quantity: 0 }).quantity
      const carts = { items: action.payload, totalQuantity: totalQuantity, subtotal: subtotal, shippingCost: shippingCost, total: total }
      localStorage.setItem('carts', JSON.stringify(carts))
      return { ...state, carts: carts }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const GlobalContextProvider = ({ children }) => {
  const wishlists = localStorage.getItem('wishlists') ? JSON.parse(localStorage.getItem('wishlists')) : []
  const carts = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : { items: [], totalQuantity: 0, subtotal: 0, shippingCost: 0, total: 0 }

  const [state, dispatch] = useReducer(GlobalReducer, {wishlists: wishlists, carts: carts})

  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>
};

export { GlobalContext, GlobalContextProvider }