import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { LiaExchangeAltSolid } from "react-icons/lia";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _ from "lodash";
function TableUser() {
  const [listUser, setListUser] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [openAddNew, setOpenAddNew] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [dataUserEdit, setDateUserEdit] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDateUserDelete] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const handleOpenAddNew = () => {
    setOpenAddNew(true);
  };

  const handleClose = () => {
    setOpenAddNew(false);
    setOpenEditUser(false);
    setIsShowModalDelete(false);
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

  const handleOpenEditUser = (user) => {
    setOpenEditUser(true);
    setDateUserEdit(user);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUser(cloneListUser);
  };
  const handleDelete = (user) => {
    setIsShowModalDelete(true);
    setDateUserDelete(user);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
    setListUser(cloneListUser);
  };

  const handleSort = (sortField, sortBy) => {
    setSortField(sortField);
    setSortBy(sortBy);
    let cloneListUser = _.cloneDeep(listUser);
    // cloneListUser.sort((a, b) => a[sortField] - b[sortField]);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUser(cloneListUser);
    console.log(cloneListUser);
  };

  console.log(sortField, sortBy);
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
            <th className="d-flex flex-row justify-content-start gap-2">
              <div>ID</div>
              <div>
                <i
                  className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("id", "asc")}
                ></i>
                <i
                  className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("id", "desc")}
                ></i>
              </div>
            </th>
            <th>Email</th>
            <th className="d-flex flex-row justify-content-start gap-2">
              <div>First Name</div>
              <div>
                <i
                  className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("first_name", "asc")}
                ></i>
                <i
                  className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("first_name", "desc")}
                ></i>
              </div>
            </th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td className="d-flex flex-row justify-content-center gap-3">
                <Button
                  variant="warning"
                  onClick={() => handleOpenEditUser(user)}
                >
                  <LiaExchangeAltSolid /> Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user)}>
                  <MdDelete /> Delete
                </Button>
              </td>
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
      <ModalEditUser
        openEditUser={openEditUser}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
}

export default TableUser;
