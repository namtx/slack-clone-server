import React from 'react';
import {
  Layout, Row, Col,
} from 'antd';
import LoginForm from '../components/LoginForm';

const { Header, Footer, Content } = Layout;

const Login = () => (
  <Layout>
    <Header>Header</Header>
    <Content>
      <Row type="flex" justify="center">
        <Col span={4}>
          <h2>Login</h2>
          <LoginForm />
        </Col>
      </Row>
    </Content>
    <Footer>Footer</Footer>
  </Layout>
);

export default Login;
