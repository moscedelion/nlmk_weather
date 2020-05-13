from os import getenv

def get_db_adress():
  db_vendor = getenv('DB_VENDOR')
  adress = getenv('DATABASE_LOCATION')
  database = getenv('POSTGRES_DB')
  user = getenv('POSTGRES_USER')
  password = getenv('POSTGRES_PASSWORD')
  db_port = getenv('DB_PORT')
  db_adress = f'{db_vendor}://{user}:{password}@{adress}:{db_port}/{database}'
  return db_adress 

class Config(object):
    DEBUG = True 
    TESTING = False
    SQLALCHEMY_DATABASE_URI = get_db_adress()
