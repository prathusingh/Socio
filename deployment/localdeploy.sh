START_CLIENT() {
    TAB_NAME="client"
    DIR="/Users/prathu/Socio/Client"
    osascript \
        -e 'tell application "Terminal" to activate' \
        -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' \
        -e 'tell application "Terminal" to do script "cd /Users/prathu/Socio/Client;\
        npm run start-client;\
        echo -n -e \"\\033]0;Client\\007\"" in selected tab of the front window'
    }

START_SERVER() {
    osascript \
        -e 'tell application "Terminal" to activate' \
        -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' \
        -e 'tell application "Terminal" to do script "echo -n -e \"\\033]0;Server\\007\";\
        cd /Users/prathu/Socio/Server;\
        sudo npm run start-dev" in selected tab of the front window'
}

START_DB_SERVER() {
    osascript \
        -e 'tell application "Terminal" to activate' \
        -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' \
        -e 'tell application "Terminal" to do script "echo -n -e \"\\033]0;DB\\007\";\
        mongod" in selected tab of the front window'
}


KILL_EXISITING_PROCESS() {
    CLIENT_PORT=8081
    DB_PORT=
    kill -9 $(lsof -t -i:$1)
    kill -9 $(lsof -t -i:$2)
    kill -9 $(lsof -t -i:$3)

}

echo -n -e "\033]0;SOCIO\\007"

CLIENT_PORT=8081
DB_PORT=27017
SERVER_PORT=9229

KILL_EXISITING_PROCESS $CLIENT_PORT $DB_PORT $SERVER_PORT

# start client
START_CLIENT

# start db
START_DB_SERVER

# start server
START_SERVER
