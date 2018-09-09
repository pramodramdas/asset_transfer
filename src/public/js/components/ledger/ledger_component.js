import { connect } from "react-redux";
import React from "react";
import { List, Button, Tooltip, Pagination } from 'antd';
import { getTransactionsCouch } from '../../actions/index';

class LEDGER extends React.Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        loading: false,
        data: []
    }

    componentDidMount() {
        getTransactionsCouch(this.props.assetId, 1, (data) => {
            this.setState({data});
        });
    }

    onPageChange(current, size) {
        getTransactionsCouch(this.props.assetId, current, (data) => {
            this.setState({data});
        });
    }

    getDisplayText(txDetails){
        return Object.keys(txDetails).map((key)=>{
            return key+" : "+txDetails[key]
        }).join("\n");
    }

    renderTx(item) {
        return (
            <List.Item >
                <Tooltip title={this.getDisplayText.bind(this, item.data)}>
                    <Button type="dashed">
                        <div style={{width:"150px",overflow:"hidden"}}>{item.data.transactionId}</div>
                    </Button>
                </ Tooltip>
            </List.Item>
        )
    }

    render() {
        return(
            <div>
                <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                    dataSource={this.state.data}
                    style={{"display":"flex", "flexDirection":"column"}}
                    renderItem={ this.renderTx.bind(this) }
                />
                <div style={{"display":"flex", "justifyContent": "center"}}>
                    <Pagination onChange={this.onPageChange.bind(this)} defaultCurrent={1} total={50} />
                </div>
            </div>
        );
    }
}

const actionCreators = {  };

export default LEDGER;