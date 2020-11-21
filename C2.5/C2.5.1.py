import bottle

@bottle.route('/words')
def word_spammer():
    bottle.response.content_type = "text/event-stream"
    bottle.response.cache_control = "no-cache"
    bottle.response.headers['Access-Constrol-Allow-Origin'] = 'https://sf-pyw.mosyag.in/'


    hello = 'hello, world'
    return 'data: %s\n\n' % hello

if __name__ == "__main__":
    bottle.run(host='localhost', port=9999, debug=True)