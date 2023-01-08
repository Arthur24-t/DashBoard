import React from "react";
import { Collapse } from "react-collapse";
import "../css/admin.css";
import axios from "axios";




class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.ListUser = this.ListUser.bind(this);
    this.state = {
      dataUser: null,
      collpase: false,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    //get user info
    let config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    return new Promise((resolve, reject) => {
      axios.get("http://127.0.0.1:8080/users", config).then((response) => {
        resolve(response.data);

        this.setState({ dataUser: response.data });
      });
    });
  }

  ListUser() {
    //display list of user
    if (this.state.dataUser != null) {
      const users = this.state.dataUser.map((user) => {
        return (
          <tbody key={user.id}>
            <tr id={user.id}>
              <td>{user.id}</td>
              <td>{user.mail}</td>
              <td>
                <button
                  aria-expanded="false"
                  data-toggle="collapse"
                  data-target={"#up_" + user.id}
                  className="btn btn-dark"
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => this.remove(user.id)}
                >
                  Remove
                </button>
              </td>
            </tr>

            <tr id={"up_" + user.id} className="collapse">
              <td>
                <div className="">
                  <label htmlFor="id">Uid</label>
                  <input
                    type="text"
                    id={"up_id" + user.id}
                    name="title"
                    disabled
                    defaultValue={user.id}
                  />

                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id={"up_email" + user.id}
                    name="email"
                    defaultValue={user.mail}
                  />

                  <label htmlFor="passwd">Password</label>
                  <input type="text" id={"up_passwd" + user.id} name="passwd" />

                  <button
                    className="mt-2 btn btn-dark"
                    onClick={() => this.update(user.id)}
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        );
      });
      return (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Uid</th>
              <th scope="col">Email</th>
              <th scope="col">Update</th>
              <th scope="col">Remove </th>
            </tr>
          </thead>
          {users}
        </table>
      );
    }
  }

  remove(uid) {
    //remove crud
    let config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    console.log(uid);
    let data = {
      uid: uid,
      token: localStorage.getItem("token"),
    };
    console.log(data);

    return new Promise((resolve, reject) => {
      axios
        .delete("http://127.0.0.1:8080/users", { data: data }, config)
        .then((response) => {
          resolve(response.data);
          this.setState({ message: response.data.message });
          this.getUser();
        });
    });
  }

  opens() {
    //function for collapse
    if (this.state.collpase) {
      this.setState({ collpase: false });
    } else {
      this.setState({ collpase: true });
    }
  }
  update(who_id) {
    //update crud
    var id = document.getElementById("up_id" + who_id).value;
    var email = document.getElementById("up_email" + who_id).value;
    var passwd = document.getElementById("up_passwd" + who_id).value;

    let data = {
      uid: id,
      email: email,
      passwd: passwd,
    };

    let config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    return new Promise((resolve, reject) => {
      axios
        .put("http://127.0.0.1:8080/users", data, config)
        .then((response) => {
          resolve(response.data);
          this.setState({ message: response.data.message });
          this.getUser();
        });
    });
  }

  create() {
    //create crud
    var email = document.getElementById("cr_email").value;
    var passwd = document.getElementById("cr_passwd").value;

    let data = {
      email: email,
      passwd: passwd,
    };

    let config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    return new Promise((resolve, reject) => {
      axios
        .post("http://127.0.0.1:8080/users", data, config)
        .then((response) => {
          resolve(response.data);
          this.setState({ message: response.data.message });
          this.getUser();
        });
    });
  }


  render() {
    //render function
    return (
      <div className="adminn">
        <h1>PAGE ADMIN</h1>
        <button className="adminbtn"
          onClick={() => {
            this.opens();
          }}
        >
          Create user
        </button>

        <Collapse isOpened={this.state.collpase}>
          <label htmlFor="email" className="emaill">Email :</label>
          <input
            className="emailinput"
            type="text"
            id={"cr_email"}
            name="email"
          />
          <label htmlFor="passwd" className="password">Password :</label>
          <input
          className="passwordinput"
            type="text"
            id={"cr_passwd"}
            name="passwd"
          />
          <button className="adminbtn" onClick={() => {this.create()}}>Create user</button>
        </Collapse>
        <this.ListUser />
      </div>
    );
  }
}
export { Admin };
