import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
      pageValue: 1,
      tags: "cats",
    };

    this.publish = this.publish.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // getting first api
  componentDidMount() {
    fetch("/api")
      .then(function (response) {
        return response.json();
      })
      .then(
        function (j) {
          let picArray = j.photos.photo.map((pic) => {
            var srcPath =
              "https://farm" +
              pic.farm +
              ".staticflickr.com/" +
              pic.server +
              "/" +
              pic.id +
              "_" +
              pic.secret +
              ".jpg";
            return <img alt="error load image" class="pic" src={srcPath}></img>;
          });
          this.setState({ pictures: picArray });
        }.bind(this)
      );
  }

  // change tags state when user input something in search box
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  // get the value from input tags then send it to search api
  publish() {
    fetch("/api/search/" + this.state.tags)
      .then(function (response) {
        return response.json();
      })
      .then(
        function (j) {
          let picArray = j.photos.photo.map((pic) => {
            var srcPath =
              "https://farm" +
              pic.farm +
              ".staticflickr.com/" +
              pic.server +
              "/" +
              pic.id +
              "_" +
              pic.secret +
              ".jpg";
            return <img alt="error load image" class="pic" src={srcPath}></img>;
          });
          this.setState({ pictures: picArray });
        }.bind(this)
      );
  }

  // previous paging
  PrevHandler = () => {
    var currentPage = this.state.pageValue;
    currentPage--;
    this.setState({ pageValue: currentPage });

    fetch("/api/" + currentPage + "-" + this.state.tags)
      .then(function (response) {
        return response.json();
      })
      .then(
        function (j) {
          let picArray = j.photos.photo.map((pic) => {
            var srcPath =
              "https://farm" +
              pic.farm +
              ".staticflickr.com/" +
              pic.server +
              "/" +
              pic.id +
              "_" +
              pic.secret +
              ".jpg";
            return <img alt="error load image" class="pic" src={srcPath}></img>;
          });
          this.setState({ pictures: picArray });
        }.bind(this)
      );
  };

  // next paging
  NextHandler = () => {
    var currentPage = this.state.pageValue;
    currentPage++;
    this.setState({ pageValue: currentPage });

    fetch("/api/" + currentPage + "-" + this.state.tags)
      .then(function (response) {
        return response.json();
      })
      .then(
        function (j) {
          let picArray = j.photos.photo.map((pic) => {
            var srcPath =
              "https://farm" +
              pic.farm +
              ".staticflickr.com/" +
              pic.server +
              "/" +
              pic.id +
              "_" +
              pic.secret +
              ".jpg";
            return <img alt="error load image" class="pic" src={srcPath}></img>;
          });
          this.setState({ pictures: picArray });
        }.bind(this)
      );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">AIA TEST</h1>
        </header>
        <input
          type="text"
          name="tags"
          placeholder="Enter topic here..."
          value={this.state.tags}
          onChange={this.handleChange}
        />
        <button value="Send" onClick={this.publish}>
          Submit
        </button>

        <p className="App-intro">{this.state.pictures}</p>
        <div>
          <button onClick={this.PrevHandler}>Prev</button>
          <button onClick={this.NextHandler}>Next</button>
        </div>
      </div>
    );
  }
}

export default App;
