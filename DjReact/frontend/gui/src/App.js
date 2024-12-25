import React, { Component } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes.js';
import CustomLayout from './containers/Layout'; // import đúng tên file (layout.tsx -> layout)
import * as actions from './store/actions/auth.js';
class App extends React.Component {
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  render() {
    return (
      <div>
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

// mapStateToProps sẽ lấy isAuthenticated từ state Redux
//hàm kết nối dữ liệu connect từ redux store và truyền nó thành props cho class app. mọi hàm khác trong class này gọi nó bằng this.props 
// đại khái thì app sẽ là component con nhận props isAuthenticated từ mapStateToProps và mapStateToProps như một trung gian để nhận dữ liệu từ store sang và lưu dưới dạng props thôi 
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,  // Xác định trạng thái xác thực
  };
};

const mapDispatchToProps = (dispatch) =>{
  return{
    onTryAutoSignUp:()=> dispatch(actions.authCheckState())
  }
}

// Kết nối App component với Redux store
export default connect(mapStateToProps,mapDispatchToProps)(App);
