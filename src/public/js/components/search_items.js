import { connect } from "react-redux";
import React from "react";
import { Input, Button, Card } from 'antd';
import { getParticipants, deleteItem } from "../actions/participant";

class SearchItems extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        message:""
    }

    deleteItem(index) {
        this.props.deleteItem(index, this.props.type);
    }

    renderItems() {
        let mainItems = [];
        let assetCnt = this.props[this.props.type] && this.props[this.props.type].length;
        
        gridStyle.width = (100 / (assetCnt < 3 ? assetCnt: 4)) + '%';
        gridStyle.height = (100 / (assetCnt < 3 ? assetCnt: 4)) + '%';

        mainItems = this.props[this.props.type].map((item, i) => {
            let items = [];
            let displayItems =  Object.keys(item).map((key) => {
                return (
                    <p>{key} : {item[key]}</p>
                );
            });
            
            items.push(
                <Card.Grid style={gridStyle}>
                    {displayItems}
                    <Button type="primary" style={{ width: 100, marginRight: "3px"}} onClick={this.deleteItem.bind(this, i)} htmlType="submit" className="login-form-button">
                        Delete
                    </Button>
                </Card.Grid>
            )
            return items;
        });
        //if you want to check more cards uncomment and replicate below code
        //mainItems.push(mainItems[0]);
        
        /*<div style={{"overflowY": "scroll","overflowX": "scroll"}}>*/
        return (
            <div>
                <Card style={{height: "500px", "overflowY": "scroll"}} title={this.props.type=="participants"?"Participants":"Assets"}>
                    {mainItems}
                </Card>
            </div>
        );
        /*</div>*/
    }

    render() {
        return(
            <div>
                {
                    this.props[this.props.type].length > 0?
                    this.renderItems.bind(this)():
                    null
                }
            </div>
        );
    }
}

const gridStyle = {
    width: '100%',
    textAlign: 'center',
    height: '100px'
};

const mapStateToProps = (state) => {
    return {
        participants:state.participant.participants,
        assets:state.asset.assets
    }
};

export default connect(mapStateToProps, {deleteItem})(SearchItems);