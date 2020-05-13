from flask import Flask, jsonify, request
from config import Config
from models import Weather, db

app = Flask(__name__)
app.config.from_object(Config())
db.init_app(app)

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

