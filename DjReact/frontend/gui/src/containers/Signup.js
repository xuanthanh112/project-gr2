import React, { Component } from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth'; 

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }
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
        this.props.onAuth(values.username,values.email, values.password1, values.password2);

      })
      .catch(errorInfo => {
        // Xử lý nếu có lỗi xảy ra trong quá trình validate
        console.log('Validate Failed:', errorInfo);
      });
       
      }

  prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  )

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Form
          {...formItemLayout}
          ref={this.formRef}
          name="register"
          onFinish={this.onFinish }
          initialValues={{
            prefix: '84',
          }}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password1"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="password2"
            label="Confirm Password"
            dependencies={['password1']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password1') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              addonBefore={this.prefixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: 'Please select gender!',
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button block type="primary" htmlType="submit">
              Sign up
            </Button>
            or <a href="/login/">You already have an account? Login here</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
