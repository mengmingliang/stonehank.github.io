import React from 'react'
import AvatarComponent from "./AvatarComponent";


export default class AvatarContainer extends React.PureComponent{

  constructor(props){
    super(props)
    this.state={
      showList:false,
      showMark:false,
      emailHash:''
    }
    this.turnOnMark=this.turnOnMark.bind(this)
    this.turnOffMark=this.turnOffMark.bind(this)
    this.toggleShowList=this.toggleShowList.bind(this)
    this.checkIfClose=this.checkIfClose.bind(this)
    this.handleAvatarOnChange=this.handleAvatarOnChange.bind(this)
  }

  turnOnMark(){
    this.setState({
      showMark:true
    })
  }
  turnOffMark(){
    this.setState({
      showMark:false
    })
  }


  toggleShowList(){
    const {email}=this.props
    const prevShowList=this.state.showList
    if(!prevShowList){
      import("blueimp-md5").then(obj=> {
        let crypto = obj.default
        this.setState({
          emailHash:crypto(email.toLowerCase().trim()),
          showList:!prevShowList
        })
      })
    }else{
      this.setState({
        showList:!prevShowList
      })
    }
  }

  handleAvatarOnChange(event){
    const {avatarOnChange}=this.props
    avatarOnChange(event)
      .then(()=>{
      this.setState({
        showList:false
      })
    }).catch(()=>{

      })
  }
  checkIfClose(event){
    if(!event)return
    console.log(event.target)
    if(event && typeof event.target.className==="string" && !event.target.className.includes("vavatars-select")){
      this.setState({
        showList:false
      })
    }
  }


  componentDidMount(){
    document.addEventListener('click',this.checkIfClose)
  }
  componentWillUnmount(){
    document.removeEventListener('click',this.checkIfClose)
  }


  render(){
    const {showList,emailHash,showMark}=this.state
    const {avatarSrc,GRAVATAR_URL}=this.props
    return <AvatarComponent showList={showList}
                            emailHash={emailHash}
                            showMark={showMark}
                            GRAVATAR_URL={GRAVATAR_URL}
                            avatarSrc={avatarSrc}
                            turnOffMark={this.turnOffMark}
                            turnOnMark={this.turnOnMark}
                            avatarOnChange={this.handleAvatarOnChange}
                            toggleShowList={this.toggleShowList}
    />
  }
}
