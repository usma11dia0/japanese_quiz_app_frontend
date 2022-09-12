import { FormEvent, FC, useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Auth.module.css";
import { AppDispatch } from "../../app/store";
import {
  toggleMode,
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectIsLoginView,
} from "./authSlice";

export const Auth: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoginView = useSelector(selectIsLoginView);
  const [isInputError, setIsInputError] = useState(false);
  const [isUserNameError, setIsUserNameError] = useState(false);
  const username = useRef<HTMLInputElement>(null);
  const password1 = useRef<HTMLInputElement>(null);
  const password2 = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoginView) {
      const credential = {
        username: username.current!.value,
        password: password1.current!.value,
      };
      const resultAction = await dispatch(fetchAsyncLogin(credential));
      if (!fetchAsyncLogin.fulfilled.match(resultAction)) {
        setIsInputError(!isInputError);
        setIsUserNameError(!isUserNameError);
        toast.error(
          `usernameまたはpasswordに誤りがあるか、登録されていません`,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        //AxiosErrorのメッセージを直接取得する場合
        // if (resultAction.payload) {
        //   setErrorMessage(`${resultAction.payload.detail}`);
        // } else {
        //   setErrorMessage(`${resultAction.error}`);
        // }
        // toast内記載用 `${setErrorMessage(`${result.payload}`)}`
      }
    } else {
      if (password1.current!.value !== password2.current!.value) {
        setIsInputError(!isInputError);
        toast.error("passwordが一致しません", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const credential = {
          username: username.current!.value,
          password: password1.current!.value,
        };
        const result = await dispatch(fetchAsyncRegister(credential));
        if (fetchAsyncRegister.fulfilled.match(result)) {
          await dispatch(fetchAsyncLogin(credential));
        } else {
          if (result.payload) {
            toast.error(`${result.payload.username[0]}`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      }
    }
  };

  return (
    <div className={styles.auth__root}>
      <h1>{isLoginView ? "ろぐいん" : "しんきとうろく"}</h1>
      <br />
      <form className="textFieldWrapper" onSubmit={(e) => handleSubmit(e)}>
        <TextField
          error={isUserNameError}
          InputLabelProps={{
            shrink: true,
          }}
          id="username"
          name="username"
          label="おなまえ"
          sx={{
            "& .MuiInputLabel-root": {
              color: "black",
              fontWeight: "500",
              fontSize: "1.2rem",
            },
          }}
          type="text"
          variant="standard"
          autoComplete="username"
          size="medium"
          color="primary"
          required
          fullWidth
          inputRef={username}
        />
        <br />
        <TextField
          error={isInputError}
          InputLabelProps={{
            shrink: true,
          }}
          id="password1"
          name="password1"
          label={isLoginView ? "ぱすわーど" : "ぱすわーど1"}
          sx={{
            "& .MuiInputLabel-root": {
              color: "black",
              fontWeight: "500",
              fontSize: "1.1rem",
            },
            mt: 3,
          }}
          type="password"
          variant="standard"
          autoComplete="new-password"
          size="medium"
          required
          fullWidth
          inputRef={password1}
        />
        <br />
        {isLoginView ? (
          ""
        ) : (
          <TextField
            error={isInputError}
            InputLabelProps={{
              shrink: true,
            }}
            id="password2"
            name="password2"
            label="ぱすわーど2"
            sx={{
              "& .MuiInputLabel-root": {
                color: "black",
                fontWeight: "500",
                fontSize: "1.1rem",
              },
              mt: 3,
              mb: 1,
            }}
            type="password"
            variant="standard"
            autoComplete="new-password"
            required
            fullWidth
            inputRef={password2}
          />
        )}
        <Button
          id="send-login"
          variant="contained"
          type="submit"
          color="primary"
          size="medium"
          sx={{
            display: "flex",
            justifyContent: "center",
            y: 3,
            m: "auto",
            mt: 5,
            mb: 2,
          }}
        >
          {isLoginView ? "ろぐいん" : "とうろく"}
        </Button>
      </form>
      <br />
      <span onClick={() => dispatch(toggleMode())} className={styles.span}>
        {isLoginView ? "はじめての方はこちら" : "ろぐいんはこちら"}
      </span>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
