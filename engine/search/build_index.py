import re
from nltk.corpus import stopwords


class BuildIndex:

    def __init__(self, files):
        self.filenames = files
        self.file_to_tokens = self.process_files()
        for key in self.file_to_tokens:
            print(self.file_to_tokens[key])

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
