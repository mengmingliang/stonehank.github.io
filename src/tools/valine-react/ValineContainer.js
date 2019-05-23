import React from 'react'
import ValineComponent from "./ValineComponent";
import './index.scss'
import {xssMarkdown,replaceAt,contentAtVerify,linkVerify,emailVerify,nestComment} from './utils'
import emojiData from './input/button-components/emoji/emoji.json'





export default class ValineContainer extends React.Component{

  constructor(props){
    super(props)
    this.state={
      requireName:props.requireName==null ? true : props.requireName,
      requireEmail:props.requireEmail==null ? false : props.requireEmail,
      placeholder:props.placeholder==null ? '' : props.placeholder,
      AV:props.av,
      commentList:[],
      path:props.path ? decodeURI(props.path) : decodeURI(window.location.origin+window.location.pathname),
      pageSize:props.pageSize || 10,
      curPage:1,
      commentCounts:0,
      query:null,
      emptyTxt:props.emptyTxt==null ? "还没有评论哦，快来抢沙发吧!" : props.emptyTxt,
      commentContent:'',
      toggleTextAreaFocus:false,
      previewShow:props.previewShow==null ? true : props.previewShow,
      submitBtnDisable:false,
      submitLoading:false,
      fetchInitLoading:false,
      fetchMoreLoading:false,
      submitErrorLog:null,
      nestShow:props.nestShow==null ? true : props.nestShow
    }
    // console.log(props.path ? decodeURI(props.path) : decodeURI(window.location.href))
    this.initQuery=this.initQuery.bind(this)
    this.handleReply=this.handleReply.bind(this)
    this.submitVerify=this.submitVerify.bind(this)
    this.createNewObj=this.createNewObj.bind(this)
    this.submitComment=this.submitComment.bind(this)
    this.togglePreviewShow=this.togglePreviewShow.bind(this)
    this.checkIfToggleNest=this.checkIfToggleNest.bind(this)
    this.resetDefaultComment=this.resetDefaultComment.bind(this)
    this.fetchNxtCommentList=this.fetchNxtCommentList.bind(this)
    this.commentContentOnChange=this.commentContentOnChange.bind(this)

    this.resetDefaultComment()
    this.wrapRef=React.createRef()
    this.rScrollTop=null
  }

