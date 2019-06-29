class PrefixHashTree:
    # Created to optimize the read in O(1) rather O(l) lookup time
    def __init__(self, root_node):
        self.storage = dict()
        self.root_node = root_node
        self.build_prefix_storage(self.root_node)

    # the disadvantage here is theat we are repeating items for different prefix
    # but would sacrifice it for O(1) time complexity

    def build_prefix_storage(self, node):
        if len(node.child_list) is 0:
            return
        self.storage[node.val] = [node.val for node in node.child_list]
        for node in node.child_list:
            self.build_prefix_storage(node)

    def fetch_items_for_given_prefix(self, prefix):
        return self.storage.get(prefix)
