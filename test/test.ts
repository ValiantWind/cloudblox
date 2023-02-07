import axios from "axios";

import { Client, MessagingService } from "../dist/index";


const client = new Client()

client.Configure({
})

async function test(){
	MessagingService.PublishAsync("TestTopic", "god please work")
}


test()