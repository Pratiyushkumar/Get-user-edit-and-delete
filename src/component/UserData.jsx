import React, { useState } from "react";
import clebraties from "../celebrities.json";
import AccordionComponent from "./AccordionComponent";

const UserData = () => {
  const [userLists, setUserLists] = useState([...clebraties]);
  const [isActive, setIsActive] = useState("");

  const Dob = (dob) => {
    const birthday = new Date(dob);
    const difference = Date.now() - birthday.getTime();
    const age = new Date(difference);
    return Math.abs(age.getUTCFullYear() - 1970);
  };

  const fn = (panel) => {
    setIsActive(panel);
  };
  const handleDelete = (e, id) => {
    console.log(e.target.value);
    const elements = [...userLists];

    for (let i = 0; i < userLists.length; i++) {
      // console.log(userLists[i].id === id, id);
      if (userLists[i].id === id) {
        elements.splice(elements.indexOf(userLists[i]), 1);
      }
    }
    setUserLists(elements);
  };

  const handleEditDone = (id, userForm) => {
    console.log(id, userForm);
    let handleName = userForm.name.split(" ");
    console.log(handleName);
    let obj = { ...userForm, first: handleName[0], last: handleName[1] };
    console.log(obj);
    const newData = [...userLists];
    const index = userLists.findIndex((ele) => ele.id === id);
    newData[index] = obj;
    setUserLists(newData);
  };

  return (
    <>
      <div>
        <h1 className="heading">Factwise Assesment</h1>
        {userLists.map((ele) => (
          <AccordionComponent
            key={ele.id}
            num={ele.id}
            name={`${ele.first} ${ele.last}`}
            gender={ele.gender}
            country={ele.country}
            picture={ele.picture}
            description={ele.description}
            age={Dob(ele.dob)}
            active={isActive}
            activeFn={fn}
            handleDelete={handleDelete}
            handleEditDone={handleEditDone}
          />
        ))}
      </div>
    </>
  );
};

export default UserData;
