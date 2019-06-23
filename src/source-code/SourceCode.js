import React,{useState,useEffect} from 'react'
import Loading from "../share-components/Loading";
import '../css/source-code.css'

export default function SourceCode(props){
  const [contentLoading,setLoading]=useState(true)
  const [content,setContent]=useState(null)
  useEffect(()=>{
    const {sourceCodeNavSHA:sha,read_sourceCode_path}=props
    if(!sha ||content)return
    import(
      /* webpackChunkName: "sourceCode-content"*/
      `../${read_sourceCode_path}/${sha}.json`)
      .then(({default:obj})=>{
        setContent(obj.content)
        setLoading(false)
      })
      .catch(err=>{
        console.error(err)
      })
  },[props,content,props.sourceCodeNavSHA])
  return (
    contentLoading
      ? <Loading loading={contentLoading}
                 render_nums={1}
                 ske_title_width={"30%"}
                 ske_para_width={"50%"}
                 ske_para_rows={8} />
      : <div className={'source-code'} dangerouslySetInnerHTML={{__html: content}}/>
  )
}