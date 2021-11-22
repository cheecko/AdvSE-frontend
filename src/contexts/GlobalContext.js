import { createContext, useReducer } from 'react'

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
      localStorage.setItem('carts', JSON.stringify(action.payload))
      return {...state, carts: action.payload}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const GlobalContextProvider = ({ children }) => {
  const wishlists = localStorage.getItem('wishlists') ? JSON.parse(localStorage.getItem('wishlists')) : []
  const carts = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : []

  const [state, dispatch] = useReducer(GlobalReducer, {wishlists: wishlists, carts: carts})

  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>
};

export { GlobalContext, GlobalContextProvider }