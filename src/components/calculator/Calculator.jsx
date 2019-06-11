import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const styles = theme => ({
  Calculator: {
    width: "290px",
    maxWidth: "290px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white"
  },
  numbers: {
    maxWidth: "194px"
  },
  events: {
    maxWidth: "97px"
  },
  buttons: {
    display: "flex"
  }
});

const operators = ["+", "-", "/", "*"];

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ""
    };
  }

  handleChange = value => {
    let i = 0;
    let includes = false;
    while (i < 3) {
      if (
        this.state.inputValue.slice(-1) == operators[i] &&
        operators.includes(value)
      ) {
        includes = true;
      }
      i++;
    }
    if (!includes) {
      this.setState(state => ({
        inputValue: this.state.inputValue + value
      }));
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    const operation = {
      value: this.state.inputValue
    };

    axios
      .post(`/calculate`, operation)
      .then(res => {
        this.setState({
          inputValue: res.data.calcValue
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    const { inputValue } = this.state;
    return (
      <form className={classes.Calculator} onSubmit={this.handleSubmit}>
        <TextField
          disabled
          id="filled-multiline-static"
          multiline
          rows="3"
          style={{ maxWidth: "100%", maxHeight: "max-content" }}
          value={inputValue}
          margin="normal"
          variant="filled"
        >
          {inputValue}
        </TextField>
        <div className={classes.buttons}>
          <div className={classes.numbers}>
            <Button
              onClick={() => this.handleChange("1")}
              value="1"
              variant="contained"
              color="primary"
            >
              1
            </Button>
            <Button
              onClick={() => this.handleChange("2")}
              variant="contained"
              color="primary"
            >
              2
            </Button>
            <Button
              onClick={() => this.handleChange("3")}
              variant="contained"
              color="primary"
            >
              3
            </Button>
            <Button
              onClick={() => this.handleChange("4")}
              variant="contained"
              color="primary"
            >
              4
            </Button>
            <Button
              onClick={() => this.handleChange("5")}
              variant="contained"
              color="primary"
            >
              5
            </Button>
            <Button
              onClick={() => this.handleChange("6")}
              variant="contained"
              color="primary"
            >
              6
            </Button>
            <Button
              onClick={() => this.handleChange("7")}
              variant="contained"
              color="primary"
            >
              7
            </Button>
            <Button
              onClick={() => this.handleChange("8")}
              variant="contained"
              color="primary"
            >
              8
            </Button>
            <Button
              onClick={() => this.handleChange("9")}
              variant="contained"
              color="primary"
            >
              9
            </Button>
            <Button
              onClick={() => this.handleChange("(")}
              variant="contained"
              color="secondary"
            >
              (
            </Button>
            <Button
              onClick={() => this.handleChange("0")}
              variant="contained"
              color="primary"
            >
              0
            </Button>
            <Button
              onClick={() => this.handleChange(")")}
              variant="contained"
              color="secondary"
            >
              )
            </Button>
          </div>
          <div className={classes.events}>
            <Button
              onClick={() => this.handleChange("+")}
              variant="contained"
              color="secondary"
            >
              +
            </Button>
            <Button
              onClick={() => this.handleChange("-")}
              variant="contained"
              color="secondary"
            >
              -
            </Button>
            <Button
              onClick={() => this.handleChange("/")}
              variant="contained"
              color="secondary"
            >
              /
            </Button>
            <Button
              onClick={() => this.handleChange("*")}
              variant="contained"
              color="secondary"
            >
              *
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              =
            </Button>
          </div>
        </div>
        <Button
          onClick={() => {
            this.setState({ inputValue: "" });
          }}
          variant="contained"
        >
          CLEAR
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(Calculator);
