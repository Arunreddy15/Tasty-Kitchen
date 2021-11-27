import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsFilterLeft, BsFillStarFill, BsSearch} from 'react-icons/bs'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Navbar from '../Navbar'
import Footer from '../Footer'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 1,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const jwtToken = Cookies.get('jwt_token')

class Home extends Component {
  state = {
    activePage: 1,
    limit: 9,
    offset: 0,
    apiStatus: apiStatusConstants.initial,
    offerImages: [],
    restaurants: [],
    selectedSortByValue: '',
    totalHotels: 0,
    offerLoader: false,
    searchInput: '',
  }

  componentDidMount() {
    this.getData()
    this.getOffersImages()
  }

  onClickSearch = () => {
    // const {restaurants, searchInput} = this.setState
    // const rest = restaurants.filter(each => each.includes(searchInput))
    // this.setState({restaurants: rest})
    this.getData()
  }

  getOffersImages = async () => {
    this.setState({offerLoader: true})
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const offersUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const offers = await fetch(offersUrl, options)
    const offersImages = await offers.json()
    if (offers.ok === true) {
      const offerObject = offersImages.offers.map(each => ({
        imageUrl: each.image_url,
        id: each.id,
      }))
      this.setState({offerImages: offerObject, offerLoader: false})
    }
  }

  getData = async () => {
    const {selectedSortByValue, offset, limit, searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/restaurants-list/?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    const data = await response.json()
    console.log(data)
    const {total} = data
    if (response.ok === true) {
      const restaurantsObject = data.restaurants.map(each => ({
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        id: each.id,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        userRating: {
          rating: each.user_rating.rating,
          ratingText: each.user_rating.rating_text,
          ratingColor: each.user_rating.rating_color,
          totalReviews: each.user_rating.total_reviews,
        },
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        restaurants: restaurantsObject,
        totalHotels: total,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearch = event => this.setState({searchInput: event.target.value})

  onChangeSort = event =>
    this.setState({selectedSortByValue: event.target.value}, this.getData)

  onDecrease = () => {
    const {activePage, limit} = this.state
    const offset = (activePage - 1) * limit

    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
          offset,
        }),
        this.getData,
      )
    }
  }

  onIncrease = () => {
    const {activePage, limit, totalHotels} = this.state
    const offset = (activePage - 1) * limit
    console.log(offset)
    if (activePage < Math.ceil(totalHotels / limit) + 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
          offset,
        }),
        this.getData,
      )
    }
  }

  renderRestaurants = () => {
    const {restaurants} = this.state
    return (
      <ul className="restaurants-list">
        {restaurants.map(each => (
          <li key={each.id} testid="restaurant-item">
            <Link to={`restaurant/${each.id}`} className="item-link">
              <img src={each.imageUrl} alt="restaurant" className="rest-img" />
              <div className="restaurants-list-details-container">
                <h1 className="restaurant-name">{each.name}</h1>
                <p className="restaurant-cuisine">{each.cuisine}</p>
                <div className="rating-container">
                  <BsFillStarFill className="rate-star" />
                  <p className="rating">
                    {each.userRating.rating}

                    <span>{`(${each.userRating.totalReviews} ratings)`}</span>
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div className="loader-container" testid="restaurants-list-loader">
      <Loader type="Circles" color="#f7931e" height="40" width="50" />
    </div>
  )

  renderData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      case apiStatusConstants.success:
        return this.renderRestaurants()
      default:
        return null
    }
  }

  render() {
    const {
      offerImages,
      activePage,
      totalHotels,
      limit,
      offerLoader,
      searchInput,
    } = this.state

    const settings = {
      dots: true,
    }
    return (
      <div>
        <Navbar />
        <div className="home-container">
          <div className="home-content">
            {offerLoader ? (
              <div
                className="loader-container"
                testid="restaurants-offers-loader"
              >
                <Loader
                  type="ThreeDots"
                  color="#f7931e"
                  height="40"
                  width="50"
                />
              </div>
            ) : (
              <div className="carousel-container">
                <Slider {...settings}>
                  {offerImages.map(each => (
                    <div key={each.id}>
                      <img
                        src={each.imageUrl}
                        alt="offer"
                        className="carousel"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            )}
            <div>
              <h1 className="home-heading">Popular Restaurant</h1>
              <div className="text-filter">
                <p className="home-tag-text">
                  Select your favorite restaurant special dish and make your day
                  happy..
                </p>
                <div className="filter">
                  <BsFilterLeft size={22} className="icon" />
                  <span>Sort by</span>
                  <select onChange={this.onChangeSort}>
                    {sortByOptions.map(each => (
                      <option key={each.id} value={each.displayText}>
                        {each.displayText}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <hr />
              <div>
                <div className="search-input-box">
                  <input
                    type="search"
                    placeholder="Enter restaurant name"
                    onChange={this.onChangeSearch}
                    value={searchInput}
                  />
                  <BsSearch
                    className=""
                    size={22}
                    onClick={this.onClickSearch}
                  />
                </div>
                {this.renderData()}
                <div className="pagination">
                  <button type="button" onClick={this.onDecrease}>
                    <AiOutlineLeft size={20} testid="pagination-left-button" />
                  </button>

                  <p>
                    <span testid="active-page-number">{activePage}</span> of
                    {Math.ceil(totalHotels / limit) + 1}
                  </p>
                  <button type="button" onClick={this.onIncrease}>
                    <AiOutlineRight
                      size={20}
                      testid="pagination-right-button"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home
