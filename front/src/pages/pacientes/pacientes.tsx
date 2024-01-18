import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import "./style.css";
import { FaPlus } from "react-icons/fa6";
import SearchBox from "../../components/SearchBox";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsArrowDownUp, BsThreeDots } from "react-icons/bs";
import { Dropdown, Table } from "react-bootstrap";
import ModalDelete from "../../components/ModalDelete";
import ModalEdit from "../../components/ModalEdit";
import axios from "axios";
import toast from "react-hot-toast";

export function Pacientes(): JSX.Element {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [cpfDelete, setCpfDelete] = useState("");
  const [cpfEdit, setCpfEdit] = useState("");
  const [patientsList, setPatientsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      if (!loading) return;
      const response = await axios.get(`http://localhost:3030/profile`);
      setLoading(false);
      setPatientsList(response.data);
    };
    fetchData();
  }, [patientsList, loading]);

  const handleOpenModalDelete = (cpf: string) => {
    setCpfDelete(cpf);
    setShowModalDelete(true);
  };
  const handleCloseModalDelete = () => {
    setLoading(true);
    setShowModalDelete(false);
  };

  const handleOpenModalEdit = (cpf: string) => {
    setCpfEdit(cpf);
    setShowModalEdit(true);
  };
  const handleCloseModalEdit = () => {
    setLoading(true);
    setShowModalEdit(false);
  };

  const handleOpenModalAdd = () => setShowModalAdd(true);
  const handleCloseModalAdd = () => {
    setLoading(true);
    setShowModalAdd(false);
  };

  const handleSort = (criteria: string) => {
    const sortedList = [...patientsList].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[criteria] < b[criteria] ? -1 : 1;
      } else {
        return a[criteria] > b[criteria] ? -1 : 1;
      }
    });

    setPatientsList(sortedList);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleSearch = async (searchTerm: string) => {
    try {
      const response: any = await axios.get(
        `http://localhost:3030/search?term=${searchTerm}`
      );
      if (Array.isArray(response.data) && response.data.length > 0) {
        setPatientsList(response.data);
      } else {
        setPatientsList([]);
      }
    } catch (error) {
      toast.error("Erro ao realizar pesquisa.");
    }
  };

  return (
    <>
      <div className="box">
        <div className="container">
          <img src={logo} className="imageLogo" />
        </div>
        <div className="pacientes">
          <div className="box-pacientes">
            <div className="container-one">Listagem de pacientes</div>
            <div className="container-two">
              <SearchBox onSearch={handleSearch} />
            </div>
            <div className="container-three">
              <div className="container">
                <FaPlus />
                <button
                  onClick={() => handleOpenModalAdd()}
                  className="button-add-paciente"
                >
                  Adicionar paciente
                </button>
              </div>
            </div>
          </div>
          <div className="box-table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    Nome{" "}
                    <button
                      onClick={() => handleSort("patient")}
                      className="button-table-order"
                    >
                      <BsArrowDownUp />
                    </button>
                  </th>
                  <th>
                    CPF{" "}
                    <button
                      onClick={() => handleSort("cpf")}
                      className="button-table-order"
                    >
                      <BsArrowDownUp />
                    </button>
                  </th>
                  <th>
                    Data de nascimento{" "}
                    <button
                      onClick={() => handleSort("birth")}
                      className="button-table-order"
                    >
                      <BsArrowDownUp />
                    </button>
                  </th>
                  <th>
                    E-mail{" "}
                    <button
                      onClick={() => handleSort("email")}
                      className="button-table-order"
                    >
                      <BsArrowDownUp />
                    </button>
                  </th>
                  <th>
                    Cidade{" "}
                    <button
                      onClick={() => handleSort("city")}
                      className="button-table-order"
                    >
                      <BsArrowDownUp />
                    </button>
                  </th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {patientsList.map((patient: any) => (
                  <tr key={patient.cpf}>
                    <td>{patient.patient}</td>
                    <td>{patient.cpf}</td>
                    <td>{patient.birth}</td>
                    <td>{patient.email}</td>
                    <td>{patient.city}</td>
                    <td>
                      <Dropdown drop="end">
                        <Dropdown.Toggle
                          variant="link"
                          className="dropdown-toggle-no-arrow"
                        >
                          <button className="button-table">
                            <BsThreeDots />
                          </button>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => handleOpenModalEdit(patient.cpf)}
                          >
                            Editar
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleOpenModalDelete(patient.cpf)}
                          >
                            Excluir
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <ModalDelete
          cpf={cpfDelete}
          showModal={showModalDelete}
          handleClose={handleCloseModalDelete}
        />
        <ModalEdit
          showModal={showModalEdit}
          handleClose={handleCloseModalEdit}
          cpf={cpfEdit}
        />
        <ModalEdit showModal={showModalAdd} handleClose={handleCloseModalAdd} />
      </div>
    </>
  );
}
