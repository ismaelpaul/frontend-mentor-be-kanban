const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const devData = require('../db/data/test-data/data.json');

beforeEach(() => seed({ data: devData }));

afterAll(() => db.end());

describe('/api/boards', () => {
	describe('GET', () => {
		test('200: responds with an array of boards objects', () => {
			return request(app)
				.get('/api/boards')
				.expect(200)
				.then((response) => {
					const allBoards = response.body.boards;
					expect(typeof response.body).toBe('object');
					expect(Array.isArray(allBoards)).toBe(true);
					expect(allBoards.length > 0).toBe(true);
					allBoards.forEach((board) => {
						expect(board).toHaveProperty('board_id', expect.any(Number));
						expect(board).toHaveProperty('user_id', expect.any(Number));
						expect(board).toHaveProperty('name', expect.any(String));
					});
				});
		});
	});
});

describe('/api/boards/:board_id', () => {
	describe('GET', () => {
		test('200: responds with a single matching board', () => {
			return request(app)
				.get('/api/boards/1')
				.expect(200)
				.then((response) => {
					const board = response.body.board;
					expect(board).toEqual({
						board_id: 1,
						user_id: 1,
						name: 'Platform Launch',
					});
				});
		});
	});
});

describe('/api/boards/:board_id/columns', () => {
	describe('GET', () => {
		test('200: responds with an array of columns for the given board id', () => {
			return request(app)
				.get('/api/boards/2/columns')
				.expect(200)
				.then((response) => {
					const allColumns = response.body.columns;
					expect(Array.isArray(allColumns)).toBe(true);
					expect(allColumns.length > 0).toBe(true);
					allColumns.forEach((column) => {
						expect(column).toHaveProperty('column_id', expect.any(Number));
						expect(column).toHaveProperty('board_id', expect.any(Number));
						expect(column).toHaveProperty('name', expect.any(String));
					});
				});
		});
	});
});

describe('/api/columns', () => {
	describe('GET', () => {
		test('200: responds with an array of columns objects', () => {
			return request(app)
				.get('/api/columns')
				.expect(200)
				.then((res) => {
					const allColumns = res.body.columns;
					expect(typeof res.body).toBe('object');
					expect(Array.isArray(allColumns)).toBe(true);
					expect(allColumns.length > 0).toBe(true);
					allColumns.forEach((board) => {
						expect(board).toHaveProperty('column_id', expect.any(Number));
						expect(board).toHaveProperty('board_id', expect.any(Number));
						expect(board).toHaveProperty('name', expect.any(String));
					});
				});
		});
	});
});

describe('/api/users', () => {
	describe('GET', () => {
		test('200: return an array of users objects', () => {
			return request(app)
				.get('/api/users')
				.expect(200)
				.then((response) => {
					const allUsers = response.body.users;
					expect(typeof response.body).toBe('object');
					expect(Array.isArray(allUsers)).toBe(true);
					expect(allUsers.length > 0).toBe(true);
					allUsers.forEach((board) => {
						expect(board).toHaveProperty('user_id', expect.any(Number));
						expect(board).toHaveProperty('first_name', expect.any(String));
						expect(board).toHaveProperty('last_name', expect.any(String));
						expect(board).toHaveProperty('email', expect.any(String));
						expect(board).toHaveProperty('password', expect.any(String));
					});
				});
		});
	});
});
