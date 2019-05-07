import React, { Component } from 'react';
import {
  Form, Input, Icon, Button,
} from 'antd';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const REGISTER_MUTATION = gql`
    mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok,
      user {
        id,
        username,
        email
      },
      errors {
        path,
        message
      }
    }
  }
`;
class RegisterForm extends Component {
  onRegister = (registerMutation) => {
    const { form, history } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        const { data } = await registerMutation({ variables: values });
        const { ok, errors } = data.register;
        if (ok) {
          history.push('/');
        } else if (errors) {
          errors.forEach((error) => {
            form.setFields({
              [error.path]: {
                value: values[error.path],
                errors: [error.message],
              },
            });
          });
        }
      }
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator, getFieldError } = form;
    const usernameError = getFieldError('username');
    const passwordError = getFieldError('password');
    const emailError = getFieldError('email');
    return (
      <React.Fragment>
        <Mutation mutation={REGISTER_MUTATION}>
          {(registerMutation, { loading }) => (
            <Form onSubmit={(e) => {
              e.preventDefault();
              this.onRegister(registerMutation);
            }}
            >
              <Form.Item
                validateStatus={usernameError ? 'error' : ''}
                help={usernameError || ''}
              >
                {getFieldDecorator('username', {
                  rules: [{ required: true }],
                })(<Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />)
                }
              </Form.Item>
              <Form.Item
                validateStatus={emailError ? 'error' : ''}
                help={emailError || ''}
              >
                {getFieldDecorator('email', {
                  rules: [{ required: true, type: 'email' }],
                })(
                  <Input
                    prefix={
                      <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="text"
                    placeholder="Email"
                  />,
                )}
              </Form.Item>
              <Form.Item
                validateStatus={passwordError ? 'error' : ''}
                help={passwordError || ''}
              >
                {getFieldDecorator('password', {
                  rules: [{ required: true }],
                })(<Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>Register</Button>
              </Form.Item>
            </Form>
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}

RegisterForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


export default withRouter(Form.create({ name: 'register_form' })(RegisterForm));
