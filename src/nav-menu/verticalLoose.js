import React from 'react';

export default function verticalLoose(Component){
  return class extends React.Component{
    render(){
      const {children,key}=this.props
      const looseStyle={
        marginBottom:35,
        marginTop:35,
      }
      return (
        <div style={looseStyle}>
          <Component key={key}>
            {children}
            <aside style={{  padding: '30px' }}>
              <Card  hoverable bordered={false} style={{ width: "100%" }}>
                <Skeleton loading={false} avatar active>
                  <Meta style={{width:"15%",float:"left",display:"flex",flexFlow:"column"}}
                        avatar={<Avatar style={{marginRight:"-16px"}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={"stonehank_fsdn"}
                        description={"2018-3-4 16:11"}
                  />
                  <div style={{width:"80%",float:"right"}}>
                    "this is very long comment body this is very long comment body this is very long comment body" +
                    "this is very long comment body this is very long comment body this is very long comment bodythis is very long comment body" +
                    "this is very long comment bodythis is very long comment bodythis is very long comment bodythis is very long comment body"
                  </div>
                </Skeleton>

              </Card>
            </aside>
          </Component>
        </div>
      )
    }
  }
}