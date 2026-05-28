import { useState } from "react";
import {
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Typography,
} from "antd";

const { Paragraph, Title } = Typography;

const countries = [
  { label: "Ukraine", value: "Ukraine" },
  { label: "Poland", value: "Poland" },
  { label: "Germany", value: "Germany" },
  { label: "France", value: "France" },
  { label: "Canada", value: "Canada" },
];

function isSubmitDisabled(form) {
  const values = form.getFieldsValue();
  const hasEmptyFields =
    !values.name || !values.email || !values.country || values.age == null;
  const hasErrors = form
    .getFieldsError()
    .some(({ errors }) => errors.length > 0);

  return hasEmptyFields || hasErrors;
}

function WizardPage() {
  const [form] = Form.useForm();
  const [submittedValues, setSubmittedValues] = useState(null);

  function handleReset() {
    form.resetFields();
    setSubmittedValues(null);
  }

  if (submittedValues) {
    return (
      <Card>
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Title level={2}>Summary</Title>
            <Paragraph type="secondary">Submitted form values.</Paragraph>
          </div>

          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">
              {submittedValues.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {submittedValues.email}
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              {submittedValues.country}
            </Descriptions.Item>
            <Descriptions.Item label="Age">
              {submittedValues.age}
            </Descriptions.Item>
          </Descriptions>

          <Button type="primary" onClick={handleReset}>
            Почати заново
          </Button>
        </Space>
      </Card>
    );
  }

  return (
    <Card>
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={2}>Wizard Form</Title>
          <Paragraph type="secondary">
            Fill in the required fields to submit the form.
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          validateTrigger="onChange"
          onFinish={setSubmittedValues}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your name." },
              { min: 2, message: "Name must be at least 2 characters." },
            ]}
          >
            <Input placeholder="Jane Doe" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email." },
              { type: "email", message: "Please enter a valid email." },
            ]}
          >
            <Input placeholder="jane@example.com" />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please select a country." }]}
          >
            <Select placeholder="Select country" options={countries} />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[
              { required: true, message: "Please enter your age." },
              {
                type: "number",
                min: 18,
                max: 100,
                message: "Age must be between 18 and 100.",
              },
            ]}
          >
            <InputNumber min={18} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={isSubmitDisabled(form)}
              >
                Відправити
              </Button>
            )}
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
}

export default WizardPage;
