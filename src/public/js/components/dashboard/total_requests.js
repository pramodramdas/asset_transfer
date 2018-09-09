import React from "react";
import { RadialChart, Hint } from 'react-vis';
import { getTotalRequestsByCat } from '../../actions/dashboard';

export default class TotalRequests extends React.Component {
    state = {
      data: [],
      value: false
    }

    componentDidMount() {
        getTotalRequestsByCat((data) => {
            let renderData = [];
            data.map((item) => {
                if(item.total!==0)
                    renderData.push({angle:item.total, label:item.category, subLabel:item.total.toString()});
            });
            this.setState({data:renderData});
        });
    }

    render() {
      const {value} = this.state;
      return (
        <div>
          <h3>Total requests per asset</h3>
          <RadialChart
            radius={140}
            getAngle={d => d.angle}
            data={this.state.data}
            showLabels
            onValueMouseOver={v => this.setState({value: v})}
            onSeriesMouseOut={v => this.setState({value: false})}
            width={300}
            height={300}>
            {value && <Hint value={value}/>}
          </RadialChart>
        </div>
      );
    }
}