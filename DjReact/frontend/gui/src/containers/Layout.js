import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
    render() {
        console.log('Is Authenticated:', this.props.isAuthenticated);

        return (
            <Layout className="layout">
                <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
    
                {
                    this.props.isAuthenticated ?
    
                    <Menu.Item key="2" onClick={this.props.logout}>
                        Logout
                    </Menu.Item>
    
                    :
    
                    <Menu.Item key="2">
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                }
    
                    <Menu.Item key="1">
                        <Link to="/">Posts</Link>
                    </Menu.Item>
                    
                </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>
                </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>
        );
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         logout: () => dispatch(actions.logout()),
        
//     }
// }
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch(actions.logout());
            ownProps.history.push('/login'); // Redirect to login after logout
        }
    }
}

const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.token !== null,  // Xác định trạng thái xác thực
    };
  };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));