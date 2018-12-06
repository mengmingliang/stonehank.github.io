import {getCookie} from "../utils/index";
import React from "react";

let key="blog_bookmark"
let defaultData={
  bookmark:getCookie(key),
  setBookmark:()=>{}
}
const BookmarkContext=React.createContext(defaultData)

export default BookmarkContext