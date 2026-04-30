import React from 'react';
import { Form, Input, Button } from 'antd';

function Signup({ onFinish }) {
  return (
    <Form
      name="signup"
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Veuillez entrer votre email !' }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="Mot de passe"
        name="password"
        rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          S'inscrire
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Signup;
