import { connect } from "react-redux";
import { Input, Button, Select } from 'antd';
import React from "react";
import { submitAsset, searchAssetAdmin } from '../../actions/index';
import SearchItems from '../search_items';

const Option = Select.Option;

class Asset extends React.Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        assetId: "",
        owner: "",
        description: "",
        message: "",
        loading: false
    }

    onFieldChange(field, e) {
        if(e.target)
            this.setState({[field]:e.target.value});
    }

    clearFields(){
        this.setState({assetId:"", owner:"", description:""});
    }
    
    addAsset() {
        this.setState({loading:true});
        submitAsset(this.state, (message)=>{
            this.setState({loading:false, message:message});
        });
    }

    searchAsset() {
        let filter = JSON.stringify(this.state, (key, value) => {if(value)return value});
        this.props.searchAssetAdmin(JSON.parse(filter));
    }

    render() {
        return(
            <div style={{ display: "flex", flexDirection: "row"}}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height:"200px"}}>
                    <Input size="large" placeholder="Asset Id" value={this.state.assetId} style={{ width: 300, marginBottom: "10px"}} onChange={this.onFieldChange.bind(this,"assetId")}/>
                    <Input size="large" placeholder="Owner Id" value={this.state.owner} style={{ width: 300, marginBottom: "10px"}} onChange={this.onFieldChange.bind(this,"owner")}/>
                    <Input size="large" placeholder="Description" value={this.state.description} style={{ width: 300, marginBottom: "10px"}} onChange={this.onFieldChange.bind(this,"description")}/>
                    <div style={{display: "flex"}}>
                        <Button type="primary" style={{ width: 100, marginRight: "3px"}} onClick={this.addAsset.bind(this)} htmlType="submit" loading={this.state.loading} className="login-form-button">
                            Add
                        </Button>
                        <Button type="primary" style={{ width: 100, marginRight: "3px"}} onClick={this.searchAsset.bind(this)} htmlType="submit" className="login-form-button">
                            Search
                        </Button>
                        <Button type="primary" style={{ width: 100}} onClick={this.clearFields.bind(this)} htmlType="submit" className="login-form-button">
                            Clear
                        </Button>
                    </div>
                    <h3>{this.state.message}</h3>
                </div>
                <SearchItems type="assets" style = {{width:"100%"}}/>
            </div>
        );
    }
}

const actionCreators = { searchAssetAdmin };

export default connect(null, actionCreators)(Asset);