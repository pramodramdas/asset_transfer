import { Calendar, Badge, Input, Button } from 'antd';
import { connect } from "react-redux";
import React from "react";
import moment from 'moment';
import { assetTransactionsMonth } from '../../actions/index';

class AssetCalander extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        assetId: '',
        currMonth: new Date().getUTCMonth()-1,
        currYear: new Date().getUTCFullYear(),
        startDate: "",
        endDate: "",
        data: []
    }

    componentDidMount() {
      this.setState(
        this.getFirstLastDay(this.state.currMonth, this.state.currYear)
      );
    }

    getListData(value) {
        let listData;
        let dayEvent = this.state.data[value.date()];
        if(dayEvent) {
          listData = [];
          dayEvent.map((eve)=>{
            if(eve.receivedDate) {
              listData.push({ type: 'warning', content: 'Emp:'+eve.reqEmp+" received"});
            }
            if(eve.submittedDate) {
              listData.push({ type: 'success', content: 'Emp:'+eve.reqEmp+" submitted" });
            }
          });
        }
        return listData || [];
    }
      
    dateCellRender(value) {
      const listData = this.getListData(value);
      return listData.map((item, i) => (
            <div className="events" style={{background:"#E6F7C0"}} key={i}>
              <Badge status={item.type} text={item.content} />
              <br/>
            </div>
      ))
    }

    getFirstLastDay(month, year) {
      //month starts from zero so reduce by one
      return { 
        startDate: new Date(year, month+1, 1).getTime(),
        endDate: new Date(year, month+2, 0).getTime()
      }
    }

    onPanelChange(date, mode) {
      let change;
      change = {
        currYear:moment.utc(date,'YYYY-MM-DD').year(),
        currMonth:moment.utc(date,'YYYY-MM-DD').month()-1
      };
      this.setState(change, () => {
          this.setState(this.getFirstLastDay(this.state.currMonth, this.state.currYear), () => {
            this.getTransactionsForMonth.bind(this)();
          });
      });
    }

    getTransactionsForMonth() {
      assetTransactionsMonth(this.state, (data) => {
        let monthWiseSplit = [];
        data.map((item, i)=>{
          let receivedDay = new Date(item.receivedDate).getDate();
          let submitterDay = new Date(item.submittedDate).getDate();
          if(monthWiseSplit[receivedDay])
            monthWiseSplit[receivedDay].push({reqEmp:item.reqEmp, receivedDate:item.receivedDate});
          else
            monthWiseSplit[receivedDay] = [{reqEmp:item.reqEmp, receivedDate:item.receivedDate}];
          
          if(monthWiseSplit[submitterDay])
            monthWiseSplit[submitterDay].push({reqEmp:item.reqEmp, submittedDate:item.submittedDate});
          else
            monthWiseSplit[submitterDay] = [{reqEmp:item.reqEmp, submittedDate:item.submittedDate}];
        });
        this.setState({data:monthWiseSplit});
      })
    }

    onFieldChange(field, e) {
      if(e.target)
        this.setState({[field]:e.target.value});
    }

    render() {
        return(
            <div>
                <Input size="large" placeholder="Asset Id" value={this.state.assetId} style={{ width: 100}} onChange={this.onFieldChange.bind(this,"assetId")}/>
                <Button type="primary" style={{ width: 100}} onClick={this.getTransactionsForMonth.bind(this)} htmlType="submit" className="login-form-button">
                    Submit
                </Button>
                <Calendar onSelect={this.onPanelChange.bind(this)} onPanelChange={this.onPanelChange.bind(this)} dateCellRender={this.dateCellRender.bind(this)} />
            </div>
        );
    }
}

export default AssetCalander;