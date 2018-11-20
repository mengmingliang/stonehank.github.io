import React from "react";
import BookmarkContext from "../tools/BookmarkContext";

export default class BookmarkProvider extends React.Component{
  constructor(){
    super()
    this.state={
      bookmark:BookmarkContext._currentValue.bookmark
    }
    this.setBookmark=this.setBookmark.bind(this)
    this.bookmarkData={
      bookmark:this.state.bookmark,
      setBookmark:this.setBookmark
    }
  }
  setBookmark(bm) {
    if (bm === this.state.bookmark) return
    this.bookmarkData = {
      bookmark: bm,
      setBookmark: this.setBookmark
    }
    this.setState({
      bookmark: bm
    })
  }
  render(){
    // 不重复渲染的关键 {this.props.children}
    return (
      <BookmarkContext.Provider value={this.bookmarkData}>

        {this.props.children}
      </BookmarkContext.Provider>
    )
  }
}