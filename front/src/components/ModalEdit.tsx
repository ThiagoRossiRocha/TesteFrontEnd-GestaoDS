import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Nav,
  Form,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import imageProfile from "../images/profile.png";
import toast from "react-hot-toast";

interface Props {
  showModal: boolean;
  handleClose: () => void;
  cpf?: string;
}

const ModalEdit: React.FC<Props> = ({ cpf, showModal, handleClose }) => {
  const [paginaAtual, setPaginaAtual] = useState("informacoes-basicas");
  const [formData, setFormData] = useState({
    patient: "",
    surname: "",
    nationality: "",
    birth: "",
    cpf: "",
    rg: "",
    gender: "",
    civilStates: "",
    email: "",
    comments: "",
    cep: "",
    city: "",
    uf: "",
    address: "",
    number: "",
    neighborhood: "",
    complement: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (cpf) {
        try {
          const response = await axios.get(
            `http://localhost:3030/profile-edit/${cpf}`
          );

          const reversedBirth = response.data.birth
            .split("-")
            .reverse()
            .join("-");

          setFormData((prevData) => ({
            ...prevData,
            ...response.data,
            birth: reversedBirth,
          }));
        } catch (error) {
          console.error("Erro ao buscar informações do perfil:", error);
        }
      }
    };

    fetchData();
  }, [cpf]);

  const handleNavegacao = (pagina: string) => setPaginaAtual(pagina);

  const handleNext = () => setPaginaAtual("contato");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        !formData ||
        !formData.patient ||
        !formData.surname ||
        !formData.nationality ||
        !formData.birth ||
        !formData.cpf ||
        !formData.rg ||
        !formData.gender ||
        !formData.civilStates ||
        !formData.comments ||
        !formData.cep ||
        !formData.city ||
        !formData.uf ||
        !formData.address ||
        !formData.number ||
        !formData.neighborhood ||
        !formData.complement
      ) {
        return toast.error("Por favor, preencha todos os campos obrigatórios.");
      }
      const formattedBirth = formData.birth.split("-").reverse().join("-");

      await axios.post(`http://localhost:3030/profile`, {
        ...formData,
        birth: formattedBirth,
      });
      toast.success("Usuário registrado com sucesso!");
      handleClose();
    } catch (error) {
      toast.error("Erro ao registrar usuário!");
    }
  };

  const handlePesquisarCep = async () => {
    if (formData.cep) {
      buscarInformacoesCep(formData.cep);
    }
  };

  const buscarInformacoesCep = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log(response);
      if (
        !response.data ||
        Object.keys(response.data).length === 0 ||
        response.data.erro
      ) {
        toast.error("CEP não encontrado.");
        return;
      }
      setFormData({
        ...formData,
        city: response.data.localidade,
        uf: response.data.uf,
        address: response.data.logradouro,
        number: "",
        neighborhood: response.data.bairro,
        complement: response.data.complemento,
      });
      toast.success("Dados para este CEP inseridos com sucesso.");
    } catch (error) {
      toast.error("Erro ao buscar informações do CEP.");
    }
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Nav variant="tabs" defaultActiveKey={paginaAtual}>
            <Nav.Item className="d-flex">
              <Nav.Link
                eventKey="informacoes-basicas"
                onClick={() => handleNavegacao("informacoes-basicas")}
                className={`me-2 ${
                  paginaAtual === "informacoes-basicas" ? "selected" : ""
                }`}
              >
                Informações Básicas
              </Nav.Link>
              <Nav.Link
                eventKey="contato"
                onClick={() => handleNavegacao("contato")}
                className={`${paginaAtual === "contato" ? "selected" : ""}`}
              >
                Contato
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Header>
        <Modal.Body>
          {paginaAtual === "informacoes-basicas" && (
            <div>
              <Form>
                <Row>
                  <Col md={4}>
                    <img src={imageProfile} className="mx-auto" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="formPaciente">
                      <Form.Label>Paciente</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) =>
                          setFormData({ ...formData, patient: e.target.value })
                        }
                        value={formData.patient}
                        placeholder="Digite"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formApelido">
                      <Form.Label>Apelido</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) =>
                          setFormData({ ...formData, surname: e.target.value })
                        }
                        value={formData.surname}
                        placeholder="Digite"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formNacionalidade">
                      <Form.Label>Nacionalidade</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nationality: e.target.value,
                          })
                        }
                        value={formData.nationality}
                        placeholder="Digite"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="formNascimento">
                      <Form.Label>Nascimento</Form.Label>
                      <Form.Control
                        type="date"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            birth: e.target.value,
                          })
                        }
                        value={formData.birth}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formCPF">
                      <Form.Label>CPF</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cpf: e.target.value,
                          })
                        }
                        value={formData.cpf}
                        placeholder="Digite"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formRG">
                      <Form.Label>RG</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            rg: e.target.value,
                          })
                        }
                        value={formData.rg}
                        placeholder="Digite"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="formGenero">
                      <Form.Label>Gênero</Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            gender: e.target.value,
                          })
                        }
                        value={formData.gender}
                        as="select"
                      >
                        <option>Selecione</option>
                        <option>Masculino</option>
                        <option>Feminino</option>
                        <option>Outro</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formEstadoCivil">
                      <Form.Label>Estado Civil</Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            civilStates: e.target.value,
                          })
                        }
                        value={formData.civilStates}
                        as="select"
                      >
                        <option>Selecione</option>
                        <option>Solteiro(a)</option>
                        <option>Casado(a)</option>
                        <option>Divorciado(a)</option>
                        <option>Viúvo(a)</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        value={formData.email}
                        placeholder="Digite"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="formObservacoes">
                      <Form.Label>Observações Adicionais</Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            comments: e.target.value,
                          })
                        }
                        value={formData.comments}
                        as="textarea"
                        rows={3}
                        placeholder="Digite"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              <br />
              <Modal.Footer>
                <Button variant="primary" onClick={handleNext}>
                  Próximo
                </Button>
              </Modal.Footer>
            </div>
          )}
          {paginaAtual === "contato" && (
            <div>
              <Form>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="formCep">
                      <Form.Label>CEP</Form.Label>
                      <InputGroup>
                        <Form.Control
                          value={formData.cep}
                          onChange={(e) =>
                            setFormData({ ...formData, cep: e.target.value })
                          }
                          type="text"
                          placeholder="Digite"
                        />
                        <Button
                          variant="outline-primary"
                          onClick={handlePesquisarCep}
                        >
                          <BsSearch />
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formCidade">
                      <Form.Label>Cidade</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.city}
                        placeholder="Digite"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formUf">
                      <Form.Label>UF</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.uf}
                        placeholder="Digite"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="formEndereco">
                      <Form.Label>Endereço</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.address}
                        placeholder="Digite"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formNumero">
                      <Form.Label>Número</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) =>
                          setFormData({ ...formData, number: e.target.value })
                        }
                        value={formData.number}
                        placeholder="Digite"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formBairro">
                      <Form.Label>Bairro</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.neighborhood}
                        placeholder="Digite"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="formComplemento">
                      <Form.Label>Complemento</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.complement}
                        placeholder="Digite"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              <br />
              <Modal.Footer>
                <Button onClick={handleSubmit} variant="primary">
                  Salvar
                </Button>
              </Modal.Footer>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalEdit;
