import { useState } from "react";
import ElectionContext from "./ElectionContext";

const ElectionState = (props) => {
  // ! host
  const host = "http://127.0.0.1:5000";

  const [elections, setElections] = useState([]);

  // get elections
  const getElections = async () => {
    // ! fetch api call to edit
    const res = await fetch(`${host}/user/get-elections`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    let data = await res.json();
    console.log(data);
    setElections(data);
  };

  // Add a note localhost:5000/user/admin/add-candidate/64173cf7e8e926230b57a151
  const addCandidate = async (name, email, electionID) => {
    // ! fetch api call to edit
    const res = await fetch(`${host}/user/admin/add-candidate/${electionID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ candidate: { name, email } }),
    });

    let data = await res.json();
    console.log(data);
    getElections();
  };

  const removeCandidate = async (electionID, candidateId) => {
    // ! fetch api call to edit
    const res = await fetch(
      `${host}/user/admin/remove-candidate/${electionID}/${candidateId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    let data = await res.json();
    console.log(data);
    getElections();
  };

  const createElection = async (agenda, info) => {
    // ! fetch api call to edit
    const res = await fetch(`${host}/user/admin/create-election`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ agenda, info }),
    });

    let data = await res.json();
    console.log(data);
    getElections();
  };

  const updateElectionState = async (winner, electionID) => {
    // ! fetch api call to edit
    const res = await fetch(`${host}/user/admin/change-status/${electionID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ winner: winner }),
    });

    let data = await res.json();
    console.log(data);
    getElections();
  };

  const deleteElection = async (electionID) => {
    // ! fetch api call to edit
    const res = await fetch(
      `${host}/user/admin/delete-election/${electionID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    let data = await res.json();
    console.log(data);
    getElections();
  };

  const vote = async (electionID, candidateID, voterMail) => {
    // ! fetch api call to edit
    const res = await fetch(`${host}/vote/${electionID}/${candidateID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ voter: { voterMail } }),
    });

    let data = await res.json();
    console.log(data);
    getElections();
  };

  return (
    <ElectionContext.Provider
      value={{
        elections,
        getElections,
        addCandidate,
        createElection,
        updateElectionState,
        removeCandidate,
        deleteElection,
        vote,
      }}
    >
      {props.children}
    </ElectionContext.Provider>
  );
};

export default ElectionState;
