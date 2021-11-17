#include <ESP8266WiFi.h>

#define TERMOMETER_PIN A0

void setup() 
{
  Serial.begin(115200);

  /*
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
  */
}

int adcValue = 0;

void loop() {
  adcValue = analogRead(TERMOMETER_PIN);
  Serial.println(adcValue);
  Serial.println(((adcValue ) / 1024.0) * 100);

  delay(1000);
}


