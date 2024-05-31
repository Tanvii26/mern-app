import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import './ListItem.scss'
import { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
const ListItem = ({ index, item }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({})
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTBjY2JhY2YwOGI4OTEwZTRiMjYyYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNjU3MTQ0OSwiZXhwIjoxNzE3ODY3NDQ5fQ.pn7vpW54nQ5JkrbE9nn1Syi6R0DQ11H_XL31t6Sq1A0"
          }
        })
        setMovie(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMovie()
  }, [item])

  if  (!movie || !movie.img) {
    return <div>Loading...</div>;
  }


  return (
    <Link to="/watch" state={{movie}} >
      <div className='listItem'
        style={{ left: isHovered && index <= 0 ? 50 : index * 225 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        <img src={movie.img} alt="" />

        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop></video>

            <div className="info">

              <div className="icons">
                <PlayArrow className='icon'></PlayArrow>
                <Add className='icon'></Add>
                <ThumbUpAltOutlined className='icon'></ThumbUpAltOutlined>
                <ThumbDownAltOutlined className='icon'></ThumbDownAltOutlined>
              </div>


              <div className="infoTop">
                <span>{movie.duration}</span>
                <span className='limit'>{movie.limit}+</span>
                <span>{movie.year}</span>
              </div>

              <div className="desc">
                {movie.desc}
              </div>

              <div className="genre">
                {movie.genre}
              </div>
            </div>
          </>
        )}

      </div>
    </Link>
  )
}

export default ListItem