import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { toast } from "sonner";
import fetchWithAuth from "../fetchWrapper";

import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../../redux/auth/auth-slice";
import { AppDispatch } from "../../redux/store";
import {
  fetchUserFailure,
  fetchUserStart,
  fetchUserSuccess,
} from "../../redux/auth/user-slice";

// const API_BASE_URL = "https://api.joy-it.fr/api/v1";
const API_BASE_URL = "http://localhost:3000/api/v1";

export type LoginUserRequest = {
  login: string;
  password: string;
};

export const useLoginUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Initialize navigate

  const loginUser = async (loginUserData: LoginUserRequest) => {
    const response = await fetch(`${API_BASE_URL}/accounts/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUserData),
    });
    if (!response) throw new Error("Unable to login User");
    return response.json();
  };

  const {
    error,
    mutateAsync: loginUserRequest,
    isLoading,
    reset,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      if (data.access_token && data.refresh_token) {
        dispatch(
          signInSuccess({
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          })
        );
        toast.success("Connecté");

        await dispatch(fetchCurrentUser());

        navigate("/home");
        return;
      }

      toast.error("Identifiants invalides. Veuillez réessayer.");
      reset();
    },
  });

  if (error) {
    toast.error(error.toString());
    reset();
  }
  return { isLoading, loginUserRequest };
};

export const fetchCurrentUser = () => async (dispatch: AppDispatch) => {
  dispatch(fetchUserStart());
  try {
    const user = await fetchWithAuth("/accounts/profile", {
      method: "GET",
    });
    dispatch(fetchUserSuccess(user));
  } catch (error) {
    dispatch(fetchUserFailure(error));
    console.error({ error });
    toast.error("Échec de la récupération de l'utilisateur");
  }
};
