import { Route, Routes } from "react-router-dom";
import { SignIn } from "./components/sign-in/SignIn.js";
import { Authorization } from "./components/authorization/Authorization.js";
import { Register } from "./components/register/Register.js";
import { UserRoutes } from "./components/authorization/UserRoutes.js";

export const PhotoJam = () => {
  return (
  <Routes >
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/register" element={<Register />} />
    <Route path="/*" element={<Authorization />}>
        <Route index element={<UserRoutes/>} />
    </Route>
  </Routes>
  );
}


