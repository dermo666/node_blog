var ArticleProvider = require('../articleprovider-memory.js').ArticleProvider;

describe('memory article provider testing suite', function() {
    it('should be empty after init', function() {
        // New Memory Article Provider.
        articleProvider = new ArticleProvider();
        articleProvider.findAll(function(error, docs){
              expect(docs).toEqual([]);
        });
    });
});