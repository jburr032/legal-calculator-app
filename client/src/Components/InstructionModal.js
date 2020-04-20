import React, { Component } from "react";
import { Modal, Button, Icon, Responsive } from "semantic-ui-react";

class InstructionModal extends Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  instructionBtn = (
    <div className='right menu'>
      <div className='item'>
        <Responsive {...Responsive.onlyMobile}>
          <Button
            style={{
              width: "50%",
              backgroundColor: "#d10056",
              fontSize: "10px",
            }}
            onClick={this.handleOpen}>
            <Icon
              style={{ color: "white", paddingRight: "10px" }}
              className='question'
            />
          </Button>
        </Responsive>

        <Responsive {...Responsive.onlyTablet}>
          <Button
            style={{
              width: "95%",
              backgroundColor: "#d10056",
              color: "white",
              fontSize: "12px",
            }}
            onClick={this.handleOpen}>
            Help
          </Button>
        </Responsive>

        <Responsive {...Responsive.onlyComputer}>
          <Button
            style={{
              width: "95%",
              backgroundColor: "#d10056",
              color: "white",
              fontSize: "12px",
            }}
            onClick={this.handleOpen}>
            Help
          </Button>
        </Responsive>
      </div>
    </div>
  );

  render() {
    return (
      <Modal
        closeOnDimmerClick={true}
        trigger={this.instructionBtn}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'>
        <Modal.Content scrolling={true}>
          <div className='model-CPR-content'>{this.props.modalContent}</div>
          <Modal.Actions>
            <Button color='green' onClick={this.handleClose} inverted>
              <Icon name='checkmark' /> Got it
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    );
  }
}

export default InstructionModal;
