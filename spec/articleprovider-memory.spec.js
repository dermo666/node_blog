var ArticleProvider = require('../articleprovider-memory.js').ArticleProvider;

describe('memory article provider testing suite', function() {
    var article1 = {'title' : "Title 11", "comments" : [{"commentTitle" : "Comment Title 1"}]};
    var article2 = {'title' : "Title 22"};
    
    var articles = [article1, article2];

    it('should be empty after init', function() {
        // New Memory Article Provider.
        articleProvider = new ArticleProvider();
        articleProvider.findAll(function(error, docs){
            expect(docs).toEqual([]);
        });
    });
    it("should have one element after saving one element", function() {
        articleProvider = new ArticleProvider();
        articleProvider.save(article1, function(error, docs) {
            expect(docs).toEqual([article1]);
            expect(article1._id).toEqual(1);
        }); 
        
        articleProvider.findAll(function(error, docs) {
            expect(docs).toEqual([article1]);
        });
    });
});