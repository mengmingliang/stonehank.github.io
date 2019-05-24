import React from 'react'
import ValineComponent from "./ValineComponent";
import './index.scss'
import {
  xssMarkdown,
  replaceAt,
  contentAtVerify,
  linkVerify,
  emailVerify,
  mergeNestComment,
  convert2SimplyList,
  simplyObj
} from './utils'



export default class ValineContainer extends React.Component{

  constructor(props){
    super(props)
    this.state={
      requireName:props.requireName==null ? true : props.requireName,
      requireEmail:props.requireEmail==null ? false : props.requireEmail,
      placeholder:props.placeholder==null ? '' : props.placeholder,
      AV:props.av,
      nest:props.nest==null ? true : props.nest,
      path:props.path ? decodeURI(props.path) : decodeURI(window.location.origin+window.location.pathname),
      pageSize:props.pageSize || 10,
      emptyTxt:props.emptyTxt==null ? '快来做第一个评论的人吧~' : props.emptyTxt,
      previewShow:props.previewShow==null ? true : props.previewShow,
      commentCounts:0,
      currentCounts:0,
      commentList:[],
      // commentContent:'',
      toggleTextAreaFocus:false,
      submitBtnDisable:false,
      submitLoading:false,
      fetchInitLoading:false,
      fetchMoreLoading:false,
      submitErrorLog:null
    }

    this.fetchNest=this.fetchNest.bind(this)
    this.initQuery=this.initQuery.bind(this)
    this.handleReply=this.handleReply.bind(this)
    this.submitVerify=this.submitVerify.bind(this)
    this.createNewObj=this.createNewObj.bind(this)
    this.fetchMoreNest=this.fetchMoreNest.bind(this)
    this.submitComment=this.submitComment.bind(this)
    this.togglePreviewShow=this.togglePreviewShow.bind(this)
    this.fillNxtCommentList=this.fillNxtCommentList.bind(this)
    this.resetDefaultComment=this.resetDefaultComment.bind(this)
    this.fetchNxtCommentList=this.fetchNxtCommentList.bind(this)
    // this.commentContentOnChange=this.commentContentOnChange.bind(this)

    this.resetDefaultComment()
    this.wrapRef=React.createRef()
    this.inputContainerRef=React.createRef()
    this.rScrollTop=null
    // console.log(this.inputContainerRef.current)
  }

  resetDefaultComment(){
    this.defaultComment={
      rootId:'',
      rid:'',
      mail:'',
      avatarSrc:'',
      link:'',
      comment:'',
      at:'',
      nick:'',
      url:this.state.path,
      ua:navigator.userAgent,
    }
  }

  createNewObj(){
    const {AV,nest,commentList}=this.state
    let Ct = AV.Object.extend('Comment');
    let comment = new Ct();

    for (let k in this.defaultComment) {
      if (this.defaultComment.hasOwnProperty(k)) {
        if (k === 'at')continue;
        let val = this.defaultComment[k];
        comment.set(k,val);
      }
    }
    // console.log(this.defaultComment)
    return new Promise((resolve)=>{
      if(this.defaultComment.rid===''){
        comment.save().then(item=>{
          comment.set('rootId',item.id)
          resolve()
        })
      }else{
        resolve()
      }
    }).then(()=>{
        let acl = new AV.ACL();
        acl.setPublicReadAccess(true);
        acl.setPublicWriteAccess(false);
        comment.setACL(acl);
        comment.save().then((commentItem) => {
          let simplyItem=simplyObj(commentItem)
          let newCommentList=[]
          if(nest && this.defaultComment.rid!==''){
            newCommentList=mergeNestComment(commentList,[simplyItem])
          }else{
            newCommentList=[simplyItem].concat(commentList)
          }
          localStorage && localStorage.setItem('ValineCache', JSON.stringify({
            nick: this.defaultComment['nick'],
            link: this.defaultComment['link'],
            mail: this.defaultComment['mail'],
            avatarSrc:this.defaultComment['avatarSrc']
          }));
          this.setState((prevState,)=>({
            commentList:newCommentList,
            commentCounts:prevState.commentCounts+1,
            currentCounts:prevState.currentCounts+1,
            submitBtnDisable:false,
            // commentContent:'',
            submitLoading:false
          }))
          if(this.rScrollTop!=null)document.documentElement.scrollTo(0,this.rScrollTop)
          this.resetDefaultComment()
        }).catch(ex => {
          console.error("Something wrong with submit!",ex)
          this.setState({
            submitBtnDisable:false,
            // commentContent:'',
            submitLoading:false
          })
        })
      })
  }

  togglePreviewShow(){
    this.setState((prevState)=>({
      previewShow:!prevState.previewShow
    }))
  }

