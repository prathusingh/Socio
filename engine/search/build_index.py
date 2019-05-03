import re
from nltk.corpus import stopwords


class BuildIndex:

    def __init__(self, files):
        self.filenames = files
        self.file_to_tokens = self.process_files()
        self.make_indices(self.file_to_tokens)

    def process_files(self):
        file_to_tokens = {}
        for file in self.filenames:
            pattern = re.compile('[\W_]+')
            file_to_tokens[file] = open('./sample-corpus/'+file, "r").read().lower()
            file_to_tokens[file] = pattern.sub(' ', file_to_tokens[file])
            re.sub(r'[\W_]+', '', file_to_tokens[file])
            file_to_tokens[file] = file_to_tokens[file].split()
            file_to_tokens[file] = [word for word in file_to_tokens[file] if word not in stopwords.words('english')]

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

    def make_indices(self, file_to_tokens):
        for file in file_to_tokens:
            print (BuildIndex.index_one_file(self.file_to_tokens[file]))



