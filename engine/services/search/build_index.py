import re
import data_cleaner
from nltk.corpus import stopwords


class BuildIndex:

    def __init__(self, files):
        self.filenames = files
        self.file_to_tokens = self.process_files()

    def process_files(self):
        file_to_tokens = {}
        for file in self.filenames:
            file_to_tokens[file] = open('./sample-corpus/'+file, "r").read().lower()
            file_to_tokens[file] = data_cleaner.clean_data(file_to_tokens[file])
        return file_to_tokens

    # input = [word1, word2 .....]
    # output = {word1: [pos1, pos2], word2: [pos6, pos46]......}
    @staticmethod
    def index_one_file(tokens):
        file_index = {}
        for index, token in enumerate(tokens):
            if token in file_index.keys():
                file_index[token].append(index)
            else:
                file_index[token] = [index]
        return file_index

    # input = {filename: [word1, word2...]}
    # output = {filename: {word1: [pos1,pos2]}, ....}
    def make_indices(self, file_to_tokens):
        document_mapper = {}
        for file in file_to_tokens:
            document_mapper[file] = BuildIndex.index_one_file(self.file_to_tokens[file])
        return document_mapper

    # input = {filename: {word: [pos1, pos2]}, word2: [pos5, pos8]}, filename2:.....}
    # output = {word: {filename:[pos1, pos2..]..}}
    def build_index(self, doc_map):
        inverted_index = {}

        for filename in doc_map:
            words_pos_map = doc_map[filename]
            for word in words_pos_map:
                if word in inverted_index.keys():
                    existing_map = inverted_index[word]
                    existing_map[filename] = words_pos_map[word]
                    inverted_index[word] = existing_map
                else:
                    inverted_index[word] = {filename: words_pos_map[word]}

        return inverted_index

    def build_inverted_index(self, file_tokens):
        return self.build_index(self.make_indices(file_tokens))

