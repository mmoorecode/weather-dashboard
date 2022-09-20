#include "DHT.h"
#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin(); // initialize the sensor
}

void loop() {
  // wait a few seconds between measurements.
  delay(2000);

  // read humidity
  float humi  = dht.readHumidity();
  // read temperature as Celsius
  float tempC = dht.readTemperature();

  // Don't print to serial if any reads failed
  if (!isnan(humi) || !isnan(tempC)) {
    Serial.print(humi);
    Serial.print("|"); 
    Serial.print(tempC);
    Serial.println();
  }
}
