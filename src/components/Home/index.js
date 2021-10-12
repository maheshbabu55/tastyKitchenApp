import {Component} from 'react'
import {BsFilterLeft, BsChevronLeft, BsChevronRight} from 'react-icons/bs'
import {Carousel} from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import HotelCard from '../HotelCard'
import Footer from '../Footer'
import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  process: 'PROCESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]
class Home extends Component {
  state = {
    offersList: [],
    hotelList: [],
    selectedSortByValue: 'Highest',
    home: true,
    cart: false,
    hotelsRender: 'initial',
    carausalApi: 'initial',
    offset: 0,
    offsetValue: 1,
  }

  componentDidMount() {
    this.getCarousal()
    this.getHotels()
  }

  getHomeColor = () => {
    this.setState({cart: false, home: true})
  }

  getCartColor = () => {
    this.setState({home: false, cart: true})
  }

  getHotels = async () => {
    this.setState({hotelsRender: apiConstants.process})
    const {selectedSortByValue, offset} = this.state
    console.log(offset)
    const url = `https://apis.ccbp.in/restaurants-list?sort_by_rating=${selectedSortByValue}&offset=${offset}&limit=9`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedList = data.restaurants.map(eachItem => ({
      id: eachItem.id,
      cuisine: eachItem.cuisine,
      imageUrl: eachItem.image_url,
      name: eachItem.name,
      rating: eachItem.user_rating.rating,
    }))
    this.setState({hotelList: updatedList, hotelsRender: apiConstants.success})
  }

  getCarousal = async () => {
    this.setState({carausalApi: apiConstants.process})
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const updatedData = data.offers.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.image_url,
    }))

    this.setState({offersList: updatedData, carausalApi: apiConstants.success})
  }

  switchCarusal = () => {
    const {carausalApi} = this.state
    switch (carausalApi) {
      case apiConstants.success:
        return this.renderCarousal()
      case apiConstants.process:
        return this.renderCarausalLooader()
      default:
        return null
    }
  }

  onIncrementOffestValue = () => {
    const {offset} = this.state
    if (offset < 26) {
      this.setState(
        prevState => ({
          offset: prevState.offset + 9,
          offsetValue: prevState.offsetValue + 1,
        }),
        this.getHotels,
      )
    } else {
      this.getHotels()
    }
  }

  onDecrementOffsetValue = () => {
    const {offset} = this.state
    if (offset > 0) {
      this.setState(
        prevState => ({
          offset: prevState.offset - 9,
          offsetValue: prevState.offsetValue - 1,
        }),
        this.getHotels,
      )
    } else {
      this.getHotels()
    }
  }

  sortByRating = event => {
    this.setState({selectedSortByValue: event.target.value}, this.getHotels)
  }

  renderCarousal = () => {
    const {offersList} = this.state

    return (
      <div className="caruselCon">
        <Carousel variant="white" pause="hover">
          {offersList.map(eachItem => (
            <Carousel.Item>
              <img
                className="d-block w-100 carouselImage"
                src={eachItem.imageUrl}
                alt="offer"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    )
  }

  renderCarausalLooader = () => (
    <div
      className="loader-container loaderEdit"
      data-testid="restaurants-offers-loader"
    >
      <Loader type="Oval" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderLooader = () => (
    <div
      className="loader-container loaderEdit"
      data-testid="restaurants-list-loader"
    >
      <Loader type="Oval" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderHotels = () => {
    const {hotelList} = this.state
    return (
      <ul className="ulHotelCardContainer">
        {hotelList.map(eachItem => (
          <HotelCard
            item={eachItem}
            key={eachItem.id}
            data-testid="restaurant-item"
          />
        ))}
      </ul>
    )
  }

  renderHotelsSwitch = () => {
    const {hotelsRender} = this.state
    switch (hotelsRender) {
      case apiConstants.success:
        return this.renderHotels()
      case apiConstants.process:
        return this.renderLooader()
      default:
        return null
    }
  }

  render() {
    const {home, cart, offsetValue} = this.state
    return (
      <div className="forMobile">
        <Header
          getHomeColor={this.getHomeColor}
          home={home}
          cart={cart}
          getCartColor={this.getCartColor}
        />
        <div className="bottonCon">
          {this.switchCarusal()}
          <div className="sortCon">
            <h1 className="popular">Popular Restaurants</h1>
            <div className="sort-Sub-con">
              <p className="sortDescription">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
              <div>
                <BsFilterLeft className="iconEdit" />
                <select className="selectEdit" onChange={this.sortByRating}>
                  {sortByOptions.map(eachItem => (
                    <option value={eachItem.value}>
                      {' '}
                      Sort by {eachItem.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mobieSortCon">
              <BsFilterLeft className="iconEdit" />
              <select className="selectEdit" onChange={this.sortByRating}>
                {sortByOptions.map(eachItem => (
                  <option value={eachItem.value}>
                    {' '}
                    Sort by {eachItem.displayText}
                  </option>
                ))}
              </select>
            </div>
            <hr />
          </div>
          {this.renderHotelsSwitch()}
          <div className="bottomArrowsCon">
            <BsChevronLeft
              className="bottomArrowIcons"
              onClick={this.onDecrementOffsetValue}
              data-testid="pagination-left-button"
            />
            <p>
              {' '}
              <span testid="active-page-number">{offsetValue}</span>of4{' '}
            </p>
            <BsChevronRight
              className="bottomArrowIcons"
              onClick={this.onIncrementOffestValue}
              data-testid="pagination-left-button"
            />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home
