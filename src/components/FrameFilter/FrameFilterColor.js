import React from "react";
import { Form } from "react-bootstrap";

export default function FrameFilter(props) {
  const {
    title,
    isCheckedBlack,
    isCheckedHavana,
    isCheckedGold,
    isCheckedPink,
    isCheckedSilver,
    isCheckedRose,
    isCheckedGray,
    isCheckedRed,
    isCheckedBrown,
    fun,
  } = props;
  return (
    <Form>
      <h5>{title}</h5>
      <Form.Check
        type="checkbox"
        value="black"
        name="color"
        checked={isCheckedBlack}
        onChange={fun}
        label="Black"
        id="fc1"
      />

      <Form.Check
        type="checkbox"
        value="havana"
        name="color"
        checked={isCheckedHavana}
        onChange={fun}
        label="Havana"
        id="fc2"
      />

      <Form.Check
        type="checkbox"
        value="gold"
        name="color"
        checked={isCheckedGold}
        onChange={fun}
        label="Gold"
        id="fc3"
      />

      <Form.Check
        type="checkbox"
        value="pink"
        name="color"
        checked={isCheckedPink}
        onChange={fun}
        label="Pink"
        id="fc4"
      />

      <Form.Check
        type="checkbox"
        value="rose"
        name="color"
        checked={isCheckedRose}
        onChange={fun}
        label="Rose"
        id="fc5"
      />

      <Form.Check
        type="checkbox"
        value="gray"
        name="color"
        checked={isCheckedGray}
        onChange={fun}
        label="Gray"
        id="fc6"
      />
      <Form.Check
        type="checkbox"
        value="red"
        name="color"
        checked={isCheckedRed}
        onChange={fun}
        label="Red"
        id="fc7"
      />
      <Form.Check
        type="checkbox"
        value="silver"
        name="color"
        checked={isCheckedSilver}
        onChange={fun}
        label="Silver"
        id="fc6"
      />
      <Form.Check
        type="checkbox"
        value="brown"
        name="color"
        checked={isCheckedBrown}
        onChange={fun}
        label="Brown"
        id="fc9"
      />
    </Form>
  );
}
