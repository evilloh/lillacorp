import React, { Component } from "react";
import axios from "axios";
const DEV_API = process.env.REACT_APP_DEV_API;

class SheetTest extends Component {
  state = {
    choices: { carlo: [], matteo: [] },
  };

  componentDidMount() {
    this.getLillaChoice();
  }

  getLillaChoice = () => {
    axios
      .get(DEV_API + `/articles/lillachoice`)
      .then((res) => {
        const choices = res.data;
        const choicesImp = { ...choices };
        this.setState({ choices: choicesImp });
        // for (let [key, value] of Object.entries(choices)) {
        //   console.log(`${key}: ${value}`);
        // }
      })
      .catch((res) => {
        console.log("We couldnt retrieve your Article");
      });
  };

  render() {
    // let carlo = [...this.state.choices.carlo]
    // console.log(carlo)
    console.log(this.state.choices);
    return (
      <div className="card card-body mb-3">
        <iframe
          style={{ height: "500px" }}
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT5fGc2WI7LJzgK3UEahvuf7fJQulF_Xmh4dx1Hr5jQOltwPoDHtvu9Beodr-Jj5HiVQaP1dtwCPtrk/pubhtml?widget=true&amp;headers=false"
        ></iframe>
        <h2>Sheet test</h2>
        <br></br>
        <div className="card card-body mb-3">
          <ul>
            <li style={{ fontWeight: "bold" }}>
              {this.state.choices.carlo.length
                ? this.state.choices.carlo[0]
                : null}
            </li>
            {this.state.choices.carlo.length
              ? this.state.choices.carlo.map((choice, num) =>
                  num === 0 ? null : <li key={num}>{choice}</li>
                )
              : null}
          </ul>
          <ul>
            <li style={{ fontWeight: "bold" }}>
              {this.state.choices.matteo.length
                ? this.state.choices.matteo[0]
                : null}
            </li>
            {this.state.choices.matteo.length
              ? this.state.choices.matteo.map((choice, num) =>
                  num === 0 ? null : <li key={num}>{choice}</li>
                )
              : null}
          </ul>
        </div>
      </div>
    );
  }
}

export default SheetTest;
