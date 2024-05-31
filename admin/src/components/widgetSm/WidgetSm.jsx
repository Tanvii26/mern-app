import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios"

export default function WidgetSm() {

  const [newUser, setNewUser] = useState([])
 
  useEffect(() => {
    const getNewUser = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGQwZTNmMmYyMDZjZmIzMTBmNmQ1NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMDY1Mzk5OSwiZXhwIjoxNzExOTQ5OTk5fQ.q1_Pc9KF4AW-Nkh4c5ChSa3M9L9ENUHXFhjX926Rw30"
          }
        })

        setNewUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getNewUser()
  }, [])


  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">

        {newUser.map(user => (

          <li className="widgetSmListItem">
            <img
              src={user.profilePic || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/72cd29df-61f1-4fd7-90b9-169bce5856cf/de3z61y-6fa5c84e-6274-4628-911e-677ffcafe545.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcyY2QyOWRmLTYxZjEtNGZkNy05MGI5LTE2OWJjZTU4NTZjZlwvZGUzejYxeS02ZmE1Yzg0ZS02Mjc0LTQ2MjgtOTExZS02NzdmZmNhZmU1NDUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Ra6gfXjbzaF173aqO9vqUlVtQd-L8GQRKK60_6UY-2Y"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>

        ))}

      </ul>
    </div>
  );
}
