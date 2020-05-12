from os import getenv
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy 

def get_db_adress():
  db_vendor = getenv('DB_VENDOR')
  adress = getenv('DATABASE_LOCATION')
  database = getenv('POSTGRES_DB')
  user = getenv('POSTGRES_USER')
  password = getenv('POSTGRES_PASSWORD')
  db_port = getenv('DB_PORT')
  db_adress = f'{db_vendor}://{user}:{password}@{adress}:{db_port}/{database}'
  return db_adress 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = get_db_adress()
db = SQLAlchemy(app)

class Weather(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  temperature = db.Column(db.Integer)
  pressure = db.Column(db.Integer)
  humidity = db.Column(db.Integer)
  date = db.Column(db.String(80), nullable=False)

  @property
  def serialize(self):
    return {
      'temperature': self.temperature,
      'pressure': self.pressure,
      'humidity': self.humidity,
      'date': self.date
    }

@app.route('/')
def main():
  date = request.args.get('start_date').split('/')
  date[0], date[1] = date[1], date[0]
  start_date = '/'.join(date)

  date = request.args.get('end_date').split('/')
  date[0], date[1] = date[1], date[0]
  end_date = '/'.join(date)
  if start_date and end_date:
    query = Weather.query.order_by(Weather.date).filter(Weather.date >= start_date, Weather.date <= end_date) 
  elif start_date:
    query = Weather.query.order_by(Weather.date).filter(Weather.date >= start_date) 
  elif end_date: 
    query = Weather.query.order_by(Weather.date).filter(Weather.date <= end_date) 
  else:
    query = Weather.query.order_by(Weather.date).all() 
  return jsonify(json_list = [row.serialize for row in query])

if __name__ == '__main__':
  app.run(host='0.0.0.0')
