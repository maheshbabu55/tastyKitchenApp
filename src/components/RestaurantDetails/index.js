import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FoodItem from '../FoodItem'
import Footer from '../Footer'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  process: 'PROCESS',
}

class RestaurantDetails extends Component {
  state = {
    hotelData: {},
    foodList: [],
    apiStatus: 'initial',
    activeFoodItemId: '',
    storeTheCartList: [],
  }

  componentDidMount() {
    this.getHotelDetails()
  }

  getHotelDetails = async () => {
    this.setState({apiStatus: apiConstants.process})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const updatedData = {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      id: data.id,
      imageUrl: data.image_url,
      name: data.name,
      location: data.location,
      rating: data.rating,
      reviewsCount: data.reviews_count,
    }

    const updatedList = data.food_items.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      rating: eachItem.rating,
      cost: eachItem.cost,
      imageUrl: eachItem.image_url,
    }))
    this.setState({
      hotelData: updatedData,
      foodList: updatedList,
      apiStatus: apiConstants.success,
    })
  }

  switchHotelDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderHotelDetails()
      case apiConstants.process:
        return this.renderLooader()
      default:
        return null
    }
  }

  renderLooader = () => (
    <div
      className="loader-container hotelDetailsLoader"
      data-testid="restaurant-details-loader"
    >
      <Loader type="Oval" color="#F7931E" height="50" width="50" />
    </div>
  )

  getfoodItemId = item => {
    const {storeTheCartList} = this.state
    this.setState(
      {
        storeTheCartList: [...storeTheCartList, item],
      },
      () => {
        localStorage.setItem('cartData', JSON.stringify(storeTheCartList))
      },
    )
  }

  renderHotelDetails = () => {
    const {hotelData, foodList} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = hotelData
    return (
      <>
        <div className="hotelDetailBanner">
          <img src={imageUrl} alt="restaurant" className="hotelImageOnBanner" />
          <div className="hotelDetailTextCon">
            <h1 className="hotelDetailTitle">{name}</h1>
            <p className="hotelDetailsCuisine">{cuisine}</p>
            <p className="hotelDetailsCuisine">{location}</p>
            <div className="hotelDetailsComplete">
              <div className="hotelDetailsBannerRatingCon">
                <div className="hotelDetailsBannerRating">
                  <BsFillStarFill className="hotelDetailsBannerStar" />
                  <p className="whiteColor">{rating}</p>
                </div>
                <p className="hotelDetailsCuisine">{reviewsCount} +Ratings</p>
              </div>
              <div>
                <div className="priceContainer">
                  <BiRupee className="hotelDetailsBannerStar" />
                  <p className="whiteColor"> {costForTwo}</p>
                </div>
                <p className="hotelDetailsCuisine">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="hotelDetailedUlCon">
          {foodList.map(eachItem => (
            <FoodItem
              item={eachItem}
              key={eachItem.id}
              getfoodItemId={this.getfoodItemId}
            />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {activeFoodItemId} = this.state

    return (
      <>
        <Header />
        <div className="hotelDetailsContainer">{this.switchHotelDetails()}</div>
        <Footer />
      </>
    )
  }
}
export default RestaurantDetails
