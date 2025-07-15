import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import IndexScreen from "./IndexScreen";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IndexScreen />
      </PersistGate>
    </Provider>
  );
};
export default App;
