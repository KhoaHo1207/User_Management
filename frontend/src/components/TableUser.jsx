import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import { Button } from "react-bootstrap";
function TableUser() {
  const [listUser, setListUser] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [openAddNew, setOpenAddNew] = useState(false);

  const handleOpenAddNew = () => {
    setOpenAddNew(true);
  };

  const handleClose = () => {
    setOpenAddNew(false);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (currPage) => {
    let res = await fetchAllUser(currPage);
    console.log(res);
    if (res && res?.data) {
      setListUser(res?.data);
      setTotalPage(+res?.total_pages);
    }
  };

  const handlePageClick = (e) => {
    getUsers(e.selected + 1);
  };

  const handleUpdateTable = (user) => {
    setListUser([...listUser, user]);
  };
  return (
    <>
      <div className="d-flex flex-row justify-content-between my-3">
        <span className="fs-5">
          <b>List Users: </b>
        </span>
        <Button variant="success" onClick={() => handleOpenAddNew()}>
          Add new user
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUser.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={(e) => handlePageClick(e)}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        openAddNew={openAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
}

export default TableUser;