  submitComment(defaultComment){
    for(let k in defaultComment){
      if(defaultComment.hasOwnProperty(k)){
        this.defaultComment[k]=defaultComment[k]
      }
    }
    // this.defaultComment.comment=this.state.commentContent
    let checkR=this.submitVerify()
    return new Promise((resolve,reject)=>{
      if(!checkR.state){
        this.setState({
          submitErrorLog:checkR.errorStr
        },()=>{
          setTimeout(()=>{
            this.setState({
              submitErrorLog:null
            })
          },2000)
        })
        reject()
      }else{
        this.defaultComment.comment=xssMarkdown(this.defaultComment.comment)
        this.setState({
          submitBtnDisable:true,
          submitLoading:true
        },()=>{
          this.createNewObj().then(()=>{
            resolve()
          })
        })
      }
    })

  }

  submitVerify(){
    const {requireName,requireEmail}=this.state
    const {nick,mail,comment,link,at,rid}=this.defaultComment
    let errorStr='',state=false
    if(comment==='')errorStr='内容不能为空！'
    else if(requireName && nick.trim()==='')errorStr='昵称为必填项！'
    else if(requireEmail && mail.trim()==='')errorStr='email为必填项！'
    else if(mail.trim()!=='' && !emailVerify(mail))errorStr='email格式错误！'
    else if(link.trim()!=='' && !linkVerify(link))errorStr='网址格式错误！请以http/https开头'
    else if(at!=='' && rid!==''){
      if(!contentAtVerify(comment,at)){
        this.defaultComment.rid=''
        this.defaultComment.at=''
      }else{
        this.defaultComment.comment=replaceAt(comment,rid)
      }
      state=true
    } else state=true
    return {state,errorStr}
  }

  // commentContentOnChange(event,str=''){
  //   let newStr=(event ? event.target.value : this.state.commentContent) +str
  //   newStr=newStr.replace(/:(.+?):/g, (placeholder, key) => emojiData[key] || placeholder)
  //   this.setState({
  //     commentContent:newStr
  //   })
  // }

  handleReply(replyId,replyName,rootId){
    this.defaultComment.rid=replyId
    this.defaultComment.at=replyName
    this.defaultComment.rootId=rootId
    let ele=this.wrapRef.current
    let scrTop=document.documentElement.scrollTop
    let boundTop=ele.getBoundingClientRect().top
    let reachCeilTop=ele.offsetTop || scrTop+boundTop
    if(this.state.nest){
      this.rScrollTop=scrTop
    }
    let inputContainer= this.inputContainerRef.current
    if(!inputContainer){
      setTimeout(()=>{
        inputContainer.commentContentOnChange(null,`@${replyName} `)
      },0)
    }else{
      inputContainer.commentContentOnChange(null,`@${replyName} `)
    }

    this.setState((prevState)=>({
      // commentContent:`@${replyName} `+prevState.commentContent,
      toggleTextAreaFocus:!prevState.toggleTextAreaFocus
    }),()=>{
      document.documentElement.scrollTo(0,reachCeilTop)
    })
  }

  fillNxtCommentList(){
    if(this.state.nest){
      this.fetchMoreNest()
    }else{
      this.fetchNxtCommentList()
    }
  }

  fetchNxtCommentList(){
    const {AV,currentCounts,pageSize,commentCounts}=this.state
    let query=new AV.Query('Comment')
    if(currentCounts===commentCounts)return
    this.setState({
      fetchMoreLoading:true
    })
    return query
      .select(['nick', 'comment', 'link', 'rid', 'avatarSrc','rootId'])
      .skip(currentCounts)
      .limit(pageSize)
      .addDescending('createdAt')
      .find()
      .then(commentArr=>{
        if(commentArr.length===0){
          this.setState({
            fetchMoreLoading:false
          })
        }else{
          let insertList=convert2SimplyList(commentArr)
          this.setState((prevState)=>({
            commentList:prevState.commentList.concat(insertList),
            currentCounts:prevState.currentCounts+commentArr.length,
            fetchMoreLoading:false
          }))
        }
        query=null
      })
  }

  fetchMoreNest(){
    let contains=[],simplyList=[]
    let {AV,path,pageSize,currentCounts,commentList,commentCounts}=this.state
    let newCurrentCounts=0
    if(currentCounts===commentCounts)return
    this.setState({
      fetchMoreLoading:true
    })
    let query1= new AV.Query('Comment'),query2= new AV.Query('Comment')
    query1.matches('url',new RegExp(`${path.replace(/\//g,'\\/')}\\/?`))
      .equalTo('rid','')
      .addDescending('createdAt')
      .skip(commentList.length)
      .limit(pageSize)
      .select(['nick', 'comment', 'link', 'rid', 'avatarSrc','rootId'])
      .find()
      .then(items=>{
        if(items.length===0){
          this.setState({
            fetchMoreLoading:false
          })
          return
        }
        newCurrentCounts+=items.length
        for(let obj of items){
          simplyList.push(simplyObj(obj))
          contains.push(obj.get('rootId'))
        }
        query2.matches('url',new RegExp(`${path.replace(/\//g,'\\/')}\\/?`))
          .notEqualTo('rid','')
          .containedIn('rootId',contains)
          .addAscending('createdAt')
          .find()
          .then(items=>{
            newCurrentCounts+=items.length
            let simplyItems=[]
            for(let obj of items)simplyItems.push(simplyObj(obj))
            let newCommentList=mergeNestComment(simplyList,simplyItems)
            this.setState({
              commentList:commentList.concat(newCommentList),
              currentCounts:currentCounts+newCurrentCounts,
              fetchInitLoading:false,
              fetchMoreLoading:false
            })
            query1=null
            query2=null
          })
      })
  }

