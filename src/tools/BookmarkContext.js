import {getCookie} from "../utils";
import React from "react";

let key="blog_bookmark"
let defaultData={
  bookmark:getCookie(key),
  setBookmark:()=>{}
}
const BookmarkContext=React.createContext(defaultData)

export default BookmarkContext