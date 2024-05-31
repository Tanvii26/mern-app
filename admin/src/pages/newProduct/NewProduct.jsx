import { useContext, useState } from "react";
import "./newProduct.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import {MovieContext} from '../../context/movieContext/MovieContext'

export default function NewProduct() {

  // useState 1 for all text, each for file 
  const [movie, setMovie] = useState(null)
  const [img, setImg] = useState(null)
  const [imgTitle, setImgTitle] = useState(null)
  const [imgSlider, setImgSlider] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [video, setVideo] = useState(null)
  const [uploads, setUploads] = useState(0)
  const {dispatch} = useContext(MovieContext)

  const handleChange = (e)=>{
    const value = e.target.value
    setMovie({...movie, [e.target.name]:value})
  }

  const upload = (items)=>{
    items.forEach(item => {
      if(item.file){
      const fileName = item.label + " " + item.file.name;
      const storageRef = ref(storage, `/items/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, item.file)

      uploadTask.on(
        "state_changed",
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log(progress)
        },
        (err)=>{
          console.log(err)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
            setMovie((prev)=>({...prev, [item.label]:url}))
            setUploads((prev)=> prev+1)
          })
        }
      )
    }else{
      window.alert("File not uploaded")
    }
    });
  }

  const handleUpload = (e)=>{
    e.preventDefault();
    upload([
      {file:img, label:"img"},
      {file:imgTitle, label:"imgTitle"},
      {file:imgSlider, label:"imgSlider"},
      {file:trailer, label:"trailer"},
      {file:video, label:"video"},
    ])
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    createMovie(movie,dispatch).then(()=>{
      window.location.reload();
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="one">
          <div className="addProductItem">
            <label>Image</label>
            <input 
              classname="in" 
              type="file" 
              id="img" 
              name="img"
              onChange={(e)=> setImg(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Title Image</label>
            <input 
              classname="in" 
              type="file" 
              id="imgTitle" 
              name="imgTitle"
              onChange={(e)=> setImgTitle(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Thumbnail Image</label>
            <input 
              classname="in" 
              type="file" 
              id="imgSlider" 
              name="imgSlider"
              onChange={(e)=> setImgSlider(e.target.files[0])}
            />
          </div>
        </div>

        <div className="two">
          <div className="addProductItem">
            <label>Title</label>
            <input classname="in" type="text" placeholder="3 Idiots" name="title" onChange={handleChange}/>
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input classname="in" type="text" placeholder="Text" name="desc" onChange={handleChange}/>
          </div>
          <div className="addProductItem">
            <label>Year</label>
            <input classname="in" type="text" placeholder="2012" name="year" onChange={handleChange}/>
          </div>
        </div>

        <div className="three">
          <div className="addProductItem">
            <label>Age Limit</label>
            <input type="text" placeholder="14+" name="limit" onChange={handleChange}/>
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input type="text" placeholder="Comedy-Drama" name="genre" onChange={handleChange}/>
          </div>
          <div className="addProductItem">
            <label>is Series?</label>
            <select classname="in" name="isSeries" id="isSeries" onChange={handleChange}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>

        <div className="four">
          <div className="addProductItem">
            <label>Trailer</label>
            <input 
              classname="in" 
              type="file" 
              onChange={(e)=> setTrailer(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Video</label>
            <input 
              classname="in" 
              type="file" 
              onChange={(e)=> setVideo(e.target.files[0])}
            />
          </div>
        </div>
        { 
          uploads === 5 ? <button className="addProductButton final" onClick={handleSubmit}>Create</button>
          : <button className="addProductButton" onClick={handleUpload}>Upload</button>
        }
      </form>
    </div>
  );
}
