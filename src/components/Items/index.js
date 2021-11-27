import {Component} from 'react'
import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai'

import './index.css'
import Context from '../../context/Context'

class Items extends Component {
  state = {
    itemsCount: 0,
  }

  onClickMinus = () => {
    this.setState(prevState => ({itemsCount: prevState.itemsCount - 1}))
  }

  onClickPlus = () => {
    this.setState(prevState => ({itemsCount: prevState.itemsCount + 1}))
  }

  button = () => this.setState({itemsCount: 1}, this.onClickAddCart)

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {addCartItem} = value

          const {itemsCount} = this.state
          const {item} = this.props
          const {id, imageUrl, name, cost} = item
          const onClickAddCart = () => {
            this.button()
            console.log(itemsCount)
            addCartItem({...item, itemsCount})
            localStorage.setItem(
              'cart',
              JSON.stringify([{...item, itemsCount}]),
            )
          }

          return (
            <li key={id} testid="foodItem" className="item-container">
              <img src={imageUrl} alt={name} className="item-image" />

              <div className="item-details">
                <h1 className="item-name">{name}</h1>

                <p className="item-cost">{`₹ ${cost}/-`}</p>
                {itemsCount < 1 ? (
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
                      onClick={this.onClickMinus}
                      testid="decrement-count"
                    />
                    <p className="count">{itemsCount}</p>
                    <AiOutlinePlusSquare
                      onClick={this.onClickPlus}
                      testid="increment-count"
                    />
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </Context.Consumer>
    )
  }
}
export default Items
