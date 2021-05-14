# Recursive RM

A script that does exactly the same as `find . -name "<regex pattern here>" -exec rm {} \;` which deletes files but not folders...
and also does something similar to `find . -name "<regex pattern here>" -delete` to delete both files and folders.

Why did I make this? No valid reason other than experimenting with Deno's install and compile script, along with the permission thingy.
