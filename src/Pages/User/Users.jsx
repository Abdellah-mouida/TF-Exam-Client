import React, { useEffect, useState } from "react";
import { Axios } from "../../Base/Axios";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";

function Users() {
  let [users, setUsers] = useState([]);
  let [render, setRender] = useState(false);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    Axios.get("/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [render]);
  let deleteUser = async (id) => {
    console.log(id);
    try {
      let res = await Axios.delete("/users/" + id);
      console.log(res);
      setRender((p) => !p);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="users">
      {loading && <Loading></Loading>}
      <div className="h2 g-title">Users</div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((m, i) => (
            <tr key={i}>
              <td>{m.username} </td>
              <td>{m.role}</td>
              <td>{m.email} </td>
              <td>
                <button onClick={() => deleteUser(m._id)}>
                  <i className="fas fa-trash"></i>{" "}
                </button>{" "}
                <button>
                  <Link
                    style={{ color: "var(--Dark)" }}
                    to={"/users/update/" + m._id}
                  >
                    <i className="fas fa-pen"></i>
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
