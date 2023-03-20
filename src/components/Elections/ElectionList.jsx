import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ElectionContext from "../context/ElectionContext";
import User from "./AdminUser/User";
import Admin from "./AdminUser/Admin";

const ElectionList = () => {
  const navigate = useNavigate();

  const {
    elections,
    getElections,
    addCandidate,
    createElection,
    updateElectionState,
    removeCandidate,
    deleteElection,
    vote,
  } = useContext(ElectionContext);

  const [electionInfo, setElectionInfo] = useState({
    agenda: "",
    info: "",
  });

  const handleChange = (e) => {
    setElectionInfo({ ...electionInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getElections();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {localStorage.getItem("token") ? (
        <>
          {localStorage.getItem("admin") === "true" ? (
            <div>
              <button
                type="button"
                className="btn btn-primary mx-5 mt-5"
                data-bs-toggle="modal"
                data-bs-target="#createElection"
              >
                Create Election
              </button>
              {/* Modal */}
              <div
                className="modal fade"
                id="createElection"
                tabIndex={-1}
                aria-labelledby="createElectionLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="createElectionLabel">
                        Create New Election
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
                        Agenda:
                        <input
                          className="my-1 text-center border border-dark"
                          type="text"
                          placeholder="Agenda"
                          required={true}
                          name="agenda"
                          value={electionInfo.agenda}
                          onChange={handleChange}
                        />
                      </span>
                      <span className="text-start">
                        Description:
                        <input
                          className="my-1 text-center border border-dark"
                          type="text"
                          placeholder="Description"
                          required={true}
                          name="info"
                          value={electionInfo.info}
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
                          createElection(
                            electionInfo.agenda,
                            electionInfo.info
                          );
                          setElectionInfo({ agenda: "", info: "" });
                        }}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Admin
                elections={elections}
                addCandidate={addCandidate}
                updateElectionState={updateElectionState}
                removeCandidate={removeCandidate}
                deleteElection={deleteElection}
              />
            </div>
          ) : (
            <User elections={elections} vote={vote} />
          )}
        </>
      ) : (
        <h1>Login to see Election list</h1>
      )}
    </div>
  );
};

export default ElectionList;
