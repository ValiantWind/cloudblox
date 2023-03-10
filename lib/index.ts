import AccountInformation from "./apis/AccountInformation";
import AccountSettings from "./apis/AccountSettings";
import Auth from "./apis/Authentication";
import Avatar from "./apis/Avatar";
import Badges from "./apis/Badges";
import Catalog from "./apis/Catalog";
import Chat from "./apis/Chat";
import Contacts from "./apis/Contacts";
import Develop from "./apis/Develop";
import Economy from "./apis/Economy";
import Followings from "./apis/Followings";
import Friends from "./apis/Friends";
import Games from "./apis/Games";
import Groups from "./apis/Groups";
import Inventory from "./apis/Inventory";
import Presence from "./apis/Presence";
import Thumbnails from "./apis/Thumbnails";
import Users from "./apis/Users";
import MessagingService from "./OpenCloud/MessagingService";
import PlacePublishing from "./OpenCloud/PlacePublishing";
import DataStoreService from "./OpenCloud/DataStoreService";

export {
    AccountInformation,
    AccountSettings,
    Auth,
    Avatar,
    Badges,
    Catalog,
    Chat,
    Contacts,
    Develop,
    Economy,
		Followings,
    Friends,
    Games,
    Groups,
    Inventory,
    Presence,
    Thumbnails,
    Users,
    MessagingService,
    PlacePublishing,
    DataStoreService
};

export { default as Client } from "./client";
