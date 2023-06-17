/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Form, InputGroup,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from './RecipeForm.module.css';
import { getOils, getSingleOil } from '../../utils/data/oilData';
import { useAuth } from '../../utils/context/authContext';
import { createRecipe, updateRecipe } from '../../utils/data/recipeData';

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

export default function RecipeForm({ recipeObject, totalOil, oilList }) {
  const [formInput, setFormInput] = useState(initialState);
  const [oils, setOils] = useState([]);
  const [allOils, setAllOils] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getOils().then(setAllOils);
    if (recipeObject.id) {
      const waterPercentage = parseInt((recipeObject.water_amount / totalOil) * 100, 10);
      const waterAmount = recipeObject.water_amount;
      setFormInput({
        id: recipeObject.id,
        totalOil,
        oilList,
        title: recipeObject.title,
        waterPercentage,
        waterAmount,
        lyeAmount: Number(recipeObject.lye_amount),
        superFat: Number(recipeObject.super_fat * 100),
        description: recipeObject.description,
        notes: recipeObject.notes,
        public: recipeObject.public,
      });
      setOils(oilList);
    }
  }, [recipeObject]);

  // function to look for state change of inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Get oil from select and add to oils array.
  const addOils = () => {
    const currentOil = document.getElementById('currentOil');
    getSingleOil(currentOil.value).then((selectedOil) => {
      const oilExists = oils.some((oil) => oil.id === selectedOil.id || oil.oilId === selectedOil.id);
      if (oilExists) {
        window.alert('Oil already in list');
      } else {
        const oilObj = {
          oilId: selectedOil.id,
          name: selectedOil.name,
          sap: selectedOil.sap,
        };
        const updatedOils = [...oils, oilObj];
        setOils(updatedOils);
      }
    });
  };

  const removeOil = (e) => {
    getSingleOil(e.target.value).then((selectedOil) => {
      const oilExists = oils.some((oil) => oil.id === selectedOil.id || oil.oilId === selectedOil.id);
      if (oilExists) {
        const oilsCopy = [...oils];
        const index = oilsCopy.findIndex((oil) => oil.id === selectedOil.id || oil.oilId === selectedOil.id);
        oilsCopy.splice(index, 1);
        setOils(oilsCopy);
      }
    });
  };

  // function to handle change of amount of each oil
  const handleAmountChange = (e) => {
    const { name, value } = e.target;
    const oilId = parseInt(name, 10);
    const updatedOils = oils.map((oil) => (oil.oilId === oilId ? { ...oil, amount: value } : oil));
    setOils(updatedOils);
  };

  // function to calculate recipe
  const calculateRecipe = (e) => {
    e.preventDefault();
    const oilTotal = oils.reduce((a, b) => a + Number(b.amount), 0);
    if (oilTotal !== Number(formInput.totalOil)) {
      window.alert('Total oil amount does not match');
      return;
    }
    const waterAmount = ((formInput.waterPercentage / 100) * totalOil).toFixed(3);
    const superFat = parseInt(formInput.superFat, 10) / 100;
    const lyeAmount = Number(oils.reduce((total, oil) => total
      + (oil.amount * oil.sap), 0)
      * (1 - superFat)).toFixed(3);
    setFormInput((prevState) => ({
      ...prevState,
      totalOil: oilTotal,
      oilList: oils,
      lyeAmount,
      waterAmount,
    }));
  };

  // Final Save Recipe Function to save recipe to database
  const saveRecipe = () => {
    if (recipeObject.id) {
      const recipeOils = oils.map((oil) => {
        const amount = parseInt(oil.amount, 10);
        if (oil.id) {
          return { id: oil.id, oilId: oil.oilId, amount };
        }
        return { oilId: oil.oilId, amount };
      });
      const payload = {
        id: formInput.id,
        uid: user.uid,
        title: formInput.title,
        description: formInput.description,
        notes: formInput.notes,
        public: formInput.public,
        superFat: formInput.superFat / 100,
        lyeAmount: formInput.lyeAmount,
        waterAmount: formInput.waterAmount,
        oilList: recipeOils,
      };
      updateRecipe(payload).then(() => router.push(`/recipe/${payload.id}`));
    } else {
      const recipeOils = oils.map((oil) => {
        const amount = parseInt(oil.amount, 10);
        return { oilId: oil.oilId, amount };
      });
      const payload = {
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
      createRecipe(payload).then((recipe) => router.push(`/recipe/${recipe.id}`));
    }
  };

  return (
    <>
      {/* <div className={styles.recipeFormWrapper}> */}
      <div>
        <div className="recipe-form-container">
          {/* Initial Form to add Total oil amount, water percentage, and super fat */}
          <Form>
            <Form.Group className={styles.formGroup}>
              <Form.Control
                className={styles.formInputFieldTop}
                type="number"
                placeholder="Enter total weight of oil in ounces"
                name="totalOil"
                value={formInput.totalOil}
                onChange={handleChange}
              />
              <Form.Text>Enter total weight of oils in ounces</Form.Text>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Control
                className={styles.formInputFieldTop}
                type="number"
                placeholder="Water as a percent of oils"
                name="waterPercentage"
                value={formInput.waterPercentage}
                onChange={handleChange}
              />
              <Form.Text>Water as a percent of oils</Form.Text>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Control
                className={styles.formInputFieldTop}
                type="number"
                placeholder="Super Fat Percentage"
                name="superFat"
                value={formInput.superFat}
                onChange={handleChange}
              />
              <Form.Text>Super Fat Percentage</Form.Text>
            </Form.Group>
          </Form>
          <hr />
          {/* Form Select to add oils to recipe */}
          <h3 className={styles.sectionHeader}>Select Oils</h3>
          <Form>
            <Form.Group className={styles.formGroup} controlId="formBasicEmail">
              <InputGroup className={styles.oilSelectGrp}>
                <Form.Select name="currentOil" id="currentOil" className={styles.oilSelect}>
                  {allOils.map((oil) => <option key={oil.id} value={oil.id}>{oil.name}</option>)}
                </Form.Select>
                <Button type="button" onClick={addOils} className={styles.zBtn} id="zBtn">
                  +
                </Button>
              </InputGroup>
              <Form.Text>Select an Oil to add</Form.Text>
            </Form.Group>
          </Form>
        </div>
        <div className="oil-list-container">
          {/* Form for each oil to add individual amounts */}
          <section>
            {oils?.length > 0
              ? (
                <>
                  <hr />
                  <h3 className={styles.sectionHeader}>Oils:</h3>
                  <Form onSubmit={calculateRecipe}>
                    {oils?.map((oil) => (
                      <section key={oil.oilId}>
                        <div className={styles.oilNameBtn}>
                          <h5 key={oil.oilId} className={styles.oilName}>{`${oils.indexOf(oil) + 1}. ${oil.name}`}</h5>
                          <Button onClick={removeOil} value={oil.oilId} className={styles.removeOilBtn}>remove</Button>
                        </div>
                        <Form.Group className={styles.singleOil}>
                          <Form.Control
                            className={styles.oilInput}
                            id={`oilAmount--${oil.oilId}`}
                            name={oil.oilId}
                            type="number"
                            onChange={handleAmountChange}
                            {...oil.amount > 0 ? { value: Number(oil.amount) } : { value: '' }}
                          />
                          <Form.Text>Amount in ounces</Form.Text>
                        </Form.Group>
                      </section>
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
      {/* If there is a recipe calculated, show the results and a button to save the recipe
      Form to add recipe title, description, notes, and public/private */}
      {formInput.waterAmount
        ? (
          <>
            <h3 className={styles.sectionHeader}>Recipe Results</h3>
            {/* Recipe Results */}
            <Card className={styles.recipeResults}>
              <Card.Body>
                {formInput.oilList.map((oil) => (
                  <section key={oil.oilId} className={styles.recipeResultsBody}>
                    <Card.Text>{`${oil.name}:`}</Card.Text>
                    <Card.Text>{`${oil.amount} oz.`}</Card.Text>
                  </section>
                ))}
                <section className={styles.recipeResultsBody}>
                  <Card.Text>Lye Amount:</Card.Text>
                  <Card.Text>{` ${formInput.lyeAmount} oz.`}</Card.Text>
                </section>
                <section className={styles.recipeResultsBody}>
                  <Card.Text>Water Amount:</Card.Text>
                  <Card.Text>{` ${formInput.waterAmount} oz.`}</Card.Text>
                </section>
              </Card.Body>
            </Card>
            {/* Form for Title, Description, and Notes */}
            <Form className={styles.lastForm}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className={styles.formInputField}
                  type="textarea"
                  placeholder="Recipe Title"
                  name="title"
                  value={formInput.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  className={styles.formInputField}
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
                  className={styles.formInputField}
                  rows={3}
                  name="notes"
                  value={formInput.notes}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Check
                id="formCheck"
                className={styles.formCheck}
                type="switch"
                name="public"
                label="Public?"
                checked={formInput.public}
                onChange={(e) => {
                  setFormInput((prevState) => ({
                    ...prevState,
                    public: e.target.checked,
                  }));
                }}
              />
              <Button variant="primary" type="button" onClick={saveRecipe}>Save</Button>
            </Form>
          </>
        )
        : ''}
    </>
  );
}

RecipeForm.propTypes = {
  recipeObject: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    notes: PropTypes.string,
    public: PropTypes.bool,
    super_fat: PropTypes.string,
    lye_amount: PropTypes.string,
    water_amount: PropTypes.string,
  }),
  totalOil: PropTypes.number,
  oilList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    oilId: PropTypes.number,
    name: PropTypes.string,
    amount: PropTypes.string,
    sap: PropTypes.string,
  })),
};

RecipeForm.defaultProps = {
  recipeObject: { initialState },
  totalOil: initialState.totalOil,
  // eslint-disable-next-line react/default-props-match-prop-types
  oilList: initialState.oilList,
};
