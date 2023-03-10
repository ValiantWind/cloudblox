import config from "../client";

import axios from "axios";

type BaseAssetsAPI = {
    placeHolder(uselessParam: string): void
};

const Assets: BaseAssetsAPI = {
    placeHolder
};

function placeHolder (uselessParam: string): void {
    console.log("placeholder");
}
