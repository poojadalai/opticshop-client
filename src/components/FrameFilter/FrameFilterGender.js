import React from "react";
import { Form } from "react-bootstrap";

export default function FrameFilter(props) {
  const { title, isCheckedMan, isCheckedWoman, isCheckedUniSex, fun } = props;
  return (
    <Form>
      <h5>{title}</h5>

      <Form.Check
        type="checkbox"
        value="man"
        name="gender"
        checked={isCheckedMan}
        onChange={fun}
        label="Man"
      />

      <Form.Check
        type="checkbox"
        value="woman"
        name="gender"
        checked={isCheckedWoman}
        onChange={fun}
        label="Woman"
      />

      <Form.Check
        type="checkbox"
        value="unisex"
        name="gender"
        checked={isCheckedUniSex}
        onChange={fun}
        label="Unisex"
      />
    </Form>
  );
}
