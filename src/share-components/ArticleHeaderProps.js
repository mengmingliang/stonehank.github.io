import React from 'react'
import {Row,Col} from 'antd';
import {Link} from "@reach/router"
import TagLight from "./TagLight"
// import {linkTo} from '../routes/linkPathList'
import CustomComment from "../tools/CustomComment";


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
    const {curContentData,singleRenderPropsOnHeader,multiRenderPropsOnHeader,showComment,...props}=this.props
    // let _singleRenderPropsOnHeader
    // if(!singleRenderPropsOnHeader)
    // console.log(showComment,curContentData)
    return (
      <Row type="flex" {...props} gutter={styles.row_gutter}  style={styles.row_style}>
        { singleRenderPropsOnHeader
          ? singleRenderPropsOnHeader.map((prop,i)=>{
            // console.log(singleRenderPropsOnHeader)
            let link=prop.link,eleMode=prop.ele,tagStyle=prop.tagStyle,propVal=curContentData[prop.val],getClassName=prop.getClassName
            return (
              <Col key={i}>
                <CheckLinkWrap link={link} propVal={propVal}>
                  <CheckTagWrap eleMode={eleMode} tagStyle={tagStyle} getClassName={getClassName} propVal={propVal}>
                    <div dangerouslySetInnerHTML={{__html:propVal || "未知"}} />
                  </CheckTagWrap>
                </CheckLinkWrap>
              </Col>
            )})
          : null
        }
        { multiRenderPropsOnHeader
          ? multiRenderPropsOnHeader.map((props,i)=>{
            let link=props.link,eleMode=props.ele,tagStyle=props.tagStyle,propVal=props.val,getClassName=props.getClassName
            return (
              <Col key={i} >
                { curContentData[propVal]
                  ? curContentData[propVal].map((prop,j)=>{
                      return (
                        <CheckLinkWrap key={j} link={link} propVal={prop}>
                          <CheckTagWrap eleMode={eleMode} tagStyle={tagStyle} getClassName={getClassName} propVal={prop}>
                            <div dangerouslySetInnerHTML={{__html:prop || "未知"}} />
                          </CheckTagWrap>
                        </CheckLinkWrap>
                       )
                      })
                  : null
                }
              </Col>
             )
            })
          : null
        }
        <Col>
          {showComment
            ? <CustomComment.Count title={curContentData[showComment.title]}
                                   sha={curContentData[showComment.sha]}
                                   locationOrigin={window.location.origin} />
            : null
          }
        </Col>
      </Row>
    )
  }
}