  resetDefaultComment(){
    this.defaultComment={
      rid:'',
      mail:'',
      // emailHash:'',
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
    const {AV}=this.state
    let Ct = AV.Object.extend('Comment');
    let comment = new Ct();
    for (let i in this.defaultComment) {
      if (this.defaultComment.hasOwnProperty(i)) {
        if (i === 'at')
          continue;
        let _v = this.defaultComment[i];
        comment.set(i, _v);
      }
    }
    // import("blueimp-md5").then(obj=>{
      // let crypto=obj.default
      // comment.set('emailHash', crypto(this.defaultComment.mail.toLowerCase().trim()));
      let acl = new AV.ACL();
      acl.setPublicReadAccess(true);
      acl.setPublicWriteAccess(false);
      console.log(this.defaultComment.url)
      comment.setACL(acl);
      comment.save().then((commentItem) => {
        let commentList=this.checkIfToggleNest([commentItem])
        localStorage && localStorage.setItem('ValineCache', JSON.stringify({
          nick: this.defaultComment['nick'],
          link: this.defaultComment['link'],
          mail: this.defaultComment['mail'],
          avatarSrc:this.defaultComment['avatarSrc']
        }));
        // console.log(commentSimply)
        this.setState((prevState, props)=>({
          // commentList:commentSimply.concat(prevState.commentList),
          commentList,
          commentCounts:prevState.commentCounts+1,
          submitBtnDisable:false,
          commentContent:'',
          submitLoading:false
        }))
        if(this.rScrollTop!=null)document.documentElement.scrollTo(0,this.rScrollTop)
        this.resetDefaultComment()
      }).catch(ex => {
        console.error("Something wrong with submit!",ex)
        this.setState({
          submitBtnDisable:false,
          commentContent:'',
          // toggleTextAreaFocus:false,
          submitLoading:false
        })
      })
    // })

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
    // console.log(defaultComment)
    this.defaultComment.comment=this.state.commentContent

    let checkR=this.submitVerify()
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

      return
    }
    this.defaultComment.comment=xssMarkdown(this.defaultComment.comment)
    this.setState({
      submitBtnDisable:true,
      submitLoading:true
    },()=>{
      this.createNewObj()
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

  commentContentOnChange(event,str=''){
    let newStr=(event ? event.target.value : this.state.commentContent) +str
    newStr=newStr.replace(/:(.+?):/g, (placeholder, key) => emojiData[key] || placeholder)
    this.setState({
      commentContent:newStr
    })
  }

  handleReply(replyId,replyName){
    this.defaultComment.rid=replyId
    this.defaultComment.at=replyName
    let ele=this.wrapRef.current
    let scrTop=document.documentElement.scrollTop
    let boundTop=ele.getBoundingClientRect().top
    let reachCeilTop=ele.offsetTop || scrTop+boundTop
    this.rScrollTop=scrTop

    this.setState((prevState)=>({
      commentContent:`@${replyName} `+prevState.commentContent,
      toggleTextAreaFocus:!prevState.toggleTextAreaFocus
    }),()=>{
      document.documentElement.scrollTo(0,reachCeilTop)
    })
  }

  fetchNxtCommentList(){
    let {query,pageSize,curPage}=this.state
    if(!query)throw new Error('Something Wrong with initQuery!')
    this.setState({
      fetchMoreLoading:true
    })
    return query.notEqualTo('isSpam', true)
      .select(['nick', 'comment', 'link', 'rid', 'avatarSrc'])
      .addDescending('createdAt')
      .addDescending('createdAt')
      .limit(pageSize)
      .skip(curPage*pageSize)
      .find()
      .then(commentArr=>{
        let commentList=this.checkIfToggleNest(commentArr)
        this.setState((prevState)=>({
          // commentList:prevState.commentList.concat(newList),
          commentList,
          curPage:prevState.curPage+1,
          fetchMoreLoading:false
        }))
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
        // console.log(counts)
        commentCounts=counts
        query.notEqualTo('isSpam', true)
          .select(['nick', 'comment', 'link', 'rid', 'avatarSrc'])
          .addDescending('createdAt')
          .limit(pageSize)
          .find()
          .then(commentArr=>{
            console.log(commentArr)
            let commentList=this.checkIfToggleNest(commentArr)
            console.log(commentList)
            this.setState({
              query,
              commentList,
              commentCounts,
              fetchInitLoading:false
            })
          })
      })
  }

  checkIfToggleNest(insertArr){
    let {nestShow}=this.state
    let commentList=nestComment(insertArr,nestShow)
    console.log(commentList)
    return commentList
  }

  componentDidMount(){
    try{
      this.state.AV.init({
        appId:this.props.appId,
        appKey:this.props.appKey
      })
    }catch(err){
      // do nothing
    }

    this.initQuery()
  }




  render(){
    const {commentCounts, commentList, nestShow,requireName,requireEmail,placeholder, emptyTxt,fetchInitLoading,fetchMoreLoading,submitErrorLog, commentContent,toggleTextAreaFocus,previewShow, submitLoading, submitBtnDisable}=this.state
    return (
      <div ref={this.wrapRef} className="v">
        <ValineComponent commentCounts={commentCounts}
                         commentList={commentList}
                         placeholder={placeholder}
                         emptyTxt={emptyTxt}
                         requireName={requireName}
                         requireEmail={requireEmail}
                         nestShow={nestShow}
                         commentContent={commentContent}
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
                         fetchNxtCommentList={this.fetchNxtCommentList}
        />
      </div>
    )
  }
}