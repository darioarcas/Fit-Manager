import { FitScreen } from "./components/fit-screen/FitScreen"
import { NavBar } from "./components/navbar/NavBar"

export const FitManagerApp = () => {
  return (
      // <div className="feet-manager">
      <div className="overflow-hidden">
        <NavBar/>

        <FitScreen/>      

      </div>
  )
}
