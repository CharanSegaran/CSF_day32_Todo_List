drop database if exists userTodoList;

create database userTodoList;

use userTodoList;

create table images (
    `username` varchar(32) not null,
    `pic_id` char(8) not null,
    `content` longblob not null,
    `image_type` char(3) not null,
    `last_update` datetime default current_timestamp on update current_timestamp,

    constraint primary key(username) 

);

insert into images(username,pic_id,content,image_type);