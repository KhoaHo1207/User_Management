import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalAddNew(props) {
  //   const [show, setShow] = useState(false);
  const { openAddNew, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    if (res && res.id) {
      handleUpdateTable({ first_name: name, id: res.id });
      toast.success("Added new user successfuylly");
      handleClose();
      setName("");
      setJob("");
    }
    return;
  };
  return (
    <>
      {/* <Button variant="primary" onClick={openAddNew}>
        Launch demo modal
      </Button> */}

      <Modal show={openAddNew} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD NEW USER</Modal.Title>
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
              {/* <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small> */}
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
            {/* <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div> */}
            {/* <button type="submit" className="btn btn-primary">
              Submit
            </button> */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;
