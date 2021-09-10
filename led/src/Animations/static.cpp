#include <Adafruit_NeoPixel.h>
#include <FirebaseESP8266.h>
#include <string>

#include "static.h"

#ifdef SKIP_LED
  #define START_LED 28
#else
  #define START_LED 0
#endif

Static::Static() {};

void Static::start(Adafruit_NeoPixel* strip) {
  for (int i = START_LED; i < LED_COUNT; i+=1) {
    strip->setPixelColor(i, strip->Color(125, 0, 125));
  }

  strip->show();
};

void Static::update(int frame, Adafruit_NeoPixel* strip) {
  for (int i = START_LED; i < LED_COUNT; i+=1) {
    strip->setPixelColor(i, strip->Color(red, green, blue));
  }

  strip->setBrightness(brightness);
  strip->show();
};

void Static::stop(Adafruit_NeoPixel* strip) {
  for (int i = START_LED; i < LED_COUNT; i+=1) {
    strip->setPixelColor(i, strip->Color(0, 0, 0));
  }

  strip->show();
};

void Static::loadData(FirebaseJson* data) {
  FirebaseJsonData result; 

  data->get(result, "animation/brightness");
  brightness = result.to<int>();

  data->get(result, "animation/color/r");
  red = result.to<int>();

  data->get(result, "animation/color/g");
  green = result.to<int>();

  data->get(result, "animation/color/b");
  blue = result.to<int>();

  Serial.print(red);
  Serial.print(green);
  Serial.print(blue);
}

