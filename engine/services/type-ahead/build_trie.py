from prefix_hashtree import PrefixHashTree


class Node():
    def __init__(self, val):
        self.val = val
        self.child_list = []


class Storage():
    def __init__(self, data):
        self.root = Node('root')
        self.build_trie(data)
        self.prefix_storage = PrefixHashTree(self.root)

    @staticmethod
    def getPrefix(node_list, prefix_node):
        for node in node_list:
            if node.val == prefix_node.val:
                return node

        return None

    def build_trie(self, data_list):
        for item in data_list:
            self.insert_item(item)

    def insert_item(self, item):
        current_node = self.root
        prefix = ''

        for char in list(item):
            prefix = prefix + char
            node_to_insert = Node(prefix)
            prefix_found = Storage.getPrefix(
                current_node.child_list, node_to_insert)
            if prefix_found is None:
                # add prefix node
                current_node.child_list.append(node_to_insert)
                current_node = node_to_insert
            else:
                current_node = prefix_found
