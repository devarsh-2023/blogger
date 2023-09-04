import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../slice/posts/postSlice";


export default configureStore({
    reducer: {
        posts: postReducer
    }
})