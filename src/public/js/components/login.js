import { Form, Icon, Input, Button, message } from 'antd';
import { userAuthenticate, checkAuth, userSignUp } from '../actions/index';
import { connect } from "react-redux";
import React from "react";
const FormItem = Form.Item;

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        name: "",
        email: "",
        s_email: "",
        password: "",
        s_password: "",
        confirmPassword: ""
    }

    componentWillMount() {
        if(this.props.auth && this.props.auth.jwtToken)
            this.context.router.push('/');
    }

    handleSubmit(){
        let { email, password } = this.state;
        
        if(!email || !password) {
            message.error("all fileds are mandatory");
            return;
        }

        this.props.userAuthenticate({email,password})
        .then((data)=>{
            this.context.router.push('/');
        });
    }

    handleSignUp(){
        let { name, s_email, s_password, confirmPassword } = this.state;
        let msg = "";

        if(!name || !s_email || !s_password || !confirmPassword)
            msg = "all fileds are mandatory";
        else if(s_password !== confirmPassword)
            msg = "password did not match";

        if(msg) {
            message.error(msg);
            return;
        }

        userSignUp(
            { name, email: s_email, password: s_password },
            (err, msg) => {
                if(err)
                    message.error(err);
                else
                    message.success(msg);
            }
        );
    }

    changeInput(field, e){
        if(e.target) {
            this.setState({[field]:e.target.value});
        }
    }

    render(){
        //const { getFieldDecorator } = this.props.form;
        return(
            <div className="login-page" style={style}>
                <Form className="login-form">
                    <FormItem>
                        <Input value={this.state.email} onChange={this.changeInput.bind(this, "email")} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
                    </FormItem>
                    <FormItem>
                        <Input value={this.state.password} onChange={this.changeInput.bind(this, "password")} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)} htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </FormItem>
                </Form>
                <Form className="login-form">
                    <FormItem>
                        <Input value={this.state.name} onChange={this.changeInput.bind(this, "name")} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="name" />
                    </FormItem>
                    <FormItem>
                        <Input value={this.state.s_email} onChange={this.changeInput.bind(this, "s_email")} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
                    </FormItem>
                    <FormItem>
                        <Input value={this.state.s_password} onChange={this.changeInput.bind(this, "s_password")} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    </FormItem>
                    <FormItem>
                        <Input value={this.state.confirmPassword} onChange={this.changeInput.bind(this, "confirmPassword")} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="confirm password" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleSignUp.bind(this)} htmlType="submit" className="login-form-button">
                            Sign Up
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const style = {
    "position": "relative",
    "top": 50,
    "width": "100%",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "justifyContent":"space-around"
}
LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
};

const actionCreators = { userAuthenticate, checkAuth };

export default connect(mapStateToProps,actionCreators)(LoginForm);