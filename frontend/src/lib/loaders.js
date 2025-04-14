import { defer } from "react-router-dom";
import apiReq from "./apiReq"

export const singlePageLoader = async ({request,params}) =>{
    const res = await apiReq("/posts/"+params.id)
    return res.data;
}  
export const listPageLoader = async({request,params})=>{
    //taking second part after ?
    const query = request.url.split("?")[1]
    const postPromise = apiReq("/posts?"+ query)

    // const url = new URL(request.url); // safer way to parse URL
    // const query = url.search; // includes "?" and everything after it
    // const res = await apiReq("/posts" + query); // works even if query is empty
    // return res.data;
    return defer({
        postResponse : postPromise
    })

}

export const profilePageLoader = async ({request,params}) =>{
    const postPromise = apiReq("/users/profilePosts")
    return defer({
        postResponse : postPromise
    })

}  