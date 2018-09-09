const participantQuery = require('../database/queries/participant_queries');
const assetQuery = require('../database/queries/asset_queries');
const router_util = require('./router-util');
const authController = require('../server_controllers/auth-controller');
const apiController = require('../server_controllers/api-controller'); 
const composerProxy = require('../server_controllers/composer-proxy');
const dashboardController = require('../server_controllers/dashboard-controller');

module.exports = (app) =>{
	// TODO: role based restriction middleware
	app.post('/addParticipant', authController.api_validate, authController.check_role ,(req, res) => {
		router_util.handlePromise('addParticipant', req.body, res);
	});
	app.delete('/removeParticipant', (req, res) => {
		router_util.handlePromise('removeParticipant', req.body, res);
	});
	app.post('/requestAsset', (req, res) => {
		router_util.handlePromise('requestAsset', req.body, res);
	});
	app.post('/approveRequest', (req, res) => {
		router_util.handlePromise('approveRequest', req.body, res);
	});
	app.post('/receiveAsset', (req, res) => {
		router_util.handlePromise('receiveAsset', req.body, res);
	});
	app.post('/closeRequest', (req, res) => {
		router_util.handlePromise('closeRequest', req.body, res);
	});
	app.post('/cancelRequest', (req, res) => {
		router_util.handlePromise('cancelRequest', req.body, res);
	});
	app.post('/searchParticipant', (req, res) => {
		router_util.handlePromise('searchParticipant', req.body, res);
	});
	app.post('/deleteParticipant', (req, res) => {
		router_util.handlePromise('deleteParticipant', req.body, res);
	});
	app.post('/searchAssetAdmin', (req, res) => {
		router_util.handlePromise('searchAssetAdmin', req.body, res);
	});
	app.post('/removeAssetAdmin', (req, res) => {
		router_util.handlePromise('removeAssetAdmin', req.body, res);
	});

	app.get('/getMyRequests', apiController.getMyRequests);
	app.post('/searchAsset', apiController.searchAsset);
	app.post('/assetTransactionsMonth', apiController.assetTransactions);
	app.get('/getDepts', apiController.getDepts);

	app.post('/addAsset', authController.api_validate, assetQuery.addAsset);
	app.post('/authenticate', authController.authenticate);
	app.get('/validate', authController.validate);
	app.post('/signup', authController.signup);

	app.post('/getComodity', composerProxy.getComodityProxy);
	app.post('/addComodity', composerProxy.addComodityProxy);
	app.delete('/deleteComodity', composerProxy.deleteComodityProxy);

	app.get('/getEmployee', composerProxy.getEmployeeProxy);
	app.post('/addEmployee', composerProxy.addEmployeeProxy);
	app.delete('/deleteEmployee', composerProxy.deleteEmployeeProxy);

	app.post('/getTransactions', composerProxy.getTransactionsProxy);
	app.post('/submitTransaction', composerProxy.submitTransactionProxy);
	app.post('/getTransactionsCouch', composerProxy.getTransactionsFromCouchProxy);

	app.post('/getTimeSeriesData', dashboardController.getTimeSeriesData);
	app.get('/getTotalRequestsByCat', dashboardController.getTotalRequestsByCat);
	app.get('/getAssetsByDept', dashboardController.getAssetsByDept);
}