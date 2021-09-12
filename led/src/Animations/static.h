#ifndef STATIC_H
#define STATIC_H

#include <Adafruit_NeoPixel.h>
#include <FirebaseESP8266.h>
#include "animation.h"

class Static : public Animation {
public:
  Static();
  void start(Adafruit_NeoPixel* strip);
  void update(int frame, Adafruit_NeoPixel* strip);
  void stop(Adafruit_NeoPixel* strip);
  void loadData(FirebaseJson* data);

private:
  Adafruit_NeoPixel strip;
  int brightness;
  int red, green, blue, white;
  uint32_t currentColor;
};

#endif
