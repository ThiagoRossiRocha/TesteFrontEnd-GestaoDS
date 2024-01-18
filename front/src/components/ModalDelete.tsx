import React from "react";
import { Modal, Button } from "react-bootstrap";
import imageDelete from "../images/image-delete.png";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
  showModal: boolean;
  handleClose: () => void;
  cpf: string;
}

const ModalDelete: React.FC<Props> = ({ cpf, showModal, handleClose }) => {
  const handleDeletePatient = async () => {
    if (!cpf) return toast.error("Erro, paciente sem CPF.");
    await axios.delete(`http://localhost:3030/profile/${cpf}`);
    toast.success("Paciente excluido com sucesso!");
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#510972" }}>
          Excluir paciente?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img src={imageDelete} className="mx-auto" />
        <br />
        <br />
        <p>tem certexa que deseja excluir o paciente selecionado?</p>
        <b>Essa ação não poderá ser desfeita.</b>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="btn btn-outline-primary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="btn btn-danger" onClick={() => handleDeletePatient()}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;
