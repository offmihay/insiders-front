import { useState } from "react";
import {
  Button,
  Box,
  OutlinedInput,
  Container,
  Typography,
} from "@mui/material";
import { useAuthMutation } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { signIn } = useAuth();

  const navigate = useNavigate();
  const { loginMutation } = useAuthMutation();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    loginMutation.mutate(formData, {
      onSuccess: (data) => {
        signIn(data.token);
        navigate("/home", { replace: true });
      },
    });
  };

  return (
    <div className="wrapper">
      <Container maxWidth="sm">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "text.primary" }}
        >
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            gap: 2,
          }}
        >
          <OutlinedInput
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            name="email"
            className="w-full h-10 mt-2"
          />
          <OutlinedInput
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            name="password"
            type="password"
            className="w-full h-10 mt-2"
          />
          <Button variant="text" onClick={() => navigate("/signup")}>
            Dont have an account? Sign Up
          </Button>
          <Button type="button" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
