import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'
import Items from '../Items'
import Footer from '../Footer'
import Navbar from '../Navbar'

const jwtToken = Cookies.get('jwt_token')
const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class RestaurantItems extends Component {
  state = {
    apiStatus: apiConstants.initial,
    restaurantItems: [],
    quantity: 0,
    cartList: [],
  }

  componentDidMount() {
    this.getItems()
  }

  increment = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (id === eachItem.id) {
          const updatedQuery = eachItem.quantity + 1
          return {...eachItem, quantity: updatedQuery}
        }
        return eachItem
      }),
    }))
  }

  decrement = () => {}

  addCart = product => {
    const {cartList} = this.state

    this.setState(
      prevState => ({
        cartList: [
          ...prevState.cartList,
          {...product, quantity: prevState.quantity + 1},
        ],
      }),
      this.increment,
      localStorage.setItem('cartList', JSON.stringify(cartList)),
    )
  }

  getItems = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const api = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok === true) {
      const restaurantItems = {
        rating: data.rating,
        id: data.id,
        name: data.name,
        cuisine: data.cuisine,
        costForTwo: data.cost_for_two,
        imageUrl: data.image_url,
        reviewsCount: data.reviews_count,
        opensAt: data.opens_at,
        itemsCount: data.items_count,
        location: data.location,
        foodItems: data.food_items.map(each => ({
          name: each.name,
          cost: each.cost,
          imageUrl: each.image_url,
          foodType: each.food_type,
          id: each.id,
        })),
      }
      this.setState({apiStatus: apiConstants.success, restaurantItems})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Loader type="Circles" color="#f7931e" height="40" width="50" />
    </div>
  )

  renderData = () => {
    const {restaurantItems, quantity} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      rating,
      location,
      costForTwo,
      reviewsCount,
    } = restaurantItems
    const {foodItems} = restaurantItems
    return (
      <div>
        <Navbar />
        <div className="restaurant-details-container">
          <div className="restaurant-details">
            <img src={imageUrl} alt="restaurant" className="restaurant-image" />
            <div className="restaurant-info">
              <h1 className="restaurant-det-name">{name}</h1>
              <p className="restaurant-det-cuisine">{cuisine}</p>
              <p className="restaurant-det-location">{location}</p>
              <div className="rating-det-cost">
                <div className="r-c">
                  <div className="s-r">
                    <BsFillStarFill className="star" />
                    <p className="restaurant-rating">{rating}</p>
                  </div>
                  <p className="tags">{`${reviewsCount}+rating`}</p>
                </div>

                <hr className="hr" />
                <div>
                  <p className="restaurant-costForTwo">{costForTwo}</p>
                  <p className="tags">Cost for Two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="restaurant-details-bottom-container">
          <ul className="items-container">
            {foodItems.map(each => (
              <Items
                item={each}
                key={each.id}
                quantity={quantity}
                increment={this.increment}
                decrement={this.decrement}
                addCart={this.addCart}
              />
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  renderFailureData = () => {}

  renderDataOc = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoading()
      case apiConstants.success:
        return this.renderData()
      case apiConstants.failure:
        return this.renderFailureData()
      default:
        return null
    }
  }

  render() {
    return this.renderDataOc()
  }
}
export default RestaurantItems
