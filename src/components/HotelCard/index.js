import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const HotelCard = props => {
  const {item} = props
  const {imageUrl, name, cuisine, rating, id} = item
  return (
    <Link to={`/restaurant/${id}`} className="hotelCardLink">
      <li className="listHotelCard">
        <img src={imageUrl} alt="restaurant" className="restaurantImage" />
        <div className="hotelDetails">
          <h1 className="hotelName">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="ratingCon">
            <BsFillStarFill className="starIcon" />
            <p className="ratingNum">{rating}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default HotelCard
