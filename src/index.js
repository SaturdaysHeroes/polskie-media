import {Twitter} from "./twitter.js";

// Profile IDs to follow.
// TVP Info, TVN 24, Polsat News, Onet. 
const profiles = [47295451, 14493047, 2383788666, 15720598];

const stream = Twitter.stream("statuses/filter", {follow: profiles}); 
stream.on("tweet", (tweet) => {
    if (!profiles.includes(tweet.user.id)) return;

    console.log(tweet);

    Twitter.post("statuses/retweet/:id", {id: tweet.id}, (err, data, res) => {
        if (err) throw err;

        console.log(data);
    });
});