import re
from nltk.corpus import stopwords


def clean_data(data):
    pattern = re.compile('\W+')
    spaces_removed_data = re.split(pattern, data)
    return [word for word in spaces_removed_data if word not in stopwords.words('english')]
