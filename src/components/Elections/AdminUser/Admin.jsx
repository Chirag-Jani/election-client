import React, { useState } from "react";

const Admin = (props) => {
  const {
    elections,
    addCandidate,
    updateElectionState,
    removeCandidate,
    deleteElection,
  } = props;

  const [candidateValue, setCandidateValue] = useState({
    name: "",
    email: "",
  });

  const [winner, setWinner] = useState(false);

  const handleChange = (e) => {
    setCandidateValue({ ...candidateValue, [e.target.name]: e.target.value });
  };

  const addNewCandidate = (electionID) => {
    addCandidate(candidateValue.name, candidateValue.email, electionID);
    setCandidateValue({ name: "", email: "" });
  };

  return (
    <div>
      {elections.elections.map((elec) => {
        return (
          <div key={elec._id} className="m-5 border border-dark p-5">
            <div className="my-3">
              <p>
                <strong>
                  Election ID: <br />
                </strong>
                {elec._id}
              </p>
              <p>
                <strong>
                  Status: <br />
                </strong>
                {elec.status}
              </p>
              <p>
                <strong>
                  Agenda: <br />
                </strong>
                {elec.agenda}
              </p>
              <p>
                <strong>
                  Election Information: <br />
                </strong>{" "}
                {elec.info}
              </p>
              <p>
                <strong>
                  Total Votes: <br />
                </strong>
                {elec.totalVotes}
              </p>
              <span>
                <strong>
                  Candidates: <br />
                </strong>
                {elec.candidates.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Votes Received</th>
                        {elec.status !== "Ended" && (
                          <th scope="col">Remove Candidate</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {elec.candidates.map((cand) => {
                        return (
                          <tr key={cand._id}>
                            <td>{cand.name}</td>
                            <td>{cand.email}</td>
                            <td>{cand.votesReceived}</td>
                            {elec.status !== "Ended" && (
                              <td
                                className="btn btn-danger"
                                onClick={() => {
                                  removeCandidate(elec._id, cand._id);
                                }}
                              >
                                Remove
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p>Add Candidates to Display!!</p>
                )}
              </span>
              <span>
                <strong>
                  Winner: <br />
                </strong>
                {elec.winner.name !== "N/A" ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {elec.winner.map((win) => {
                        return (
                          <tr key={win._id}>
                            <td>{win.name}</td>
                            <td>{win.email}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p>Election Not Ended Yet!!</p>
                )}
              </span>
            </div>
            {elec.status === "Created" && (
              <>
                {/* Button trigger modal */}
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={`#${elec._id}`}
                >
                  Add Candidate
                </button>
                {/* Modal */}
                <div
                  className="modal fade"
                  id={`${elec._id}`}
                  tabIndex={-1}
                  aria-labelledby={`exampleModalLabel${elec._id}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id={`exampleModalLabel${elec._id}`}
                        >
                          Add Candidate
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body d-flex flex-column w-50 m-auto">
                        <span className="text-start">
                          Name:
                          <input
                            className="my-1 text-center border border-dark"
                            type="text"
                            placeholder="Candidate Name"
                            name="name"
                            value={candidateValue.name}
                            onChange={handleChange}
                          />
                        </span>
                        <span className="text-start">
                          Email:
                          <input
                            className="my-1 text-center border border-dark"
                            type="text"
                            placeholder="Candidate Email"
                            name="email"
                            value={candidateValue.email}
                            onChange={handleChange}
                          />
                        </span>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            addNewCandidate(elec._id);
                            // alert("Election ID error while adding candidates");
                          }}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {elec.status !== "Ended" && (
              <>
                {/* Button trigger modal */}
                <button
                  type="button"
                  className="btn btn-primary mx-4"
                  data-bs-toggle="modal"
                  data-bs-target={`#update${elec._id}`}
                >
                  Update Election State
                </button>
                {/* Modal */}
                <div
                  className="modal fade"
                  id={`update${elec._id}`}
                  tabIndex={-1}
                  aria-labelledby={`endElectionLabel${elec._id}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id={`endElectionLabel${elec._id}`}
                        >
                          Awaiting Confirmation...!
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <input
                          type="checkbox"
                          name="winner"
                          id="winner"
                          onChange={(e) => {
                            setWinner(e.target.checked);
                          }}
                        />{" "}
                        Declare Winner
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            updateElectionState(winner, elec._id);
                            // alert("Error while passing election ID");
                          }}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <button
              className="btn btn-danger"
              onClick={() => {
                deleteElection(elec._id);
              }}
            >
              Delete Election
            </button>
          </div>
        );
      })}
    </div>
    // <h1>Hello Jani</h1>
  );
};

export default Admin;
