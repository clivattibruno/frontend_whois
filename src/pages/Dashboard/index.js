import api from "../../api";
import React, { Component } from "react";
import { CSVLink } from "react-csv";

import {
  faArrowsRotate,
  faTrash,
  faMagnifyingGlass,
  faPlus,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";
import { FormControl } from "react-bootstrap/";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Form from "react-bootstrap/Form";

class Dashboard extends Component {
  state = {
    Clientes: [],
    isOpenclient: false,
    isOpenASclient: false,
    isOpenDelete: false,
    isOpenUpdate: false,
    isAlertAS: false,
    isSwitchPrefixOn: false,
    isSwitchASClientesOn: false,
    ASNew: "",
    ASPath: "",
    DeleteID: "",
    ASSearch: "",
    IPAdd: "",
    IPv4Manual: "",
    IPv6Manual: "",
    ASignore: "ok",
  };

  //Lista clientes
  async componentDidMount() {
    const response = await api.get("/clientes");
    this.setState({ Clientes: response.data.clientes });
  }

  //Modal novo AS
  openModalclient = () => this.setState({ isOpenclient: true });
  closeModalclient = () =>
    this.setState({
      isOpenclient: false,
      isAlertAS: false,
      isSwitchPrefixOn: false,
      isSwitchASClientesOn: false,
      ASNew: "",
      IPv4Manual: "",
      IPv6Manual: "",
      ASignore: "ok",
    });

  //Modal novo AS atras de cliente
  openModalASclient(aspath) {
    this.setState({ isOpenASclient: true, ASPath: aspath });
  }
  closeModalASclient = () =>
    this.setState({
      isOpenASclient: false,
      isAlertAS: false,
      isSwitchPrefixOn: false,
      isSwitchASClientesOn: false,
      ASNew: "",
      IPv4Manual: "",
      IPv6Manual: "",
      ASignore: "ok",
    });

  //Modal delete AS
  openModalDelete(aspath) {
    this.setState({ isOpenDelete: true, ASPath: aspath });
  }
  closeModalDelete = () => this.setState({ isOpenDelete: false });

  //Modal update AS
  openModalUpdate(asnumber, ipv4, ipv6) {
    this.setState({
      isOpenUpdate: true,
      ASNew: asnumber,
      IPv4Manual: ipv4,
      IPv6Manual: ipv6,
    });
  }
  closeModalUpdate = () =>
    this.setState({
      isOpenUpdate: false,
      ASNew: "",
      IPv4Manual: "",
      IPv6Manual: "",
      IPAdd: "",
    });

  //INPUT ADD IP Mudou
  IPInputChanged(event) {
    this.setState({
      IPAdd: event.target.value,
    });
  }

  //Alert AS
  openAlertAS = () => this.setState({ isAlertAS: true });
  closeAlertAS = () => this.setState({ isAlertAS: false });

  //Switch Prefix Mudou
  onSwitchPrefixAction = () =>
    this.setState({ isSwitchPrefixOn: !this.state.isSwitchPrefixOn });

  //Switch AS Mudou
  onSwitchASClientesAction = () =>
    this.setState({ isSwitchASClientesOn: !this.state.isSwitchASClientesOn });

  //INPUT AS IPv4 Mudou
  ASIPv4InputChanged(event) {
    this.setState({
      IPv4Manual: event.target.value,
    });
  }

  //INPUT AS IPv6 Mudou
  ASIPv6InputChanged(event) {
    this.setState({
      IPv6Manual: event.target.value,
    });
  }

  //INPUT AS Mudou
  ASNEWInputChanged(event) {
    this.setState({
      ASNew: event.target.value,
    });
  }
  //Cadastro AS
  async ASNEWButtonClicked() {
    if (this.state.ASNew != "") {
      if (this.state.isSwitchPrefixOn === false) {
        if (this.state.isSwitchASClientesOn === false) {
          this.setState({ ASignore: "ok" });
          console.log(this.state.ASignore);
        } else{
          this.setState({ ASignore: "ignore" });
          console.log(this.state.ASignore);
        }
        const add = await api
          .post("/clientes", { asinformado: this.state.ASNew, path: "null"})
          .then(function () {
            return "ok";
          })
          .catch(function () {
            return "erro";
          });

        if (add === "erro") {
          this.setState({ isAlertAS: true });
        } else {
          this.SEARCHButtonClicked();
          this.closeModalclient();
        }
      } else {
        const add = await api
          .post("/clientescomip", {
            asinformado: this.state.ASNew,
            path: "null",
            ipv4: this.state.IPv4Manual,
            ipv6: this.state.IPv6Manual,
          })
          .then(function () {
            return "ok";
          })
          .catch(function () {
            return "erro";
          });

        if (add === "erro") {
          this.setState({ isAlertAS: true });
        } else {
          this.SEARCHButtonClicked();
          this.closeModalclient();
        }
      }
    }
  }

  //INPUT AS atras de cliente Mudou
  CLIENTEASNEWInputChanged(event) {
    this.setState({
      ASNew: event.target.value,
    });
  }
  //Cadastro Cliente em AS
  async CLIENTEASNEWButtonClicked() {
    if (this.state.ASNew != "") {
      if (this.state.isSwitchPrefixOn === false) {
        const add = await api
          .post("/clientes", {
            asinformado: this.state.ASNew,
            path: this.state.ASPath,
          })
          .then(function () {
            return "ok";
          })
          .catch(function () {
            return "erro";
          });

        if (add === "erro") {
          this.setState({ isAlertAS: true });
        } else {
          this.SEARCHButtonClicked();
          this.closeModalASclient();
        }
      } else {
        const add = await api
          .post("/clientescomip", {
            asinformado: this.state.ASNew,
            path: this.state.ASPath,
            ipv4: this.state.IPv4Manual,
            ipv6: this.state.IPv6Manual,
          })
          .then(function () {
            return "ok";
          })
          .catch(function () {
            return "erro";
          });

        if (add === "erro") {
          this.setState({ isAlertAS: true });
        } else {
          this.SEARCHButtonClicked();
          this.closeModalASclient();
        }
      }
    }
  }

  //Delete cliente
  async DELETEButtonClicked() {
    await api.delete("/delete", { data: { aspathdelete: this.state.ASPath } });
    this.SEARCHButtonClicked();
    this.closeModalDelete();
  }

  //Update AS
  async UPDATEButtonClicked() {
    await api.put("/clientes/:update", { asinformado: this.state.ASNew });
    this.SEARCHButtonClicked();
    this.closeModalUpdate();
  }

  //Update IPs
  async deleteIPClicked() {
    await api.put("/updateip", {
      action: "delete",
      asinformado: this.state.ASNew,
      ipv4: this.state.IPv4Manual,
      ipv6: this.state.IPv6Manual,
      ipnew: this.state.IPAdd,
    });

    this.SEARCHButtonClicked();
    this.closeModalUpdate();
  }
  async insertIPClicked() {
    await api.put("/updateip", {
      action: "insert",
      asinformado: this.state.ASNew,
      ipv4: this.state.IPv4Manual,
      ipv6: this.state.IPv6Manual,
      ipnew: this.state.IPAdd,
    });

    this.SEARCHButtonClicked();
    this.closeModalUpdate();
  }

  //Pesquisa AS
  SEARCHInputChanged(event) {
    this.setState({
      ASSearch: event.target.value,
    });
  }
  async SEARCHButtonClicked() {
    if (this.state.ASSearch === "") {
      await api
        .get("/clientes")
        .then((response) =>
          this.setState({ Clientes: response.data.clientes })
        );
    } else {
      var AS = { asinformado: this.state.ASSearch };
      await api
        .post("/clientes/:as", AS)
        .then((response) =>
          this.setState({ Clientes: response.data.clientes })
        );
    }
  }

  render() {
    const { Clientes } = this.state;

    const { isSwitchPrefixOn } = this.state;
    const { isSwitchASClientesOn } = this.state;

    const headersCSV = [
      { label: "ASNumber", key: "asnumber" },
      { label: "Owner", key: "owner" },
      { label: "CNPJ", key: "cnpj" },
      { label: "IPv4", key: "ipv4" },
      { label: "IPv6", key: "ipv6" },
      { label: "ASPath", key: "aspath" },
    ];

    const csvLink = {
      filename: "clientes.csv",
      headers: headersCSV,
      data: Clientes,
    };

    const ASNEWhandleKeypress = (e) => {
      if (e.key === "Enter") {
        this.ASNEWButtonClicked();
      }
    };

    const CLIENTEASNEWhandleKeypress = (e) => {
      if (e.key === "Enter") {
        this.CLIENTEASNEWButtonClicked();
      }
    };

    const SEARCHhandleKeypress = (e) => {
      if (e.key === "Enter") {
        this.SEARCHButtonClicked();
      }
    };

    const regex1 = /((\^\()+(\d)+(_\)\+\$))/;
    const regex2 = /((\^\()+(\d)+(_\)\+)(\(+(\d)+_\)\+)(\$))/;
    const regex3 = /((\^\()+(\d)+(_\))\+(\(+(\d)+_\)\+)(\(+(\d)+_\)\+)(\$))/;
    const regex4 =
      /((\^\()+(\d)+(_\))\+(\(+(\d)+_\)\+)(\(+(\d)+_\)\+)(\(+(\d)+_\)\+)(\$))/;
    const regex5 =
      /((\^\()+(\d)+(_\))\+(\(+(\d)+_\)\+)(\(+(\d)+_\)\+)(\(+(\d)+_\)\+)(\(+(\d)+_\)\+)(\$))/;

    return (
      <div>
        <Stack direction="horizontal" gap={3}>
          <div className="ms-2">
            <img
              src={require("../../adyltelecom.png")}
              style={{
                maxWidth: "12rem",
              }}
              alt=""
            />
          </div>
          <Link className="mb-0 ms-auto" to="/aspathfilter">
            <Button variant="ligth">Script ASClientes</Button>
          </Link>
          <div className="ms-2" />
        </Stack>

        <p></p>

        <Stack direction="horizontal" gap={3}>
          <div className="ms-2" />
          <Button variant="outline-primary" onClick={this.openModalclient}>
            <strong>Cliente Novo</strong>
          </Button>{" "}
          <CSVLink {...csvLink}>
            <Button variant="outline-secondary">Export CSV</Button>
          </CSVLink>
          <InputGroup size="sm" className="mb-0 ms-auto w-25">
            <FormControl
              value={this.state.ASSearch}
              placeholder="Digite o AS que deseja pesquisar"
              onChange={this.SEARCHInputChanged.bind(this)}
              onKeyPress={SEARCHhandleKeypress}
            />
            <InputGroup.Text>
              <OverlayTrigger
                placement={"top"}
                overlay={<Tooltip>Pesquisar</Tooltip>}
              >
                <Button
                  variant="light"
                  onClick={() => this.SEARCHButtonClicked()}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
              </OverlayTrigger>
            </InputGroup.Text>
          </InputGroup>
        </Stack>

        <Modal
          show={this.state.isOpenclient}
          onHide={this.closeModalclient}
          centered
        >
          <Modal.Header>
            <Alert
              variant="danger"
              show={this.state.isAlertAS}
              onClose={this.closeAlertAS}
              dismissible
              style={{ width: "42rem" }}
            >
              <Alert.Heading class="text-center">
                <strong>ERRO</strong>
              </Alert.Heading>
              <p class="text-center">AS Informado não existe</p>
            </Alert>
          </Modal.Header>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar ASN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>Digite o ASN do cliente</InputGroup.Text>
              <FormControl
                value={this.state.ASNew}
                onChange={this.ASNEWInputChanged.bind(this)}
                onKeyPress={ASNEWhandleKeypress}
              />
            </InputGroup>

            <Form>
              <Form.Check
                inline
                type="switch"
                onChange={this.onSwitchPrefixAction.bind(this)}
                checked={isSwitchPrefixOn}
                id="switch-prefix"
                label="Inserir prefix manual"
              />

              <Form.Check
                inline
                type="switch"
                onChange={this.onSwitchASClientesAction.bind(this)}
                checked={isSwitchASClientesOn}
                id="switch-as_clientes"
                label="Ignore AS_Clientes"
              />
            </Form>

            <p></p>

            <InputGroup className="mb-3">
              <InputGroup.Text>IPv4</InputGroup.Text>
              <FormControl
                disabled={!isSwitchPrefixOn}
                value={this.state.IPv4Manual}
                onChange={this.ASIPv4InputChanged.bind(this)}
                placeholder="EX: 187.0.0.0/22 189.14.239.0/19 ..."
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>IPv6</InputGroup.Text>
              <FormControl
                disabled={!isSwitchPrefixOn}
                value={this.state.IPv6Manual}
                onChange={this.ASIPv6InputChanged.bind(this)}
                placeholder="EX: 2804:378::/32 2804:ac0::/48 ..."
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.ASNEWButtonClicked()}>
              Adicionar
            </Button>
            <Button variant="secondary" onClick={this.closeModalclient}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        <p></p>

        <Table bordered hover>
          <thead>
            <tr>
              <th>ASNumber</th>
              <th width="19%">Owner</th>
              <th width="9%">CNPJ</th>
              <th width="30%">IPv4</th>
              <th width="7%">IPv6</th>
              <th>aspath</th>
              <th width="8%"></th>
            </tr>
          </thead>
          <tbody>
            {Clientes.map((cliente) => (
              <tr
                key={cliente.id}
                style={{
                  background:
                    regex1.test(cliente.aspath) === true
                      ? "#D5F5E3"
                      : regex2.test(cliente.aspath) === true
                      ? "#ABEBC6"
                      : regex3.test(cliente.aspath) === true
                      ? "#82E0AA"
                      : regex4.test(cliente.aspath) === true
                      ? "#58D68D"
                      : regex5.test(cliente.aspath) === true
                      ? "#2ECC71"
                      : "#999",
                }}
              >
                <td>{cliente.asnumber}</td>
                <td>{cliente.owner}</td>
                <td>{cliente.cnpj}</td>
                <td>{cliente.ipv4}</td>
                <td>{cliente.ipv6}</td>
                <td>{cliente.aspath}</td>
                <td>
                  <OverlayTrigger
                    placement={"top"}
                    overlay={<Tooltip>Add AS</Tooltip>}
                  >
                    <Button
                      variant="warning"
                      onClick={() => this.openModalASclient(cliente.aspath)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </OverlayTrigger>{" "}
                  <OverlayTrigger
                    placement={"top"}
                    overlay={<Tooltip>Delete</Tooltip>}
                  >
                    <Button
                      variant="danger"
                      onClick={() => this.openModalDelete(cliente.aspath)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </OverlayTrigger>{" "}
                  <OverlayTrigger
                    placement={"top"}
                    overlay={<Tooltip>Atualizar IPs</Tooltip>}
                  >
                    <Button
                      variant="light"
                      onClick={() =>
                        this.openModalUpdate(
                          cliente.asnumber,
                          cliente.ipv4,
                          cliente.ipv6
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal
          show={this.state.isOpenASclient}
          onHide={this.closeModalASclient}
          centered
        >
          <Modal.Header>
            <Alert
              variant="danger"
              show={this.state.isAlertAS}
              onClose={this.closeAlertAS}
              dismissible
              style={{ width: "42rem" }}
            >
              <Alert.Heading class="text-center">
                <strong>ERRO</strong>
              </Alert.Heading>
              <p class="text-center">AS Informado não existe</p>
            </Alert>
          </Modal.Header>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar aspath</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>Digite o ASN do novo aspath</InputGroup.Text>
              <FormControl
                value={this.state.ASNew}
                onChange={this.ASNEWInputChanged.bind(this)}
                onKeyPress={CLIENTEASNEWhandleKeypress}
              />
            </InputGroup>

            <Form>
              <Form.Check
                inline
                type="switch"
                onChange={this.onSwitchPrefixAction.bind(this)}
                checked={isSwitchPrefixOn}
                id="switch-prefix"
                label="Inserir prefix manual"
              />
              <Form.Check
                inline
                type="switch"
                onChange={this.onSwitchASClientesAction.bind(this)}
                checked={isSwitchASClientesOn}
                id="switch-as_clientes"
                label="Ignore AS_Clientes"
              />
            </Form>

            <p></p>

            <InputGroup className="mb-3">
              <InputGroup.Text>IPv4</InputGroup.Text>
              <FormControl
                disabled={!isSwitchPrefixOn}
                value={this.state.IPv4Manual}
                onChange={this.ASIPv4InputChanged.bind(this)}
                placeholder="EX: 187.0.0.0/22 189.14.239.0/19 ..."
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>IPv6</InputGroup.Text>
              <FormControl
                disabled={!isSwitchPrefixOn}
                value={this.state.IPv6Manual}
                onChange={this.ASIPv6InputChanged.bind(this)}
                placeholder="EX: 2804:378::/32 2804:ac0::/48 ..."
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => this.CLIENTEASNEWButtonClicked()}
            >
              Adicionar
            </Button>
            <Button variant="secondary" onClick={this.closeModalASclient}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.isOpenDelete}
          onHide={this.closeModalDelete}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Deletar AS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Tem certeza que quer deletar o AS?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => this.DELETEButtonClicked()}>
              Deletar
            </Button>
            <Button variant="secondary" onClick={this.closeModalDelete}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.isOpenUpdate}
          onHide={this.closeModalUpdate}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Prefix AS</Modal.Title>
          </Modal.Header>
          <p></p>
          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                value={this.state.IPAdd}
                onChange={this.IPInputChanged.bind(this)}
                placeholder="EX: 187.0.0.0/22 2804:378::/32 ..."
              />
              <Button
                variant="outline-primary"
                onClick={() => this.insertIPClicked()}
              >
                Inserir
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => this.deleteIPClicked()}
              >
                Deletar
              </Button>
            </InputGroup>
          </Modal.Body>
          <Modal.Body>
            <div className="d-grid gap-2">
              <Button
                size="lg"
                variant="outline-dark"
                onClick={() => this.UPDATEButtonClicked()}
              >
                Recapturar prefixos
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModalUpdate}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Dashboard;
