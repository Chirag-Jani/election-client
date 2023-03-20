import React from "react";

const User = (props) => {
  const { elections, vote } = props;
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
                          <th scope="col">Vote Candidate</th>
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
                                className="btn btn-success"
                                onClick={() => {
                                  let mail = localStorage.getItem("voterMail");
                                  setTimeout(() => {}, 1000);
                                  vote(elec._id, cand._id, mail);
                                }}
                              >
                                Vote
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
          </div>
        );
      })}
    </div>
    // <h1>Hello Jani</h1>
  );
};

export default User;
