import {Component} from 'react'
import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai'
import './index.css'

class Items extends Component {
  state = {
    itemsSize: 0,
  }

  render() {
    const {itemsSize} = this.state
    const {item} = this.props
    const {id, imageUrl, name, foodType, cost} = item
    return (
      <li key={id}>
        <img src={imageUrl} alt={name} />
        <h1>{name}</h1>
        <p>{foodType}</p>
        <p>{cost}</p>
        {itemsSize < 1 ? (
          <button type="button" onClick>
            ADD
          </button>
        ) : (
          <div>
            <AiOutlinePlusSquare onClick={this.onClickPlus} />
            {itemsSize}
            <AiOutlineMinusSquare onClick={this.onClickMinus} />
          </div>
        )}
      </li>
    )
  }
}
export default Items
