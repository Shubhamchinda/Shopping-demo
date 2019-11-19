import React from "react";

import "./styles.css";

const TableBody = props => {
  const handleEditShow = (data) => {
    const { updateShow, editData } = props;

    updateShow && updateShow(true);
    editData && editData(data)

  };

  const handleDelete = (_id) => {
    const { onDelete } = props

    onDelete && onDelete(_id)
  }

  const { tbody } = props;
  const tableBody =
    tbody &&
    tbody.map((data, i) => {
      const { custAddress, dueDate, num, phone, name, _id } = data;
      return (
        <tr key={_id}>
          <td>{i + 1}</td>
          <td>{num}</td>
          <td>{dueDate}</td>
          <td>{name}</td>
          <td>{custAddress}</td>
          <td>{phone}</td>
          <td>
            <button
              type="button"
              class="btn btn-info btn-block"
              onClick={() => handleEditShow(data)}
            >
              Edit
            </button>
            <button type="button" class="btn btn-danger btn-block" onClick={() => handleDelete(data._id)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  return (
    <>
      <tbody>{tableBody}</tbody>
    </>
  );
};

export default TableBody;
