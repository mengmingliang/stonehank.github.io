import React,{useState,useEffect} from 'react'
import Loading from "../tools/Loading";


export default function SourceCode(props){
  const [contentLoading,setLoading]=useState(true)
  const [content,setContent]=useState(null)
  useEffect(()=>{
    const {sourceCodeNavSHA:sha}=props
    if(!sha ||content)return
    import(
      /* webpackChunkName: "sourceCode-content"*/
      `../sourceCode-asset/${sha}.json`)
      .then(({default:obj})=>{
        setContent(obj.content)
        setLoading(false)
      })
      .catch(err=>{
        console.log(err)
      })
  },[props.sourceCodeNavSHA])
  return (
    contentLoading ?
      <Loading loading={contentLoading} render_nums={1} ske_title_width={"30%"} ske_para_width={"50%"} ske_para_rows={8} /> :
      <div dangerouslySetInnerHTML={{__html: content}}/>
  )
}