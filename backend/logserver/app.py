from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
api = Api(app)
# TODO Authentication of Graphica's web client (instead of '*')
cors = CORS(app, resources={r'/log*': {'origins': '*'}})


class Log(Resource):
    log_id = 0

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('event_type')
        parser.add_argument('image_id')
        params = parser.parse_args()

        self.log_id += 1

        log = {
            'id': self.log_id,
            'event_type': int(params['event_type']),
            'image_id': int(params['image_id'])
            # TODO Log timestamp
        }

        # TODO Save log to DB
        print(log)

        return log, 201


api.add_resource(Log, '/log', '/log/')

if __name__ == '__main__':
    app.run(debug=True)
