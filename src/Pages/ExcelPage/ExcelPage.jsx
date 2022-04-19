import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from "antd";
import confirm from 'antd/lib/modal/confirm';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { toast } from 'react-toastify';
import { clearListUserInfo, getListUserInfo, saveListUserInfo } from "../../API/API";
import ActionPanel from '../../Components/ActionPanel/ActionPanel';
import EditableText from '../../Components/EditableText/EditableText';
import ModalInfo from "./Modal/ModalInfo";

const ExcelPage = () => {
  const [dataSource, setDataSource] = React.useState(getListUserInfo());
  const [page, setPage] = React.useState(1);
  const [showModalInfo, setShowModalInfo] = React.useState(false);
  const [userInfoSelected, setUserInfoSelected] = React.useState(null);
  const [searchKeys, setSearchKeys] = React.useState({});
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
    handleCloseModalInfo();
  };

  const handleDeleteUserInfo = (values) => {
    let listUserInfo = getListUserInfo();

    listUserInfo = listUserInfo.filter(userInfo => userInfo.key !== values.key);

    handleSaveData(listUserInfo);
    toast.warn("Đã xóa thông tin " + (values.name !== "" ? values.name : "STT " + values.key));
  };

  const handleSaveData = (data) => {
    setUserInfoSelected(null);
    setDataSource(data);
    saveListUserInfo(data);
  };

  const handleClearListUserInfo = () => {
    setDataSource([]);
    clearListUserInfo();
    toast.warn("Đã xóa tất cả thông tin");
  };

  const handleSearchColumn = (dataIndex, value, callback) => {
    const searchKeysModified = JSON.parse(JSON.stringify(searchKeys));

    searchKeysModified[dataIndex] = value[0];
    setSearchKeys(searchKeysModified);

    callback();
  }

  const getColumnSearchProps = (dataIndex) => {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Nội dung tìm kiếm"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearchColumn(dataIndex, selectedKeys, confirm)}
            onBlur={() => handleSearchColumn(dataIndex, selectedKeys, confirm)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearchColumn(dataIndex, selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Tìm kiếm
            </Button>
            <Button
              size="small" style={{ width: 90 }}
              onClick={() => {
                handleSearchColumn(dataIndex, [null], () => { clearFilters(); confirm(); })
              }}
            >
              Xóa
            </Button>
          </Space>
        </div >
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      render: (value, item, index) =>
        searchKeys[dataIndex] ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchKeys[dataIndex]]}
            autoEscape
            textToHighlight={value ? value.toString() : ''}
          />
        ) : (
          <EditableText
            item={item}
            dataIndex={dataIndex}
            callback={(values) => handleEditInfo(values)}
          />
        )
    };
  };

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      fixed: 'left',
      ...getColumnSearchProps('date'),
    },
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: 100,
      fixed: 'left',
      ...getColumnSearchProps('key'),
      render: (value, item, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: 'Họ và Tên',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      fixed: 'left',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
      width: 100,
      fixed: 'left',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 250,
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Tiền',
      dataIndex: 'money',
      key: 'money',
      width: 100,
      ...getColumnSearchProps('money'),
    },
    {
      title: 'Bank',
      dataIndex: 'bank',
      key: 'bank',
      width: 100,
      ...getColumnSearchProps('bank'),
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Sách',
      dataIndex: 'book',
      key: 'book',
      width: 100,
      ...getColumnSearchProps('book'),
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      ...getColumnSearchProps('status'),
    },
    {
      title: 'Khóa học',
      dataIndex: 'course',
      key: 'course',
      width: 120,
      ...getColumnSearchProps('course'),
    },
    {
      title: 'Trạng thái Khóa học',
      dataIndex: 'courseStatus',
      key: 'courseStatus',
      width: 120,
      ...getColumnSearchProps('courseStatus'),
    },
    {
      title: 'Ghi Chú, Nguồn Chat',
      dataIndex: 'note',
      key: 'note',
      width: 200,
      ...getColumnSearchProps('note'),
    },
    {
      title: 'Mã Vận Đơn',
      dataIndex: 'ladingCode',
      key: 'ladingCode',
      width: 150,
      ...getColumnSearchProps('ladingCode'),
    },
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
    <Space direction="vertical" style={{ display: 'flex' }}>
      <ActionPanel
        addNewOnClick={handleShowModalInfo}
        dataSource={dataSource}
        handleSaveData={handleSaveData}
        handleClearListUserInfo={handleClearListUserInfo}
      />
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 2000, y: "75vh" }}
        pagination={{
          position: ["bottomCenter"],
          onChange(current) {
            setPage(current);
          }
        }}
      />
      <ModalInfo
        showModalInfo={showModalInfo}
        userInfoSelected={userInfoSelected}
        handleCloseModalInfo={handleCloseModalInfo}
        handleSaveInfo={handleSaveInfo}
        handleEditInfo={handleEditInfo}
      />
    </Space>
  );
};

export default ExcelPage;