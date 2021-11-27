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
        console.log('hello')
      }
      const onClickIncrement = () => {
        incrementQuantity(id)
      }
      return (
        <>
          <div className="desktop">
            <li key={id} className="cart-item">
              <div className="item-in">
                <img src={imageUrl} alt="items-pic" className="items-pic" />
                <p className="cart-item-name">{name}</p>
              </div>
              <div className="cart-count-controls-container-cart">
                <button onClick={onClickDecrement} type="button">
                  <AiOutlineMinusSquare />
                </button>
                <p>{itemsCount}</p>
                <button type="button" onClick={onClickIncrement}>
                  <AiOutlinePlusSquare />
                </button>
              </div>
              <p>{`₹ ${cost}/-`}</p>
            </li>
          </div>
          <div className="non-desktop">
            <li key={id} className="cart-item">
              <img src={imageUrl} alt="items-pic" className="items-pic" />
              <div className="item-dets">
                <p className="cart-item-name">{name}</p>

                <div className="cart-count-controls-container-cart">
                  <button onClick={onClickDecrement} type="button">
                    <AiOutlineMinusSquare size={16} />
                  </button>
                  <p>{itemsCount}</p>
                  <button type="button" onClick={onClickIncrement}>
                    <AiOutlinePlusSquare size={16} />
                  </button>
                </div>
                <p className="cost">{`₹ ${cost}/-`}</p>
              </div>
            </li>
          </div>
        </>
      )
    }}
  </Context.Consumer>
)
export default CartItem
