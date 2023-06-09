import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './NewRecipeForm.module.css';
import { getOils, getSingleOil } from '../../utils/data/oilData';

export default function TestRecipeForm() {
  const initialState = {
    totalOil: 32,
    oilList: [],
    title: '',
    waterPercentage: 33,
    lyeAmount: 0,
    superFat: 5,
    description: '',
    notes: '',
    public: false,
  };
  const [formInput, setFormInput] = useState(initialState);
  const [oils, setOils] = useState([]);
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
      }
    });
  };

  const handleAmountChange = (e) => {
    const { name, value } = e.target;
    const oilId = parseInt(name, 10);
    const updatedOils = oils.map((oil) => (oil.id === oilId ? { ...oil, amount: value } : oil));
    setOils(updatedOils);
  };

  const calculateRecipe = (e) => {
    e.preventDefault();
    // const recipeOils = oils.map((oil) => {
    //   const amount = parseInt(oil.amount, 10);
    //   return { oilId: oil.id, amount };
    // });
    const totalOil = oils.reduce((a, b) => a + Number(b.amount), 0);
    if (totalOil !== Number(formInput.totalOil)) {
      window.alert('Total oil amount does not match');
      return;
    }
    const waterAmount = (formInput.waterPercentage / 100) * totalOil;
    const superFat = parseInt(formInput.superFat, 10) / 100;
    const lyeAmount = Number(oils.reduce((total, oil) => total
      + (oil.amount * oil.sap), 0)
      * (1 - superFat)).toFixed(3);
    setFormInput((prevState) => ({
      ...prevState,
      totalOil,
      oilList: oils,
      lyeAmount,
      waterAmount,
    }));
    console.log(formInput);
  };

  return (
    <div className={styles.recipeFormWrapper}>
      <div className="recipe-form-container">
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
            <Form.Control
              type="number"
              placeholder="Water as a percent of oils"
              name="waterPercentage"
              value={formInput.waterPercentage}
              onChange={handleChange}
            />
            <Form.Text>Water as a percent of oils</Form.Text>
            <Form.Control
              type="number"
              placeholder="Super Fat Percentage"
              name="superFat"
              value={formInput.superFat}
              onChange={handleChange}
            />
            <Form.Text>Super Fat Percentage</Form.Text>
          </Form.Group>
        </Form>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Select name="currentOil" id="currentOil">
              {allOils.map((oil) => <option key={oil.id} value={oil.id}>{oil.name}</option>)}
            </Form.Select>
            <Form.Text>Select an Oil to add</Form.Text>
          </Form.Group>
          <Button variant="primary" type="button" onClick={addOils}>
            Add Oil
          </Button>
        </Form>
      </div>
      <div className="oil-list-container">
        <h3>Current Recipe:</h3>
        <section>
          <p>Total Weight:{` ${formInput.totalOil} oz.`}</p>
        </section>
        <section>
          {oils?.length > 0
            ? (
              <>
                <h3>Oils:</h3>
                <Form onSubmit={calculateRecipe}>
                  {oils?.map((oil) => (
                    <div key={oil.id}>
                      <h3 key={oil.id}>{oil.name}</h3>
                      <Form.Control
                        id={`oilAmount--${oil.id}`}
                        name={oil.id}
                        type="number"
                        placeholder="Amount in ounces"
                        onChange={handleAmountChange}
                      />
                    </div>
                  ))}
                  <Button variant="primary" type="submit">Calculate Recipe</Button>
                </Form>
              </>
            )
            : ''}

        </section>
      </div>
    </div>
  );
}
