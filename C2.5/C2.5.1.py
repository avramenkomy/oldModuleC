import bottle

@bottle.route('/words')
def word_spammer():
    bottle.response.content_type = "text/event-stream"
    bottle.response.cache_control = "no-cache"
    bootle.response.connection = "keep-alive"
    bottle.response.headers['Access-Constrol-Allow-Origin'] = '*'


    hello = 'hello, world'
    return 'data: %s\n\n' % hello

if __name__ == "__main__":
    bottle.run(host='waitress')