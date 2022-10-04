import Header from "./Header";
import {Navigate, Outlet} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {authAtom} from "../_state/Auth";

export default function Layout() {
  const auth = useRecoilValue(authAtom);
  if (auth) {
    return <div>
      <Header auth={auth}/>
      <main>
        <Outlet/>
      </main>
    </div>
  } else {
    return <Navigate to={"/accounts/sign-in"}/>
  }
}
