const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');
const { log } = require('console');

//서버생성
const app = express();
const PORT =process.env.PORT || 3000
app.use( cors() );
app.use(bodyParser.json());

//mysql 서버 연결 naver, 127.0.0.1, root, 1234
const db = mysql2.createConnection({
    database : 'naver',
    host : '127.0.0.1',
    user : 'root',
    password : '1234',
    port : '3306',
});

db.connect( ( err ) => {
    if ( !err ) {
        console.log('mySql 연결 성공!!!!!');
        var dt = new Date();
        console.log( dt.toLocaleDateString() );
        console.log( dt.toLocaleTimeString() );
    } else {
        console.log('mySql 연결 실패!!!!!');
    }
})

app.listen(PORT, ()=>{
    console.log(`웹브라우저실행 http://localhost:${PORT}`);

});

//전체출력 t_board테이블 app.get('/매핑' (req, res)=>{ 쿼리문기술 });
app.get('/list.do', ( req, res)=>{
    console.log("/list.do test");

    const msg = "select * from t_board order by id";
    console.log("msg : ", msg);

    db.query( msg, ( err, data ) => {
        if ( !err ) {
            res.send(data);
        } else {
            console.log("조회 실패")
        }
    });
});

//1건등록입력 insert into t_board(title, content, name) values( '${}', '${}', '${}' );
app.get('/insert.do', ( req, res)=>{
    console.log("/insert.do test");

    const title = "winder";
    const content = "snow";
    const name = "lee";
    const msg = `insert into t_board(title, content, name) values( '${title}', '${content}', '${name}' );`;
    console.log("msg : ", msg);

    db.query( msg, ( err, data ) => {
        if ( !err ) {
            res.send(data);
        } else {
            console.log("1건 저장 실패")
        }
    });
});

//1건 출력 t_board테이블 app.get('/매핑' (req, res)=>{ 쿼리문기술 });
app.get('/detal.do/:id', ( req, res)=>{
    const my = req.params.id;
    const msg = `select * from t_board where id = ${my}`;
    console.log("msg : ", msg);

    db.query( msg, ( err, data ) => {
        if ( !err ) {
            res.send(data);
        } else {
            console.log("조회 실패")
        }
    });
});

//1건삭제 t_board테이블 app.get('/매핑' (req, res)=>{ 쿼리문기술 });
app.get('/delete.do/:id', ( req, res)=>{
    const my = req.params.id;
    const msg = `delete from t_board where id = ${my}`;
    console.log("msg : ", msg);

    db.query( msg, ( err, data ) => {
        if ( !err ) {
            res.send(data);
        } else {
            console.log("삭제 실패")
        }
    });
});

//1건수정 t_board테이블 app.get('/매핑' (req, res)=>{ 쿼리문기술 });
app.get('/update.do/:id', ( req, res)=>{
    const my = req.params.id;
    const title = 'AA';
    const content = 'BB';
    const name = 'CC';
    const msg = `update t_board set title = '${title}', content = '${content}', name ='${name}' where id = ${my}`;
    console.log("msg : ", msg);

    db.query( msg, ( err, data ) => {
        if ( !err ) {
            res.send(data);
        } else {
            console.log("수정 실패")
        }
    });
});