import "./Home.scss"
import Navbar from "../../components/navbar/Navbar"
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios"
/* Axios is a promise-based HTTP library that lets developers make requests to either their own or a third-party server to fetch data */

const Home = ({ type }) => {

  const [lists, setLists] = useState([])
  const [genre, setGenre] = useState(null)
  // useEffect -> lets u sync a component with an external system
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTBjY2JhY2YwOGI4OTEwZTRiMjYyYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNjk4MTUwNSwiZXhwIjoxNzE4Mjc3NTA1fQ._MwekI5HzEghBiY-JdcNVGMzCaxucF8no2q6iqwBALc"
          }
        })
        // console.log(res)
        setLists(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getRandomLists()
  }, [type, genre])
  return (
    <div className="home">
      <Navbar></Navbar>
      <Featured type={type} setGenre={setGenre}></Featured>
      {lists.map((list) => (
        <List list={list}></List>
      ))}

    </div>
  );
};

export default Home;