import { Provider } from "react-redux"; // npm install react-redux redux
import { store } from "./store/store";
import { AppRouter } from "./router/AppRouter";



export const FitManagerAppPublico = () => {
  return (
    <div>
      {/* El store debe estar algun punto alto de nuestra aplicacion */}
      <Provider store={store}>
        <AppRouter />
      </Provider>
        
    </div>
  )
}





