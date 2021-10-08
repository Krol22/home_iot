#include <Adafruit_NeoPixel.h>
#include <FirebaseESP8266.h>
#include <string>

#include "multicolor.h"

#ifdef SKIP_LED
  #define START_LED 28
#else
  #define START_LED 0
#endif

// #TODO:  move to some utils or other stuff
uint32_t getCorrectColor2(
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

Color interpolate(int color1, int color2, float fraction)
{
  Serial.println(fraction);

  unsigned char r1 = (color1 >> 16) & 0xff;
  unsigned char r2 = (color2 >> 16) & 0xff;
  unsigned char g1 = (color1 >> 8) & 0xff;
  unsigned char g2 = (color2 >> 8) & 0xff;
  unsigned char b1 = color1 & 0xff;
  unsigned char b2 = color2 & 0xff;

  int r = (int) ((r2 - r1) * fraction + r1); 
  int g = (int) ((g2 - g1) * fraction + g1); 
  int b = (int) ((b2 - b1) * fraction + b1); 

  return { r, g, b, 0 };
}


Multicolor::Multicolor() {};

void Multicolor::start(Adafruit_NeoPixel* strip) {
  for (int i = START_LED; i < LED_COUNT; i+=1) {
    strip->setPixelColor(i, getCorrectColor2(strip, 125, 0, 125, 0));
  }

  strip->show();
};

void Multicolor::update(int frame, Adafruit_NeoPixel* strip) {
  int interval = 10 / colors.size();
  int index = frame / interval;

  Color currentColor = interpolate(0x00770077, 0x00770011, (frame / 60.0));

  Serial.println(currentColor.r);
  Serial.println(currentColor.g);
  Serial.println(currentColor.b);
  for (int i = START_LED; i < LED_COUNT; i+=1) {
    strip->setPixelColor(i, getCorrectColor2(strip, currentColor.r, currentColor.g, currentColor.b, 0));
  }
  strip->setBrightness(brightness);
  strip->show();
};

void Multicolor::stop(Adafruit_NeoPixel* strip) {
  for (int i = START_LED; i < LED_COUNT; i+=1) {
    strip->setPixelColor(i, getCorrectColor2(strip, 0, 0, 0, 0));
  }

  strip->show();
};

void Multicolor::loadData(FirebaseJson* data) {
  FirebaseJsonData result; 
  FirebaseJsonArray dataArray;

  data->get(result, "animation/colors");
  result.getArray(dataArray);
  colors.clear();

  for (size_t i = 0; i < dataArray.size(); i++) {
    dataArray.get(result, i);

    FirebaseJson colorData;
    result.getJSON(colorData);

    colorData.get(result, "r");
    int r = result.to<int>();

    colorData.get(result, "g");
    int g = result.to<int>();

    colorData.get(result, "b");
    int b = result.to<int>();

    colorData.get(result, "percentage");
    int percentage = result.to<int>();

    Color color = {
      r, g, b, percentage
    };

    colors.push_back(color);
  }
}
