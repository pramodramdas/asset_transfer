import { connect } from "react-redux";
import React from "react";
import { Select, Input, Button, Badge, Card } from 'antd';
import { searchAsset } from '../../actions/index';

const InputGroup = Input.Group;
const Option = Select.Option;

class SearchAsset extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        key: "assetId",
        value: "",
        data: []
    }

    onFieldChange(field, e) {
        if(field === 'value' && e.target)
            this.setState({[field]:e.target.value});
        else
            this.setState({key:field});
    }

    onSearch() {
        if(this.state.key)
            searchAsset({[this.state.key]:this.state.value}, (data) => {
                this.setState({data});
            });
    }

    displayCurrentStatus(details) {
        return (
            <div>
                <Badge status="processing" text={"request from: "+details.reqEmp} />
                <br />
                <Badge status="warning" text={"from: "+new Date(details.fromDate).toDateString()} />
                <br />
                <Badge status="success" text={"to: "+new Date(details.endDate).toDateString()} />
                <br />
                {
                    details.received ?
                    <h3>Asset received by {details.reqEmp}</h3> :
                    <h3>Asset approved to {details.reqEmp}</h3>
                }
            </div>
        )
    }

    displayAssetDetails() {
        return this.state.data.map((asset) => {
            return(
                <Card title={"Asset Id: "+asset.assetId} bordered style={{ marginLeft: "100px", marginBottom: "10px", backgroundColor:'#E6F7A9', width:300 }}>
                    <Badge status="error" text={"owner: "+asset.owner} />
                    <br />
                    <Badge status="default" text={"desc: "+asset.description} />
                    <br />
                    {
                        asset.items[0] ?
                        this.displayCurrentStatus(asset.items[0]) :
                        <h3>Asset with owner</h3>
                    }
                </Card>
            );
        });
    }

    render() {
        return(
            <div style={{display:"flex", "flexDirection":"row"}}>
                <div>
                    <InputGroup compact>
                        <Select defaultValue="Asset" style={{width:"100px", marginBottom: "10px"}} onChange={this.onFieldChange.bind(this)}>
                            <Option value="assetId">Asset</Option>
                            <Option value="description">Description</Option>
                        </Select>
                        <Input placeholder="Asset Id" value={this.state.value} style={{ width: 200}} onChange={this.onFieldChange.bind(this, 'value')}/>
                    </InputGroup>
                    <Button type="primary" style={{ width: 100}}  htmlType="submit" onClick={this.onSearch.bind(this)} className="login-form-button">
                        Search
                    </Button>
                </div>
                <div style={{width: "59%", height: "400px", "overflowY": "scroll", "overflowX":"hidden"}}>
                    {this.displayAssetDetails.bind(this)()}
                </div>
            </div>
        );
    }
}

export default SearchAsset;