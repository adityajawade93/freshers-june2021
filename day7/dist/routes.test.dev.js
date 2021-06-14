"use strict";

// const { test } = require('@jest/globals');
var request = require('supertest');

var server = require('./index.js');

beforeAll(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('testing started');

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
afterAll(function () {
  server.close();
  console.log('server closed');
});
describe('Post route', function () {
  test('should return status code 200', function _callee2() {
    var todo, response;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            todo = {
              "title": "vegetables",
              "content": "tomato and potato",
              "completed": false
            };
            _context2.next = 3;
            return regeneratorRuntime.awrap(request(server).post('/todo').send(todo));

          case 3:
            response = _context2.sent;
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
              "msg": "todo created"
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  test('should return status code 404', function _callee3() {
    var todo, response;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            todo = {
              "content": "tomato and potato",
              "completed": false
            };
            _context3.next = 3;
            return regeneratorRuntime.awrap(request(server).post('/todo').send(todo));

          case 3:
            response = _context3.sent;
            expect(response.status).toBe(404);
            expect(response.body).toEqual({
              "msg": "title is missing"
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
});
describe('Get route', function () {
  test('should return list of todo', function _callee4() {
    var response;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(request(server).get("/todo"));

          case 2:
            response = _context4.sent;
            expect(response.status).toBe(200);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
});