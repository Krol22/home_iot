#include <Adafruit_NeoPixel.h>
#include "Animations/static.h"
#include "led.h"

#define LED_PIN 12

Adafruit_NeoPixel strip = Adafruit_NeoPixel(202, 12, NEO_GRB + NEO_KHZ800);

Led::Led() {
  strip.begin();
  strip.setBrightness(125);
  currentAnimation = new Static();
  currentAnimationName = "";
};

void Led::update(int frame) {
  currentAnimation->update(frame, &strip);
};

void Led::on() {
  currentAnimation->start(&strip);
};

void Led::off() {
  currentAnimation->stop(&strip);
};

void Led::loadData(FirebaseJson* data) {
  FirebaseJsonData result;
  data->get(result, "current_animation");

  String newAnimation = result.to<String>();
  if (newAnimation != currentAnimationName) {
    currentAnimation = new Static();
    currentAnimationName = newAnimation;
  }

  currentAnimation->loadData(data);
}
