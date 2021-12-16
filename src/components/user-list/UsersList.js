import React from "react";

import User from "./User";
import classes from "./UsersList.module.css";

const UsersList = (props) => {
  return (
    <ul className={classes["users-list"]}>
      {props.users.map((user) => (
        <User
          key={user.id}
          name={user.name}
          username={user.username}
          email={user.email}
        />
      ))}
    </ul>
  );
};

export default UsersList;
