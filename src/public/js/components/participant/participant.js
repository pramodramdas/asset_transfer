import { connect } from "react-redux";
import { Input, Button, Select, message } from 'antd';
import React from "react";
import { submitParticipant, getParticipants, getDepts } from '../../actions/index';
import SearchItems from '../search_items';

const Option = Select.Option;

class Participant extends React.Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        empId: "",
        name: "",
        email: "",
        role: "",
        department: "",
        depList: [],
        message: "",
        loading: false
    }

    componentDidMount() {
        getDepts(({data}) => {
            this.setState({depList: data});
        })
    }

    onFieldChange(field, e) {
        if(e.target)
            this.setState({[field]:e.target.value});
    }

    handleChange(value) {
        this.setState({role:value});
    }

    depChange(value) {
        this.setState({department:value});
    }

    clearFields(){
        this.setState({empId:"", name:"", email: "", role: "", department:""});
    }

    addParticipant() {
        let { empId, name, email, role, department } = this.state;

        if(!empId || !name || !email || !role, !department) {
            message.error("all fields are required");
            return;
        }

        this.setState({loading:true});
        submitParticipant(this.state, (message)=>{
            this.setState({loading:false, message:message});
        });
    }

    searchParticipant() {
        let filter = JSON.stringify(this.state, (key, value) => {if(value)return value});
        this.props.getParticipants(JSON.parse(filter));
    }

    render() {
        return(
            <div style={{ display: "flex", flexDirection: "row"}}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "300px"}}>
                    <Input size="large" placeholder="Employee Id" value={this.state.empId} style={{ width: 300, marginBottom: "10px"}} onChange={this.onFieldChange.bind(this,"empId")}/>
                    <Input size="large" placeholder="Participant Name" value={this.state.name} style={{ width: 300, marginBottom: "10px"}} onChange={this.onFieldChange.bind(this,"name")}/>
                    <Input size="large" placeholder="Email ID" value={this.state.email} style={{ width: 300, marginBottom: "10px"}} onChange={this.onFieldChange.bind(this,"email")}/>
                    <Select size="large" value={this.state.department} style={{ width: 125, marginBottom: "10px"}} placeholder="Role"  onChange={this.depChange.bind(this)} >
                        {
                            this.state.depList.map((dep) => {
                                return <Option value={dep.depName}>{dep.depName}</Option>
                            })
                        }
                    </Select>
                    <Select size="large" value={this.state.role} style={{ width: 125, marginBottom: "10px"}} placeholder="Role"  onChange={this.handleChange.bind(this)} >
                        <Option value="user">User</Option>
                        <Option value="admin">Admin</Option>
                    </Select>
                    <div style={{display: "flex"}}>
                        <Button type="primary" style={{ width: 100, marginRight: "3px"}} onClick={this.addParticipant.bind(this)} htmlType="submit" loading={this.state.loading} className="login-form-button">
                            Add
                        </Button>
                        <Button type="primary" style={{ width: 100, marginRight: "3px"}} onClick={this.searchParticipant.bind(this)} htmlType="submit" className="login-form-button">
                            Search
                        </Button>
                        <Button type="primary" style={{ width: 100}} onClick={this.clearFields.bind(this)} htmlType="submit" className="login-form-button">
                            Clear
                        </Button>
                    </div>
                    <h3>{this.state.message}</h3>
                </div>
                <SearchItems type="participants" style = {{width:"75%"}}/>
            </div>
        );
    }
}

const actionCreators = { getParticipants };

export default connect(null, actionCreators)(Participant);