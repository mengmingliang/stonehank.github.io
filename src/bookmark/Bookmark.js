import React, {useState, useEffect} from "react"
import {navigate} from "@reach/router";
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
    const [pathname, uniqueID, scrollHeight] = bookmark.split('-') || []
    if (!uniqueID) return
    navigate(`${pathname}/${uniqueID}/?bookmark=${scrollHeight}`)
  }

  return bookmark ?
    <div className='bookmark_get' onClick={getMark}>
      <Affix offsetTop={-20}>
        <IconBookmark style={styles.getBookmark} type="icon-bookmark"/>
      </Affix>
    </div> :
    []
}

export function SetMark({pathname,sha, setBookmark}) {
  const [ready, setStatus] = useState(false)
  useEffect(() => {
    if (sha) setStatus(true)
  }, [sha])

  function setMark() {
    if (!sha) return message.error("添加书签失败");
    let scrollHeight = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
    document.cookie = `blog_bookmark=${pathname}-${sha}-${scrollHeight};max-age=31536000 ; path=/`
    setBookmark(`${pathname}-${sha}-${scrollHeight}`)
    message.success("成功添加书签");
  }

  return ready
    ? <div className='bookmark_set ant-back-top' onClick={setMark}>
        <Icon style={styles.setBookmark} type="book" theme="filled"/>
      </div>
    : []
}


