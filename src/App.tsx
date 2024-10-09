import SlideEditor from "./components/SlideEditor.tsx";
import PropertiesPanel from "./components/PropertiesPanel.tsx";
import ElementList from "./components/ElementList.tsx";
// import {useSelector} from "react-redux";
// import {appState} from "./store/store.ts";

const App = () => {
    // const elements = useSelector((state: appState) => state.elements);
    // console.log("elements", elements);
    return (
        <div>
            <div className="properties-panel">
                <PropertiesPanel/>
            </div>
            <div className="elements-list">
                <ElementList/>
            </div>
            <SlideEditor/>
        </div>
    );
};

export default App;