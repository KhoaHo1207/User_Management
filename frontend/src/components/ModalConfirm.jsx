import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";
import { deleteUser } from "../services/UserService";
function ModalConfirm(props) {
  //   const [show, setShow] = useState(false);
  const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } =
    props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleConfirmDelete = async () => {
    let res = await deleteUser(deleteUser.id);
    if (res && +res.statusCode === 204) {
      toast.success("Delete user successfully");
      handleClose();
      handleDeleteUserFromModal(dataUserDelete);
    } else {
      toast.error("Delete user failed");
    }
    console.log(res);
  };

  return (
    <>
      {/* <Button variant="primary" onClick={openAddNew}>
        Launch demo modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>ADD NEW USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <span> Are u sure delete this user ???</span>
            <br />
            <b>email = {dataUserDelete.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;
