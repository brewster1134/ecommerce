import React from 'react'

import './cart-icon.styles.sass'
import { ReactComponent as ShoppingBagIcon } from '../assets/bag.svg'

const CartIconComponent = () => (
  <div class='cart-icon-component'>
    <ShoppingBagIcon />
    <div className='cart-count'>0</div>
  </div>
)

export default CartIconComponent
