import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function NewRecipeForm() {
  const initialState = {
    totalOil: 32,
    oilList: [],
  };
  const [formInput, setFormInput] = useState(initialState);
  const [oils, setOils] = useState([]);
  const [showTotalOil, setShowTotalOil] = useState(true);
  const [showOils, setShowOils] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmitTotalOil = (e) => {
    e.preventDefault();
    console.warn(formInput);
    setShowTotalOil(false);
    setShowOils(true);
  };

  const handleSubmitOils = () => {
    const currentOil = document.getElementById('currentOil');
    if (oils.includes(currentOil.value)) {
      window.alert('Oil already in list');
    } else {
      oils.push(currentOil.value);
      setOils(oils);
      setFormInput({
        ...formInput,
        oilList: oils,
      });
    }
  };

  const finishOilList = () => {
    setShowOils(false);
  };

  return (
    <div className="recipe-form-wrapper">
      <div className="recipe-form-container">
        {showTotalOil
          ? (
            <Form onSubmit={handleSubmitTotalOil}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="number"
                  placeholder="Enter total weight of oil in ounces"
                  name="totalOil"
                  value={formInput.totalOil}
                  onChange={handleChange}
                />
                <Form.Text>Enter total weight of oils in ounces</Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )
          : ''}
        {showOils
          ? (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Select name="currentOil" id="currentOil">
                  <option value="Olive Oil">Olive Oil</option>
                  <option value="Coconut Oil">Coconut Oil</option>
                  <option value="Palm Oil">Palm Oil</option>
                </Form.Select>
                <Form.Text>Enter total weight of oils in ounces</Form.Text>
              </Form.Group>
              <Button variant="primary" type="button" onClick={handleSubmitOils}>
                Submit
              </Button>
              <Button variant="success" type="button" onClick={finishOilList}>
                Done
              </Button>
            </Form>
          )
          : ''}
      </div>
      <div className="oil-list-container">
        <h3>Current Recipe:</h3>
        <section>
          <p>Total Weight:{` ${formInput.totalOil} oz.`}</p>
        </section>
        <section>
          {formInput.oilList?.map((oil) => (
            <h3 key={oil}>{oil}</h3>
          ))}
        </section>
      </div>
    </div>
  );
}
