import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import AuthService from "../../services/auth.service";

export default function Profile (props) {
  const { register, setValue, setError, handleSubmit, watch, errors } = useForm();
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  
  const handleChangePassword = (data) => {
    
    setLoading(true)
    if (data.previousPassword !== data.newPassword){
      return setError("failed", "notMatch", "The passwords you typed are different!");
    }


    const email = AuthService.getCurrentUser().email

    return AuthService.changeData(
      email,
      data.newPassword
    ).then( res => {
      setMessage("Your password has successfuly been changed")
      setValue([
        { previousPassword : "", },
        { newPassword : "", },
      ])
    })
  }

    return (
      <div className="col-md-12">

         <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <form
            onSubmit={handleSubmit(handleChangePassword)}
          >
            <div className="form-group">
              <label htmlFor="previousPassword">Type the new password</label>
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
              <input
                type="submit"
              />
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
              </button>
              {errors.failed && <p>{errors.failed.message}</p>}
              {message && <p>{message}</p>}
            </div>
          </form>
        </div> 
      </div>
    );
  }
