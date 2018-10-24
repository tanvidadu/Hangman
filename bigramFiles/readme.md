[English Letter Frequency Counts: Mayzner Revisited or ETAOIN SRHLDCU][norvig]
by Peter Norvig is an analysis of English letter frequencies using the Google
Corpus Data. Among other things it contains the frequency of all bigrams.

This gist contains a program that extracts those bigram frequencies into a
easily usable JSON format.

It also contains the result of running that program (bigrams.json), as well as a
version of it where the order of the letters of a bigram is not taken into
account (pairs.json). The two JSON files were generated from a copy of the above
article retrieved 2015-08-23.

To regenerate the JSON files:

    $ curl http://norvig.com/mayzner.html >article.html
    $ npm install
    $ node extract <article.html >bigrams.json
    $ node bigrams-to-pairs <bigrams.json >pairs.json

All of the files are in the public domain.

[norvig]: http://norvig.com/mayzner.html
