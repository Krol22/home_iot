#ifndef MULTICOLOR_H
#define MULTICOLOR_H

#include "animation.h"

struct Color {
  int r;
  int g;
  int b;
  int percentage;
};

class Multicolor : public Animation {
public:
  Multicolor();
  void start(Adafruit_NeoPixel* strip);
  void update(int frame, Adafruit_NeoPixel* strip);
  void stop(Adafruit_NeoPixel* strip);
  void loadData(FirebaseJson* data);

private:
  Adafruit_NeoPixel strip;
  int brightness = 50;
  uint32_t currentColor;
  std::vector<Color> colors;
};


#endif
