import { MoreHoriz, PlayCircleOutline } from "@mui/icons-material"
import "./Featured.scss"
import { useEffect, useState } from "react"
import axios from "axios"


const Featured = ({type, setGenre}) => { // use of props
  const [content,setContent] = useState({})
  useEffect(()=>{
    const getRandomContent = async ()=>{
      try{
        const res = await axios.get(`/movies/random?type=${type}` , {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTBjY2JhY2YwOGI4OTEwZTRiMjYyYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNjk4MTUwNSwiZXhwIjoxNzE4Mjc3NTA1fQ._MwekI5HzEghBiY-JdcNVGMzCaxucF8no2q6iqwBALc"
          }
        })
        console.log(res)
        setContent(res.data[0])
      }catch(err){
        console.log(err)
      }
    }
    getRandomContent();
  },[type])
  
  console.log(content)
  if  (!content || !content.img) {
    return <div>Loading...</div>;
  }

  return (
    <div className="featured">
      {type && ( // matlb if I am on featured of movie or series I also get to see their titles and genre to select (Home me ni h aisa)
        <div className="category">
            <span> {type === "movies"? "Movie" : "Series"}</span>

            <select name="genre" id="genre" onChange={e=> setGenre(e.target.value)}>
              <option value="">Genre</option>
              <option value="Comedy">Comedy</option>
              <option value="RomCom">RomCom</option>
              <option value="Action">Action</option>
              <option value="Thriller">Thriller</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Mystery">Mystery</option>
            </select>
        </div>
      )}
      console.log(content)
        <img src={content.img} alt=""/>

      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">
        {content.desc} 
        </span>

        <div className="buttons">
          <button className="play"> 
              <PlayCircleOutline></PlayCircleOutline>
              <span>Play</span>
          </button>

          <button className="more">
              <MoreHoriz ></MoreHoriz>
              <span>More</span>
          </button>
        </div>
      </div>
        
      
    </div>
  )
}

export default Featured