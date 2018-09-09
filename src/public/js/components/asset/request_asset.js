import { connect } from "react-redux";
import { Input, Button, Select, DatePicker, Layout, Divider, message } from 'antd';
import { submitAsset, requestForAsset } from '../../actions/index';
import SearchAsset from './search_asset';
import moment from 'moment';
import React from "react";

const { Content } = Layout;
const Option = Select.Option;

class RequestAsset extends React.Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        assetId: "",
        fromDate: null,
        endDate: null,
        message: "",
        loading: false
    }


    onFieldChange(field, e) {
        if(e.target)
            this.setState({[field]:e.target.value});
    }

    clearFields(){
        this.setState({assetId:"", fromDate:"", endDate:""});
    }

    requestAsset() {
        let { assetId, fromDate, endDate } = this.state;
        if(!assetId || !fromDate || !endDate) {
            message.error("all fields are required");
            return;
        }
        else if(fromDate > endDate) {
            message.error("from date cannot be greater than end date");
            return;
        }
        this.setState({loading:true});
        requestForAsset(this.state, (message)=>{
            this.setState({loading:false, message:message});
        });
    }

    onDateChange(type, val) {
        if(val) {
            let newDate = moment.utc(val,'YYYY-MM-DD').format('YYYY-MM-DD');
            this.setState({[type]:newDate});
        }
    }

    render() {
        return(
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Content style={{ display: "flex", flexDirection: "column", padding: '0 15px', width: "30%"}}>
                    <Input size="large" placeholder="Asset Id" value={this.state.assetId} style={{ width: 100, marginBottom: "10px"}} onChange={this.onFieldChange.bind(this,"assetId")}/>
                    <DatePicker size="large" format="DD-MM-YYYY" value={(this.state.fromDate)?(moment.utc(this.state.fromDate, 'YYYY-MM-DD').local()):(null)} placeholder="Start Date" style={{ width: 150, marginBottom: "10px"}} onChange={this.onDateChange.bind(this, 'fromDate')}/>
                    <DatePicker size="large" format="DD-MM-YYYY" value={(this.state.endDate)?(moment.utc(this.state.endDate, 'YYYY-MM-DD').local()):(null)} placeholder="End Date" style={{ width: 150, marginBottom: "10px"}} onChange={this.onDateChange.bind(this, 'endDate')}/>
                    <div style={{display: "flex", "justifyContent": "space-between"}}>
                        <Button type="primary" style={{ width: 100}} onClick={this.requestAsset.bind(this)} htmlType="submit" loading={this.state.loading} className="login-form-button">
                            Request
                        </Button>
                        <Button type="primary" style={{ width: 100}} onClick={this.clearFields.bind(this)} htmlType="submit" className="login-form-button">
                            Clear
                        </Button>
                    </div>
                    <h3>{this.state.message}</h3>
                </Content>
                <Divider type="vertical" style={{height: "450px", width: "4px", background:"lightgrey"}}/>
                <Content style={{ width: "100%", padding: '0 23px' }}>
                    <SearchAsset />
                </Content>
            </div>
        );
    }
}
const actionCreators = {  };

export default RequestAsset;