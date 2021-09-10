#ifndef ANIMATION_H
#define ANIMATION_H

#include <string>
#include <Adafruit_NeoPixel.h>
#include <FirebaseESP8266.h>

class Animation {
public:
  virtual void update(int frame, Adafruit_NeoPixel* strip) = 0;
  virtual void start(Adafruit_NeoPixel* strip) = 0;
  virtual void stop(Adafruit_NeoPixel* strip) = 0;
  virtual void loadData(FirebaseJson* data) = 0;

  int getEndDelay() {
    return endDelay;
  }

  int getStartDelay() {
    return startDelay;
  }

protected:
  int endDelay = 1000;
  int startDelay = 1000;

  // TODO: enum
  // Possible Animation states: OFF, ON, STARTING, STOPPING,
  std::string state = "OFF";
};

#endif
