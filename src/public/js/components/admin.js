import { Layout, Menu, Breadcrumb } from 'antd';
import { userAuthenticate } from '../actions/index';
import { connect } from "react-redux";
import React from "react";
import Participant from "./participant/participant";
import Asset from "./asset/asset";
import Dashboard from "./dashboard/dashboard";

const { Header, Content, Footer } = Layout;

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        currComponent : <Participant />
    }

    componentWillMount() {
        const { role } = this.props.auth;
        if(role !== "admin")
            this.context.router.push("/");
    }

    onMenuClick(e) {
        let componentToLoad = null;
        if(e.key == "1")
            componentToLoad = <Participant />;
        else if(e.key == "2")
            componentToLoad = <Asset />;
        else if(e.key == "4")
            componentToLoad = <Dashboard />;

        this.setState({currComponent: componentToLoad});
        console.log(e.key);
    }

    render() {
        return(
            <div>
                <Layout className="layout">
                <Header>
                  <Menu theme="dark" onClick={this.onMenuClick.bind(this)} mode="horizontal" defaultSelectedKeys={['0']} style={{ lineHeight: '64px' }}>
                    <Menu.Item key="1">Participant</Menu.Item>
                    <Menu.Item key="2">Asset</Menu.Item>
                    <Menu.Item key="4">Dashboard</Menu.Item>
                  </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                  <div style={{ background: '#fff', padding: 24, minHeight: 450 }}>{this.state.currComponent}</div>
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

Admin.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const actionCreators = {  };

export default connect(mapStateToProps,actionCreators)(Admin);