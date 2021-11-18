import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import Items from '../Items'

const jwtToken = Cookies.get('jwt_token')
const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class RestaurantItems extends Component {
  state = {apiStatus: apiConstants.initial, restaurantItems: []}

  componentDidMount() {
    this.getItems()
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
        rating: data.example.rating,
        id: data.example.id,
        name: data.example.name,
        cuisine: data.example.cuisine,
        costForTwo: data.example.cost_for_two,
        imageUrl: data.example.image_url,
        reviewsCount: data.example.reviews_count,
        opensAt: data.example.opens_at,
        itemsCount: data.example.items_count,
        location: data.example.location,
        foodItems: data.example.food_items.map(each => ({
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
    const {restaurantItems} = this.state
    const {foodItems} = restaurantItems
    return (
      <ul>
        {foodItems.map(each => (
          <Items item={each} />
        ))}
      </ul>
    )
  }

  renderFailureData = () => {}

  renderData = () => {
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
    return this.renderData()
  }
}
export default RestaurantItems
