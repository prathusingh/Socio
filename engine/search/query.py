import build_index
import re


class Query:

    def __init__(self, filenames):
        self.filenames = filenames
        self.index = build_index.BuildIndex(self.filenames)
        self.inverted_index = self.index.build_inverted_index(self.index.file_to_tokens)
        print(self.inverted_index)


query = Query(['pg11.txt', 'pg74.txt'])
