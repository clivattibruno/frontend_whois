import api from '../../api';
import React, {Component} from 'react';
import {CSVLink} from 'react-csv';

import { faArrowsRotate, faTrash, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import {FormControl} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

class Dashboard extends Component{
    state= {
        Clientes: [],
        isOpenclient: false,
        isOpenASclient: false,
        isOpenDelete: false,
        isAlertAS: false,
        ASNew: "",
        ASPath: "",
        DeleteID: "",
        ASSearch: "",
      }
    
      //Lista clientes
      async componentDidMount(){
        const response = await api.get('/clientes');
        this.setState({Clientes: response.data.clientes});
      }

      //Modal novo AS
      openModalclient = () => this.setState({ isOpenclient: true });
      closeModalclient = () => this.setState({ isOpenclient: false, isAlertAS: false });

      //Modal novo AS atras de cliente
      openModalASclient(aspath) {
        //console.log(aspath);
        this.setState({ isOpenASclient: true, ASPath: aspath });
      }
      closeModalASclient = () => this.setState({ isOpenASclient: false, isAlertAS: false });

      //Modal delete AS
      openModalDelete(aspath) {
      //console.log(id);
      this.setState({ isOpenDelete: true, ASPath: aspath });
      }
      closeModalDelete = () => this.setState({ isOpenDelete: false });

      //Alert AS
      openAlertAS = () => this.setState({ isAlertAS: true });
      closeAlertAS = () => this.setState({ isAlertAS: false });

      //NOVO AS
      ASNEWInputChanged(event) {
        this.setState({
          ASNew: event.target.value
        });
      } 
      async ASNEWButtonClicked() {
        const add = await api.post('/clientes', { "asinformado": this.state.ASNew , "path": "null", })
        .then(function (response){
          //console.log("ok");
          return "ok";
        })
        .catch(function (error) {
          //console.log(error.response.data);
          return "erro";
        });

        if(add == 'erro'){
          //console.log(add);
          this.setState({ isAlertAS: true });
          //console.log(this.state.isAlertAS);
        }
        else {
        window.location.reload(false)
        }
      }

      //NOVO AS atras de cliente
      CLIENTEASNEWInputChanged(event) {
        this.setState({
          ASNew: event.target.value
        });
      }    
      async CLIENTEASNEWButtonClicked() {
        const add = await api.post('/clientes', { "asinformado": this.state.ASNew , "path": this.state.ASPath, })
        .then(function (response){
          //console.log("ok");
          return "ok";
        })
        .catch(function (error) {
          //console.log(error.response.data);
          return "erro";
        });
    
        if(add == 'erro'){
          //console.log(add);
          this.setState({ isAlertAS: true });
          //console.log(this.state.isAlertAS);
        }
        else {
        window.location.reload(false)
        }
      }

      //Delete cliente
      async DELETEButtonClicked() {
        await api.delete('/delete', {data: { "aspathdelete": this.state.ASPath }});
        window.location.reload(false)
      }

      //Update cliente
      async UPDATEButtonClicked(asnumber) {
        //console.log(asnumber);
        await api.put('/clientes/:update', { "asinformado": asnumber });
        window.location.reload(false)
      }

      //Pesquisa AS
      SEARCHInputChanged(event) {
        this.setState({
          ASSearch: event.target.value
        });
      }
      async SEARCHButtonClicked() {
        if(this.state.ASSearch == ""){
          const response =  await api.get('/clientes').
          then(response => this.setState({Clientes: response.data.clientes}));
        }
        else{
          var AS = { "asinformado": "AS"+this.state.ASSearch};
          const response =  await api.post('/clientes/:as', AS).
          then(response => this.setState({Clientes: response.data.clientes}));
        }
      };

      render(){
    
        const { Clientes } = this.state;

        const headersCSV = [
          {label: "ASNumber", key: "asnumber"},
          {label: "Owner", key: "owner"},
          {label: "CNPJ", key: "cnpj"},
          {label: "IPv4", key: "ipv4"},
          {label: "IPv6", key: "ipv6"},
          {label: "ASPath", key: "aspath"}
        ];

        const csvLink = {
          filename: "clientes.csv",
          headers: headersCSV,
          data: Clientes
        };

        const ASNEWhandleKeypress = e => {
          if (e.key === 'Enter'){
            this.ASNEWButtonClicked();
          }
        }

        const CLIENTEASNEWhandleKeypress = e => {
          if (e.key === 'Enter'){
            this.CLIENTEASNEWButtonClicked();
          }
        }

        const SEARCHhandleKeypress = e => {
          if (e.key === 'Enter'){
            this.SEARCHButtonClicked();
          }
        }

        const regex1 = /((\^\()+(\d)+(\_\)\+\$))/;
        const regex2 = /((\^\()+(\d)+(\_\)\+)(\(+(\d)+\_\)\+)(\$))/;
        const regex3 = /((\^\()+(\d)+(\_\))\+(\(+(\d)+\_\)\+)(\(+(\d)+\_\)\+)(\$))/;
        const regex4 = /((\^\()+(\d)+(\_\))\+(\(+(\d)+\_\)\+)(\(+(\d)+\_\)\+)(\(+(\d)+\_\)\+)(\$))/;
        const regex5 = /((\^\()+(\d)+(\_\))\+(\(+(\d)+\_\)\+)(\(+(\d)+\_\)\+)(\(+(\d)+\_\)\+)(\(+(\d)+\_\)\+)(\$))/;

        document.body.addEventListener('nv-enter', function (event) {
          console.log(event.key);
        });
    
        return(
          <div>     
            <div className='ms-2'>
            <img 
                  src={require('../../adyltelecom.png')}
                  className='img-fluid shadow-2-strong'
                  alt=''
                  style={{ maxWidth: '12rem' }}
                />
            </div>
            <p></p>
              <Stack direction="horizontal" gap={3}>
                <div className='ms-2'/>
                <Button variant="outline-primary" type="button" onClick={this.openModalclient} ><strong>Cliente Novo</strong></Button>
                {" "}
                <CSVLink {...csvLink}><Button variant="outline-secondary">Export CSV</Button></CSVLink>
                <InputGroup size="sm" className="mb-0 ms-auto w-25">
                  <FormControl
                      value={this.state.ASSearch}
                      onChange={this.SEARCHInputChanged.bind(this)}
                      aria-label="ASN"
                      placeholder="Digite o AS que deseja pesquisar"
                      aria-describedby="inputGroup-sizing-sm"
                      onKeyPress={SEARCHhandleKeypress}
                    />
                  <InputGroup.Text id="inputGroup-sizing-sm" >
                  <OverlayTrigger placement={'top'} overlay={<Tooltip>Pesquisar</Tooltip>}>
                    <Button variant="light" type="button" onClick={this.SEARCHButtonClicked.bind(this)}><FontAwesomeIcon icon={faMagnifyingGlass}/></Button>
                  </OverlayTrigger>
                  </InputGroup.Text>
                </InputGroup>
              </Stack>
              <Modal show={this.state.isOpenclient} onHide={this.closeModalclient} centered>
                <Modal.Header>
                  <Alert variant="danger" show={this.state.isAlertAS} onClose={this.closeAlertAS} dismissible style={{ width: "42rem" }}>
                    <Alert.Heading class="text-center"><strong>ERRO</strong></Alert.Heading>
                    <p class="text-center">AS Informado não existe</p>
                 </Alert>
                </Modal.Header>
                <Modal.Header closeButton>
                  <Modal.Title>Adicionar ASN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <InputGroup className="mb-3">
                    <InputGroup.Text 
                      id="inputGroup-sizing-default" 
                      >Digite o ASN do cliente
                    </InputGroup.Text>
                    <FormControl
                      value={this.state.ASNew}
                      onChange={this.ASNEWInputChanged.bind(this)}
                      aria-label="ASN"
                      aria-describedby="inputGroup-sizing-default"
                      onKeyPress={ASNEWhandleKeypress}
                    />
                  </InputGroup>
                </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={this.ASNEWButtonClicked.bind(this)}>Adicionar</Button>
                    <Button variant="secondary" onClick={this.closeModalclient}>Fechar</Button>
                  </Modal.Footer>
              </Modal>
            <p></p> 
            <Table bordered hover >
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
                {Clientes.map(cliente => (
                  <tr key={cliente.id} style={{ background: regex1.test(cliente.aspath) === true ? '#D5F5E3' : regex2.test(cliente.aspath) === true ? '#ABEBC6' : regex3.test(cliente.aspath) === true ? '#82E0AA' : regex4.test(cliente.aspath) === true ? '#58D68D' : regex5.test(cliente.aspath) === true ? '#2ECC71' : '#999' }}>
                        <td>{cliente.asnumber}</td>
                        <td>{cliente.owner}</td>
                        <td>{cliente.cnpj}</td>
                        <td>{cliente.ipv4}</td>
                        <td>{cliente.ipv6}</td>
                        <td>{cliente.aspath}</td>
                        <td>
                          <OverlayTrigger placement={'top'} overlay={<Tooltip>Add AS</Tooltip>}>
                            <Button variant="warning" type="button" onClick={this.openModalASclient.bind(this,cliente.aspath)}><FontAwesomeIcon icon={faPlus}/></Button>
                          </OverlayTrigger>{" "}
                          <OverlayTrigger placement={'top'} overlay={<Tooltip>Delete</Tooltip>}>
                            <Button variant="danger" type="button" onClick={this.openModalDelete.bind(this,cliente.aspath)}><FontAwesomeIcon icon={faTrash}/></Button>
                            </OverlayTrigger>{" "}
                          <OverlayTrigger placement={'top'} overlay={<Tooltip>Atualizar IPs</Tooltip>}>
                            <Button variant="light" type="button" onClick={this.UPDATEButtonClicked.bind(this,cliente.asnumber)}><FontAwesomeIcon icon={faArrowsRotate}/></Button>
                          </OverlayTrigger>
                        </td>
                    </tr>
                ))}
              </tbody>
            </Table>

            <Modal show={this.state.isOpenASclient} onHide={this.closeModalASclient} centered>
              <Modal.Header>
                <Alert variant="danger" show={this.state.isAlertAS} onClose={this.closeAlertAS} dismissible style={{ width: "42rem" }}>
                  <Alert.Heading class="text-center"><strong>ERRO</strong></Alert.Heading>
                  <p class="text-center">AS Informado não existe</p>
                </Alert>
              </Modal.Header>
              <Modal.Header closeButton>
                <Modal.Title >Adicionar aspath</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputGroup className="mb-3">
                  <InputGroup.Text 
                  id="inputGroup-sizing-default" 
                  >Digite o ASN do novo aspath
                  </InputGroup.Text>
                <FormControl
                  value={this.state.ASNew}
                  onChange={this.CLIENTEASNEWInputChanged.bind(this)}
                  aria-label="ASN"
                  aria-describedby="inputGroup-sizing-default"
                  onKeyPress={CLIENTEASNEWhandleKeypress}
                />
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.CLIENTEASNEWButtonClicked.bind(this)}>Adicionar</Button>
                <Button variant="secondary" onClick={this.closeModalASclient}>Fechar</Button>
              </Modal.Footer>
            </Modal>

            <Modal show={this.state.isOpenDelete} onHide={this.closeModalDelete} centered>
              <Modal.Header closeButton>
                <Modal.Title >Deletar AS</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Tem certeza que quer deletar o AS?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={this.DELETEButtonClicked.bind(this)} >Deletar</Button>
                <Button variant="secondary" onClick={this.closeModalDelete}>Fechar</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      };
};

export default Dashboard;