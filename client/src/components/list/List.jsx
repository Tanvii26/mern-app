import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import "./List.scss"
import ListItem from "../listItem/ListItem"
import { useRef, useState } from "react"

const List = ({list}) => {

  const [leftOnMove, setLeftOnMove] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const listRef = useRef() // to access element (replacement for  getElementByID)

  const handleClick = (direction)=>{
    setLeftOnMove(true)
    let distance = listRef.current.getBoundingClientRect().x - 50
    
      if(direction === "left" && slideNumber >0){
        setSlideNumber(slideNumber-1)
        // listRef.current.style.transform = `translateX(250px)` this works for single click but uske baad coz 230px already moved it wont anymore
        // so we add distance covered each time
        listRef.current.style.transform = `translateX(${distance + 230}px)`
      }
      if(direction === "right" && slideNumber<3){
        setSlideNumber(slideNumber+1)
        listRef.current.style.transform = `translateX(${-230+distance}px)`
      }
  }


  return (
    <div className="list">
        <span className="title">{list.title}</span>

        <div className="wrapper">

            <KeyboardArrowLeft className="arrow left" onClick={()=>handleClick("left")} style={{display:!leftOnMove && "none"}}></KeyboardArrowLeft>

            <div className="container" ref={listRef}>

              {list.content.map((item,i)=>(
                <ListItem index={i} item={item}></ListItem>
              ))}
                
            </div>

            <KeyboardArrowRight className="arrow right" onClick={()=>handleClick("right")}></KeyboardArrowRight>

        </div>
    </div>
  )
}

export default List