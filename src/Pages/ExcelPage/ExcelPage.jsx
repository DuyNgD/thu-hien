import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Space, Table } from "antd";
import confirm from 'antd/lib/modal/confirm';
import React from 'react';
import { toast } from 'react-toastify';
import { clearListUserInfo, getListUserInfo, saveListUserInfo } from "../../API/API";
import ActionPanel from '../../Components/ActionPanel/ActionPanel';
import ModalInfo from "./Modal/ModalInfo";

const ExcelPage = () => {
  const [dataSource, setDataSource] = React.useState(getListUserInfo());
  const [showModalInfo, setShowModalInfo] = React.useState(false);
  const [userInfoSelected, setUserInfoSelected] = React.useState(null);
  // End Initial

  // Functions
  const handleShowModalInfo = (userInfoSelected = null) => {
    setUserInfoSelected(userInfoSelected);
    setShowModalInfo(true);
  };

  const handleCloseModalInfo = () => {
    setShowModalInfo(false);
  };

  const handleShowModalConfirm = () => {
    confirm({
      title: 'Bạn có chắc muốn xóa tất cả?',
      icon: <ExclamationCircleOutlined />,
      onOk() {

      },
      okText: "Xóa",
      okType: 'danger',
      onCancel() {
        
      },
      cancelText: "Không"
    });
  }

  const handleSaveInfo = (values) => {
    const listUserInfo = getListUserInfo();

    // Add new user info to list
    listUserInfo.unshift(values);

    handleSaveData(listUserInfo);
    toast.success("Thêm thành công " + (values.name !== "" ? values.name : "STT " + values.key));
  };

  const handleEditInfo = (values) => {
    let listUserInfo = getListUserInfo();
    let index = listUserInfo.findIndex(userInfo => userInfo.key === values.key);

    listUserInfo[index] = values;

    handleSaveData(listUserInfo);
    toast.info("Cập nhật thông tin " + (values.name !== "" ? values.name : "STT " + values.key));
  };

  const handleDeleteUserInfo = (values) => {
    let listUserInfo = getListUserInfo();

    listUserInfo = listUserInfo.filter(userInfo => userInfo.key !== values.key);

    handleSaveData(listUserInfo);
    toast.warn("Đã xóa thông tin " + (values.name !== "" ? values.name : "STT " + values.key));
  };

  const handleSaveData = (data) => {
    setDataSource(data);
    saveListUserInfo(data);
  };

  const handleClearListUserInfo = () => {
    setDataSource([]);
    clearListUserInfo();
    toast.warn("Đã xóa tất cả thông tin");
  };

  const columns = [
    { title: 'Ngày', dataIndex: 'date', key: 'date', width: 120, fixed: 'left' },
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: 100,
      fixed: 'left',
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Họ và Tên',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      fixed: 'left'
    },
    { title: 'SĐT', dataIndex: 'phone', key: 'phone', width: 100, fixed: 'left' },
    { title: 'Email', dataIndex: 'email', key: 'email', width: 250 },
    {
      title: 'Tiền',
      dataIndex: 'money',
      key: 'money',
      width: 100,
      sorter: (a, b) => a.money - b.money,
      sortDirections: ['descend', 'ascend']
    },
    { title: 'Bank', dataIndex: 'bank', key: 'bank', width: 100 },
    { title: 'Địa Chỉ', dataIndex: 'address', key: 'address', width: 150 },
    { title: 'Sách', dataIndex: 'book', key: 'book', width: 100 },
    { title: 'Tình trạng', dataIndex: 'status', key: 'status', width: 100 },
    { title: 'Khóa học', dataIndex: 'course', key: 'course', width: 100 },
    { title: 'Trạng thái Khóa học', dataIndex: 'courseStatus', key: 'courseStatus', width: 100 },
    { title: 'Ghi Chú, Nguồn Chat', dataIndex: 'note', key: 'note', width: 120 },
    { title: 'Mã Vận Đơn', dataIndex: 'ladingCode', key: 'ladingCode', width: 120 },
    {
      title: 'Thực hiện',
      dataIndex: '',
      key: 'x',
      width: 200,
      fixed: 'right',
      render: (userInfo) => {
        return (
          <Space>
            <Button icon={<EditOutlined />} onClick={() => handleShowModalInfo(userInfo)}>Sửa</Button>
            <Button icon={<DeleteOutlined />} type="primary" danger onClick={() => handleDeleteUserInfo(userInfo)}>Xóa</Button>
          </Space>
        );
      }
    }
  ];

  // Render UI
  return (
    <>
      <ActionPanel
        addNewOnClick={handleShowModalInfo}
        dataSource={dataSource}
        handleSaveData={handleSaveData}
        handleClearListUserInfo={handleClearListUserInfo}
      // exportExcelOnclick={}
      />
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 2000, y: "80vh" }}
        pagination={{ position: ["bottomCenter"] }}
      />
      <ModalInfo
        showModalInfo={showModalInfo}
        userInfoSelected={userInfoSelected}
        handleCloseModalInfo={handleCloseModalInfo}
        handleSaveInfo={handleSaveInfo}
        handleEditInfo={handleEditInfo}
      />
    </>
  );
};

export default ExcelPage;