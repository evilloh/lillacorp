import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthService from "../../services/auth.service";
import ProfileArticle from "./Article";
import "./profile.scss";
import { Link } from "react-router-dom";

export default function Profile(props) {
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    watch,
    errors,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [section, setSection] = useState("profile");

  const handleChangePassword = (data) => {
    setLoading(true);
    if (data.previousPassword !== data.newPassword) {
      return setError(
        "failed",
        "notMatch",
        "The passwords you typed are different!"
      );
    }

    const email = AuthService.getCurrentUser().email;

    return AuthService.changeData(email, data.newPassword).then((res) => {
      setMessage("Your password has successfuly been changed");
      setValue([{ previousPassword: "" }, { newPassword: "" }]);
    });
  };

  const isSelected = (arg) => {
    return arg === section ? "profile__body__list__selected" : "";
  };

  return (
    <div className="profile__main-container">
      <div className="profile__header">
        <div className="profile__header__avatar"></div>
        <div className="profile__header__main">
          <div className="profile__header__main__top">
            <h3>Name</h3>
          </div>
          <div className="profile__header__main__bottom">
            <p>0 Articles | 2 Favorites Articles | </p>
          </div>
        </div>
      </div>
      <div className="profile__body">
        <div className="profile__body__list">
          <p
            className={isSelected("profile")}
            onClick={() => setSection("profile")}
          >
            Profile
          </p>
          <p
            className={isSelected("articles")}
            onClick={() => setSection("articles")}
          >
            Articles
          </p>
          <p
            className={isSelected("favorites")}
            onClick={() => setSection("favorites")}
          >
            Favorites
          </p>
          <p
            className={isSelected("mangustas")}
            onClick={() => setSection("mangustas")}
          >
            My mangustas
          </p>
        </div>
        <div className="profile__body__main">
          {section === "articles" && <ProfileArticle></ProfileArticle>}
          {section === "profile" && (
            <div>
              <div>
                <hr></hr>
                <hr></hr>
                <hr></hr>
              </div>
              <form onSubmit={handleSubmit(handleChangePassword)}>
                <div className="profile__user__password-container">
                  <label htmlFor="previousPassword">Change your password</label>
                  <input
                    ref={register({ required: true })}
                    type="password"
                    className="form-control"
                    name="previousPassword"
                  />
                </div>
                {errors.previousPassword && <span>This field is required</span>}

                <div className="form-group">
                  <label htmlFor="newPassword">Type it again dude</label>
                  <input
                    ref={register({ required: true })}
                    className="form-control"
                    type="password"
                    name="newPassword"
                  />
                </div>
                {errors.newPassword && <p>This field is required</p>}

                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    <input type="submit" />
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                  </button>
                  {errors.failed && <p>{errors.failed.message}</p>}
                  {message && <p>{message}</p>}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