  fetchNest(){
    let contains=[],simplyList=[],commentList=[]
    let {path,AV,pageSize}=this.state
    let query1 =new AV.Query('Comment'),
      query2=new AV.Query('Comment'),
      query3=new AV.Query('Comment')
    let commentCounts=0
    let currentCounts=0
    this.setState({
      fetchInitLoading:true
    })
    query1.matches('url',new RegExp(`${path.replace(/\//g,'\\/')}\\/?`))
      .count()
      .then(counts=>{
        commentCounts=counts
        if(commentCounts===0){
          this.setState({
            fetchInitLoading:false
          })
          return
        }
        query2.matches('url',new RegExp(`${path.replace(/\//g,'\\/')}\\/?`))
          .equalTo('rid','')
          .limit(pageSize)
          .select(['nick', 'comment', 'link', 'rid', 'avatarSrc','rootId'])
          .addDescending('createdAt')
          .find()
          .then(items=>{
            currentCounts+=items.length
            for(let obj of items){
              simplyList.push(simplyObj(obj))
              contains.push(obj.get('rootId'))
            }
            query3.matches('url',new RegExp(`${path.replace(/\//g,'\\/')}\\/?`))
              .notEqualTo('rid','')
              .containedIn('rootId',contains)
              .select(['nick', 'comment', 'link', 'rid', 'avatarSrc','rootId'])
              .addAscending('createdAt')
              .find()
              .then(items=>{
                console.log(items)
                currentCounts+=items.length
                let simplyItems=[]
                for(let obj of items)simplyItems.push(simplyObj(obj))
                commentList=mergeNestComment(simplyList,simplyItems)
                this.setState({
                  commentList,
                  commentCounts,
                  currentCounts,
                  fetchInitLoading:false,
                  fetchMoreLoading:false
                })
                query1=null
                query2=null
                query3=null
              })
          })
      })

  }


  initQuery(){
    let {path,AV,pageSize}=this.state
    let query =new AV.Query('Comment')
    let commentCounts=0
    this.setState({
      fetchInitLoading:true
    })
    return query.matches('url',new RegExp(`${path.replace(/\//g,'\\/')}\\/?`))
      .count()
      .then(counts=>{
        commentCounts=counts
        if(commentCounts===0){
          this.setState({
            fetchInitLoading:false
          })
          return
        }
        query.select(['nick', 'comment', 'link', 'rid', 'avatarSrc','rootId'])
          .addDescending('createdAt')
          .limit(pageSize)
          .find()
          .then(commentArr=>{
            let commentList=convert2SimplyList(commentArr)
              this.setState({
                query,
                commentList,
                commentCounts,
                currentCounts:pageSize,
                fetchInitLoading:false,
                fetchMoreLoading:false
              })
            query=null
          })
      })
  }


  componentDidMount(){
    // console.log(this.inputContainerRef.current)
    if(!this.state.AV)return
    try{
      this.state.AV.init({
        appId:this.props.appId,
        appKey:this.props.appKey
      })
    }catch(err){
      // do nothing
    }
    if(this.state.nest){
      this.fetchNest()
    }else{
      this.initQuery()
    }

  }


  render(){
    const {commentCounts,currentCounts, commentList, nest,requireName,requireEmail,placeholder, emptyTxt,fetchInitLoading,fetchMoreLoading,submitErrorLog,toggleTextAreaFocus,previewShow, submitLoading, submitBtnDisable}=this.state
    return (
      <div ref={this.wrapRef} className="v">
        <ValineComponent inputContainerRef={this.inputContainerRef}
                         commentCounts={commentCounts}
                         currentCounts={currentCounts}
                         commentList={commentList}
                         placeholder={placeholder}
                         emptyTxt={emptyTxt}
                         requireName={requireName}
                         requireEmail={requireEmail}
                         nest={nest}
                         // commentContent={commentContent}
                         toggleTextAreaFocus={toggleTextAreaFocus}
                         previewShow={previewShow}
                         submitLoading={submitLoading}
                         fetchInitLoading={fetchInitLoading}
                         fetchMoreLoading={fetchMoreLoading}
                         submitBtnDisable={submitBtnDisable}
                         submitErrorLog={submitErrorLog}
                         togglePreviewShow={this.togglePreviewShow}
                         submitComment={this.submitComment}
                         handleReply={this.handleReply}
                         commentContentOnChange={this.commentContentOnChange}
                         fillNxtCommentList={this.fillNxtCommentList}
        />
      </div>
    )
  }
}