import axios from "axios";

import { Badges, Avatar, Users, Catalog, Develop, Client, MessagingService } from "../dist/index";


const client = new Client()

client.Configure({
	UniverseId: 3234769652,
	MessagingService: "loFnpLAPkE+7C2xnAJEGRyk4r8GC3gE/JgoEBiQP1LgJJ8CI"
})


async function test(){
	MessagingService.PublishAsync("TestTopic", "test-success")
}

test()