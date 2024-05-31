import { ArrowBackOutlined } from "@mui/icons-material"
import "./Watch.scss"
import { Link, useLocation } from "react-router-dom"

const Watch = () => {
  const location = useLocation();
  const {movie} = location.state;
  console.log(location);
  return (
    <div className='watch'>
      <Link to="/">
        <div className="back">
            <ArrowBackOutlined></ArrowBackOutlined>
            Home
        </div>
      </Link>

        <video src={movie.trailer}  
          className="video"  autoPlay progress controls></video>
        
    </div>
  )
}

export default Watch