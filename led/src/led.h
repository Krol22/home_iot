#ifndef LED_H
#define LED_H

#include <FirebaseESP8266.h>
#include "Animations/animation.h"

class Led {
public:
  Led();
  void update(int frame);
  void on();
  void off();
  void loadData(FirebaseJson *data);

private:
  String currentAnimationName;
  Animation* currentAnimation;
  Animation* nextAnimation;
};

#endif
