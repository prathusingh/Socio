class Node():
    def __init__(self, val):
        self.val = val
        self.child_list = []


class BuildTrie():
    def __init__(self):
        self.root = Node('root')

    @staticmethod
    def getPrefix(node_list, prefix_node):
        for node in node_list:
            if node.val == prefix_node.name:
                return node

        return None

    def build_trie(self, data_list):
        for item in data_list:
            self.insert_item(item)

    def insert_item(self, item):
        current_node = self.root
        prefix = ''

        for char in list(item):
            node_to_insert = Node(prefix + char)
            prefix_found = getPrefix(current_node.child_list, node_to_insert)
            if prefix_found is None:
                # add prefix node
                current_node.child_list.append(node_to_insert)
            else:
                current_node = prefix_found
