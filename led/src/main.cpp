#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

#include "led.h"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long dataMillis = 0;

Led* led;

void setup()
{
    Serial.begin(115200);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
    }
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();

    Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);
    
    /* Assign the database URL and database secret(required) */
    config.database_url = DATABASE_URL;
    config.signer.tokens.legacy_token = DATABASE_SECRET;

    Firebase.reconnectWiFi(true);

    /* Initialize the library with the Firebase authen and config */
    Firebase.begin(&config, &auth);
    
    // Initialize Led stripe
    led = new Led();
}

int on;
char* dataOutput;
int frame = 0;
int direction = 1;

void loop() {
    if (millis() - dataMillis > 500) {
        // dataMillis = millis();
        // std::string device_name = "/devices/";
        // device_name += FIREBASE_NAME;

        // FirebaseJson data;

        // Firebase.getJSON(fbdo, device_name);
        // data = fbdo.to<FirebaseJson>();
        // led->loadData(&data);
//
        // device_name += "/on";
//
        // Firebase.getInt(fbdo, device_name, &on);
    }


    if (millis() - dataMillis > 20) {
        // if (on) {
            Serial.print("on");
            led->update(frame);
        // } else {
            // Serial.print("off");
            // led->off();
        // }

        frame+=direction;

        if (frame > 60 || frame == 0) {
            direction = direction * -1;
        }
    }
}
