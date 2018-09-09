import { connect } from "react-redux";
import React from "react";

class Dummy extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <p>Welcome</p>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         auth:state.auth
//     }
// };

const actionCreators = {  };

export default Dummy;