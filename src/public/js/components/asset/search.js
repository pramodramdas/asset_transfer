import { connect } from "react-redux";
import React from "react";
import { Select, Button, Input } from 'antd';

const Option = Select.Option;

class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        req_state: "",
        assetId: ""
    };

    componentDidMount() {
         this.setState({request_state: ""});
    }

    onFieldChange(field, e) {
        if(e.target)
            this.setState({[field]:e.target.value});
    }

    clearFields() {
        this.setState({assetId:"", req_state:""});
    }

    filterRequests() {
        let query = {};
        switch(this.state.req_state) {
            case "APPROVED": query = {approved: true}; break;
            case "NOT APPROVED": query = {approved: false}; break;
            case "RECEIVED": query = {received: true}; break;
            case "NOT RECEIVED": query = {received: false}; break;
            case "CLOSED": query = {isClosed: true}; break;
            case "NOT CLOSED": query = {isClosed: false}; break;
            default: break;
        }

        if(this.state.assetId)
            query.assetId = this.state.assetId;

        this.props.filterRequests(query);
    }

    onDropDownChange(val) {
        this.setState({req_state:val});
    }

    render() {
        return(
            <div>
                <Select defaultValue="ALL" onChange={this.onDropDownChange.bind(this)} style={{width:150, marginBottom: "10px"}}>
                    <Option value="ALL">ALL</Option>
                    <Option value="APPROVED">APPROVED</Option>
                    <Option value="NOT APPROVED">NOT APPROVED</Option>
                    <Option value="RECEIVED">RECEIVED</Option>
                    <Option value="NOT RECEIVED">NOT RECEIVED</Option>
                    <Option value="CLOSED">CLOSED</Option>
                    <Option value="NOT CLOSED">NOT CLOSED</Option>
                </Select>
                <br />
                <Input placeholder="Asset Id" value={this.state.assetId} style={{width: 150, marginBottom: "10px"}} onChange={this.onFieldChange.bind(this,"assetId")}/>
                <br />
                <Button type="primary" style={{ width: 100}} onClick={this.filterRequests.bind(this)} htmlType="submit" className="login-form-button">
                    Search
                </Button>
                <br />
                {/*<Button type="primary" style={{ width: 100}} onClick={this.clearFields.bind(this)} htmlType="submit" className="login-form-button">
                    Clear
                </Button>*/}
            </div>
        );
    }
}

export default Search;