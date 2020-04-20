import React, { Component } from "react";
import {
  Icon,
  Modal,
  Header,
  Grid,
  Container,
  Portal,
} from "semantic-ui-react";
import Calendar from "react-calendar";
import InvalidDateModal from "./InvalidDateModal";
import CourtOrderForm from "./CourtOrderForm";
import { convertDateToString } from "./CalculatorUtils";
import "./styles.css";

export default class CourtOrdersApp extends Component {
  state = {
    date: new Date(),
    courtOrderObjArr: [],
    modalOpen: false,
    calendarDisabled: false,
    fetchedHolidaysInMs: this.props.fetchedHolidaysInMs,
    invalidDatesArr: [],
    invalidDateFound: false,
  };

  courtOrderModalContent = (
    <>
      <div className='ui large header' style={{ color: "white" }}>
        <Icon name='browser' style={{ color: "white" }} />
        Court Order Dates
      </div>
      <Modal.Content>
        <ol>
          <li>Select your date on the calendar</li>
          <br />
          <li>Enter the name of the event, e.g. 'Costs Budget Due'</li>
          <br />
          <li>Enter the number of days before the court ordered date</li>
          <br />
          <li>Select 'Clear Days' if applicable</li>
          <br />
          <li>Click 'Calculate'</li>
          <br />
          <li>
            The calculated date will appear on the right-hand side, and below
            the calendar on mobile
          </li>
        </ol>
      </Modal.Content>
    </>
  );

  calendarHeaderStyle = {
    fontFamily: "Poppins",
    fontSize: "2.3em",
    textAlign: "center",
    marginTop: "8px",
  };

  componentDidMount() {
    this.props.updateModalContent(this.courtOrderModalContent);
  }

  handleDayClick = (date) =>
    this.setState({ modalOpen: true, calendarDisabled: true, date });

  handleModalClose = () =>
    this.setState({ modalOpen: false, calendarDisabled: false });

  onSubmit = (courtOrderObj) => {
    let invalidDatesArr = [];
    // Create a copy of each object and array from state
    if (courtOrderObj.invalidDate !== null) {
      invalidDatesArr.push(courtOrderObj);
      this.setState({ invalidDatesArr, invalidDateFound: true });
      for (let i = 0; i < invalidDatesArr.length; i++) {
        for (let x = 0; x < invalidDatesArr[i].invalidDate.length; x++) {
          console.log(
            `courtOrderObj.invalidDate: ${invalidDatesArr[i].invalidDate[x].calculatedDate}`
          );
        }
      }
    } else {
      const courtOrderObjArr = this.state.courtOrderObjArr.map((obj) =>
        Object.assign({}, obj)
      );
      courtOrderObjArr.push(courtOrderObj);
      this.setState({ courtOrderObjArr });
    }
  };

  /* Invalid Date Modal methods */
  handleInvalidDateSelection = (id, selectedDate, delta) => {
    // Create copy of the current state of courtOrderArr of objects
    let courtOrderObjArr = this.state.courtOrderObjArr.map((courtOrderObj) =>
      Object.assign({}, courtOrderObj)
    );
    let invalidDatesArr = this.state.invalidDatesArr.map((courtOrderObj) =>
      Object.assign({}, courtOrderObj)
    );

    invalidDatesArr = invalidDatesArr.map((courtOrderObj) => {
      if (courtOrderObj.objId === id) {
        courtOrderObj.calculatedDate = convertDateToString(
          Number(selectedDate)
        );
        console.log(`numDays: ${delta} and its typeOf: ${typeof delta}`);

        courtOrderObj.numDays = delta;
        console.log(
          `numDays: ${
            courtOrderObj.numDays
          } and its typeOf: ${typeof courtOrderObj.numDays}`
        );
      }
      courtOrderObjArr.push(courtOrderObj);
    });

    this.setState({ courtOrderObjArr });
  };

  handleInvalidDateModalClose = (status) => {
    this.setState({ invalidDateFound: status });
  };

  /* end */

  onDeleteClick = (event) => {
    const clickedLegalEvent = event.target.id;
    let updatedCourtOrderObjArr = this.state.courtOrderObjArr;

    updatedCourtOrderObjArr = updatedCourtOrderObjArr.filter(
      (courtOrderObj) => courtOrderObj.objId !== clickedLegalEvent
    );

    this.setState({ courtOrderObjArr: updatedCourtOrderObjArr });
  };

  render() {
    const { modalOpen, invalidDateFound, invalidDatesArr } = this.state;
    const dashboardContainerStyle = { width: "950px", padding: "3.5%" };

    const showUserInputs = this.state.courtOrderObjArr.map((courtOrderObj) => (
      <LegalEventItem
        courtOrderObj={courtOrderObj}
        deleteClick={this.onDeleteClick}
      />
    ));

    return (
      <>
        {invalidDateFound ? (
          <InvalidDateModal
            invalidDatesArr={invalidDatesArr}
            handleModalSelection={this.handleInvalidDateSelection}
            handleModalClose={this.handleInvalidDateModalClose}
          />
        ) : (
          <Container style={dashboardContainerStyle}>
            <Grid stackable centered columns={2} divided>
              <Header style={this.calendarHeaderStyle} size='large'>
                Court Order
              </Header>
              <Grid.Row>
                <Grid.Column width={10}>
                  <Calendar
                    className='react-calendar'
                    value={this.state.date}
                    onClickDay={this.handleDayClick}
                    tileDisabled={() => this.state.calendarDisabled}
                  />
                </Grid.Column>
                <Modal
                  size='small'
                  onClose={this.handleClose}
                  open={modalOpen}
                  style={{ width: "350px", height: "220px", margin: "auto" }}>
                  <CourtOrderForm
                    date={this.state.date}
                    onModalOpen={modalOpen}
                    onModalClose={this.handleModalClose}
                    calendarDisabled={this.state.calendarDisabled}
                    handleSubmit={this.onSubmit}
                    fetchedHolidaysInMs={this.props.fetchedHolidaysInMs}
                  />
                </Modal>

                <Grid.Column computer={6} tablet={9.5} mobile={9.5}>
                  <div className='legal-events-display'>{showUserInputs}</div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        )}
      </>
    );
  }
}

function LegalEventItem(props) {
  const { courtOrderObj, deleteClick } = props;
  const selectedDateToCompare = new Date(courtOrderObj.selectedDate).getTime();
  const calculatedDateToCompare = new Date(
    courtOrderObj.calculatedDate
  ).getTime();

  return (
    <div className='ui feed'>
      <div className='event'>
        <div className='content' style={{ width: "100%" }}>
          <div className='summary'>
            <i class='law icon'></i>
            {courtOrderObj.eventName}
            <i
              className='remove-event delete icon '
              id={courtOrderObj.objId}
              onClick={deleteClick}
              style={{ float: "right" }}></i>
          </div>
          <div className='summary'>Due on {courtOrderObj.calculatedDate}</div>
          <div className='text extra'>
            {courtOrderObj.numDays} days{" "}
            {selectedDateToCompare > calculatedDateToCompare
              ? "before "
              : "after "}
            {courtOrderObj.selectedDate}
            <br />
            {courtOrderObj.clearDays ? (
              <div class='ui red label'>Clear Days</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
