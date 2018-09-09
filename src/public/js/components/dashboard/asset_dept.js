import { connect } from "react-redux";
import React from "react";
import { Input, Button, Select } from 'antd';
import { getAssetsByDept } from '../../actions/dashboard';
import { RadialChart, Hint } from 'react-vis';

const Option = Select.Option;

class AssetsOfDepartment extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        currDept: "",
        value: false,
        depts: [],
        renderData: []
    }

    componentDidMount() {
        getAssetsByDept((data) => {
            let renderData = [];
            data.map((item, i) => {
                renderData.push({angle:item.total, categories:item.categories, label:item._id.dept, subLabel:item.total.toString()});
            });
            this.setState({renderData});
        });
    }

    renderHint = (v) => {
        let hint = [];
        hint = v.categories.map((h) => {
            return <p>{h.category} {h.total_cat}</p>;
        });
        this.setState({value: {v, hint}});
    }

    render() {
        const {value} = this.state;
        return(
            <div>
                <h3>Number of assets per department and details</h3>
                <RadialChart
                    innerRadius={100}
                    radius={140}
                    getAngle={d => d.angle}
                    data={this.state.renderData}
                    showLabels
                    onValueMouseOver={this.renderHint}
                    onSeriesMouseOut={v => this.setState({value: false})}
                    width={300}
                    height={300}>
                {
                    value ? 
                    <Hint value={value.v}>
                        <div style={{background: 'black'}}>
                            {value.hint}
                        </div>
                    </Hint>
                    :null
                }
                </RadialChart>
            </div>
        );
    }
}

export default AssetsOfDepartment;