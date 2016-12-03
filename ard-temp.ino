#include <SoftwareSerial.h>
#include <stdio.h>
#include <math.h>

SoftwareSerial ESPport(10, 11);
////////////////////// RX, TX

float tempC;
int reading;
int tempPin = 0;

void setup()
{
  analogReference(INTERNAL);
  Serial.begin(115200); // Терминал
  ESPport.begin(115200); // ESP8266
}

void loop()
{
    float t = 0;
    for (int i = 0; i <= 7; i++) {
      reading = analogRead(tempPin);
      t += reading / 9.31;
      delay(100);
    }
    tempC = t/8;
    delay(1000);

    Serial.println(tempC);
    ESPport.print("r");
    ESPport.print(tempC);
}
