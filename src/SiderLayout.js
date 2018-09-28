import React from 'react';
import { Card,Skeleton,Avatar, Pagination,Layout,Menu, Breadcrumb, Icon,Affix,Row,Col } from 'antd';

// const SubMenu = Menu.SubMenu;
// import verticalLoose from "./nav-menu/verticalLoose"

const { Header, Content, Footer, Sider } = Layout;
const {Meta}=Card
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8}} />
    {text}
  </span>
);
// const MenuItem=verticalLoose(Menu.Item)
function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a>上一篇</a>;
  } if (type === 'next') {
    return <a>下一篇</a>;
  }
  return originalElement;
}
export default class SiderLayout extends React.Component {

  render() {
    const customStyle={
      display: "flex",
      flexFlow: "column",
      justifyContent: "normal",
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          theme="dark"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => { console.log(broken); }}
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <div className="logo" />
          <Menu theme="dark" style={customStyle} defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>首页</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>归档</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="desktop" />
              <span>时间线</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="file" />
              <span>关于我</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#898989', padding: 0 }} >
            FrontEnd Blogs
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <article style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <header>
                <span>标题</span>
                <div>时间，标签，评论</div>
              </header>
              <div>内容</div>
              <footer style={{margin:"0 auto"}}>

              </footer>
            </article>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            <Pagination simple defaultCurrent={2} total={50} itemRender={itemRender} />
            {/*<Affix offsetBottom={10} style={{background:"#ccc"}}>*/}
              {/*<div>*/}
                {/*<Row>*/}
                  {/*<Col span={4}></Col>*/}
                  {/*<Col span={4}></Col>*/}
                  {/*<Col span={4} style={{textAlign:"center" }}><IconText type="like-o" text="156" /></Col>*/}
                  {/*<Col span={4} style={{textAlign:"center" }}><IconText type="message" text="2" /></Col>*/}
                  {/*<Col span={4}></Col>*/}
                  {/*<Col span={4}></Col>*/}
                {/*</Row>*/}
              {/*</div>*/}
            {/*</Affix>*/}
            <aside style={{  padding: '30px' }}>
                <Card  hoverable bordered={false} style={{ width: "100%" }}>
                  <Skeleton loading={false} avatar active>
                    <Meta style={{width:"100%",display:"flex",flexFlow:"row"}}
                          avatar={<Avatar style={{ width: 50,height: 50}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                          title={"stonehank_fsdn"}
                          description={"2018-3-4 16:11"}
                    />
                    <div style={{width:"100%",marginTop:20,textAlign:"left"}}>
                      "this is very long comment body this is very long comment body this is very long comment body" +
                      "this is very long comment body this is very long comment body this is very long comment bodythis is very long comment body" +
                      "this is very long comment bodythis is very long comment bodythis is very long comment bodythis is very long comment body"
                    </div>
                  </Skeleton>

                </Card>
            </aside>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
