from backend.Db import Db
from flask import request, render_template

def routes(app):
    db = Db(app)

    @app.route('/login')
    def api_login():
        return []
    
    @app.route('/register', methods = ['POST', 'GET'])
    def api_register():
        if request.method == 'GET':
            return render_template('register.html')
        elif request.method == 'POST':
            email = request.form['email']
            passw = request.form['pass']
            cursor = db.conex.connection.cursor()
            query = '''INSERT INTO usuarios (name, pass) VALUES (%s, %s)'''
            cursor.execute(query, (email, passw))
            db.conex.connection.commit()
            cursor.close()
            return { 'message': True }
