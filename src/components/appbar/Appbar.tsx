import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";

import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { resetState } from "../../features/quiz/quizSlice";
import styles from "./Appbar.module.css";

export const Appbar = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleClickLogout = () => {
    localStorage.removeItem("localJWT");
    window.location.href = "/";
  };

  const handleClickToMenu = () => {
    navigate("/quizzes");
    // store内のRedux stateをリセット
    dispatch(resetState());
  };

  return (
    <>
      <Box sx={{ flexGlow: 1 }}>
        <AppBar position="fixed" sx={{ width: "100%", opacity: "0.9" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0, top: "1px" }}
              disableRipple={true}
              onClick={handleClickToMenu}
            >
              <img
                src="../../../assets/icon/favicon.jpg"
                alt="favicon"
                className={styles.topbarImg}
              />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{ cursor: "pointer" }}
              mt={-0.2}
              onClick={handleClickToMenu}
            >
              日本語同音異義語クイズ
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              onClick={handleClickLogout}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <LogoutIcon />
              <Button
                color="inherit"
                sx={{
                  paddingLeft: "3px",
                  justifyContent: "flex-start",
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "transparent",
                  },
                }}
              >
                <Typography variant="h5" component="div" mt={-0.5}>
                  退出
                </Typography>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
