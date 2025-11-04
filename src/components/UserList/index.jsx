import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link as RouterLink, useLocation } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function UserList() {
  const users = models.userListModel();   // Lấy danh sách người dùng từ dữ liệu mẫu
  const { pathname } = useLocation();     // Dò đường dẫn hiện tại để đánh dấu đang chọn

  return (
    <div className="userlist-container">
      <List dense>
        {users.map((user, index) => (
          <React.Fragment key={user._id}>
            <ListItemButton
              component={RouterLink}
              to={`/users/${user._id}`}
              selected={pathname === `/users/${user._id}`}
            >
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`}
                secondary={user.occupation}
              />
            </ListItemButton>
            {index < users.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
