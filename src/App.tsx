import SlideEditor from "./components/SlideEditor.tsx";
import PropertiesPanel from "./components/PropertiesPanel.tsx";
import ElementList from "./components/ElementList.tsx";

const App = () => {
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