import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

import ErrorBoundary from "./components/ErrorBoundary";
import { Auth } from "./features/auth/Auth";
import { Appbar } from "./components/appbar/Appbar";
import { QuizMenu } from "./features/quiz/menu/QuizMenu";
import { QuizQuestion } from "./features/quiz/question/QuizQuestion";
import { QuizPronunciation } from "./features/quiz/pronunciation/QuizPronunciation";
import { QuizResult } from "./features/quiz/result/QuizResult";

const App: FC = () => {
  const jwt = localStorage.getItem("localJWT");

  return (
    <ErrorBoundary>
      <Appbar />
      <Grid container spacing={0}>
        <Grid item xs />
        <Grid item xs={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
              mt: 12,
              minheight: "100vh",
            }}
          >
            <Routes>
              <Route path="/" element={jwt ? <QuizMenu /> : <Auth />} />
              <Route
                path="/questions"
                element={jwt ? <QuizQuestion /> : <Auth />}
              />
              <Route path="/result" element={jwt ? <QuizResult /> : <Auth />} />
              <Route
                path="/pronunciation"
                element={jwt ? <QuizPronunciation /> : <Auth />}
              />
            </Routes>
          </Box>
        </Grid>
        <Grid item xs />
      </Grid>
    </ErrorBoundary>
  );
};

export default App;
