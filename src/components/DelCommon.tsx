import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { Button, Modal } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
export type DelCommonProps = {
  show: boolean;
  toDeleteId: string;
  handleClose: () => void;
  setIsDelOpen: (x: boolean) => void;
};

export default function DelCommon({ show, handleClose, toDeleteId, setIsDelOpen }: DelCommonProps) {
  const router = useRouter();

  const execDeleteOperation = async () => {
    console.log('toDeleteId', toDeleteId)
    setIsDelOpen(!show)
    try {
      const response = await axios.delete(`/${window.location.pathname.split("/")[1]}/${toDeleteId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('access_token')
        }
      })
      // window.location.reload()
      setTimeout(() => {
        router.push(`${window.location.pathname}`);
      }, 200)
      console.log('response', response)
    } catch (e: any) {
      console.log('response', e)
      setTimeout(() => {
        router.push(`${window.location.pathname}`);
      }, 200)
    }
  }
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
          onClick={execDeleteOperation}
          className="btn btn-greens w-25"
        >
          Yes, Delete It
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
