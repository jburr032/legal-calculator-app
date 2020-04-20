import React, { useState } from "react";
import { Container, Modal, Button, Icon, Label, Grid } from "semantic-ui-react";
import { convertDateToString } from "./CalculatorUtils";

export default function InvalidDateModal(props) {
  const [iterator, increaseIterator] = useState(0);
  const datesArr = props.invalidDatesArr;

  const onModalSelection = (event) => {
    const id = event.target.id;
    const _ = event.target.value.split(",");
    const value = _[0];
    const delta = _[1];

    props.handleModalSelection(id, _[0], delta);

    if (iterator < datesArr.length - 1) {
      increaseIterator(iterator + 1);
    } else {
      props.handleModalClose(false);
    }
  };

  return (
    <Modal open={true} basic size='small' style={{ paddingTop: "8%" }}>
      <Modal.Content scrolling={true}>
        {" "}
        <div className='model-invalid-date'>
          <div
            class='ui large header'
            style={{ color: "white", marginBottom: "10px" }}>
            <Icon name='calendar times outline' style={{ color: "white" }} />
            Uh oh!...
            {datesArr[iterator].type.length == 1
              ? "that date"
              : datesArr[iterator].type}{" "}
            lands on a weekend or holiday. Please select the date you would
            prefer:
          </div>
        </div>
        <Modal.Actions style={{ textAlign: "center" }}>
          <Label
            as='button'
            color='blue'
            id={datesArr[iterator].objId}
            value={[
              datesArr[iterator].invalidDate[1].calculatedDate,
              datesArr[iterator].invalidDate[1].diffInDays,
            ]}
            onClick={onModalSelection}
            style={{
              width: "250px",
              height: "40px",
              marginBottom: "10px",
              fontSize: "14px",
            }}>
            {convertDateToString(
              datesArr[iterator].invalidDate[1].calculatedDate
            )}
            {datesArr[iterator].invalidDate[1].holiday ? (
              <Label.Detail>HOLIDAY</Label.Detail>
            ) : null}
          </Label>

          <br />
          <Label
            as='button'
            color='blue'
            id={datesArr[iterator].objId}
            value={[
              datesArr[iterator].invalidDate[0].calculatedDate,
              datesArr[iterator].invalidDate[0].diffInDays,
            ]}
            onClick={onModalSelection}
            style={{
              width: "250px",
              height: "40px",
              marginBottom: "10px",
              fontSize: "14px",
            }}>
            {convertDateToString(
              datesArr[iterator].invalidDate[0].calculatedDate
            )}
          </Label>
          <Label
            as='button'
            color='blue'
            id={datesArr[iterator].objId}
            value={[
              datesArr[iterator].invalidDate[2].calculatedDate,
              datesArr[iterator].invalidDate[2].diffInDays,
            ]}
            onClick={onModalSelection}
            style={{
              width: "250px",
              height: "40px",
              marginBottom: "10px",
              fontSize: "14px",
            }}>
            {convertDateToString(
              datesArr[iterator].invalidDate[2].calculatedDate
            )}
          </Label>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
}
