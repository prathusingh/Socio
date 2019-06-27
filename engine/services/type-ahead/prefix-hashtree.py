class PrefixHashTree:
    # Created to optimize the read in O(1) rather O(l) lookup time
    def __init__(self, trie_struct):
        self.trie = trie_struct
        self.storage = dict()

    def traverse_trie(self, node):
        if node is None:
            return
        self.storage[node] = node.child_list
        for node in node.child_list:
            traverse_trie(trie, node)

    def build_prefix_hash_tree(self):
