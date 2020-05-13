from os import getenv
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Weather(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  temperature = db.Column(db.Integer)
  pressure = db.Column(db.Integer)
  humidity = db.Column(db.Integer)
  date = db.Column(db.DateTime, nullable=False)

  @property
  def serialize(self):
    return {
      'temperature': self.temperature,
      'pressure': self.pressure,
      'humidity': self.humidity,
      'date': self.date.strftime('%Y-%m-%d')
    }


