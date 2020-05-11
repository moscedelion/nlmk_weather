from os import getenv
from flask import Flask, jsonify
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
        query = Weather.query.all() 
        return jsonify(json_list = [row.serialize for row in query])

if __name__ == '__main__':
        app.run(host='0.0.0.0')
