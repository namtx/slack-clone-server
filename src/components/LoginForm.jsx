import React, { useState } from 'react';
import {
  Form, Icon, Input, Button, Alert,
} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import loginApi from '../services/api/loginApi';
import useLocalStorage from '../hooks /useLocalStorage';

const LoginForm = ({ history, form }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState(undefined);
  // eslint-disable-next-line no-unused-vars
  const [jwtToken, setJWTToken] = useLocalStorage('token', undefined);
  // eslint-disable-next-line no-unused-vars
  const [jwtRefreshToken, setJWTRefreshToken] = useLocalStorage('refreshToken', undefined);

  const onSubmitHandle = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true);
        const { data: { data } } = await loginApi(values);
        setLoading(false);
        const {
          errors: apiErrors, ok, token, refreshToken,
        } = data.login;
        if (apiErrors) {
          setError(apiErrors);
          apiErrors.forEach((e) => {
            form.setFields({
              [e.path]: {
                value: values[e.path],
                errors: [e.message],
              },
            });
          });
        } else if (ok) {
          setJWTToken(token);
          setJWTRefreshToken(refreshToken);
          history.push('/');
        }
      }
    });
  };

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      onSubmitHandle();
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
        <Button type="primary" htmlType="submit" loading={loading}>Login</Button>
      </Form.Item>
      {errors && errors.map(error => (
        <Alert
          key={error.path}
          message="Error"
          description={error.message}
          type="error"
          showIcon
        />
      ))}
    </Form>
  );
};

LoginForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Form.create({ name: 'login_form' })(LoginForm));
