import requests
import re
from clickhouse_driver import Client


class DataProvider:
    db_client = Client(host='localhost', port=8124)
    log_fields = ['user_id',
                  'object_type_id',
                  'object_type',
                  'object_id',
                  'action_type_id',
                  'action_type',
                  'timestamp']

    def insert(self, data):
        # Cast data to string for inserting into Clickhouse DB via python driver:
        str_value = re.sub(r'\'\w*\': ', '', str(data))
        str_value = re.sub(r'[{}]', '', str_value)

        str_value = 'insert into logs.user_actions values ({})\n'.format(str_value)

        requests.post('http://127.0.0.1:8124', data=str_value)

        # self.db_client.execute(sql_str + '({})'.format(str_value))
