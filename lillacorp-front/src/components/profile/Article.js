import React from "react";

export default function ProfileArticle(props) {
  return (
    <div className="profile__article">
      <div className="profile__article__content">
        <p>Titolo</p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat,{" "}
        </p>
      </div>
      <div className="profile__article__data">
        <p>
          Date: <span>20/10/2022</span>
        </p>
        <p>
          Comments: <span>12</span>
        </p>
        <p>
          Favorites: <span>3</span>
        </p>
      </div>
    </div>
  );
}
