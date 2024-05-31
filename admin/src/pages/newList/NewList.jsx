import { useContext, useState } from "react";
import "./newList.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from '../../context/movieContext/MovieContext'
import { ListContext } from '../../context/listContext/ListContext'
import { useEffect } from "react";
import { createLists } from "../../context/listContext/apiCalls";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export default function NewList() {

  const [list, setList] = useState(null)
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext)
  const { dispatch } = useContext(ListContext)
  const history = useHistory()

  useEffect(()=>{
    getMovies(dispatchMovie)
  },[dispatchMovie])


  const handleChange = (e) => {
    const value = e.target.value
    setList({ ...list, [e.target.name]: value })
  }

  
  const handleSelect = (e) => {
    const selected = e.target.selectedOptions
    let value = Array.from(selected, (option)=> option.value)
    setList({...list, [e.target.name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createLists(list, dispatch).then(() => {
      window.location.reload();
    }).catch((err) => {
      console.log(err)
    })
    history.push("/lists")
  }


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm outer">

        <div className="two left">
          <div className="addProductItem">
            <label>List Title</label>
            <input classname="in" type="text" placeholder="Best Comedy Series" name="title" onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input classname="in" type="text" placeholder="Comedy" name="genre" onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select classname="in" name="type" id="type" onChange={handleChange}>
              <option >Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>

        <div className="addProductItem right">
          <label>Content</label>
          <select multiple classname="in" name="content" id="isSeries" onChange={handleSelect}>
            {movies.map((movie) => (

              <option key={movie._id} value={movie._id}>{movie.title}</option>
            ))}
          </select>

        <button className="addProductButton final" onClick={handleSubmit}>Create</button>
        </div>

      </form>
    </div>
  );
}
