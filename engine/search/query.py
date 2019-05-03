import build_index


class Query:

    def __init__(self, filenames):
        self.filenames = filenames
        self.index = build_index.BuildIndex(self.filenames)


query = Query(['pg11.txt', 'pg74.txt'])
