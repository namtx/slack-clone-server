import React from 'react';
import {
  Layout, Row, Col,
} from 'antd';
import RegisterForm from '../components/RegisterForm';

const { Header, Footer, Content } = Layout;

const Register = () => (
  <Layout>
    <Header>Header</Header>
    <Content>
      <Row type="flex" justify="center">
        <Col span={4}>
          <h2>Register</h2>
          <RegisterForm />
        </Col>
      </Row>
    </Content>
    <Footer>Footer</Footer>
  </Layout>
);

export default Register;
