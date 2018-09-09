import React from "react";
import {connect} from "react-redux";
import Header from "./components/header";

class AppComponent extends React.Component {

    constructor(props) {
      super(props);
    }

    state = {
        error: "",
        errorInfo: ""        
    }

    componentDidCatch(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);
        // Catch errors in any components below and re-render with error message
        // this.setState({
        //     error: error,
        //     errorInfo: errorInfo
        // })
        // You can also log error messages to an error reporting service here
    }

    render(){
        return(
            <div>
                {/*<h3 style={{textAlign: "center"}}>First App</h3>*/}
                <div id="main-content" style={{display: "flex"}}>
                    <Header />
                    <div style={{"flexGrow": 1}}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
        modal:state.modal
    }
};
  
export default connect(mapStateToProps)(AppComponent);