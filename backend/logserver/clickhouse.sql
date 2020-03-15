drop table if exists logs.user_actions;
drop database if exists logs;

create database if not exists logs;

create table if not exists logs.user_actions
(
    user_id        UUID,
    object_type_id UInt8,
    object_type    String,
    object_id      UUID,
    action_type_id UInt8,
    action_type    String,
    "timestamp"    UInt64
)
ENGINE = MergeTree()
ORDER BY (user_id, timestamp);

select *
from logs.user_actions;