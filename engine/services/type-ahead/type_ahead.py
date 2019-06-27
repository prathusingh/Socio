from build_trie import Storage


class TypeAhead:
    def __init__(data):
        self.data = data
        self.storage = Storage()

        pass

    def get_auto_complete_results(self, prefix):
        self.storage.prefix_storage.fetch_items_for_given_prefix(prefix)


# data
data = ['cricket', 'diving', 'cooking', 'tutoring', 'skating']
type_ahead = TypeAhead(data)
type_ahead.get_auto_complete_results('cri')
