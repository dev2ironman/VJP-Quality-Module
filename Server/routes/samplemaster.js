const express = require('express')
const router = express.Router()

const { Operation, Process } = require('./../models')


function sendError(res, err) {
    var result = {
        "success": false,
        "error": err
    };
    return res.json(result);
}

function sendSuccess(res, result) {
    var finalResult = {
        "success": true,
        "data": result
    };
    return res.json(finalResult);
}

function sendSuccess1(res, result, msg) {
    var finalResult = {
        "success": true,
        "msg": msg,
        "data": result
    };
    return res.json(finalResult);
}

router.get('/:drgId', (req, res) => {
    return new Promise((resolve, reject) => {
        Operation.findAll({ where: { drgId: req.params.drgId }, include: [Process]}).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/', (req, res) => {
    return new Promise((resolve, reject) => {

        Operation.findOne({ where: { drgId: req.body.drgId, opnNo: req.body.opnNo } }).then(function (resp) {
            
            if (resp) {
                console.log(resp);
                req.body.opnId = resp.id;
                Process.create(req.body).then(function (result) {
                    sendSuccess(res, result);
                }).catch(function (err) {
                    sendError(res, err);
                });
            }
            else {
                let datas = {
                    "opnNo":req.body.opnNo,
                    "opnName": req.body.opnName,
                    "description": req.body.description,
                    "workCenter":req.body.workCenter,
                    "drgId": req.body.drgId
                }
                Operation.create(datas).then(function (opRes) {
                req.body.opnId = opRes.id;
                    Process.create(req.body).then(function (result) {
                        sendSuccess(res, result);
                    }).catch(function (err) {
                        sendError(res, err);
                    });
                })


            }

        })







    })
})


router.put('/:id', (req, res) => {

    req.body.updatedBy = 1;
    return new Promise((resolve, reject) => {
        let data = {
            "id": req.body.pid,
            "opnId": req.body.id,
            "opnName": req.body.opnName,
            "description": req.body.description,
            "specification": req.body.specification,
            "toloreanceGrade":req.body.toloreanceGrade,
            "tolFrom": req.body.tolFrom,
            "tolTo": req.body.tolTo,
            "instrument": req.body.instrument,
            "measuringFrequency": req.body.measuringFrequency,
            "grid": req.body.grid,
            "firstPartInspection": req.body.firstPartInspection,
            "periodicInspection": req.body.periodicInspection,
            "ctq": req.body.periodicInspection,
        }
        
       
        Operation.update(req.body, { where: { id: req.params.id } }).then(result => {
            sendSuccess1(res, result, "Data successfully updated");
            Process.update(data, { where: { id: req.body.pid } }).then(result => {
                sendSuccess1(res, result, "Data successfully updated");
            }).catch(function (err) {
                sendError(res, error);
            });
        }).catch(function (err) {
            sendError(res, error);
        });
    })
})


router.delete('/:id', function (req, res) {
    return new Promise(function (resolve, reject) {
        Operation.update({ deletedBy: 1, deleteStatus: true }, { where: { id: req.params.id } }).then((result) => {
            sendSuccess(res, 'deleted sucessfully');
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


module.exports = router