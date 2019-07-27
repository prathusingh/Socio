from build_trie import Storage


class TypeAhead:
    def __init__(self, data):
        self.storage = Storage(data)

    def get_auto_complete_results(self, prefix):
        return self.storage.prefix_storage.fetch_items_for_given_prefix(prefix)

    def sort_auto_complete_results(self, results_list):
        # TODO: Implement it
        pass

    def get_topmost_5_completions(self, prefix):
        auto_complete_results = self.get_auto_complete_results(prefix)
        return auto_complete_results
        # return self.sort_auto_complete_results(auto_complete_results)


# data
data = ['drawing', 'diving']
type_ahead = TypeAhead(data)
print(type_ahead.get_topmost_5_completions('d'))
