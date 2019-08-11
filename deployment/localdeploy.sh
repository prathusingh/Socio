START_CLIENT() {
    TAB_NAME="client"
    DIR="/Users/prathu/Socio/Client"
    osascript \
        -e 'tell application "Terminal" to activate' \
        -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' \
        -e 'tell application "Terminal" to do script "cd '$1';\
        npm run start-client;\
        echo -n -e \"\\033]0;'"$2"'\\007\"" in selected tab of the front window'
}

START_DB_SERVER() {
    osascript \
        -e 'tell application "Terminal" to activate' \
        -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' \
        -e 'tell application "Terminal" to do script "echo -n -e \"\\033]0;'$1'\\007\";\
        mongod" in selected tab of the front window'
}

START_SERVER() {
    osascript \
        -e 'tell application "Terminal" to activate' \
        -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' \
        -e 'tell application "Terminal" to do script "echo -n -e \"\\033]0;'$2'\\007\";\
        cd '$1';\
        sudo npm run start-dev" in selected tab of the front window'
}


KILL_EXISITING_PROCESS() {
    kill -9 $(lsof -t -i:$1)
    kill -9 $(lsof -t -i:$2)
    kill -9 $(lsof -t -i:$3)
}

APP="SOCIO"

echo -n -e "\033]0;$APP\\007"

CLIENT_PORT=8081
DB_PORT=27017
SERVER_PORT=9229

KILL_EXISITING_PROCESS $CLIENT_PORT $DB_PORT $SERVER_PORT

CLIENT_LOC="/Users/prathu/Socio/Client"
SERVER_LOC="/Users/prathu/Socio/Server"

CLIENT_TAB_NAME="CLIENT"
SERVER_TAB_NAME="SERVER"
DB_TAB_NAME="DB"

# start client
START_CLIENT $CLIENT_LOC $CLIENT_TAB_NAME

# start db
START_DB_SERVER $DB_TAB_NAME

# start server
START_SERVER $SERVER_LOC $SERVER_TAB_NAME