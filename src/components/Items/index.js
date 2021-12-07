import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai'

import './index.css'

const Items = props => {
  const {item, increment, decrement, addCart, quantity} = props
  const {id, imageUrl, name, cost} = item

  const onClickMinus = () => {
    decrement(id)
  }

  const onClickPlus = () => {
    increment(id)
  }

  const onClickAddCart = () => {
    addCart(item)
  }
  //   const onClickAddCart = () => {
  //     this.button()
  //     console.log(itemsCount)
  //     //   this.setState({cartList: {...item, itemsCount}})
  //     //   addCartItem({...item, itemsCount})
  //     const productObj = cartList.find(each => each.id === id)
  //     if (productObj) {
  //       this.setState(prevState => ({
  //         cartList: prevState.cartList.map(each => {
  //           if (each.id === id) {
  //             const updateQuantity = each.itemsCount + item.itemsCount
  //             return {...each, quantity: updateQuantity}
  //           }
  //           return each
  //         }),
  //       }))
  //     } else {
  //       const upCart = [...cartList, item]
  //       this.setState({cartList: upCart})
  //     }
  //     localStorage.setItem('cart', JSON.stringify(cartList))
  //   }

  return (
    <li key={id} testid="foodItem" className="item-container">
      <img src={imageUrl} alt={name} className="item-image" />

      <div className="item-details">
        <h1 className="item-name">{name}</h1>

        <p className="item-cost">{`₹ ${cost}/-`}</p>
        {quantity < 1 ? (
          <button
            type="button"
            className="add-cart-button"
            onClick={onClickAddCart}
          >
            ADD
          </button>
        ) : (
          <div className="cart-count-controls-container">
            <AiOutlineMinusSquare
              onClick={onClickMinus}
              testid="decrement-count"
            />
            <p className="count">{quantity}</p>
            <AiOutlinePlusSquare
              onClick={onClickPlus}
              testid="increment-count"
            />
          </div>
        )}
      </div>
    </li>
  )
}

export default Items
