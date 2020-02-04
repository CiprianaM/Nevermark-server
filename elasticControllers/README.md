# ElasticSearch Folder architecture and explanation

The folder "elasticControllers" contains all the scripts used for generating, indexing and searching the ElasticSearch.

The structure of the folder is the following:

1. setup - this folder contains:
  a. ElasticClass - a class made to emulate (or build a facade) for the native ElasticSearch methods.
  b. all the other script are individual methods which can help you create, delete, reindex etc.

2. queries - here you will find a set of individual queries examples, which are later on used in other scripts, in order to make the code more modular.

3. utils - helper functions. The buildQuery function wraps around various queries and helps you change the parameters of the actual query with very short code in the controller scripts.

4. all the controller scripts.
  a.addOne - checks if element already exists (has the same userId and the same url) and if not, it adds a new document to ES. If it exists, it updates the found element with a new visit (by pushing into the 'log' array field).
  b. searchAll - returns all documents in the index. The object received from ElasticSearch is edited so that the userId is not sent back in the response body
  c. searchMultiple - returns all documents in the index where matches are being returned for the searched string. The result will be returned if at least one word (or a part of the word) will be found in the index. For example, typing "jav" will yield any results where "java" or "javascript" are found.
  d. search - calls searchAll or searchMultiple, depending on whether there has been any received searched text.
  e. searchDomain - returns all the documents where the selected domain is found, for a specific user.
  f. deleteDomain - deletes and blocks any further insertion of records for a specific domain for that specific user.
  g. deleteByQuery - deletes a specific url for that specific user.

# Important

Mappings - if you don't define any custom mappings, ES will do it for you, based on the first document you index. Therefore, the way you pass the data will determine how ES interprets your data and how you can work with it.

For example: passing fields as a string will make ES index those fields as type 'text'which will allow you to search by those fields, but not sort by them.

To the contrary, passing fields as a number will mean you cannot perform searches on those fields, but you can sort and perform aggregations.

If you make a mistake, mappings cannot be changed after you've already indexed data to your index, but you can create a new index, set the mappings (with putMappings) and then reindex your data.



