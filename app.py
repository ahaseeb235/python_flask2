from flask import Flask, render_template, request, jsonify
import tweepy
import configparser

app = Flask(__name__)

# Set up Twitter API
consumer_key = '1AD5JhK8lm4nTZU4I1cmh5HvJ'
consumer_secret = 'ep8qXmDcbxyI3pLghjqoDywnh2MalqXHfvdGaV2MmPJzvUQq1w'
access_token = '2147499236-CEfoWSjokNBLAq7FnVzwhMBKRcU1W8cg43RB0Ic'
access_token_secret = 'hhoi5FIySSgRbK1WhPE5RHWHDLL6oyFYKGFo5tPfDk85g'

auth = tweepy.OAuth1UserHandler(consumer_key, consumer_secret, access_token, access_token_secret)
api = tweepy.API(auth)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    tweets_data = []
    
    for tweet in tweepy.Cursor(api.search_tweets, q=query, lang="en", tweet_mode='extended').items(100):
        tweets_data.append({
            'date': tweet.created_at,
            'userid': tweet.user.id_str,
            'username': tweet.user.screen_name,
            'tweet': tweet.full_text,
            'impressions': tweet.user.followers_count,  # Approximation
            'retweets': tweet.retweet_count,
            'likes': tweet.favorite_count,
            'comments': tweet.reply_count if hasattr(tweet, 'reply_count') else 0,
            'quotes': tweet.quote_count if hasattr(tweet, 'quote_count') else 0
        })
    
    return jsonify(tweets_data)

if __name__ == '__main__':
    app.run(debug=True)



