import axios from "axios"
import { createListsFailure, createListsStart, createListsSuccess, deleteListsFailure, deleteListsStart, deleteListsSuccess, getListsFailure, getListsStart, getListsSuccess } from "./ListActions"

export const getLists = async (dispatch) => {
    dispatch(getListsStart())
    try {
        const res = await axios.get("/lists", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(getListsSuccess(res.data))
    } catch (err) {
        dispatch(getListsFailure())
    }
}

export const createLists = async (lists,dispatch)=>{
    dispatch(createListsStart())
    try{
        const res = await axios.post("/lists", lists, {
            headers: {
                token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(createListsSuccess(res.data))
    }catch(err){
        dispatch(createListsFailure())
    }
}


export const deleteLists = async (id, dispatch) => {
    dispatch(deleteListsStart())
    try {
        await axios.delete("/lists/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(deleteListsSuccess(id))
    } catch (err) {
        dispatch(deleteListsFailure())
    }
}
