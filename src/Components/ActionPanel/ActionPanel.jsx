import { DownloadOutlined } from '@ant-design/icons';
import { Button, Row, Space } from 'antd';
import moment from 'moment';
import React from 'react';
import { ExcelRenderer } from 'react-excel-renderer';
import ReactExport from 'react-export-excel-xlsx-fix';
import { toast } from 'react-toastify';
import { getListUserInfo } from '../../API/API';
import { excelDateToJSDate } from '../../Constants/Constants';
import "./css.css";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ActionPanel = (props) => {
  const fileHandler = (event) => {
    let fileObj = event.target.files[0];

    toast.success("Tải lên " + fileObj.name + " thành công");

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) console.log(err);
      else {
        const listUserInfo = getListUserInfo();

        for (let i = 1; i < resp.rows.length; i++) {
          const dateModified = resp.rows[i][0] ?
            moment(excelDateToJSDate(resp.rows[i][0])).format("DD/MM/YYYY")?.toString()
            :
            moment().format("DD/MM/YYYY");

          const userInfo = {
            date: dateModified,
            name: resp.rows[i][2]?.toString(),
            phone: resp.rows[i][3]?.toString(),
            email: resp.rows[i][4]?.toString(),
            money: resp.rows[i][5]?.toString(),
            bank: resp.rows[i][6]?.toString(),
            address: resp.rows[i][7]?.toString(),
            book: resp.rows[i][8]?.toString(),
            status: resp.rows[i][9]?.toString(),
            course: resp.rows[i][10]?.toString(),
            courseStatus: resp.rows[i][11]?.toString(),
            note: resp.rows[i][12]?.toString(),
            ladingCode: resp.rows[i][13]?.toString()
          }

          listUserInfo.push(userInfo);
        }

        props.handleSaveData(listUserInfo);
        toast.info("Cập nhật danh sách thành công");

        event.target.value = null;
      }
    });
  }

  const dataSet = [
    {
      columns: [
        { value: "Ngày", widthPx: 100 },
        { value: "Stt", widthPx: 50 },
        { value: "Họ và Tên", widthPx: 150 },
        { value: "SĐT", widthPx: 80 },
        { value: "Email", widthPx: 200 },
        { value: "Tiền", widthPx: 80 },
        { value: "Bank", widthPx: 50 },
        { value: "Địa Chỉ", widthPx: 150 },
        { value: "Sách", widthPx: 100 },
        { value: "Tình Trạng", widthPx: 50 },
        { value: "Khóa Học", widthPx: 100 },
        { value: "Trạng Thái Khóa Học", widthPx: 50 },
        { value: "Ghi Chú", widthPx: 200 },
        { value: "Mã Vận Đơn", widthPx: 100 },
      ],
      data: props.dataSource.map(data => [
        { value: data.date },
        { value: data.key },
        { value: data.name },
        { value: data.phone },
        { value: data.email },
        { value: data.money },
        { value: data.bank },
        { value: data.address },
        { value: data.book },
        { value: data.status },
        { value: data.course },
        { value: data.courseStatus },
        { value: data.note },
        { value: data.ladingCode }
      ])
    },
  ];

  return (
    <Row justify="end">
      <Space>
        <Button type="primary" size="large" onClick={() => props.addNewOnClick()}>
          Thêm mới
        </Button>
        <Button type="primary" danger size="large" onClick={() => props.handleClearListUserInfo()}>
          Xóa hết
        </Button>
        <div className="upload-btn-wrapper">
          <button type="button" className="ant-btn ant-btn-file ant-btn-lg">
            <span role="img" aria-label="upload" className="anticon anticon-upload">
              <svg viewBox="64 64 896 896" focusable="false" data-icon="upload" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
              </svg>
            </span>
            <span>Tải excel</span>
          </button>
          <input type="file" name="myfile" onChange={fileHandler} />
        </div>
        {props.dataSource.length > 0 &&
          <ExcelFile
            element={
              <Button icon={<DownloadOutlined />} size="large">
                Xuất excel
              </Button>
            }
          >
            <ExcelSheet dataSet={dataSet} name="Test" />
          </ExcelFile>
        }
      </Space>
    </Row>
  );
}

export default ActionPanel;