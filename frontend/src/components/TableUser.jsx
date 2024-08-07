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
import _, { debounce, result } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";
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
  const [search, setSearch] = useState("");
  const [dataExport, setDataExport] = useState([]);
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
  };

  const handleSearchDebounced = debounce(
    (term, listUser, setListUser, getUsers) => {
      if (term) {
        let cloneListUser = _.clone(listUser); // Sử dụng sao chép nông
        cloneListUser = cloneListUser.filter((item) =>
          item.email.includes(term)
        );
        setListUser(cloneListUser);
      } else {
        getUsers(1);
      }
    },
    500
  ); // Giảm thời gian trì hoãn xuống 500ms

  const handleSearch = (e) => {
    console.log(e.target.value);
    let term = e.target.value;
    setSearch(term);
    handleSearchDebounced(term, listUser, setListUser, getUsers);
  };

  const handleAddImport = (list) => {
    let cloneListUser = listUser;
    cloneListUser = [...cloneListUser, ...list];
    setListUser(cloneListUser);
  };
  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];
  // const handleSearch = debounce((e) => {
  //   console.log(e.target.value);
  //   let term = e.target.value;
  //   setSearch(term);
  //   console.log(search);
  //   if (term) {
  //     let cloneListUser = _.cloneDeep(listUser);
  //     cloneListUser = cloneListUser.filter((item) => item.email.includes(term)); //includes trả ra true hoặc false
  //     setListUser(cloneListUser);
  //   } else {
  //     getUsers(1);
  //   }
  // }, 2000);

  const getUserExport = (e, done) => {
    let result = [];
    if (listUser && listUser.length > 0) {
      result.push(["Id", "Email", "First Name", "Last Name"]);
      result = result.concat(
        listUser.map((item) => [
          item.id,
          item.email,
          item.first_name,
          item.last_name,
        ])
      );
      setDataExport(result);
      done();
    }
  };

  const handleImport = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];

      if (file.type !== "text/csv") {
        toast.error("Wrong type (text/csv)");
        return;
      }

      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Wrong format CSV file");
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    const newuser = {
                      email: item[0],
                      first_name: item[1],
                      last_name: item[2],
                    };
                    result.push(newuser);
                  }
                });
                handleAddImport(result);
                console.log("result", result);
              }
            } else {
              toast.error("Wrong format CSV file");
            }
          } else {
          }
          // console.log("Finished:", results.data);
        },
      });
      toast.success("Imported successfully");
    }
  };
  return (
    <>
      <div className="d-flex flex-row justify-content-between my-3">
        <span className="fs-5">
          <b>List Users: </b>
        </span>
        <div className="d-flex flex-row justify-content-center gap-2">
          <input
            id="Import"
            type="file"
            // accept=".csv"
            hidden
            onChange={(e) => handleImport(e)}
            className="cursor-pointer"
          />
          <button className="btn btn-warning cursor-pointer ">
            <i className="fa-solid fa-file-import"></i>
            <label htmlFor="Import" className="">
              Import
            </label>
          </button>
          <CSVLink
            data={dataExport}
            filename="Users.csv"
            className="btn btn-primary "
            asyncOnClick={true}
            onClick={getUserExport}
          >
            <i className="fa-solid fa-download"></i>
            Export
          </CSVLink>

          <Button variant="success" onClick={() => handleOpenAddNew()}>
            + Add new user
          </Button>
        </div>
      </div>
      <div className="col-6 my-4">
        <input
          type="text"
          name="search"
          className="form-control"
          value={search}
          placeholder="Search user by email..."
          onChange={handleSearch}
        />
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
