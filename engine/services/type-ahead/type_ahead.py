from build_trie import Storage


class TypeAhead:
    def __init__(data):
        self.data = data
        self.storage = Storage()

        pass

    def get_auto_complete_results(self, prefix):
        self.storage.prefix_storage.fetch_items_for_given_prefix(prefix)

    def sort_auto_complete_results(self, results_list):
        # TODO: Implement it
        pass

    def get_topmost_5_completions(self, prefix):
        auto_complete_results = self.get_auto_complete_results(prefix)
        return self.sort_auto_complete_results(auto_complete_results)


# data
data = ['cricket', 'diving', 'cooking', 'tutoring', 'skating']
type_ahead = TypeAhead(data)
type_ahead.get_topmost_5_completions('cri')
