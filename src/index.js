import {Twitter} from "./twitter.js";

// Profile IDs to follow.
// TVP Info, TVN 24, Polsat News. 
const profiles = [47295451, 14493047, 2383788666];

const stream = Twitter.stream("statuses/filter", {follow: profiles}); 
stream.on("tweet", (tweet) => {
    console.log(tweet);
});