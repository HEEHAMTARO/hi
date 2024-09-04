import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Input, Typography, Select, Space, Button, Form, message, Avatar, InputNumber } from "antd";
import { GetWorkById, UpdateWorkById, CreateWork } from "../../services/https/index";
import dayjs from "dayjs";

const { Text } = Typography;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const imageUrl = 'https://scontent.fnak3-1.fna.fbcdn.net/v/t39.30808-6/286452690_1402478846887916_1887857152927935811_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGJUXVsVlgTLF-cR2ATP7A3nZkAlxD2U3WdmQCXEPZTdQQOoLaFLYn1cikvchDm1LJGy6c_nAObHPWyuDvrIF9C&_nc_ohc=OJoVDw82kCEQ7kNvgGx5Ktj&_nc_ht=scontent.fnak3-1.fna&oh=00_AYC4txbTC_Pc3HcLEasKp-u_ptdqKnr9tojqdzraP5s_ow&oe=66D9FD22';

export default function PostEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [userName, setUserName] = useState<string>("");

  // Fetch work data by ID (for editing an existing work)
  const getWorkById = async (id: string) => {
    let res = await GetWorkById(id);
    if (res.status === 200) {
      setUserName(res.data.first_name + " " + res.data.last_name);
      form.setFieldsValue({
        Info: res.data.Info,
        Wages: res.data.Wages,
        Category: res.data.Category,
        Contact: res.data.Contact,
      });
    } else {
      messageApi.open({
        type: "error",
        content: "ไม่พบข้อมูลผู้ใช้",
      });
      setTimeout(() => {
        navigate("/work");
      }, 2000);
    }
  };

  useEffect(() => {
    if (id) {
      getWorkById(id);
    }
  }, [id]);

  const generateRandomWorkID = () => {
    const letters = Math.random().toString(36).substring(2, 4).toUpperCase();
    const digits = Math.floor(100 + Math.random() * 900); // Generates a number between 100 and 999
    return `${letters}${digits}`;
  };

  const onFinish = async (values: any) => {
    let payload = {
      ...values,
      WorkID: id ? undefined : generateRandomWorkID(), // Generate WorkID only for creating new work
    };

    let res;
    if (id) {
      // Update existing work
      res = await UpdateWorkById(id, payload);
    } else {
      // Create new work
      res = await CreateWork(payload);
    }

    if (res.status === 200 || res.status === 201) {
      messageApi.open({
        type: "success",
        content: id ? "แก้ไขข้อมูลสำเร็จ" : "สร้างข้อมูลสำเร็จ",
      });
      setTimeout(() => {
        navigate("/work");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  return (
    <div>
      {contextHolder}
      <Row justify="center" style={{ marginTop: '40px' }}>
        <Col>
          <Button type="primary" htmlType="submit" onClick={() => navigate('/work')}>
            EDIT
          </Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit" onClick={() => navigate('/go')}>
            PW
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h1>{id ? "EDIT WORK" : "CREATE WORK"}</h1>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Space direction="vertical" size={30} style={{ textAlign: 'center' }}>
            <Avatar shape="square" size={200} src={imageUrl} />
            <Text strong>{userName}</Text> {/* Display user name */}
          </Space>
        </Col>
        <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Row gutter={[200, 16]} justify="center">
              <Col span={24} md={12}>
                <Form.Item
                  label="รายละเอียดงาน"
                  name="info"
                  rules={[{ required: true, message: 'กรุณากรอกข้อความเพิ่มเติมที่นี่' }]}
                >
                  <Input.TextArea
                    placeholder="กรุณากรอกข้อความเพิ่มเติมที่นี่"
                    style={{ width: '1000px', height: '300px', boxSizing: 'border-box' }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                  <Form.Item
                    label="ค่าจ้าง"
                    name="wages"
                    rules={[{ required: true, message: 'กรุณากรอกข้อความที่นี่' }]}
                  >
                    <InputNumber min={0} max={10000000}
                      placeholder="กรุณากรอกข้อความที่นี่"
                      style={{ width: '100%', maxWidth: '300px', height: '40px' }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="หมวดหมู่"
                    name="category"
                    rules={[{ required: true, message: 'กรุณาเลือกหมวดหมู่' }]}
                  >
                    <Select
                      style={{ width: '100%', maxWidth: '300px' }}
                      onChange={handleChange}
                      options={[
                        { value: 'ออกแบบเว็บไซต์', label: 'ออกแบบเว็บไซต์' },
                        { value: 'เขียนบทความ', label: 'เขียนบทความ' },
                        { value: 'แปลภาษาอังกฤษ-ไทย', label: 'แปลภาษาอังกฤษ-ไทย' },
                        { value: 'การตลาด', label: 'การตลาด' },
                        { value: 'นักพัฒนาแอปพลิเคชันมือถือ', label: 'นักพัฒนาแอปพลิเคชันมือถือ' },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Contact"
                    name="contact"
                    rules={[{ required: true, message: 'กรุณากรอกข้อมูลที่นี่' }]}
                  >
                    <Input
                      placeholder="กรุณากรอกข้อมูลที่นี่"
                      style={{ width: '100%', maxWidth: '300px', height: '40px' }}
                    />
                  </Form.Item>
                </Space>
              </Col>
            </Row>
            <Row justify="center" style={{ marginTop: '40px' }}>
              <Col>
                <Button type="primary" htmlType="submit">
                  POST
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Row>
    </div>
  );
}
