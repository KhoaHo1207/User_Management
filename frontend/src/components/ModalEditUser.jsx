import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalEditUser(props) {
  //   const [show, setShow] = useState(false);
  const { openEditUser, handleClose, dataUserEdit, handleEditUserFromModal } =
    props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);
    if (res && res.updatedAt) {
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.id,
      });
    }
    handleClose();
    toast.success("Updated successfully");
  };

  useEffect(() => {
    if (openEditUser) {
      setName(dataUserEdit.first_name ?? "");
      setJob(dataUserEdit.job ?? "");
    }
  }, [dataUserEdit, openEditUser]);
  return (
    <>
      {/* <Button variant="primary" onClick={openAddNew}>
        Launch demo modal
      </Button> */}

      <Modal show={openEditUser} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT A USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group mb-4">
              <label className="mb-2">Name: </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label className="mb-2">Job: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditUser;
