var request = require('request');

describe("app testing suite", function() {
    it("should respond with hello world", function(done) {
      request("http://localhost:3000/", function(error, response, body){
        expect(body).toEqual('[]');
        done();
      });
    });
});