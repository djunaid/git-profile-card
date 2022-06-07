import React, { useState } from "react";
import { render } from "react-dom";
import axios from "axios";

const mountNode = document.getElementById("root");

const testData = [
  {
    name: "Dan Abramov",
    avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
    company: "@facebook"
  },
  {
    name: "Sophie Alpert",
    avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
    company: "Humu"
  },
  {
    name: "Sebastian Markbåge",
    avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
    company: "Facebook"
  }
];

const CardList = (props) => (
  <div>
    {props.profile.map((data) => (
      <Card {...data} />
    ))}
  </div>
);

class Card extends React.Component {
  render() {
    return (
      <div style={{ margin: "1rem" }}>
        <img
          alt="This is profile"
          style={{ width: "5%", height: "5%", borderRadius: "10%" }}
          src={this.props.avatar_url}
        />
        <div style={{ display: "inline-block", marginLeft: "10" }}>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {" "}
            {this.props.name}
          </div>
          <div> {this.props.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = {
    userName: ""
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );

    this.onSubmit(resp.data);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ margin: "10" }}>
        <input
          type="text"
          placeholder="Enter github username"
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          required
        />
        <button> Submit </button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    profile: testData
  };

  addProfile = (event) => {
    console.log(event);
  };

  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <Form onSubmit={this.addProfile} />
        <CardList profile={this.state.profile} />
      </div>
    );
  }
}

render(<App title="Github Card App" />, mountNode);
