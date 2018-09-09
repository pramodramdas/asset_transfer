import { connect } from "react-redux";
import React from "react";
import { List, Avatar, Collapse, Tag, message } from 'antd';
import { getRequests, changeRequestState } from '../../actions/index';
import Search from "./search";

const Panel = Collapse.Panel;
const clickOwner = ['approved', 'isClosed', 'cancel'];
const clickUser = ['received', 'cancel'];

class Requests extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        data: []
    }
    
    loadRequests (type, query={}) {
        getRequests(this.props.auth.empId, type, query, (data) => {
            this.setState({data});
        });
    }

    componentDidMount() {
        this.loadRequests.bind(this)(this.props.type);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.type !== this.props.type)
            this.loadRequests.bind(this)(newProps.type);
    }

    filterRequests(query) {
        this.loadRequests.bind(this)(this.props.type, query);
    }

    handleTagClick(obj, key, value) {
        if((key !== "cancel" && obj["cancel"]) ||
        (key === "received" && !obj["approved"]) || 
        (key === "isClosed" && !obj["received"]) || 
        (key === "cancel" && obj["received"]))
            return;
        
        changeRequestState(key, value, obj, (err, msg) => {
            if(!err)
                message.success(msg);
            else
                message.error(err);
            this.loadRequests.bind(this)(this.props.type);
        });
    }

    renderRequestItems(obj) {
        let color, handleClick;
        let person = this.props.type === "my_request" ? clickUser : clickOwner;

        return Object.keys(obj).map((key) => {
            handleClick = (person.indexOf(key) > -1 && !obj[key])? this.handleTagClick.bind(this, obj, key, obj[key]) : null;
            color = (obj[key]===false) ? "red" : ((obj[key]!==true && obj[key]!==false) ? "orange" : "green");
            
            if(key == "fromDate" || key == "endDate" || key == "submittedDate" || key == "receivedDate")
                return (<div><Tag color="orange">{key}</Tag>{new Date(obj[key]).toDateString()}</div>);
            else
                return (
                    <div>
                        <Tag onClick={handleClick} color={color}>
                            {key}
                        </Tag>
                        {obj[key].toString()}
                    </div>
                );
        });
    }

    renderPanelTitle(obj) {
        if(obj.cancel)
            return "This request is cancelled by "+obj.cancel;
        else if(!obj.approved && !obj.received && !obj.isClosed)
            return "This request is open";
        else 
            return "This request is " + (obj.isClosed ? "closed" : ( obj.received ? "received" : "approved"))
    }

    renderRequests(item) {
        let that = this;
        let title = this.renderPanelTitle(item);
        return (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar src="/images/laptop.png" />}
                title={"Asset Id : "+item.assetId}
                description=""
                />
                <Collapse accordion style={{width:"100%", "minWidth": "550px"}}>
                    <Panel header={title} key="1" >
                        { that.renderRequestItems(item) }
                    </Panel>
                </ Collapse>
            </List.Item>
        )
    }

    render() {
        return(
            <div style={{display:"flex", flexDirection:"row"}}>
                <div style={{width:"30%"}}>
                    <Search filterRequests={this.filterRequests.bind(this)}/>
                </div>
                <List style={{width:"70%", display:"flex", flexDirection:"column"}} itemLayout="horizontal" dataSource={this.state.data} loading={this.state.loading} renderItem={this.renderRequests.bind(this)}/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
};

export default connect(mapStateToProps)(Requests);