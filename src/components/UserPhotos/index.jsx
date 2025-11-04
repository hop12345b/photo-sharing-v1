import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import models from "../../modelData/models";
import "./styles.css";

// Hàm format ngày giờ dễ đọc
function formatDateTime(dt) {
  const date = new Date(dt);
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function PhotoCard({ photo }) {
  return (
    <Card className="userphotos-photo" variant="outlined">
      <CardHeader
        title={photo.file_name}
        subheader={`Đăng ngày: ${formatDateTime(photo.date_time)}`}
      />
      <Box className="userphotos-imgwrap">
        <img
          src={require(`../../images/${photo.file_name}`)}
          alt={photo.file_name}
          className="userphotos-img"
        />
      </Box>
      <CardContent>
        {photo.comments && photo.comments.length > 0 ? (
          <>
            <Typography variant="subtitle2">Bình luận:</Typography>
            <Divider sx={{ my: 1 }} />
            {photo.comments.map((c) => (
              <Box key={c._id} className="userphotos-comment">
                <Typography variant="body2">
                  <Link
                    component={RouterLink}
                    to={`/users/${c.user._id}`}
                    underline="hover"
                  >
                    {c.user.first_name} {c.user.last_name}
                  </Link>{" "}
                  · {formatDateTime(c.date_time)}
                </Typography>
                <Typography variant="body1">{c.comment}</Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            (Chưa có bình luận)
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

function UserPhotos() {
  const { userId } = useParams();
  const user = models.userModel(userId);
  const photos = models.photoOfUserModel(userId) || [];

  if (!user) {
    return <Typography>Không tìm thấy người dùng.</Typography>;
  }

  return (
    <Box className="userphotos-container">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Ảnh của {user.first_name} {user.last_name}
      </Typography>

      {photos.map((photo) => (
        <PhotoCard key={photo._id} photo={photo} />
      ))}

      {photos.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          Người dùng này chưa đăng ảnh nào.
        </Typography>
      )}
    </Box>
  );
}

export default UserPhotos;
