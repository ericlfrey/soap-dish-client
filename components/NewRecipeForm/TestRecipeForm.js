import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styles from './NewRecipeForm.module.css';
import { getOils, getSingleOil } from '../../utils/data/oilData';
import { useAuth } from '../../utils/context/authContext';
import { createRecipe } from '../../utils/data/recipeData';

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
  const { user } = useAuth();
  const router = useRouter();

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
  };

  const saveRecipe = () => {
    const recipeOils = oils.map((oil) => {
      const amount = parseInt(oil.amount, 10);
      return { oilId: oil.id, amount };
    });
    const recipeObj = {
      uid: user.uid,
      title: formInput.title,
      description: formInput.description,
      notes: formInput.notes,
      public: formInput.public,
      super_fat: formInput.superFat / 100,
      lye_amount: formInput.lyeAmount,
      water_amount: formInput.waterAmount,
      oilList: recipeOils,
    };
    console.log(recipeObj);
    createRecipe(recipeObj).then(() => router.push('/'));
  };

  return (
    <>
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
      <hr />
      {formInput.waterAmount
        ? (
          <div className={styles.recipeFormWrapper}>
            <div className="recipe-results-container">
              <h3>Recipe Results:</h3>
              <section>
                {formInput.oilList.map((oil) => (
                  <p key={oil.id}>{`${oil.name}: ${oil.amount} oz.`}</p>
                ))}
                <p>Lye Amount:{` ${formInput.lyeAmount} oz.`}</p>
                <p>Water Amount:{` ${formInput.waterAmount} oz.`}</p>
              </section>
              <Button variant="primary" type="button" onClick={saveRecipe}>Save</Button>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="Recipe Title"
                  name="title"
                  value={formInput.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formInput.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="notes"
                  value={formInput.notes}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Check // prettier-ignore
                type="switch"
                name="public"
                label="Public?"
                onChange={() => setFormInput((prevState) => ({ ...prevState, public: !prevState.public }))}
              />
            </Form>
          </div>
        )
        : ''}
    </>
  );
}
