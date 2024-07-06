import React, { useEffect, useState } from "react";
import { Axios } from "../../Base/Axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";

function UpdateUser() {
  let { id } = useParams();
  let [form, setForm] = useState({ username: "", email: "", role: "" });
  let nav = useNavigate();
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    Axios.get("/users/" + id)
      .then((res) => setForm(res.data))
      .catch((err) => {
        nav("/users", { replace: true });
        console.log(err);
      });
  }, []);
  let handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  let updateUser = async () => {
    setLoading(true);
    try {
      let res = await Axios.put("/users/" + id, form);
      console.log(res);
      setLoading(false);
      nav("/users");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="uesrs update-user">
      {loading && <Loading tr={true}></Loading>}
      <h2 className="g-title">Upadate User</h2>
      <div className="form-controle">
        <label htmlFor="">
          {" "}
          <i className="fas fa-user"></i> Username
        </label>
        <input
          type="text"
          name="username"
          value={form.username}
          placeholder="Username..."
          required
          onChange={handelChange}
        />
      </div>
      <div className="form-controle">
        <label htmlFor="">
          {" "}
          <i className="fas fa-user-tie"></i> Role
        </label>
        <select name="role" id="" onChange={handelChange} value={form.role}>
          <option value="" selected disabled>
            Select Role
          </option>
          <option value="Admin">Admin</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </select>
      </div>
      <div className="form-controle">
        <label htmlFor="">
          {" "}
          <i className="fas fa-envelope"></i> Email
        </label>
        <input
          onChange={handelChange}
          type="email"
          value={form.email}
          name="email"
          placeholder="Email..."
          required
        />
      </div>
      <div className="form-controle">
        <button onClick={updateUser}>Update</button>
      </div>
    </div>
  );
}

export default UpdateUser;
