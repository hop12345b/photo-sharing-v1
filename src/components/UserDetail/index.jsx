import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import models from "../../modelData/models";
import "./styles.css";

function UserDetail() {
  // Lấy userId từ URL
  const { userId } = useParams();

  // Lấy dữ liệu người dùng từ model giả lập
  const user = models.userModel(userId);

  // Nếu không tồn tại user
  if (!user) {
    return <Typography variant="body1">Không tìm thấy người dùng.</Typography>;
  }

  return (
    <div className="userdetail-container">
      <Card className="userdetail-card" variant="outlined">
        <CardContent>
          {/* Tên người dùng */}
          <Typography variant="h5" gutterBottom>
            {user.first_name} {user.last_name}
          </Typography>

          {/* Thông tin chi tiết */}
          <Stack spacing={1.2} sx={{ mb: 2 }}>
            <Typography>
              <b>Địa điểm:</b> {user.location}
            </Typography>
            <Typography>
              <b>Nghề nghiệp:</b> {user.occupation}
            </Typography>
            <Typography>
              <b>Giới thiệu:</b> {user.description}
            </Typography>
          </Stack>

          {/* Nút chuyển sang ảnh */}
          <Button
            variant="contained"
            component={RouterLink}
            to={`/photos/${user._id}`}
          >
            Xem ảnh
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDetail;
