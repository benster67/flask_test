from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html')
@app.route('/dtob')
def dtob():
	return render_template('dtob.html')
@app.route('/3Dprinter')
def ThreeDprinter():
	return render_template('3dprinter.html')

if __name__ == '__main__':
	app.debug = True
	app.run(host="0.0.0.0", port=8000, use_reloader=False)
