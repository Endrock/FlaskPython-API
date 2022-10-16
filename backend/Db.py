from flask_mysqldb import MySQL

class Db:
    def __init__(self, App):
        App.config['MYSQL_HOST'] = 'localhost'
        App.config['MYSQL_USER'] = 'root'
        App.config['MYSQL_PASSWORD'] = ''
        App.config['MYSQL_DB'] = 'flasktest'
        self.conex = MySQL(App)