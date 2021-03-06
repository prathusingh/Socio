import re
import build_index
import data_cleaner


class Query:

    def __init__(self, filenames):
        self.filenames = filenames
        self.index = build_index.BuildIndex(self.filenames)
        self.inverted_index = self.index.build_inverted_index(self.index.file_to_tokens)

    @staticmethod
    def query_one_word(word, inverted_index):
        if word in inverted_index.keys():
            return [filename for filename in inverted_index[word].keys()]
        else:
            return []

    def sans_query(self, query):
        cleaned_query = data_cleaner.clean_data(query)
        documents_list = []

        for query_word in cleaned_query:
            documents_list += Query.query_one_word(query_word, self.inverted_index)
        return list(set(documents_list))

    def phrase_query(string, invertedIndex):
        pattern = re.compile('[\W_]+')
        string = pattern.sub(' ', string)
        listOfLists, result = [], []
        for word in string.split():
            listOfLists.append(one_word_query(word))
        setted = set(listOfLists[0]).intersection(*listOfLists)
        for filename in setted:
            temp = []
            for word in string.split():
                temp.append(invertedIndex[word][filename][:])
            for i in range(len(temp)):
                for ind in range(len(temp[i])):
                    temp[i][ind] -= i
            if set(temp[0]).intersection(*temp):
                result.append(filename)
        return rankResults(result, string)


query = Query(['pg11.txt', 'pg74.txt'])
