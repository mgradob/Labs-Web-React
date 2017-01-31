import "./index.css";
import React from "react";
import {render} from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";

import MainView from "./app/commons/view-main";

injectTapEventPlugin();

render((
    <MuiThemeProvider>
        <MainView/>
    </MuiThemeProvider>
), document.getElementById('root'));