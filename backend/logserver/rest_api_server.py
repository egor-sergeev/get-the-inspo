from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
import uuid
import datetime
from data_provider import DataProvider

app = Flask(__name__)
api = Api(app)
# TODO Authentication of Graphica's web client (instead of '*')
cors = CORS(app, resources={r'/log*': {'origins': '*'}})

# client = Client(host='localhost')


class Log(Resource):
    data_provider = DataProvider()

    def post(self):
        parser = reqparse.RequestParser()
        for field in self.data_provider.log_fields:
            parser.add_argument(field)
        try:
            params = parser.parse_args()
        except TypeError:
            response = {'error': 'Cannot parse POST request.'}
            return response, 415

        # print('POST at ', datetime.datetime.now().strftime('%H:%M:%S'))

        data = {
            'user_id': str(uuid.UUID(params['user_id'])),
            'object_type_id': int(params['object_type_id']),
            'object_type': str(params['object_type']),
            'object_id': str(uuid.UUID(params['object_id'])),
            'action_type_id': int(params['action_type_id']),
            'action_type': str(params['action_type']),
            'timestamp': int(params['timestamp']) // 1000  # Cast milliseconds timestamp to seconds
        }

        self.data_provider.insert(data)

        return data, 201


api.add_resource(Log, '/log', '/log/')

if __name__ == '__main__':
    Log.data_provider.run_insertion_flag = True

    app.run(debug=True)
