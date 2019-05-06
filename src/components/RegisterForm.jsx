import React, { Component } from 'react';
import {
  Form, Input, Icon, Button,
} from 'antd';
import PropTypes from 'prop-types';

class RegisterForm extends Component {
  componentDidMount() {
    const { form: { validateFields } } = this.props;
    validateFields();
  }

  handleSubmit = (e) => {
    const { form: { validateFields } } = this.props;
    e.preventDefault();
    validateFields((error, values) => {
      if (!error) {
        console.table(values);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
          })(<Input
            prefix={
              <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            placeholder="Username"
          />)
          }
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {})(
            <Input
              prefix={
                <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type="text"
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {})(<Input
            prefix={
              <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            type="password"
            placeholder="Password"
          />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Register</Button>
        </Form.Item>
      </Form>
    );
  }
}

RegisterForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
};


export default Form.create({ name: 'register_form' })(RegisterForm);
