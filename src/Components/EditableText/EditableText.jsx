import { Input } from 'antd';
import React from 'react';
import "./css.css";

const EditableText = (props) => {
  const [toggle, setToggle] = React.useState(false);
  const [stateValue, setStateValue] = React.useState(props.item[props.dataIndex]);
  // End Inits

  // Functions
  const handleToggleEdit = (bool) => {
    setToggle(bool);
  };

  const handleChangeValue = (event) => {
    setStateValue(event.target.value);
  };

  const handleEdit = () => {
    let itemModified = props.item;

    itemModified[props.dataIndex] = stateValue;

    props.callback(itemModified);
    handleToggleEdit(false);
  };

  // Render UI
  return toggle ? (
    <Input.TextArea
      type='text'
      value={stateValue}
      onChange={handleChangeValue}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          event.stopPropagation();

          handleEdit();
        }

        if (event.key === 'Escape') {
          setStateValue(props.item[props.dataIndex]);
          handleToggleEdit(false);
        }
      }}
    />
  ) : (
    <p onClick={() => handleToggleEdit(true)}>
      {stateValue}
    </p>
  );
};

export default EditableText;
