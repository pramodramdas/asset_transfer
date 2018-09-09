import React from "react";
import { connect } from "react-redux";
import { Menu, Icon } from 'antd';
import { logout } from '../actions/auth';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends React.Component {

    constructor(props) {
      super(props);
    }
    
    state = {
        current : ""
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });

        if(e.key === "home")
            this.context.router.push("/");
        else if(e.key === "admin")
            this.context.router.push("/"+e.key);
        else if(e.key === "logout")
            logout();
    }
    
    displayRoute = () => {
        const { role } = this.props.auth;
        let key = "";
        let displayText = "";

        if(this.state.current === "") {
            key = "home";
            displayText = "Home";
        }
        else if(this.state.current === "admin") {
            key = "home";   
            displayText = "Home";
        }
        else if(this.state.current === "home") {
            key = (role === "admin") ? "admin" : "home";   
            displayText = (role === "admin") ? "Admin" : "Home";
        }

        return (
            <Menu.Item key={key}>
                <Icon type={key} />{displayText}
            </Menu.Item>
        );
    }

    render(){
        const { jwtToken } = this.props.auth;
        return(
            <div>
                {
                    jwtToken ?
                    <Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]} mode="vertical-left">
                        <Menu.Item key="logout">
                            <Icon type="logout" />Log out
                        </Menu.Item>
                        {this.displayRoute()}
                        <SubMenu title={<span><Icon type="setting" />Settings</span>}>
                            {/*<MenuItemGroup title="Item 1">
                                <Menu.Item key="setting:1">Option 1</Menu.Item>
                                <Menu.Item key="setting:2">Option 2</Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup title="Item 2">
                                <Menu.Item key="setting:3">Option 3</Menu.Item>
                                <Menu.Item key="setting:4">Option 4</Menu.Item>
                            </MenuItemGroup>*/}
                        </SubMenu> 
                    </Menu> :
                    null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
};

Header.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Header);