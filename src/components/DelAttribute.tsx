import { Button, Modal } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
export type DelAttributeProps = {
  show: boolean;
  handleClose: () => void;
};

export default function DelAttribute({ show, handleClose }: DelAttributeProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="text-center "></Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h3 className="text-center text-danger mb-3">
          <RiDeleteBin6Line />
        </h3>

        <h5 className="text-center mb-3">
          Are You Sure! Want to Delete <span className="text-danger">demo</span>
          ?
        </h5>
        <small className="mb-0 text-center">
          Do you really want to delete these records? You can&apos;t view this in
          your list anymore if you delete!
        </small>
      </Modal.Body>
      <Modal.Footer className="modal-footers py-2 border-0 mt-3">
        <Button variant="" onClick={handleClose} className="btn btn-light w-25">
          No, Keep It
        </Button>
        <Button
          variant=""
          onClick={handleClose}
          className="btn btn-greens w-25"
        >
          Yes, Delete It
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
