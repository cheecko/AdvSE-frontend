import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { GlobalContextProvider } from './contexts/GlobalContext'
import Home from './pages/Home'
import ItemDetail from './pages/ItemDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import Order from './pages/Order'

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/home' component={Home} exact />
          <Route path='/items/:id' component={ItemDetail} />
          <Route path='/cart' component={Cart} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/account/wishlist' component={Wishlist} exact />
          <Route path='/account/order' component={Order} exact />
        </Switch>
      </BrowserRouter>
    </GlobalContextProvider>
  )
}

export default App
