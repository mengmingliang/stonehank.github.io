import React from 'react'
import {Row,Col} from 'antd';
import {Link} from "@reach/router"
import TagLight from "../share-components/TagLight"
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
      ? <TagLight tagStyle={tagStyle} className={getClassName(propVal)}>
          {props.children}
        </TagLight>
      : <div>
          {props.children}
        </div>
  )
}

export default class ArticleHeaderProps extends React.Component{

  render(){
    const {curContentData,singleRenderProps,multiRenderProps,showComment,...props}=this.props

    return (
      <Row type="flex" {...props} gutter={styles.row_gutter}  style={styles.row_style}>
        { singleRenderProps.map((prop,i)=>{
          let link=prop.link,eleMode=prop.ele,tagStyle=prop.tagStyle,propVal=prop.val,getClassName=prop.getClassName
          return (
            <Col key={i}>
              <CheckLinkWrap link={link} propVal={curContentData[propVal]}>
                <CheckTagWrap eleMode={eleMode} tagStyle={tagStyle} getClassName={getClassName} propVal={propVal}>
                  <div dangerouslySetInnerHTML={{__html:curContentData[propVal] || "未知"}} />
                </CheckTagWrap>
              </CheckLinkWrap>
            </Col>
          )
        })}
        {multiRenderProps.map((props,i)=>{
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
        })}
        <Col>
          {showComment
            ? <CustomComment.Count title={showComment.title}
                                   sha={showComment.sha }
                                   locationOrigin={window.location.origin} />
            : null
          }
        </Col>
      </Row>
    )
  }
}