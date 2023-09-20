import { config } from "../client";
import Develop from "../apis/Develop";

import axios from "axios";

type BasePlacePublishing = {
    Save(PlaceId: number): Promise<void>;
    Publish(PlaceId: number): Promise<void>;
};

const PlacePublishing: BasePlacePublishing = {
    Save,
    Publish
};

const URL = `https://apis.roblox.com/universes/`;

async function Save (PlaceId: number): Promise<void> {
    const UniverseId = await Develop.getUniverseIdFromPlace(PlaceId);
    if (!config.PlacePublishing) {
        Promise.reject(new Error("No Place Publishing API Key has been set"));
    }
    await axios
        .post(`${URL}/v1/universe/${UniverseId}/place/${PlaceId}/versions?versionType=Saved`, {
            headers: {
                "x-api-key": config.PlacePublishing,
                "Content-Type": "application/octet-stream"
            }
        })
        .catch(error => {
            Promise.reject(new Error(error));
        });
}

async function Publish (PlaceId: number): Promise<void> {
    const UniverseId = await Develop.getUniverseIdFromPlace(PlaceId);
    if (!config.PlacePublishing) {
        Promise.reject(new Error("No Place Publishing API Key has been set"));
    }
    await axios
        .post(`${URL}/v1/universe/${UniverseId}/place/${PlaceId}/versions?versionType=Published`, {
            headers: {
                "x-api-key": config.PlacePublishing,
                "Content-Type": "application/octet-stream"
            }
        })
        .catch(error => {
            Promise.reject(error);
        });
}

export default PlacePublishing;
