import { Layout, Menu, Breadcrumb } from 'antd';
import { userAuthenticate } from '../actions/auth';
import { connect } from "react-redux";
import React from "react";
import Requests from "./asset/display_requests";
import RequestAsset from "./asset/request_asset";
import AssetCalendar from "./asset/asset_calendar";
import UserLedger from "./ledger/user_ledger";

const { Header, Content, Footer } = Layout;

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        currComponent : <Requests type="my_request" />
    }

    onMenuClick(e) {
        let componentToLoad = null;
        if(e.key == "1")
            componentToLoad = <Requests type="my_request" />;
        else if(e.key == "2")
            componentToLoad = <Requests type="others_request" />;
        else if(e.key == "3")
            componentToLoad = <RequestAsset />;
        else if(e.key == "4")
            componentToLoad = <UserLedger />;
        else if(e.key == "5")
            componentToLoad = <AssetCalendar />;

        this.setState({currComponent: componentToLoad});
        console.log(e.key);
    }

    render() {
        return(
            <div>
                <Layout className="layout">
                    <Header>
                    <Menu theme="dark"  mode="horizontal" onClick={this.onMenuClick.bind(this)} defaultSelectedKeys={['0']} style={{ lineHeight: '64px' }}>
                        <Menu.Item key="1">My Requests</Menu.Item>
                        <Menu.Item key="2">Requests For Asset</Menu.Item>
                        <Menu.Item key="3">Request Asset</Menu.Item>
                        <Menu.Item key="4">Ledger</Menu.Item>
                        <Menu.Item key="5">Calendar</Menu.Item>
                    </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <div style={{ background: '#fff', padding: 24, minHeight: 450 }}>
                            {this.state.currComponent}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Admin ©2018 Created by Pramod
                    </Footer>
              </Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
};

const actionCreators = {  };

export default connect(mapStateToProps,actionCreators)(Home);