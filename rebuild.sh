plugman uninstall --platform android --project . --plugin com.phonegap.plugins.speech

plugman install --platform android --project . --plugin https://github.com/poiuytrez/SpeechRecognizer

./cordova/clean
./cordova/build
./cordova/run
