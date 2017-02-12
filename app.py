from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html')
@app.route('/dtob')
def dtob():
	return render_template('dtob.html')
@app.route('/ThreeDPrinter')
def ThreeDPrinter():
	return render_template('3dprinter.html')
@app.route('/about')
def About():
	return render_template('about.html')
@app.route('/OrderForm')
def OrderForm():
	return render_template('orderform.html')

if __name__ == '__main__':
	app.debug = True
	app.run(host="0.0.0.0", port=8000, use_reloader=False)
