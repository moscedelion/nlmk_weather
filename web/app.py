from flask import Flask, jsonify, request
from config import Config
from models import Weather, db
from datetime import datetime

app = Flask(__name__)
app.config.from_object(Config())
db.init_app(app)

@app.route('/')
def main():
  start_arg = request.args.get('start_date')
  if start_arg:
    start_day, start_month, start_year = [ int(x) for x in start_arg.split('/')]
    start_date = datetime(start_year, start_month, start_day)
 
  end_arg = request.args.get('end_date')
  if end_arg:
    end_day, end_month, end_year = [int(x) for x in end_arg.split('/')]
    end_date = datetime(end_year, end_month, end_day)

  if start_arg and end_arg:
    query = Weather.query.order_by(Weather.date).filter(Weather.date >= start_date, Weather.date <= end_date) 
  elif start_arg:
    query = Weather.query.order_by(Weather.date).filter(Weather.date >= start_date) 
  elif end_arg: 
    query = Weather.query.order_by(Weather.date).filter(Weather.date <= end_date) 
  else:
    query = Weather.query.order_by(Weather.date).all() 
  return jsonify(json_list = [row.serialize for row in query])

