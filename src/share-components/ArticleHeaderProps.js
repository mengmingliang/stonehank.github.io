import React from 'react'
import {Row,Col} from 'antd';
import {Link} from "@reach/router"
import TagLight from "./TagLight"
import {ValineCount,ValinePageview} from "react-valine";


const styles={
  row_gutter:{ xs: 4, sm: 8, md: 16,lg:24},
  row_style:{fontWeight: 500}
}

function CheckLinkWrap(props){
  const {link,propVal}=props
  return(
    typeof link==="function"
      ? <Link to={link(propVal)}>
          {props.children}
        </Link>
      : <div>
          {props.children}
        </div>
  )
}

function CheckTagWrap(props){
  const {eleMode,tagStyle,getClassName,propVal}=props
  return(
    eleMode==="tag"
      ? <TagLight tagStyle={tagStyle} className={getClassName?getClassName(propVal):''}>
          {props.children}
        </TagLight>
      : <div>
          {props.children}
        </div>
  )
}

export default class ArticleHeaderProps extends React.Component{


  render(){
    const {curContentData,oneRow,singleRenderPropsOnHeader,multiRenderPropsOnHeader,showComment,showPageview,title,...props}=this.props

    // console.log(curContentData)
    return (
      <Row type="flex" {...props} gutter={styles.row_gutter}  style={styles.row_style}>
        { singleRenderPropsOnHeader
          ? <div style={oneRow ? {display:'flex',flexBasis:100} : {display:'flex',flexFlow:'row'}}>
            {
              singleRenderPropsOnHeader.map((prop,i)=>{
                let link=prop.link,eleMode=prop.ele,tagStyle=prop.tagStyle,propVal=curContentData[prop.val],getClassName=prop.getClassName
                return (
                  <Col key={i}>
                    <CheckLinkWrap link={link} propVal={propVal}>
                      <CheckTagWrap eleMode={eleMode} tagStyle={tagStyle} getClassName={getClassName} propVal={propVal}>
                        {/*<div dangerouslySetInnerHTML={{__html:propVal || "未知"}} />*/}
                        {propVal || "未知"}
                      </CheckTagWrap>
                    </CheckLinkWrap>
                  </Col>
                )})
            }
            </div>
          : null
        }
        { multiRenderPropsOnHeader
          ? <div style={ oneRow
            ?{display:'flex',flex:3,justifyContent:'space-between'}
            :{display:'flex',flexFlow:'row',justifyContent:'start'}
          }>
            {
              multiRenderPropsOnHeader.map((props,i)=>{
                let link=props.link,eleMode=props.ele,tagStyle=props.tagStyle,propVal=props.val,getClassName=props.getClassName
                // console.log(propVal,curContentData[propVal])
                let contentDataProp=curContentData[propVal]
                contentDataProp=contentDataProp
                  ? Array.isArray(contentDataProp)
                    ? contentDataProp
                    : [contentDataProp]
                  : null
                return (
                  <Col key={i} style={oneRow ?{flex:1} : null}>
                    { contentDataProp
                      ? contentDataProp.map((prop,j)=>{
                        return (
                          <CheckLinkWrap key={j} link={link} propVal={prop}>
                            <CheckTagWrap eleMode={eleMode} tagStyle={tagStyle} getClassName={getClassName} propVal={prop}>
                              {/*<div dangerouslySetInnerHTML={{__html:prop || "未知"}} />*/}
                              {prop || "未知"}
                            </CheckTagWrap>
                          </CheckLinkWrap>
                        )
                      })
                      : null
                    }
                  </Col>
                )
              })
            }
            </div>
          : null
        }
        { showComment
          ? <Col>
              评论数：<ValineCount uniqStr={window.location.origin+"__uniq__"+curContentData[showComment.sha]}/>
            </Col>
          : null
        }
        { showPageview
          ?  <Col>
              浏览量：<ValinePageview uniqStr={window.location.origin+"__uniq__"+curContentData[showComment.sha]} title={title}/>
             </Col>
          : null
        }
      </Row>
    )
  }
}