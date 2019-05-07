import React, { Component } from 'react';
import {
  Form, Icon, Input, Button, Alert,
} from 'antd';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok,
      token,
      refreshToken,
      errors {
        path,
        message
      }
    }
  }
`;

class LoginForm extends Component {
  onSubmitHandle = async (loginMutation) => {
    const { form, history } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        const { data } = await loginMutation({ variables: values });
        const { errors, ok } = data.login;
        if (errors) {
          errors.forEach((e) => {
            form.setFields({
              [e.path]: {
                value: values[e.path],
                errors: [e.message],
              },
            });
          });
        } else if (ok) {
          history.push('/');
        }
      }
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Mutation mutation={LOGIN_MUTATION}>
        {(loginMutation, { loading, error }) => (
          <Form onSubmit={(e) => {
            e.preventDefault();
            this.onSubmitHandle(loginMutation);
          }}
          >
            <Form.Item>
              {getFieldDecorator('email', { rules: [{ required: true }] })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="email"
                  placeholder="Email"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', { rules: [{ required: true }] })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>Register</Button>
            </Form.Item>
            {error && (
              <Alert
                message="Error"
                description={error.message}
                type="error"
                showIcon
              />
            )}
          </Form>

        )}
      </Mutation>
    );
  }
}

LoginForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Form.create({ name: 'login_form' })(LoginForm));
