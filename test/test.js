var assert = require('assert');
var request = require('supertest');

var api = request('http://localhost:3000/api/donors');
var id;
var email = 'test5@test.com';
var password = 'password';
var token;

describe('GET /donors', function(){
  it('fails if not authenticated', function(done){
    api.get('')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});

describe('POST /donors', function(){
  it('fails if name is missing', function(done){
    api.post('')
      .set('Accept', 'application/json')
      .send({
        "country"       : "Brasil",
        "email"         : email,
        "password"      : password,
        "emailVerified" : false
      })
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('fails if password is missing', function(done){
    api.post('')
      .set('Accept', 'application/json')
      .send({
        "name"          : "Diego Alves",
        "country"       : "Brasil",
        "email"         : email,
        "emailVerified" : false
      })
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('fails if country is missing', function(done){
    api.post('')
      .set('Accept', 'application/json')
      .send({
        "name"          : "Diego Alves",
        "email"         : email,
        "password"      : password,
        "emailVerified" : false
      })
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('creates a Donor', function(done){
    api.post('')
      .set('Accept', 'application/json')
      .send({
        "name"          : "Diego Alves",
        "country"       : "Brasil",
        "email"         : email,
        "password"      : password,
        "emailVerified" : false
      })
      .expect('Content-Type', /json/)
      .expect(function(res) {
        id = res.body.id;
      })
      .expect(200, done);
  });
});

describe('POST /donors/login', function(){
  it('fails if passwor is incorrect', function(done){
    api.post('/login')
      .set('Accept', 'application/json')
      .send({
        "email"    : email,
        "password" : 'incorrect password'
      })
      .expect('Content-Type', /json/)
      .expect(401, done);
  });

  it('can login', function(done){
    api.post('/login')
      .set('Accept', 'application/json')
      .send({
        "email"    : email,
        "password" : password
      })
      .expect('Content-Type', /json/)
      .expect(function(res) {
        token = res.body.id;
      })
      .expect(200, done);
  });
});

describe('DELETE /donors/id', function(){
  it('can delete itself', function(done){
    api.delete('/' + id + '?access_token=' + token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
