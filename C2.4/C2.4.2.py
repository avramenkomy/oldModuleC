import time
import bottle

@bottle.route('/words')
def word_spammer():
    words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']
    for word in words:
        yield word
        time.sleep(2)

if __name__ == "__main__":
    bottle.run(host="localhost", port=9999, debug=True)