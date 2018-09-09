import React from "react";
import TimeChart from './time_chart';
import TotalRequests from './total_requests';
import AssetDept from './asset_dept';
import { Layout } from 'antd';

const style = {
    display:"flex",
    flexDirection:"row", 
    justifyContent:"space-between", 
    justifyContent:"space-around"

}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h3>Number of requests in last 7 days</h3>
                <TimeChart />
                <div style={style}>
                    <TotalRequests />
                    <AssetDept />
                </div>
            </div>
        );
    }
}

export default Dashboard;