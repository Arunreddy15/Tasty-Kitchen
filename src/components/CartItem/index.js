import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai'
import './index.css'

import Context from '../../context/Context'

const CartItem = props => (
  <Context.Consumer>
    {value => {
      const {decrementQuantity, incrementQuantity} = value
      const {eachItem} = props
      const {id, imageUrl, name, itemsCount, cost} = eachItem
      const onClickDecrement = () => {
        decrementQuantity(id)
      }
      const onClickIncrement = () => {
        incrementQuantity(id)
      }
      return (
        <li key={id} className="cart-item">
          <div className="item-in">
            <img src={imageUrl} alt="items-pic" className="items-pic" />
            <p className="cart-item-name">{name}</p>
          </div>
          <div className="cart-count-controls-container-cart">
            <AiOutlineMinusSquare onClick={onClickDecrement} />
            <p>{itemsCount}</p>
            <AiOutlinePlusSquare onClick={onClickIncrement} />
          </div>
          <p>{`₹ ${cost}/-`}</p>
        </li>
      )
    }}
  </Context.Consumer>
)
export default CartItem
