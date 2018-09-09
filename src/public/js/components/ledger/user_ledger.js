import { connect } from "react-redux";
import React from "react";
import { Popover, Button, Divider, Spin  } from 'antd';
import { getMyAssets } from '../../actions/index';
import LEDGER from './ledger_component';

class UserLedger extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        showLedger: false,
        assetId: 0,
        data: []
    }

    componentDidMount() {
        this.setState({loading:true});
        getMyAssets((data) => {
            this.setState({data,loading:false});
        });
    }

    setAsset(assetId) {
        this.setState({showLedger:true, assetId});
    }

    content(c) {
        return (
            <div>
                <p>$class : {c.$class}</p>
                <p>description : {c.description}</p>
                <p>quantity : {c.quantity}</p>
                <p>owner : {c.owner}</p>
            </div>
        )
    }

    listMyAssets() {
        return this.state.data.map((item)=>{
            return (
                <Popover content={this.content(item)} title="Asset Info">
                    <Button style={popOverStyle} type="primary" onClick={this.setAsset.bind(this, item.assetId)} >
                        {item.assetId}
                    </Button>
                </Popover>
            );
        })
    }

    render() {
        return(
            <div>
                {
                    this.state.loading ?
                    <Spin size="large" /> :
                    <div>
                        {this.listMyAssets()}
                        <Divider type="horizontal" />
                        {this.state.showLedger ? <LEDGER assetId={this.state.assetId}/> : null}
                    </div>
                }
            </div>
        );
    }
}

const popOverStyle = {
    marginLeft: "10px",
    marginRight:"10px",
    marginTop: "10px",
    marginBottom:"10px"
}

const actionCreators = {  };

export default UserLedger;