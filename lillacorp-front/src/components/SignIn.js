import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthService from "../services/auth.service";

export default function SignIn(props) {
  const { register, setError, handleSubmit, watch, errors } = useForm();
  const [loading, setLoading] = useState(false);

  const handleLogin = (data) => {
    setLoading(true);

    AuthService.login(data.username, data.password).then((res) => {
      if (res.username) {
        setLoading(false);
        props.history.push("/profile");
        window.location.reload();
      } else if (res.response.status == 404 || 401) {
        return setError("failed", "notMatch", res.response.data.message);
      }
      setLoading(false);
      return res;
    });
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              ref={register({ required: true })}
              type="text"
              className="form-control"
              name="username"
            />
          </div>
          {errors.username && <span>This field is required</span>}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              ref={register({ required: true })}
              className="form-control"
              type="password"
              name="password"
            />
            {errors.password && <p>This field is required</p>}
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              <input type="submit" />
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
            </button>
            {errors.failed && <p>{errors.failed.message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
