import React, {useState, useEffect} from "react"
import {navigate} from "@reach/router";
import {linkTo} from "../routes/linkPathList";
import {Icon, Affix, message} from 'antd';

const styles = {
  setBookmark: {fontSize: "1.2rem", margin: "auto", color: "#fff"},
  getBookmark: {fontSize: "1.5rem"},
}

const IconBookmark = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_866706_1d7l2oirt61.js',
});


export function GetMark({bookmark}) {
  function getMark() {
    const [articleSha, scrollHeight] = bookmark.split('-') || []
    if (!articleSha) return
    navigate(`${linkTo.articles}/${articleSha}/?bookmark=${scrollHeight}`)
  }

  return bookmark ?
    <div className='bookmark_get' onClick={getMark}>
      <Affix offsetTop={-20}>
        <IconBookmark style={styles.getBookmark} type="icon-bookmark"/>
      </Affix>
    </div> :
    []
}

export function SetMark({sha, setBookmark}) {
  const [ready, setStatus] = useState(false)
  useEffect(() => {
    if (sha) setStatus(true)
  }, [sha])

  function setMark() {
    if (!sha) return message.error("添加书签失败");
    let scrollHeight = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
    document.cookie = `blog_bookmark=${sha}-${scrollHeight};max-age=31536000 ; path=/`
    setBookmark(`${sha}-${scrollHeight}`)
    message.success("成功添加书签");
  }

  return ready
    ? <div className='bookmark_set ant-back-top' onClick={setMark}>
        <Icon style={styles.setBookmark} type="book" theme="filled"/>
      </div>
    : []
}


