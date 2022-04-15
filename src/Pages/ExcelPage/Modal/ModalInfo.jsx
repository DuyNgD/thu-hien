import { Button, Col, DatePicker, Form, Input, Modal, Row } from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import 'moment/locale/vi';
import React from 'react';
import { dateFormat } from '../../../Constants/Constants';

const ModalInfo = (props) => {
  const [form] = Form.useForm();

  const userInfoSelected = props.userInfoSelected ? props.userInfoSelected : {};

  React.useLayoutEffect(() => {
    form.resetFields();
  }, [userInfoSelected]);

  const userInfoInit = {
    date: userInfoSelected?.date ? moment(userInfoSelected.date, "DD/MM/YYYY") : moment(),
    name: userInfoSelected?.name ? userInfoSelected.name : "",
    phone: userInfoSelected?.phone ? userInfoSelected.phone : "",
    email: userInfoSelected?.email ? userInfoSelected.email : "",
    money: userInfoSelected?.money ? userInfoSelected.money : "",
    bank: userInfoSelected?.bank ? userInfoSelected.bank : "",
    address: userInfoSelected?.address ? userInfoSelected.address : "",
    book: userInfoSelected?.book ? userInfoSelected.book : "",
    status: userInfoSelected?.status ? userInfoSelected.status : "",
    course: userInfoSelected?.course ? userInfoSelected.course : "",
    courseStatus: userInfoSelected?.courseStatus ? userInfoSelected.courseStatus : "",
    note: userInfoSelected?.note ? userInfoSelected.note : "",
    ladingCode: userInfoSelected?.ladingCode ? userInfoSelected.ladingCode : "",
  };

  const onFinish = (values) => {
    values.date = moment(values.date).format("DD/MM/YYYY");

    if (userInfoSelected.key) {
      values.key = userInfoSelected.key;

      props.handleEditInfo(values);
    }
    else
      props.handleSaveInfo(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Thông tin học viên"
      visible={props.showModalInfo}
      footer={[
        <Button type="primary" size="large" form="userInfo" key="submit" htmlType="submit">
          Lưu
        </Button>
      ]}
      onCancel={props.handleCloseModalInfo}
      width={860}
      forceRender
    >
      <Form
        id="userInfo"
        name="userInfo"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        initialValues={userInfoInit}
      >
        <Row gutter={16}>
          <Col className="gutter-row" xs={12} xl={12}>
            <Form.Item
              label="Ngày"
              name="date"
            >
              <DatePicker locale={locale} format={dateFormat} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" xs={12} xl={12}>
            <Form.Item
              label="Họ và Tên"
              name="name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="SĐT"
              name="phone"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tiền"
              name="money"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Bank"
              name="bank"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
            >
              <TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={12} xl={12}>
            <Form.Item
              label="Sách"
              name="book"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tình trạng"
              name="status"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Khóa học"
              name="course"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Trạng thái Khóa học"
              name="courseStatus"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mã vận đơn"
              name="ladingCode"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ghi chú"
              name="note"
            >
              <TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalInfo;