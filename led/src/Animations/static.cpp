#include <Adafruit_NeoPixel.h>
#include <FirebaseESP8266.h>
#include <string>

#include "static.h"

#ifdef SKIP_LED
  #define START_LED 28
#else
  #define START_LED 0
#endif

uint32_t getCorrectColor(
  Adafruit_NeoPixel* strip,
  int red,
  int green,
  int blue,
  int white
) {
#ifdef GRBW
  return strip->Color(red, green, blue, white);
#else
  return strip->Color(red, green, blue);
#endif
}

Static::Static() {
  red = 0;
  green = 0;
  blue = 0;
  white = 0;
};

void Static::start(Adafruit_NeoPixel* strip) {
  for (int i = START_LED; i < LED_COUNT; i+=1) {
    strip->setPixelColor(i, getCorrectColor(strip, 125, 0, 125, 0));
  }

  strip->show();
};

void Static::update(int frame, Adafruit_NeoPixel* strip) {
  for (int i = START_LED; i < LED_COUNT; i+=1) {
    strip->setPixelColor(i, getCorrectColor(strip, red, green, blue, white));
  }

  strip->setBrightness(brightness);
  strip->show();
};

void Static::stop(Adafruit_NeoPixel* strip) {
  for (int i = START_LED; i < LED_COUNT; i+=1) {
    strip->setPixelColor(i, getCorrectColor(strip, 0, 0, 0, 0));
  }

  strip->show();
};

#ifdef GRBW

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

  // data->get(result, "animation/color/w");
  // white = result.to<int>();
}

#else

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
}

#endif
