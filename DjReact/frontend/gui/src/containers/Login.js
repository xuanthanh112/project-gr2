import React, { Component } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { connect } from "react-redux";
import { Flex } from 'antd'; // Giả sử Flex là một component từ 'antd' hoặc từ một thư viện khác
import * as actions from '../store/actions/auth';
class NormalLoginForm extends Component {
  formRef = React.createRef();
  componentDidUpdate(prevProps) {
    // Nếu đã kết thúc loading và không có lỗi, chuyển hướng
    if (prevProps.loading && !this.props.loading && !this.props.error) {
      this.props.history.push('/');
    }
  }


  onFinish  = () => {
    this.formRef.current.validateFields()
      .then(values => {
        // Nếu không có lỗi, xử lý các giá trị của form ở đây
        console.log('Received values of form: ', values);
        // Gọi action để xử lý (ví dụ: login)
        this.props.onAuth(values.username, values.password);

      })
      .catch(errorInfo => {
        // Xử lý nếu có lỗi xảy ra trong quá trình validate
        console.log('Validate Failed:', errorInfo);
      });
        
  }
  
  

  render() {
    const { error, loading } = this.props;
    let errorMessage = null;
    if (error) {
      errorMessage = (
        <p>{error.message}</p>
      );
    }

    return (
      <div>
        {errorMessage}
        {loading ? (
          <Spin />
        ) : (
          <Form
            ref={this.formRef}
            name="login"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish }
            style={{
              maxWidth: 360,
            }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              or <a href="/signup/">Register now!</a>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  error: state.error
});
const mapDispatchToProps = (dispatch) => ({
    onAuth: (username, password) => dispatch(actions.authLogin(username, password))
  });
export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
