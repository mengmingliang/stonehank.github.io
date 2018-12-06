// import React from 'react';
// import { Row,Col,Icon } from 'antd';
// import {Link} from "@reach/router"
//
// const styles={fontSize:"32px",color:"#fff"}
// export default class Connect extends React.PureComponent{
//   render(){
//     const {github,mail,twitter,wechat,qq}=this.props
//     return(
//       <Row justify={"space-around"} type={"flex"}>
//         {github?<Col><Link to={github} ><Icon type="github" style={styles}  /></Link></Col>:null}
//         {mail?<Col><Link to={mail} ><Icon type="mail" style={styles} /></Link></Col>:null}
//         {/*{twitter?<Col><Link to={twitter} ><Icon type="twitter" style={styles} /></Link></Col>:null}*/}
//         {/*{wechat?<Col><Link to={wechat} ><Icon type="wechat" style={styles} /></Link></Col>:null}*/}
//         {/*{qq?<Col><Link to={qq} ><Icon type="qq" style={styles} /></Link></Col>:null}*/}
//       </Row>
//       )
//   }
// }