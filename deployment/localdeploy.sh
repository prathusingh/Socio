START_CLIENT() {
    TAB_NAME="client"
    osascript \
        -e 'tell application "Terminal" to activate' \
        -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' \
        -e 'tell application "Terminal" to do script "echo -n -e \"\\033]0;Client\\007\"" in selected tab of the front window'
    }

START_SERVER() {
    osascript \
        -e 'tell application "Terminal" to activate' \
        -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' \
        -e 'tell application "Terminal" to do script "echo -n -e \"\\033]0;Server\\007\"" in selected tab of the front window'
}

START_DB_SERVER() {
    osascript \
        -e 'tell application "Terminal" to activate' \
        -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' \
        -e 'tell application "Terminal" to do script "echo -n -e \"\\033]0;DB\\007\"" in selected tab of the front window'
}


# start client
START_CLIENT

# start server
START_SERVER

# start db
START_DB_SERVER
