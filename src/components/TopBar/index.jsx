import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMatch } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

const YOUR_NAME = "Nguyễn Vân Hợp"; // ← thay bằng tên bạn

/**
 * Hàm phụ xác định tiêu đề bên phải của TopBar tùy theo route
 */
function useContextTitle() {
  const matchUser = useMatch("/users/:userId");
  const matchPhotos = useMatch("/photos/:userId");

  if (matchPhotos?.params?.userId) {
    const user = models.userModel(matchPhotos.params.userId);
    return user ? `Photos of ${user.first_name} ${user.last_name}` : "";
  }

  if (matchUser?.params?.userId) {
    const user = models.userModel(matchUser.params.userId);
    return user ? `${user.first_name} ${user.last_name}` : "";
  }

  // Mặc định khi đang ở /users
  return "Users";
}

function TopBar() {
  const rightTitle = useContextTitle();

  return (
    <AppBar position="static" className="topbar-appbar">
      <Toolbar>
        {/* Bên trái: Tên của bạn */}
        <Typography variant="h6" className="topbar-left">
          {YOUR_NAME}
        </Typography>

        {/* Tạo khoảng cách giữa trái và phải */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Bên phải: Tên người dùng hoặc “Photos of ...” */}
        <Typography variant="subtitle1" className="topbar-right">
          {rightTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
