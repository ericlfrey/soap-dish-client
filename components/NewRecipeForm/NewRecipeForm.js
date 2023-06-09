import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './NewRecipeForm.module.css';
import { getOils, getSingleOil } from '../../utils/data/oilData';

export default function NewRecipeForm() {
  const initialState = {
    totalOil: 32,
    oilList: [],
  };
  const [formInput, setFormInput] = useState(initialState);
  const [oils, setOils] = useState([]);
  const [showTotalOil, setShowTotalOil] = useState(true);
  const [showOils, setShowOils] = useState(false);
  const [allOils, setAllOils] = useState([]);

  useEffect(() => {
    getOils().then(setAllOils);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmitTotalOil = (e) => {
    e.preventDefault();
    console.log(formInput);
    setShowTotalOil(false);
    setShowOils(true);
  };

  const addOils = () => {
    const currentOil = document.getElementById('currentOil');
    getSingleOil(currentOil.value).then((selectedOil) => {
      const oilExists = oils.some((oil) => oil.id === selectedOil.id);
      if (oilExists) {
        window.alert('Oil already in list');
      } else {
        const updatedOils = [...oils, selectedOil];
        setOils(updatedOils);
        setFormInput((prevState) => ({
          ...prevState,
          oilList: updatedOils,
        }));
      }
    });
  };

  const finishOilList = () => {
    setShowOils(false);
  };

  return (
    <div className={styles.recipeFormWrapper}>
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
                  {allOils.map((oil) => <option key={oil.id} value={oil.id}>{oil.name}</option>)}
                </Form.Select>
                <Form.Text>Enter total weight of oils in ounces</Form.Text>
              </Form.Group>
              <Button variant="primary" type="button" onClick={addOils}>
                Add Oil
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
            <div key={oil.id}>
              <h3 key={oil.id}>{oil.name}</h3>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
