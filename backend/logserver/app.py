from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
import uuid
import time
import datetime


def str_to_timestamp(str_datetime):
    dt = datetime.datetime.strptime(str_datetime, "%d/%m/%Y")
    timestamp = datetime.datetime.timestamp(dt)
    return timestamp


app = Flask(__name__)
api = Api(app)
# TODO Authentication of Graphica's web client (instead of '*')
cors = CORS(app, resources={r'/log*': {'origins': '*'}})

logs_amount = 0


class Log(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        # parser.add_argument('event_type')
        # parser.add_argument('image_id')
        parser.add_argument('user_id')
        parser.add_argument('object_type_id')
        parser.add_argument('object_type')
        parser.add_argument('object_id')
        parser.add_argument('action_type_id')
        parser.add_argument('action_type')
        parser.add_argument('timestamp')
        params = parser.parse_args()

        # try:
        #     params = parser.parse_args()
        # except:
        #     print('ERROR: Cannot parse request data.')

        global logs_amount
        logs_amount += 1

        print(type(params['user_id']), ': ', params['user_id'])
        print(type(params['object_type_id']), ': ', params['object_type_id'])
        print(type(params['object_type']), ': ', params['object_type'])
        print(type(params['object_id']), ': ', params['object_id'])
        print(type(params['action_type_id']), ': ', params['action_type_id'])
        print(type(params['action_type']), ': ', params['action_type'])
        print(type(params['timestamp']), ': ', params['timestamp'])

        log = {
            'user_id': uuid.UUID(params['user_id']).hex,
            'object_type_id': int(params['object_type_id']),
            'object_type': str(params['object_type']),
            'object_id': uuid.UUID(params['object_id']).hex,
            'action_type_id': int(params['action_type_id']),
            'action_type': str(params['action_type']),
            'timestamp': int(params['timestamp'])

            # 'id': logs_amount,
            # 'event_type': int(params['event_type']),
            # 'image_id': int(params['image_id'])
        }

        # TODO Save log to DB
        print(log)

        return log, 201


api.add_resource(Log, '/log', '/log/')

if __name__ == '__main__':
    app.run(debug=True)
