import { connect } from "react-redux";
import React from "react";
import moment from "moment";
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries } from 'react-vis';
import { getDataByDateCat } from "../../actions/dashboard";
import DiscreteColorLegend from "../../../../../node_modules/react-vis/dist/legends/discrete-color-legend";

const GRAPH_DAYS = 10;
//const timestamp = new Date().getTime();
const timestamp = moment();//moment('2018-05-20');
let color = ["red", "green"];

class TimeChart extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
    }
    
    state = {
        fromDate: 0,
        toDate: 0,
        renderData:[],
        labelData: []
    }

    componentDidMount() {
        this.setState({
            toDate: timestamp.unix() * 1000,
            fromDate: timestamp.clone().subtract(GRAPH_DAYS, "days").unix() * 1000
        }
        , () => {
            this.getData();
        })
    }

    getData() {
        let { fromDate, toDate } = this.state;
        let groupByCat = {};
        let renderData = [];
        let labelData = [];
        let start = timestamp.clone().subtract(GRAPH_DAYS, "days");
        let dateMod = parseInt(start.format('D'));

        getDataByDateCat(fromDate, toDate, (data) => {
            data.map((item, i) => {
                let { category, requestDate} = item["_id"];
                if(!groupByCat[category]) {
                    groupByCat[category] = [];
                    // initialize 10 days
                    for(let i = 0; i < GRAPH_DAYS; i++)
                        groupByCat[category]
                        .push({x: start.clone().add(i, "days").unix()*1000 , y: 0});
                }
                let index = (moment.unix(requestDate/1000).format('D') - dateMod) % dateMod;
                
                groupByCat[category][index] = {x: requestDate, y: item.total, category};
            });

            Object.keys(groupByCat).map((category, j) => {
                let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

                renderData.push(
                    <LineSeries 
                        style={{stroke:color}} 
                        data={groupByCat[category]}
                    />
                );
                labelData.push({title:category, color:color});
            });
            this.setState({renderData, labelData});
        });
    }

    render() {
        return (
            <div style={{display:"flex", flexDirection:"row"}}>
                <XYPlot
                    xType="time"
                    width={700}
                    height={400}>
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <XAxis title="X Axis" />
                    <YAxis title="Y Axis" />
                    {this.state.renderData}
                </XYPlot>
                <DiscreteColorLegend
                    height={200}
                    width={300}
                    items={this.state.labelData}
                />
            </div>
        );
    }
}

export default TimeChart;